/**
 * ══════════════════════════════════════════════════════
 * EPM WEALTH — SHARED JAVASCRIPT
 * Include on every page:  <script src="shared.js"></script>
 *
 * Provides:
 *  • EPM.openMobileMenu()   — open mobile nav drawer
 *  • EPM.closeMobileMenu()  — close mobile nav drawer
 *  • Nav sticky-scroll behaviour
 *  • Scroll-reveal (IntersectionObserver)
 *  • Escape-key modal close hook
 * ══════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  /* ── Public namespace ──────────────────────────────── */
  window.EPM = window.EPM || {};

  /* ══ MOBILE MENU ══ */
  EPM.openMobileMenu = function () {
    var menu = document.getElementById('mobileMenu');
    if (menu) { menu.classList.add('open'); document.body.style.overflow = 'hidden'; }
  };

  EPM.closeMobileMenu = function () {
    var menu = document.getElementById('mobileMenu');
    if (menu) { menu.classList.remove('open'); document.body.style.overflow = ''; }
  };

  /* ══ NAV STICKY SCROLL ══ */
  function initNavScroll() {
    var nav      = document.getElementById('mainNav');
    var navOuter = document.getElementById('navOuter');
    if (!nav || !navOuter) return;

    function onScroll() {
      var scrolled = window.scrollY > 60;
      nav.classList.toggle('scrolled', scrolled);
      if (scrolled) {
        navOuter.style.cssText =
          'position:fixed;top:0;left:0;right:0;z-index:600;padding:8px 28px;margin-bottom:0';
      } else {
        navOuter.style.cssText =
          'position:relative;z-index:600;padding:16px 32px;margin-bottom:-94px';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ══ SCROLL REVEAL ══ */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      /* Fallback: just show everything */
      document.querySelectorAll('.reveal, .reveal-left').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal, .reveal-left').forEach(function (el) {
      io.observe(el);
    });
  }

  /* ══ ESCAPE KEY — close any open modal / menu ══ */
  function initEscapeKey() {
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;

      /* Close mobile menu */
      EPM.closeMobileMenu();

      /* Close video modal if present on this page */
      if (typeof EPM.closeVideoModal === 'function') {
        EPM.closeVideoModal();
      }
    });
  }

  /* ══ STATS COUNTER ANIMATION ══
     Add id="statsStrip" to your stats section to enable counter-up effect. */
  function initStatsCounter() {
    var strip = document.getElementById('statsStrip');
    if (!strip || !('IntersectionObserver' in window)) return;

    var fired = false;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !fired) {
          fired = true;
          animateCounters();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    obs.observe(strip);

    function animateCounters() {
      strip.querySelectorAll('.stat-number').forEach(function (el) {
        var raw     = el.textContent.trim();
        var prefix  = /^[₹]/.test(raw) ? raw[0] : '';
        var suffixM = raw.match(/[+LCr %]+$/);
        var suffix  = suffixM ? suffixM[0] : '';
        var numeric = parseFloat(raw.replace(/[^0-9.]/g, ''));
        if (isNaN(numeric)) return;

        var duration = 1200;
        var start = performance.now();

        function step(now) {
          var progress  = Math.min((now - start) / duration, 1);
          var ease      = 1 - Math.pow(1 - progress, 3);
          var formatted = Number.isInteger(numeric)
            ? Math.round(numeric * ease).toLocaleString('en-IN')
            : (numeric * ease).toFixed(1);

          el.textContent = prefix + formatted + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else              el.textContent = raw; // restore exact original
        }

        requestAnimationFrame(step);
      });
    }
  }

  /* ══ CONTACT FORM ══
     Works on any <form onsubmit="EPM.submitForm(event)"> with id="formOk" confirmation div. */
  EPM.submitForm = function (e) {
    e.preventDefault();
    var ok = document.getElementById('formOk');
    if (ok) ok.style.display = 'block';
    if (e.target) e.target.reset();
  };

  /* ══ SIP CALCULATOR ══
     Requires inputs: #sipAmt #sipYrs #sipFreq #sipRate #sipInfl
     Outputs:         #sInv   #sGain  #sTotal  #sipRes  */
  EPM.calcSip = function () {
    var P = parseFloat(document.getElementById('sipAmt').value)  || 0;
    var n = parseInt(document.getElementById('sipFreq').value)   || 12;
    var Y = parseFloat(document.getElementById('sipYrs').value)  || 0;
    var R = parseFloat(document.getElementById('sipRate').value) || 0;
    R = Math.max(0, R - (parseFloat(document.getElementById('sipInfl').value) || 0));

    var r   = R / 100 / n;
    var tt  = n * Y;
    var mat = r > 0
      ? P * ((Math.pow(1 + r, tt) - 1) / r) * (1 + r)
      : P * tt;
    var inv = P * tt;

    var fmt = function (v) { return '₹' + Math.round(v).toLocaleString('en-IN'); };

    document.getElementById('sInv').textContent   = fmt(inv);
    document.getElementById('sGain').textContent  = fmt(mat - inv);
    document.getElementById('sTotal').textContent = fmt(mat);
    document.getElementById('sipRes').classList.add('show');
  };

  /* ══ AWARD YEAR SWITCHER ══
     Used on index/recognition section. */
  EPM.switchYear = function (el, name, source, icon) {
    document.querySelectorAll('.award-year').forEach(function (y) {
      y.classList.remove('active');
    });
    el.classList.add('active');

    var nameEl   = document.getElementById('archAwardName');
    var sourceEl = document.getElementById('archAwardSource');
    var subEl    = document.getElementById('archAwardSub');
    var iconEl   = document.querySelector('.recog-award-icon');

    if (nameEl)   nameEl.textContent   = name;
    if (sourceEl) sourceEl.textContent = source;
    if (subEl)    subEl.textContent    = el.textContent;
    if (iconEl)   iconEl.textContent   = icon;
  };

  /* ══ CAREERS COLLAGE SLIDER ══
     Self-contained; looks for #collageSlider and related elements. */
  function initCollageSlider() {
    var slides   = document.querySelectorAll('.collage-slide');
    var thumbs   = document.querySelectorAll('.collage-thumb');
    var label    = document.getElementById('collageLabel');
    var num      = document.getElementById('collageNum');
    var progress = document.getElementById('collageProgress');
    var cursor   = document.getElementById('careerCursor');
    var right    = document.getElementById('careerRight');
    var zones    = document.querySelectorAll('.collage-zone');
    if (!slides.length) return;

    var current = 0, autoTimer;

    function activate(i) {
      if (i === current) return;
      slides[current].classList.remove('active');
      thumbs[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      thumbs[current].classList.add('active');
      var lbl = slides[current].dataset.label || '';
      if (label) label.textContent = lbl.replace('&amp;', '&');
      if (num)   num.textContent   = (current + 1) + ' / ' + slides.length;
      resetProgress();
    }

    function resetProgress() {
      if (!progress) return;
      progress.style.transition = 'none';
      progress.style.width = '0%';
      setTimeout(function () {
        progress.style.transition = 'width 4.5s linear';
        progress.style.width = '100%';
      }, 30);
    }

    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () {
        activate((current + 1) % slides.length);
      }, 5000);
    }

    zones.forEach(function (z) {
      z.addEventListener('mouseenter', function () {
        activate(parseInt(z.dataset.idx));
        clearInterval(autoTimer);
      });
      z.addEventListener('mouseleave', startAuto);
    });

    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        activate(parseInt(t.dataset.idx));
        startAuto();
      });
    });

    if (right && cursor) {
      right.addEventListener('mousemove', function (e) {
        var r = right.getBoundingClientRect();
        cursor.style.left    = (e.clientX - r.left) + 'px';
        cursor.style.top     = (e.clientY - r.top)  + 'px';
        cursor.style.opacity = '1';
      });
      right.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
        startAuto();
      });
      right.addEventListener('mouseenter', function () {
        cursor.style.opacity = '1';
      });
    }

    resetProgress();
    startAuto();
  }

  /* ══ VIDEO MODAL (homepage) ══
     Requires: #videoModal  #modalVideo  #modalClose  #modalBackdrop  #playBtn */
  function initVideoModal() {
    var modal   = document.getElementById('videoModal');
    var vid     = document.getElementById('modalVideo');
    var closeBtn = document.getElementById('modalClose');
    var backdrop = document.getElementById('modalBackdrop');
    var playBtn  = document.getElementById('playBtn');
    if (!modal) return;

    EPM.openVideoModal = function () {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (vid) { vid.currentTime = 0; vid.play().catch(function () {}); }
    };

    EPM.closeVideoModal = function () {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (vid) { vid.pause(); vid.currentTime = 0; }
    };

    if (closeBtn) closeBtn.addEventListener('click', EPM.closeVideoModal);
    if (backdrop) backdrop.addEventListener('click', EPM.closeVideoModal);
    if (playBtn)  playBtn.addEventListener('click',  EPM.openVideoModal);
  }

  /* ══ INIT — run after DOM is ready ══ */
  function init() {
    initNavScroll();
    initScrollReveal();
    initEscapeKey();
    initStatsCounter();
    initCollageSlider();
    initVideoModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

(function () {
  /* Keyboard: Enter/ArrowDown opens dropdown; Escape closes */
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var trigger  = item.querySelector('.nav-a');
    var dropdown = item.querySelector('.nav-dropdown');
    if (!trigger || !dropdown) return;
 
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        var first = dropdown.querySelector('a');
        if (first) first.focus();
      }
    });
 
    var links = Array.from(dropdown.querySelectorAll('a'));
    links.forEach(function (link, i) {
      link.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') { e.preventDefault(); links[(i + 1) % links.length].focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
        if (e.key === 'Escape')    { trigger.focus(); }
      });
    });
  });
}());
