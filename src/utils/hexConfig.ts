export const hexHeightMd = 128;
export const hexWidthMd  = 110.851;

export const hexHeightLg = 133.8;
export const hexWidthLg  = 178.68;

export const hexHeightSm = 96;
export const hexWidthSm  = 83.138;

// Paths SVG correspondants
export const hexPathSm = "M 35.25 3 Q 41.569 0 47.25 3 L 76.5 21 Q 83.138 24 83.138 30 L 83.138 66 Q 83.138 72 76.5 75 L 47.25 93 Q 41.569 96 35.25 93 L 6 75 Q 0 72 0 66 L 0 30 Q 0 24 6 21 Z";
export const hexPathMd = "M 47 4 Q 55.425 0 63 4 L 102 28 Q 110.851 32 110.851 40 L 110.851 88 Q 110.851 96 102 100 L 63 124 Q 55.425 128 47 124 L 8 100 Q 0 96 0 88 L 0 40 Q 0 32 8 28 Z";
export const hexPathLg = "M 178.89 127.3 V 6.93 C 178.89 3.21 175.89 0.21 172.19 0.21 H 39.7 C 37.91 0.21 36.2 0.93 34.94 2.19 L 2.16 35.16 C 0.91 36.41 0.21 38.11 0.21 39.89 V 127.3 C 0.21 131.01 3.21 134.01 6.93 134.01 H 172.19 C 175.89 134.01 178.89 131.01 178.89 127.3 Z";
// Chemin normalisé [0,1] pour clipPathUnits="objectBoundingBox" — s'adapte à n'importe quelle taille de conteneur
export const hexNormPathLg = "M 1 0.94993 V 0.05172 C 1 0.02396 0.98323 0.00157 0.96257 0.00157 H 0.22192 C 0.21193 0.00157 0.20236 0.00694 0.19531 0.01634 L 0.01208 0.26238 C 0.00509 0.27172 0.00117 0.28439 0.00117 0.29767 V 0.94993 C 0.00117 0.97761 0.01794 1 0.03875 1 H 0.96257 C 0.98323 1 1 0.97761 1 0.94993 Z";






// Taille active côté SSR
export const hexHeight = hexHeightLg;
export const hexWidth  = hexWidthLg;
export const hexPath   = hexPathLg;

// Breakpoints responsives (du plus large au plus petit)
export const hexBreakpoints = [
  { minWidth: 1440, width: hexWidthLg, height: hexHeightLg, path: hexPathLg },
  { minWidth: 768,  width: hexWidthMd, height: hexHeightMd, path: hexPathMd },
  { minWidth: 0,    width: hexWidthSm, height: hexHeightSm, path: hexPathSm },
] as const;

export function getHexSize(viewportWidth: number): { width: number; height: number; path: string } {
  return hexBreakpoints.find(bp => viewportWidth >= bp.minWidth) ?? hexBreakpoints[hexBreakpoints.length - 1];
}
