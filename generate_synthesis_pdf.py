#!/usr/bin/env python3
"""
Generate OSPP Simulation Synthesis PDF
Using ReportLab — standalone, no external assets required.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import ListFlowable, ListItem
import os

OUTPUT = os.path.join(os.path.dirname(__file__), "OSPP_Simulation_Synthesis.pdf")

# ─── Palette ─────────────────────────────────────────────────────────────────
INDIGO     = colors.HexColor("#4338CA")
INDIGO_L   = colors.HexColor("#EEF2FF")
SLATE      = colors.HexColor("#475569")
SLATE_L    = colors.HexColor("#F8FAFC")
EMERALD    = colors.HexColor("#059669")
ROSE       = colors.HexColor("#E11D48")
AMBER      = colors.HexColor("#D97706")
BLUE       = colors.HexColor("#2563EB")
BORDER     = colors.HexColor("#E2E8F0")
WHITE      = colors.white
BLACK      = colors.HexColor("#0F172A")

W, H = A4

# ─── Style sheet ─────────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

def S(name, **kw):
    return ParagraphStyle(name, **kw)

TITLE    = S("Title_",    fontSize=26, fontName="Helvetica-Bold",
             textColor=INDIGO, spaceAfter=4, alignment=TA_CENTER, leading=30)
SUBTITLE = S("Subtitle_", fontSize=12, fontName="Helvetica",
             textColor=SLATE, spaceAfter=2, alignment=TA_CENTER, leading=16)
DATE_    = S("Date_",     fontSize=10, fontName="Helvetica",
             textColor=SLATE, spaceAfter=0, alignment=TA_CENTER)

H1 = S("H1_", fontSize=16, fontName="Helvetica-Bold",
        textColor=INDIGO, spaceBefore=18, spaceAfter=6, leading=20)
H2 = S("H2_", fontSize=13, fontName="Helvetica-Bold",
        textColor=BLACK, spaceBefore=12, spaceAfter=4, leading=16)
H3 = S("H3_", fontSize=11, fontName="Helvetica-BoldOblique",
        textColor=SLATE, spaceBefore=8, spaceAfter=3, leading=14)

BODY = S("Body_", fontSize=10, fontName="Helvetica",
         textColor=BLACK, spaceAfter=6, leading=15, alignment=TA_JUSTIFY)
BODY_L = S("BodyL_", fontSize=10, fontName="Helvetica",
           textColor=BLACK, spaceAfter=4, leading=15, alignment=TA_LEFT)
SMALL = S("Small_", fontSize=8.5, fontName="Helvetica",
          textColor=SLATE, spaceAfter=4, leading=12, alignment=TA_JUSTIFY)
BOLD = S("Bold_", fontSize=10, fontName="Helvetica-Bold",
         textColor=BLACK, spaceAfter=4, leading=15)
REF = S("Ref_", fontSize=8.5, fontName="Helvetica",
        textColor=SLATE, spaceAfter=3, leading=12, alignment=TA_LEFT)
CAPTION = S("Caption_", fontSize=8, fontName="Helvetica-Oblique",
            textColor=SLATE, spaceAfter=6, alignment=TA_CENTER)

# Inline bold helper
def B(txt): return f"<b>{txt}</b>"
def I(txt): return f"<i>{txt}</i>"
def C(txt, col="#4338CA"): return f'<font color="{col}">{txt}</font>'

def p(text, style=BODY): return Paragraph(text, style)
def sp(h=0.3): return Spacer(1, h * cm)
def hr(col=BORDER, t=0.5): return HRFlowable(width="100%", thickness=t, color=col, spaceAfter=6)

# ─── Table helpers ───────────────────────────────────────────────────────────
def header_row(cells, col_w=None):
    data = [[Paragraph(B(c), BOLD) for c in cells]]
    t = Table(data, colWidths=col_w)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO_L),
        ("TEXTCOLOR",  (0, 0), (-1, 0), INDIGO),
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [INDIGO_L]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t

def data_table(rows, col_w=None, alternating=True):
    """rows: list of list of (str|Paragraph)"""
    def wrap(cell):
        if isinstance(cell, str):
            return Paragraph(cell, BODY_L)
        return cell

    data = [[wrap(c) for c in row] for row in rows]
    t = Table(data, colWidths=col_w)
    bg = [SLATE_L, WHITE] if alternating else [WHITE]
    t.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), bg),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t

def badge_table(items):
    """Display a row of colored badge-like cells."""
    data = [[Paragraph(C(it[0], "#FFFFFF"), BOLD) for it in items]]
    t = Table(data, colWidths=[4.5 * cm] * len(items))
    colors_list = [it[1] for it in items]
    style = [
        ("GRID", (0, 0), (-1, -1), 0, WHITE),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("ROUNDEDCORNERS", [4, 4, 4, 4]),
    ]
    for i, col in enumerate(colors_list):
        style.append(("BACKGROUND", (i, 0), (i, 0), col))
    t.setStyle(TableStyle(style))
    return t

# ─── Cover page ──────────────────────────────────────────────────────────────
def cover_page():
    elems = []
    elems.append(sp(3))

    # Top accent bar
    bar = Table([[""]], colWidths=[W - 4 * cm])
    bar.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INDIGO),
        ("ROWHEIGHTS", (0, 0), (-1, -1), 8),
    ]))
    elems.append(bar)
    elems.append(sp(0.8))

    elems.append(p("OSPP — Open Source Political Program", TITLE))
    elems.append(sp(0.3))
    elems.append(p(
        "Modèle de Simulation Agent-Based : Architecture, Fondements Scientifiques et Méthodologie",
        SUBTITLE))
    elems.append(sp(0.2))
    elems.append(p("Document de synthèse · Mai 2026", DATE_))
    elems.append(sp(1))

    bar2 = Table([[""]], colWidths=[W - 4 * cm])
    bar2.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INDIGO),
        ("ROWHEIGHTS", (0, 0), (-1, -1), 3),
    ]))
    elems.append(bar2)
    elems.append(sp(1.5))

    # Abstract box
    abstract_text = (
        "Ce document présente l'architecture complète du moteur de simulation "
        "du projet OSPP, un outil open source permettant de modéliser l'impact "
        "de politiques publiques sur des populations calibrées. "
        "Chaque composant — modélisation agent-based, démographie, économie, "
        "environnement, métriques sociales, mortalité, fiscalité patrimoniale — "
        "est décrit avec ses fondements dans la littérature scientifique "
        "internationale (Piketty 2014, WHO GHE 2019, WID.world, ILO, "
        "GCP 2024, World Values Survey). "
        "Le moteur implémente un protocole A/B strict entre groupe traitement "
        "et groupe contrôle, enrichi d'une méthode Monte Carlo pour quantifier "
        "l'incertitude stochastique."
    )
    box = Table(
        [[Paragraph(abstract_text, BODY)]],
        colWidths=[W - 6 * cm]
    )
    box.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), INDIGO_L),
        ("BOX", (0, 0), (-1, -1), 1, INDIGO),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
        ("LEFTPADDING", (0, 0), (-1, -1), 14),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
    ]))
    elems.append(box)
    elems.append(sp(2))

    # Stats row
    stats = [
        ("11 pays\ncalibrés", INDIGO),
        ("21 métriques\ncollectées", EMERALD),
        ("ABM Mesa 3\nPython", AMBER),
        ("Monte Carlo\nN runs", BLUE),
    ]
    stats_data = [[Paragraph(C(s[0], "#FFFFFF"), CAPTION) for s in stats]]
    st = Table(stats_data, colWidths=[4.2 * cm] * 4)
    style = [
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("GRID", (0, 0), (-1, -1), 2, WHITE),
    ]
    for i, s in enumerate(stats):
        style.append(("BACKGROUND", (i, 0), (i, 0), s[1]))
    st.setStyle(TableStyle(style))
    elems.append(st)

    elems.append(PageBreak())
    return elems

# ─── Table of contents ───────────────────────────────────────────────────────
def toc():
    elems = []
    elems.append(p("Table des matières", H1))
    elems.append(hr())
    toc_items = [
        ("1", "Introduction — Contexte et objectifs", 3),
        ("2", "Architecture système", 4),
        ("3", "Brique 1 — Modélisation Agent-Based (ABM)", 5),
        ("4", "Brique 2 — Calibration démographique", 6),
        ("5", "Brique 3 — Modèle économique", 8),
        ("6", "Brique 4 — Modèle patrimonial et fiscalité", 10),
        ("7", "Brique 5 — Empreinte carbone et comportement vert", 12),
        ("8", "Brique 6 — Métriques sociales", 13),
        ("9", "Brique 7 — Risque de mortalité", 16),
        ("10", "Brique 8 — Parsing LLM des politiques publiques", 17),
        ("11", "Brique 9 — Protocole A/B et Monte Carlo", 18),
        ("12", "Limites et perspectives", 20),
        ("13", "Références scientifiques", 21),
    ]
    rows = [[p(f"{n}.", BODY_L), p(title, BODY_L), p(str(pg), BODY_L)]
            for n, title, pg in toc_items]
    t = data_table(rows, col_w=[1.2*cm, 13*cm, 1.5*cm])
    elems.append(t)
    elems.append(PageBreak())
    return elems

# ─── Section 1 — Introduction ─────────────────────────────────────────────
def section_intro():
    elems = []
    elems.append(p("1. Introduction — Contexte et objectifs", H1))
    elems.append(hr())
    elems.append(p(
        "OSPP (<i>Open Source Political Program</i>) est une plateforme citoyenne open source "
        "permettant à tout individu d'explorer des propositions politiques fondées sur la recherche "
        "scientifique, de voter de façon anonyme et cryptographiquement vérifiable (ECDSA P-256), "
        "et de simuler l'impact de ces politiques sur une population virtuelle de <b>jumeaux numériques</b>.",
        BODY))
    elems.append(p(
        "Le moteur de simulation repose sur la méthodologie de la <b>modélisation agent-based</b> (ABM), "
        "reconnue en économie hétérodoxe et en sciences sociales computationnelles comme l'une des "
        "approches les plus adaptées à la simulation de systèmes complexes à agents hétérogènes "
        "(Tesfatsion &amp; Judd, 2006 ; Epstein &amp; Axtell, 1996). "
        "Contrairement aux modèles d'équilibre général calculable (CGE), "
        "l'ABM capture les effets d'émergence, d'hétérogénéité et de non-linéarité "
        "qui caractérisent les systèmes socio-économiques réels.",
        BODY))
    elems.append(p(
        "<b>Objectifs du document</b> : décrire brique par brique la logique de simulation, "
        "préciser les paramètres calibrés sur des données empiriques, et référencer la littérature "
        "scientifique justifiant chaque choix de modélisation.",
        BODY))
    elems.append(sp())
    return elems

# ─── Section 2 — Architecture ────────────────────────────────────────────────
def section_architecture():
    elems = []
    elems.append(p("2. Architecture système", H1))
    elems.append(hr())
    elems.append(p(
        "Le système est organisé en trois couches distinctes, communicantes via une API REST.",
        BODY))
    elems.append(sp(0.3))

    arch_rows = [
        ["Couche", "Technologies", "Rôle"],
        ["Frontend", "React 18 · TypeScript · Tailwind CSS · Recharts",
         "Interface utilisateur : propositions, votes, launcher, visualisations"],
        ["API", "FastAPI · Python 3.11 · slowapi · ECDSA",
         "Point d'entrée REST, validation, rate-limiting, vérification cryptographique"],
        ["Simulation", "Mesa 3 · NumPy · Ollama (LLM local)",
         "Moteur ABM, collecte de données, parsing de politiques par LLM"],
    ]
    header = [Paragraph(B(c), BOLD) for c in arch_rows[0]]
    body = [[Paragraph(r[0], BODY_L), Paragraph(r[1], SMALL), Paragraph(r[2], BODY_L)]
            for r in arch_rows[1:]]
    t = Table([header] + body, colWidths=[3*cm, 6.5*cm, 7.5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    elems.append(t)
    elems.append(sp(0.5))
    elems.append(p(
        "Le flux d'une simulation suit le chemin : "
        "<b>Frontend → POST /simulate → PolicyParser (LLM) → EconomyModel (Mesa 3) → JSON réponse → Visualisation</b>. "
        "La simulation est toujours exécutée en mode A/B : "
        "chaque agent est cloné en deux instances identiques, "
        "l'une soumise à la politique (<i>treatment</i>), l'autre non (<i>control</i>).",
        BODY))
    elems.append(sp())
    return elems

# ─── Section 3 — ABM ──────────────────────────────────────────────────────────
def section_abm():
    elems = []
    elems.append(p("3. Brique 1 — Modélisation Agent-Based (ABM)", H1))
    elems.append(hr())

    elems.append(p(
        "La modélisation agent-based (ABM) est un paradigme de simulation dans lequel "
        "une population d'agents autonomes et hétérogènes évolue selon des règles locales, "
        "faisant émerger des dynamiques macroscopiques non déductibles analytiquement.",
        BODY))

    elems.append(p("3.1  Fondements théoriques", H2))
    elems.append(p(
        "L'ouvrage fondateur d'Epstein &amp; Axtell (1996), <i>Growing Artificial Societies</i>, "
        "démontre qu'une économie artificielle avec agents hétérogènes reproduit des "
        "distributions de richesse lognormales et des dynamiques de ségrégation proches des données réelles. "
        "Tesfatsion &amp; Judd (2006) systématisent le cadre dans <i>Handbook of Computational Economics Vol. 2</i>. "
        "Plus récemment, Farmer &amp; Foley (2009) dans <i>Nature</i> plaident pour l'ABM "
        "comme alternative aux DSGE en présence de non-linéarités et de comportements hétérogènes.",
        BODY))
    elems.append(p(
        "L'implémentation technique repose sur <b>Mesa 3</b> (Masad &amp; Kazil, 2015), "
        "le framework ABM de référence en Python, utilisé notamment pour des études sur "
        "les marchés financiers (LeBaron, 2001), la diffusion d'innovations "
        "et les modèles épidémiologiques (CSSE JHU, 2020).",
        BODY))

    elems.append(p("3.2  Structure du modèle", H2))
    elems.append(p(
        "Chaque simulation instancie <b>N agents</b> (1 000, 5 000 ou 10 000) "
        "répartis en deux groupes identiques (A/B). "
        "Les agents sont des instances de <code>CitizenAgent</code>, caractérisées par 21 attributs. "
        "Le modèle <code>EconomyModel</code> orchestre les pas de temps (années), "
        "collecte les données via <code>DataCollector</code> de Mesa, "
        "et agrège les résultats en séries temporelles et tableaux déciles.",
        BODY))

    attrs_rows = [
        [B("Attribut"), B("Type"), B("Description")],
        ["age", "int", "Âge (20–70) — distribution log-normale calée sur pyramides démographiques"],
        ["decile", "int 1–10", "Décile de revenu initial — détermine revenu, richesse, comportements"],
        ["sector", "str", "Secteur (industry/services/public/agriculture) — pondéré par profil pays"],
        ["labour_income", "float €/mois", "Revenu du travail — revenu de base du décile"],
        ["capital_income", "float €/mois", "Revenu du capital — 3 % annuel sur patrimoine / 12"],
        ["wealth", "float €", "Patrimoine — distribution log-normale (médiane, σ pays)"],
        ["employed", "bool", "Statut d'emploi — taux chômage pays × facteur décile"],
        ["carbon_footprint", "float tCO₂/an", "Empreinte carbone — calibrée GCP 2024"],
        ["health_score", "float 0–1", "Score de santé — revenu + emploi + âge + accès système"],
        ["mortality_risk", "float ‰/an", "Risque de mortalité — modèle gradient social (Mackenbach 2019)"],
        ["gender_equality", "float 0–1", "Indice égalité — WEF Gender Gap Report"],
        ["discrimination_score", "float 0–1", "Score anti-discrimination — EU MIDIS II / ECRI"],
        ["social_mobility", "float 0–1", "Mobilité intergénérationnelle — Chetty et al. (2014)"],
        ["social_trust", "float 0–1", "Confiance sociale — Hofstede / World Values Survey"],
        ["governance_trust", "float 0–1", "Confiance institutionnelle — Edelman Trust Barometer"],
        ["education_score", "float 0–1", "Score éducation — PISA / UNESCO"],
        ["wellbeing", "float 0–1", "Bien-être subjectif — OCDE Better Life Index"],
        ["green_score", "float 0–1", "Comportement vert — Eurobaromètre 2023"],
        ["political_position", "float −1–+1", "Position politique — spectre gauche–droite"],
    ]
    header = [Paragraph(c, BOLD) for c in ["Attribut", "Type", "Description"]]
    body = [[Paragraph(r[0], BODY_L), Paragraph(r[1], SMALL), Paragraph(r[2], SMALL)]
            for r in attrs_rows[1:]]
    t = Table([header] + body, colWidths=[3.8*cm, 3.0*cm, 10.2*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("FONTSIZE", (0, 0), (-1, -1), 8),
    ]))
    elems.append(t)
    elems.append(p("Tableau 1 — Attributs de CitizenAgent (21 variables)", CAPTION))
    elems.append(sp())
    return elems

# ─── Section 4 — Démographie ──────────────────────────────────────────────────
def section_demographics():
    elems = []
    elems.append(p("4. Brique 2 — Calibration démographique", H1))
    elems.append(hr())
    elems.append(p(
        "Chaque pays simulé est représenté par un profil <code>CountryProfile</code> "
        "calibré sur des sources institutionnelles internationales. "
        "La calibration détermine la distribution initiale de toutes les variables agent.",
        BODY))

    elems.append(p("4.1  Paramètres pays et sources", H2))

    params_rows = [
        ["Paramètre", "Source", "Exemple (France)"],
        ["income_p50 (revenu médian €/mois)", "WID.world · OCDE", "2 100 €"],
        ["income_sigma (log-σ du revenu)", "WID.world 2023", "0.70"],
        ["unemployment_rate (%)", "ILO WESO 2024", "7.3 %"],
        ["gini_income", "World Bank WDI", "0.292"],
        ["median_wealth_eur (€)", "Crédit Suisse GWR 2023", "113 000 €"],
        ["wealth_sigma (log-σ patrimoine)", "Piketty 2014 · WID", "1.90"],
        ["co2_per_capita (tCO₂/an)", "GCP 2024 · IEA", "4.7"],
        ["healthcare_access (0–1)", "WHO UHC index 2023", "0.88"],
        ["gender_equality_index (0–1)", "WEF GGR 2023", "0.791"],
        ["antidiscrimination_index (0–1)", "EU MIDIS II · ECRI", "0.680"],
        ["social_mobility_index (0–1)", "Chetty et al. · OCDE", "0.550"],
    ]
    header = [Paragraph(B(c), BOLD) for c in params_rows[0]]
    body = [[Paragraph(r[0], SMALL), Paragraph(r[1], SMALL), Paragraph(r[2], BODY_L)]
            for r in params_rows[1:]]
    t = Table([header] + body, colWidths=[6*cm, 5*cm, 4*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    elems.append(t)
    elems.append(p("Tableau 2 — Paramètres du profil pays et sources empiriques", CAPTION))

    elems.append(p("4.2  Comparaison multi-pays (sélection)", H2))

    country_rows = [
        ["Pays", "Rev. médian", "Chômage", "Gini rev.", "Patrimoine médian", "Égalité genres"],
        ["France", "2 100 €", "7.3 %", "0.292", "113 000 €", "0.791"],
        ["Danemark", "3 100 €", "4.8 %", "0.281", "165 000 €", "0.891"],
        ["Suède", "3 050 €", "8.5 %", "0.278", "85 000 €", "0.928"],
        ["Norvège", "3 400 €", "3.5 %", "0.261", "210 000 €", "0.879"],
        ["Allemagne", "2 350 €", "5.7 %", "0.314", "95 000 €", "0.796"],
        ["États-Unis", "3 200 €", "4.1 %", "0.395", "93 000 €", "0.748"],
        ["Japon", "2 500 €", "2.6 %", "0.334", "108 000 €", "0.647"],
        ["R.-Uni", "2 600 €", "4.2 %", "0.360", "119 000 €", "0.792"],
        ["Canada", "2 900 €", "5.3 %", "0.311", "125 000 €", "0.770"],
    ]
    header = [Paragraph(B(c), BOLD) for c in country_rows[0]]
    body = [[Paragraph(c, SMALL) for c in r] for r in country_rows[1:]]
    t = Table([header] + body, colWidths=[2.5*cm, 2.3*cm, 2*cm, 2*cm, 3.5*cm, 3*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
    ]))
    elems.append(t)
    elems.append(p("Tableau 3 — Calibration multi-pays (sources : WID.world, Crédit Suisse GWR, WEF, ILO)", CAPTION))

    elems.append(p("4.3  Distribution des revenus", H2))
    elems.append(p(
        "Le revenu initial de chaque agent est tiré d'une distribution <b>log-normale</b> "
        "paramétrée par la médiane <i>income_p50</i> et l'écart-type logarithmique "
        "<i>income_sigma</i>. Cette forme fonctionnelle est justifiée empiriquement : "
        "Battistin <i>et al.</i> (2009) montrent que la distribution des revenus suit "
        "une log-normale dans les déciles intermédiaires, avec une queue de Pareto pour les hauts revenus. "
        "Le décile <i>d</i> de l'agent détermine son quantile de tirage, "
        "garantissant la cohérence entre rang et valeur.",
        BODY))
    elems.append(sp())
    return elems

# ─── Section 5 — Économie ─────────────────────────────────────────────────────
def section_economy():
    elems = []
    elems.append(p("5. Brique 3 — Modèle économique", H1))
    elems.append(hr())
    elems.append(p(
        "Le modèle économique calcule, à chaque pas de temps (année), "
        "l'évolution de 8 indicateurs macroéconomiques agrégés à partir "
        "des comportements individuels des agents.",
        BODY))

    elems.append(p("5.1  Revenu et emploi", H2))
    elems.append(p(
        "À chaque étape, le revenu d'un agent <b>employé</b> évolue selon un processus stochastique "
        "auto-régressif : une composante tendancielle (croissance réelle du PIB par habitant, "
        "calée sur les données Banque Mondiale) plus un choc idiosyncratique gaussien σ = 0.05. "
        "La probabilité de transition emploi → chômage et chômage → emploi est fonction "
        "du taux de chômage pays et du décile (les déciles inférieurs ont une probabilité "
        "de perte d'emploi 2× plus élevée, conformément à Farber 2011).",
        BODY))

    elems.append(p("5.2  Coefficient de Gini", H2))
    elems.append(p(
        "Le Gini est calculé directement sur la distribution des revenus (ou patrimoines) "
        "des agents du groupe, via la formule analytique exacte :",
        BODY))
    elems.append(p(
        "G = (2 · Σᵢ i·xᵢ) / (n · Σᵢ xᵢ) − (n+1)/n",
        S("Formula", fontSize=11, fontName="Helvetica-Bold",
          textColor=INDIGO, alignment=TA_CENTER, spaceAfter=6, leading=16)))
    elems.append(p(
        "où les xᵢ sont les valeurs triées par ordre croissant. "
        "Cette implémentation est identique à celle de la Banque Mondiale et de l'INSEE. "
        "Le Gini des revenus est distinct du Gini patrimonial (cf. section 6).",
        BODY))

    elems.append(p("5.3  Pauvreté et seuil absolu", H2))
    elems.append(p(
        "Le taux de pauvreté est défini comme la fraction d'agents dont le revenu est "
        "inférieur au <b>seuil de pauvreté absolu</b>, fixé à 60 % du revenu médian national "
        "initial (méthodologie EUROSTAT). La valeur en euros est affichée dans l'interface. "
        "Ce choix de seuil relatif est cohérent avec l'approche de l'OCDE "
        "(OECD, <i>Society at a Glance</i>, 2023).",
        BODY))

    elems.append(p("5.4  Bien-être (wellbeing)", H2))
    elems.append(p(
        "Le score de bien-être subjectif de chaque agent est modélisé comme une fonction "
        "concave du revenu (loi de Easterlin — Easterlin, 1974) combinée à l'emploi, "
        "la santé et la confiance sociale. Ce score converge vers le niveau d'équilibre "
        "du profil pays au fil du temps, reflétant l'adaptation hédonique documentée "
        "par Kahneman &amp; Deaton (2010).",
        BODY))

    elems.append(p("5.5  Impact des politiques sur l'économie", H2))
    elems.append(p(
        "La politique est traduite en <b>paramètres numériques</b> (cf. Brique 8) : "
        "multiplicateur de revenu, delta chômage, delta pauvreté, etc. "
        "Ces paramètres modifient les fonctions de transition des agents du groupe traitement "
        "à chaque pas de temps, créant une divergence progressive entre les deux groupes. "
        "L'effet est cumulatif : une hausse de revenu de 2 % l'an 1 "
        "produit une hausse de ~10 % au bout de 5 ans (intérêt composé).",
        BODY))
    elems.append(sp())
    return elems

# ─── Section 6 — Patrimoine ───────────────────────────────────────────────────
def section_wealth():
    elems = []
    elems.append(p("6. Brique 4 — Modèle patrimonial et fiscalité", H1))
    elems.append(hr())

    elems.append(p("6.1  Distribution du patrimoine", H2))
    elems.append(p(
        "Le patrimoine (wealth) est modélisé séparément du revenu, "
        "car leur distribution suit des lois statistiques différentes. "
        "Piketty (2014) démontre que la concentration patrimoniale est structurellement "
        "plus forte que celle des revenus (France : Gini patrimoine ≈ 0.65 vs Gini revenu ≈ 0.29). "
        "Ce fait stylisé est reproduit par une distribution <b>log-normale</b> "
        "avec un σ plus élevé pour le patrimoine (σ_w ≈ 1.8–2.0) que pour le revenu (σ_r ≈ 0.6–0.8).",
        BODY))
    elems.append(p(
        "L'initialisation utilise un facteur d'échelle dépendant du décile :",
        BODY))
    elems.append(p(
        "income_factor = max(0.05, 0.15 + (décile/9)² × 3.5)",
        S("Formula", fontSize=10, fontName="Courier",
          textColor=INDIGO, alignment=TA_CENTER, spaceAfter=6,
          backColor=INDIGO_L, leading=16, borderPadding=6)))
    elems.append(p(
        "Cela génère un D1 avec ≈ 0.2× le patrimoine médian national "
        "et un D10 avec ≈ 3.7×, conforme aux données Crédit Suisse GWR 2023.",
        BODY))
    elems.append(p(
        "À chaque pas de temps, le patrimoine évolue via un rendement stochastique :",
        BODY))
    elems.append(p(
        "w(t+1) = w(t) × (1 + r),   r ~ N(0.03, 0.10)",
        S("Formula", fontSize=10, fontName="Courier",
          textColor=INDIGO, alignment=TA_CENTER, spaceAfter=6,
          backColor=INDIGO_L, leading=16, borderPadding=6)))
    elems.append(p(
        "Le rendement moyen de 3 % est calé sur le rendement réel de long terme du capital "
        "(Piketty 2014 : r ≈ 4–5 % brut, ~3 % net d'inflation). "
        "L'écart-type de 10 % reflète la volatilité des actifs financiers et immobiliers "
        "(Shiller, <i>Irrational Exuberance</i>, 2015).",
        BODY))

    elems.append(p("6.2  Revenu du capital", H2))
    elems.append(p(
        "Le <b>revenu du capital</b> est distinct du revenu du travail :",
        BODY))
    elems.append(p(
        "capital_income = wealth × 0.03 / 12   (mensuel)",
        S("Formula", fontSize=10, fontName="Courier",
          textColor=INDIGO, alignment=TA_CENTER, spaceAfter=6,
          backColor=INDIGO_L, leading=16, borderPadding=6)))
    elems.append(p(
        "Le revenu total est income = labour_income + capital_income. "
        "Cette décomposition est essentielle pour modéliser correctement "
        "la fiscalité patrimoniale (ISF, taxe Zucman) : "
        "les taxes sur le patrimoine réduisent <i>wealth</i> directement, "
        "affectant en cascade <i>capital_income</i> et <i>income</i>.",
        BODY))

    elems.append(p("6.3  Taxe sur la fortune (ISF)", H2))
    elems.append(p(
        "La taxe ISF est implémentée comme un prélèvement direct sur le patrimoine "
        "excédant le seuil (1,3 M€ dans la calibration française) :",
        BODY))

    isf_rows = [
        ["Paramètre", "Valeur calibrée", "Justification"],
        ["Taux (wealth_tax_rate)", "1,5 %/an", "ISF français 2017 : 0,5 %–1,5 % selon tranches"],
        ["Seuil (wealth_tax_threshold)", "1 300 000 €", "Seuil d'entrée ISF français"],
        ["Plafonnement", "≤ 35 % du revenu travail", "Règle de plafonnement anti-confiscatoire"],
        ["Transfert universel associé", "140 €/mois", "Calibrage redistribution (Saez &amp; Zucman 2019)"],
    ]
    header = [Paragraph(B(c), BOLD) for c in isf_rows[0]]
    body = [[Paragraph(c, SMALL) for c in r] for r in isf_rows[1:]]
    t = Table([header] + body, colWidths=[5*cm, 3.5*cm, 8.5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), EMERALD),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ]))
    elems.append(t)
    elems.append(p("Tableau 4 — Calibration de la taxe ISF (sources : CGI français, Saez &amp; Zucman 2019)", CAPTION))

    elems.append(p("6.4  Gini patrimonial", H2))
    elems.append(p(
        "Le <b>Gini patrimonial</b> est calculé séparément du Gini des revenus "
        "sur la distribution de <i>wealth</i> des agents. "
        "Cette distinction est fondamentale : Piketty (2014, ch. 10) montre que "
        "la fiscalité progressive du revenu réduit le Gini revenu mais a peu d'effet "
        "sur la concentration patrimoniale si elle n'est pas accompagnée d'une taxe annuelle sur le capital. "
        "Le modèle permet donc de visualiser l'impact différentiel selon le type de politique.",
        BODY))
    elems.append(sp())
    return elems

# ─── Section 7 — Carbone ─────────────────────────────────────────────────────
def section_carbon():
    elems = []
    elems.append(p("7. Brique 5 — Empreinte carbone et comportement vert", H1))
    elems.append(hr())

    elems.append(p("7.1  Calibration initiale", H2))
    elems.append(p(
        "L'empreinte carbone de chaque agent est initialisée à partir de la valeur "
        "<i>co2_per_capita</i> du profil pays (source : GCP 2024, IEA), "
        "puis modulée par deux facteurs :",
        BODY))

    carbon_rows = [
        ["Facteur", "Formule", "Justification"],
        ["Décile de revenu", "×(0.4 + décile×0.12)", "Corrélation revenu–CO₂ (Chancel &amp; Piketty 2015)"],
        ["Secteur", "industrie ×1.55 / public ×0.80 / services ×1.0", "IEA Energy by Sector 2023"],
    ]
    header = [Paragraph(B(c), BOLD) for c in carbon_rows[0]]
    body = [[Paragraph(c, SMALL) for c in r] for r in carbon_rows[1:]]
    t = Table([header] + body, colWidths=[3.5*cm, 6*cm, 7.5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), EMERALD),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ]))
    elems.append(t)

    elems.append(p("7.2  Effet rebond", H2))
    elems.append(p(
        "Une hausse de revenu induit un <b>effet rebond</b> sur la consommation énergétique. "
        "Khazzoom (1980) et Brookes (1990) ont formalisé ce paradoxe : "
        "l'amélioration de l'efficacité énergétique stimule la consommation. "
        "Notre modèle l'implémente comme :",
        BODY))
    elems.append(p(
        "Δco2 = +0.30 × Δrevenu_relatif",
        S("Formula", fontSize=10, fontName="Courier",
          textColor=EMERALD, alignment=TA_CENTER, spaceAfter=6,
          backColor=colors.HexColor("#F0FDF4"), leading=16, borderPadding=6)))
    elems.append(p(
        "Cette valeur de 30 % est cohérente avec les estimations méta-analytiques "
        "de Sorrell <i>et al.</i> (2009) dans <i>Energy Policy</i>.",
        BODY))

    elems.append(p("7.3  Comportement vert", H2))
    elems.append(p(
        "Le <i>green_score</i> mesure l'adoption de comportements pro-environnementaux "
        "(mobilité douce, alimentation bas-carbone, etc.). "
        "Il est initialisé à partir des données Eurobaromètre 2023 "
        "et corrélé négativement avec l'empreinte carbone. "
        "Les politiques environnementales (taxe carbone, bonus véhicules électriques) "
        "agissent via un <i>green_delta</i> qui hausse ce score "
        "et réduit l'empreinte en parallèle.",
        BODY))
    elems.append(sp())
    return elems

# ─── Section 8 — Métriques sociales ──────────────────────────────────────────
def section_social():
    elems = []
    elems.append(p("8. Brique 6 — Métriques sociales", H1))
    elems.append(hr())
    elems.append(p(
        "Le modèle intègre <b>9 métriques sociales</b> au-delà des indicateurs économiques "
        "classiques, conformément à l'approche des capacités de Sen (1999) "
        "et au cadre « au-delà du PIB » de Stiglitz, Sen &amp; Fitoussi (2009).",
        BODY))

    elems.append(p("8.1  Santé", H2))
    elems.append(p(
        "Le <i>health_score</i> est une fonction composite :",
        BODY))
    elems.append(p(
        "health = 0.30×revenu_norm + 0.25×emploi + 0.20×(1−âge_norm) + 0.25×accès_soins",
        S("Formula", fontSize=9.5, fontName="Courier",
          textColor=BLUE, alignment=TA_CENTER, spaceAfter=6,
          backColor=colors.HexColor("#EFF6FF"), leading=16, borderPadding=6)))
    elems.append(p(
        "Cette pondération est dérivée des déterminants sociaux de la santé de l'OMS (2008) : "
        "Marmot <i>et al.</i> (2010) documentent que le revenu et le statut social "
        "expliquent 30–40 % de la variance de santé individuelle. "
        "<i>healthcare_access</i> est l'indice UHC de l'OMS (Universal Health Coverage, 2023).",
        BODY))

    elems.append(p("8.2  Confiance sociale et institutionnelle", H2))
    elems.append(p(
        "La <i>social_trust</i> est initialisée depuis l'<b>index de collectivisme de Hofstede</b> "
        "(Hofstede, 1980 ; validé par Hofstede <i>et al.</i>, 2010), "
        "croisé avec les données du <b>World Values Survey</b> (vague 7, 2017–2022). "
        "La <i>governance_trust</i> est calée sur l'<b>Edelman Trust Barometer</b> (2024) "
        "pour les gouvernements. Ces deux métriques évoluent au fil de la simulation "
        "selon la confiance que génère (ou érode) la politique simulée.",
        BODY))

    elems.append(p("8.3  Éducation", H2))
    elems.append(p(
        "L'<i>education_score</i> combine les scores PISA (OCDE, 2022) "
        "et les taux de diplomation UNESCO (2023). "
        "Les politiques d'investissement éducatif génèrent un delta positif "
        "dont l'effet est retardé de 3 ans (lag d'implémentation), "
        "conformément aux évaluations d'impact des politiques éducatives "
        "(Heckman &amp; Mosso, 2014).",
        BODY))

    elems.append(p("8.4  Égalité de genre", H2))
    elems.append(p(
        "L'indice d'égalité de genre (<i>gender_equality</i>) est initialisé "
        "à partir du <b>WEF Global Gender Gap Report 2023</b>, "
        "qui mesure 4 sous-indices : participation économique, éducation, santé, empowerment politique. "
        "La Suède est calibrée à 0.928 (1ère mondiale), le Japon à 0.647 (125ème). "
        "Les politiques d'égalité professionnelle, de congé parental ou de quotas "
        "agissent via un <i>gender_equality_delta</i> annuel.",
        BODY))

    elems.append(p("8.5  Score anti-discrimination", H2))
    elems.append(p(
        "Le score anti-discrimination (<i>discrimination_score</i>) est une mesure composite "
        "des discriminations perçues et légales. "
        "Les données de calibration proviennent de :",
        BODY))
    disc_items = [
        "EU MIDIS II (2016) : enquête FRA sur les discriminations ethno-raciales dans 9 groupes minoritaires",
        "ECRI (Commission européenne contre le racisme) — rapports pays 2022–2024",
        "Gallup World Poll — indice de tolérance sociale 2023",
        "ILGA-Europe Rainbow Map — droits LGBTQ+ par pays",
    ]
    for item in disc_items:
        elems.append(p(f"• {item}", BODY_L))
    elems.append(p(
        "Un score de 1.0 signifie zéro discrimination perçue ; "
        "les politiques anti-discrimination (loi Taubira, RGPD ethnique) "
        "font converger le score vers 1.0 à raison du <i>delta</i> annuel fourni.",
        BODY))

    elems.append(p("8.6  Mobilité sociale intergénérationnelle", H2))
    elems.append(p(
        "La mobilité sociale (<i>social_mobility</i>) mesure la corrélation "
        "revenu parents → revenu enfants (coefficient de persistance intergénérationnel). "
        "Les calibrations sont issues de :",
        BODY))
    mob_items = [
        "Chetty et al. (2014) — The Equality of Opportunity Project (USA)",
        "Corak (2013) — Great Gatsby Curve : corrélation Gini ↔ mobilité",
        "OCDE (2018) — A Broken Social Elevator? How to Promote Social Mobility",
        "Björklund &amp; Jäntti (1997) — Scandinavian mobility data",
    ]
    for item in mob_items:
        elems.append(p(f"• {item}", BODY_L))
    elems.append(p(
        "La Norvège est calibrée à 0.75 (mobilité maximale), les États-Unis à 0.45 "
        "(faible mobilité, cohérent avec la Great Gatsby Curve de Corak). "
        "Les politiques redistributives (revenu universel, investissement éducatif) "
        "font converger l'indice vers le haut sur l'horizon simulé.",
        BODY))
    elems.append(sp())
    return elems

# ─── Section 9 — Mortalité ───────────────────────────────────────────────────
def section_mortality():
    elems = []
    elems.append(p("9. Brique 7 — Risque de mortalité", H1))
    elems.append(hr())
    elems.append(p(
        "Le risque de mortalité (<i>mortality_risk</i>) mesure la probabilité de décès "
        "annuelle d'un agent, exprimée en ‰/an. "
        "Il intègre les déterminants majeurs documentés dans la littérature épidémiologique.",
        BODY))

    elems.append(p("9.1  Modèle de gradient social", H2))
    elems.append(p(
        "Mackenbach <i>et al.</i> (2019) dans <i>The Lancet</i> documentent "
        "des inégalités de mortalité systématiques selon le revenu et l'éducation "
        "dans 16 pays européens. Notre modèle implémente ce gradient :",
        BODY))
    elems.append(p(
        "mortality = 0.006 × exp((âge−40)×0.065) × (2.0−décile×0.167) × (1.6−accès_soins×0.9) × (1.8−santé×1.4)",
        S("Formula", fontSize=9, fontName="Courier",
          textColor=ROSE, alignment=TA_CENTER, spaceAfter=6,
          backColor=colors.HexColor("#FFF1F2"), leading=14, borderPadding=6)))

    mort_rows = [
        ["Facteur", "Formule", "Source"],
        ["Âge", "exp((age−40)×0.065)", "Gompertz-Makeham (WHO GHE 2019)"],
        ["Décile (revenu)", "2.0 − décile×0.167", "Mackenbach et al. 2019 (× 2 entre D1 et D10)"],
        ["Accès aux soins", "1.6 − healthcare_access×0.9", "WHO UHC index 2023"],
        ["Score de santé", "1.8 − health_score×1.4", "Marmot 2010 — déterminants sociaux"],
    ]
    header = [Paragraph(B(c), BOLD) for c in mort_rows[0]]
    body = [[Paragraph(c, SMALL) for c in r] for r in mort_rows[1:]]
    t = Table([header] + body, colWidths=[3.5*cm, 5.5*cm, 8*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ROSE),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ]))
    elems.append(t)
    elems.append(p("Tableau 5 — Facteurs du modèle de mortalité et sources épidémiologiques", CAPTION))

    elems.append(p("9.2  Couverture médicale", H2))
    elems.append(p(
        "L'accès aux soins (<i>healthcare_access</i>) est l'<b>indice UHC</b> "
        "(Universal Health Coverage) de l'OMS, qui synthétise 16 indicateurs "
        "de services essentiels (planification familiale, vaccination, traitement VIH, etc.). "
        "France : 0.88, USA : 0.83, Japon : 0.90. "
        "Un pays avec <i>healthcare_access</i> = 1.0 aurait un facteur de mortalité ≈ 0.70× "
        "par rapport à <i>healthcare_access</i> = 0.5.",
        BODY))
    elems.append(sp())
    return elems

# ─── Section 10 — LLM Parser ─────────────────────────────────────────────────
def section_llm():
    elems = []
    elems.append(p("10. Brique 8 — Parsing LLM des politiques publiques", H1))
    elems.append(hr())
    elems.append(p(
        "Le texte d'une proposition politique (titre + résumé) est converti "
        "en <b>paramètres numériques</b> via un LLM local (Ollama). "
        "Cette approche permet d'intégrer n'importe quelle proposition textuelle "
        "sans codage manuel des effets.",
        BODY))

    elems.append(p("10.1  Pipeline de parsing", H2))
    pipeline_steps = [
        ("1. Prompt structuré", "Le texte de la proposition est injecté dans un prompt demandant un JSON de paramètres numériques (income_multiplier, unemployment_delta, carbon_delta…)"),
        ("2. LLM Ollama", "Modèle local (ex. llama3.1, mistral) — aucune donnée n'est envoyée à des serveurs tiers"),
        ("3. Validation", "Le JSON retourné est validé via la dataclass PolicyParams (champs typés, bornes min/max)"),
        ("4. Fallback lexical", "Si le LLM est hors-ligne ou retourne une erreur, un parser lexical (mots-clés) fournit des paramètres de secours calibrés"),
        ("5. Post-processing", "Détection de mots-clés fiscaux (ISF, wealth tax, Zucman) pour activer wealth_tax_rate et wealth_tax_threshold"),
    ]
    for step, desc in pipeline_steps:
        elems.append(p(f"<b>{step}</b> — {desc}", BODY_L))

    elems.append(p("10.2  Paramètres extraits", H2))
    params_rows = [
        ["Paramètre", "Type", "Plage", "Exemple"],
        ["income_multiplier", "float", "0.5–3.0", "1.08 (hausse 8 %)"],
        ["unemployment_delta", "float", "−0.15–+0.10", "−0.02 (−2 pts)"],
        ["poverty_delta", "float", "−0.20–+0.05", "−0.03"],
        ["carbon_delta", "float", "−0.50–+0.20", "−0.15 (taxe carbone)"],
        ["green_delta", "float", "0.0–0.30", "+0.10"],
        ["health_delta", "float", "−0.10–+0.15", "+0.05"],
        ["education_delta", "float", "0.0–0.20", "+0.08"],
        ["wealth_tax_rate", "float", "0.0–0.03", "0.015 (ISF)"],
        ["wealth_tax_threshold", "float", "0–∞ €", "1 300 000"],
        ["mortality_delta", "float", "−0.30–+0.10", "−0.05"],
        ["gender_equality_delta", "float", "0.0–0.10", "+0.02"],
        ["discrimination_delta", "float", "0.0–0.10", "+0.03"],
        ["mobility_delta", "float", "0.0–0.10", "+0.02"],
    ]
    header = [Paragraph(B(c), BOLD) for c in params_rows[0]]
    body = [[Paragraph(c, SMALL) for c in r] for r in params_rows[1:]]
    t = Table([header] + body, colWidths=[4.5*cm, 2.5*cm, 3*cm, 5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INDIGO),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("FONTSIZE", (0, 0), (-1, -1), 8.5),
    ]))
    elems.append(t)
    elems.append(p("Tableau 6 — PolicyParams : paramètres extraits par le LLM", CAPTION))
    elems.append(sp())
    return elems

# ─── Section 11 — A/B + Monte Carlo ──────────────────────────────────────────
def section_ab_mc():
    elems = []
    elems.append(p("11. Brique 9 — Protocole A/B et Monte Carlo", H1))
    elems.append(hr())

    elems.append(p("11.1  Protocole A/B (double-blind)", H2))
    elems.append(p(
        "La rigueur méthodologique du moteur repose sur un protocole A/B strict, "
        "analogue aux essais contrôlés randomisés (RCT) en épidémiologie. "
        "Chaque agent est instancié deux fois avec des paramètres identiques "
        "(même seed, même profil) : une instance dans le <b>groupe contrôle</b> "
        "(sans politique) et une dans le <b>groupe traitement</b> "
        "(avec politique appliquée dès l'an 1).",
        BODY))
    elems.append(p(
        "Cette approche garantit que les différences observées sont "
        "attributables à la politique et non à des effets de composition ou d'initialisation. "
        "C'est la méthodologie des <i>potential outcomes</i> de Rubin (1974), "
        "transposée au cadre de simulation.",
        BODY))

    ab_rows = [
        ["Aspect", "Groupe Contrôle", "Groupe Traitement"],
        ["Seed", "Identique", "Identique"],
        ["Profil agents", "Identique", "Identique"],
        ["PolicyParams", "income_multiplier=1.0, tous deltas=0", "Paramètres extraits par LLM"],
        ["Collecte données", "series_*_control", "series_*_policy"],
        ["Delta affiché", "—", "policy − control (effet causal)"],
    ]
    header = [Paragraph(B(c), BOLD) for c in ab_rows[0]]
    body = [[Paragraph(c, SMALL) for c in r] for r in ab_rows[1:]]
    t = Table([header] + body, colWidths=[4*cm, 6*cm, 6.5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), BLUE),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [SLATE_L, WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ]))
    elems.append(t)

    elems.append(p("11.2  Monte Carlo", H2))
    elems.append(p(
        "La simulation ABM est stochastique par nature : "
        "deux exécutions avec des seeds différentes produisent des trajectoires légèrement différentes. "
        "Pour quantifier cette <b>incertitude épistémique</b>, le module Monte Carlo "
        "exécute N simulations indépendantes (N = 5 à 50) avec des seeds distincts "
        "et calcule pour chaque métrique, à chaque année :",
        BODY))
    mc_items = [
        "La <b>moyenne</b> des N trajectoires",
        "L'<b>écart-type</b> inter-simulations",
        "Le <b>percentile P5</b> (borne inférieure 90 % CI)",
        "Le <b>percentile P95</b> (borne supérieure 90 % CI)",
    ]
    for item in mc_items:
        elems.append(p(f"• {item}", BODY_L))
    elems.append(p(
        "Cette approche est standard dans la littérature ABM "
        "(Railsback &amp; Grimm, 2011 ; Wilensky &amp; Rand, 2015). "
        "Des bandes larges (P5–P95 étendu) indiquent une forte sensibilité au seed "
        "et donc une incertitude élevée sur les résultats ; "
        "des bandes étroites signalent des effets robustes.",
        BODY))

    elems.append(p("11.3  Scénarios d'incertitude politique", H2))
    elems.append(p(
        "En plus du Monte Carlo stochastique, le modèle offre trois <b>scénarios</b> "
        "d'incertitude sur les effets de la politique elle-même :",
        BODY))
    sc_rows = [
        ["Scénario", "Multiplicateur effets positifs", "Cas d'usage"],
        ["Pessimiste", "×0.7", "Résistances à l'implémentation, effets indirects négatifs"],
        ["Baseline", "×1.0", "Effets calibrés sur données historiques"],
        ["Optimiste", "×1.3", "Conditions favorables, complémentarités de politiques"],
    ]
    header = [Paragraph(B(c), BOLD) for c in sc_rows[0]]
    body = [[Paragraph(c, SMALL) for c in r] for r in sc_rows[1:]]
    t = Table([header] + body, colWidths=[3*cm, 4.5*cm, 9.5*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), AMBER),
        ("TEXTCOLOR",  (0, 0), (-1, 0), WHITE),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#FFFBEB"), WHITE]),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
    ]))
    elems.append(t)
    elems.append(sp())
    return elems

# ─── Section 12 — Limites ────────────────────────────────────────────────────
def section_limits():
    elems = []
    elems.append(p("12. Limites et perspectives", H1))
    elems.append(hr())

    limits = [
        ("Agents représentatifs vs réseaux sociaux",
         "Le modèle actuel n'implémente pas de graphe social entre agents. "
         "Les effets de réseau (diffusion d'innovations, contagion comportementale) "
         "sont absents. Une extension Axelrod–Watts pourrait les intégrer."),
        ("Endogénéité macro-micro",
         "Les paramètres macroéconomiques (taux de croissance, inflation) "
         "sont exogènes. Un couplage avec un modèle IO (input-output) ou un mini-DSGE "
         "permettrait une endogénéisation partielle."),
        ("Qualité du LLM parser",
         "L'extraction des paramètres par LLM dépend de la qualité du modèle Ollama local. "
         "Des hallucinations peuvent produire des paramètres hors plage. "
         "Le fallback lexical mitigue ce risque mais reste imparfait."),
        ("Horizon court",
         "La simulation porte sur 1–20 ans. Les effets générationnels "
         "(éducation, mobilité sociale) se déroulent sur 30–40 ans "
         "et sont donc sous-estimés sur les horizons courts."),
        ("Calibration partielle",
         "Certaines métriques sociales (discrimination, mobilité) "
         "manquent de données longitudinales fines. "
         "Les calibrations sont des approximations de premier ordre."),
    ]
    for title, body_text in limits:
        elems.append(p(f"<b>{title}</b> — {body_text}", BODY))

    elems.append(p("Perspectives", H2))
    perspectives = [
        "Intégration d'un graphe social (Mesa NetworkGrid) pour les effets de réseau",
        "Couplage avec des données temps réel (Eurostat API, World Bank API)",
        "Module de politique comparée : superposer N politiques sur le même pays",
        "Interface de personnalisation des poids de calibration par l'utilisateur",
        "Déploiement Oracle Cloud Free Tier (ARM, 24 GB RAM) pour accessibilité maximale",
    ]
    for item in perspectives:
        elems.append(p(f"• {item}", BODY_L))
    elems.append(sp())
    return elems

# ─── Section 13 — Références ─────────────────────────────────────────────────
def section_references():
    elems = []
    elems.append(p("13. Références scientifiques", H1))
    elems.append(hr())

    refs = [
        # ABM
        ("Epstein, J. M., & Axtell, R. (1996).",
         "Growing Artificial Societies: Social Science from the Bottom Up.",
         "MIT Press / Brookings Institution."),
        ("Tesfatsion, L., & Judd, K. L. (Eds.) (2006).",
         "Handbook of Computational Economics, Vol. 2: Agent-Based Computational Economics.",
         "North-Holland."),
        ("Farmer, J. D., & Foley, D. (2009).",
         "The economy needs agent-based modelling.",
         "Nature, 460(7256), 685–686."),
        ("Masad, D., & Kazil, J. (2015).",
         "Mesa: An Agent-Based Modeling Framework.",
         "Proceedings of the 14th Python in Science Conference (SciPy 2015)."),
        ("Railsback, S. F., & Grimm, V. (2011).",
         "Agent-Based and Individual-Based Modeling: A Practical Introduction.",
         "Princeton University Press."),
        # Économie / Patrimoine
        ("Piketty, T. (2014).",
         "Capital in the Twenty-First Century.",
         "Harvard University Press."),
        ("Saez, E., & Zucman, G. (2019).",
         "The Triumph of Injustice: How the Rich Dodge Taxes and How to Make Them Pay.",
         "Norton."),
        ("Crédit Suisse Research Institute (2023).",
         "Global Wealth Report 2023.",
         "Zurich: Crédit Suisse AG."),
        ("Battistin, E., Blundell, R., & Lewbel, A. (2009).",
         "Why is consumption more log normal than income? Gibrat's law revisited.",
         "Journal of Political Economy, 117(6), 1140–1154."),
        ("Chancel, L., & Piketty, T. (2015).",
         "Carbon and inequality: From Kyoto to Paris.",
         "Paris School of Economics."),
        # Bien-être / Répartition
        ("Easterlin, R. A. (1974).",
         "Does economic growth improve the human lot? Some empirical evidence.",
         "Nations and Households in Economic Growth: Essays in Honor of Moses Abramovitz. Academic Press."),
        ("Kahneman, D., & Deaton, A. (2010).",
         "High income improves evaluation of life but not emotional well-being.",
         "Proceedings of the National Academy of Sciences, 107(38), 16489–16493."),
        ("Stiglitz, J., Sen, A., & Fitoussi, J.-P. (2009).",
         "Report by the Commission on the Measurement of Economic Performance and Social Progress.",
         "Paris: INSEE."),
        # Carbone
        ("Global Carbon Project (2024).",
         "Global Carbon Budget 2024.",
         "Earth System Science Data."),
        ("IEA (2023).",
         "World Energy Outlook 2023.",
         "International Energy Agency."),
        ("Sorrell, S. et al. (2009).",
         "Empirical estimates of the direct rebound effect: A review.",
         "Energy Policy, 37(4), 1356–1371."),
        # Santé / Mortalité
        ("WHO (2023).",
         "Universal Health Coverage Service Coverage Index.",
         "World Health Organization."),
        ("Mackenbach, J. P. et al. (2019).",
         "Trends in health inequalities in 27 European countries.",
         "Proceedings of the National Academy of Sciences, 116(50), 25078–25086."),
        ("Marmot, M. et al. (2010).",
         "Fair Society, Healthy Lives: The Marmot Review.",
         "Strategic Review of Health Inequalities in England post-2010."),
        # Social
        ("Chetty, R. et al. (2014).",
         "Where is the land of opportunity? The geography of intergenerational mobility in the United States.",
         "Quarterly Journal of Economics, 129(4), 1553–1623."),
        ("Corak, M. (2013).",
         "Income inequality, equality of opportunity, and intergenerational mobility.",
         "Journal of Economic Perspectives, 27(3), 79–102."),
        ("OCDE (2018).",
         "A Broken Social Elevator? How to Promote Social Mobility.",
         "OECD Publishing."),
        ("Heckman, J. J., & Mosso, S. (2014).",
         "The economics of human development and social mobility.",
         "Annual Review of Economics, 6(1), 689–733."),
        ("World Economic Forum (2023).",
         "Global Gender Gap Report 2023.",
         "Geneva: WEF."),
        ("Hofstede, G. (1980).",
         "Culture's Consequences: International Differences in Work-Related Values.",
         "Sage Publications."),
        ("World Values Survey (2022).",
         "Wave 7 Data (2017–2022).",
         "Haerpfer et al. (Eds.). Vienna: JD Systems."),
        ("FRA — European Union Agency for Fundamental Rights (2016).",
         "EU MIDIS II: Second European Union Minorities and Discrimination Survey.",
         "Publications Office of the EU."),
        ("Farber, H. S. (2011).",
         "Job loss in the great recession: Historical perspective from the displaced workers survey.",
         "NBER Working Paper No. 17040."),
        ("Rubin, D. B. (1974).",
         "Estimating causal effects of treatments in randomized and nonrandomized studies.",
         "Journal of Educational Psychology, 66(5), 688–701."),
    ]

    for i, (authors, title, journal) in enumerate(refs):
        text = f"[{i+1}] {authors} <i>{title}</i> {journal}"
        elems.append(p(text, REF))

    elems.append(sp(0.5))
    elems.append(hr(col=INDIGO, t=1))
    elems.append(p(
        "Document généré automatiquement — OSPP v1.0 · Open Source Political Program · MIT Licence · Mai 2026",
        S("Footer_", fontSize=8, fontName="Helvetica-Oblique",
          textColor=SLATE, alignment=TA_CENTER, spaceAfter=0)))
    return elems

# ─── Page template ───────────────────────────────────────────────────────────
def on_first_page(canvas, doc):
    canvas.saveState()
    canvas.restoreState()

def on_later_pages(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(SLATE)
    canvas.drawString(2 * cm, 1.2 * cm, "OSPP — Modèle de Simulation ABM · Document de Synthèse · 2026")
    canvas.drawRightString(W - 2 * cm, 1.2 * cm, f"Page {doc.page}")
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(2 * cm, 1.5 * cm, W - 2 * cm, 1.5 * cm)
    canvas.restoreState()

# ─── Main ─────────────────────────────────────────────────────────────────────
def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=A4,
        leftMargin=2 * cm,
        rightMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2.5 * cm,
        title="OSPP — Modèle de Simulation ABM : Synthèse Scientifique",
        author="OSPP Project",
        subject="Agent-Based Modeling · Policy Simulation",
    )

    story = []
    story += cover_page()
    story += toc()
    story += section_intro()
    story += section_architecture()
    story += section_abm()
    story += section_demographics()
    story += section_economy()
    story += section_wealth()
    story += section_carbon()
    story += section_social()
    story += section_mortality()
    story += section_llm()
    story += section_ab_mc()
    story += section_limits()
    story += section_references()

    doc.build(story, onFirstPage=on_first_page, onLaterPages=on_later_pages)
    print(f"✓ PDF generated: {OUTPUT}")

if __name__ == "__main__":
    build()
