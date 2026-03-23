/**
 * EPM Wealth — ServiceCards Component
 * ──────────────────────────────────────
 * Renders both the dark "Wealth Management" card grid
 * and the light "Asset Management" card grid.
 *
 * USAGE:
 *   import { renderWealthCards, renderAssetCards, injectServiceCardStyles } from './components/ServiceCards.js';
 *   document.getElementById('wealth-mount').innerHTML = renderWealthCards(wealthCards, { label:'Services', heading:'Wealth Management', body:'...' });
 *   document.getElementById('assets-mount').innerHTML = renderAssetCards(assetCards, { label:'Services', heading:'Asset Management', body:'...' });
 *   injectServiceCardStyles();
 *
 * CONFIG (@param cards)  — array of card objects from config/siteData.js
 * CONFIG (@param section) — { label, heading, body } section header strings
 */

/* ── Wealth Management Cards (dark photo style) ── */
export function renderWealthCards(cards, section = {}) {
  const cardHTML = cards.map(c => /* html */`
    <div class="wm-card">
      <div class="wm-card-body">
        <div class="wm-card-top">
          <div class="wm-card-title">${c.title.replace(/\n/g, '<br>')}</div>
          <div class="wm-card-desc">${c.desc}</div>
        </div>
        <div class="wm-card-bottom">
          <div class="wm-card-invest-block">
            <div class="wm-card-invest">${c.minLabel}</div>
            <div class="wm-card-amount">${c.minAmt}</div>
          </div>
          <a class="wm-card-link">${c.ctaLabel} <i class="fa fa-arrow-right"></i></a>
        </div>
      </div>
      <div class="wm-card-photo">
        <img src="${c.imgSrc}" alt="${c.imgAlt}"/>
      </div>
    </div>`).join('');

  return /* html */`
<section class="section" id="wealth" style="background:var(--blush)">
  <div class="section-grid-header reveal">
    <div><span class="label">${section.label || 'Services'}</span><h2 class="h2">${section.heading || ''}</h2></div>
    <div><p class="body-text">${section.body || ''}</p></div>
  </div>
  <div class="wm-cards-grid reveal">${cardHTML}</div>
</section>`;
}

/* ── Asset Management Cards (photo + gradient overlay style) ── */
export function renderAssetCards(cards, section = {}) {
  const cardHTML = cards.map(c => /* html */`
    <div class="am-card">
      <img src="${c.imgSrc}" alt="${c.imgAlt}"/>
      <div class="am-card-overlay"></div>
      <div class="am-card-body">
        <div class="am-card-min">Minimum Amount</div>
        <div class="am-card-amount">${c.minAmt}</div>
        <div class="am-card-title">${c.title}</div>
        <div class="am-card-desc">${c.desc}</div>
        <div class="am-card-link">${c.ctaLabel} <i class="fa fa-arrow-right"></i></div>
      </div>
    </div>`).join('');

  return /* html */`
<section class="section am-wrap" id="assets">
  <div class="section-grid-header reveal">
    <div><span class="label gold">${section.label || 'Services'}</span><h2 class="h2 light">${section.heading || ''}</h2></div>
    <div><p class="body-text light">${section.body || ''}</p></div>
  </div>
  <div class="am-cards-grid reveal">${cardHTML}</div>
</section>`;
}

