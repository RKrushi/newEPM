/**
 * EPM Wealth — Section Components (Vault → Footer)
 * ──────────────────────────────────────────────────
 * Each export is a self-contained renderXxx(data) function.
 * Styles are exported as style-string constants and injected once.
 *
 * USAGE PATTERN (same for every section):
 *   import { renderVault, VAULT_STYLES } from './components/Sections.js';
 *   mount.innerHTML = renderVault(vaultData);
 *   injectStyles('epm-vault-styles', VAULT_STYLES);
 */

/** Generic style injector — call with a unique id + css string */
export function injectStyles(id, css) {
  if (document.getElementById(id)) return;
  const s = document.createElement('style');
  s.id = id;
  s.textContent = css;
  document.head.appendChild(s);
}

/* ═══════════════════════════════════════════════════
   VAULT (Insights)
   @param data — vaultData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderVault(data) {
  const articles = data.articles.map(a => /* html */`
    <div class="vault-small-card">
      <div class="vault-card-thumb"><img src="${a.imgSrc}" alt="${a.title}"/></div>
      <div class="vault-card-body">
        <div class="vault-card-cat">${a.category}</div>
        <div class="vault-card-title">${a.title}</div>
        <div class="vault-card-date">${a.date}</div>
      </div>
    </div>`).join('');

  return /* html */`
<section class="vault-wrap section" id="vault">
  <div class="vault-grid">
    <div class="reveal-left">
      <span class="label">${data.label}</span>
      <h2 class="h2" style="font-size:clamp(28px,3.5vw,46px)">${data.heading}</h2>
      <p class="body-text" style="margin-top:20px">${data.body}</p>
      <a href="${data.cta.href}" class="arrow-link warm" style="margin-top:20px">${data.cta.label} <i class="fa fa-arrow-right"></i></a>
      <div class="vault-subscribe">
        <div class="vault-subscribe__heading">${data.subscribe.heading}</div>
        <p class="vault-subscribe__body">${data.subscribe.body}</p>
        <div class="vault-inp-row">
          <input class="vault-inp" type="email" placeholder="${data.subscribe.placeholder}"/>
          <button class="vault-sub-btn">${data.subscribe.btnLabel}</button>
        </div>
      </div>
    </div>
    <div class="reveal">
      <div class="vault-featured">
        <img src="${data.featured.imgSrc}" alt="${data.featured.title}"/>
        <div class="vault-featured-overlay"></div>
        <div class="vault-featured-body">
          <span class="vault-featured-meta">${data.featured.category}</span>
          <div class="vault-featured-title">${data.featured.title}</div>
          <div class="vault-featured-excerpt">${data.featured.excerpt}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="vault-small-grid reveal" style="margin-top:28px">${articles}</div>
</section>`;
}

export const VAULT_STYLES = /* css */`
.vault-wrap { background:var(--blush); }
.vault-grid { display:grid;grid-template-columns:1fr 1.7fr;gap:60px;align-items:start; }
.vault-subscribe { margin-top:32px;padding:28px;background:var(--white);border:1px solid var(--border); }
.vault-subscribe__heading { font-family:var(--font-display);font-size:20px;font-weight:500;color:var(--char);margin-bottom:6px; }
.vault-subscribe__body { font-size:12px;color:var(--muted2);margin-bottom:16px;line-height:1.7; }
.vault-inp-row { display:flex; }
.vault-inp { flex:1;padding:11px 14px;background:var(--cream);border:1px solid var(--border2);border-right:none;font-family:var(--font-ui);font-size:13px;outline:none;transition:border-color .2s;color:var(--char); }
.vault-inp:focus { border-color:var(--warm); }
.vault-sub-btn { padding:11px 20px;background:var(--char);color:var(--white);border:none;cursor:pointer;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;font-weight:600;font-family:var(--font-ui);transition:background .2s; }
.vault-sub-btn:hover { background:var(--navy); }
.vault-featured { position:relative;overflow:hidden;cursor:pointer;min-height:340px;display:flex;flex-direction:column;justify-content:flex-end;border-radius:2px; }
.vault-featured img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s; }
.vault-featured:hover img { transform:scale(1.04); }
.vault-featured-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.3) 55%,transparent 100%); }
.vault-featured-body { position:relative;z-index:2;padding:24px; }
.vault-featured-meta { font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:6px;display:block; }
.vault-featured-title { font-family:var(--font-display);font-size:24px;font-weight:400;color:var(--white);line-height:1.2;margin-bottom:8px; }
.vault-featured-excerpt { font-size:12px;color:rgba(255,255,255,.55);line-height:1.7; }
.vault-small-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:14px; }
.vault-small-card { background:var(--white);border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:box-shadow .2s; }
.vault-small-card:hover { box-shadow:0 6px 28px rgba(0,0,0,.08); }
.vault-card-thumb { width:100%;height:140px;overflow:hidden; }
.vault-card-thumb img { width:100%;height:100%;object-fit:cover;transition:transform .5s; }
.vault-small-card:hover .vault-card-thumb img { transform:scale(1.05); }
.vault-card-body { padding:16px; }
.vault-card-cat   { font-size:8px;letter-spacing:2px;text-transform:uppercase;color:var(--warm);font-weight:600;margin-bottom:6px; }
.vault-card-title { font-family:var(--font-display);font-size:14px;font-weight:500;line-height:1.35;color:var(--char); }
.vault-card-date  { font-size:10px;color:var(--muted2);margin-top:7px; }
@media(max-width:900px){ .vault-grid{grid-template-columns:1fr;} .vault-small-grid{grid-template-columns:repeat(2,1fr);} }
@media(max-width:480px){ .vault-small-grid{grid-template-columns:1fr;} }
`;

