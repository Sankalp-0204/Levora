/**
 * @file lib/utils/archivalSvg.ts
 * @description Generates monochromatic, archival-style SVG placeholders for Levora Journal.
 */

export function generateArchivalSvg(theme: "parchment" | "charcoal" | "bronze", patternType: "geometry" | "manuscript" | "macro" | "engraving", seed: number = 1): string {
  const themes = {
    parchment: {
      bg: "#111111", // Very dark, ink-like
      stroke: "rgba(200, 180, 140, 0.2)",
      accent: "rgba(200, 180, 140, 0.4)",
    },
    charcoal: {
      bg: "#080808",
      stroke: "rgba(255, 255, 255, 0.1)",
      accent: "rgba(255, 255, 255, 0.2)",
    },
    bronze: {
      bg: "#1a1510",
      stroke: "rgba(184, 115, 51, 0.2)",
      accent: "rgba(184, 115, 51, 0.4)",
    }
  };

  const currentTheme = themes[theme];

  let patternContent = "";

  if (patternType === "geometry") {
    // Abstract geometric lines reminiscent of Chand Baori / Warli
    patternContent = `
      <g stroke="${currentTheme.stroke}" stroke-width="1" fill="none">
        ${Array.from({ length: 20 }).map((_, i) => {
          const cx = 400 + Math.sin(i * seed) * 100;
          const cy = 300 + Math.cos(i * seed) * 100;
          const r = 50 + i * 15;
          return `<circle cx="${cx}" cy="${cy}" r="${r}" opacity="${0.8 - (i * 0.03)}" />`;
        }).join("")}
      </g>
    `;
  } else if (patternType === "manuscript") {
    // Horizontal lines resembling old text or Pattachitra borders
    patternContent = `
      <g stroke="${currentTheme.stroke}" stroke-width="1.5">
        ${Array.from({ length: 30 }).map((_, i) => {
          const y = 100 + i * 14;
          const w = 400 + Math.sin(i * seed) * 100;
          return `<line x1="200" y1="${y}" x2="${200 + w}" y2="${y}" stroke-dasharray="4 ${seed % 3 + 2}" />`;
        }).join("")}
        <rect x="180" y="80" width="500" height="440" fill="none" stroke="${currentTheme.accent}" stroke-width="2" />
      </g>
    `;
  } else if (patternType === "macro") {
    // Close up abstract shapes (like a dial macro)
    patternContent = `
      <g stroke="${currentTheme.stroke}" stroke-width="0.5" fill="none">
        <circle cx="400" cy="300" r="250" stroke="${currentTheme.accent}" stroke-width="2" />
        <circle cx="400" cy="300" r="240" stroke-dasharray="2 4" />
        ${Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          const x1 = 400 + Math.cos(angle) * 230;
          const y1 = 300 + Math.sin(angle) * 230;
          const x2 = 400 + Math.cos(angle) * 250;
          const y2 = 300 + Math.sin(angle) * 250;
          return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
        }).join("")}
        <path d="M380,300 Q400,200 450,280 T380,300" fill="${currentTheme.accent}" opacity="0.1" />
      </g>
    `;
  } else if (patternType === "engraving") {
    // Dense cross-hatching
    patternContent = `
      <g stroke="${currentTheme.stroke}" stroke-width="0.5">
        ${Array.from({ length: 100 }).map((_, i) => {
          return `<line x1="${i * 8}" y1="0" x2="${800}" y2="${800 - i * 8}" />`;
        }).join("")}
        ${Array.from({ length: 100 }).map((_, i) => {
          return `<line x1="0" y1="${i * 8}" x2="${800 - i * 8}" y2="800" />`;
        }).join("")}
      </g>
      <circle cx="400" cy="300" r="150" fill="${currentTheme.bg}" stroke="${currentTheme.accent}" stroke-width="1" />
      <circle cx="400" cy="300" r="140" fill="none" stroke="${currentTheme.stroke}" stroke-width="1" />
    `;
  }

  // Adding noise/grain filter to give it an archival feel
  const noiseFilter = `
    <filter id="noise${seed}">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.08 0" />
    </filter>
  `;

  return `<svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
    <defs>${noiseFilter}</defs>
    <rect width="800" height="600" fill="${currentTheme.bg}" />
    ${patternContent}
    <rect width="800" height="600" style="pointer-events:none;" filter="url(#noise${seed})" opacity="0.8" />
  </svg>`;
}
