from mesa import Model
from mesa.time import RandomActivation
from mesa.datacollection import DataCollector
from simulation.agents import CitizenAgent
import random


class PoliticalModel(Model):
    """Agent-Based Model of French citizens voting on a political proposition."""

    def __init__(self, n_agents: int = 1000, proposition: dict = None, seed: int = None):
        super().__init__()
        self.n_agents = n_agents
        self.proposition = proposition or {}
        self.schedule = RandomActivation(self)

        if seed is not None:
            random.seed(seed)

        for i in range(n_agents):
            agent = CitizenAgent(i, self, proposition=self.proposition)
            self.schedule.add(agent)

        self.datacollector = DataCollector(
            model_reporters={
                "support_pct": lambda m: self._support_pct(),
                "oppose_pct": lambda m: self._oppose_pct(),
            }
        )

    def step(self):
        self.datacollector.collect(self)
        self.schedule.step()

    def _votes(self):
        return [a.vote for a in self.schedule.agents if a.vote != 0]

    def _support_pct(self):
        votes = self._votes()
        if not votes:
            return 0.0
        return round(sum(1 for v in votes if v == 1) / len(votes) * 100, 2)

    def _oppose_pct(self):
        votes = self._votes()
        if not votes:
            return 0.0
        return round(sum(1 for v in votes if v == -1) / len(votes) * 100, 2)

    def get_results(self) -> dict:
        df = self.datacollector.get_model_vars_dataframe()
        return {
            "n_agents": self.n_agents,
            "final_support_pct": self._support_pct(),
            "final_oppose_pct": self._oppose_pct(),
            "steps": df.to_dict(orient="list"),
            "demographics": self._demographics_breakdown(),
        }

    def _demographics_breakdown(self) -> dict:
        agents = self.schedule.agents
        breakdown = {}
        for csp in set(a.csp for a in agents):
            group = [a for a in agents if a.csp == csp]
            votes = [a.vote for a in group if a.vote != 0]
            support = sum(1 for v in votes if v == 1)
            breakdown[csp] = {
                "n": len(group),
                "support_pct": round(support / len(votes) * 100, 1) if votes else 0,
            }
        return breakdown
