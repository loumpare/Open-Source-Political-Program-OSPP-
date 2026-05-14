"""Multi-year economic-social-educational ABM — Mesa 3.

Covers all 6 policy domains:
  Économie · Éducation · Environnement · Social · Santé · Gouvernance
"""
from __future__ import annotations

import random

from mesa import Model
from mesa.datacollection import DataCollector

from simulation.agents import CitizenAgent
from simulation.demographics import compute_gini, get_profile
from simulation.policy_parser import PolicyParams


class EconomyModel(Model):
    """
    Agent-based model running control vs treatment in parallel.
    Flat series format for frontend compatibility.
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
        self.n_agents     = n_agents
        self.policy       = policy
        self.country      = country
        self.current_step = 0

        profile = get_profile(country)
        self._poverty_line = profile.poverty_line_eur

        for _ in range(n_agents):
            CitizenAgent(self, profile, policy=policy, with_policy=False)
            CitizenAgent(self, profile, policy=policy, with_policy=True)

        self.datacollector = DataCollector(
            model_reporters={
                "year":               lambda m: m.current_step,
                # 📈 Économie
                "gdp_control":        lambda m: m._mean_income(False),
                "gdp_policy":         lambda m: m._mean_income(True),
                "gini_control":       lambda m: m._gini(False),
                "gini_policy":        lambda m: m._gini(True),
                "employment_control": lambda m: m._employment(False),
                "employment_policy":  lambda m: m._employment(True),
                "poverty_control":    lambda m: m._poverty(False),
                "poverty_policy":     lambda m: m._poverty(True),
                # 🌱 Environnement
                "carbon_control":     lambda m: m._mean_attr("carbon_footprint", False),
                "carbon_policy":      lambda m: m._mean_attr("carbon_footprint", True),
                "green_control":      lambda m: m._mean_attr("green_score", False),
                "green_policy":       lambda m: m._mean_attr("green_score", True),
                # 🤝 Social
                "wellbeing_control":  lambda m: m._mean_attr("wellbeing", False),
                "wellbeing_policy":   lambda m: m._mean_attr("wellbeing", True),
                "trust_control":      lambda m: m._mean_attr("social_trust", False),
                "trust_policy":       lambda m: m._mean_attr("social_trust", True),
                # 🎓 Éducation
                "education_control":  lambda m: m._mean_attr("education_score", False),
                "education_policy":   lambda m: m._mean_attr("education_score", True),
                # 💊 Santé
                "health_control":     lambda m: m._mean_attr("health_score", False),
                "health_policy":      lambda m: m._mean_attr("health_score", True),
                # 🏛 Gouvernance
                "governance_control": lambda m: m._mean_attr("governance_trust", False),
                "governance_policy":  lambda m: m._mean_attr("governance_trust", True),
                # ⚖️ Social avancé
                "gender_eq_control":   lambda m: m._mean_attr("gender_equality", False),
                "gender_eq_policy":    lambda m: m._mean_attr("gender_equality", True),
                "discrim_control":     lambda m: m._mean_attr("discrimination_score", False),
                "discrim_policy":      lambda m: m._mean_attr("discrimination_score", True),
                "mobility_control":    lambda m: m._mean_attr("social_mobility", False),
                "mobility_policy":     lambda m: m._mean_attr("social_mobility", True),
                # 💀 Mortalité
                "mortality_control":   lambda m: m._mean_attr("mortality_risk", False),
                "mortality_policy":    lambda m: m._mean_attr("mortality_risk", True),
                # 💰 Patrimoine
                "wealth_gini_control": lambda m: compute_gini(
                    [a.wealth for a in m._group(False)]),
                "wealth_gini_policy":  lambda m: compute_gini(
                    [a.wealth for a in m._group(True)]),
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
        """Absolute poverty: fraction below the country poverty line."""
        grp = self._group(with_policy)
        if not grp:
            return 0.0
        poor = sum(1 for a in grp if a.income < self._poverty_line)
        return round(poor / len(grp), 4)

    # ── Public step ───────────────────────────────────────────────────────────

    def step(self) -> None:
        self.datacollector.collect(self)
        self.agents.do("step")
        self.current_step += 1

    # ── Results export ────────────────────────────────────────────────────────

    def get_results(self) -> dict:
        df = self.datacollector.get_model_vars_dataframe()
        horizon = (
            self.policy.horizon_years if self.policy else self.current_step
        )

        series = []
        for _, row in df.iterrows():
            s: dict = {"year": int(row["year"])}
            for key in [
                "gdp", "gini", "employment", "poverty",
                "carbon", "green",
                "wellbeing", "trust",
                "education", "health", "governance",
            ]:
                ctrl = float(row[f"{key}_control"])
                pol  = float(row[f"{key}_policy"])
                s[f"{key}_control"] = ctrl
                s[f"{key}_policy"]  = pol
                if key in ("gdp", "carbon"):
                    s[f"{key}_delta_pct"] = _pct_delta(ctrl, pol)
                else:
                    s[f"{key}_delta"] = round(pol - ctrl, 4)
            # ⚖️ Social / mortality / wealth (separate column prefix mapping)
            for col, label in [
                ("gender_eq",   "gender_equality"),
                ("discrim",     "discrimination"),
                ("mobility",    "mobility"),
                ("mortality",   "mortality"),
                ("wealth_gini", "wealth_gini"),
            ]:
                ctrl = float(row[f"{col}_control"])
                pol  = float(row[f"{col}_policy"])
                s[f"{label}_control"] = ctrl
                s[f"{label}_policy"]  = pol
                s[f"{label}_delta"]   = round(pol - ctrl, 4)
            series.append(s)

        last = series[-1] if series else {}

        def _lv(k: str) -> float:
            return float(last.get(k, 0))

        return {
            "meta": {
                "proposal_id":      self.policy.proposal_id if self.policy else "",
                "title":            self.policy.title if self.policy else "",
                "country":          self.country,
                "n_agents":         self.n_agents,
                "horizon_years":    horizon,
                "seed":             self.rng_instance.getstate()[1][0],
                "poverty_line_eur": self._poverty_line,
            },
            "summary": {
                # 📈 Économie
                "gdp_delta_pct":      _lv("gdp_delta_pct"),
                "gini_delta":         _lv("gini_delta"),
                "employment_delta":   _lv("employment_delta"),
                "poverty_delta":      _lv("poverty_delta"),
                # 🌱 Environnement
                "carbon_delta_pct":   _lv("carbon_delta_pct"),
                "green_delta":        _lv("green_delta"),
                # 🤝 Social
                "wellbeing_delta":    _lv("wellbeing_delta"),
                "trust_delta":        _lv("trust_delta"),
                # 🎓 Éducation
                "education_delta":    _lv("education_delta"),
                # 💊 Santé
                "health_delta":       _lv("health_delta"),
                # 🏛 Gouvernance
                "governance_delta":       _lv("governance_delta"),
                # ⚖️ Social avancé
                "gender_equality_delta":  _lv("gender_equality_delta"),
                "discrimination_delta":   _lv("discrimination_delta"),
                "mobility_delta":         _lv("mobility_delta"),
                # 💀 Mortalité
                "mortality_delta":        _lv("mortality_delta"),
                # 💰 Patrimoine
                "wealth_gini_delta":      _lv("wealth_gini_delta"),
                "effect_description": (
                    self.policy.effect_description if self.policy else ""
                ),
            },
            "series":       series,
            "demographics": self._demo_breakdown(),
        }

    def _demo_breakdown(self) -> dict:
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
                "employment_rate": round(sum(
                    1 for a in cohort if a.employed) / n, 3),
                "mean_wellbeing":  round(sum(
                    a.wellbeing for a in cohort) / n, 3),
                "mean_carbon":     round(sum(
                    a.carbon_footprint for a in cohort) / n, 2),
                "mean_health":     round(sum(
                    a.health_score for a in cohort) / n, 3),
                "mean_education":  round(sum(
                    a.education_score for a in cohort) / n, 3),
                "mean_governance": round(sum(
                    a.governance_trust for a in cohort) / n, 3),
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
    """Run a full simulation and return the results dict."""
    model = EconomyModel(
        n_agents=n_agents,
        policy=policy,
        country=policy.country,
        seed=seed,
    )
    for _ in range(policy.horizon_years):
        model.step()
    return model.get_results()
