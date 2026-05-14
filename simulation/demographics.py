"""
Calibrated demographic profiles per country.
Sources: UN World Population, WID.world, ILO/Eurostat, World Bank, World Values Survey.
"""
from __future__ import annotations

import random
from dataclasses import dataclass, field
from typing import List, Tuple


@dataclass
class CountryProfile:
    code: str
    name: str
    gini: float                        # Starting Gini coefficient (0–1)
    gdp_per_capita: float              # Annual GDP/capita in €
    employment_rate: float             # Fraction of working-age pop employed
    # Monthly net income (€) at each decile D1..D10
    income_deciles: List[float]
    # (sector_name, share) — shares sum to ~1
    sectors: List[Tuple[str, float]]
    # (age_low, age_high, fraction of 18+ pop)
    age_groups: List[Tuple[int, int, float]]
    # Std dev of political position (higher = polarised)
    political_std: float = 0.35
    collectivism: float = 0.50         # 0 = individualist, 1 = collectivist
    # tCO2/year per capita (national average)
    carbon_baseline_t: float = 7.0
    healthcare_access: float = 0.80    # 0–1 healthcare system quality index
    # UNESCO/PISA composite — literacy, numeracy, years of schooling
    education_index: float = 0.75
    # Absolute poverty line €/month (Eurostat 60%-of-national-median approach)
    poverty_line_eur: float = 900.0
    # WEF Gender Gap Index 2023 (0=perfect inequality, 1=perfect equality)
    gender_equality_index: float = 0.720
    # Anti-discrimination composite (EU FRA MIDIS-II + ESS; higher = less discrimination)
    antidiscrimination_index: float = 0.650
    # Intergenerational social mobility (Chetty/Corak rank-rank proxy)
    social_mobility_index: float = 0.550


