/**
 * EPM Wealth — Design Tokens & Theme Configuration
 * ─────────────────────────────────────────────────
 * USAGE: Import this file anywhere tokens are needed.
 *   import { tokens, cssVars } from './config/theme.js';
 *
 * To change the entire site palette / typography, edit ONLY this file.
 * All components consume these tokens, so changes ripple automatically.
 */

export const tokens = {
  /* ── Colour Palette ── */
  color: {
    cream:        '#f5ede0',
    cream2:       '#ede4d6',
    cream3:       '#faf4ec',
    warm:         '#8b6342',
    warm2:        '#c49a5a',
    warm3:        '#e2c47a',
    char:         '#1c2540',
    char2:        '#2a2a2a',
    navy:         '#0d1f3c',
    gold:         '#c49a5a',
    gold2:        '#d4aa6a',
    border:       '#e0d4c0',
    border2:      '#cfc3ad',
    muted:        '#5a4e3a',
    muted2:       '#7a6a54',
    white:        '#ffffff',
    offwhite:     '#faf7f2',
    blush:        '#f5ede0',
    bgLight:      '#f7f6f3',
    darkBase:     '#0a0a0a',
    darkMid:      '#111111',
    accentGold:   '#b8965a',
    accentDim:    'rgba(184,150,90,0.18)',
    textPrimary:  '#1a1a1a',
    textMuted:    '#6b6b6b',
    textWhite:    '#f0ede8',
    textFaint:    'rgba(240,237,232,0.55)',
    navBorder:    'rgba(0,0,0,0.07)',
    borderGlass:  'rgba(255,255,255,0.12)',
  },

  /* ── Typography ── */
  font: {
    display: "'Cormorant Garamond', Georgia, serif",
    body:    "'DM Sans', 'Helvetica Neue', sans-serif",
    ui:      "'Jost', sans-serif",
  },

  /* ── Google Fonts href ── */
  googleFontsHref: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&family=DM+Sans:wght@300;400;500&display=swap",

  /* ── Spacing ── */
  spacing: {
    sectionPad:  '88px 7%',
    sectionSm:   '64px 7%',
    innerPad:    '48px',
    navHeight:   '72px',
  },

  /* ── Shape / Radius ── */
  radius: {
    sm:  '4px',
    md:  '8px',
    pill:'20px',
  },

  /* ── Transitions ── */
  transition: {
    fast: '0.18s ease',
    mid:  '0.32s cubic-bezier(0.22,1,0.36,1)',
    slow: '0.55s cubic-bezier(0.22,1,0.36,1)',
  },

  /* ── Layout ── */
  layout: {
    heroMax: '1460px',
    maxContent: '1200px',
  },
};

/**
 * Generates a <style> block with all CSS custom properties.
 * Inject this once in your <head> via `document.head.insertAdjacentHTML('beforeend', cssVarBlock())`.
 */
export function cssVarBlock() {
  return `<style>
:root {
  /* Colours */
  --cream:${tokens.color.cream};--cream2:${tokens.color.cream2};--cream3:${tokens.color.cream3};
  --warm:${tokens.color.warm};--warm2:${tokens.color.warm2};--warm3:${tokens.color.warm3};
  --char:${tokens.color.char};--char2:${tokens.color.char2};--navy:${tokens.color.navy};
  --gold:${tokens.color.gold};--gold2:${tokens.color.gold2};
  --border:${tokens.color.border};--border2:${tokens.color.border2};
  --muted:${tokens.color.muted};--muted2:${tokens.color.muted2};
  --white:${tokens.color.white};--offwh:${tokens.color.offwhite};--blush:${tokens.color.blush};
  --color-bg:${tokens.color.bgLight};--color-surface:${tokens.color.white};
  --color-dark:${tokens.color.darkBase};--color-dark-mid:${tokens.color.darkMid};
  --color-accent:${tokens.color.accentGold};--color-accent-dim:${tokens.color.accentDim};
  --color-text-primary:${tokens.color.textPrimary};--color-text-muted:${tokens.color.textMuted};
  --color-text-white:${tokens.color.textWhite};--color-text-faint:${tokens.color.textFaint};
  --color-border:${tokens.color.borderGlass};--color-nav-border:${tokens.color.navBorder};
  /* Typography */
  --font-display:${tokens.font.display};--font-body:${tokens.font.body};--font-ui:${tokens.font.ui};
  /* Layout */
  --nav-height:${tokens.spacing.navHeight};--inner-pad:${tokens.spacing.innerPad};
  --hero-max:${tokens.layout.heroMax};--hero-pad:0px;
  /* Shape */
  --radius-sm:${tokens.radius.sm};--radius-md:${tokens.radius.md};
  /* Motion */
  --transition-fast:${tokens.transition.fast};
  --transition-mid:${tokens.transition.mid};
  --transition-slow:${tokens.transition.slow};
}
</style>`;
}

export default tokens;
