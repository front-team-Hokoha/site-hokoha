

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

/**
 * Anime un élément texte lettre par lettre avec un effet curseur.
 * Utilise le plugin GSAP SplitText.
 */
export class TextAnimator {
    /** @param {HTMLElement} textElement */
    constructor(textElement) {
        if (!textElement || !(textElement instanceof HTMLElement)) {
            throw new Error('Invalid text element provided.');
        }

        this.textElement = textElement;
        this.split = null;
    }

    _ensureSplit() {
        if (!this.split) {
            this.split = SplitText.create(this.textElement, { type: 'words,chars' });
        }
    }

    animate() {
        this._ensureSplit();
        this.reset();

        const chars = this.split.chars;

        chars.forEach((char, i) => {
            const delay = i * 0.07;

            gsap.fromTo(
                char,
                { opacity: 0, '--opa': 0.7 },
                {
                    opacity: 1,
                    '--opa': 0,
                    duration: 0.03,
                    repeat: 3,
                    repeatDelay: 0.04,
                    repeatRefresh: true,
                    delay,
                    ease: 'none',
                    onRepeat() {
                        gsap.set(char, { '--opa': 0 });
                    },
                }
            );
        });
    }

    reset() {
        this._ensureSplit();
        this.split.chars.forEach((char) => {
            gsap.killTweensOf(char);
            gsap.set(char, { opacity: 0, '--opa': 0 });
        });
    }

    revert() {
        if (this.split) {
            this.split.revert();
            this.split = null;
        }
    }
}