/* ═══════════════════════════════════════════════════
   UHNW BANNER
   @param data — uhnwData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderUhnwBanner(data) {
  return /* html */`
<div class="uhnw-banner">
  <div class="uhnw-left reveal-left">
    <div class="uhnw-thumb"><img src="${data.imgLeft}" alt="UHNW Event Calendar ${data.year}"/></div>
    <div class="uhnw-text-block">
      <span class="label">${data.label}</span>
      <h3>${data.heading}</h3>
      <p>${data.body}</p>
      <a href="${data.cta.href}" class="arrow-link warm">${data.cta.label} <i class="fa fa-arrow-right"></i></a>
    </div>
  </div>
  <div class="uhnw-right reveal">
    <img src="${data.imgRight}" alt="EPM Brand"/>
    <div class="uhnw-right-overlay"></div>
    <div class="uhnw-play"><i class="fa fa-play"></i></div>
  </div>
</div>`;
}

export const UHNW_STYLES = /* css */`
.uhnw-banner { display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--border); }
.uhnw-left { padding:60px 7%;display:flex;align-items:center;gap:36px;background:var(--cream2); }
.uhnw-thumb { width:260px;height:260px;flex-shrink:0;overflow:hidden;border-radius:2px; }
.uhnw-thumb img { width:100%;height:100%;object-fit:cover; }
.uhnw-text-block .label { font-size:11px;letter-spacing:2px;color:var(--muted2);margin-bottom:10px; }
.uhnw-text-block h3 { font-family:var(--font-display);font-size:clamp(28px,3vw,42px);font-weight:400;line-height:1.15;color:var(--char);margin-bottom:14px; }
.uhnw-text-block p  { font-size:13px;color:var(--muted2);line-height:1.75;margin-bottom:20px; }
.uhnw-right { position:relative;overflow:hidden;min-height:380px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:#111; }
.uhnw-right img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover; }
.uhnw-right-overlay { position:absolute;inset:0;background:rgba(10,8,6,.38); }
.uhnw-play { position:relative;z-index:2;width:72px;height:72px;border-radius:50%;border:2px solid rgba(255,255,255,.5);display:flex;align-items:center;justify-content:center;transition:border-color .2s,background .2s; }
.uhnw-right:hover .uhnw-play { border-color:var(--gold2);background:rgba(196,154,90,.15); }
.uhnw-play i { color:rgba(255,255,255,.9);font-size:20px;margin-left:5px; }
@media(max-width:768px){ .uhnw-banner{grid-template-columns:1fr;} }
`;

/* ═══════════════════════════════════════════════════
   FOUNDER QUOTE
   @param data — founderData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderFounder(data) {
  return /* html */`
<div class="founder-wrap" id="about-founder">
  <div class="founder-left reveal-left">
    <div class="founder-quote">"${data.quote}"</div>
    <span class="founder-sig">${data.name}</span>
    <span class="founder-title-label">${data.title}</span>
  </div>
  <div class="founder-right reveal">
    <img src="${data.imgSrc}" alt="${data.imgAlt}"/>
  </div>
</div>`;
}

export const FOUNDER_STYLES = /* css */`
.founder-wrap { background:#ffffff;display:grid;grid-template-columns:52% 48%;align-items:start;padding:80px 2% 80px 6%;gap:0;min-height:580px; }
.founder-left { padding:40px 80px 40px 0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;text-align:center; }
.founder-quote { font-family:var(--font-display);font-size:clamp(24px,2.6vw,36px);font-style:italic;font-weight:500;line-height:1.65;color:var(--char);text-align:center;max-width:520px;width:100%; }
.founder-sig   { margin:28px auto 0;font-family:var(--font-display);font-size:36px;font-style:italic;font-weight:300;color:var(--warm);text-align:center;display:block;width:100%;white-space:nowrap;letter-spacing:2px;transform:rotate(-3deg) translateX(-4px);transform-origin:center;line-height:1.3; }
.founder-title-label { font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--muted2);margin-top:16px;font-weight:600;text-align:center;display:block; }
.founder-right { width:340px;height:500px;overflow:hidden;border-radius:2px;margin:0 0 0 20px;position:relative;display:block; }
.founder-right img { width:100%;height:100%;object-fit:cover;object-position:top center;position:absolute;inset:0; }
@media(max-width:768px){ .founder-wrap{grid-template-columns:1fr;gap:48px;padding:60px 5%;} .founder-left{padding:0;} .founder-right{width:100%;height:360px;margin:0;} }
`;