PROFILES: dict[str, CountryProfile] = {
    "fr": CountryProfile(
        code="fr", name="France",
        gini=0.292, gdp_per_capita=37_500, employment_rate=0.676,
        income_deciles=[580, 940, 1_200, 1_450,
                        1_720, 2_050, 2_450, 3_050, 4_200, 8_500],
        sectors=[
            ("Agriculture", 0.025), ("Industrie", 0.175),
            ("Construction", 0.060), ("Services privés", 0.450),
            ("Services publics", 0.290),
        ],
        age_groups=[(18, 24, 0.10), (25, 34, 0.15), (35, 49, 0.22),
                    (50, 64, 0.22), (65, 90, 0.31)],
        political_std=0.33, collectivism=0.62,
        carbon_baseline_t=5.1, healthcare_access=0.88,
        education_index=0.74, poverty_line_eur=1063,
        gender_equality_index=0.791, antidiscrimination_index=0.68, social_mobility_index=0.55,
    ),
    "us": CountryProfile(
        code="us", name="United States",
        gini=0.397, gdp_per_capita=62_000, employment_rate=0.737,
        income_deciles=[700, 1_300, 1_900, 2_500,
                        3_200, 4_100, 5_300, 7_000, 10_500, 25_000],
        sectors=[
            ("Agriculture", 0.015), ("Manufacturing", 0.100),
            ("Construction", 0.055), ("Services", 0.480),
            ("Government", 0.150), ("Healthcare", 0.200),
        ],
        age_groups=[(18, 24, 0.12), (25, 34, 0.18), (35, 49, 0.23),
                    (50, 64, 0.22), (65, 90, 0.25)],
        political_std=0.42, collectivism=0.38,
        carbon_baseline_t=14.5, healthcare_access=0.70,
        education_index=0.67, poverty_line_eur=1250,
        gender_equality_index=0.748, antidiscrimination_index=0.62, social_mobility_index=0.45,
    ),
    "dk": CountryProfile(
        code="dk", name="Denmark",
        gini=0.285, gdp_per_capita=55_000, employment_rate=0.776,
        income_deciles=[1_100, 1_600, 2_000, 2_400,
                        2_900, 3_500, 4_200, 5_300, 7_200, 14_000],
        sectors=[
            ("Agriculture", 0.025), ("Industrie", 0.150),
            ("Construction", 0.055), ("Services privés", 0.380),
            ("Services publics", 0.390),
        ],
        age_groups=[(18, 24, 0.10), (25, 34, 0.15), (35, 49, 0.21),
                    (50, 64, 0.23), (65, 90, 0.31)],
        political_std=0.28, collectivism=0.74,
        carbon_baseline_t=6.2, healthcare_access=0.92,
        education_index=0.81, poverty_line_eur=1520,
        gender_equality_index=0.892, antidiscrimination_index=0.82, social_mobility_index=0.82,
    ),
    "de": CountryProfile(
        code="de", name="Germany",
        gini=0.317, gdp_per_capita=45_000, employment_rate=0.760,
        income_deciles=[700, 1_200, 1_600, 2_000,
                        2_500, 3_100, 3_900, 5_000, 7_000, 16_000],
        sectors=[
            ("Landwirtschaft", 0.020), ("Industrie", 0.240),
            ("Baugewerbe", 0.060), ("Dienstleistungen", 0.430),
            ("Öffentlicher Dienst", 0.250),
        ],
        age_groups=[(18, 24, 0.08), (25, 34, 0.14), (35, 49, 0.21),
                    (50, 64, 0.25), (65, 90, 0.32)],
        political_std=0.33, collectivism=0.57,
        carbon_baseline_t=8.1, healthcare_access=0.89,
        education_index=0.77, poverty_line_eur=1050,
        gender_equality_index=0.815, antidiscrimination_index=0.72, social_mobility_index=0.60,
    ),
    "se": CountryProfile(
        code="se", name="Sweden",
        gini=0.274, gdp_per_capita=51_000, employment_rate=0.784,
        income_deciles=[1_000, 1_500, 2_000, 2_500,
                        3_000, 3_700, 4_500, 5_700, 7_800, 16_000],
        sectors=[
            ("Agriculture", 0.020), ("Industry", 0.160),
            ("Construction", 0.060), ("Services", 0.380),
            ("Public sector", 0.380),
        ],
        age_groups=[(18, 24, 0.10), (25, 34, 0.15), (35, 49, 0.21),
                    (50, 64, 0.23), (65, 90, 0.31)],
        political_std=0.28, collectivism=0.76,
        carbon_baseline_t=4.5, healthcare_access=0.93,
        education_index=0.82, poverty_line_eur=1600,
        gender_equality_index=0.928, antidiscrimination_index=0.84, social_mobility_index=0.78,
    ),
    "no": CountryProfile(
        code="no", name="Norway",
        gini=0.263, gdp_per_capita=78_000, employment_rate=0.776,
        income_deciles=[1_800, 2_500, 3_000, 3_600,
                        4_300, 5_100, 6_200, 7_800, 10_500, 22_000],
        sectors=[
            ("Agriculture", 0.020), ("Oil & Gas", 0.080),
            ("Industry", 0.100), ("Construction", 0.070),
            ("Services", 0.370), ("Public sector", 0.360),
        ],
        age_groups=[(18, 24, 0.10), (25, 34, 0.16), (35, 49, 0.22),
                    (50, 64, 0.22), (65, 90, 0.30)],
        political_std=0.27, collectivism=0.78,
        carbon_baseline_t=7.5, healthcare_access=0.94,
        education_index=0.82, poverty_line_eur=2100,
        gender_equality_index=0.875, antidiscrimination_index=0.83, social_mobility_index=0.75,
    ),
    "fi": CountryProfile(
        code="fi", name="Finland",
        gini=0.278, gdp_per_capita=47_000, employment_rate=0.755,
        income_deciles=[900, 1_400, 1_900, 2_300,
                        2_800, 3_400, 4_100, 5_300, 7_200, 15_000],
        sectors=[
            ("Agriculture", 0.030), ("Industry", 0.180),
            ("Construction", 0.060), ("Services", 0.370),
            ("Public sector", 0.360),
        ],
        age_groups=[(18, 24, 0.09), (25, 34, 0.14), (35, 49, 0.20),
                    (50, 64, 0.24), (65, 90, 0.33)],
        political_std=0.30, collectivism=0.72,
        carbon_baseline_t=7.8, healthcare_access=0.91,
        education_index=0.85, poverty_line_eur=1450,
        gender_equality_index=0.863, antidiscrimination_index=0.81, social_mobility_index=0.74,
    ),
    "ca": CountryProfile(
        code="ca", name="Canada",
        gini=0.310, gdp_per_capita=47_000, employment_rate=0.748,
        income_deciles=[700, 1_200, 1_700, 2_200,
                        2_900, 3_700, 4_700, 6_300, 9_500, 21_000],
        sectors=[
            ("Agriculture", 0.020), ("Resources", 0.050),
            ("Manufacturing", 0.100), ("Construction", 0.070),
            ("Services", 0.460), ("Government", 0.300),
        ],
        age_groups=[(18, 24, 0.11), (25, 34, 0.17), (35, 49, 0.22),
                    (50, 64, 0.23), (65, 90, 0.27)],
        political_std=0.34, collectivism=0.59,
        carbon_baseline_t=14.0, healthcare_access=0.85,
        education_index=0.73, poverty_line_eur=1150,
        gender_equality_index=0.770, antidiscrimination_index=0.75, social_mobility_index=0.65,
    ),
    "gb": CountryProfile(
        code="gb", name="United Kingdom",
        gini=0.351, gdp_per_capita=42_000, employment_rate=0.754,
        income_deciles=[700, 1_100, 1_500, 1_900,
                        2_400, 3_000, 3_900, 5_100, 7_500, 17_000],
        sectors=[
            ("Agriculture", 0.010), ("Industry", 0.150),
            ("Construction", 0.060), ("Services", 0.490),
            ("Public sector", 0.290),
        ],
        age_groups=[(18, 24, 0.11), (25, 34, 0.17), (35, 49, 0.22),
                    (50, 64, 0.23), (65, 90, 0.27)],
        political_std=0.36, collectivism=0.52,
        carbon_baseline_t=5.5, healthcare_access=0.83,
        education_index=0.72, poverty_line_eur=1100,
        gender_equality_index=0.792, antidiscrimination_index=0.66, social_mobility_index=0.50,
    ),
    "jp": CountryProfile(
        code="jp", name="Japan",
        gini=0.329, gdp_per_capita=39_000, employment_rate=0.779,
        income_deciles=[800, 1_300, 1_700, 2_100,
                        2_600, 3_200, 4_000, 5_300, 7_800, 18_000],
        sectors=[
            ("Agriculture", 0.030), ("Industry", 0.230),
            ("Construction", 0.070), ("Services", 0.420),
            ("Government", 0.250),
        ],
        age_groups=[(18, 24, 0.08), (25, 34, 0.11), (35, 49, 0.18),
                    (50, 64, 0.22), (65, 90, 0.41)],
        political_std=0.30, collectivism=0.69,
        carbon_baseline_t=8.5, healthcare_access=0.90,
        education_index=0.80, poverty_line_eur=1050,
    ),
    "global": CountryProfile(
        code="global", name="Global",
        gini=0.350, gdp_per_capita=40_000, employment_rate=0.720,
        income_deciles=[500, 1_000, 1_600, 2_200,
                        2_900, 3_700, 4_700, 6_200, 9_000, 20_000],
        sectors=[
            ("Agriculture", 0.050), ("Industry", 0.180),
            ("Construction", 0.060), ("Services", 0.450),
            ("Public sector", 0.260),
        ],
        age_groups=[(18, 24, 0.11), (25, 34, 0.17), (35, 49, 0.22),
                    (50, 64, 0.22), (65, 90, 0.28)],
        political_std=0.36, collectivism=0.55,
        carbon_baseline_t=7.0, healthcare_access=0.72,
        education_index=0.68, poverty_line_eur=800,
    ),
}


