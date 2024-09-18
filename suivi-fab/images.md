Voici un résumé global du module d'image d'Astro et des fonctionnalités de performance :

### 1. **Module d'image d'Astro** :
   - **Installation** : Utilise Yarn pour installer le module d'image avec `yarn add @astrojs/image`.
   - **Configuration** : Ajoute le module dans `astro.config.mjs` pour l'activer.
   - **Utilisation du composant `Image`** : Utilise-le pour afficher des images optimisées. 
     Exemple :
     ```astro
     <Image
       src="/path/to/image.jpg"
       alt="Description"
       width={1200}
       height={800}
       srcset={[
         { width: 400 },
         { width: 800 },
         { width: 1200 }
       ]}
     />
     ```

### 2. **Optimisation des performances des images** :
   - **Lazy Loading** : Ajoute `loading="lazy"` pour différer le chargement des images hors écran.
   - **Formats optimisés** : Convertis automatiquement en **WebP** ou **AVIF** pour réduire la taille des fichiers avec `format`.
   - **Contrôle de la qualité** : Utilise `quality` pour ajuster la compression des images.
   - **Redimensionnement automatique** : Astro génère des versions optimisées selon les dimensions fournies.
   - **Support de `srcset` et `sizes`** : Charge des images adaptées aux résolutions et tailles d'écran pour un rendu responsive.
   - **Préchargement des images critiques** : Utilise `<link rel="preload">` pour les images cruciales.
   - **Cache CDN** : Configure un CDN pour optimiser le cache et la distribution des images.

En regroupant ces fonctionnalités, Astro optimise automatiquement le chargement, le poids et la qualité des images, améliorant ainsi la performance du site.