/* ═══════════════════════════════════════════════════
   RECOGNITION / AWARDS
   @param data — recognitionData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderRecognition(data) {
  const active  = data.awards.find(a => a.active) || data.awards[0];
  const tabs    = data.awards.map(a => /* html */`
    <div class="award-year${a.active ? ' active' : ''}"
         data-name="${a.name}" data-source="${a.source}" data-icon="${a.icon}">
      ${a.year}
    </div>`).join('');

  const stats   = data.stats.map(s => /* html */`
    <div style="text-align:center">
      <div style="font-family:var(--font-display);font-size:68px;font-weight:300;color:var(--char);line-height:1">
        ${s.number.replace('+', '')}<sup style="font-size:.45em;vertical-align:super">+</sup>
      </div>
      <div style="font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted);margin-top:8px">${s.label}</div>
    </div>`).join('');

  return /* html */`
<div class="recog-wrap" id="recognition">
  <span class="label">${data.label}</span>
  <div class="recog-heading reveal">${data.heading}</div>
  <div class="recog-results reveal">${data.highlight}</div>
  <p class="recog-desc reveal">${data.body}</p>
  <div class="recog-arch reveal" style="padding:48px 7% 0;text-align:center">
    <div id="archAwardName" class="recog-award-name">${active.name}</div>
    <div id="archAwardSub" style="color:var(--warm);font-size:11px;letter-spacing:1.5px;text-transform:uppercase;margin-top:4px">${active.year}</div>
    <div class="recog-award-icon" style="font-size:40px;margin:16px 0">${active.icon}</div>
    <div id="archAwardSource" class="recog-award-source">${active.source}</div>
  </div>
  <div class="award-years reveal" style="margin-top:40px">${tabs}</div>
  <div style="display:flex;justify-content:center;gap:80px;margin-top:56px;padding:48px 7%;border-top:1px solid var(--border)" class="reveal">
    ${stats}
  </div>
</div>`;
}

export const RECOGNITION_STYLES = /* css */`
.recog-wrap { background:var(--blush);padding:88px 0 0;text-align:center;overflow:hidden; }
.recog-wrap>.label { display:block;text-align:center;margin-bottom:16px; }
.recog-heading { font-family:var(--font-display);font-size:clamp(32px,4.5vw,56px);font-weight:400;color:var(--char);line-height:1.1; }
.recog-results { font-family:var(--font-display);font-size:clamp(48px,6vw,80px);font-style:italic;font-weight:300;color:var(--warm);line-height:1;margin:8px 0 0;letter-spacing:1px; }
.recog-desc    { font-size:14px;color:var(--muted);max-width:560px;margin:24px auto 0;line-height:1.85;text-align:center; }
.recog-award-name   { font-family:var(--font-display);font-size:clamp(18px,2.2vw,28px);font-weight:600;color:var(--char);line-height:1.3;margin-bottom:20px; }
.recog-award-source { font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted2);font-weight:600; }
.award-years { display:flex;justify-content:center;border-bottom:1px solid var(--border);overflow-x:auto;padding:0 5%;background:var(--blush); }
.award-year { flex:1;text-align:center;padding:16px 8px;letter-spacing:1.5px;color:var(--muted2);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:color .2s,border-color .2s;white-space:nowrap;font-family:var(--font-display);font-size:16px; }
.award-year.active { color:var(--char);border-bottom-color:var(--warm); }
.award-year:hover  { color:var(--char); }
`;

/* ═══════════════════════════════════════════════════
   PRESS
   @param data — pressData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderPress(data) {
  const cards = data.articles.map(a => /* html */`
    <div class="press-card">
      <div class="press-thumb"><img src="${a.imgSrc}" alt="${a.title}"/></div>
      <div class="press-card-body">
        <div class="press-source">${a.source}</div>
        <div class="press-title">${a.title}</div>
        <div class="press-date">${a.date}</div>
      </div>
    </div>`).join('');

  return /* html */`
<div class="press-wrap" id="press">
  <span class="label">${data.label}</span>
  <h2 class="h2" style="margin-bottom:8px">${data.heading}</h2>
  <div class="press-actions">
    <a href="#" class="arrow-link warm">Explore Pressclub <i class="fa fa-arrow-right"></i></a>
    <a href="#" class="arrow-link">Download Media Kit <i class="fa fa-arrow-right"></i></a>
  </div>
  <div class="press-grid reveal">${cards}</div>
  <div class="press-divider-dots">
    <div class="press-dot"></div><div class="press-dot active"></div><div class="press-dot"></div>
  </div>
</div>`;
}

