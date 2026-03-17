// Initializes smooth scrolling with Lenis and integrates it with GSAP's ScrollTrigger.
// Function to set up smooth scrolling.
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLenis() {
   
  // Initialize Lenis for smooth scroll effects. Lerp value controls the smoothness.
  const lenis = new Lenis({
    lerp: 0.08, // Adjust this value for smoother or snappier scroll (0.1 is default).
    smooth: true,
		direction: 'vertical',
    smoothTouch: false,    
  })

  // Bridge ScrollTrigger to use Lenis' scroll position instead of native scroll.
  // Required for ScrollTrigger pin/snap features to work correctly alongside Lenis.
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.body.style.transform ? "transform" : "fixed"
  });

  // Sync ScrollTrigger with Lenis' scroll updates.
  lenis.on('scroll', ScrollTrigger.update);

  // Ensure GSAP animations are in sync with Lenis' scroll frame updates.
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert GSAP's time to milliseconds for Lenis.
  });

  // Turn off GSAP's default lag smoothing to avoid conflicts with Lenis.
  gsap.ticker.lagSmoothing(0);

  // Recalculate all ScrollTrigger positions after the proxy is set.
  ScrollTrigger.refresh();

}


