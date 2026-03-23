/**
 * EPM Wealth — Shared Utilities
 * ──────────────────────────────
 * USAGE: Import the specific utility you need.
 *   import { initScrollReveal, initCounters } from './utils/helpers.js';
 *
 * All functions are pure / side-effect-free until called.
 * They accept optional config so they can be reused in any context.
 */

/* ─────────────────────────────────────────────
   Scroll Reveal
   Observes elements with .reveal / .reveal-left
   and adds .visible when they enter the viewport.
   ─────────────────────────────────────────────
   @param {string} selector   – CSS selector (default: '.reveal, .reveal-left')
   @param {number} threshold  – IntersectionObserver threshold (0–1, default 0.08)
*/
export function initScrollReveal(selector = '.reveal, .reveal-left', threshold = 0.08) {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll(selector).forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold });
  document.querySelectorAll(selector).forEach(el => io.observe(el));
}

/* ─────────────────────────────────────────────
   Animated Counter
   Counts up a numeric text node using easeOutCubic.
   ─────────────────────────────────────────────
   @param {HTMLElement} el       – Element whose textContent is the target value
   @param {number}      duration – Animation duration in ms (default 1200)
*/
export function animateCounter(el, duration = 1200) {
  const raw     = el.textContent.trim();
  const prefix  = raw.match(/^[₹]/)     ? raw[0]                  : '';
  const suffix  = raw.match(/[+LCr %]+$/) ? raw.match(/[+LCr %]+$/)[0] : '';
  const numeric = parseFloat(raw.replace(/[^0-9.]/g, ''));
  if (isNaN(numeric)) return;

  const start = performance.now();
  const step  = now => {
    const progress  = Math.min((now - start) / duration, 1);
    const ease      = 1 - Math.pow(1 - progress, 3);
    const formatted = Number.isInteger(numeric)
      ? Math.round(numeric * ease).toLocaleString('en-IN')
      : (numeric * ease).toFixed(1);
    el.textContent = prefix + formatted + suffix;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = raw;
  };
  requestAnimationFrame(step);
}

/* ─────────────────────────────────────────────
   Init Counters on a container
   Triggers animateCounter for each .stat-number
   inside `containerSelector` when it enters view.
   ─────────────────────────────────────────────
   @param {string} containerSelector  – CSS selector for the stats wrapper
   @param {number} threshold          – IntersectionObserver threshold (default 0.4)
*/
export function initCounters(containerSelector = '#statsStrip', threshold = 0.4) {
  const container = document.querySelector(containerSelector);
  if (!container || !('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.querySelectorAll('.stat-number').forEach(el => animateCounter(el));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold });
  obs.observe(container);
}

/* ─────────────────────────────────────────────
   SIP Calculator
   Returns { invested, returns, total } as ₹-formatted strings.
   ─────────────────────────────────────────────
   @param {Object} opts
     opts.amount    {number}  Monthly / periodic investment amount
     opts.years     {number}  Investment period in years
     opts.frequency {number}  Payments per year (12=monthly, 4=quarterly, 1=yearly)
     opts.rate      {number}  Expected annual return % (pre-inflation adjustment)
     opts.inflation {number}  Inflation rate % to subtract from rate (default 0)
   @returns {{ invested:string, returns:string, total:string }}
*/
export function calcSip({ amount = 0, years = 0, frequency = 12, rate = 0, inflation = 0 }) {
  const adjRate = Math.max(0, rate - inflation);
  const r       = adjRate / 100 / frequency;
  const n       = frequency * years;
  const mat     = r > 0
    ? amount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    : amount * n;
  const inv     = amount * n;
  const fmt     = v => '₹' + Math.round(v).toLocaleString('en-IN');
  return { invested: fmt(inv), returns: fmt(mat - inv), total: fmt(mat) };
}

/* ─────────────────────────────────────────────
   Collage / Image Slider
   Manages slide activation, thumb indicators,
   progress bar, cursor tracking, and auto-play.
   ─────────────────────────────────────────────
   @param {Object} opts
     opts.sliderSelector   {string}  Wrapper element selector
     opts.intervalMs       {number}  Auto-advance interval in ms (default 5000)
     opts.progressDuration {string}  CSS transition for progress bar (default '4.5s linear')
*/
export function initCollageSlider(opts = {}) {
  const {
    sliderSelector   = '#collageSlider',
    intervalMs       = 5000,
    progressDuration = '4.5s linear',
  } = opts;

  const slider   = document.querySelector(sliderSelector);
  if (!slider) return;

  const slides   = slider.querySelectorAll('.collage-slide');
  const thumbs   = slider.querySelectorAll('.collage-thumb');
  const label    = slider.querySelector('#collageLabel');
  const num      = slider.querySelector('#collageNum');
  const progress = slider.querySelector('#collageProgress');
  const cursor   = slider.querySelector('.career-cursor');
  const zones    = slider.querySelectorAll('.collage-zone');
  const parent   = slider.closest('.careers-right');

  let current   = 0;
  let autoTimer;

  function activate(i) {
    if (i === current) return;
    slides[current].classList.remove('active');
    thumbs[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    if (thumbs[current]) thumbs[current].classList.add('active');
    if (label) label.textContent = (slides[current].dataset.label || '').replace(/&amp;/g, '&');
    if (num) num.textContent = `${current + 1} / ${slides.length}`;
    resetProgress();
  }

  function resetProgress() {
    if (!progress) return;
    progress.style.transition = 'none';
    progress.style.width = '0%';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      progress.style.transition = `width ${progressDuration}`;
      progress.style.width = '100%';
    }));
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => activate((current + 1) % slides.length), intervalMs);
  }

  zones.forEach(z => {
    z.addEventListener('mouseenter', () => { activate(parseInt(z.dataset.idx)); clearInterval(autoTimer); });
    z.addEventListener('mouseleave', startAuto);
  });
  thumbs.forEach(t => {
    t.addEventListener('click', () => { activate(parseInt(t.dataset.idx)); startAuto(); });
  });

  if (parent && cursor) {
    parent.addEventListener('mousemove', e => {
      const r = parent.getBoundingClientRect();
      cursor.style.left    = `${e.clientX - r.left}px`;
      cursor.style.top     = `${e.clientY - r.top}px`;
      cursor.style.opacity = '1';
    });
    parent.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; startAuto(); });
    parent.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });
  }

  resetProgress();
  startAuto();
}