export const PRESS_STYLES = /* css */`
.press-wrap { background:var(--blush);padding:80px 7%; }
.press-actions { display:flex;gap:28px;margin:10px 0 40px; }
.press-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--border2); }
.press-card { background:var(--white);overflow:hidden;cursor:pointer;transition:box-shadow .2s; }
.press-card:hover { box-shadow:0 8px 40px rgba(0,0,0,.07); }
.press-thumb { width:100%;height:200px;overflow:hidden; }
.press-thumb img { width:100%;height:100%;object-fit:cover;transition:transform .5s; }
.press-card:hover .press-thumb img { transform:scale(1.04); }
.press-card-body { padding:24px; }
.press-source { font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--warm);font-weight:600;margin-bottom:8px; }
.press-title  { font-family:var(--font-display);font-size:18px;font-weight:500;line-height:1.35;color:var(--char); }
.press-date   { font-size:11px;color:var(--muted2);margin-top:10px; }
.press-divider-dots { display:flex;justify-content:center;gap:8px;margin:28px 0 0; }
.press-dot        { width:32px;height:2px;background:var(--border2); }
.press-dot.active { background:var(--warm); }
@media(max-width:900px){ .press-grid{grid-template-columns:1fr;} }
`;

/* ═══════════════════════════════════════════════════
   CAREERS
   @param data — careersData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderCareers(data) {
  const perks  = data.perks.map(p => `<li>${p}</li>`).join('');
  const slides = data.slides.map((s, i) => /* html */`
    <div class="collage-slide${i === 0 ? ' active' : ''}" data-label="${s.label}">
      <img src="${s.imgSrc}" alt="${s.label}"/>
      <div class="collage-slide-overlay"></div>
    </div>`).join('');
  const zones  = data.slides.map((_, i) => `<div class="collage-zone" data-idx="${i}"></div>`).join('');
  const thumbs = data.slides.map((_, i) => `<div class="collage-thumb${i === 0 ? ' active' : ''}" data-idx="${i}"></div>`).join('');

  return /* html */`
<div class="careers-wrap" id="careers">
  <div class="careers-left reveal-left">
    <span class="label">${data.label}</span>
    <h2 class="h2" style="margin-bottom:8px">${data.heading}</h2>
    <p class="body-text" style="margin-top:16px;margin-bottom:24px">${data.body}</p>
    <ul class="careers-list">${perks}</ul>
    <a href="${data.cta.href}" class="arrow-link warm" style="margin-top:28px">${data.cta.label} <i class="fa fa-arrow-right"></i></a>
  </div>
  <div class="careers-right" id="careerRight">
    <div class="collage-slider" id="collageSlider">
      ${slides}
      <div class="collage-zones" id="collageZones">${zones}</div>
      <div class="collage-info">
        <div class="collage-label" id="collageLabel">${data.slides[0].label}</div>
        <div class="collage-num" id="collageNum">1 / ${data.slides.length}</div>
      </div>
      <div class="collage-thumbs" id="collageThumbs">${thumbs}</div>
      <div class="collage-progress" id="collageProgress"></div>
      <div class="career-cursor" id="careerCursor"></div>
    </div>
  </div>
</div>`;
}

export const CAREERS_STYLES = /* css */`
.careers-wrap { display:grid;grid-template-columns:1fr 1fr;min-height:640px; }
.careers-left { padding:80px 7%;background:var(--blush); }
.careers-list { list-style:none;margin-top:20px; }
.careers-list li { padding:13px 0;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:12px;font-size:13.5px;color:var(--muted);transition:color .2s; }
.careers-list li:hover { color:var(--char); }
.careers-list li::before { content:'→';color:var(--warm);flex-shrink:0;margin-top:1px; }
.careers-right { position:relative;overflow:hidden;background:#0a0a0a;cursor:none; }
.collage-slider { width:100%;height:100%;position:relative;min-height:640px; }
.collage-slide  { position:absolute;inset:0;opacity:0;transition:opacity .55s cubic-bezier(.4,0,.2,1); }
.collage-slide.active { opacity:1; }
.collage-slide img { width:100%;height:100%;object-fit:cover;display:block; }
.collage-slide-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7) 0%,rgba(0,0,0,.15) 50%,transparent 100%); }
.collage-info { position:absolute;bottom:0;left:0;right:0;z-index:4;padding:28px 32px;display:flex;align-items:flex-end;justify-content:space-between; }
.collage-label { font-family:var(--font-display);font-size:26px;font-weight:400;color:var(--white);line-height:1.1; }
.collage-num   { font-family:var(--font-display);font-size:13px;color:rgba(255,255,255,.4);letter-spacing:1px; }
.collage-progress { position:absolute;bottom:0;left:0;height:2px;background:var(--gold);z-index:5;transition:width .1s linear;width:0%; }
.collage-zones { position:absolute;inset:0;z-index:3;display:flex; }
.collage-zone  { flex:1;height:100%; }
.collage-thumbs { position:absolute;top:20px;left:50%;transform:translateX(-50%);z-index:4;display:flex;gap:6px; }
.collage-thumb  { width:34px;height:3px;background:rgba(255,255,255,.22);cursor:pointer;transition:background .2s; }
.collage-thumb.active { background:var(--gold); }
.career-cursor { position:absolute;width:8px;height:8px;border-radius:50%;background:var(--gold);pointer-events:none;z-index:10;transform:translate(-50%,-50%);transition:transform .15s;box-shadow:0 0 0 2px rgba(196,154,90,.3); }
@media(max-width:900px){ .careers-wrap{grid-template-columns:1fr;} }
`;

