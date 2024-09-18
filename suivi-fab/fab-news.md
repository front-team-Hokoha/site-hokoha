Voici un résumé complet de la démarche pour créer une rubrique **"news"** sur le site de la société **HOKOHA**, en utilisant Astro avec des fichiers Markdown pour générer dynamiquement des articles d'actualité.

### Objectif :
Créer une rubrique "news" où chaque article est un fichier Markdown contenant du contenu structuré (titre, description, date, vignette, contenu) et générer une liste d'articles avec des liens vers des pages détaillées pour chaque article.

### Démarche détaillée :

#### 1. **Organisation des fichiers**
- **Répertoire des articles** : Créer un répertoire dédié aux articles dans `src/content/news/`.
  - Chaque article est un fichier Markdown (ex : `2024-09-16-article-1.md`).
  
  Structure du projet :
  ```
  src/
    content/
      news/
        2024-09-16-article-1.md
        2024-09-17-article-2.md
    layouts/
      LayoutClassic.astro
    pages/
      news.astro
      news/
        [slug].astro
  ```

#### 2. **Création des fichiers Markdown pour chaque article**

Dans chaque fichier `.md` du répertoire `src/content/news/`, on définit des métadonnées dans le frontmatter (YAML) pour chaque article : le titre, la date, la description et une image vignette.

Exemple de fichier `2024-09-16-article-1.md` :
```markdown
---
title: "Nouveau partenariat HOKOHA"
date: "2024-09-16"
description: "HOKOHA signe un nouveau partenariat stratégique."
image: "/images/news/partnership-thumbnail.jpg"  # Chemin de la vignette
slug: "nouveau-partenariat-hokoha"
---

# Nouveau partenariat stratégique

HOKOHA annonce un partenariat avec une entreprise leader dans l'industrie...
```

- **Vignette** : L'image de la vignette est définie avec `image` dans le frontmatter.
- **Slug** : Le slug permet de générer des URLs personnalisées.

#### 3. **Création de la page de liste d'articles (`news.astro`)**

Ce fichier liste les articles et génère des liens vers les pages de détails pour chaque article en utilisant `Astro.glob()` pour charger dynamiquement tous les fichiers Markdown dans le répertoire `news`.

Voici le fichier `news.astro` :

```astro
---
import LayoutClassic from '../layouts/LayoutClassic.astro';

// Charger tous les fichiers Markdown dans le dossier "news"
const articles = await Astro.glob('../content/news/*.md');

// Trier les articles par date (du plus récent au plus ancien)
articles.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

// Fonction pour générer une URL basée sur le nom du fichier ou le slug
function generateUrl(article) {
  if (article.frontmatter.slug) {
    return `/news/${article.frontmatter.slug}`;
  }
  
  const slugFromFile = article.file.split('/').pop().replace('.md', '');
  return `/news/${slugFromFile}`;
}
---

<LayoutClassic title="Actualités">
  <h1>Actualités</h1>

  <ul>
    {articles.map((article) => (
      <li>
        <a href={generateUrl(article)}>
          {article.frontmatter.image && (
            <img src={article.frontmatter.image} alt={`Vignette de ${article.frontmatter.title}`} width="150" height="100" />
          )}
          <h2>{article.frontmatter.title}</h2>
          <p>{article.frontmatter.description}</p>
          <small>{new Date(article.frontmatter.date).toLocaleDateString()}</small>
        </a>
      </li>
    ))}
  </ul>
</LayoutClassic>
```

#### Explication :
- **`Astro.glob()`** : Charge tous les fichiers `.md` du répertoire `news`.
- **Tri des articles** : Les articles sont triés par date (du plus récent au plus ancien).
- **Génération des URLs** : La fonction `generateUrl()` génère des URLs en fonction du `slug` défini dans le frontmatter ou du nom du fichier.
- **Affichage de la vignette** : Si une vignette est définie dans le frontmatter, elle est affichée avant le titre de chaque article.

#### 4. **Création des pages dynamiques pour chaque article (`[slug].astro`)**

Ce fichier génère une page individuelle pour chaque article. Il utilise le `slug` pour identifier et charger le bon fichier `.md`.

Voici le fichier `[slug].astro` :

```astro
---
import LayoutClassic from '../../layouts/LayoutClassic.astro';

// Importer l'article spécifique en fonction de son URL (slug)
export async function getStaticPaths() {
  const articles = await Astro.glob('../../content/news/*.md');
  
  return articles.map((article) => ({
    params: { slug: article.frontmatter.slug || article.file.split('/').pop().replace('.md', '') },
    props: { article },
  }));
}

const { article } = Astro.props;
const { frontmatter, Content } = article;
---

<LayoutClassic title={frontmatter.title}>
  <article>
    <h1>{frontmatter.title}</h1>
    <small>{new Date(frontmatter.date).toLocaleDateString()}</small>
    <p>{frontmatter.description}</p>

    {frontmatter.image && (
      <img src={frontmatter.image} alt={`Vignette de ${frontmatter.title}`} width="300" height="200" />
    )}

    <!-- Afficher directement le contenu de l'article en Markdown -->
    <Content />
  </article>
</LayoutClassic>
```

#### Explication :
- **`getStaticPaths()`** : Cette fonction génère tous les chemins dynamiques en fonction du `slug` ou du nom de fichier pour créer les pages d'articles.
- **Rendu du contenu** : Le contenu de l'article est rendu via `<Content />`, qui traite directement le contenu Markdown.
- **Affichage de la vignette** : La vignette est affichée en haut de la page de l'article si elle est définie dans le frontmatter.

