export const ANIMATION_TRIGGER = {
    sm: "top 90%",
    lg: "top 90%",
};

/**
 * Retourne la position de déclenchement de l'animation pour un élément donné.
 * Utilise data-offset-sm et data-offset-lg si présents, sinon les valeurs globales.
 * @param {Element|null} element
 * @returns {string}
 */
export function getStartPosition(element) {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
        return element?.dataset?.offsetSm ?? ANIMATION_TRIGGER.sm;
    }
    return element?.dataset?.offsetLg ?? ANIMATION_TRIGGER.lg;
}
