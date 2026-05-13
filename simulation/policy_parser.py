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
  "monthly_transfer": <direct €/month per targeted person, or 0>,
  "employment_delta": <employment rate change as decimal, e.g. 0.02 for +2pp>,
  "income_multiplier": <income multiplier for targeted workers, e.g. 1.08 for +8%>,
  "gini_delta": <Gini change, e.g. -0.01; negative = more equal>,
  "wellbeing_delta": <wellbeing change 0-1 scale, e.g. 0.05>,
  "horizon_years": <implementation horizon in years, default 5>,
  "target_income_deciles": <list of targeted deciles 0-9>,
  "target_age_min": <minimum age, default 18>,
  "target_age_max": <maximum age, default 90>,
  "effect_description": "<one sentence on main expected effect>"
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
    pid = proposal_id.upper()
    # Minimum wage / SMIC
    if "ECO" in pid and ("SMIC" in pid or pid.endswith("001")):
        return {
            "monthly_transfer":       0,
            "employment_delta": -0.005,
            "income_multiplier":    1.12,
            "gini_delta": -0.015,
            "wellbeing_delta":      0.06,
            "horizon_years":        3,
            "target_income_deciles": [0, 1, 2, 3],
            "target_age_min": 18, "target_age_max": 65,
            "effect_description": (
                "Wage floor increase boosts purchasing power for low-income workers."
            ),
        }
    # UBI / universal income / revenu universel
    if any(k in pid for k in ("UBI", "SOC", "REVENU", "HLT")):
        return {
            "monthly_transfer":     500,
            "employment_delta":    0.01,
            "income_multiplier":   1.0,
            "gini_delta": -0.02,
            "wellbeing_delta":     0.08,
            "horizon_years":       5,
            "target_income_deciles": list(range(10)),
            "target_age_min": 18, "target_age_max": 90,
            "effect_description": (
                "Universal benefit provides a consumption floor for all citizens."
            ),
        }
    # Environmental / green policies
    if "ENV" in pid:
        return {
            "monthly_transfer":     100,
            "employment_delta":     0.015,
            "income_multiplier":    1.01,
            "gini_delta": -0.008,
            "wellbeing_delta":      0.05,
            "horizon_years":        10,
            "target_income_deciles": list(range(10)),
            "target_age_min": 18, "target_age_max": 90,
            "effect_description": (
                "Environmental policy creates green jobs while distributing carbon dividend."
            ),
        }
    # Education policies
    if "EDU" in pid:
        return {
            "monthly_transfer":     0,
            "employment_delta":     0.02,
            "income_multiplier":    1.05,
            "gini_delta": -0.01,
            "wellbeing_delta":      0.07,
            "horizon_years":        8,
            "target_income_deciles": [0, 1, 2, 3, 4],
            "target_age_min": 18, "target_age_max": 35,
            "effect_description": (
                "Education investment raises human capital and long-run earnings."
            ),
        }
    # Generic fallback
    return {
        "monthly_transfer":     0,
        "employment_delta":     0.005,
        "income_multiplier":    1.02,
        "gini_delta": -0.005,
        "wellbeing_delta":      0.03,
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
        monthly_transfer=float(extracted.get("monthly_transfer",    0)),
        employment_delta=float(extracted.get("employment_delta",    0)),
        income_multiplier=float(extracted.get("income_multiplier",   1.0)),
        gini_delta=float(extracted.get("gini_delta",          0)),
        wellbeing_delta=float(extracted.get("wellbeing_delta",     0)),
        horizon_years=int(extracted.get("horizon_years",         5)),
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
        monthly_transfer=float(extracted.get("monthly_transfer",    0)),
        employment_delta=float(extracted.get("employment_delta",    0)),
        income_multiplier=float(extracted.get("income_multiplier",   1.0)),
        gini_delta=float(extracted.get("gini_delta",          0)),
        wellbeing_delta=float(extracted.get("wellbeing_delta",     0)),
        horizon_years=int(extracted.get("horizon_years",         5)),
        target_income_deciles=list(extracted.get(
            "target_income_deciles", list(range(10))
        )),
        target_age_min=int(extracted.get("target_age_min", 18)),
        target_age_max=int(extracted.get("target_age_max", 90)),
        effect_description=str(extracted.get("effect_description", "")),
    )
