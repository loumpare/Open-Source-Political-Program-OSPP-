# Guide de Contribution

## Comment proposer ou modifier une proposition

1. **Ouvrir une Issue** décrivant la proposition ou la modification souhaitée
2. **Discuter** avec la communauté (étiquettes : `proposition`, `données`, `simulation`)
3. **Soumettre une PR** dans `propositions/<domaine>/`
4. La PR est fusionnée après vote communautaire (>60% support, min 10 votes)

## Format d'une proposition

Chaque fichier dans `propositions/` suit ce template :

```markdown
---
id: ECO-001
domaine: economie
titre: "Titre de la proposition"
status: draft | discussion | vote | adopte | rejete
auteur: @github_handle
date: YYYY-MM-DD
sources:
  - url: https://...
    description: "Source"
---

## Résumé

Une phrase.

## Proposition

Texte détaillé.

## Impact estimé

- Population concernée : X
- Coût estimé : Y
- Sources : Z

## Résultats de simulation

(rempli automatiquement après simulation Mesa)
```

## Domaines

| Dossier | Thèmes |
|---------|--------|
| `economie/` | Salaires, fiscalité, emploi, croissance |
| `social/` | Retraites, santé, logement, inégalités |
| `environnement/` | Énergie, transport, agriculture, biodiversité |
| `education/` | École, université, formation professionnelle |

## Contribution au code

- Backend Python : suivre PEP 8, tests avec pytest
- Frontend : ESLint + Prettier, composants fonctionnels React
- Simulation : documenter les paramètres Mesa

## Code of Conduct

Débat respectueux, basé sur les données, pas les idéologies.
