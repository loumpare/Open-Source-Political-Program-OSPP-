"""Economic-social-environmental CitizenAgent for Mesa 3 policy simulation."""
from __future__ import annotations

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
    "Industry": 1.55,    "Industrie": 1.55,
    "Manufacturing": 1.55, "Oil & Gas": 2.10,
    "Resources": 1.60,   "Construction": 1.30, "Baugewerbe": 1.30,
    "Services": 0.90,    "Services privés": 0.90, "Dienstleistungen": 0.90,
    "Public sector": 0.80, "Services publics": 0.80,
    "Öffentlicher Dienst": 0.80, "Government": 0.80, "Healthcare": 0.75,
}


class CitizenAgent(Agent):
    """A citizen with economic, environmental and social attributes."""

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

        base_emp = profile.employment_rate
        if self.age < 25:
            base_emp *= 0.70
        elif self.age > 60:
            base_emp *= 0.60
        self.employed = rng.random() < base_emp

        self.political_position = max(-1.0, min(1.0,
                                                rng.gauss(
                                                    0, profile.political_std)
                                                ))
        noise = rng.gauss(0, 0.02)
        self.savings_rate = max(0.02, min(
            0.30, 0.04 + self.decile * 0.025 + noise
        ))
        self.consumption = self.income * (1 - self.savings_rate)

        # ── Economic ─────────────────────────────────────────────────────────
        self.wellbeing = self._initial_wellbeing()

        # ── Environmental ────────────────────────────────────────────────────
        # tCO2/year: income-scaled + sector multiplier + noise
        sector_mult = _CARBON_SECTOR.get(self.sector, 1.0)
        income_scale = 0.5 + (self.decile / 9) * 1.2
        self.carbon_footprint = round(
            profile.carbon_baseline_t * income_scale * sector_mult
            * rng.uniform(0.85, 1.15),
            2,
        )
        # Green behaviour score (0–1): wealthier + public sector → greener
        self.green_score = max(0.0, min(1.0,
                                        profile.collectivism * 0.4
                                        + (self.decile / 9) * 0.3
                                        + (0.2 if "public" in self.sector.lower() else 0)
                                        + rng.gauss(0, 0.05)
                                        ))

        # ── Social / Health ──────────────────────────────────────────────────
        # Health score (0–1): income + employment + age + healthcare system
        self.health_score = self._initial_health(profile)

        # Social trust (0–1): collectivism base + employment bonus
        self.social_trust = max(0.0, min(1.0,
                                         profile.collectivism * 0.6
                                         + (0.15 if self.employed else -0.1)
                                         + rng.gauss(0, 0.08)
                                         ))

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
        """Apply one-time policy shock if this agent is targeted."""
        if self.policy is None or self.policy_applied:
            return
        self.policy_applied = True
        if not self._is_targeted():
            return

        p = self.policy
        rng = self.model.rng_instance

        # Economic
        self.income = self.income * p.income_multiplier + p.monthly_transfer
        if p.employment_delta > 0 and not self.employed:
            if rng.random() < p.employment_delta * 5:
                self.employed = True
        elif p.employment_delta < 0 and self.employed:
            if rng.random() < abs(p.employment_delta) * 3:
                self.employed = False
        self.wellbeing = min(1.0, self.wellbeing + p.wellbeing_delta)

        # Environmental: env policies reduce carbon; income gains increase it slightly
        if "env" in (getattr(p, "domain", "") or "").lower():
            self.carbon_footprint *= max(0.3, 1.0 + p.gini_delta * 3)
            self.green_score = min(1.0, self.green_score + 0.12)
        else:
            # Income increase → slight carbon rebound (Kuznets)
            self.carbon_footprint *= 1 + max(0, p.income_multiplier - 1) * 0.3

        # Health: transfers + wellbeing boost → better health
        health_boost = p.wellbeing_delta * 0.5 + p.monthly_transfer / 10_000
        self.health_score = min(1.0, self.health_score + health_boost)

        # Social trust: employment + income → trust; inequality reduction → trust
        trust_boost = (0.08 if p.employment_delta >
                       0 else 0) - p.gini_delta * 2
        self.social_trust = max(0.0, min(1.0,
                                         self.social_trust + trust_boost
                                         ))

    # ── Mesa step ─────────────────────────────────────────────────────────────

    def step(self) -> None:
        """Advance agent one year: apply policy shock then dynamic drift."""
        rng = self.model.rng_instance

        if not self.policy_applied:
            self._apply_policy()

        # Economic drift
        if self.employed:
            drift = rng.gauss(0.002, 0.015)
            self.income = max(100, self.income * (1 + drift))
        else:
            self.income = max(50, self.income * rng.uniform(0.23, 0.28))

        # Wellbeing convergence
        target_wb = self._initial_wellbeing() + (0.1 if self.employed else 0)
        self.wellbeing = round(max(0.0, min(1.0,
                                            self.wellbeing + 0.05 *
                                            (target_wb - self.wellbeing)
                                            + rng.gauss(0, 0.01)
                                            )), 3)

        # Carbon drift: slight annual efficiency gain (−0.5%/year) + income effect
        eff_gain = rng.gauss(-0.005, 0.008)
        self.carbon_footprint = max(0.1,
                                    self.carbon_footprint * (1 + eff_gain)
                                    )

        # Health drift: converges toward income/age equilibrium
        target_h = min(1.0, 0.45 + (self.decile / 9) * 0.25
                       + (0.10 if self.employed else -0.05)
                       - 0.003 * max(0, self.age - 40))
        self.health_score = round(max(0.0, min(1.0,
                                               self.health_score + 0.04 *
                                               (target_h - self.health_score)
                                               + rng.gauss(0, 0.008)
                                               )), 3)

        # Social trust drift
        target_t = 0.4 + (0.15 if self.employed else -0.1)
        self.social_trust = round(max(0.0, min(1.0,
                                               self.social_trust + 0.04 *
                                               (target_t - self.social_trust)
                                               + rng.gauss(0, 0.01)
                                               )), 3)

        self.consumption = self.income * (1 - self.savings_rate)

    # ── Snapshot ─────────────────────────────────────────────────────────────

    def snapshot(self) -> dict:
        """Serialisable snapshot of agent state."""
        return {
            "age": self.age,
            "decile": self.decile,
            "sector": self.sector,
            "income": round(self.income, 2),
            "employed": self.employed,
            "wellbeing": self.wellbeing,
            "carbon_footprint": round(self.carbon_footprint, 3),
            "green_score": round(self.green_score, 3),
            "health_score": self.health_score,
            "social_trust": self.social_trust,
            "political_position": round(self.political_position, 3),
        }
