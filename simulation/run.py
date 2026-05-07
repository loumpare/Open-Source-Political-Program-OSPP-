"""CLI runner for local simulation testing."""
import argparse
import json
from simulation.model import PoliticalModel


def main():
    parser = argparse.ArgumentParser(description="Run a local OSPP simulation")
    parser.add_argument("--agents", type=int, default=1000)
    parser.add_argument("--steps", type=int, default=5)
    parser.add_argument("--proposition", type=str, default='{"title": "Test proposition"}')
    parser.add_argument("--seed", type=int, default=42)
    args = parser.parse_args()

    proposition = json.loads(args.proposition)
    model = PoliticalModel(n_agents=args.agents, proposition=proposition, seed=args.seed)
    for step in range(args.steps):
        model.step()
        print(f"Step {step + 1}: support={model._support_pct()}% oppose={model._oppose_pct()}%")

    results = model.get_results()
    print("\n=== Résultats finaux ===")
    print(json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
