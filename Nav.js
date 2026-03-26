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

  window.EPM = window.EPM || {};

  /* ── Scroll shadow ── */
  EPM.initNavScroll = function () {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  /* ── Mobile menu ── */
  EPM.openMobileMenu = function () {
    const menu = document.getElementById('mobileMenu');
    if (!menu) return;

    /* Reset all accordions to closed */
    menu.querySelectorAll('.mob-group-panel').forEach(function (p) {
      p.classList.remove('open');
    });
    menu.querySelectorAll('.mob-group-toggle').forEach(function (b) {
      b.classList.remove('open');
    });

    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  EPM.closeMobileMenu = function () {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ── Social dropdown ── */
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

  /* ── Awards ── */
  EPM.switchYear = function (el, name, source, icon) {
    document.querySelectorAll('.award-year').forEach(function (y) {
      y.classList.remove('active');
    });
    el.classList.add('active');
    const n = document.getElementById('archAwardName');
    const s = document.getElementById('archAwardSource');
    const i = document.querySelector('.recog-award-icon');
    if (n) n.textContent = name;
    if (s) s.textContent = source;
    if (i) i.textContent = icon;
  };

  /* ── SIP Calculator ── */
  EPM.calcSip = function () {
    const amt  = parseFloat(document.getElementById('sipAmt')?.value)  || 0;
    const yrs  = parseFloat(document.getElementById('sipYrs')?.value)  || 0;
    const freq = parseFloat(document.getElementById('sipFreq')?.value) || 12;
    const rate = parseFloat(document.getElementById('sipRate')?.value) || 0;
    const infl = parseFloat(document.getElementById('sipInfl')?.value) || 0;
    const r    = (rate - infl) / 100 / freq;
    const n    = yrs * freq;
    const fv   = r > 0 ? amt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : amt * n;
    const inv  = amt * n;
    const fmt  = v => '₹' + Math.round(v).toLocaleString('en-IN');
    const res  = document.getElementById('sipRes');
    if (res) {
      document.getElementById('sInv').textContent   = fmt(inv);
      document.getElementById('sGain').textContent  = fmt(fv - inv);
      document.getElementById('sTotal').textContent = fmt(fv);
      res.classList.add('show');
    }
  };

  /* ── Form submit ── */
  EPM.submitForm = function (e) {
    e.preventDefault();
    const ok = document.getElementById('formOk');
    if (ok) ok.style.display = 'block';
  };

  /* ── INIT ── */
  EPM.initNav = function () {
    EPM.initNavScroll();

    /* Social outside click */
    document.addEventListener('click', function (e) {
      const wrap = document.getElementById('socialWrap');
      if (wrap && !wrap.contains(e.target)) EPM.closeSocialMenu();
    });

    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') EPM.closeSocialMenu();
    });

    /* Hamburger */
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', EPM.openMobileMenu);
    }

    /* Mobile close button */
    const mobileClose = document.querySelector('.mobile-close');
    if (mobileClose) {
      mobileClose.addEventListener('click', EPM.closeMobileMenu);
    }

    /* Mobile links close menu */
    document.querySelectorAll('#mobileMenu a').forEach(function (a) {
      a.addEventListener('click', EPM.closeMobileMenu);
    });

    /* ✅ ACCORDION TOGGLES */
    document.querySelectorAll('.mob-group-toggle').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const targetId = btn.getAttribute('data-target');
        const panel    = document.getElementById(targetId);
        if (!panel) return;

        const isOpen = panel.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
      });
    });
  };

  /* Auto-init */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', EPM.initNav);
  } else {
    EPM.initNav();
  }

})();