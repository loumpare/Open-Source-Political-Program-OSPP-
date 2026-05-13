"""
Parse a markdown proposal file into PolicyParams.
Uses Ollama for LLM extraction with a rule-based fallback.
"""
from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import List

import requests

OLLAMA_URL = os.getenv("OLLAMA_URL",   "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:7b")


@dataclass
class PolicyParams:
    proposal_id: str
    title: str
    country: str
    domain: str
    # Direct fiscal transfer per targeted agent (€/month, 0 = none)
    monthly_transfer: float = 0.0
    # Employment rate change (e.g. +0.02 = +2 percentage points)
    employment_delta: float = 0.0
    # Income multiplier for targeted agents (1.08 = +8% income)
    income_multiplier: float = 1.0
    # Gini coefficient delta (negative = more equal)
    gini_delta: float = 0.0
    # Wellbeing score delta on a 0–1 scale
    wellbeing_delta: float = 0.0
    # Simulation time horizon in years
    horizon_years: int = 5
    # Income deciles targeted (0–9); empty list = all deciles
    target_income_deciles: List[int] = field(
        default_factory=lambda: list(range(10)))
    target_age_min: int = 18
    target_age_max: int = 90
    # Targeted sectors; empty = all sectors
    target_sectors: List[str] = field(default_factory=list)
    # Carbon footprint multiplier for env policies (0.7 = -30%, 1.0 = no change)
    carbon_multiplier: float = 1.0
    # Education score delta (0.05 = +5 pp)
    education_delta: float = 0.0
    # Governance / institutional trust delta
    governance_delta: float = 0.0
    # One-sentence description of expected effects (from LLM)
    effect_description: str = ""


# ── Markdown reader ───────────────────────────────────────────────────────────

def _read_proposal(md_path: str) -> tuple[str, dict]:
    """Return (body_text, frontmatter_dict)."""
    content = Path(md_path).read_text(encoding="utf-8")
    frontmatter: dict = {}
    body = content
    if content.startswith("---"):
        end = content.find("---", 3)
        if end > 0:
            for line in content[3:end].splitlines():
                if ":" in line:
                    k, _, v = line.partition(":")
                    frontmatter[k.strip()] = v.strip().strip('"').strip("'")
            body = content[end + 3:].strip()
    return body, frontmatter


# ── LLM extraction ────────────────────────────────────────────────────────────

_SCHEMA = """{
  "monthly_transfer": <direct €/month per targeted person, 0 if none>,
  "employment_delta": <employment rate change, e.g. -0.005 for min-wage, +0.02 for subsidies>,
  "income_multiplier": <multiplier for targeted workers, e.g. 1.12 for +12% wage>,
  "gini_delta": <Gini change; negative = more equal, e.g. -0.015>,
  "wellbeing_delta": <wellbeing 0-1 scale change, e.g. 0.04>,
  "carbon_multiplier": <carbon footprint multiplier; 0.7 = -30% for strong env policy, 1.0 = unchanged>,
  "education_delta": <education score change 0-1, e.g. 0.05 for education policy, 0 otherwise>,
  "governance_delta": <institutional trust change 0-1, e.g. 0.03 for governance reform, 0 otherwise>,
  "horizon_years": <implementation horizon in years, e.g. 5 for econ, 10 for env>,
  "target_income_deciles": <targeted deciles 0-9; e.g. [0,1,2,3] for low-income, [0..9] for all>,
  "target_age_min": <minimum age, default 18>,
  "target_age_max": <maximum age, default 90>,
  "effect_description": "<one sentence describing the main expected societal effect>"
}"""


def _extract_with_llm(title: str, body: str) -> dict:
    prompt = (
        f"You are a policy analyst. Extract numerical simulation parameters "
        f"from this policy proposal.\n\n"
        f"Policy: {title}\n\n"
        f"{body[:2000]}\n\n"
        f"Return ONLY a JSON object with these keys:\n{_SCHEMA}\n\n"
        f"Return ONLY the JSON, no explanation."
    )
    try:
        resp = requests.post(
            f"{OLLAMA_URL}/api/generate",
            json={
                "model":   OLLAMA_MODEL,
                "prompt":  prompt,
                "stream":  False,
                "options": {"temperature": 0.1, "num_predict": 400},
            },
            timeout=30,
        )
        resp.raise_for_status()
        text = resp.json().get("response", "")
        m = re.search(r"\{.*?\}", text, re.DOTALL)
        if m:
            return json.loads(m.group())
    except Exception:
        pass
    return {}


