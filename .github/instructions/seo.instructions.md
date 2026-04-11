---
applyTo: "**"
---

# Instructions SEO — site-web-v3

Ce projet utilise **Astro**. Le layout principal est `src/layouts/Layout.astro`.

---

## Règles obligatoires

### `<head>` de chaque page

Toute page doit passer par `Layout.astro` avec les props suivantes :

```astro
<Layout title="Titre page · SOK" description="Description de 120-160 caractères." image="/og-image-specifique.jpg">
```

- `title` — obligatoire. Format : `Sujet · SOK`. Max 60 caractères.
- `description` — obligatoire. Entre 120 et 160 caractères. Résume le contenu réel de la page.
- `image` — optionnel. Chemin vers une image OG spécifique. Fallback : `/og-image.jpg`.

### Balises gérées automatiquement par le layout

Le layout injecte automatiquement :
- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- Open Graph : `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:locale`
- Twitter Card : `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

Ne pas les redéclarer manuellement dans les pages.

### Structure HTML

- Une seule balise `<h1>` par page, contenant le mot-clé principal.
- Hiérarchie stricte : `h1 > h2 > h3` — ne pas sauter de niveau.
- Les images doivent toujours avoir un attribut `alt` descriptif (non vide, sauf si purement décoratif → `alt=""`).
- Utiliser des balises sémantiques : `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>`, `<article>`.
- Les liens de navigation doivent être du texte (pas uniquement des icônes sans label).

### Performance (Core Web Vitals)

- Préférer les images via le composant `<ImageSok>` ou `<Image>` d'Astro (optimisation automatique).
- Les vidéos et médias lourds : utiliser `loading="lazy"`.
- Éviter les scripts bloquants dans `<head>` — utiliser `is:inline` ou `defer`.

### Contenu

- Chaque page a un **sujet unique** — pas de contenu dupliqué entre pages.
- Les URLs sont en minuscules, avec des tirets (`/savoir-faire`, pas `/SavoirFaire`).
- Le fichier `public/robots.txt` doit autoriser l'indexation des pages publiques.
- Un sitemap doit être généré (`@astrojs/sitemap`).

---

## Checklist de contrôle par page

Avant de livrer ou merger une page, vérifier :

### Métadonnées
- [ ] `title` renseigné, unique, ≤ 60 caractères
- [ ] `description` renseignée, unique, 120–160 caractères
- [ ] Prop `image` OG définie si la page a une image représentative

### Structure
- [ ] Une seule `<h1>` par page
- [ ] Hiérarchie des titres respectée (h1 → h2 → h3)
- [ ] Toutes les images ont un `alt`
- [ ] Liens de navigation lisibles par un crawler

### Technique
- [ ] `Astro.site` défini dans `astro.config.mjs`
- [ ] `/public/og-image.jpg` existe (1200×630px minimum)
- [ ] `public/robots.txt` configuré
- [ ] Sitemap généré et référencé dans `robots.txt`
- [ ] Pas de liens brisés (`href="#"` sans intention)
- [ ] Page accessible sans JavaScript (contenu dans le HTML initial)
