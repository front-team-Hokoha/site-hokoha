export class HighlightEffect {
  constructor(el, gsap, ScrollTrigger) {  
    // Validates the input element to ensure it's an HTML element.
    if (!el || !(el instanceof HTMLElement)) {
      throw new Error('Invalid element provided.');
    }

    this.gsap = gsap;  // Stocke gsap
    this.ScrollTrigger = ScrollTrigger;  // Stocke ScrollTrigger
    this.highlightedElement = el;
    this.selectMarker = this.highlightedElement.querySelector('.hx__select');
    this.highlightedChars = this.highlightedElement.querySelectorAll('.char');

    this.animationDefaults = {
      duration: 0.4,
      ease: 'power1.inOut',
    };

    // Appelle la méthode pour configurer l'effet initial.
    this.initializeEffect(this.wrapElement);
  }
  
  // Configure l'effet initial sur l'élément fourni.
  initializeEffect(element) {
    this.scroll();
  }

  // Définit la logique d'effet de défilement pour l'élément.
  scroll() {
    if (!this.ScrollTrigger) {
      throw new Error("ScrollTrigger n'est pas défini dans HighlightEffect.");
    }

    this.ScrollTrigger.create({
      trigger: this.highlightedElement,
      start: 'top bottom',
      onEnter: () => this.animateChars(),
      onEnterBack: () => this.animateChars(),
      // Réinitialise l'état du caractère lorsque l'on fait défiler vers l'arrière
      // onLeave: () => this.resetChars(),
      onLeaveBack: () => this.resetChars()
    });
  }

  animateChars() {
    this.gsap
      .timeline({ defaults: this.animationDefaults })
      .fromTo(this.highlightedChars, {
        willChange: 'filter',
        filter: 'drop-shadow(0px 0px 0px #ffdbf5)'
      }, {
        stagger: 0.03,
        filter: 'drop-shadow(0px 0px 20px #ffdbf5)'
      })
      .to(this.selectMarker, {
        duration: 0.8,
        ease: 'expo',
        '--select-width': getComputedStyle(this.highlightedElement).getPropertyValue('--select-width-final'),
      }, 0);
  }

  resetChars() {
    this.gsap.killTweensOf([this.highlightedChars, this.selectMarker]);
    this.gsap.set(this.selectMarker, {
      '--select-width': '0%',
    });
    this.gsap.set(this.highlightedChars, {
      filter: 'drop-shadow(0px 0px 0px #ffdbf5)'
    });
  }
}