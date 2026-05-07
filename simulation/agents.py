from mesa import Agent
import random

# Demographic profiles per country, calibrated on official statistics
COUNTRY_PROFILES = {
    "fr": {
        "regions": ["Île-de-France", "Auvergne-Rhône-Alpes", "PACA", "Occitanie", "Hauts-de-France", "Grand Est", "Bretagne"],
        "csps": {
            "names": ["Agriculteur", "Artisan/Commerçant", "Cadre", "Prof. intermédiaire", "Employé", "Ouvrier", "Retraité", "Sans emploi"],
            "weights": [3, 6, 16, 25, 27, 12, 26, 10],
        },
        "education": ["Aucun diplôme", "Brevet", "CAP/BEP", "Bac", "Bac+2", "Bac+3/4", "Bac+5+"],
        "political_std": 0.35,
    },
    "us": {
        "regions": ["Northeast", "Midwest", "South", "West", "Southwest"],
        "csps": {
            "names": ["Agriculture", "Blue-collar", "White-collar", "Service", "Professional", "Retired", "Unemployed"],
            "weights": [2, 20, 28, 22, 15, 18, 8],
        },
        "education": ["No diploma", "High school", "Some college", "Associate", "Bachelor", "Graduate"],
        "political_std": 0.42,
    },
    "de": {
        "regions": ["Bayern", "NRW", "Baden-Württemberg", "Berlin", "Sachsen", "Hamburg"],
        "csps": {
            "names": ["Landwirtschaft", "Facharbeiter", "Angestellter", "Beamter", "Selbständig", "Rentner", "Arbeitslos"],
            "weights": [2, 22, 30, 10, 10, 22, 7],
        },
        "education": ["Kein Abschluss", "Hauptschule", "Realschule", "Abitur", "Ausbildung", "Studium"],
        "political_std": 0.33,
    },
    "global": {
        "regions": ["North America", "Europe", "Asia-Pacific", "Latin America", "Africa", "Middle East"],
        "csps": {
            "names": ["Agriculture", "Industry", "Services", "Professional", "Retired", "Unemployed"],
            "weights": [15, 20, 30, 18, 12, 8],
        },
        "education": ["None", "Primary", "Secondary", "Vocational", "University"],
        "political_std": 0.38,
    },
}

AGE_GROUPS = [(18, 34, 0.22), (35, 49, 0.24), (50, 64, 0.26), (65, 90, 0.28)]


def _sample_age() -> int:
    r = random.random()
    cumulative = 0.0
    for low, high, prob in AGE_GROUPS:
        cumulative += prob
        if r <= cumulative:
            return random.randint(low, high)
    return random.randint(65, 90)


class CitizenAgent(Agent):
    """A citizen agent with demographic attributes calibrated to a specific country."""

    def __init__(self, unique_id: int, model, proposition: dict = None):
        super().__init__(unique_id, model)
        country = (proposition or {}).get("country", "global")
        profile = COUNTRY_PROFILES.get(country, COUNTRY_PROFILES["global"])

        self.country = country
        self.age = _sample_age()
        self.region = random.choice(profile["regions"])
        self.csp = random.choices(profile["csps"]["names"], weights=profile["csps"]["weights"])[0]
        self.education = random.choice(profile["education"])
        self.political_position = max(-1.0, min(1.0, random.gauss(0, profile["political_std"])))
        self.proposition = proposition or {}
        self.vote = 0

    def step(self):
        if self.vote == 0:
            self.vote = self._decide()

    def _decide(self) -> int:
        threshold = 0.1 - self.political_position * 0.3
        return 1 if random.random() > 0.5 + threshold else -1

    def profile(self) -> dict:
        return {
            "country": self.country,
            "age": self.age,
            "region": self.region,
            "csp": self.csp,
            "education": self.education,
            "political_position": round(self.political_position, 2),
        }
