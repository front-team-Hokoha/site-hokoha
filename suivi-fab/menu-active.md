Pour une méthode plus simple, tu peux directement combiner les classes avec une logique conditionnelle dans Astro, sans avoir besoin d'une fonction séparée. Voici comment simplifier le code tout en respectant ta syntaxe actuelle de gestion des classes :

### Solution simplifiée

Utilise l'opérateur ternaire directement dans le script de ton fichier `.astro` et concatène les classes sans avoir à écrire une fonction séparée.

#### Exemple dans `Menu.astro` :

```astro
---
const { currentPage } = Astro.props; // Récupérer la page active

// Liste des éléments de menu
const menuItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' }
];
---
<nav>
  {menuItems.map((item) => (
    <a href={item.path} class={`oka-bt -ghost ${currentPage === item.name ? '-focus' : ''}`}>
      {item.name}
    </a>
  ))}
</nav>
```

### Explication

- **Concaténation directe dans `class`:** Tu utilises un backtick (`` ` ``) pour construire dynamiquement la chaîne de classes. L'opérateur ternaire `${currentPage === item.name ? '-focus' : ''}` ajoute la classe `-focus` si la page est active, sinon rien n'est ajouté.
  
### Exemple d'une page (pour tester) :

#### Page d'accueil `index.astro` :

```astro
---
import Layout from '../layouts/Layout.astro';

const currentPage = "Accueil"; // Définir le nom de la page active
---

<Layout currentPage={currentPage}>
  <h1>Bienvenue sur la page d'accueil</h1>
</Layout>
```

#### Page Services `services.astro` :

```astro
---
import Layout from '../layouts/Layout.astro';

const currentPage = "Services"; // Définir le nom de la page active
---

<Layout currentPage={currentPage}>
  <h1>Nos services</h1>
</Layout>
```

### Résumé

- **Simplicité maximale :** Tu n’as plus besoin de fonction externe ou de logique complexe. La classe `-focus` est ajoutée directement dans le template avec un simple opérateur ternaire.
- **Concatenation des classes :** Les classes sont construites dynamiquement à l'intérieur du même attribut `class` en utilisant les backticks (`` ` ``) et la logique ternaire.

Cette méthode est concise et facile à maintenir !