/* ═══════════════════════════════════════════════════
   CSR / ESG BANNER
   @param data — csrData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderCsr(data) {
  return /* html */`
<div class="csr-wrap">
  <img class="csr-bg" src="${data.bgImg}" alt="Forest aerial — ESG"/>
  <div class="csr-overlay"></div>
  <div class="csr-content reveal">
    <span class="label gold">${data.label}</span>
    <h2 class="h2 light" style="margin-bottom:22px">${data.heading}</h2>
    <p class="body-text light">${data.body}</p>
    <a href="${data.cta.href}" class="arrow-link gold" style="margin-top:32px">${data.cta.label} <i class="fa fa-arrow-right"></i></a>
  </div>
</div>`;
}

export const CSR_STYLES = /* css */`
.csr-wrap { position:relative;overflow:hidden;min-height:560px;display:flex;align-items:center; }
.csr-bg   { position:absolute;inset:0;width:100%;height:100%;object-fit:cover; }
.csr-overlay { position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.88) 0%,rgba(0,0,0,.6) 55%,rgba(0,0,0,.22) 100%); }
.csr-content  { position:relative;z-index:2;padding:88px 7%;max-width:560px; }
`;

/* ═══════════════════════════════════════════════════
   CORE VALUES (RISK)
   @param data — valuesData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderValues(data) {
  const cards = data.cards.map(c => /* html */`
    <div class="risk-card">
      <div class="risk-card-img">
        <img src="${c.imgSrc}" alt="${c.word}"/>
        <div class="risk-card-letter-overlay"><span class="risk-card-letter">${c.letter}</span></div>
      </div>
      <div class="risk-card-body">
        <div class="risk-card-word">${c.word}</div>
        <div class="risk-card-desc">${c.desc}</div>
      </div>
    </div>`).join('');

  return /* html */`
<div class="risk-wrap" id="values">
  <div class="risk-header">
    <div class="reveal-left"><span class="label">${data.label}</span><h2 class="h2">${data.heading}</h2></div>
    <div class="reveal"><p class="body-text">${data.body}</p></div>
  </div>
  <div class="risk-grid reveal">${cards}</div>
</div>`;
}

export const VALUES_STYLES = /* css */`
.risk-wrap   { background:var(--offwh);padding:88px 7%; }
.risk-header { display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:52px; }
.risk-grid   { display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--border2);background:var(--border2); }
.risk-card   { background:var(--white);display:flex;flex-direction:column;position:relative;overflow:hidden;transition:box-shadow .25s;cursor:pointer; }
.risk-card:hover { box-shadow:0 8px 40px rgba(0,0,0,.1);z-index:2; }
.risk-card-img  { width:100%;height:220px;overflow:hidden;position:relative;flex-shrink:0; }
.risk-card-img img { width:100%;height:100%;object-fit:cover;transition:transform .6s; }
.risk-card:hover .risk-card-img img { transform:scale(1.06); }
.risk-card-letter-overlay { position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35);transition:background .3s; }
.risk-card:hover .risk-card-letter-overlay { background:rgba(0,0,0,.22); }
.risk-card-letter { font-family:var(--font-display);font-size:120px;font-weight:300;color:rgba(255,255,255,.85);line-height:1;text-shadow:0 4px 24px rgba(0,0,0,.4);-webkit-text-stroke:1px rgba(255,255,255,.6); }
.risk-card-body   { padding:24px 22px;flex:1;display:flex;flex-direction:column;justify-content:space-between;border-top:3px solid var(--gold); }
.risk-card-word   { font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--warm);font-weight:600;margin-bottom:10px; }
.risk-card-desc   { font-size:12.5px;color:var(--muted);line-height:1.8;flex:1; }
@media(max-width:1100px){ .risk-grid{grid-template-columns:repeat(2,1fr);} }
@media(max-width:768px) { .risk-header{grid-template-columns:1fr;} }
@media(max-width:480px) { .risk-grid{grid-template-columns:1fr;} }
`;

