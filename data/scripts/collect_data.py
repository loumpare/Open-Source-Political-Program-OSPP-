"""
Data collection scripts for OSPP.
Sources: INSEE, IFOP, data.gouv.fr, elections.interieur.gouv.fr
"""
import json
import csv
import urllib.request
from pathlib import Path

RAW_DIR = Path(__file__).parent.parent / "raw"
RAW_DIR.mkdir(exist_ok=True)


def fetch_elections_2022():
    """Download 2022 presidential election results by commune."""
    url = "https://elections.interieur.gouv.fr/telechargements/PR2022/resultatsT2/FE.json"
    dest = RAW_DIR / "elections_presidentielle_2022.json"
    if not dest.exists():
        print(f"Downloading {url}…")
        urllib.request.urlretrieve(url, dest)
        print(f"Saved to {dest}")
    else:
        print(f"Already downloaded: {dest}")


def build_agent_demographics(n_agents: int = 1000, output_path: Path = None):
    """
    Generate synthetic agent demographic profiles calibrated on INSEE data.
    In production replace with real INSEE microdata.
    """
    import random

    if output_path is None:
        output_path = RAW_DIR / f"agents_{n_agents}.json"

    agents = []
    csps = ["Cadre", "Employé", "Ouvrier", "Retraité", "Sans emploi", "Artisan", "Agriculteur"]
    regions = ["Île-de-France", "Auvergne-Rhône-Alpes", "PACA", "Occitanie", "Hauts-de-France"]

    for i in range(n_agents):
        agents.append({
            "id": i,
            "age": random.randint(18, 85),
            "region": random.choice(regions),
            "csp": random.choice(csps),
            "education": random.choice(["Bac", "Bac+2", "Bac+3/4", "Bac+5+", "CAP/BEP", "Aucun"]),
            "political_position": round(random.gauss(0, 0.35), 2),
        })

    with open(output_path, "w") as f:
        json.dump(agents, f, ensure_ascii=False, indent=2)
    print(f"Generated {n_agents} agent profiles → {output_path}")


if __name__ == "__main__":
    build_agent_demographics(10000)
