"""Economic-social-environmental-educational CitizenAgent — Mesa 3."""
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

# Sector → carbon multiplier (relative to country average)
_CARBON_SECTOR = {
    "Agriculture": 1.40, "Landwirtschaft": 1.40,
    "Industry": 1.55, "Industrie": 1.55,
    "Manufacturing": 1.55, "Oil & Gas": 2.10,
    "Resources": 1.60, "Construction": 1.30, "Baugewerbe": 1.30,
    "Services": 0.90, "Services privés": 0.90, "Dienstleistungen": 0.90,
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
        self.age = sample_age(profile, rng)
        self.sector = sample_sector(profile, rng)
        self.decile, self.income = sample_income(profile, rng)

        # Store base income for unemployment benefit calculation
        self.base_income = self.income

        base_emp = profile.employment_rate
        if self.age < 25:
            base_emp *= 0.70   # youth unemployment
        elif self.age > 60:
            base_emp *= 0.60   # pre-retirement
        self.employed = rng.random() < base_emp

        self.political_position = max(-1.0, min(1.0,
                                                rng.gauss(
                                                    0, profile.political_std)
                                                ))
        self.savings_rate = max(0.02, min(
            0.30, 0.04 + self.decile * 0.025 + rng.gauss(0, 0.02)
        ))
        self.consumption = self.income * (1 - self.savings_rate)

        # ── Economic ─────────────────────────────────────────────────────────
        self.wellbeing = self._initial_wellbeing()

        # ── Environmental ────────────────────────────────────────────────────
        sector_mult = _CARBON_SECTOR.get(self.sector, 1.0)
        income_scale = 0.5 + (self.decile / 9) * 1.2
        self.carbon_footprint = round(
            profile.carbon_baseline_t * income_scale * sector_mult
            * rng.uniform(0.88, 1.12), 2,
        )
        self.green_score = max(0.0, min(1.0,
                                        profile.collectivism * 0.4
                                        + (self.decile / 9) * 0.3
                                        + (0.2 if "public" in self.sector.lower() else 0)
                                        + rng.gauss(0, 0.05)
                                        ))

        # ── Health ────────────────────────────────────────────────────────────
        self.health_score = self._initial_health(profile)

        # ── Education ────────────────────────────────────────────────────────
        # Calibrated on UNESCO/PISA: country base + income access + age peak
        inc_edu = (self.decile / 9) * 0.12
        age_edu = 0.04 if 22 <= self.age <= 45 else -0.03 if self.age > 60 else 0
        emp_edu = 0.04 if self.employed else -0.02
        self.education_score = round(max(0.0, min(1.0,
                                                  profile.education_index + inc_edu + age_edu + emp_edu
                                                  + rng.gauss(0, 0.04)
                                                  )), 3)

        # ── Social trust ──────────────────────────────────────────────────────
        self.social_trust = max(0.0, min(1.0,
                                         profile.collectivism * 0.6
                                         + (0.15 if self.employed else -0.10)
                                         + rng.gauss(0, 0.08)
                                         ))

        # ── Governance / institutional trust ─────────────────────────────────
        # Sources: Helliwell et al. (2018), OECD Government at a Glance 2023
        gini_penalty = profile.gini * 0.25   # higher inequality → lower trust
        self.governance_trust = max(0.0, min(1.0,
                                             profile.collectivism * 0.5 + 0.15
                                             - gini_penalty
                                             + (0.10 if self.employed else -0.05)
                                             + rng.gauss(0, 0.07)
                                             ))

        # ── Wealth (patrimoine) ───────────────────────────────────────────────
        # Sources: Crédit Suisse Global Wealth Report 2023, Piketty (2014)
        # Lognormal: correlated with income decile but with high independent variance
        income_factor = max(0.05, 0.15 + (self.decile / 9) ** 2 * 3.5)
        w_median = max(1.0, profile.median_wealth_eur * income_factor)
        self.wealth = max(0.0, rng.lognormvariate(
            math.log(w_median), profile.wealth_sigma
        ))
        # Capital income: ~3 % annual return on wealth (dividends, rent, interest)
        self.capital_income = self.wealth * 0.03 / 12   # monthly
        self.labour_income  = self.income
        self.income         = self.labour_income + self.capital_income

        # mortality hazard factors — used below after health_score is defined
        age_h = math.exp(max(0.0, (self.age - 40) * 0.065))
        inc_h = max(0.5, 2.0 - (self.decile / 9) * 1.5)
        acc_h = max(0.7, 1.6 - profile.healthcare_access * 0.9)
        self.mortality_risk = 0.0   # placeholder — set properly after health init

        # ── Gender equality ───────────────────────────────────────────────────
        # Sources: WEF Gender Gap Index 2023, OECD Employment Outlook 2023
        inc_ge = (self.decile / 9) * 0.08
        emp_ge = 0.05 if self.employed else -0.03
        self.gender_equality = round(max(0.0, min(1.0,
            profile.gender_equality_index + inc_ge + emp_ge
            + rng.gauss(0, 0.06)
        )), 3)

        # ── Discrimination score (1=none, 0=severe) ───────────────────────────
        # Sources: EU FRA MIDIS-II 2017, ESS Round 9, Eurobarometer 437/2016
        edu_disc   = self.education_score * 0.12
        trust_disc = self.social_trust * 0.15
        self.discrimination_score = round(max(0.0, min(1.0,
            profile.antidiscrimination_index + edu_disc + trust_disc
            + rng.gauss(0, 0.06)
        )), 3)

        # ── Social mobility ───────────────────────────────────────────────────
        # Sources: Chetty et al. (2014), Corak (2013) — "Great Gatsby Curve"
        edu_mob  = self.education_score * 0.10
        gini_mob = -profile.gini * 0.35   # higher inequality → lower mobility
        dec_mob  = (self.decile / 9) * 0.08
        self.social_mobility = round(max(0.0, min(1.0,
            profile.social_mobility_index + edu_mob + gini_mob + dec_mob
            + rng.gauss(0, 0.05)
        )), 3)

        # Refine mortality_risk now that health_score is available
        hlt_h = max(0.6, 1.8 - self.health_score * 1.4)
        self.mortality_risk = round(min(0.40,
            0.006 * age_h * inc_h * hlt_h * acc_h
        ), 5)

        # ── Policy state ─────────────────────────────────────────────────────
        self.policy = policy
        self.with_policy = with_policy
        self.policy_applied = False

    # ── Internal helpers ──────────────────────────────────────────────────────

    def _initial_wellbeing(self) -> float:
        inc_score = min(1.0, self.decile / 9)
        emp_score = 0.85 if self.employed else 0.30
        return round(0.6 * inc_score + 0.4 * emp_score, 3)

    def _initial_health(self, profile: CountryProfile) -> float:
        inc_score = (self.decile / 9) * 0.25
        emp_score = 0.10 if self.employed else -0.05
        age_penalty = -0.003 * max(0, self.age - 40)
        base = 0.45 + profile.healthcare_access * 0.30
        return round(max(0.0, min(1.0,
                                  base + inc_score + emp_score + age_penalty
                                  )), 3)

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
        """Apply one-time policy shock if this agent is in the targeted group."""
        if self.policy is None or self.policy_applied:
            return
        self.policy_applied = True

        p = self.policy
        rng = self.model.rng_instance

        # ── Universal transfer (all policy-group agents, regardless of targeting)
        # Used for tax revenue redistribution (e.g. wealth tax dividend)
        if p.universal_transfer > 0:
            self.income += p.universal_transfer
            self.base_income = max(
                self.base_income, self.income * 0.90
            )
            self.wellbeing = min(
                1.0, self.wellbeing + p.universal_transfer / 8_000
            )

        # ── Wealth tax (direct on patrimony, not income proxy) ────────────────
        if p.wealth_tax_rate > 0 and self.wealth > p.wealth_tax_threshold:
            annual_tax  = (self.wealth - p.wealth_tax_threshold) * p.wealth_tax_rate
            monthly_tax = annual_tax / 12
            # Deduct from labour_income (capped at 35 % to avoid collapse)
            tax_applied      = min(monthly_tax, self.labour_income * 0.35)
            self.labour_income = max(50.0, self.labour_income - tax_applied)
            self.wealth      = max(0.0, self.wealth - annual_tax)
            # Recompute capital_income from reduced wealth, then rebuild income
            self.capital_income = self.wealth * 0.03 / 12
            self.income         = self.labour_income + self.capital_income

        # ── Mortality effect (universal — affects all policy agents) ──────────
        if p.mortality_delta != 0:
            self.mortality_risk = max(0.0, min(0.40,
                self.mortality_risk + p.mortality_delta))

        if not self._is_targeted():
            return

        # Economic (targeted agents only)
        new_income = self.income * p.income_multiplier + p.monthly_transfer
        self.income = new_income
        self.base_income = max(self.base_income, new_income * 0.90)

        if p.employment_delta > 0 and not self.employed:
            if rng.random() < p.employment_delta * 5:
                self.employed = True
        elif p.employment_delta < 0 and self.employed:
            if rng.random() < abs(p.employment_delta) * 3:
                self.employed = False

        self.wellbeing = min(1.0, self.wellbeing + p.wellbeing_delta)

        # Environmental (use explicit carbon_multiplier)
        self.carbon_footprint = max(0.1,
                                    self.carbon_footprint * p.carbon_multiplier
                                    )
        if p.carbon_multiplier < 1.0:
            self.green_score = min(1.0, self.green_score + 0.10)

        # Health (transfers + wellbeing → better health access)
        health_boost = (
            p.wellbeing_delta * 0.4
            + p.monthly_transfer / 12_000
        )
        self.health_score = min(1.0, self.health_score + health_boost)
        # Better health → lower mortality
        self.mortality_risk = max(0.0, self.mortality_risk - health_boost * 0.003)

        # Education (direct for edu policies, indirect for income)
        edu_boost = p.education_delta + p.monthly_transfer / 15_000
        self.education_score = min(1.0, self.education_score + edu_boost)

        # Social trust
        trust_boost = (
            (0.06 if p.employment_delta > 0 else 0)
            - p.gini_delta * 1.5
            + p.governance_delta * 0.5
        )
        self.social_trust = max(0.0, min(1.0,
                                         self.social_trust + trust_boost
                                         ))

        # Governance
        gov_boost = p.governance_delta + (-p.gini_delta * 1.0)
        self.governance_trust = max(0.0, min(1.0,
                                             self.governance_trust + gov_boost
                                             ))

        # Gender equality
        self.gender_equality = min(1.0,
            self.gender_equality + p.gender_equality_delta)

        # Discrimination score
        self.discrimination_score = min(1.0,
            self.discrimination_score + p.discrimination_delta)

        # Social mobility
        self.social_mobility = min(1.0,
            self.social_mobility + p.mobility_delta)

    # ── Mesa step ─────────────────────────────────────────────────────────────

    def step(self) -> None:
        """Advance agent by one year: policy shock + economic drift."""
        rng = self.model.rng_instance

        if not self.policy_applied:
            self._apply_policy()

        # Economic drift — literature: productivity +0.2%/year (OECD)
        if self.employed:
            drift = rng.gauss(0.002, 0.012)
            self.income = max(100, self.income * (1 + drift))
        else:
            # Unemployment benefits: ~60% of base income (EU average)
            # This avoids the compounding collapse of the previous model
            benefit = self.base_income * 0.60
            self.income = max(50, benefit + rng.gauss(0, benefit * 0.05))

        # Wellbeing convergence
        target_wb = self._initial_wellbeing() + (0.08 if self.employed else 0)
        self.wellbeing = round(max(0.0, min(1.0,
                                            self.wellbeing + 0.05 *
                                            (target_wb - self.wellbeing)
                                            + rng.gauss(0, 0.008)
                                            )), 3)

        # Carbon: annual efficiency gain -0.4%/year (IEA decarbonisation trend)
        eff_gain = rng.gauss(-0.004, 0.006)
        self.carbon_footprint = max(0.1,
                                    self.carbon_footprint * (1 + eff_gain)
                                    )

        # Health convergence
        tgt_h = min(1.0,
                    0.45 + (self.decile / 9) * 0.25
                    + (0.10 if self.employed else -0.05)
                    - 0.003 * max(0, self.age - 40)
                    )
        self.health_score = round(max(0.0, min(1.0,
                                               self.health_score + 0.04 *
                                               (tgt_h - self.health_score)
                                               + rng.gauss(0, 0.006)
                                               )), 3)

        # Education: slow improvement via learning/experience
        tgt_e = min(1.0,
                    self.education_score + 0.002   # lifelong learning
                    )
        self.education_score = round(max(0.0, min(1.0,
                                                  self.education_score + 0.03 *
                                                  (tgt_e - self.education_score)
                                                  + rng.gauss(0, 0.005)
                                                  )), 3)

        # Social trust convergence
        tgt_t = 0.40 + (0.12 if self.employed else -0.08)
        self.social_trust = round(max(0.0, min(1.0,
                                               self.social_trust + 0.04 *
                                               (tgt_t - self.social_trust)
                                               + rng.gauss(0, 0.008)
                                               )), 3)

        # Governance trust: slow, mean-reverting
        tgt_g = 0.45 - self.model.rng_instance.gauss(0, 0.02)
        self.governance_trust = round(max(0.0, min(1.0,
                                                   self.governance_trust + 0.03 *
                                                   (tgt_g - self.governance_trust)
                                                   + rng.gauss(0, 0.007)
                                                   )), 3)

        # Gender equality: slow upward trend (societal progress)
        tgt_ge = min(1.0, self.gender_equality + 0.001)
        self.gender_equality = round(max(0.0, min(1.0,
            self.gender_equality + 0.02 * (tgt_ge - self.gender_equality)
            + rng.gauss(0, 0.005)
        )), 3)

        # Discrimination: mean-reverting toward social trust level
        tgt_disc = 0.60 + self.social_trust * 0.20
        self.discrimination_score = round(max(0.0, min(1.0,
            self.discrimination_score + 0.02 * (tgt_disc - self.discrimination_score)
            + rng.gauss(0, 0.005)
        )), 3)

        # Social mobility: very slow (structural, decade-scale)
        tgt_mob = self.social_mobility + 0.0005
        self.social_mobility = round(max(0.0, min(1.0,
            self.social_mobility + 0.01 * (tgt_mob - self.social_mobility)
            + rng.gauss(0, 0.004)
        )), 3)

        # Wealth: annual return ~3 % real (volatile)
        w_return = rng.gauss(0.03, 0.10)
        self.wealth = max(0.0, self.wealth * (1 + w_return))
        self.capital_income = self.wealth * 0.03 / 12
        self.labour_income  = max(100.0, self.income - self.capital_income)
        self.income         = self.labour_income + self.capital_income

        # Mortality: mean-reverting to age/income baseline
        age_h  = math.exp(max(0.0, (self.age - 40) * 0.065))
        tgt_m  = min(0.40, 0.006 * age_h * max(0.5, 2.0 - (self.decile / 9) * 1.5))
        self.mortality_risk = round(max(0.0, min(0.40,
            self.mortality_risk + 0.05 * (tgt_m - self.mortality_risk)
            + rng.gauss(0, 0.0005)
        )), 5)

        self.consumption = self.income * (1 - self.savings_rate)

    # ── Snapshot ─────────────────────────────────────────────────────────────

    def snapshot(self) -> dict:
        """Serialisable snapshot of the agent state."""
        return {
            "age":                self.age,
            "decile":             self.decile,
            "sector":             self.sector,
            "income":             round(self.income, 2),
            "labour_income":      round(self.labour_income, 2),
            "capital_income":     round(self.capital_income, 2),
            "wealth":             round(self.wealth, 0),
            "employed":           self.employed,
            "wellbeing":          self.wellbeing,
            "carbon_footprint":   round(self.carbon_footprint, 3),
            "green_score":        round(self.green_score, 3),
            "health_score":       self.health_score,
            "mortality_risk":     self.mortality_risk,
            "education_score":    self.education_score,
            "social_trust":       self.social_trust,
            "governance_trust":   self.governance_trust,
            "gender_equality":    self.gender_equality,
            "discrimination_score": self.discrimination_score,
            "social_mobility":    self.social_mobility,
            "political_position": round(self.political_position, 3),
        }