/* ═══════════════════════════════════════════════════
   SIP CALCULATOR + WHY EPM
   @param sipData  — { label, heading }
   @param whyData  — whyEpmData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderSipAndWhy(sipData = {}, whyData = {}) {
  const points = (whyData.points || []).map(p => /* html */`
    <div class="why-point">
      <div class="why-point__icon">✓</div>
      <div>
        <div class="why-point__title">${p.title}</div>
        <div class="why-point__desc">${p.desc}</div>
      </div>
    </div>`).join('');

  return /* html */`
<div class="sip-values-wrap">
  <div class="sip-left">
    <span class="label">${sipData.label || 'Plan Your Future'}</span>
    <h3 class="sip-heading">${sipData.heading || 'SIP Calculator'}</h3>
    <div class="form-group"><label class="sip-label-t">Investment Amount (₹) *</label><input class="sip-inp" type="number" id="sipAmt" placeholder="e.g. 10,000"/></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
      <div><label class="sip-label-t">Period (Years)</label><input class="sip-inp" type="number" id="sipYrs" placeholder="e.g. 10"/></div>
      <div><label class="sip-label-t">Frequency</label><select class="sip-inp" id="sipFreq"><option value="12">Monthly</option><option value="4">Quarterly</option><option value="1">Yearly</option></select></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      <div><label class="sip-label-t">Expected Returns (%)</label><input class="sip-inp" type="number" id="sipRate" placeholder="e.g. 12"/></div>
      <div><label class="sip-label-t">Inflation Adj.</label><select class="sip-inp" id="sipInfl"><option value="0">None</option><option value="6">6%</option><option value="7">7%</option><option value="8">8%</option></select></div>
    </div>
    <button class="sip-btn" id="sipCalcBtn">Calculate Returns</button>
    <div class="sip-results" id="sipRes">
      <div><div class="sip-rn" id="sInv">₹0</div><div class="sip-rl">Invested</div></div>
      <div><div class="sip-rn" id="sGain">₹0</div><div class="sip-rl">Returns</div></div>
      <div><div class="sip-rn" id="sTotal">₹0</div><div class="sip-rl">Total Value</div></div>
    </div>
  </div>
  <div class="values-right">
    <span class="label">${whyData.label || 'Our Approach'}</span>
    <h3 class="sip-heading">${whyData.heading || 'Why Choose EPM'}</h3>
    <div class="why-list">${points}</div>
  </div>
</div>`;
}

export const SIP_WHY_STYLES = /* css */`
.sip-values-wrap { display:grid;grid-template-columns:1fr 1fr;background:var(--cream); }
.sip-left        { padding:80px 7%;border-right:1px solid var(--border2); }
.values-right    { padding:80px 5%; }
.sip-heading     { font-family:var(--font-display);font-size:clamp(24px,3vw,38px);font-weight:400;line-height:1.2;margin-bottom:28px; }
.sip-label-t     { font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--warm);font-weight:600;display:block;margin-bottom:6px; }
.sip-inp         { width:100%;padding:10px 14px;background:var(--white);border:1px solid var(--border2);color:var(--char);font-family:var(--font-ui);font-size:13px;outline:none;transition:border-color .2s; }
.sip-inp:focus   { border-color:var(--warm); }
.sip-btn         { width:100%;padding:13px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;font-family:var(--font-ui);background:var(--char);color:var(--white);border:none;cursor:pointer;margin-top:10px;transition:background .2s; }
.sip-btn:hover   { background:var(--navy); }
.sip-results     { display:none;margin-top:24px;background:var(--char);padding:28px; }
.sip-results.show{ display:grid;grid-template-columns:repeat(3,1fr);gap:16px; }
.sip-rn { font-family:var(--font-display);font-size:28px;font-weight:400;color:var(--gold2); }
.sip-rl { font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.3);margin-top:4px; }
.why-list         { display:flex;flex-direction:column;gap:0; }
.why-point        { padding:20px 0;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:16px; }
.why-point:last-child { border-bottom:none; }
.why-point__icon  { width:32px;height:32px;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;color:#fff; }
.why-point__title { font-size:13px;font-weight:600;color:var(--char);margin-bottom:4px; }
.why-point__desc  { font-size:12px;color:var(--muted);line-height:1.7; }
@media(max-width:900px){ .sip-values-wrap{grid-template-columns:1fr;} }
`;

