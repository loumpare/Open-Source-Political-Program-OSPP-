"""Economic-social-environmental-educational CitizenAgent — Mesa 3.

Improvements over v1:
  - Recurring policy effects (annual transfer, annual wealth tax)          [design]
  - Savings → wealth accumulation loop (Modigliani 1954)                  [stock-flow]
  - Heterogeneous wealth returns by decile (Fagereng et al. QJE 2020)     [calibration]
  - Permanent + transitory income process (Guvenen 2009)                  [income dynamics]
  - Dynamic MPC from wealth buffer (Kaplan & Violante 2014)               [consumption]
  - Human capital depreciation during unemployment (Ljungqvist & Sargent 1998)
  - Income-responsive convergence targets (Kahneman & Deaton 2010)        [wellbeing]
  - Mortality target tracks current income norm                            [design]
"""
from __future__ import annotations

import math

from mesa import Agent

from simulation.demographics import (
    CountryProfile,
    sample_age,
    sample_income,
    sample_sector,
)
from simulation.policy_parser import PolicyParams

# Progressive income tax — effective rates per decile (France baseline, OECD 2023)
# Scaled at runtime by profile.tax_pressure / 0.50 to get country-specific rates
_INCOME_TAX_SCHEDULE = [0.000, 0.030, 0.060, 0.090, 0.125, 0.165, 0.205, 0.255, 0.305, 0.370]

# Sector innovation intensity (relative, OECD R&D by industry 2023)
_SECTOR_INNOV: dict[str, float] = {
    "Manufacturing": 1.5, "Industry": 1.4, "Industrie": 1.4, "Technology": 1.6,
    "Healthcare": 1.3, "Services": 1.0, "Services privés": 1.0, "Dienstleistungen": 1.0,
    "Public sector": 0.7, "Services publics": 0.7, "Öffentlicher Dienst": 0.7,
    "Government": 0.6, "Agriculture": 0.6, "Landwirtschaft": 0.6,
    "Construction": 0.7, "Baugewerbe": 0.7, "Oil & Gas": 0.9, "Resources": 0.8,
}

# Sector → carbon multiplier relative to country average
_CARBON_SECTOR: dict[str, float] = {
    "Agriculture": 1.40, "Landwirtschaft": 1.40,
    "Industry": 1.55,    "Industrie": 1.55,
    "Manufacturing": 1.55, "Oil & Gas": 2.10,
    "Resources": 1.60,   "Construction": 1.30, "Baugewerbe": 1.30,
    "Services": 0.90,    "Services privés": 0.90, "Dienstleistungen": 0.90,
    "Public sector": 0.80, "Services publics": 0.80,
    "Öffentlicher Dienst": 0.80, "Government": 0.80, "Healthcare": 0.75,
}


