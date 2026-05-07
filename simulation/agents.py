from mesa import Agent
import random

# INSEE-calibrated distributions (simplified)
AGE_GROUPS = [(18, 34, 0.22), (35, 49, 0.24), (50, 64, 0.26), (65, 90, 0.28)]
REGIONS = ["Île-de-France", "Auvergne-Rhône-Alpes", "Provence-Alpes-Côte d'Azur",
           "Occitanie", "Hauts-de-France", "Nouvelle-Aquitaine", "Grand Est", "Bretagne"]
CSPS = ["Agriculteur", "Artisan/Commerçant", "Cadre", "Prof. intermédiaire",
        "Employé", "Ouvrier", "Retraité", "Sans emploi"]
EDUCATION = ["Aucun diplôme", "Brevet", "CAP/BEP", "Bac", "Bac+2", "Bac+3/4", "Bac+5+"]


def _sample_age() -> int:
    r = random.random()
    cumulative = 0.0
    for low, high, prob in AGE_GROUPS:
        cumulative += prob
        if r <= cumulative:
            return random.randint(low, high)
    return random.randint(65, 90)


class CitizenAgent(Agent):
    """A French citizen agent with demographic attributes and a political position."""

    def __init__(self, unique_id: int, model, proposition: dict = None):
        super().__init__(unique_id, model)
        self.age = _sample_age()
        self.region = random.choice(REGIONS)
        self.csp = random.choices(
            CSPS,
            weights=[3, 6, 16, 25, 27, 12, 26, 10],
        )[0]
        self.education = random.choice(EDUCATION)
        self.political_position = random.gauss(0, 0.35)  # -1 left → +1 right
        self.political_position = max(-1.0, min(1.0, self.political_position))
        self.proposition = proposition or {}
        self.vote = 0  # undecided

    def step(self):
        if self.vote == 0:
            self.vote = self._decide()

    def _decide(self) -> int:
        """Simple heuristic decision; replace with LLM call for realistic simulation."""
        # Lean left → more likely to support progressive propositions
        threshold = 0.1 - self.political_position * 0.3
        return 1 if random.random() > 0.5 + threshold else -1

    def profile(self) -> dict:
        return {
            "age": self.age,
            "region": self.region,
            "csp": self.csp,
            "education": self.education,
            "political_position": round(self.political_position, 2),
        }
