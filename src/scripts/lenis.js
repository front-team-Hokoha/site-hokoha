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


  requestAnimationFrame(raf);


  // Gérer les clics sur les ancres pour le smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      alert('dfd')
      e.preventDefault(); // Empêche le comportement de scroll par défaut
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        lenis.scrollTo(targetElement); // Utiliser Lenis pour scroller
      }
    });
  });
}


