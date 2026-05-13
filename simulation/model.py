"""Multi-year economic ABM — Mesa 3 compatible."""
from __future__ import annotations

import random

from mesa import Model
from mesa.datacollection import DataCollector

from simulation.agents import CitizenAgent
from simulation.demographics import compute_gini, get_profile
from simulation.policy_parser import PolicyParams


class EconomyModel(Model):
    """
    Agent-based economic model that simulates the effect of a policy
    intervention over multiple years.

    Two parallel populations run in the same model:
      - control  group (no policy)
      - treatment group (with policy)
    This allows a clean A/B comparison without running two separate models.
    """

    def __init__(
        self,
        n_agents: int = 10_000,
        policy: PolicyParams | None = None,
        country: str = "fr",
        seed: int = 42,
    ):
        super().__init__(seed=seed)
        # Standard-library RNG exposed to agents for gauss/random calls
        self.rng_instance = random.Random(seed)

        self.n_agents = n_agents
        self.policy = policy
        self.country = country
        self.current_step = 0

        profile = get_profile(country)

        # Create agents: each index i spawns a control + treatment twin
        for _ in range(n_agents):
            CitizenAgent(self, profile, policy=policy, with_policy=False)
            CitizenAgent(self, profile, policy=policy, with_policy=True)

        self.datacollector = DataCollector(
            model_reporters={
                "year":              lambda m: m.current_step,
                "gdp_control":       lambda m: m._mean_income(False),
                "gdp_policy":        lambda m: m._mean_income(True),
                "gini_control":      lambda m: m._gini(False),
                "gini_policy":       lambda m: m._gini(True),
                "employment_control": lambda m: m._employment_rate(False),
                "employment_policy": lambda m: m._employment_rate(True),
                "wellbeing_control": lambda m: m._mean_wellbeing(False),
                "wellbeing_policy":  lambda m: m._mean_wellbeing(True),
            }
        )

    # ── Private metrics ───────────────────────────────────────────────────────

    def _group(self, with_policy: bool) -> list[CitizenAgent]:
        return [
            a for a in self.agents
            if isinstance(a, CitizenAgent) and a.with_policy == with_policy
        ]

    def _mean_income(self, with_policy: bool) -> float:
        group = self._group(with_policy)
        if not group:
            return 0.0
        return round(sum(a.income for a in group) / len(group), 2)

    def _gini(self, with_policy: bool) -> float:
        incomes = [a.income for a in self._group(with_policy)]
        return compute_gini(incomes)

    def _employment_rate(self, with_policy: bool) -> float:
        group = self._group(with_policy)
        if not group:
            return 0.0
        return round(sum(1 for a in group if a.employed) / len(group), 4)

    def _mean_wellbeing(self, with_policy: bool) -> float:
        group = self._group(with_policy)
        if not group:
            return 0.0
        return round(sum(a.wellbeing for a in group) / len(group), 4)

    # ── Public step ───────────────────────────────────────────────────────────

    def step(self) -> None:
        self.datacollector.collect(self)
        self.agents.do("step")
        self.current_step += 1

    # ── Results export ────────────────────────────────────────────────────────

    def get_results(self) -> dict:
        df = self.datacollector.get_model_vars_dataframe()

        horizon = self.policy.horizon_years if self.policy else self.current_step

        # Time series — one entry per collected year (step 0 = baseline)
        series: list[dict] = []
        for _, row in df.iterrows():
            series.append({
                "year":               int(row["year"]),
                "gdp_control":        float(row["gdp_control"]),
                "gdp_policy":         float(row["gdp_policy"]),
                "gdp_delta_pct":      _pct_delta(
                    row["gdp_control"], row["gdp_policy"]
                ),
                "gini_control":       float(row["gini_control"]),
                "gini_policy":        float(row["gini_policy"]),
                "gini_delta":         round(
                    row["gini_policy"] - row["gini_control"], 4
                ),
                "employment_control": float(row["employment_control"]),
                "employment_policy":  float(row["employment_policy"]),
                "employment_delta":   round(
                    row["employment_policy"]
                    - row["employment_control"],
                    4,
                ),
                "wellbeing_control":  float(row["wellbeing_control"]),
                "wellbeing_policy":   float(row["wellbeing_policy"]),
                "wellbeing_delta":    round(
                    row["wellbeing_policy"]
                    - row["wellbeing_control"],
                    4,
                ),
            })

        # Final snapshot
        last = series[-1] if series else {}

        return {
            "meta": {
                "proposal_id":   self.policy.proposal_id if self.policy else "",
                "title":         self.policy.title if self.policy else "",
                "country":       self.country,
                "n_agents":      self.n_agents,
                "horizon_years": horizon,
                "seed":          self.rng_instance.getstate()[1][0],
            },
            "summary": {
                "gdp_delta_pct":      last.get("gdp_delta_pct",      0),
                "gini_delta":         last.get("gini_delta",          0),
                "employment_delta":   last.get("employment_delta",    0),
                "wellbeing_delta":    last.get("wellbeing_delta",     0),
                "effect_description": (
                    self.policy.effect_description if self.policy else ""
                ),
            },
            "series": series,
            "demographics": self._demo_breakdown(),
        }

    def _demo_breakdown(self) -> dict:
        """Income decile × employment rate in the policy group."""
        group = self._group(True)
        breakdown: dict[int, dict] = {}
        for dec in range(10):
            cohort = [a for a in group if a.decile == dec]
            if not cohort:
                continue
            breakdown[dec] = {
                "n":              len(cohort),
                "mean_income":    round(
                    sum(a.income for a in cohort) / len(cohort), 2
                ),
                "employment_rate": round(
                    sum(1 for a in cohort if a.employed) / len(cohort), 3
                ),
                "mean_wellbeing": round(
                    sum(a.wellbeing for a in cohort) / len(cohort), 3
                ),
            }
        return breakdown


def _pct_delta(base: float, new: float) -> float:
    if base == 0:
        return 0.0
    return round((new - base) / base * 100, 2)


def run_simulation(
    policy: PolicyParams,
    n_agents: int = 10_000,
    seed: int = 42,
) -> dict:
    """
    Convenience function: create model, run for policy.horizon_years steps,
    return the full results dict.
    """
    model = EconomyModel(
        n_agents=n_agents,
        policy=policy,
        country=policy.country,
        seed=seed,
    )
    for _ in range(policy.horizon_years):
        model.step()
    return model.get_results()
