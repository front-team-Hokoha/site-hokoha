# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Dev server at localhost:4321
yarn build      # Static build to ./dist/
yarn preview    # Preview production build
```

No test runner, no linter configured.

## Architecture

**Astro 6 static site** for Hokoha (French dev agency). Output: fully pre-rendered HTML.

- `src/pages/` — routes. `realisations/[projet].astro` is the only dynamic route (static paths: hibou, travel, ramses, wecert, pegase, hugo)
- `src/layouts/Layout.astro` — master layout: SEO meta, Header, Footer, ClientRouter (view transitions), global grid overlay
- `src/components/` — organized by page (`accueil/`, `realisations/`, `projets/`) + `commun/` for shared components
- `src/contenus/` — markdown files for editable copy, loaded via `import.meta.glob()` with `eager: true`
- `src/animations/` — reusable GSAP animation wrapper components
- `src/styles/` — SCSS with two-layer design system

## Design System & Styling

Two prefixes, strict separation:
- `.oka-*` — OKA design system (agency's internal framework, in `src/styles/oka-design-system/`)
- `.sok-*` — Hokoha project-specific components (in `src/styles/project-design-system/`)

Import order in `main.scss`: OKA base → OKA components → project components → `shame.scss`.

Design tokens live in `src/styles/design-tokens/` (CSS vars) and `src/styles/project-design-system/tokens.scss` which maps `--oka-*` vars to `--sok-*` vars.

Responsive: use `@include breakpoint(md)` mixin from OKA system. Mobile-first. 768px breakpoint used in JS.

## Animation System

All animation components in `src/animations/`. Pattern: wrap content in component, component injects a `<script>` that uses GSAP + ScrollTrigger, all triggered on `astro:page-load` (required for Astro view transitions compatibility).

Key components:
- `RevealText.astro` — GSAP SplitText line-by-line reveal. Props: `data-delay`, `data-offset-sm`, `data-offset-lg`
- `AppearUp/Down.astro` — translateY entrance with auto-stagger for same-row elements
- `AppearGroup.astro` — staggered group entrance
- `RevealMask.astro` / `RevealBox.astro` — masked reveals
- `Smoothscroll.astro` — Lenis + GSAP ticker integration (included in Layout)
- `Typper.astro` — typewriter effect via `TextAnimator.js`

Trigger defaults in `animationConfig.js`: `"top 90%"` for both mobile and desktop.

## Content Pattern

Editable copy lives in `src/contenus/**/*.md`. Components load it with:

```js
const items = Object.values(
  import.meta.glob("../../../contenus/accueil/savoir-faires/cartes/*.md", { eager: true })
);
```

Frontmatter varies by content type (e.g., savoir-faire cards have: `tag`, `num`, `title`, `src`, `alt`).

## Key Conventions

- Client-side scripts use `document.addEventListener("astro:page-load", ...)` — never `DOMContentLoaded`
- Scoped styles use `<style lang="scss">`, globals use `<style lang="scss" is:global>`
- 8pt grid debug overlay: toggle with `Ctrl+~` (cookie-persisted)
- Base path is `/` locally, `/site-hokoha/` on GitHub Actions (set via `GITHUB_ACTIONS` env var)