def get_profile(country_code: str) -> CountryProfile:
    return PROFILES.get(country_code.lower(), PROFILES["global"])


def sample_age(profile: CountryProfile, rng: random.Random) -> int:
    r = rng.random()
    cumulative = 0.0
    for low, high, prob in profile.age_groups:
        cumulative += prob
        if r <= cumulative:
            return rng.randint(low, high)
    return rng.randint(65, 90)


def sample_income(profile: CountryProfile, rng: random.Random) -> tuple[int, float]:
    """Returns (decile_index 0–9, monthly_income_€) with within-decile noise."""
    decile = rng.randint(0, 9)
    base = profile.income_deciles[decile]
    income = base * rng.uniform(0.88, 1.12)
    return decile, round(income, 0)


def sample_sector(profile: CountryProfile, rng: random.Random) -> str:
    sectors, weights = zip(*profile.sectors)
    return rng.choices(sectors, weights=weights)[0]


def compute_gini(incomes: list[float]) -> float:
    """Compute Gini coefficient from a list of income values."""
    n = len(incomes)
    if n == 0:
        return 0.0
    s = sorted(incomes)
    total = sum(s)
    if total == 0:
        return 0.0
    weighted = sum((i + 1) * v for i, v in enumerate(s))
    return round((2 * weighted / (n * total)) - (n + 1) / n, 4)
