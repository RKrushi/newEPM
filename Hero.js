/**
 * EPM Wealth — Hero Component
 * ─────────────────────────────
 * USAGE:
 *   import { renderHero, HERO_STYLES, injectHeroStyles } from './components/Hero.js';
 *   document.getElementById('hero-mount').innerHTML = renderHero(heroData);
 *   injectHeroStyles();
 *   // Wire up modal from helpers:
 *   import { initVideoModal, initCounters } from '../utils/helpers.js';
 *   initVideoModal();
 *   initCounters('#statsStrip');
 *
 * CONFIG (@param data) — shape matches config/siteData.js → heroData
 */

export function renderHero(data) {
  const stats = data.stats.map((s, i) => `
    ${i > 0 ? '<div class="stat-sep"></div>' : ''}
    <div class="stat-item">
      <span class="stat-number">${s.number}</span>
      <span class="stat-label">${s.label}</span>
    </div>`).join('');

  const arrowIcon = /* html */`
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5"
         stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>`;

  return /* html */`
<!-- ══ VIDEO MODAL ══ -->
<div class="video-modal" id="videoModal">
  <div class="video-modal-backdrop" id="modalBackdrop"></div>
  <div class="video-modal-inner">
    <button class="video-modal-close" id="modalClose">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      Cancel
    </button>
    <video id="modalVideo" src="${data.videoSrc}" controls playsinline></video>
  </div>
</div>

<!-- ══ HERO SECTION ══ -->
<main class="hero-section" id="home">
  <div class="hero-container">

    <!-- Eyebrow -->
    <div class="hero-eyebrow">
      <span class="eyebrow-line"></span>
      <span class="eyebrow-text">${data.eyebrow}</span>
      <span class="eyebrow-line"></span>
    </div>

    <!-- Video Block -->
    <div class="video-wrapper">
      <div class="video-block">
        <video id="heroBgVideo" class="hero-bg-video"
          src="${data.videoSrc}" poster="${data.videoPoster}"
          autoplay muted loop playsinline></video>

        <div class="video-overlay" id="videoOverlay">
          <div class="overlay-grid"></div>
          <div class="overlay-gradient"></div>
        </div>

        <button class="play-btn" id="playBtn" aria-label="Watch our story">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
            <circle cx="40" cy="40" r="39" stroke="rgba(255,255,255,0.45)" stroke-width="1.5"/>
            <polygon points="32,24 58,40 32,56" fill="white"/>
          </svg>
          <span class="play-label-text">Watch Our Story</span>
        </button>
      </div>
    </div>

    <!-- Info Block -->
    <div class="info-block">
      <div class="info-col info-col--left">
        <span class="info-tag">${data.infoLeft.tag}</span>
        <h2 class="info-heading">${data.infoLeft.heading}</h2>
        <p class="info-body">${data.infoLeft.body}</p>
        <a href="${data.infoLeft.cta.href}" class="info-cta">
          ${data.infoLeft.cta.label} ${arrowIcon}
        </a>
      </div>
      <div class="info-divider" aria-hidden="true"></div>
      <div class="info-col info-col--right">
        <span class="info-tag">${data.infoRight.tag}</span>
        <h2 class="info-heading">${data.infoRight.heading}</h2>
        <p class="info-body">${data.infoRight.body}</p>
        <a href="${data.infoRight.cta.href}" class="info-cta">
          ${data.infoRight.cta.label} ${arrowIcon}
        </a>
      </div>
    </div>

    <!-- Stats Strip -->
    <div class="stats-strip" id="statsStrip">${stats}</div>

  </div>
</main>`;
}