class CitizenAgent(Agent):
    """
    A citizen with economic, environmental, social, educational and
    governance attributes.  All deltas are measured against a parallel
    control group so that stochastic noise cancels out.
    """

    def __init__(
        self,
        model,
        profile: CountryProfile,
        policy: PolicyParams | None = None,
        with_policy: bool = True,
    ):
        super().__init__(model)
        rng = model.rng_instance

        # ── Demographics ──────────────────────────────────────────────────────
        self.country = profile.code
        self.age     = sample_age(profile, rng)
        self.sector  = sample_sector(profile, rng)
        self.decile, self.income = sample_income(profile, rng)
        self.base_income = self.income

        base_emp = profile.employment_rate
        if self.age < 25:
            base_emp *= 0.70   # youth unemployment
        elif self.age > 60:
            base_emp *= 0.60   # pre-retirement
        self.employed = rng.random() < base_emp

        self.political_position = max(-1.0, min(1.0,
            rng.gauss(0, profile.political_std)))

        # Initial savings rate — updated dynamically each step via buffer stock
        self.savings_rate = max(0.02, min(0.30,
            0.04 + self.decile * 0.025 + rng.gauss(0, 0.02)))
        self.consumption = self.income * (1 - self.savings_rate)

        # ── Income process state (Guvenen 2009) ───────────────────────────────
        self.permanent_shock:       float = 0.0
        self.unemployment_duration: int   = 0
        # Tracks last universal_transfer applied — prevents compounding
        self._last_transfer:        float = 0.0

        # ── Economic ─────────────────────────────────────────────────────────
        self.wellbeing = self._initial_wellbeing()

        # ── Environmental ────────────────────────────────────────────────────
        sector_mult  = _CARBON_SECTOR.get(self.sector, 1.0)
        income_scale = 0.5 + (self.decile / 9) * 1.2
        self.carbon_footprint = round(
            profile.carbon_baseline_t * income_scale * sector_mult
            * rng.uniform(0.88, 1.12), 2)
        self.green_score = max(0.0, min(1.0,
            profile.collectivism * 0.4
            + (self.decile / 9) * 0.3
            + (0.2 if "public" in self.sector.lower() else 0)
            + rng.gauss(0, 0.05)))

        # ── Health ───────────────────────────────────────────────────────────
        self.health_score = self._initial_health(profile)

        # ── Education ────────────────────────────────────────────────────────
        inc_edu = (self.decile / 9) * 0.12
        age_edu = 0.04 if 22 <= self.age <= 45 else (-0.03 if self.age > 60 else 0)
        emp_edu = 0.04 if self.employed else -0.02
        self.education_score = round(max(0.0, min(1.0,
            profile.education_index + inc_edu + age_edu + emp_edu
            + rng.gauss(0, 0.04))), 3)

        # ── Social trust ─────────────────────────────────────────────────────
        self.social_trust = max(0.0, min(1.0,
            profile.collectivism * 0.6
            + (0.15 if self.employed else -0.10)
            + rng.gauss(0, 0.08)))

        # ── Governance / institutional trust ─────────────────────────────────
        gini_penalty = profile.gini * 0.25
        self.governance_trust = max(0.0, min(1.0,
            profile.collectivism * 0.5 + 0.15
            - gini_penalty
            + (0.10 if self.employed else -0.05)
            + rng.gauss(0, 0.07)))

        # ── Wealth (patrimoine) ───────────────────────────────────────────────
        # Lognormal: correlated with income decile, high independent variance
        # Crédit Suisse GWR 2023 · Piketty (2014)
        income_factor = max(0.05, 0.15 + (self.decile / 9) ** 2 * 3.5)
        w_median = max(1.0, profile.median_wealth_eur * income_factor)
        raw_wealth  = rng.lognormvariate(math.log(w_median), profile.wealth_sigma)
        # Cap at 50× country median to prevent lognormal tail from dominating
        # mean statistics — P99 of lognormal(sigma=1.8) ≈ 43× median, so ~1% clipped
        wealth_cap  = profile.median_wealth_eur * 50
        self.wealth         = min(max(0.0, raw_wealth), wealth_cap)
        self.capital_income = self.wealth * 0.03 / 12   # 3 % annual return / 12
        self.labour_income  = self.income
        self.income         = self.labour_income + self.capital_income

        # ── Gender equality ───────────────────────────────────────────────────
        inc_ge = (self.decile / 9) * 0.08
        emp_ge = 0.05 if self.employed else -0.03
        self.gender_equality = round(max(0.0, min(1.0,
            profile.gender_equality_index + inc_ge + emp_ge
            + rng.gauss(0, 0.06))), 3)

        # ── Discrimination score (1 = no discrimination) ─────────────────────
        edu_disc   = self.education_score * 0.12
        trust_disc = self.social_trust * 0.15
        self.discrimination_score = round(max(0.0, min(1.0,
            profile.antidiscrimination_index + edu_disc + trust_disc
            + rng.gauss(0, 0.06))), 3)

        # ── Social mobility ───────────────────────────────────────────────────
        edu_mob  = self.education_score * 0.10
        gini_mob = -profile.gini * 0.35
        dec_mob  = (self.decile / 9) * 0.08
        self.social_mobility = round(max(0.0, min(1.0,
            profile.social_mobility_index + edu_mob + gini_mob + dec_mob
            + rng.gauss(0, 0.05))), 3)

        # ── Mortality (refined after health_score is ready) ───────────────────
        age_h = math.exp(max(0.0, (self.age - 40) * 0.065))
        inc_h = max(0.5, 2.0 - (self.decile / 9) * 1.5)
        acc_h = max(0.7, 1.6 - profile.healthcare_access * 0.9)
        hlt_h = max(0.6, 1.8 - self.health_score * 1.4)
        self.mortality_risk = round(min(0.40,
            0.006 * age_h * inc_h * hlt_h * acc_h), 5)

        # ── Innovation score ──────────────────────────────────────────────────
        # Aghion & Howitt (1992), Akcigit & Stantcheva (2020)
        # Drivers: human capital + capital access + institutions + sector R&D
        inc_norm_01 = min(1.0, self.income / max(1.0, profile.income_deciles[-1] * 1.5))
        s_innov = _SECTOR_INNOV.get(self.sector, 1.0)
        self.innovation_score = round(max(0.0, min(1.0,
            profile.rd_intensity * 0.20
            + self.education_score * 0.35
            + inc_norm_01 * 0.20
            + self.governance_trust * 0.15
            + self.social_trust * 0.10
            + (s_innov - 1.0) * 0.10
            + rng.gauss(0, 0.04)
        )), 3)

        # ── Entrepreneurship ─────────────────────────────────────────────────
        # Acs & Audretsch (1990), GEM 2023
        # Drivers: financial capital + human capital + risk tolerance + institutions
        risk_appetite = max(0.0, min(1.0, 0.50 + self.political_position * 0.25))
        wealth_factor = min(1.0, self.wealth / max(1.0, profile.median_wealth_eur * 2))
        self.entrepreneurship = round(max(0.0, min(1.0,
            profile.startup_rate * 0.15
            + wealth_factor * 0.25
            + self.education_score * 0.25
            + risk_appetite * 0.20
            + self.governance_trust * 0.15
            + rng.gauss(0, 0.03)
        )), 3)

        # ── Fiscal contribution ───────────────────────────────────────────────
        # Net government position per agent/month: taxes paid − transfers received
        # Income tax: progressive schedule scaled by country tax pressure
        self.income_tax = round(
            self.labour_income * _INCOME_TAX_SCHEDULE[self.decile]
            * profile.tax_pressure / 0.50, 2)
        self.unemployment_benefit = (self.base_income * 0.60) if not self.employed else 0.0
        self.fiscal_contribution  = round(self.income_tax - self.unemployment_benefit, 2)

        # ── Policy state ─────────────────────────────────────────────────────
        self.policy         = policy
        self.with_policy    = with_policy
        self.policy_applied = False   # guards first-year structural effects only

    # ── Internal helpers ──────────────────────────────────────────────────────

    def _initial_wellbeing(self) -> float:
        inc_score = min(1.0, self.decile / 9)
        emp_score = 0.85 if self.employed else 0.30
        return round(0.6 * inc_score + 0.4 * emp_score, 3)

    def _initial_health(self, profile: CountryProfile) -> float:
        inc_score   = (self.decile / 9) * 0.25
        emp_score   = 0.10 if self.employed else -0.05
        age_penalty = -0.003 * max(0, self.age - 40)
        base        = 0.45 + profile.healthcare_access * 0.30
        return round(max(0.0, min(1.0,
            base + inc_score + emp_score + age_penalty)), 3)

    def _is_targeted(self) -> bool:
        if self.policy is None or not self.with_policy:
            return False
        p = self.policy
        if self.decile not in p.target_income_deciles:
            return False
        if not (p.target_age_min <= self.age <= p.target_age_max):
            return False
        if p.target_sectors and self.sector not in p.target_sectors:
            return False
        return True

    def _apply_policy(self) -> None:
        """
        Apply policy effects every step.

        RECURRING (every year):
          - universal_transfer  : added to labour_income each year
          - wealth_tax          : annual levy on patrimony above threshold

        STRUCTURAL (year 1 only, guarded by self.policy_applied):
          - income_multiplier + monthly_transfer  : permanent income level shift
          - employment_delta                      : one-time transition probability
          - carbon_multiplier + green nudge       : structural behaviour change
          - health / education / trust / social deltas
        """
        if self.policy is None or not self.with_policy:
            return

        p     = self.policy
        rng   = self.model.rng_instance
        first = not self.policy_applied

        # ── RECURRING: Universal transfer — constant nominal level (not compounding)
        # Subtract last year's contribution before adding this year's, so the
        # transfer stays at a fixed €/month instead of accumulating each step.
        if p.universal_transfer > 0:
            self.labour_income  = self.labour_income - self._last_transfer + p.universal_transfer
            self._last_transfer = p.universal_transfer
            self.base_income    = max(self.base_income, self.labour_income * 0.90)

        # ── RECURRING: Wealth tax (annual levy on patrimony) ─────────────────
        if p.wealth_tax_rate > 0 and self.wealth > p.wealth_tax_threshold:
            annual_tax  = (self.wealth - p.wealth_tax_threshold) * p.wealth_tax_rate
            monthly_tax = annual_tax / 12
            tax_applied = min(monthly_tax, self.labour_income * 0.35)
            self.labour_income = max(50.0, self.labour_income - tax_applied)
            self.wealth        = max(0.0, self.wealth - annual_tax)

        # Rebuild income totals after recurring adjustments
        self.capital_income = self.wealth * 0.03 / 12
        self.income         = self.labour_income + self.capital_income

        # ── STRUCTURAL: mortality delta (all policy agents, year 1 only) ─────
        if first and p.mortality_delta != 0:
            self.mortality_risk = max(0.0, min(0.40,
                self.mortality_risk + p.mortality_delta))

        # Non-targeted agents: recurring done, skip income/behaviour shocks
        if not self._is_targeted():
            self.policy_applied = True
            return

        # ── STRUCTURAL: targeted agents, year 1 only ─────────────────────────
        if first:
            # Permanent income level shift — baked into labour_income baseline
            self.labour_income = (
                self.labour_income * p.income_multiplier + p.monthly_transfer)
            self.base_income = max(self.base_income, self.labour_income * 0.90)
            self.income      = self.labour_income + self.capital_income

            # Employment transition
            if p.employment_delta > 0 and not self.employed:
                if rng.random() < p.employment_delta * 5:
                    self.employed              = True
                    self.unemployment_duration = 0
            elif p.employment_delta < 0 and self.employed:
                if rng.random() < abs(p.employment_delta) * 3:
                    self.employed = False

            self.wellbeing = min(1.0, self.wellbeing + p.wellbeing_delta)

            # Carbon
            self.carbon_footprint = max(0.1,
                self.carbon_footprint * p.carbon_multiplier)
            if p.carbon_multiplier < 1.0:
                self.green_score = min(1.0, self.green_score + 0.10)

            # Health + mortality
            health_boost = p.wellbeing_delta * 0.4 + p.monthly_transfer / 12_000
            self.health_score   = min(1.0, self.health_score + health_boost)
            self.mortality_risk = max(0.0,
                self.mortality_risk - health_boost * 0.003)

            # Education
            edu_boost = p.education_delta + p.monthly_transfer / 15_000
            self.education_score = min(1.0, self.education_score + edu_boost)

            # Social trust
            trust_boost = (
                (0.06 if p.employment_delta > 0 else 0)
                - p.gini_delta * 1.5
                + p.governance_delta * 0.5
            )
            self.social_trust = max(0.0, min(1.0,
                self.social_trust + trust_boost))

            # Governance trust
            gov_boost = p.governance_delta - p.gini_delta * 1.0
            self.governance_trust = max(0.0, min(1.0,
                self.governance_trust + gov_boost))

            self.gender_equality      = min(1.0,
                self.gender_equality + p.gender_equality_delta)
            self.discrimination_score = min(1.0,
                self.discrimination_score + p.discrimination_delta)
            self.social_mobility      = min(1.0,
                self.social_mobility + p.mobility_delta)

        self.policy_applied = True

    # ── Mesa step ─────────────────────────────────────────────────────────────

    def step(self) -> None:
        """Advance agent by one year."""
        rng = self.model.rng_instance

        # ── 1. Recurring policy effects + structural shock (year 1) ──────────
        self._apply_policy()

        # ── 2. Labour income drift — Guvenen (2009) permanent + transitory ───
        if self.employed:
            # Persistent component: AR(1) ρ=0.97, σ_p=0.04
            self.permanent_shock = (
                0.97 * self.permanent_shock + rng.gauss(0, 0.04))
            transitory = rng.gauss(0, 0.10)
            growth = 0.002 + self.permanent_shock + transitory
            self.labour_income     = max(100.0, self.labour_income * (1 + growth))
            self.unemployment_duration = 0
        else:
            # Human capital depreciation during unemployment
            # Ljungqvist & Sargent (1998): skills erode ≈ 0.3%/year
            self.unemployment_duration += 1
            self.education_score = max(0.05, self.education_score - 0.003)
            benefit = self.base_income * 0.60   # EU average unemployment benefit
            self.labour_income = max(50.0, benefit + rng.gauss(0, benefit * 0.05))

        # ── 3. Savings → wealth accumulation (Modigliani 1954 life-cycle) ────
        annual_savings = self.labour_income * 12 * self.savings_rate
        self.wealth    = max(0.0, self.wealth + annual_savings)

        # ── 4. Heterogeneous capital returns (Fagereng et al. QJE 2020) ──────
        # D1: ~1 % net real, D10: ~5 % net real
        return_mean = 0.01 + (self.decile / 9) * 0.04
        w_return    = rng.gauss(return_mean, 0.08)
        self.wealth         = max(0.0, self.wealth * (1 + w_return))
        self.capital_income = self.wealth * 0.03 / 12
        self.income         = self.labour_income + self.capital_income

        # ── 5. Dynamic savings rate — buffer stock (Carroll 1997) ────────────
        # MPC decreases as liquid wealth buffer grows relative to income
        months_buffer     = self.wealth / max(1.0, self.income)
        self.savings_rate = max(0.02, min(0.40,
            0.05 + min(months_buffer / 240.0, 0.35)))
        self.consumption  = self.income * (1 - self.savings_rate)

        # ── 6. Normalised income — drives income-responsive targets ───────────
        # Compares current labour income against the personal baseline
        income_norm = min(1.0, self.labour_income / max(1.0, self.base_income * 1.5))

        # ── 7. Wellbeing — target tracks current income (Kahneman & Deaton 2010)
        target_wb = round(
            0.6 * income_norm + 0.4 * (0.85 if self.employed else 0.30), 3)
        self.wellbeing = round(max(0.0, min(1.0,
            self.wellbeing + 0.05 * (target_wb - self.wellbeing)
            + rng.gauss(0, 0.008))), 3)

        # ── 8. Carbon: annual decarbonisation trend −0.4 %/year (IEA 2024) ───
        eff_gain = rng.gauss(-0.004, 0.006)
        self.carbon_footprint = max(0.1,
            self.carbon_footprint * (1 + eff_gain))

        # ── 9. Health — target tracks current income ──────────────────────────
        tgt_h = min(1.0,
            0.45 + income_norm * 0.30
            + (0.10 if self.employed else -0.05)
            - 0.003 * max(0, self.age - 40))
        self.health_score = round(max(0.0, min(1.0,
            self.health_score + 0.04 * (tgt_h - self.health_score)
            + rng.gauss(0, 0.006))), 3)

        # ── 10. Education: lifelong learning (+0.002/yr) ──────────────────────
        tgt_e = min(1.0, self.education_score + 0.002)
        self.education_score = round(max(0.0, min(1.0,
            self.education_score + 0.03 * (tgt_e - self.education_score)
            + rng.gauss(0, 0.005))), 3)

        # ── 11. Social trust ──────────────────────────────────────────────────
        tgt_t = 0.40 + (0.12 if self.employed else -0.08)
        self.social_trust = round(max(0.0, min(1.0,
            self.social_trust + 0.04 * (tgt_t - self.social_trust)
            + rng.gauss(0, 0.008))), 3)

        # ── 12. Governance trust: slow mean-reverting ─────────────────────────
        tgt_g = 0.45 - rng.gauss(0, 0.02)
        self.governance_trust = round(max(0.0, min(1.0,
            self.governance_trust + 0.03 * (tgt_g - self.governance_trust)
            + rng.gauss(0, 0.007))), 3)

        # ── 13. Gender equality: slow upward structural trend ─────────────────
        tgt_ge = min(1.0, self.gender_equality + 0.001)
        self.gender_equality = round(max(0.0, min(1.0,
            self.gender_equality + 0.02 * (tgt_ge - self.gender_equality)
            + rng.gauss(0, 0.005))), 3)

        # ── 14. Discrimination: mean-reverting toward social trust ─────────────
        tgt_disc = 0.60 + self.social_trust * 0.20
        self.discrimination_score = round(max(0.0, min(1.0,
            self.discrimination_score
            + 0.02 * (tgt_disc - self.discrimination_score)
            + rng.gauss(0, 0.005))), 3)

        # ── 15. Social mobility: decade-scale structural change ───────────────
        tgt_mob = self.social_mobility + 0.0005
        self.social_mobility = round(max(0.0, min(1.0,
            self.social_mobility + 0.01 * (tgt_mob - self.social_mobility)
            + rng.gauss(0, 0.004))), 3)

        # ── 16. Mortality — target tracks income norm ─────────────────────────
        age_h = math.exp(max(0.0, (self.age - 40) * 0.065))
        inc_h = max(0.5, 2.0 - income_norm * 1.5)
        tgt_m = min(0.40, 0.006 * age_h * inc_h)
        self.mortality_risk = round(max(0.0, min(0.40,
            self.mortality_risk + 0.05 * (tgt_m - self.mortality_risk)
            + rng.gauss(0, 0.0005))), 5)

        # ── 17. Innovation — responds to education + income + governance ──────
        s_innov  = _SECTOR_INNOV.get(self.sector, 1.0)
        rd_base  = getattr(self.model, '_rd_intensity', 0.44)
        tgt_inno = min(1.0,
            rd_base * 0.20
            + self.education_score * 0.35
            + income_norm * 0.20
            + self.governance_trust * 0.15
            + self.social_trust * 0.10
            + (s_innov - 1.0) * 0.10)
        self.innovation_score = round(max(0.0, min(1.0,
            self.innovation_score + 0.05 * (tgt_inno - self.innovation_score)
            + rng.gauss(0, 0.01))), 3)

        # ── 18. Entrepreneurship — responds to wealth + education + governance ─
        risk_appetite = max(0.0, min(1.0, 0.50 + self.political_position * 0.25))
        wm            = getattr(self.model, '_median_wealth', 60_000)
        wealth_factor = min(1.0, self.wealth / max(1.0, wm * 2))
        sr_base       = getattr(self.model, '_startup_rate', 0.50)
        tgt_entr = min(1.0,
            sr_base * 0.15
            + wealth_factor * 0.25
            + self.education_score * 0.25
            + risk_appetite * 0.20
            + self.governance_trust * 0.15)
        self.entrepreneurship = round(max(0.0, min(1.0,
            self.entrepreneurship + 0.05 * (tgt_entr - self.entrepreneurship)
            + rng.gauss(0, 0.01))), 3)

        # ── 19. Fiscal contribution — update with current income ──────────────
        tp = getattr(self.model, '_tax_pressure', 0.50)
        self.income_tax           = round(
            self.labour_income * _INCOME_TAX_SCHEDULE[self.decile] * tp / 0.50, 2)
        self.unemployment_benefit = (self.base_income * 0.60) if not self.employed else 0.0
        self.fiscal_contribution  = round(self.income_tax - self.unemployment_benefit, 2)

    # ── Snapshot ─────────────────────────────────────────────────────────────

    def snapshot(self) -> dict:
        return {
            "age":                    self.age,
            "decile":                 self.decile,
            "sector":                 self.sector,
            "income":                 round(self.income, 2),
            "labour_income":          round(self.labour_income, 2),
            "capital_income":         round(self.capital_income, 2),
            "wealth":                 round(self.wealth, 0),
            "employed":               self.employed,
            "wellbeing":              self.wellbeing,
            "carbon_footprint":       round(self.carbon_footprint, 3),
            "green_score":            round(self.green_score, 3),
            "health_score":           self.health_score,
            "mortality_risk":         self.mortality_risk,
            "education_score":        self.education_score,
            "social_trust":           self.social_trust,
            "governance_trust":       self.governance_trust,
            "gender_equality":        self.gender_equality,
            "discrimination_score":   self.discrimination_score,
            "social_mobility":        self.social_mobility,
            "political_position":     round(self.political_position, 3),
            "unemployment_duration":  self.unemployment_duration,
            "savings_rate":           round(self.savings_rate, 3),
            "innovation_score":       self.innovation_score,
            "entrepreneurship":       self.entrepreneurship,
            "income_tax":             round(self.income_tax, 2),
            "unemployment_benefit":   round(self.unemployment_benefit, 2),
            "fiscal_contribution":    round(self.fiscal_contribution, 2),
        }