# ── Rule-based fallback ───────────────────────────────────────────────────────

def _fallback(proposal_id: str) -> dict:
    """
    Rule-based fallback calibrated on empirical meta-analyses.
    Sources: Card & Krueger (1994), Dube et al. (2010), IPCC AR6, OECD (2015).
    """
    pid = proposal_id.upper()

    # ── Minimum wage / SMIC ──────────────────────────────────────────────────
    # Literature: GDP +0.5–1.5%, employment -0.3 to -0.8 pp, poverty -2 to -5 pp
    if "ECO" in pid:
        return {
            "monthly_transfer":       0,
            "employment_delta": -0.006,   # Dube 2019: -0.3 to -0.8 pp
            "income_multiplier":    1.10,   # +10% for low-income workers
            "gini_delta": -0.012,  # OECD 2015
            "wellbeing_delta":      0.03,
            "carbon_multiplier":    1.02,   # slight rebound (Kuznets)
            "education_delta":      0.01,   # indirect via purchasing power
            "governance_delta":     0.01,
            "horizon_years":        5,
            "target_income_deciles": [0, 1, 2, 3],
            "target_age_min": 18, "target_age_max": 65,
            "effect_description": (
                "Wage floor increase boosts purchasing power for low-income workers "
                "with small negative employment effect (Dube 2019, Card & Krueger 1994)."
            ),
        }
    # ── Social / UBI / universal income ──────────────────────────────────────
    # Literature: poverty -4 to -8 pp, employment +0.5 to +2 pp (ILO 2020)
    if any(k in pid for k in ("SOC", "REVENU", "UBI")):
        return {
            "monthly_transfer":     600,
            "employment_delta":    0.015,
            "income_multiplier":    1.0,
            "gini_delta": -0.025,
            "wellbeing_delta":      0.07,
            "carbon_multiplier":    1.03,   # higher consumption → slight rebound
            "education_delta":      0.02,
            "governance_delta":     0.02,
            "horizon_years":        5,
            "target_income_deciles": list(range(10)),
            "target_age_min": 18, "target_age_max": 90,
            "effect_description": (
                "Universal transfer reduces poverty and improves consumption floor "
                "(ILO 2020 meta-analysis)."
            ),
        }
    # ── Health policies ───────────────────────────────────────────────────────
    if "HLT" in pid:
        return {
            "monthly_transfer":     100,
            "employment_delta":     0.01,
            "income_multiplier":    1.01,
            "gini_delta": -0.008,
            "wellbeing_delta":      0.06,
            "carbon_multiplier":    1.0,
            "education_delta":      0.01,
            "governance_delta":     0.03,
            "horizon_years":        8,
            "target_income_deciles": list(range(10)),
            "target_age_min": 18, "target_age_max": 90,
            "effect_description": (
                "Expanded healthcare access reduces mortality and improves productivity "
                "(Bhattacharya & Packalen 2011)."
            ),
        }
    # ── Environmental / green policies ───────────────────────────────────────
    # Literature: carbon -15 to -40% over 10y (IPCC AR6), employment +1 to +2 pp
    if "ENV" in pid:
        return {
            "monthly_transfer":      80,   # carbon dividend
            "employment_delta":    0.018,  # IEA: green jobs creation
            "income_multiplier":    1.01,
            "gini_delta": -0.008,
            "wellbeing_delta":      0.04,
            # -28% (IPCC AR6 mitigation scenario)
            "carbon_multiplier":    0.72,
            "education_delta":      0.01,
            "governance_delta":     0.02,
            "horizon_years":        10,
            "target_income_deciles": list(range(10)),
            "target_age_min": 18, "target_age_max": 90,
            "effect_description": (
                "Renewable transition reduces carbon -28% over 10 years "
                "while creating green jobs (IPCC AR6, IEA WEO 2024)."
            ),
        }
    # ── Education policies ────────────────────────────────────────────────────
    # Literature: education +5 to +10 pp test scores, income +3 to +8% per year of schooling
    if "EDU" in pid:
        return {
            "monthly_transfer":     0,
            "employment_delta":    0.018,   # human capital → better employability
            "income_multiplier":    1.04,   # Mincer: +3–8% per year of schooling
            "gini_delta": -0.012,
            "wellbeing_delta":      0.05,
            "carbon_multiplier":    0.98,
            "education_delta":      0.08,   # direct effect (UNESCO HDI)
            "governance_delta":     0.03,
            "horizon_years":        10,
            "target_income_deciles": [0, 1, 2, 3, 4],
            "target_age_min": 18, "target_age_max": 40,
            "effect_description": (
                "Education investment raises human capital, future earnings +3-8% "
                "per additional year (Mincer equation, OECD EAG 2024)."
            ),
        }
    # ── Governance policies ───────────────────────────────────────────────────
    if "GOV" in pid:
        return {
            "monthly_transfer":     0,
            "employment_delta":    0.008,
            "income_multiplier":    1.02,
            "gini_delta": -0.010,
            "wellbeing_delta":      0.04,
            "carbon_multiplier":    0.97,
            "education_delta":      0.02,
            "governance_delta":     0.08,  # direct institutional trust boost
            "horizon_years":        5,
            "target_income_deciles": list(range(10)),
            "target_age_min": 18, "target_age_max": 90,
            "effect_description": (
                "Governance reform improves institutional trust and public service "
                "efficiency (OECD Government at a Glance 2023)."
            ),
        }
    # ── Generic fallback ─────────────────────────────────────────────────────
    return {
        "monthly_transfer":     0,
        "employment_delta":    0.004,
        "income_multiplier":    1.02,
        "gini_delta": -0.005,
        "wellbeing_delta":      0.02,
        "carbon_multiplier":    1.0,
        "education_delta":      0.01,
        "governance_delta":     0.01,
        "horizon_years":        5,
        "target_income_deciles": list(range(10)),
        "target_age_min": 18, "target_age_max": 90,
        "effect_description": "Policy expected to have moderate positive effects.",
    }