/* ─────────────────────────────────────────────
   Award Year Switcher
   Wires click events to .award-year elements.
   ─────────────────────────────────────────────
   @param {string} containerSelector – Wraps all .award-year tabs
*/
export function initAwardSwitcher(containerSelector = '.award-years') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.querySelectorAll('.award-year').forEach(el => {
    el.addEventListener('click', () => {
      container.querySelectorAll('.award-year').forEach(y => y.classList.remove('active'));
      el.classList.add('active');
      const name   = el.dataset.name   || '';
      const source = el.dataset.source || '';
      const icon   = el.dataset.icon   || '';
      const nameEl   = document.getElementById('archAwardName');
      const sourceEl = document.getElementById('archAwardSource');
      const subEl    = document.getElementById('archAwardSub');
      const iconEl   = document.querySelector('.recog-award-icon');
      if (nameEl)   nameEl.textContent   = name;
      if (sourceEl) sourceEl.textContent = source;
      if (subEl)    subEl.textContent    = el.textContent;
      if (iconEl)   iconEl.textContent   = icon;
    });
  });
}

/* ─────────────────────────────────────────────
   Nav Scroll Behaviour
   Fixes nav to top on scroll, floating style at rest.
   ─────────────────────────────────────────────
   @param {string} navSelector   – The <nav> element
   @param {string} outerSelector – The nav wrapper
   @param {number} triggerPx     – Scroll threshold (default 60px)
*/
export function initNavScroll(navSelector = '#mainNav', outerSelector = '#navOuter', triggerPx = 60) {
  const nav   = document.querySelector(navSelector);
  const outer = document.querySelector(outerSelector);
  if (!nav || !outer) return;

  const FIXED_CSS   = 'position:fixed;top:0;left:0;right:0;z-index:600;padding:8px 28px;margin-bottom:0';
  const DEFAULT_CSS = 'position:relative;z-index:600;padding:16px 32px;margin-bottom:-94px';

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > triggerPx;
    nav.classList.toggle('scrolled', scrolled);
    outer.style.cssText = scrolled ? FIXED_CSS : DEFAULT_CSS;
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   Video Modal
   Opens / closes a fullscreen video modal.
   ─────────────────────────────────────────────
   @param {Object} opts
     opts.modalId   {string} – ID of the modal element
     opts.videoId   {string} – ID of the <video> inside the modal
     opts.closeId   {string} – ID of the close button
     opts.backdropId{string} – ID of the click-away backdrop
     opts.playBtnId {string} – ID of the play trigger button
*/
export function initVideoModal(opts = {}) {
  const {
    modalId    = 'videoModal',
    videoId    = 'modalVideo',
    closeId    = 'modalClose',
    backdropId = 'modalBackdrop',
    playBtnId  = 'playBtn',
  } = opts;

  const modal   = document.getElementById(modalId);
  const vid     = document.getElementById(videoId);
  const closeEl = document.getElementById(closeId);
  const backdrop= document.getElementById(backdropId);
  const playBtn = document.getElementById(playBtnId);
  if (!modal) return;

  function open() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (vid) { vid.currentTime = 0; vid.play().catch(() => {}); }
  }
  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (vid) { vid.pause(); vid.currentTime = 0; }
  }

  if (playBtn)  playBtn.addEventListener('click', open);
  if (closeEl)  closeEl.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ─────────────────────────────────────────────
   Mobile Menu
   Exported as functions — attach to hamburger / close buttons.
   ─────────────────────────────────────────────
   @param {string} menuId – ID of the mobile menu element
*/
export function initMobileMenu(menuId = 'mobileMenu') {
  const menu = document.getElementById(menuId);
  if (!menu) return;

  return {
    open:  () => { menu.classList.add('open');    document.body.style.overflow = 'hidden'; },
    close: () => { menu.classList.remove('open'); document.body.style.overflow = ''; },
  };
}
