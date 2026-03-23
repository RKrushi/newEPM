# EPM Wealth — Component Architecture

A fully modular, data-driven rebuild of the EPM Wealth website.
**Change data once → it updates everywhere. Change a style token once → it ripples across the entire site.**

---

## Project Structure

```
epm-wealth/
├── index.html              ← Minimal shell: loads base.css + app.js
├── app.js                  ← Orchestrator: renders sections, wires behaviour
│
├── config/
│   ├── theme.js            ← All design tokens as JS constants (source of truth)
│   └── siteData.js         ← All text, images, links (no hardcoding elsewhere)
│
├── components/
│   ├── base.css            ← Global reset, CSS vars, utility classes, animations
│   ├── Nav.js              ← Navigation + mobile menu
│   ├── Hero.js             ← Hero section + video modal + stats strip
│   ├── ServiceCards.js     ← Wealth Management + Asset Management card grids
│   └── Sections.js         ← All remaining sections (Vault → Footer)
│
└── utils/
    └── helpers.js          ← Pure JS utilities: scroll reveal, counter, SIP calc, etc.
```

---

## How to Add a New Page (e.g. `/about-us`)

1. Create `app-about.js` (copy `app.js` as a starting point).
2. Import only the sections and data you need:

```js
// app-about.js
import { founderData, recognitionData, valuesData } from './config/siteData.js';
import { renderFounder, renderRecognition, renderValues, ... } from './components/Sections.js';

root.innerHTML = [
  renderFounder(founderData),
  renderRecognition(recognitionData),
  renderValues(valuesData),
].join('');
```

3. Create `about.html` pointing to `app-about.js`:
```html
<script type="module" src="app-about.js"></script>
```

---

## How to Change All Site Colors

Open `config/theme.js` and edit the `tokens.color` object. Alternatively, edit the `:root` block in `components/base.css`. **No other file needs touching.**

```js
// config/theme.js
color: {
  warm:  '#8b6342',   // ← change this to shift all gold/warm accents
  char:  '#1c2540',   // ← change this to shift all dark headings
  blush: '#f5ede0',   // ← change this to shift all background tones
  // ...
}
```

---

## How to Change Section Content

Open `config/siteData.js` and find the named export for the section. Every string, image URL, link, and label lives there.

```js
// config/siteData.js
export const heroData = {
  eyebrow:  'Your new tagline here',
  infoLeft: { heading: 'New heading', ... },
  stats:    [{ number: '20+', label: 'Years' }, ...],
};
```

---

## How to Reuse a Single Section Elsewhere

Every `renderXxx()` function is a pure function: give it data, get back HTML.

```js
import { renderFounder, FOUNDER_STYLES, injectStyles } from './components/Sections.js';

// Custom data — doesn't have to come from siteData.js
const myFounderData = {
  quote:  'Custom quote here',
  name:   'Jane Doe',
  title:  'CEO',
  imgSrc: 'jane.jpg',
  imgAlt: 'Jane Doe',
};

document.getElementById('my-mount').innerHTML = renderFounder(myFounderData);
injectStyles('epm-founder-styles', FOUNDER_STYLES);
```

---

## Component Reference

| Component file       | Export(s)                                              | Data source          |
|----------------------|--------------------------------------------------------|----------------------|
| `Nav.js`             | `renderNav(navConfig, meta)`                           | `navData`, `siteMetaData` |
| `Hero.js`            | `renderHero(data)`                                     | `heroData`           |
| `ServiceCards.js`    | `renderWealthCards(cards, section)`                    | `wealthCards`        |
|                      | `renderAssetCards(cards, section)`                     | `assetCards`         |
| `Sections.js`        | `renderVault(data)`                                    | `vaultData`          |
|                      | `renderUhnwBanner(data)`                               | `uhnwData`           |
|                      | `renderFounder(data)`                                  | `founderData`        |
|                      | `renderRecognition(data)`                              | `recognitionData`    |
|                      | `renderPress(data)`                                    | `pressData`          |
|                      | `renderCareers(data)`                                  | `careersData`        |
|                      | `renderCsr(data)`                                      | `csrData`            |
|                      | `renderValues(data)`                                   | `valuesData`         |
|                      | `renderSipAndWhy(sipCfg, whyCfg)`                      | `whyEpmData`         |
|                      | `renderContact(data)`                                  | `contactData`        |
|                      | `renderFooter(data, meta, socials)`                    | `footerData`, `siteMetaData`, `socialLinks` |
|                      | `renderFloatingSocials(socials, waHref)`               | `socialLinks`        |

---

## Utility Reference (`utils/helpers.js`)

| Function              | Purpose                                              |
|-----------------------|------------------------------------------------------|
| `initScrollReveal()`  | Adds `.visible` to `.reveal` / `.reveal-left` on scroll |
| `animateCounter(el)`  | Counts up a `.stat-number` element                  |
| `initCounters(sel)`   | Observes a stats strip and triggers counters        |
| `calcSip(opts)`       | Pure SIP maths → `{ invested, returns, total }`     |
| `initCollageSlider()` | Auto-advancing image slider with cursor + thumbs    |
| `initAwardSwitcher()` | Tab-based award year switcher                       |
| `initNavScroll()`     | Sticky nav on scroll                                |
| `initVideoModal()`    | Opens/closes fullscreen video modal                 |
| `initMobileMenu()`    | Returns `{ open, close }` functions                 |

---

## Production Build

For production, bundle with your preferred tool:

```bash
# Vite
npx vite build

# esbuild
npx esbuild app.js --bundle --minify --outfile=dist/bundle.js
```

The native ES module setup works in all modern browsers without a bundler for development.
