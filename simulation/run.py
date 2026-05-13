"""CLI runner for OSPP simulations."""
import argparse
import json
import sys
import time

from simulation.model import run_simulation
from simulation.policy_parser import parse_proposal, parse_proposal_dict


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Run an OSPP policy simulation"
    )
    parser.add_argument(
        "--proposal", type=str, default="",
        help="Path to a markdown proposal file"
    )
    parser.add_argument(
        "--id", type=str, default="TEST-001",
        help="Proposal ID (used when --proposal is not given)"
    )
    parser.add_argument(
        "--title", type=str, default="Test policy",
        help="Policy title (used when --proposal is not given)"
    )
    parser.add_argument(
        "--country", type=str, default="fr",
        help="Country code (fr, us, dk, de, se, no, fi, ca, gb, jp)"
    )
    parser.add_argument(
        "--domain", type=str, default="economy",
        help="Policy domain"
    )
    parser.add_argument(
        "--agents", type=int, default=1_000,
        help="Number of agents per group (control + treatment = 2x)"
    )
    parser.add_argument(
        "--seed", type=int, default=42,
        help="Random seed for reproducibility"
    )
    parser.add_argument(
        "--json", action="store_true",
        help="Output raw JSON instead of a human-readable summary"
    )
    args = parser.parse_args()

    if args.proposal:
        policy = parse_proposal(args.proposal)
    else:
        policy = parse_proposal_dict(
            args.id, args.title, args.country, args.domain
        )

    print(
        f"[OSPP] Simulating '{policy.title}' "
        f"({policy.country.upper()}, {args.agents} agents × 2, "
        f"{policy.horizon_years} years)…",
        file=sys.stderr,
    )

    t0 = time.perf_counter()
    results = run_simulation(policy, n_agents=args.agents, seed=args.seed)
    elapsed = time.perf_counter() - t0

    if args.json:
        print(json.dumps(results, ensure_ascii=False, indent=2))
        return

    # Human-readable summary
    s = results["summary"]
    m = results["meta"]
    print(f"\n{'='*55}")
    print(f"  {m['title']}")
    print(f"  Country: {m['country'].upper()}  |  "
          f"Agents: {m['n_agents']:,}  |  "
          f"Horizon: {m['horizon_years']} years")
    print(f"{'='*55}")

    gdp = s['gdp_delta_pct']
    gini = s['gini_delta']
    emp = s['employment_delta'] * 100
    wb = s['wellbeing_delta'] * 100

    def sign(v: float) -> str:
        return "+" if v >= 0 else ""

    print(f"  GDP/capita         {sign(gdp)}{gdp:.2f}%")
    print(f"  Gini coefficient   {sign(gini)}{gini:.4f}")
    print(f"  Employment rate    {sign(emp)}{emp:.2f} pp")
    print(f"  Wellbeing index    {sign(wb)}{wb:.2f} pp")
    print(f"{'─'*55}")
    print(f"  {s['effect_description']}")
    print(f"{'─'*55}")
    print(f"  Simulated in {elapsed:.1f}s")
    print()


if __name__ == "__main__":
    main()