export const HERO_STYLES = /* css */`
.hero-section {
  padding-top: var(--nav-height); padding-bottom: 80px;
  background: var(--color-bg); position: relative; overflow: hidden;
}
.hero-section::before {
  content:''; position:absolute; top:0; right:0;
  width:calc((100vw - 1460px) / 2 + 40px);
  height:calc(var(--nav-height) + 88px + (min(100vw,1460px) * 7/16) + 240px);
  background-image:url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=85');
  background-size:cover; background-position:center top;
  -webkit-mask-image:linear-gradient(to right,transparent 0%,black 45%);
  mask-image:linear-gradient(to right,transparent 0%,black 45%);
  opacity:0.55; z-index:0;
}
.hero-section::after {
  content:''; position:absolute; top:0; left:0;
  width:calc((100vw - 1460px) / 2 + 40px);
  height:calc(var(--nav-height) + 88px + (min(100vw,1460px) * 7/16) + 240px);
  background-image:url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=85');
  background-size:cover; background-position:center top;
  -webkit-mask-image:linear-gradient(to left,transparent 0%,black 45%);
  mask-image:linear-gradient(to left,transparent 0%,black 45%);
  opacity:0.55; z-index:0;
}
.hero-container { position:relative;z-index:1;max-width:var(--hero-max);margin:0 auto;padding:0 var(--hero-pad); }

/* Eyebrow */
.hero-eyebrow {
  display:flex;align-items:center;gap:16px;
  padding:40px var(--inner-pad) 0;margin-bottom:28px;
  opacity:0;transform:translateY(12px);
  animation:fadeUp 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) forwards;
}
.eyebrow-line { flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--color-accent),transparent); }
.eyebrow-text {
  font-family:var(--font-body);font-size:11px;font-weight:500;
  letter-spacing:0.22em;text-transform:uppercase;color:var(--color-accent);white-space:nowrap;
}

/* Video */
.video-wrapper { opacity:0;transform:translateY(20px);animation:fadeUp 0.8s 0.28s cubic-bezier(0.22,1,0.36,1) forwards; }
.video-block { position:relative;width:100%;aspect-ratio:16/7;background:var(--color-dark);border-radius:var(--radius-md) var(--radius-md) 0 0;overflow:hidden; }
.hero-bg-video { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1; }
.video-overlay { position:absolute;inset:0;z-index:2;display:flex;align-items:center;justify-content:center; }
.overlay-grid { position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:60px 60px; }
.overlay-gradient { position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(10,10,10,0.2) 0%,rgba(10,10,10,0.75) 100%),linear-gradient(180deg,rgba(10,10,10,0.15) 0%,rgba(10,10,10,0.6) 100%); }

/* Play button */
.play-btn {
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  z-index:5;display:flex;flex-direction:column;align-items:center;gap:14px;
  background:none;border:none;cursor:pointer;transition:transform var(--transition-mid);
}
.play-btn:hover { transform:translate(-50%,-50%) scale(1.08); }
.play-btn svg { filter:drop-shadow(0 4px 24px rgba(0,0,0,0.5)); }
.play-btn:hover circle { stroke:rgba(184,150,90,0.7); }
.play-btn:hover polygon { fill:var(--color-accent); }
.play-btn circle, .play-btn polygon { transition:stroke .18s,fill .18s; }
.play-label-text { font-family:var(--font-body);font-size:11px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.75); }

/* Info block */
.info-block {
  display:grid;grid-template-columns:1fr auto 1fr;align-items:stretch;
  background:var(--color-dark-mid);border-radius:0 0 var(--radius-md) var(--radius-md);
  width:100%;opacity:0;transform:translateY(10px);
  animation:fadeUp 0.7s 0.45s cubic-bezier(0.22,1,0.36,1) forwards;
}
.info-divider { width:1px;background:var(--color-border);margin:36px 0;flex-shrink:0; }
.info-col { padding:44px var(--inner-pad);display:flex;flex-direction:column;gap:14px; }
.info-col--right { padding-left:calc(var(--inner-pad) + 4px); }
.info-tag { font-family:var(--font-body);font-size:10px;font-weight:500;letter-spacing:0.2em;text-transform:uppercase;color:var(--color-accent); }
.info-heading { font-family:var(--font-display);font-size:clamp(22px,2.6vw,34px);font-weight:400;line-height:1.2;color:var(--color-text-white);letter-spacing:0.01em; }
.info-body { font-family:var(--font-body);font-size:13.5px;font-weight:300;line-height:1.75;color:var(--color-text-faint);max-width:420px; }
.info-cta { display:inline-flex;align-items:center;gap:8px;margin-top:8px;font-size:12px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;color:var(--color-accent);transition:gap var(--transition-fast); }
.info-cta:hover { gap:12px; }
.info-cta svg { flex-shrink:0;transition:transform var(--transition-fast); }
.info-cta:hover svg { transform:translateX(3px); }

/* Stats strip */
.stats-strip {
  display:flex;align-items:center;justify-content:center;gap:0;
  margin-top:48px;padding:36px var(--inner-pad);
  border-top:1px solid rgba(0,0,0,0.07);border-bottom:1px solid rgba(0,0,0,0.07);
  opacity:0;animation:fadeUp 0.7s 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
}
.stat-item { flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:0 24px; }
.stat-sep  { width:1px;height:40px;background:rgba(0,0,0,0.12);flex-shrink:0; }
.stat-number { font-size: 16px; color: #000; }
.stat-label  { font-family:var(--font-body);font-size:11px;font-weight:400;letter-spacing:0.12em;text-transform:uppercase;color:var(--color-text-muted); }

/* Video modal */
.video-modal { position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.96);display:none;align-items:center;justify-content:center; }
.video-modal.open { display:flex !important; }
.video-modal-inner { position:relative;width:90vw;max-width:1200px;aspect-ratio:16/9;background:#000;box-shadow:0 32px 100px rgba(0,0,0,0.9); }
.video-modal-inner video { position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block; }
.video-modal-close {
  position:absolute;top:-52px;right:0;
  display:flex;align-items:center;gap:8px;background:none;
  border:1.5px solid rgba(255,255,255,0.45);color:rgba(255,255,255,0.85);
  padding:9px 20px;font-family:var(--font-ui);font-size:12px;font-weight:500;
  letter-spacing:0.15em;text-transform:uppercase;cursor:pointer;
  transition:border-color .18s,color .18s,background .18s;
}
.video-modal-close:hover { border-color:#fff;color:#fff;background:rgba(255,255,255,0.08); }
.video-modal-backdrop { position:fixed;inset:0;z-index:-1;cursor:pointer; }

/* Responsive */
@media(max-width:1200px){
  .hero-section::before,.hero-section::after{width:60px;opacity:0.3;}
}
@media(max-width:860px){
  .hero-section::before,.hero-section::after{display:none;}
  .hero-section{padding-bottom:60px;}
  .hero-eyebrow{padding-top:28px;}
  .video-block{aspect-ratio:16/9;}
  .info-block{grid-template-columns:1fr;grid-template-rows:auto auto auto;}
  .info-divider{width:80%;height:1px;margin:0 auto;}
  .info-col{padding:32px 24px;}
  .info-col--right{padding-left:24px;}
  .info-body{max-width:100%;}
  .stats-strip{flex-wrap:wrap;gap:28px;padding:32px 16px;}
  .stat-sep{display:none;}
  .stat-item{flex:0 0 calc(50% - 28px);}
  .video-modal-inner{width:96vw;}
  .video-modal-close{top:-44px;padding:7px 14px;font-size:11px;}
}
@media(max-width:480px){
  .info-col{padding:28px 20px;}
}
`;

export function injectHeroStyles() {
  if (document.getElementById('epm-hero-styles')) return;
  const s = document.createElement('style');
  s.id = 'epm-hero-styles';
  s.textContent = HERO_STYLES;
  document.head.appendChild(s);
}
