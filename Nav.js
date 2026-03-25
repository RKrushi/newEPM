/* ══════════════════════════════════════════════════════
   EPM Wealth — nav.js
   Handles: scroll shadow, mobile menu, social dropdown.

   USAGE (plain HTML pages):
     <link rel="stylesheet" href="nav.css">
     <script src="nav.js" defer></script>

     Then in your HTML, paste the nav markup and call:
       EPM.initNav();
══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Namespace ── */
  window.EPM = window.EPM || {};

  /* ════════════════════════════════════════
     SCROLL — add .scrolled shadow to nav
  ════════════════════════════════════════ */
  EPM.initNavScroll = function () {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  };

  /* ════════════════════════════════════════
     MOBILE MENU
  ════════════════════════════════════════ */
  EPM.openMobileMenu = function () {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }
  };

  EPM.closeMobileMenu = function () {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  /* ════════════════════════════════════════
     SOCIAL MEDIA DROPDOWN
  ════════════════════════════════════════ */
  EPM.toggleSocialMenu = function () {
    const wrap = document.getElementById('socialWrap');
    const btn  = document.getElementById('socialBtn');
    if (!wrap) return;

    const isOpen = wrap.classList.toggle('open');
    if (btn) btn.setAttribute('aria-expanded', String(isOpen));
  };

  EPM.closeSocialMenu = function () {
    const wrap = document.getElementById('socialWrap');
    const btn  = document.getElementById('socialBtn');
    if (wrap) wrap.classList.remove('open');
    if (btn)  btn.setAttribute('aria-expanded', 'false');
  };

  /* Close social dropdown when clicking anywhere outside */
  function bindSocialOutsideClick() {
    document.addEventListener('click', function (e) {
      const wrap = document.getElementById('socialWrap');
      if (wrap && !wrap.contains(e.target)) {
        EPM.closeSocialMenu();
      }
    });
  }

  /* Close social dropdown on Escape key */
  function bindSocialEscKey() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') EPM.closeSocialMenu();
    });
  }

  /* ════════════════════════════════════════
     INIT — call once DOM is ready
  ════════════════════════════════════════ */
  EPM.initNav = function () {
    EPM.initNavScroll();
    bindSocialOutsideClick();
    bindSocialEscKey();

    /* Wire hamburger */
  const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', EPM.openMobileMenu);
}

    /* Wire mobile close button */
    const mobileClose = document.querySelector('.mobile-close');
    if (mobileClose) {
      mobileClose.addEventListener('click', EPM.closeMobileMenu);
    }

    /* Wire all mobile menu links to close the menu */
    document.querySelectorAll('#mobileMenu a').forEach(function (a) {
      a.addEventListener('click', EPM.closeMobileMenu);
    });
  };

  /* Auto-init when DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', EPM.initNav);
  } else {
    EPM.initNav();
  }

})();