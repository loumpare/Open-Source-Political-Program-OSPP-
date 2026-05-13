"""Economic CitizenAgent for Mesa 3 policy simulation."""
from __future__ import annotations

from mesa import Agent

from simulation.demographics import (
    CountryProfile,
    sample_age,
    sample_income,
    sample_sector,
)
from simulation.policy_parser import PolicyParams


class CitizenAgent(Agent):
    """A citizen with demographics + economic state that responds to policy."""

    def __init__(
        self,
        model,
        profile: CountryProfile,
        policy: PolicyParams | None = None,
        with_policy: bool = True,
    ):
        super().__init__(model)
        rng = model.rng_instance

        # Demographics
        self.country = profile.code
        self.age = sample_age(profile, rng)
        self.sector = sample_sector(profile, rng)
        self.decile, self.income = sample_income(profile, rng)

        # Employment: adjusted by age curve
        base_emp = profile.employment_rate
        if self.age < 25:
            base_emp *= 0.70
        elif self.age > 60:
            base_emp *= 0.60
        self.employed = rng.random() < base_emp

        # Wellbeing 0–1, political position −1 to +1
        self.wellbeing = self._initial_wellbeing()
        self.political_position = max(-1.0, min(1.0,
            rng.gauss(0, profile.political_std)
        ))

        # Economic dynamics
        noise = rng.gauss(0, 0.02)
        self.savings_rate = max(0.02, min(
            0.30, 0.04 + self.decile * 0.025 + noise
        ))
        self.consumption = self.income * (1 - self.savings_rate)

        # Policy state
        self.policy = policy
        self.with_policy = with_policy
        self.policy_applied = False

    def _initial_wellbeing(self) -> float:
        inc_score = min(1.0, self.decile / 9)
        emp_score = 0.85 if self.employed else 0.30
        return round(0.6 * inc_score + 0.4 * emp_score, 3)

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
        """Apply the one-time policy shock to this agent if targeted."""
        if self.policy is None or self.policy_applied:
            return
        self.policy_applied = True
        if not self._is_targeted():
            return

        p = self.policy
        rng = self.model.rng_instance

        self.income = self.income * p.income_multiplier + p.monthly_transfer

        if p.employment_delta > 0 and not self.employed:
            if rng.random() < p.employment_delta * 5:
                self.employed = True
        elif p.employment_delta < 0 and self.employed:
            if rng.random() < abs(p.employment_delta) * 3:
                self.employed = False

        self.wellbeing = min(1.0, self.wellbeing + p.wellbeing_delta)

    def step(self) -> None:
        """Advance agent by one year: apply policy shock then economic drift."""
        rng = self.model.rng_instance

        if not self.policy_applied:
            self._apply_policy()

        if self.employed:
            drift = rng.gauss(0.002, 0.015)
            self.income = max(100, self.income * (1 + drift))
        else:
            self.income = max(50, self.income * rng.uniform(0.23, 0.28))

        target = self._initial_wellbeing() + (0.1 if self.employed else 0)
        self.wellbeing = round(
            self.wellbeing + 0.05 * (target - self.wellbeing)
            + rng.gauss(0, 0.01),
            3,
        )
        self.wellbeing = max(0.0, min(1.0, self.wellbeing))
        self.consumption = self.income * (1 - self.savings_rate)

    def snapshot(self) -> dict:
        """Return a serialisable snapshot of the agent state."""
        return {
            "age": self.age,
            "decile": self.decile,
            "sector": self.sector,
            "income": round(self.income, 2),
            "employed": self.employed,
            "wellbeing": self.wellbeing,
            "political_position": round(self.political_position, 3),
        }