/* ═══════════════════════════════════════════════════
   CONTACT
   @param data — contactData from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderContact(data) {
  const officeItems = data.offices.map(o => /* html */`
    <div class="office-item">${o} <span class="office-plus">+</span></div>`).join('');

  const enquiryRadios = data.enquiryOptions.map(o => /* html */`
    <label class="form-radio-item"><input type="radio" name="enquiry" value="${o}"/> ${o}</label>`).join('');

  const discoverRadios = data.discoverOptions.map(o => /* html */`
    <label class="form-radio-item"><input type="radio" name="discover" value="${o}"/> ${o}</label>`).join('');

  const phones = data.phones.map(p => `<a href="tel:${p.replace(/\s/g,'')}">${p}</a>`).join('<br>');
  const emails = data.emails.map(e => `<a href="mailto:${e}">${e}</a>`).join('<br>');

  return /* html */`
<section class="contact-wrap" id="contact">
  <h2 class="contact-title">${data.heading}</h2>
  <div class="contact-grid">
    <div>
      <div class="ci-row"><div class="ci-icon">📍</div><div><div class="ci-lbl">Address</div><div class="ci-val">${data.address.replace(/\n/g,'<br>')}</div></div></div>
      <div class="ci-row"><div class="ci-icon">📞</div><div><div class="ci-lbl">General Contact</div><div class="ci-val">${phones}</div></div></div>
      <div class="ci-row"><div class="ci-icon">✉️</div><div><div class="ci-lbl">Email</div><div class="ci-val">${emails}</div></div></div>
      <div class="ci-row"><div class="ci-icon">💼</div><div><div class="ci-lbl">Career</div><div class="ci-val"><a href="mailto:${data.careerEmail}">${data.careerEmail}</a></div></div></div>
      <div style="margin-top:8px">
        <div class="ci-lbl" style="margin-bottom:0">Offices</div>
        <div class="offices-grid">${officeItems}</div>
      </div>
    </div>
    <div>
      <form id="contactForm">
        <div class="form-group"><label class="form-label">Full Name *</label><input class="form-inp" type="text" placeholder="Your full name" required/></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Email Address *</label><input class="form-inp" type="email" placeholder="you@example.com" required/></div>
          <div class="form-group"><label class="form-label">Contact Number *</label><input class="form-inp" type="tel" placeholder="+91 XXXXX XXXXX"/></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Company / Family Name *</label><input class="form-inp" type="text" placeholder="Company or family name" required/></div>
          <div class="form-group"><label class="form-label">City *</label><input class="form-inp" type="text" placeholder="Your city" required/></div>
        </div>
        <div class="form-group"><label class="form-label">Topic of Enquiry *</label><div class="form-radio-group">${enquiryRadios}</div></div>
        <div class="form-group" style="margin-top:18px"><label class="form-label">How did you discover EPM Wealth?</label><div class="form-radio-group">${discoverRadios}</div></div>
        <div class="form-group" style="margin-top:18px"><label class="form-label">How can we help you?</label><textarea class="form-textarea" placeholder="Tell us about your financial goals..."></textarea></div>
        <button type="submit" class="form-submit">Submit →</button>
      </form>
      <div class="form-ok" id="formOk">✅ Thank you! We'll be in touch within 24 hours.</div>
      <p style="font-size:10px;color:var(--muted2);margin-top:12px;line-height:1.7;font-style:italic">*This form does not operate as a job portal.</p>
    </div>
  </div>
</section>`;
}

export const CONTACT_STYLES = /* css */`
.contact-wrap  { padding:88px 7%;background:var(--blush); }
.contact-title { font-family:var(--font-display);font-size:clamp(30px,4.5vw,58px);font-weight:300;line-height:1.1;color:var(--char);margin-bottom:52px; }
.contact-title em { font-style:italic;color:var(--warm); }
.contact-grid { display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start; }
.ci-row { display:flex;gap:14px;margin-bottom:22px;padding-bottom:22px;border-bottom:1px solid var(--border);transition:padding-left .2s; }
.ci-row:hover { padding-left:6px; }
.ci-icon { width:40px;height:40px;background:var(--white);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0; }
.ci-lbl  { font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--warm);font-weight:600;margin-bottom:4px; }
.ci-val  { font-size:13px;color:var(--muted);line-height:1.7; }
.ci-val a { color:var(--muted);transition:color .2s; }
.ci-val a:hover { color:var(--char); }
.offices-grid { display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:20px; }
.office-item  { padding:13px 0;border-bottom:1px solid var(--border);font-size:13px;color:var(--muted);display:flex;justify-content:space-between;padding-right:20px;cursor:pointer;transition:color .2s; }
.office-item:hover { color:var(--warm); }
.office-plus  { color:var(--warm);font-size:18px;line-height:1; }
.form-group   { margin-bottom:14px; }
.form-row     { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
.form-label   { font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--warm);font-weight:600;display:block;margin-bottom:6px; }
.form-inp,.form-textarea,.form-select { width:100%;padding:11px 14px;background:var(--white);border:1px solid var(--border2);color:var(--char);font-family:var(--font-ui);font-size:13px;outline:none;transition:border-color .2s;appearance:none; }
.form-inp:focus,.form-textarea:focus { border-color:var(--warm); }
.form-textarea { min-height:110px;resize:vertical; }
.form-radio-group { display:flex;flex-direction:column;gap:8px;margin-top:6px; }
.form-radio-item  { display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted);cursor:pointer; }
.form-radio-item input { accent-color:var(--warm); }
.form-submit { width:100%;padding:14px;background:var(--char);color:var(--white);border:none;cursor:pointer;font-family:var(--font-ui);font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:600;margin-top:6px;transition:background .2s; }
.form-submit:hover { background:var(--navy); }
.form-ok { display:none;margin-top:12px;padding:12px;background:var(--white);border:1px solid var(--border);font-size:13px;color:var(--muted);text-align:center; }
@media(max-width:900px){ .contact-grid{grid-template-columns:1fr;} }
@media(max-width:480px){ .form-row{grid-template-columns:1fr;} }
`;

/* ═══════════════════════════════════════════════════
   FOOTER
   @param data     — footerData from siteData.js
   @param meta     — siteMetaData from siteData.js
   @param socials  — socialLinks from siteData.js
   ═══════════════════════════════════════════════════ */