# ── Public API ────────────────────────────────────────────────────────────────

def parse_proposal(md_path: str) -> PolicyParams:
    """Parse a markdown proposal file into PolicyParams."""
    body, fm = _read_proposal(md_path)
    proposal_id = fm.get("id", Path(md_path).stem.upper())
    title = fm.get("title",   "Unknown policy")
    country = fm.get("country", "global").lower()
    domain = fm.get("domain",  "economy").lower()

    extracted = _extract_with_llm(title, body) or _fallback(proposal_id)

    return PolicyParams(
        proposal_id=proposal_id,
        title=title,
        country=country,
        domain=domain,
        monthly_transfer=float(extracted.get("monthly_transfer", 0)),
        employment_delta=float(extracted.get("employment_delta", 0)),
        income_multiplier=float(extracted.get("income_multiplier", 1.0)),
        gini_delta=float(extracted.get("gini_delta", 0)),
        wellbeing_delta=float(extracted.get("wellbeing_delta", 0)),
        carbon_multiplier=float(extracted.get("carbon_multiplier", 1.0)),
        education_delta=float(extracted.get("education_delta", 0)),
        governance_delta=float(extracted.get("governance_delta", 0)),
        horizon_years=int(extracted.get("horizon_years", 5)),
        target_income_deciles=list(extracted.get(
            "target_income_deciles", list(range(10))
        )),
        target_age_min=int(extracted.get("target_age_min", 18)),
        target_age_max=int(extracted.get("target_age_max", 90)),
        effect_description=str(extracted.get("effect_description", "")),
    )


def parse_proposal_dict(proposal_id: str, title: str, country: str,
                        domain: str, body: str = "") -> PolicyParams:
    """Parse from already-loaded data (no file needed — used by the API)."""
    extracted = _extract_with_llm(title, body) or _fallback(proposal_id)
    return PolicyParams(
        proposal_id=proposal_id, title=title,
        country=country.lower(), domain=domain.lower(),
        monthly_transfer=float(extracted.get("monthly_transfer", 0)),
        employment_delta=float(extracted.get("employment_delta", 0)),
        income_multiplier=float(extracted.get("income_multiplier", 1.0)),
        gini_delta=float(extracted.get("gini_delta", 0)),
        wellbeing_delta=float(extracted.get("wellbeing_delta", 0)),
        carbon_multiplier=float(extracted.get("carbon_multiplier", 1.0)),
        education_delta=float(extracted.get("education_delta", 0)),
        governance_delta=float(extracted.get("governance_delta", 0)),
        horizon_years=int(extracted.get("horizon_years", 5)),
        target_income_deciles=list(extracted.get(
            "target_income_deciles", list(range(10))
        )),
        target_age_min=int(extracted.get("target_age_min", 18)),
        target_age_max=int(extracted.get("target_age_max", 90)),
        effect_description=str(extracted.get("effect_description", "")),
    )
