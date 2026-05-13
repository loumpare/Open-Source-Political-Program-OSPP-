# OSPP — Simulation : État de l'art & Architecture

> Document de référence pour la phase 2 du projet : construction d'un monde virtuel de jumeaux numériques capables de réagir à l'introduction de nouvelles politiques publiques.

---

## 1. Contexte et problème

L'objectif de la simulation OSPP est de répondre à la question :

> **"Si cette politique publique était adoptée, comment une population réaliste de citoyens réagirait-elle — économiquement, socialement, comportementalement — sur 5, 10 ou 30 ans ?"**

Ce problème nécessite un cadre de simulation qui combine :
- La rigueur des modèles à base d'agents (ABM) calibrés sur des données démographiques réelles
- Le réalisme comportemental des grands modèles de langage (LLM) pour simuler les décisions individuelles
- La scalabilité pour atteindre 100 000+ agents

---

## 2. État de l'art (mai 2026)

### 2.1 Le fondement : Park et al. (2023) — *Generative Agents*

**Référence :** Park, J. S. et al. (2023). *Generative Agents: Interactive Simulacra of Human Behavior.* UIST 2023. [arxiv.org/abs/2304.03442](https://arxiv.org/abs/2304.03442)

L'article fondateur. Park et al. définissent une architecture pour des agents LLM cohérents dans le temps avec trois modules :

```
┌───────────────────────────────────────────────────────┐
│                    AGENT PARK 2023                    │
├───────────────┬───────────────┬───────────────────────┤
│    MEMORY     │   REFLECTION  │       PLANNING        │
│               │               │                       │
│ Episodic log  │ Synthesis of  │ Multi-horizon plans   │
│ (all events,  │ high-level    │ (daily → hourly →     │
│ timestamped)  │ observations  │ immediate actions)    │
│               │ from memory   │                       │
└───────────────┴───────────────┴───────────────────────┘
```

**Limites :** 25 agents seulement, pas de calibration démographique réelle, no policy injection.

---

### 2.2 Passage à l'échelle : Park (2025) — *1,000 Generative Agents*

**Référence :** Park, J. S. et al. (2025). *Generative Agent Simulations of 1,000 People.* [arxiv.org/abs/2411.10109](https://arxiv.org/abs/2411.10109)

Chaque agent est initialisé avec une **interview in-depth** d'un vrai citoyen américain. Le LLM reproduit les opinions de cet individu sur des questions de survey avec une corrélation `r = 0.85` avec les réponses réelles.

**Innovation clé :** le "persona grounding" via entretien — chaque agent a une identité, une histoire, des valeurs mesurées.

**Limite :** 1 000 agents seulement, pas de dynamique temporelle de politique.

---

### 2.3 Simulation de masse : AgentSociety (Tsinghua, 2025)

**Référence :** AgentSociety. *Large-Scale Simulation of LLM-Driven Generative Agents.* [arxiv.org/html/2502.08691](https://arxiv.org/html/2502.08691) | [GitHub](https://github.com/tsinghua-fib-lab/AgentSociety)

**Capacités :**
- 10 000+ agents LLM dans un environnement urbain réaliste
- 5 millions d'interactions simulées
- **4 expériences reproductibles :** polarisation, propagation de messages, effets de l'UBI, impact des chocs externes (ouragan)

**Architecture :**

```
┌─────────────────────────────────────────────────────┐
│                  AGENTSOCIETY 2                     │
├──────────────┬──────────────┬───────────────────────┤
│  AGENT LAYER │ WORLD LAYER  │   EXPERIMENT LAYER    │
│              │              │                       │
│ LLM backbone │ Urban env    │ Policy injection      │
│ Memory store │ Social graph │ A/B testing           │
│ Emotion model│ Economy sim  │ Causal analysis       │
│ Need model   │ Time steps   │ Visualization         │
└──────────────┴──────────────┴───────────────────────┘
```

**Résultat clé :** Première démonstration que des LLM agents reproduisent des phénomènes sociaux réels à grande échelle.

---

### 2.4 Optimisation directe : PolicySim (2025)

**Référence :** PolicySim. *An LLM-Based Agent Social Simulation Sandbox for Proactive Policy Optimization.* [arxiv.org/abs/2603.19649](https://arxiv.org/abs/2603.19649) | [GitHub](https://github.com/renH2/PolicySim)

**Différence fondamentale :** PolicySim ne se contente pas de simuler — il **optimise** la politique en boucle fermée.

```
Politique initiale → Simulation agents → Mesure effets
        ↑                                      ↓
        └─── Contextual Bandit (optimisation) ←┘
```

**Architecture :**
1. **User Agent Module** : agents fine-tunés via SFT + DPO pour reproduire les comportements réels
2. **Adaptive Intervention Module** : bandits contextuels qui ajustent la politique à chaque itération

**Application :** Modération de réseaux sociaux, mais le framework est générique.

---

### 2.5 Jumeaux numériques sociaux : LLM-Powered Social Digital Twins (2025)

**Référence :** *LLM Powered Social Digital Twins: A Framework for Simulating Population Behavioral Response to Policy Interventions.* [arxiv.org/abs/2601.06111](https://arxiv.org/abs/2601.06111)

**Définition formelle :** Un **Social Digital Twin (SDT)** est un modèle virtuel fidèle d'un système social réel — une ville, un pays, une communauté — qui reproduit les comportements individuels et collectifs via ABMS.

**Composants :**
```
Données réelles (démographie, économie, géographie)
    → Calibration des agents
    → LLM comme moteur cognitif de chaque agent
    → Scénarios "what-if" de politiques
    → Émergence de comportements collectifs
```

**Framework domain-agnostic :** Transport, économie, santé, environnement — même architecture.

---

### 2.6 Framework ABM-LLM : GPLab (JASSS, 2025)

**Référence :** GPLab. *A Generative Agent-Based Framework for Policy Simulation and Evaluation.* JASSS 29(1). [jasss.org/29/1/6](https://www.jasss.org/29/1/6/6.pdf)

Premier article dans le **Journal of Artificial Societies and Social Simulation** (revue de référence) sur les GABM pour la politique. Introduit les métriques d'évaluation standardisées.

---

### 2.7 Mesa 3 + Mesa-LLM (2025)

**Références :**
- Mesa 3 : [joss.theoj.org/papers/10.21105/joss.07668](https://joss.theoj.org/papers/10.21105/joss.07668)
- Mesa-LLM : [pypi.org/project/Mesa-LLM](https://pypi.org/project/Mesa-LLM/)

Mesa 3 (2025) apporte :
- **Cell Space stabilisé** : grilles spatiales plus flexibles
- **DiscreteEventSimulator** : événements à timestamps arbitraires, pas seulement par ticks
- **Agents améliorés** : gestion simplifiée, collecte de données avancée

**Mesa-LLM** : plugin officiel qui intègre des LLMs comme moteurs de décision dans Mesa. Permet de remplacer les règles comportementales par des prompts LLM.

```python
# Mesa-LLM pattern
class CitizenAgent(mesa_llm.LLMAgent):
    def step(self):
        decision = self.llm.decide(
            context=self.memory,
            options=self.available_actions,
            policy=self.world.current_policy
        )
        self.act(decision)
```

---

### 2.8 Défi principal : la validation (2025)

**Référence :** *Validation is the central challenge for generative social simulation.* Springer AI Review. [link.springer.com](https://link.springer.com/article/10.1007/s10462-025-11412-6)

Les LLMs dans les ABMs posent un problème de validation inédit :
- **Structure boîte noire** : impossible d'auditer le raisonnement
- **Biais culturels** : les LLMs reproduisent des biais culturels (typiquement WEIRD — Western, Educated, Industrialized, Rich, Democratic)
- **Outputs stochastiques** : deux runs identiques donnent des résultats différents

**Solutions émergentes :**
1. Validation empirique (calibrer sur données historiques, puis prédire)
2. Persona grounding (Park 2025 — interviews réelles)
3. Ensembles de runs (Monte Carlo) pour stabiliser les résultats

---

## 3. Comparatif des approches

| Critère | Mesa pur (règles) | Mesa + LLM | AgentSociety | PolicySim |
|---------|------------------|------------|--------------|-----------|
| Agents max | 1M+ | 10k–100k | 10k | 1k–10k |
| Réalisme cognitif | Faible | Élevé | Élevé | Élevé |
| Vitesse | Très rapide | Lent | Moyen | Lent |
| Validation | Facile | Difficile | Moyenne | Moyenne |
| Injection politique | Manuel | Naturelle | Intégrée | Optimisée |
| Open source | ✅ | ✅ | ✅ | ✅ |
| **Best for OSPP** | Scalabilité | Réalisme | Inspiration | Futur |

---

## 4. Architecture OSPP — Phase 2

### 4.1 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    OSPP SIMULATION ENGINE                   │
├─────────────┬────────────────────────┬──────────────────────┤
│  POPULATION │   WORLD ENGINE         │   POLICY LAYER       │
│             │                        │                      │
│ N agents    │ Economic model         │ Markdown proposal    │
│ (Mesa 3)    │ Labour market          │ → parsed parameters  │
│             │ Housing market         │ → injected at t=0    │
│ Each agent  │ Social network         │ → LLM summarises     │
│ has:        │ Time steps (years)     │   effects for agents │
│  - Profile  │                        │                      │
│  - Memory   │ Outputs:               │ A/B: with vs without │
│  - LLM or   │  GDP, Gini, employment │ proposal             │
│    rules    │  wellbeing index       │                      │
└─────────────┴────────────────────────┴──────────────────────┘
         │                    │                    │
         └────────────────────┴────────────────────┘
                              │
                    Results → ProposalDetail page
                    (simulation tab, D3.js charts)
```

### 4.2 Modèle d'agent (hybride règles + LLM)

```
Niveau 1 — Agents de masse (100 000) : règles calibrées
  └─ Comportements économiques standard (consommation, emploi, épargne)
  └─ Pas d'appel LLM — vitesse maximale

Niveau 2 — Agents persona (500) : LLM-driven
  └─ Profil démographique complet (âge, revenus, valeurs, secteur)
  └─ Décisions via Ollama (qwen2.5:7b local)
  └─ Génèrent des "témoignages" lisibles sur leur vécu de la politique

Niveau 3 — Agents d'élites (50) : LLM raisonneur
  └─ Décideurs politiques, syndicats, patronat, médias
  └─ Réagissent à la politique et influencent le niveau 1
```

### 4.3 Représentation démographique par pays

Chaque pays de la plateforme a un profil démographique calibré sur :

| Indicateur | Source | Pays disponibles |
|-----------|--------|-----------------|
| Distribution d'âge | UN World Population | FR, US, DK, DE, SE, NO, FI, CA, GB, JP |
| Distribution de revenus | WID.world | Tous |
| Taux d'emploi par secteur | ILO, Eurostat | Tous |
| Score de valeurs (Schwartz) | World Values Survey | Tous |
| Gini de départ | World Bank | Tous |

### 4.4 Injection d'une politique

Quand une proposition markdown est sélectionnée pour simulation :

```python
# simulation/policy_parser.py
def parse_proposal(md_path: str) -> PolicyParams:
    """
    Lit le frontmatter + contenu d'une proposition,
    demande au LLM d'en extraire les paramètres numériques :
    - Transfert fiscal (€/mois par agent concerné)
    - Effet sur le taux d'emploi (élasticité calibrée)
    - Horizon temporel
    - Population cible (filtres démographiques)
    """
```

### 4.5 Métriques de sortie

| Métrique | Description | Visualisation |
|---------|-------------|---------------|
| GDP δ | Variation du PIB virtuel / agent | Line chart |
| Gini δ | Variation de l'indice d'inégalité | Area chart |
| Employment rate | Taux d'emploi par décile de revenus | Bar chart |
| Wellbeing index | Score composite bien-être | Gauge |
| Social tension | Nb d'interactions conflictuelles / step | Heatmap |
| Policy adoption | % agents qui "acceptent" la politique | Pie chart |
| Agent testimonials | 10 témoignages LLM représentatifs | Text |

---

## 5. Feuille de route d'implémentation

### Sprint 1 (maintenant) : ABM de base

```
simulation/
├── model.py           # Mesa Model — déjà existant, à enrichir
├── agents.py          # CitizenAgent — déjà existant, à enrichir
├── demographics.py    # Calibration démographique par pays  ← NEW
├── policy_parser.py   # Lecture markdown → PolicyParams     ← NEW
└── run.py             # CLI + JSON output                   # existant
```

**Objectif :** Simuler 10 000 agents pour la France avec ECO-FR-001 (SMIC) en <2 min.

### Sprint 2 : Intégration LLM

```
simulation/
├── llm_agent.py       # CitizenAgent avec mémoire + Ollama   ← NEW
├── persona_bank.py    # 100 personas pré-générés par pays    ← NEW
└── testimonials.py    # Génération de témoignages            ← NEW
```

**Objectif :** 500 agents LLM génèrent des témoignages sur leur vécu de la politique.

### Sprint 3 : Frontend

```
frontend/src/
├── pages/Simulations.tsx         # Page simulation — à reécrire
├── components/simulation/
│   ├── SimulationLauncher.tsx    # Choisir pays + proposition ← NEW
│   ├── TimelineChart.tsx         # D3.js évolution temporelle ← NEW
│   ├── AgentTestimonials.tsx     # 10 témoignages LLM        ← NEW
│   └── ComparisonPanel.tsx       # Avec vs sans politique     ← NEW
```

---

## 6. Technologies retenues

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| ABM engine | Mesa 3 | Déjà installé, Python, open source, JOSS référence |
| LLM local | Ollama (qwen2.5:7b) | Déjà en production pour le RAG |
| LLM integration | Mesa-LLM | Plugin officiel Mesa + LLM |
| Data viz | D3.js | Déjà dans le frontend |
| Demographics | Pandas + NumPy | Déjà dans requirements |
| Storage | JSON/SQLite | Pas de PostgreSQL requis |

---

## 7. Références complètes

1. Park, J.S. et al. (2023). [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442). UIST 2023.
2. Park, J.S. et al. (2025). [Generative Agent Simulations of 1,000 People](https://arxiv.org/abs/2411.10109). arXiv.
3. AgentSociety (2025). [Large-Scale Simulation of LLM-Driven Generative Agents](https://arxiv.org/html/2502.08691). arXiv.
4. PolicySim (2025). [An LLM-Based Agent Social Simulation Sandbox](https://arxiv.org/abs/2603.19649). arXiv.
5. Social Digital Twins (2025). [LLM Powered Social Digital Twins](https://arxiv.org/abs/2601.06111). arXiv.
6. GPLab (2025). [A Generative Agent-Based Framework for Policy Simulation](https://www.jasss.org/29/1/6/6.pdf). JASSS 29(1).
7. Mesa 3 (2025). [Agent-Based Modeling with Python in 2025](https://joss.theoj.org/papers/10.21105/joss.07668). JOSS.
8. Mesa-LLM (2025). [Mesa-LLM on PyPI](https://pypi.org/project/Mesa-LLM/).
9. Validation challenges (2025). [Validation is the central challenge for generative social simulation](https://link.springer.com/article/10.1007/s10462-025-11412-6). Springer AI Review.
10. Stanford HAI (2025). [Simulating Human Behavior with AI Agents](https://hai.stanford.edu/policy/simulating-human-behavior-with-ai-agents). Policy Brief.
