import { gsap, ScrollTrigger } from "gsap/all";
import Splitting from "splitting";
import { HighlightEffect as HighlightEffect13 } from './effect-13/highlightEffect.js';
//import { preloadFonts } from './utils.js';

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollTrigger);


// Fonction exportée pour initialiser les effets
export function initializeHighlight() {
  //preloadFonts('sem5iwx').then(() => {
    document.body.classList.remove('loading');

    // Ajouter Splitting aux éléments ayant la classe '.hx' (exclut ceux avec 'hx-11')
    const highlightedElements = document.querySelectorAll('.hx');
    highlightedElements.forEach(el => {
      if (!el.classList.contains('hx-11')) {
        el.dataset.splitting = '';
      }
    });
    Splitting();

    // Appliquer les effets
    const effects = [
      { selector: '.hx-13', effect: HighlightEffect13 }
    ];

    effects.forEach(({ selector, effect }) => {
      document.querySelectorAll(selector).forEach(el => {
        // Passe gsap et ScrollTrigger lors de la création de l'instance
        new effect(el, gsap, ScrollTrigger);
      });
    });
  //});
}