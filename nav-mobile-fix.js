/* ══════════════════════════════════════════
   Add this script to your nav.js or 
   paste inside a <script> tag at bottom of body
══════════════════════════════════════════

   PROBLEM: CSS :hover dropdowns don't work on 
   mobile touch. Need JS click/tap to open them.
══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Mobile dropdown accordion fix ──
  // On touch devices, nav dropdowns need tap support
  function initMobileDropdowns() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(function (item) {
      const link = item.querySelector('.nav-a');
      const dropdown = item.querySelector('.nav-dropdown');

      if (!dropdown || !link) return;

      // On touch/click, toggle dropdown instead of following href
      link.addEventListener('click', function (e) {
        // Only intercept if screen is narrow (mobile/tablet)
        if (window.innerWidth > 900) return;

        e.preventDefault();
        e.stopPropagation();

        const isOpen = dropdown.style.display === 'flex';

        // Close all other dropdowns first
        document.querySelectorAll('.nav-dropdown').forEach(function (d) {
          d.style.display = 'none';
        });

        // Toggle this one
        dropdown.style.display = isOpen ? 'none' : 'flex';
        dropdown.style.flexDirection = 'column';
        dropdown.style.position = 'static';
        dropdown.style.boxShadow = 'none';
        dropdown.style.border = 'none';
        dropdown.style.background = 'rgba(196,182,147,0.1)';
        dropdown.style.padding = '4px 0 4px 12px';
        dropdown.style.borderRadius = '0';
        dropdown.style.marginTop = '4px';
      });
    });

    // Close dropdowns when tapping outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-dropdown').forEach(function (d) {
          d.style.display = '';
        });
      }
    });
  }

  // ── Mobile menu open/close ──
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeBtn   = document.querySelector('.mobile-close');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', function () {
        mobileMenu.classList.add('open');
        hamburger.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && mobileMenu) {
      closeBtn.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on backdrop tap
    if (mobileMenu) {
      mobileMenu.addEventListener('click', function (e) {
        if (e.target === mobileMenu) {
          mobileMenu.classList.remove('open');
          if (hamburger) hamburger.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // ── Mobile menu sub-menu accordion ──
  function initMobileAccordion() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!mobileMenu) return;

    // Find all links that have sub-items (mob-group-label siblings)
    const parentLinks = mobileMenu.querySelectorAll('a[data-has-sub]');

    parentLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const subGroup = document.getElementById(link.dataset.hasSub);
        if (subGroup) {
          subGroup.classList.toggle('open');
        }
      });
    });
  }

  // ── Sticky nav scroll class ──
  function initStickyNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ── Run on DOM ready ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initMobileDropdowns();
      initMobileMenu();
      initMobileAccordion();
      initStickyNav();
    });
  } else {
    initMobileDropdowns();
    initMobileMenu();
    initMobileAccordion();
    initStickyNav();
  }

})();