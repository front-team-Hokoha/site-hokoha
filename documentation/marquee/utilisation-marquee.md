# Utilisation du Marquee

## Sommaire
- [Marque.astro](#marquee)
   - [propriété : direction](#direction)
   - [propriété : modifier](#modifier)
   - [Animation](#animation)
- [MarqueItem.astro](#marqueeitem)
   - [Item](#item)
   - [Image](#image)
   - [Texte](#texte)
- [Utilisation](#utiliser)
---

Le **Marquee**, permet de mettre en avant les technologies utilisées dans un projet grâce à un défilement hozirontal. 

Il est basé sur deux composants, `Marquee` et `MarqueeItem` :

```
<Marquee>
   <MarqueeItem />
</Marquee>
```
---

## Marquee.astro {#marquee}
Ce composant contient un wrapper appelé `sok-marquee__content` servant de conteneur principal, regroupant l'ensemble des éléments (images et/ou textes).

```
<div class="sok-marquee">
   <div class={`sok-marquee__content ${direction} ${modifier}`}>
      <slot />
   </div>
</div>
```
<br>

`sok-marquee__content` possède deux propriétés Astro :

---
### propriété : direction {#direction}
La propriété `direction` permet de définir le sens de défilement du marquee.

#### Valeurs possible
**Normal :**
Défilement gauche à droite avec `-normal` :

```
<Marquee diretion="-normal">
   ...
</Marquee>
```

`-normal` est la valeur par défaut. Il n’est pas nécessaire de la préciser.

**Reverse :**
Défilement de droite à gauche avec `-reverse` :

```
<Marquee diretion="-reverse">
   ...
</Marquee>
```
---
### propriété : modifier {#modifier}
La propriété `modifier`, permet de modifier l'affichage des `MarqueeItem`.

#### Valeurs possible
**Disposition en ligne : rowD**
`-rowD` permet d'afficher le contenu des ``MarqueeItem` en ligne

```
<MarqueeItem>

   image + texte

</MarqueeItem>
```

<br>

**Disposition en colonne : colD**
`-colD` permet d'afficher le contenu des ``MarqueeItem` en colonne

```
<MarqueeItem>

   image 
      + 
   texte
   
</MarqueeItem>
```

<br>

**Pas d'image : no-image**
`-no-image` masque l'image d'un `MarqueeItem` et affiche uniquement le texte

```
<MarqueeItem>

   image /* display: none; */
     + 
   texte
   
</MarqueeItem>
```

<br>

**Pas d'image : no-image**
`-no-image` masque le texte d'un `MarqueeItem` et affiche uniquement l'image

```
<MarqueeItem>

   image 
     + 
   texte /* display: none; */
   
</MarqueeItem>
```

---
### Animation {#animation}
L'animation du marquee est gérée en CSS et possède deux sens de défilement possibles appliquable à `sok-marquee-content`.

**Direction : normal**
```
   @keyframes marquee {
      0% {
         transform: translateX(-50%);
         -moz-transform: translateX(-50%);
         -webkit-transform: translateX(-50%);
      }
      
      100% {
         transform: translateX(0);
         -moz-transform: translateX(0);
         -webkit-transform: translateX(0);
      }
   }
```

<br>

**Direction : reverse**
```
   @keyframes marquee-reverse {
      0% {
         transform: translateX(0);
         -moz-transform: translateX(0);
         -webkit-transform: translateX(0);
      }
      
      100% {
         transform: translateX(-50%);
         -moz-transform: translateX(-50%);
         -webkit-transform: translateX(-50%);
      }
   }
```

---

## MarqueeItem.astro {#marqueeitem}
Chaque élément du marquee est constitué d'un `MarqueeIem`, composé d'une div `sok-item`.

`sok-item` contient une image ,`sok-item__image` et un texte, `sok-item__text`.

```
<div class="sok-item">
   <img class="sok-item__image">

   <span class="sok-item__text oka-data -lg -strong"></span>
</div>
```

---
### Item {#item}

`sok-item` possède deux propriétés Astro :
<br>

#### Texte
`texte` : sert à définir le contenu de l’attribut `aria-label`, afin d’assurer l’accessibilité pour les personnes utilisant des lecteurs d’écran.

```
// Dans le composant

<div class="sok-item" aria-label={texte}>
   ...
</div>
```

<br>


```
// Utilisation du composant Marquee dans une page

<Marquee>
   <MarqueeItem texte="HTML" />
</Marquee>
```
___ 

#### Hidden
`hidden` : permet d’attribuer une valeur booléenne (true ou false) au composant afin d’empêcher les lecteurs d’écran de relire chaque `MarqueItem` après la première lecture.

Sa valeur est par défaut à `true` :

```
// Dans le composant

<div class="sok-item" hidden={hidden}>
   ...
</div>
```

<br>

```
// Utilisation du composant Marquee dans une page

<Marquee>
   <MarqueeItem hidden={false} />
   <MarqueeItem hidden={false} />
   <MarqueeItem hidden={false} />
   <MarqueeItem hidden={false} />

   <MarqueeItem />
   <MarqueeItem />
   <MarqueeItem />
   <MarqueeItem />

</Marquee>
```

---

### Image {#image}
`sok-item__image` possède deux propriétés Astro : `srcImage` et `altImage`.

#### propriété : srcImage {#srcImage}
`srcImage` définit la source de l'image :

```
// Dans le composant

<div class="sok-item">
   <img class="sok-item__image" src={srcImage}>
   ...
</div>
```

<br>

```
// Utilisation du composant Marquee dans une page

<Marquee>
   <MarqueeItem srcImage="/src/assets/images/technologie/html.png" />
</Marquee>
``` 

<br>

#### propriété : altImage {#altImage}
`altImage` ajoute un texte alternatif à l'image :

```
// Dans le composant

<div class="sok-item">
   <img class="sok-item__image" src={srcImage} alt={altImage}>
   ...
</div>
```

<br>

```
// Utilisation du composant Marquee dans une page

<Marquee>
   <MarqueeItem srcImage="/src/assets/images/technologie/html.png" altImage="HTML" />
</Marquee>
``` 

---

### Texte {#texte}
`sok-item__text` utilise également la propriété `texte`.

Le texte est injecté dans le `span`, grâce à une directive Astro : `set:html`.

```
// Dans le composant

<div class="sok-item">
   ...

   <span class="sok-item__text oka-data -lg -strong" set:html={texte}></span>
</div>
```

<br>

```
// Utilisation du composant Marquee dans une page

<Marquee>
   <MarqueeItem srcImage="/src/assets/images/technologie/html.png" altImage="HTML" texte="HTML />
</Marquee>
```

---

## Uilisation {#utiliser}
Pour utiliser le **Marquee** dans une page ou un composant :

**Importation :**
```
---
// Composants utilisés
import Marquee from "../components/commun/marquee/Marquee.astro"
import MarqueeItem from "../components/commun/marquee/MarqueeItem.astro"
...
---
```

*Attention au chemin utilisé !*

**utilisation :**
```
<Marquee modifier="-rowD">
   <MarqueeItem srcImage="/src/assets/images/technologie/html.png" altImage="HTML" texte="HTML" hidden="false"/>
   <MarqueeItem srcImage="/src/assets/images/technologie/Javascript.png" altImage="Javascript" texte="Javascript" hidden="false"/>
   <MarqueeItem srcImage="/src/assets/images/technologie/MySql.png" altImage="MySql" texte="MySql" hidden="false"/>

   <MarqueeItem srcImage="/src/assets/images/technologie/html.png" altImage="HTML" texte="HTML" />
   <MarqueeItem srcImage="/src/assets/images/technologie/Javascript.png" altImage="Javascript" texte="Javascript" />
   <MarqueeItem srcImage="/src/assets/images/technologie/MySql.png" altImage="MySql" texte="MySql" />

   ...
   ...
   ...
</Marquee>
```

<br>

Résultat lors de la compilation :
```
<div class="sok-marquee" >
   <div class="sok-marquee__content -normal -rowD">

      <div class="sok-item" aria-label="HTML aria-hidden="false">
         <img class="sok-item__image" src="assets/images/technologie/html.png alt=Html>

         <span class="sok-item__text oka-data -lg -strong">
            HTML
         </span>
      </div>
      ...
      ...

      ...
      ...
      ...
   </div>
</div>
```