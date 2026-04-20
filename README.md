<div align="center">
  <img src="../bootstrap-jeuvideops/images/Gemini_Generated_Image_cmjuckcmjuckcmju_copy-removebg-preview.png" alt="Jeux VideOPS Logo" width="210">

  <h1>Jeux VideOPS</h1>

  <p>
    <strong>Automatiser plus pour travailler moins, et livrer plus surement.</strong><br>
    Projet DevOps / DevSecOps realise dans le cadre de W-DOP-200 (Web@cadémie Epitech Paris).
  </p>

  <a href="https://github.com/jeuvideops/jeuvideops/actions/workflows/pr-gate.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/jeuvideops/jeuvideops/pr-gate.yml?branch=main&style=for-the-badge&label=PR%20Gate" alt="PR Gate">
  </a>
  <a href="https://github.com/jeuvideops/jeuvideops/actions/workflows/deploy-pages.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/jeuvideops/jeuvideops/deploy-pages.yml?branch=main&style=for-the-badge&label=Deploy%20Pages" alt="Deploy Pages">
  </a>
  <a href="https://github.com/jeuvideops/jeuvideops/actions/workflows/ci-space-invaders.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/jeuvideops/jeuvideops/ci-space-invaders.yml?style=for-the-badge&label=CI%20SpaceInvaders" alt="CI SpaceInvaders">
  </a>
  <a href="https://github.com/jeuvideops/jeuvideops/actions/workflows/ci-two-spaceships.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/jeuvideops/jeuvideops/ci-two-spaceships.yml?style=for-the-badge&label=CI%20TwoSpaceships" alt="CI TwoSpaceships">
  </a>

  <p>
    <a href="https://jeuvideops.github.io/jeuvideops/">Voir la plateforme GitHub Pages</a>
  </p>

  <img src="../bootstrap-jeuvideops/images/Gemini_Generated_Image_cmjuckcmjuckcmju.png" alt="Jeux VideOPS Banner" width="100%">
</div>

---

## Presentation (version courte)

**Jeux VideOPS** industrialise la livraison de deux jeux retro JavaScript:

- `SpaceInvaders`
- `TwoSpaceships`

Le depot met en place une chaine CI/CD complete avec GitHub Actions et GitHub Pages:

- CI par jeu: lint, tests unitaires, tests E2E, audit `npm`
- PR Gate sur `main` avec validation conditionnelle par jeu
- CD par jeu: build statique + images Docker (GHCR + DockerHub)
- release automatisee: tags semver, changelog, artefacts
- dashboard web centralise pour jouer et consulter les rapports

---

## Pipeline en bref

```mermaid
flowchart LR
    A[Push / PR] --> B[PR Gate]
    B --> C[[SI CI]]
    B --> D[[TS CI]]
    C --> E[Merge main]
    D --> E
    E --> F[[SI CD]]
    E --> G[[TS CD]]
    F --> H[[SI Release]]
    G --> I[[TS Release]]
    F --> J[[Deploy Pages]]
    G --> J
    J --> K[https://jeuvideops.github.io/jeuvideops/]
```

---

## Conformite W-DOP-200

- workflows manuels (`workflow_dispatch`) + automatiques (`push`, `pull_request`, `workflow_run`)
- au moins 2 jeux couverts par CI/CD
- lint Google style (`eslint-config-google` / ESLint)
- tests unitaires + tests fonctionnels Playwright
- annotations/feedback CI + rapports artefacts (coverage, e2e, allure, audit)
- audit securite des dependances (`npm audit`)
- deploiement web via GitHub Pages
- bonnes pratiques DevSecOps: secrets/variables GitHub, rulesets, GitHub App de release

---

## Quick Start

```bash
git clone git@github.com:jeuvideops/jeuvideops.git
cd jeuvideops
```

### SpaceInvaders

```bash
cd SpaceInvaders
npm ci
npm run dev
```

### TwoSpaceships

```bash
cd TwoSpaceships
npm ci
npm run dev
```

---

## Structure rapide

```text
jeuvideops/
├── .github/workflows/      # CI, CD, PR Gate, Release, Pages
├── .github/actions/        # Actions composites reutilisables
├── .github/pages/          # Dashboard web central
├── SpaceInvaders/          # Jeu 1 + tests + Dockerfile
└── TwoSpaceships/          # Jeu 2 + tests + Dockerfile
```

---

## Equipe

- [Sofian B.](https://github.com/Sofian-bll)
- [Hugo](https://github.com/Kvrmea)

## Liens

- Repo: https://github.com/jeuvideops/jeuvideops
- Actions: https://github.com/jeuvideops/jeuvideops/actions
- Releases: https://github.com/jeuvideops/jeuvideops/releases
- Pages: https://jeuvideops.github.io/jeuvideops/
