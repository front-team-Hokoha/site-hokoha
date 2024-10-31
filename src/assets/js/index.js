import { gsap, ScrollTrigger, Flip } from "gsap/all";
import Splitting from "splitting";
import { HighlightEffect as HighlightEffect13 } from './effect-13/highlightEffect.js';
import { HighlightEffect as HighlightEffect7 } from './effect-7/highlightEffect.js';
import { preloadFonts } from './utils.js';

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollTrigger, Flip);


// Fonction exportée pour initialiser les effets
export function initializeEffects() {
  preloadFonts('sem5iwx').then(() => {
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
      { selector: '.hx-13', effect: HighlightEffect13 },
      { selector: '.hx-7', effect: HighlightEffect7 },
    ];

    effects.forEach(({ selector, effect }) => {
      document.querySelectorAll(selector).forEach(el => {
        // Passe gsap et ScrollTrigger lors de la création de l'instance
        new effect(el, gsap, ScrollTrigger);
      });
    });
  });
}