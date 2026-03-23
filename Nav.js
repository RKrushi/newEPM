/**
 * EPM Wealth — Nav Component
 * ────────────────────────────
 * USAGE:
 *   import { renderNav } from './components/Nav.js';
 *   document.getElementById('nav-mount').innerHTML = renderNav(navData, siteMetaData);
 *   // Then wire up behaviour:
 *   import { initNavScroll, initMobileMenu } from '../utils/helpers.js';
 *   initNavScroll();
 *   const menu = initMobileMenu();
 *   document.getElementById('hamburger').addEventListener('click', menu.open);
 *   document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', menu.close));
 *
 * CONFIG (@param navConfig)  — shape matches config/siteData.js → navData
 * CONFIG (@param meta)       — shape matches config/siteData.js → siteMetaData
 */

export function renderNav(navConfig, meta) {
  const leftLinks = navConfig.links
    .map(l => `<b><a href="${l.href}" class="nav-a">${l.label}</a></b>`)
    .join('');

  const mobileLinks = navConfig.mobileLinks
    .map(l => `<a href="${l.href}" class="mobile-link${l.highlight ? ' mobile-link--accent' : ''}">${l.label}</a>`)
    .join('');

  return /* html */`
<!-- ══ MOBILE MENU ══ -->
<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu__head">
    <span class="mobile-menu__brand">${meta.name}</span>
    <span class="mobile-menu__close" id="mobileClose"><i class="fa fa-times"></i></span>
  </div>
  ${mobileLinks}
</div>

<!-- ══ NAV WRAPPER ══ -->
<div class="nav-outer" id="navOuter">
  <nav id="mainNav">
    <div class="nav-left">${leftLinks}</div>

    <div class="nav-center">
      <a href="#home" class="nav-logo-wrap">
        <img class="nav-logo-img" src="${meta.logoSrc}" alt="${meta.logoAlt}"
          onerror="this.style.display='none';document.getElementById('logoFallback').style.display='flex'"/>
        <span id="logoFallback" style="display:none;align-items:center;gap:8px;">
          <svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="30">
            <path d="M4 8 L12 32 L24 16 L36 32 L44 8" stroke="#1c2540" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="4" y1="8" x2="44" y2="8" stroke="#1c2540" stroke-width="1.2" opacity="0.4"/>
          </svg>
          <span class="nav-logo-text">${meta.name}</span>
        </span>
      </a>
    </div>

    <div class="nav-right">
      <a href="${navConfig.badge.href}" class="nav-uhnw">
        <span class="nav-badge"><b>New</b></span>
        <b>${navConfig.badge.label}</b>
      </a>
      <a href="${navConfig.contact.href}" class="nav-contact"><b>${navConfig.contact.label}</b></a>
      <div class="nav-hamburger" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>
</div>`;
}

/* ── Styles (inject once via Nav.injectStyles()) ── */
export const NAV_STYLES = /* css */`
.nav-outer {
  position: relative; z-index: 600;
  padding: 10px 32px; margin-bottom: -78px;
}
nav {
  background: rgba(240,232,218,0.96);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(180,162,138,.5);
  border-radius: 6px;
  height: 52px; padding: 0 24px;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  box-shadow: 0 2px 24px rgba(0,0,0,.1);
  transition: box-shadow .3s;
}
nav.scrolled { box-shadow: 0 4px 32px rgba(0,0,0,.18); }
.nav-left  { display: flex; align-items: center; gap: 34px; }
.nav-center{ display: flex; align-items: center; justify-content: center; }
.nav-right { display: flex; align-items: center; justify-content: flex-end; gap: 20px; }
.nav-a {
  font-family: var(--font-display);
  font-size: 15.5px; color: var(--char);
  font-weight: 400; transition: color .2s; white-space: nowrap;
}
.nav-a:hover { color: var(--warm); }
.nav-logo-img { height: 32px; width: auto; object-fit: contain; display: block; }
.nav-logo-wrap { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav-logo-text {
  font-family: var(--font-display);
  font-size: 17px; font-weight: 500; letter-spacing: 3px;
  color: var(--char); text-transform: uppercase;
}
.nav-badge {
  background: var(--warm); color: #fff;
  font-size: 8px; letter-spacing: .8px; text-transform: uppercase;
  font-weight: 700; padding: 3px 9px; border-radius: var(--radius-pill); margin-right: 4px;
}
.nav-uhnw {
  display: flex; align-items: center; gap: 5px;
  font-family: var(--font-display); font-size: 15px;
  color: var(--char); transition: color .2s; white-space: nowrap;
}
.nav-uhnw:hover  { color: var(--warm); }
.nav-contact     { font-family: var(--font-display); font-size: 15px; color: var(--char); transition: color .2s; }
.nav-contact:hover { color: var(--warm); }
.nav-hamburger   { display: none; flex-direction: column; gap: 5px; cursor: pointer; }
.nav-hamburger span { width: 22px; height: 1.5px; background: var(--char); }

/* Mobile menu */
.mobile-menu {
  display: none; position: fixed; inset: 0;
  background: var(--white); z-index: 700;
  flex-direction: column; padding: 24px 5%;
}
.mobile-menu.open { display: flex; }
.mobile-menu__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
.mobile-menu__brand { font-family: var(--font-display); font-size: 20px; letter-spacing: 2px; text-transform: uppercase; color: var(--char); }
.mobile-menu__close { font-size: 22px; cursor: pointer; color: var(--muted); }
.mobile-link {
  font-size: 28px; font-family: var(--font-display);
  font-weight: 400; color: var(--char);
  padding: 16px 0; border-bottom: 1px solid var(--border); display: block;
}
.mobile-link--accent { color: var(--warm); }

@media (max-width: 768px) {
  .nav-left, .nav-right .nav-uhnw, .nav-right .nav-contact { display: none; }
  .nav-hamburger { display: flex; }
}
`;

/** Inject <style> tag once — call during component init */
export function injectNavStyles() {
  if (document.getElementById('epm-nav-styles')) return;
  const s = document.createElement('style');
  s.id = 'epm-nav-styles';
  s.textContent = NAV_STYLES;
  document.head.appendChild(s);
}
