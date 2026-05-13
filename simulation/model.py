"""Multi-year economic-social-environmental ABM — Mesa 3."""
from __future__ import annotations

import random

from mesa import Model
from mesa.datacollection import DataCollector

from simulation.agents import CitizenAgent
from simulation.demographics import compute_gini, get_profile
from simulation.policy_parser import PolicyParams


class EconomyModel(Model):
    """
    Agent-based model simulating a policy intervention over multiple years.

    Two parallel groups (control / treatment) run in the same model for
    a clean A/B comparison.  Metrics cover economic, environmental and
    social dimensions.
    """

    def __init__(
        self,
        n_agents: int = 10_000,
        policy: PolicyParams | None = None,
        country: str = "fr",
        seed: int = 42,
    ):
        super().__init__(seed=seed)
        self.rng_instance = random.Random(seed)

        self.n_agents = n_agents
        self.policy = policy
        self.country = country
        self.current_step = 0

        profile = get_profile(country)
        for _ in range(n_agents):
            CitizenAgent(self, profile, policy=policy, with_policy=False)
            CitizenAgent(self, profile, policy=policy, with_policy=True)

        self.datacollector = DataCollector(
            model_reporters={
                # housekeeping
                "year": lambda m: m.current_step,
                # economic
                "gdp_control": lambda m: m._mean_income(False),
                "gdp_policy": lambda m: m._mean_income(True),
                "gini_control": lambda m: m._gini(False),
                "gini_policy": lambda m: m._gini(True),
                "employment_control": lambda m: m._employment(False),
                "employment_policy": lambda m: m._employment(True),
                "poverty_control": lambda m: m._poverty(False),
                "poverty_policy": lambda m: m._poverty(True),
                # wellbeing
                "wellbeing_control": lambda m: m._mean_attr("wellbeing", False),
                "wellbeing_policy": lambda m: m._mean_attr("wellbeing", True),
                # environmental
                "carbon_control": lambda m: m._mean_attr("carbon_footprint", False),
                "carbon_policy": lambda m: m._mean_attr("carbon_footprint", True),
                "green_control": lambda m: m._mean_attr("green_score", False),
                "green_policy": lambda m: m._mean_attr("green_score", True),
                # social
                "health_control": lambda m: m._mean_attr("health_score", False),
                "health_policy": lambda m: m._mean_attr("health_score", True),
                "trust_control": lambda m: m._mean_attr("social_trust", False),
                "trust_policy": lambda m: m._mean_attr("social_trust", True),
            }
        )

    # ── Private metrics ───────────────────────────────────────────────────────

    def _group(self, with_policy: bool) -> list[CitizenAgent]:
        return [
            a for a in self.agents
            if isinstance(a, CitizenAgent) and a.with_policy == with_policy
        ]

    def _mean_income(self, with_policy: bool) -> float:
        grp = self._group(with_policy)
        if not grp:
            return 0.0
        return round(sum(a.income for a in grp) / len(grp), 2)

    def _mean_attr(self, attr: str, with_policy: bool) -> float:
        grp = self._group(with_policy)
        if not grp:
            return 0.0
        return round(sum(getattr(a, attr) for a in grp) / len(grp), 4)

    def _gini(self, with_policy: bool) -> float:
        return compute_gini([a.income for a in self._group(with_policy)])

    def _employment(self, with_policy: bool) -> float:
        grp = self._group(with_policy)
        if not grp:
            return 0.0
        return round(sum(1 for a in grp if a.employed) / len(grp), 4)

    def _poverty(self, with_policy: bool) -> float:
        """Fraction of agents earning below 60 % of median income."""
        grp = self._group(with_policy)
        if not grp:
            return 0.0
        incomes = sorted(a.income for a in grp)
        median = incomes[len(incomes) // 2]
        threshold = median * 0.60
        poor = sum(1 for v in incomes if v < threshold)
        return round(poor / len(incomes), 4)

    # ── Public step ───────────────────────────────────────────────────────────

    def step(self) -> None:
        self.datacollector.collect(self)
        self.agents.do("step")
        self.current_step += 1

    # ── Results export ────────────────────────────────────────────────────────

    def get_results(self) -> dict:
        df = self.datacollector.get_model_vars_dataframe()
        horizon = self.policy.horizon_years if self.policy else self.current_step

        series = []
        for _, row in df.iterrows():
            series.append({
                "year":                int(row["year"]),
                # economic
                "gdp_control":         float(row["gdp_control"]),
                "gdp_policy":          float(row["gdp_policy"]),
                "gdp_delta_pct":       _pct_delta(row["gdp_control"], row["gdp_policy"]),
                "gini_control":        float(row["gini_control"]),
                "gini_policy":         float(row["gini_policy"]),
                "gini_delta":          round(float(row["gini_policy"] - row["gini_control"]), 4),
                "employment_control":  float(row["employment_control"]),
                "employment_policy":   float(row["employment_policy"]),
                "employment_delta":    round(float(row["employment_policy"] - row["employment_control"]), 4),
                "poverty_control":     float(row["poverty_control"]),
                "poverty_policy":      float(row["poverty_policy"]),
                "poverty_delta":       round(float(row["poverty_policy"] - row["poverty_control"]), 4),
                # wellbeing
                "wellbeing_control":   float(row["wellbeing_control"]),
                "wellbeing_policy":    float(row["wellbeing_policy"]),
                "wellbeing_delta":     round(float(row["wellbeing_policy"] - row["wellbeing_control"]), 4),
                # environmental
                "carbon_control":      float(row["carbon_control"]),
                "carbon_policy":       float(row["carbon_policy"]),
                "carbon_delta_pct":    _pct_delta(row["carbon_control"], row["carbon_policy"]),
                "green_control":       float(row["green_control"]),
                "green_policy":        float(row["green_policy"]),
                "green_delta":         round(float(row["green_policy"] - row["green_control"]), 4),
                # social
                "health_control":      float(row["health_control"]),
                "health_policy":       float(row["health_policy"]),
                "health_delta":        round(float(row["health_policy"] - row["health_control"]), 4),
                "trust_control":       float(row["trust_control"]),
                "trust_policy":        float(row["trust_policy"]),
                "trust_delta":         round(float(row["trust_policy"] - row["trust_control"]), 4),
            })

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
                # economic
                "gdp_delta_pct":        last.get("gdp_delta_pct",       0),
                "gini_delta":           last.get("gini_delta",           0),
                "employment_delta":     last.get("employment_delta",     0),
                "poverty_delta":        last.get("poverty_delta",        0),
                "wellbeing_delta":      last.get("wellbeing_delta",      0),
                # environmental
                "carbon_delta_pct":     last.get("carbon_delta_pct",    0),
                "green_delta":          last.get("green_delta",          0),
                # social
                "health_delta":         last.get("health_delta",         0),
                "trust_delta":          last.get("trust_delta",          0),
                "effect_description": (
                    self.policy.effect_description if self.policy else ""
                ),
            },
            "series":       series,
            "demographics": self._demo_breakdown(),
        }

    def _demo_breakdown(self) -> dict:
        """Per-decile snapshot for the policy group at end of simulation."""
        grp = self._group(True)
        breakdown: dict[int, dict] = {}
        for dec in range(10):
            cohort = [a for a in grp if a.decile == dec]
            if not cohort:
                continue
            n = len(cohort)
            breakdown[dec] = {
                "n":               n,
                "mean_income":     round(sum(a.income for a in cohort) / n, 2),
                "employment_rate": round(sum(1 for a in cohort if a.employed) / n, 3),
                "mean_wellbeing":  round(sum(a.wellbeing for a in cohort) / n, 3),
                "mean_carbon":     round(sum(a.carbon_footprint for a in cohort) / n, 2),
                "mean_health":     round(sum(a.health_score for a in cohort) / n, 3),
                "mean_trust":      round(sum(a.social_trust for a in cohort) / n, 3),
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
    """Run simulation for policy.horizon_years steps, return full results."""
    model = EconomyModel(
        n_agents=n_agents,
        policy=policy,
        country=policy.country,
        seed=seed,
    )
    for _ in range(policy.horizon_years):
        model.step()
    return model.get_results()
