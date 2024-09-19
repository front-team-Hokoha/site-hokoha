Voici une version du composant avec un descriptif des props dans l'entête. Cela te permet de mieux comprendre l'utilité de chaque prop et d'ajouter de la documentation pour faciliter l'utilisation du composant.

### Composant avec descriptif des props

```astro
---
/**
 * ImageComponent: Composant pour afficher une image optimisée avec des options de largeur, hauteur, classes CSS, styles en ligne et support du lazy loading.
 * 
 * @prop {string} src - Chemin de l'image (URL ou import Astro).
 * @prop {string} alt - Texte alternatif pour l'image (obligatoire pour l'accessibilité).
 * @prop {number[]} [widths=[400, 800, 1200]] - Tailles à générer pour le srcset (facultatif).
 * @prop {string} [format="webp"] - Format d'image optimisé, comme "webp" ou "avif" (facultatif).
 * @prop {number} [quality=80] - Qualité de l'image (0-100), plus haute = meilleure qualité mais taille plus grande (facultatif).
 * @prop {number} [imgWidth] - Largeur de l'image affichée (facultatif).
 * @prop {number} [imgHeight] - Hauteur de l'image affichée (facultatif).
 * @prop {string} [className] - Classes CSS à ajouter à l'image pour le style (facultatif).
 * @prop {string} [style] - Styles en ligne pour personnaliser l'apparence de l'image (facultatif).
 */

import { getImage } from 'astro:assets';

const { src, alt, widths, format, quality, imgWidth, imgHeight, className, style } = Astro.props;

// Générer l'image optimisée avec plusieurs largeurs pour le srcset
const image = await getImage({
  src,  // Import ou URL de l'image
  widths: widths || [400, 800, 1200], // Largeurs pour générer le srcset
  format: format || 'webp',           // Format d'image (par défaut webp)
  quality: quality || 80,             // Qualité de l'image
});
---

<img
  src={image.src}                    // Source de l'image
  srcset={image.srcset}              // Liste des sources optimisées
  sizes="(max-width: 600px) 400px, (max-width: 900px) 800px, 1200px"  // Tailles d'écran
  width={imgWidth || image.width}    // Largeur spécifiée ou générée automatiquement
  height={imgHeight || 'auto'}       // Hauteur spécifiée ou auto
  alt={alt}                          // Texte alternatif (obligatoire pour accessibilité)
  loading="lazy"                     // Lazy loading activé
  class={className}                  // Classe CSS passée en prop
  style={style}                      // Styles en ligne passés en prop
/>
```

### Description des props :
1. **`src`** (string, requis) : Chemin de l'image, soit via une URL externe, soit un import local d'image dans Astro.
2. **`alt`** (string, requis) : Texte alternatif pour l'image, essentiel pour l'accessibilité.
3. **`widths`** (number[], optionnel) : Liste de tailles à générer pour le `srcset`, permettant de fournir différentes résolutions d'images.
4. **`format`** (string, optionnel, par défaut `webp`) : Format de sortie de l'image, comme `webp` ou `avif`.
5. **`quality`** (number, optionnel, par défaut `80`) : Niveau de compression (de 0 à 100). Plus la qualité est élevée, plus le fichier est grand.
6. **`imgWidth`** (number, optionnel) : Largeur spécifique de l'image dans la page.
7. **`imgHeight`** (number, optionnel) : Hauteur spécifique de l'image dans la page.
8. **`className`** (string, optionnel) : Classes CSS à appliquer pour styliser l'image.
9. **`style`** (string, optionnel) : Styles en ligne directement appliqués à l'image pour un contrôle personnalisé de l'apparence.

### Exemple d'utilisation :

```astro
<ImageComponent 
  src={logoImage} 
  alt="Logo Hokoha" 
  imgWidth={300} 
  imgHeight={150} 
  className="img-responsive img-border" 
  style="border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);" 
/>
```

### Résumé :
- Ce composant est désormais entièrement documenté avec les props dans l'entête.
- Tu peux facilement ajouter des classes CSS, des styles en ligne, et gérer les dimensions de l'image tout en bénéficiant de l'optimisation des images via Astro.

Cela rend ton composant plus facile à comprendre et à maintenir pour toi ou d'autres développeurs qui l'utiliseront.