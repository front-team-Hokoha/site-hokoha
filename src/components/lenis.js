// src/components/lenis.js
import Lenis from '@studio-freight/lenis'

export function initLenis() {
   
  const lenis = new Lenis({

    duration: 1.2,          // Durée de l'effet de défilement
    easing: (t) => 1 - Math.pow(1 - t, 2), // Fonction easing ease-out pour un ralentissement progressif   // Courbe de défilement
    smooth: true,           // Active le smooth scrolling
    direction: 'vertical',  // Direction du défilement
    smoothTouch: false,    
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}


