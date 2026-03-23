/**
 * EPM Wealth — Main Entry Point (app.js)
 * ─────────────────────────────────────────
 * This file is the ONLY file you need to edit to change which sections
 * appear on a page and in what order.
 *
 * HOW TO ADD / REMOVE A SECTION:
 *   1. Comment out or remove its renderXxx() call from the sections array below.
 *   2. Remove its corresponding injectStyles() call if you want to save bytes.
 *
 * HOW TO CREATE A NEW PAGE (e.g. /about):
 *   - Copy this file as app-about.js
 *   - Swap out the data imports for your page-specific overrides from siteData.js
 *   - Use only the sections relevant to that page
 *
 * IMPORT MAP (browsers that support importmap):
 *   All paths below assume the project root is served at /.
 *   Adjust if your build tool uses a different base path.
 */

import {
  siteMetaData, navData, heroData, introData,
  wealthCards, assetCards, vaultData, uhnwData,
  founderData, recognitionData, pressData, careersData,
  csrData, valuesData, whyEpmData, contactData,
  footerData, socialLinks,
} from './config/siteData.js';

import { renderNav, injectNavStyles }       from './components/Nav.js';
import { renderHero, injectHeroStyles }     from './components/Hero.js';
import {
  renderWealthCards, renderAssetCards,
  injectServiceCardStyles,
} from './components/ServiceCards.js';
import {
  renderVault, VAULT_STYLES,
  renderUhnwBanner, UHNW_STYLES,
  renderFounder, FOUNDER_STYLES,
  renderRecognition, RECOGNITION_STYLES,
  renderPress, PRESS_STYLES,
  renderCareers, CAREERS_STYLES,
  renderCsr, CSR_STYLES,
  renderValues, VALUES_STYLES,
  renderSipAndWhy, SIP_WHY_STYLES,
  renderContact, CONTACT_STYLES,
  renderFooter, FOOTER_STYLES,
  renderFloatingSocials, FLOATING_STYLES,
  injectStyles,
} from './components/Sections.js';

import {
  initScrollReveal,
  initCounters,
  initNavScroll,
  initVideoModal,
  initMobileMenu,
  initCollageSlider,
  initAwardSwitcher,
  calcSip,
} from './utils/helpers.js';

/* ══════════════════════════════════════════
   1. INJECT ALL COMPONENT STYLES
   ══════════════════════════════════════════ */
injectNavStyles();
injectHeroStyles();
injectServiceCardStyles();
injectStyles('epm-vault-styles',        VAULT_STYLES);
injectStyles('epm-uhnw-styles',         UHNW_STYLES);
injectStyles('epm-founder-styles',      FOUNDER_STYLES);
injectStyles('epm-recognition-styles',  RECOGNITION_STYLES);
injectStyles('epm-press-styles',        PRESS_STYLES);
injectStyles('epm-careers-styles',      CAREERS_STYLES);
injectStyles('epm-csr-styles',          CSR_STYLES);
injectStyles('epm-values-styles',       VALUES_STYLES);
injectStyles('epm-sip-why-styles',      SIP_WHY_STYLES);
injectStyles('epm-contact-styles',      CONTACT_STYLES);
injectStyles('epm-footer-styles',       FOOTER_STYLES);
injectStyles('epm-float-styles',        FLOATING_STYLES);

/* ══════════════════════════════════════════
   2. RENDER SECTIONS INTO DOM
   ══════════════════════════════════════════ */
const root = document.getElementById('app');  // <div id="app"></div> in index.html

root.innerHTML = [
  /* Global floating elements */
  renderFloatingSocials(socialLinks, 'https://wa.me/919999939333'),

  /* Navigation */
  renderNav(navData, siteMetaData),

  /* Hero (includes video modal) */
  renderHero(heroData),

  /* Intro */
  `<section class="section" id="about" style="background:var(--blush);border-bottom:1px solid var(--border)">
    <div class="intro-grid">
      <div class="reveal-left">
        <span class="label">${introData.label}</span>
        <h2 class="intro-h">${introData.heading}</h2>
        <a href="${introData.cta.href}" class="arrow-link warm" style="margin-top:28px">${introData.cta.label} <i class="fa fa-arrow-right"></i></a>
      </div>
      <div class="reveal">
        ${introData.paragraphs.map(p => `<p class="body-text">${p}</p>`).join('<p class="body-text" style="margin-top:18px">')}
      </div>
    </div>
  </section>`,

  /* Service sections */
  renderWealthCards(wealthCards, { label: 'Services', heading: 'Wealth Management', body: "Our wealth management services are tailored to your unique wealth creation journeys. Explore bespoke solutions for your specific requirements." }),
  renderAssetCards(assetCards,   { label: 'Services', heading: 'Asset Management',  body: 'Strategic solutions curated to facilitate meaningful and efficient access to sophisticated asset classes.' }),

  /* Vault */
  renderVault(vaultData),

  /* UHNW Banner */
  renderUhnwBanner(uhnwData),

  /* Founder quote */
  renderFounder(founderData),

  /* Recognition */
  renderRecognition(recognitionData),

  /* Press */
  renderPress(pressData),

  /* Careers */
  renderCareers(careersData),

  /* CSR */
  renderCsr(csrData),

  /* Core values */
  renderValues(valuesData),

  /* SIP Calculator + Why EPM */
  renderSipAndWhy({ label: 'Plan Your Future', heading: 'SIP Calculator' }, whyEpmData),

  /* Contact */
  renderContact(contactData),

  /* Footer */
  renderFooter(footerData, siteMetaData, socialLinks),
].join('');

/* ══════════════════════════════════════════
   3. WIRE UP BEHAVIOURS
   ══════════════════════════════════════════ */

/* Nav */
initNavScroll();
const mobileMenu = initMobileMenu('mobileMenu');
const hamburger  = document.getElementById('hamburger');
const mobileClose= document.getElementById('mobileClose');
if (hamburger)   hamburger.addEventListener('click', mobileMenu.open);
if (mobileClose) mobileClose.addEventListener('click', mobileMenu.close);
document.querySelectorAll('.mobile-link').forEach(a =>
  a.addEventListener('click', mobileMenu.close));

/* Hero video modal + stats counter */
initVideoModal();
initCounters('#statsStrip');

/* Scroll reveal (all .reveal + .reveal-left elements) */
initScrollReveal();

/* Collage slider (Careers section) */
initCollageSlider({ sliderSelector: '#collageSlider' });

/* Award year switcher (Recognition section) */
initAwardSwitcher('.award-years');

/* SIP Calculator */
const sipBtn = document.getElementById('sipCalcBtn');
if (sipBtn) {
  sipBtn.addEventListener('click', () => {
    const result = calcSip({
      amount:    parseFloat(document.getElementById('sipAmt').value)  || 0,
      years:     parseFloat(document.getElementById('sipYrs').value)  || 0,
      frequency: parseInt(document.getElementById('sipFreq').value)   || 12,
      rate:      parseFloat(document.getElementById('sipRate').value) || 0,
      inflation: parseFloat(document.getElementById('sipInfl').value) || 0,
    });
    document.getElementById('sInv').textContent   = result.invested;
    document.getElementById('sGain').textContent  = result.returns;
    document.getElementById('sTotal').textContent = result.total;
    document.getElementById('sipRes').classList.add('show');
  });
}

/* Contact form */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('formOk').style.display = 'block';
    e.target.reset();
  });
}