export function renderFooter(data, meta, socials) {
  const cols = data.columns.map(col => /* html */`
    <div class="footer-col">
      <h4>${col.heading}</h4>
      ${col.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')}
    </div>`).join('');

  const socialIcons = socials.map(s => /* html */`
    <a href="${s.href}" class="footer-soc" target="_blank" rel="noopener" aria-label="${s.label}">
      <i class="fab ${s.icon}"></i>
    </a>`).join('');

  const legalBlocks = data.legalEntities.map(e => /* html */`
    <div>
      <div class="footer-legal-head">${e.name}</div>
      ${e.lines.join('<br>')}
    </div>`).join('');

  const badges = Object.values(meta.registrations).map(r => `<div class="footer-badge">${r}</div>`).join('');

  return /* html */`
<footer>
  <div class="footer-top">
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
        <img src="${meta.logoSrc}" alt="${meta.logoAlt}" style="height:32px;width:auto;object-fit:contain;display:block;"/>
      </div>
      <div class="footer-brand">EPM <span>Wealth</span></div>
      <div class="footer-tagline">${meta.subline}</div>
      <p class="footer-about">AMFI &amp; BSE registered wealth management firm. Helping India's most prominent families bridge the gap between their reality and their purpose since ${meta.founded}.</p>
      <div class="footer-badges">${badges}</div>
      <div class="footer-socials">${socialIcons}</div>
    </div>
    ${cols}
  </div>
  <div class="footer-rule"></div>
  <div class="footer-legal">${legalBlocks}</div>
  <div class="footer-rule"></div>
  <div class="footer-bottom">
    <span>${meta.copyright}</span>
    <div>
      <a href="#">Privacy Policy</a>
      <a href="#">Disclaimer</a>
      <a href="#">Regulatory Information</a>
    </div>
  </div>
</footer>`;
}

export const FOOTER_STYLES = /* css */`
footer { background:var(--blush);padding:72px 5% 32px;border-top:1px solid var(--border); }
.footer-top { display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:48px;margin-bottom:56px; }
.footer-brand { font-family:var(--font-display);font-size:24px;font-weight:400;color:var(--char);margin-bottom:8px;letter-spacing:1px; }
.footer-brand span { font-style:italic;color:var(--warm); }
.footer-tagline { font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--muted2);margin-bottom:14px; }
.footer-about   { font-size:12.5px;color:var(--muted2);line-height:1.9;max-width:240px; }
.footer-badges  { display:flex;gap:8px;margin-top:18px;flex-wrap:wrap; }
.footer-badge   { padding:4px 10px;border:1px solid var(--border2);font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted2);font-weight:600; }
.footer-socials { display:flex;gap:8px;margin-top:16px; }
.footer-soc     { width:34px;height:34px;border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--muted2);transition:border-color .2s,color .2s; }
.footer-soc:hover { border-color:var(--warm);color:var(--warm); }
.footer-col h4  { font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:var(--muted2);margin-bottom:18px;font-weight:600; }
.footer-col a   { display:block;color:var(--muted2);font-size:12.5px;margin-bottom:10px;transition:all .2s; }
.footer-col a:hover { color:var(--warm);padding-left:4px; }
.footer-rule    { height:1px;background:var(--border);margin-bottom:22px; }
.footer-legal   { display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;margin-bottom:28px;font-size:10px;color:var(--muted2);line-height:1.9; }
.footer-legal-head { font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);font-weight:600;margin-bottom:6px; }
.footer-bottom  { display:flex;justify-content:space-between;align-items:center;font-size:11px;color:var(--muted2);flex-wrap:wrap;gap:16px; }
.footer-bottom a { color:var(--muted2);margin-left:16px;transition:color .2s; }
.footer-bottom a:hover { color:var(--warm); }
@media(max-width:1100px){ .footer-top{grid-template-columns:1fr 1fr;} }
@media(max-width:480px) { .footer-top{grid-template-columns:1fr;} .footer-legal{grid-template-columns:1fr;} }
`;

/* ═══════════════════════════════════════════════════
   FLOATING SOCIAL + WHATSAPP
   @param socials — socialLinks from siteData.js
   @param waHref  — WhatsApp href string
   ═══════════════════════════════════════════════════ */
export function renderFloatingSocials(socials, waHref) {
  const links = socials.filter(s => s.icon !== 'fa-whatsapp').map(s => /* html */`
    <a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">
      <i class="fab ${s.icon}"></i>
    </a>`).join('');

  return /* html */`
<div class="sf">${links}</div>
<a href="${waHref}" class="wa-btn" target="_blank" rel="noopener" title="WhatsApp">💬</a>`;
}

export const FLOATING_STYLES = /* css */`
.sf { position:fixed;left:16px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:6px;z-index:200; }
.sf a { width:32px;height:32px;border:1px solid var(--border);background:rgba(245,237,224,.9);display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--muted);box-shadow:0 2px 10px rgba(0,0,0,.06);transition:border-color .2s,color .2s; }
.sf a:hover { border-color:var(--warm);color:var(--warm); }
.wa-btn { position:fixed;bottom:22px;left:16px;width:44px;height:44px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;z-index:200;box-shadow:0 4px 16px rgba(37,211,102,.3);transition:transform .2s; }
.wa-btn:hover { transform:scale(1.08); }
@media(max-width:768px){ .sf,.wa-btn{display:none;} }
`;