### Résultat :
- La page **`news.astro`** affiche une liste d'articles avec vignettes, titres, descriptions et dates de publication. Chaque titre est un lien vers la page individuelle de l'article.
- Le fichier **`[slug].astro`** génère une page de détail pour chaque article en utilisant le `slug`.

### Bénéfices :
- **Modularité** : Chaque article est un fichier Markdown indépendant avec son propre frontmatter et contenu.
- **Dynamique** : Les pages et URLs sont générées dynamiquement à partir des fichiers Markdown.
- **Facilité de mise à jour** : Ajouter un nouvel article est aussi simple que créer un nouveau fichier `.md`.

En suivant cette démarche, tu crées une rubrique "news" professionnelle et dynamique pour le site **HOKOHA** avec Astro et Markdown.



Pour intégrer un **widget d'actualité** sur la page d'accueil qui affiche le résumé des **3 dernières news**, voici comment procéder.

### 1. **Récupérer les 3 dernières actualités dans un composant Astro**

Tu vas créer un composant réutilisable qui récupère les trois derniers articles d'actualité et affiche un résumé sur la page d'accueil.

#### Créer un composant `NewsWidget.astro`

Dans ton répertoire `src/components/`, crée un fichier `NewsWidget.astro` qui servira de widget pour afficher les actualités.

#### Contenu du fichier `NewsWidget.astro` :

```astro
---
import { LayoutClassic } from '../layouts/LayoutClassic.astro'; // Optionnel si tu utilises un layout global

// Charger les 3 derniers articles
const articles = await Astro.glob('../content/news/*.md');

// Trier les articles par date (du plus récent au plus ancien)
articles.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

// Sélectionner les 3 derniers articles
const latestArticles = articles.slice(0, 3);

// Fonction pour générer une URL basée sur le nom du fichier ou le slug
function generateUrl(article) {
  if (article.frontmatter.slug) {
    return `/news/${article.frontmatter.slug}`;
  }
  
  const slugFromFile = article.file.split('/').pop().replace('.md', '');
  return `/news/${slugFromFile}`;
}
---

<div class="news-widget">
  <h2>Dernières actualités</h2>
  <ul>
    {latestArticles.map((article) => (
      <li>
        <a href={generateUrl(article)}>
          {article.frontmatter.image && (
            <img src={article.frontmatter.image} alt={`Vignette de ${article.frontmatter.title}`} width="100" height="75" />
          )}
          <h3>{article.frontmatter.title}</h3>
          <p>{article.frontmatter.description}</p>
          <small>{new Date(article.frontmatter.date).toLocaleDateString()}</small>
        </a>
      </li>
    ))}
  </ul>
</div>
```

#### Explication :
- **Chargement des articles** : On utilise `Astro.glob()` pour charger tous les fichiers Markdown des articles dans `content/news/`.
- **Tri** : Les articles sont triés par date pour s'assurer que les plus récents sont affichés en premier.
- **Limitation à 3 articles** : On utilise `slice(0, 3)` pour ne récupérer que les 3 derniers articles.
- **Affichage des résumés** : Pour chaque article, on affiche la vignette, le titre, la description et la date.

### 2. **Intégrer le widget dans la page d'accueil**

Ensuite, tu dois inclure ce widget dans la page d'accueil de ton site. Ouvre le fichier `src/pages/index.astro` (ou la page d'accueil de ton choix) et importe le widget.

#### Contenu de `index.astro` (page d'accueil) :

```astro
---
import LayoutClassic from '../layouts/LayoutClassic.astro';
import NewsWidget from '../components/NewsWidget.astro'; // Importer le widget des actualités
---

<LayoutClassic title="Bienvenue sur le site de HOKOHA">
  <h1>Bienvenue sur HOKOHA</h1>
  <p>Explorez nos services et découvrez les dernières actualités.</p>

  <!-- Intégration du widget des actualités -->
  <NewsWidget />

  <p>Contactez-nous pour en savoir plus.</p>
</LayoutClassic>
```

### 3. **Personnalisation du style du widget**

Pour ajuster le style du widget, tu peux ajouter du CSS dans ton fichier de style global ou au sein du composant `NewsWidget.astro`.

Exemple de style simple à ajouter dans le composant ou dans ton fichier de styles global :

```css
.news-widget ul {
  list-style-type: none;
  padding: 0;
}

.news-widget li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.news-widget img {
  margin-right: 1rem;
  border-radius: 8px;
}
```

### Résultat attendu :
- Sur la page d'accueil, le widget affichera les trois dernières actualités sous forme de résumé avec une vignette, le titre, une brève description et la date.
- Chaque titre d'actualité sera un lien menant à la page détaillée de l'article.

### Résumé des étapes :
1. **Créer un composant `NewsWidget.astro`** qui charge les trois dernières actualités, les trie, et affiche un résumé.
2. **Intégrer le widget** dans la page d'accueil (`index.astro`).
3. **Personnaliser le style** du widget pour qu'il s'intègre bien à l'apparence générale du site.

Avec cette méthode, tu affiches dynamiquement les 3 dernières actualités sur la page d'accueil de **HOKOHA**, offrant ainsi aux visiteurs un accès rapide aux informations récentes.