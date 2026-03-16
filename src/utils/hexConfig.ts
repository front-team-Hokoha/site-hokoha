export const hexHeightMd = 128;
export const hexWidthMd  = 110.851;

export const hexHeightLg = 160;
export const hexWidthLg  = 138.564;

export const hexHeightSm = 96;
export const hexWidthSm  = 83.138;

// Paths SVG correspondants
export const hexPathSm = "M 35.25 3 Q 41.569 0 47.25 3 L 76.5 21 Q 83.138 24 83.138 30 L 83.138 66 Q 83.138 72 76.5 75 L 47.25 93 Q 41.569 96 35.25 93 L 6 75 Q 0 72 0 66 L 0 30 Q 0 24 6 21 Z";
export const hexPathMd = "M 47 4 Q 55.425 0 63 4 L 102 28 Q 110.851 32 110.851 40 L 110.851 88 Q 110.851 96 102 100 L 63 124 Q 55.425 128 47 124 L 8 100 Q 0 96 0 88 L 0 40 Q 0 32 8 28 Z";
export const hexPathLg = "M 58.75 5 Q 69.281 0 78.75 5 L 127.5 35 Q 138.564 40 138.564 50 L 138.564 110 Q 138.564 120 127.5 125 L 78.75 155 Q 69.281 160 58.75 155 L 10 125 Q 0 120 0 110 L 0 50 Q 0 40 10 35 Z";

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
