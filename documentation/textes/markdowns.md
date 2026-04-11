# Utilisation des Markdown pour les textes des pages
Des fichiers Markdown sont utilisés pour contenir les textes de chaque page du site, et sont intégrés dans des **pages** ou **componsant** `.astro`.

## Sommaire
- [Arborescence](#arbo)
- [Fichiers Markdown](#markdown)
- [Utilisation](#utiliser)

---
## Arborescence des fichiers {#arbo}
Les fichiers `.md` se trouvent dans le dossier contenus qui se trouve lui-mêmes dans le dossier `src`. Le dossier `pages`, contenant toutes les pages du site ce situe également dans le dosser `src`.

```  
├── 📁 src
│   ├── 📁 contenus
│   │   ├── 📁 accueil
│   │   │   ├── 📁 entreprise
│   │   │   │   └── 📝 titre-entreprise.md
│   │   │   ├── 📁 hero
│   │   │   │   └── 📝 paragraphe-hero.md
│   │   │   └── 📁 savoir-faires
│   │   │       ├── 📁 cartes
│   │   │       │   ├── 📝 savoir-faire-1.md
│   │   │       │   ├── 📝 savoir-faire-2.md
│   │   │       │   ├── 📝 savoir-faire-3.md
│   │   │       │   └── 📝 savoir-faire-4.md
│   │   │       ├── 📝 paragraphe-savoir-faire.md
│   │   │       └── 📝 titre-savoir-faire.md
│   │   ├── 📁 contact
│   │   │   └── 📝 titre-contact.md
│   │   ├── 📁 equipe
│   │   │   ├── 📝 paragraphe-equipe.md
│   │   │   ├── 📝 paragraphe-formation.md
│   │   │   ├── 📝 paragraphe-histoire.md
│   │   │   ├── 📝 paragraphe-hommage.md
│   │   │   ├── 📝 titre-equipe.md
│   │   │   ├── 📝 titre-formation.md
│   │   │   ├── 📝 titre-global.md
│   │   │   └── 📝 titre-hommage.md
│   │   ├── 📁 projets
│   │   │   └── 📁 hibou
│   │   │       ├── 📝 paragraphe-hero.md
│   │   │       └── 📝 paragraphe.md
│   │   └── 📁 realisations
│   │       ├── 📝 paragraphe-diversite.md
│   │       ├── 📝 paragraphe-hero.md
│   │       ├── 📝 titre-diversite.md
│   │       └── 📝 titre-hero.md
│   |
│   ├── 📁 pages
│   │   ├── 📄 contact.astro
│   │   ├── 📄 equipe.astro
│   │   ├── 📄 hibou.astro
│   │   ├── 📄 index.astro
│   │   ├── 📄 methodologie.astro
└─  └─  └── 📄 realisations.astro

```

## Fichiers .md {#markdown}

un fichier .md contient une balise html contenant du texte :
```
// titre Hero de la page Accueil

<h1 class="oka-h -xl">
   Lorem ipsum ac a scelerisquealiquam fames.
</h1>
```
ou encore :
```
// paragraphe Section X de la page Équipe

<p class="oka-text -md">
   Lorem ipsum dolor sit amet consectetur. Commodo dui diam in maecenas sed
   tincidunt fames bibendum varius. Arcu dolor a amet risus platea lacus.
</p>
```
\
Il est aussi possible d'ajouter d'autres éléments `HTML` pour styliser le contenu : 
```
// paragraphe Section X de la page Équipe

<p class="oka-text -md">
   Lorem ipsum dolor sit amet consectetur. <span class="ma-classe">Commodo dui</span> 
   diam in maecenas <span class="ma-classe-toto">sed tincidunt</span>  fames bibendum varius. 
</p>
```

## Comment utiliser le contenu des .md {#utiliser}
Pour utiliser un .md dans une page ou un composant, il suffit de l'importer et de l'utiliser un peu comme un composant :

**Importation :**
```
---
// Fichiers Markdown
import * as titreHero from "../contenus/realisations/titre-hero.md"
import * as paragrapheHero from "../contenus/realisations/paragraphe-hero.md"
---
```

*Attention au chemin utilisé !*

**utilisation :**
```
<section>
   <titreHero.Content />

   <paragrapheHero.Content />
</section>
```
\
Résultat lors de la compilation :
```
<section>
   <h1 class="oka-h -xl">Lorem ipsum ac a scelerisquealiquam fames.</h1>

   <p class="oka-text -md">
      Lorem ipsum dolor sit amet consectetur. Commodo dui diam in maecenas sed
      tincidunt fames bibendum varius. Arcu dolor a amet risus platea lacus.
   </p>
</section>
```