export const SERVICE_CARD_STYLES = /* css */`
/* ── Shared header row used in both card sections ── */
.section-grid-header {
  display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:40px;
}

/* ══ WEALTH MANAGEMENT CARDS ══ */
.wm-cards-grid { display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--border2); }
.wm-card { position:relative;overflow:hidden;cursor:pointer;min-height:420px;display:block;background:#1a1208; }
.wm-card-photo { position:absolute;inset:0;z-index:0; }
.wm-card-photo img { width:100%;height:100%;object-fit:cover;object-position:center;transition:transform .7s cubic-bezier(.4,0,.2,1),filter .6s;filter:saturate(.85); }
.wm-card:hover .wm-card-photo img { transform:scale(1.05);filter:saturate(1); }
.wm-card-body {
  position:relative;z-index:2;width:55%;height:100%;min-height:420px;
  padding:36px 32px;display:flex;flex-direction:column;justify-content:space-between;
  background:rgba(28,20,12,0.52);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border-right:1px solid rgba(255,255,255,.07);transition:background .35s;box-sizing:border-box;
}
.wm-card:hover .wm-card-body { background:rgba(18,12,6,0.62); }
.wm-card-top { flex:1; }
.wm-card-title { font-family:var(--font-display);font-size:clamp(26px,2.4vw,36px);font-weight:400;line-height:1.05;color:var(--white);margin-bottom:14px; }
.wm-card-desc  { font-size:12.5px;color:rgba(255,255,255,.62);line-height:1.85; }
.wm-card-invest-block { border-top:1px solid rgba(255,255,255,.12);padding-top:18px;margin-top:24px;margin-bottom:14px; }
.wm-card-invest { font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.45);font-weight:600;margin-bottom:6px; }
.wm-card-amount { font-family:var(--font-display);font-size:15px;font-weight:600;color:var(--white); }
.wm-card-link { display:inline-flex;align-items:center;gap:8px;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;font-weight:600;color:var(--warm2);transition:gap .25s;margin-top:14px; }
.wm-card:hover .wm-card-link { gap:14px; }

/* ══ ASSET MANAGEMENT CARDS ══ */
.am-wrap { background:var(--cream2); }
.am-wrap .label.gold { color:var(--warm); }
.am-wrap .h2.light   { color:var(--char); }
.am-wrap .body-text.light { color:var(--muted); }
.am-cards-grid { display:grid;grid-template-columns:1fr 1fr;gap:2px;background:var(--border); }
.am-card { position:relative;overflow:hidden;cursor:pointer;min-height:340px;display:flex;flex-direction:column;justify-content:flex-end;background:var(--cream); }
.am-card img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.4,0,.2,1),filter .6s;filter:saturate(.75) brightness(.7) sepia(.15); }
.am-card:hover img { transform:scale(1.05);filter:saturate(.85) brightness(.62) sepia(.1); }
.am-card-overlay { position:absolute;inset:0;background:linear-gradient(to top,rgba(20,14,8,0.88) 0%,rgba(30,20,10,0.55) 50%,rgba(20,14,8,0.18) 100%); }
.am-card-body   { position:relative;z-index:2;padding:28px 30px; }
.am-card-min    { font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.38);margin-bottom:5px;font-weight:600; }
.am-card-amount { font-family:var(--font-display);font-size:18px;font-weight:400;color:var(--warm2);margin-bottom:12px;font-style:italic; }
.am-card-title  { font-family:var(--font-display);font-size:clamp(24px,2.8vw,36px);font-weight:400;color:var(--white);line-height:1.1;margin-bottom:10px; }
.am-card-desc   { font-size:12.5px;color:rgba(255,255,255,.5);line-height:1.8;max-width:360px; }
.am-card-link   { display:inline-flex;align-items:center;gap:6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--warm2);margin-top:18px;font-weight:600;transition:gap .2s;border-bottom:1px solid rgba(196,154,90,.3);padding-bottom:2px; }
.am-card-link:hover { gap:12px; }

/* Responsive */
@media(max-width:1100px){ .wm-cards-grid,.am-cards-grid{ grid-template-columns:1fr; } }
@media(max-width:768px){
  .section-grid-header { grid-template-columns:1fr; gap:24px; }
  .wm-card-body { width:100%;min-height:auto;padding:28px 24px;backdrop-filter:none;-webkit-backdrop-filter:none;background:rgba(18,12,6,0.75); }
  .wm-card { min-height:360px; }
}
`;

export function injectServiceCardStyles() {
  if (document.getElementById('epm-service-card-styles')) return;
  const s = document.createElement('style');
  s.id = 'epm-service-card-styles';
  s.textContent = SERVICE_CARD_STYLES;
  document.head.appendChild(s);
}
