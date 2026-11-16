/* =========================================================
   OCTOPOS PROMO - app.js
   Bez build koraka i bez biblioteka. Struktura:
   1. Pomoćne funkcije i jezik   2. Vizuali modula
   3. Hero simulacija            4. Kartice, pretraga, filteri
   5. Modal i lightbox           6. Showcase, scroll efekti
   7. Pokretanje
   ========================================================= */
(() => {
  'use strict';

  /* ---------- 1. POMOĆNE FUNKCIJE I JEZIK ---------- */
  const DICT = window.OCTOPOS_I18N;
  const MODULES = window.OCTOPOS_MODULES || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* privatni režim */ } }
  };

  const params = new URLSearchParams(location.search);
  let lang = params.get('lang') || store.get('octopos-lang') || 'sr';
  if (!DICT[lang]) lang = 'sr';

  const t = key => DICT[lang][key] ?? DICT.sr[key] ?? key;
  const L = m => m[lang] || m.sr;
  const alt = img => img[lang] || img.sr || '';

  function applyI18n() {
    document.documentElement.lang = lang === 'sr' ? 'sr-Latn' : 'en';
    document.title = t('meta.title');
    $('meta[name="description"]').setAttribute('content', t('meta.description'));
    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split('|').forEach(pair => {
        const [attr, key] = pair.split(':');
        el.setAttribute(attr, t(key));
      });
    });
    $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('.lang').dataset.active = lang;
    const cm = $('#cta-mail'); if (cm) cm.href = `mailto:podrska@octopos.rs?subject=${encodeURIComponent(t('cta.subject'))}`;
  }

  function setLang(next) {
    if (next === lang || !DICT[next]) return;
    document.body.classList.add('lang-swap');
    setTimeout(() => {
      lang = next;
      store.set('octopos-lang', lang);
      const url = new URL(location.href);
      lang === 'sr' ? url.searchParams.delete('lang') : url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
      applyI18n();
      buildFilters();
      renderCards(false);
      buildMarquee();
      if (currentId) fillModal(currentId);
      renderShow();
      requestAnimationFrame(() => document.body.classList.remove('lang-swap'));
    }, 200);
  }

  /* ---------- 2. VIZUALI MODULA (animirane ilustracije) ---------- */
  const ICONS = {
    pos: '<rect x="3" y="3" width="18" height="12" rx="2"/><path d="M7 19h10M9 15l-1 4M15 15l1 4M7 7h4M7 10h6"/>',
    monitor: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 22h8M12 18v4M7 9h10M7 13h6"/>',
    scan: '<path d="M4 9V5a2 2 0 0 1 2-2h3M15 3h3a2 2 0 0 1 2 2v4M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v3M14 21h3M20 20v1"/>',
    smartphone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    ticket: '<path d="M3 7a2 2 0 0 0 2-2h14v4a2 2 0 0 0 0 4v4H5a2 2 0 0 0-2-2z"/>',
    chart: '<path d="M3 3v18h18M7 16l4-5 3 2 5-7"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    receipt: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3zM8 8h8M8 12h8M8 16h4"/>',
    code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16"/>',
    hotel: '<path d="M3 21V7l9-4 9 4v14M3 21h18M9 21v-6h6v6"/>',
    network: '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>'
  };
  const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.layers}</svg>`;

  const VIS = {
    kiosk: () => `<span class="fx-tap" style="left:50%;top:16%"></span><span class="fx-tap d2" style="left:48%;top:27%"></span><span class="fx-tap d3" style="left:52%;top:33%"></span>
      <span class="fx-chip c1" style="left:16%;top:22%">🇷🇸 / 🇬🇧 ${t('fx.lang')}</span>
      <span class="fx-chip c2" style="left:61%;top:14%">🛒 ${t('vis.cart')} · 3</span>
      <span class="fx-chip c3 ok" style="left:61%;top:44%">✓ ${t('vis.paid')}</span>`,
    qr: () => `<div class="vis v-qr"><div class="qr-box"><img src="assets/images/octopos-qr-naruci.png" alt="" class="qr-img"><span class="scan"></span></div>
        <div class="arrow-dots"><i></i><i></i><i></i></div>
        <div class="dev phone"><div class="scr">
          <div class="m-row" style="--c:linear-gradient(135deg,#c2401f,#f5a04a)"><i></i><span></span></div>
          <div class="m-row" style="--c:linear-gradient(135deg,#4f9a3a,#a7d36a)"><i></i><span></span></div>
          <div class="m-row" style="--c:linear-gradient(135deg,#2c7fd6,#93c8ff)"><i></i><span></span></div>
          <div class="m-row" style="--c:linear-gradient(135deg,#e7c440,#fff3a6)"><i></i><span></span></div>
          <div class="m-btn">${t('hero.phoneOrder')}</div>
          <div class="m-ok">✓ ${t('vis.sent')}</div></div></div></div>`,
    android: () => `<div class="vis v-and">
        <ol class="and-steps"><li class="s1"><b>1</b>${t('vis.order')}</li><li class="s2"><b>2</b>${t('vis.tap')}</li><li class="s3"><b>3</b>${t('vis.receipt')}</li></ol>
        <div class="and-dev">
          <div class="and-paperwrap"><div class="and-paper"><strong>OCTOPOS</strong><small>${t('vis.receipt').toUpperCase()}</small><p><span>Cappucino</span><span>250</span></p><p><span>Pasta Pesto</span><span>1.000</span></p><p><span>Limunada</span><span>350</span></p><p class="tot"><b>${t('vis.total')}</b><b>1.600</b></p><i class="and-qr"></i></div></div>
          <div class="and-head"><span></span></div>
          <div class="and-scr"><div class="and-shot"></div><span class="and-touch t1"></span><span class="and-touch t2"></span><span class="and-touch t3"></span>
            <div class="and-bar"><span>${t('vis.table')}</span><b>1.600 RSD</b></div>
            <div class="and-pay"><svg viewBox="0 0 24 24"><path d="M8.5 7.5a6 6 0 0 1 0 9M12 5a9.5 9.5 0 0 1 0 14M15.5 2.5a13 13 0 0 1 0 19"/></svg><span>${t('vis.tapCard')}</span><b>1.600 RSD</b></div></div>
          <div class="and-waves"><i></i><i></i><i></i></div>
        </div>
        <div class="and-card"><i class="chip"></i><svg viewBox="0 0 24 24"><path d="M8.5 7.5a6 6 0 0 1 0 9M12 5a9.5 9.5 0 0 1 0 14M15.5 2.5a13 13 0 0 1 0 19"/></svg><span>•••• 4821</span></div>
        <div class="and-paid">✓ ${t('vis.paid')} · 1.600 RSD</div></div>`,
    status: () => `<div class="vis v-st"><div class="st-col l"><h4>${t('vis.prep').toUpperCase()}</h4></div><div class="st-col r"><h4>${t('vis.done').toUpperCase()}</h4></div>
        <img class="st-burger" src="assets/images/status-burger.png" alt=""><div class="st-nums"></div>
        <div class="st-foot"><img src="assets/images/octopos-logo.png" alt=""><span>www.octopos.rs<br>011/4-251-251</span></div></div>`,
    qrbill: () => `<div class="vis v-qrbill"><div class="mini-qr"><img src="assets/images/octopos-qr-naruci.png" alt="" class="qr-img"></div>
        <div class="dev phone"><div class="scr">
          <div class="b-title">${t('vis.bill')} · ${t('vis.table')}</div>
          <div class="b-row"><span>2× Aqua Pana</span><span>480</span></div>
          <div class="b-row"><span>1× Pizza</span><span>1.150</span></div>
          <div class="b-row"><span>2× Čaj</span><span>500</span></div>
          <div class="b-row"><span>1× Tiramisu</span><span>540</span></div>
          <div class="b-total"><span>${t('vis.total')}</span><span>2.670</span></div>
          <span class="stamp">${t('vis.closed')}</span></div></div></div>`,
    api: () => `<div class="vis v-api"><div class="code"><div class="code-top"><i></i><i></i><i></i><span>200 OK</span></div>
        <span class="ln"><span class="g">GET</span> /api/v1/sales?date=today</span>
        <span class="ln">{ <span class="k">"location"</span>: <span class="s">"Zemun"</span>,</span>
        <span class="ln">&nbsp;&nbsp;<span class="k">"receipts"</span>: <span class="n">214</span>,</span>
        <span class="ln">&nbsp;&nbsp;<span class="k">"turnover"</span>: <span class="n">184250.00</span>,</span>
        <span class="ln">&nbsp;&nbsp;<span class="k">"topItem"</span>: <span class="s">"Macchiato"</span> }</span>
        <span class="ln"><span class="g">// → BI, ERP, dashboard</span></span></div>
        <span class="node a"><i></i>Power BI</span><span class="node b"><i></i>ERP</span><span class="node c"><i></i>Dashboard</span></div>`,
    hotel: () => `<div class="vis v-hotel"><div class="flow">
        <div class="h-card"><h5><svg viewBox="0 0 24 24"><path d="M4 3v8a3 3 0 0 0 6 0V3M7 3v18M17 3c-2 0-3 3-3 6s1 4 3 4v8"/></svg>${t('vis.restaurant')}</h5><div class="h-line"><span>Pasta</span><span>1.000</span></div><div class="h-line"><span>Vino 0,2</span><span>620</span></div><div class="h-sum"><span>${t('vis.total')}</span><span>1.620</span></div></div>
        <span class="track"></span><span class="coin">${t('vis.charge')} →</span>
        <div class="h-card room"><h5><svg viewBox="0 0 24 24"><path d="M3 21V7l9-4 9 4v14M9 21v-6h6v6"/></svg>${t('vis.room')}</h5><div class="h-line"><span>Spa</span><span>2.400</span></div><div class="h-line add"><span>F&amp;B</span><span>+1.620</span></div><div class="h-sum"><span>PMS</span><span>✓</span></div><span class="key">🔑</span></div>
      </div></div>`,
    multi: () => {
      const locs = [[18, 22], [82, 22], [12, 70], [88, 70], [50, 88]];
      const lines = locs.map(([x, y], i) => `<line x1="50" y1="48" x2="${x}" y2="${y}"/>
        <circle r="1.3" class="pkt"><animateMotion dur="${2.4 + i * .3}s" repeatCount="indefinite" path="M50 48 L${x} ${y}"/></circle>
        <circle r="1.3" class="pkt g"><animateMotion dur="${2.6 + i * .25}s" begin="${.8 + i * .2}s" repeatCount="indefinite" path="M${x} ${y} L50 48"/></circle>`).join('');
      const labels = locs.map(([x, y], i) => `<span class="loc" style="left:${x}%;top:${y}%"><i></i>${t('vis.loc')} ${i + 1}</span>`).join('');
      return `<div class="vis v-multi"><svg class="net" viewBox="0 0 100 100" preserveAspectRatio="none" style="inset:0;width:100%;height:100%">${lines}</svg>
        <div class="hq"><img src="assets/images/octopos-mark.png" alt=""><small>${t('vis.hq')}</small></div>${labels}</div>`;
    },
    kds: () => `<div class="vis v-kds"><div class="mini-board">${'<div class="mt"></div>'.repeat(6)}</div></div>`,
    mobile: () => `<div class="vis v-chart"><div class="panel">${t('vis.sales')}<div class="bars">${[40, 70, 55, 90, 65, 100, 80].map((h, i) => `<i style="height:${h}%;animation-delay:${i * .1}s"></i>`).join('')}</div></div></div>`,
    backoffice: () => VIS.mobile()
  };
  const visual = m => (VIS[m.visual] || VIS.kds)();

  const stState = new WeakMap();
  const hhmm = () => { const d = new Date(); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; };
  function stInit(el) {
    const box = el.querySelector('.st-nums'); const st = { prep: [], done: [], next: 21, step: 0 };
    const mk = n => { const e = document.createElement('span'); e.className = 'st-n'; e.innerHTML = `<b>${n}</b><small>${hhmm()}</small>`; box.append(e); return e; };
    [20, 19, 18].forEach(n => st.prep.push(mk(n)));
    [16, 15, 14, 13].forEach(n => st.done.push(mk(n)));
    stState.set(el, st); stLayout(st);
    return st;
  }
  function stLayout(st) {
    st.prep.forEach((e, i) => { e.style.left = '13%'; e.style.top = `${34 + i * 12.5}%`; });
    st.done.forEach((e, i) => { e.style.left = '66%'; e.style.top = `${34 + i * 12.5}%`; });
  }
  const hop = e => { e.classList.remove('hop'); void e.offsetWidth; e.classList.add('hop'); };
  function stTick(el) {
    const st = stState.get(el) || stInit(el), box = el.querySelector('.st-nums');
    if (st.step++ % 2 === 0) {
      // nova porudžbina stiže sa leve strane
      const e = document.createElement('span'); e.className = 'st-n enter'; e.innerHTML = `<b>${st.next++}</b><small>${hhmm()}</small>`;
      e.style.left = '-12%'; e.style.top = '34%'; box.append(e);
      st.prep.unshift(e);
      if (st.prep.length > 4) { const old = st.prep.pop(); old.classList.add('out'); setTimeout(() => old.remove(), 600); }
      requestAnimationFrame(() => requestAnimationFrame(() => { e.classList.remove('enter'); stLayout(st); hop(e); }));
    } else {
      // najstarija u pripremi je gotova -> prelazi u "Završeno" i treperi
      const e = st.prep.pop(); if (!e) return;
      st.done.unshift(e); e.classList.remove('blink'); void e.offsetWidth; e.classList.add('blink'); hop(e);
      if (st.done.length > 4) { const old = st.done.pop(); old.classList.add('out'); setTimeout(() => old.remove(), 600); }
      stLayout(st);
    }
  }
  setInterval(() => {
    if (document.hidden) return;
    $$('.v-st.play').forEach(el => { const sl = el.closest('.sl'); if (!sl || sl.classList.contains('on')) stTick(el); });
  }, reduced ? 6000 : 1500);
  const imgStyle = img => `object-position:${img.pos === 'center' ? 'center' : 'left top'};${img.fit === 'contain' ? 'object-fit:contain;background:#141112' : ''}`;
  const pageUrl = m => m.page + (lang === 'en' ? '?lang=en' : '');

  // Animacije ilustracija rade samo dok su na ekranu (štedi CPU/bateriju)
  const visObserver = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('play', e.isIntersecting)), { threshold: .15 }) : null;
  const watchVis = root => $$('.vis', root).forEach(v => visObserver ? visObserver.observe(v) : v.classList.add('play'));

  /* ---------- 3. HERO SIMULACIJA (dekorativni podaci) ---------- */
  const ITEMS = ['1 × Cappucino', '1 × Rosa gazirana 0.7', '1 × Macchiato', '2 × Negroni', '1 × Pasta Pesto', '1 × Aqua Viva 0.7', '2 × Moscow Mule', '1 × Caj Kamilica', '1 × Affogatto', '1 × Long Island', '1 × Stellla 0.5'];
  let ticketNo = 6;
  function makeTicket() {
    const el = document.createElement('div');
    const now = new Date();
    const table = String(1 + Math.floor(Math.random() * 18)).padStart(2, '0');
    const pick = () => ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const lines = [pick(), pick(), ...(Math.random() > .5 ? [pick()] : [])];
    el.className = 'ticket'; el.dataset.state = 'new'; el.dataset.table = table; el.dataset.no = ++ticketNo;
    el.innerHTML = `<div class="ticket-h"><span class="th-l"><b>${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}</b><small>ADMIN .</small></span><span class="th-r"><b>${ticketNo}</b><small><span data-i18n="hero.table">${t('hero.table')}</span>: ${table}</small></span></div>
      <div class="ticket-b">${lines.map(l => `<p>${l}</p>`).join('')}<span class="ticket-state" data-i18n="hero.new">${t('hero.new')}</span></div>`;
    return el;
  }
  function heroBoard() {
    const grid = $('#board-grid'); if (!grid) return;
    for (let i = 0; i < 9; i++) {
      const tk = makeTicket();
      const st = i < 3 ? 'ready' : i < 6 ? 'prep' : 'new';
      setState(tk, st); tk.style.animationDelay = `${1 + i * .12}s`;
      grid.append(tk);
    }
    if (reduced) return;
    const toast = $('#toast');
    setInterval(() => {
      if (document.hidden) return;
      const tickets = $$('.ticket', grid);
      const ready = tickets.find(x => x.dataset.state === 'ready');
      if (ready) { ready.classList.add('out'); setTimeout(() => ready.remove(), 500); }
      const prep = tickets.find(x => x.dataset.state === 'prep');
      if (prep) {
        setState(prep, 'ready');
        $('#toast-table').textContent = prep.dataset.table; $('#toast-no').textContent = prep.dataset.no;
        toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2200);
      }
      tickets.filter(x => x.dataset.state === 'new').slice(0, 1).forEach(x => setState(x, 'prep'));
      setTimeout(() => grid.append(makeTicket()), 520);
      bumpTurnover();
    }, 3200);
  }
  function setState(el, st) {
    el.dataset.state = st;
    const s = el.querySelector('.ticket-state');
    const key = st === 'new' ? 'hero.new' : st === 'prep' ? 'hero.prep' : 'hero.ready';
    s.dataset.i18n = key; s.textContent = t(key);
  }
  let turnover = 184250;
  function bumpTurnover() {
    const el = $('#turnover'); const from = turnover; turnover += 350 + Math.round(Math.random() * 12) * 100;
    animateNumber(el, from, turnover, 900);
  }
  function animateNumber(el, from, to, dur) {
    const fmt = n => Math.round(n).toLocaleString('sr-RS');
    if (reduced) { el.textContent = fmt(to); return; }
    const t0 = performance.now();
    const step = now => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(from + (to - from) * e); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* ---------- 4. KARTICE, PRETRAGA, FILTERI ---------- */
  const CATS = ['all', 'ops', 'self', 'digital', 'mobile', 'analytics', 'integrations'];
  let activeCat = 'all';
  const grid = $('#module-grid'), search = $('#search'), counter = $('#shown-count');

  function buildFilters() {
    $('#filters').innerHTML = CATS.map(c => `<button type="button" class="filter" data-filter="${c}" aria-pressed="${c === activeCat}">${esc(t('categories.' + c))}</button>`).join('');
  }
  function matches(m, q) {
    if (activeCat !== 'all' && m.category !== activeCat) return false;
    if (!q) return true;
    const hay = ['sr', 'en'].map(l => { const d = m[l]; return [d.title, d.tag, d.intro, d.purpose, ...d.gains].join(' '); }).join(' ');
    const norm = s => s.toLocaleLowerCase('sr').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'dj');
    return norm(hay).includes(norm(q));
  }
  // Animirani slojevi preko spojenih slika (pozicije su u % slike 1600x1000)
  const FX = {
    kasa: () => `<span class="fx-tap" style="left:66%;top:72%"></span><span class="fx-tap d2" style="left:58%;top:24%"></span><span class="fx-tap d3" style="left:27%;top:42%"></span>
      <span class="fx-chip c1" style="left:58%;top:58%">🍽 ${t('vis.table')} · ${t('fx.newBill')}</span>
      <span class="fx-chip c2" style="left:48%;top:10%">+1 Cappucino · 250</span>
      <span class="fx-chip c3 ok" style="left:12%;top:16%">✓ ${t('fx.sentBar')}</span>`,
    kds: () => `<span class="fx-ticket" style="left:42%;top:30%"><b>14:57 · ${t('vis.table')} 07</b><i>2 × Negroni</i><i>1 × Cappucino</i></span>
      <span class="fx-chip c3 ok" style="left:60%;top:18%">✓ ${t('fx.confirmed')}</span>
      <span class="fx-chip c1" style="left:6%;top:84%">🌐 ${t('fx.foreign')}</span>`,
    kiosk: () => `<span class="fx-tap" style="left:50%;top:20%"></span><span class="fx-tap d2" style="left:50%;top:30%"></span>
      <span class="fx-chip c1" style="left:58%;top:12%">🛒 ${t('vis.cart')} · 3</span>
      <span class="fx-chip c3 ok" style="left:56%;top:54%">✓ ${t('vis.paid')}</span>`,
    qr: () => `<span class="fx-scan" style="left:7.5%;top:27%;width:26%;height:41%"></span>
      <span class="fx-tap d2" style="left:84%;top:68%"></span>
      <span class="fx-chip c2" style="left:40%;top:10%">📱 ${t('fx.menuOpen')}</span>
      <span class="fx-chip c3 ok" style="left:66%;top:84%">✓ ${t('vis.sent')}</span>`,
    analytics: () => `<span class="fx-kpi" style="left:4%;top:74%"><small>${t('hero.turnover')}</small><b data-fx-count="184250">184.250</b><em>RSD</em></span>
      <span class="fx-chip c3 ok" style="left:64%;top:84%">↗ +12% ${t('fx.vsYesterday')}</span>`,
    backoffice: () => `<span class="fx-row" style="left:10%;width:52%"></span>
      <span class="fx-chip c2" style="left:64%;top:22%">📦 ${t('fx.stock')}</span>
      <span class="fx-chip c3 ok" style="left:36%;top:88%">✓ ${t('fx.report')}</span>`
  };

  // Slajder: animacija (opciono) + sve slike modula, svaka kao poseban slajd
  const SL_TIME = 3800;
  function sliderHTML(m) {
    const slides = [];
    if (m.cover && !m.visualFirst) {
      return `<div class="slider" data-n="1"><div class="sl on sl-cover"><img src="${esc(m.cover)}" alt="${esc(L(m).title)}" loading="lazy" decoding="async"><div class="fx">${FX[m.fx] ? FX[m.fx]() : ''}</div></div></div>`;
    }
    if (m.visualFirst) return `<div class="slider" data-n="1"><div class="sl on sl-vis">${visual(m)}</div></div>`;
    if (!m.images.length || m.visualFirst) slides.push(`<div class="sl sl-vis" data-time="${m.visualTime || 7500}">${visual(m)}</div>`);
    m.images.forEach(img => slides.push(`<div class="sl${img.fit === 'contain' ? ' fit' : ''}" style="${img.bg ? `background:${img.bg}` : ''}"><img src="${esc(img.src)}" alt="${esc(alt(img))}" loading="lazy" decoding="async" style="${imgStyle(img)}${img.bg ? `;background:${img.bg}` : ''}"></div>`));
    slides[0] = slides[0].replace('class="sl', 'class="sl on');
    const n = slides.length;
    const ctrls = n > 1 ? `<button type="button" class="sl-arrow prev" data-sl="-1" aria-label="${esc(t('lb.prev'))}">‹</button><button type="button" class="sl-arrow next" data-sl="1" aria-label="${esc(t('lb.next'))}">›</button>
      <div class="sl-dots">${slides.map((_, k) => `<button type="button" class="sl-dot${k ? '' : ' on'}" data-go="${k}" aria-label="${k + 1} / ${n}"></button>`).join('')}</div>` : '';
    return `<div class="slider" data-n="${n}" style="--sl-time:${SL_TIME}ms">${slides.join('')}${ctrls}</div>`;
  }
  function slideTo(sl, i) {
    const items = $$(':scope > .sl', sl), dots = $$('.sl-dot', sl), n = items.length;
    const k = ((i % n) + n) % n;
    items.forEach((x, j) => x.classList.toggle('on', j === k));
    dots.forEach((x, j) => { x.classList.toggle('on', j === k); });
    const d = dots[k]; if (d) { d.classList.remove('on'); void d.offsetWidth; d.classList.add('on'); }
    sl._i = k; sl._t = 0;
    const cur = items[k], time = Number(cur.dataset.time) || SL_TIME;
    sl.style.setProperty('--sl-time', time + 'ms'); sl._dur = time;
    // animacija kreće ispočetka kad njen slajd postane aktivan
    const v = cur.querySelector('.vis');
    if (v && n > 1) { const c = v.cloneNode(true); c.querySelector('.st-nums') && (c.querySelector('.st-nums').innerHTML = ''); v.replaceWith(c); visObserver ? visObserver.observe(c) : c.classList.add('play'); }
  }
  const slObs = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting)), { threshold: .4 }) : null;
  const watchSliders = root => $$('.slider', root).forEach((s, i) => { s._i = 0; s._t = -i * 450; s._dur = Number(s.querySelector('.sl')?.dataset.time) || SL_TIME; s.style.setProperty('--sl-time', s._dur + 'ms'); slObs ? slObs.observe(s) : s.classList.add('in-view'); });
  setInterval(() => {
    if (document.hidden || reduced) return;
    $$('.slider').forEach(s => {
      const run = s.classList.contains('in-view') && !s.classList.contains('hold') && Number(s.dataset.n) > 1;
      s.classList.toggle('paused', !run);
      if (!run) return;
      s._t = (s._t || 0) + 200;
      if (s._t >= (s._dur || SL_TIME)) slideTo(s, (s._i || 0) + 1);
    });
  }, 200);

  function cardHTML(m, i) {
    const d = L(m);
    const media = sliderHTML(m) + (m.images.length ? `<span class="media-badge">${esc(t('mods.photo'))}</span>` : '');
    return `<article class="card" id="modul-${esc(m.slug)}" style="--d:${(i % 3) * 90}ms" data-id="${m.id}">
      <div class="card-media">${media}${m.page ? `<span class="media-badge doc">${esc(t('mods.docsBadge'))}</span>` : ''}<span class="media-no">${String(MODULES.indexOf(m) + 1).padStart(2, '0')} / ${String(MODULES.length).padStart(2, '0')}</span></div>
      <div class="card-body"><span class="pill">${icon(m.icon)}${esc(d.tag)}</span><h3>${esc(d.title)}</h3><p class="card-desc">${esc(d.intro)}</p>
      <div class="card-foot">${m.page ? `<a class="card-open" href="${esc(pageUrl(m))}">${esc(t('mods.docs'))}</a>` : `<button type="button" class="card-open" data-open="${m.id}">${esc(t('mods.open'))}</button>`}<span class="card-arrow" aria-hidden="true">→</span></div></div></article>`;
  }
  let renderTimer;
  function renderCards(animateOut = true) {
    const q = search.value.trim();
    const found = MODULES.filter(m => matches(m, q));
    animateNumber(counter, Number(counter.textContent) || 0, found.length, 400);
    const paint = () => {
      grid.innerHTML = found.length ? found.map(cardHTML).join('')
        : `<div class="empty"><p>${esc(t('mods.empty'))}</p><button type="button" id="reset-filters">${esc(t('mods.reset'))}</button></div>`;
      $$('.card', grid).forEach(c => cardObserver ? cardObserver.observe(c) : c.classList.add('in'));
      watchVis(grid);
      watchSliders(grid);
    };
    clearTimeout(renderTimer);
    const old = $$('.card', grid);
    if (animateOut && old.length && !reduced) { old.forEach(c => c.classList.add('leaving')); renderTimer = setTimeout(paint, 220); }
    else paint();
  }
  const cardObserver = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); cardObserver.unobserve(e.target); }
  }), { threshold: .08, rootMargin: '0px 0px -40px 0px' }) : null;

  // Kartica: spotlight koji prati kursor, slajder staje dok je miš na kartici
  grid.addEventListener('pointermove', e => {
    const c = e.target.closest('.card'); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', `${e.clientX - r.left}px`); c.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
  grid.addEventListener('pointerover', e => { if (e.pointerType === 'mouse') e.target.closest('.card')?.querySelector('.slider')?.classList.add('hold'); });
  grid.addEventListener('pointerout', e => { const c = e.target.closest('.card'); if (c && !c.contains(e.relatedTarget)) c.querySelector('.slider')?.classList.remove('hold'); });
  // prevlačenje prstom na telefonu
  let swipeX = null, swipeAt = 0;
  grid.addEventListener('touchstart', e => { swipeX = e.target.closest('.slider') ? e.touches[0].clientX : null; }, { passive: true });
  grid.addEventListener('touchend', e => {
    if (swipeX === null) return;
    const dx = e.changedTouches[0].clientX - swipeX, sl = e.target.closest('.slider'); swipeX = null;
    if (sl && Math.abs(dx) > 40) { slideTo(sl, sl._i + (dx < 0 ? 1 : -1)); swipeAt = Date.now(); }
  }, { passive: true });
  grid.addEventListener('click', e => {
    if (e.target.closest('#reset-filters')) { search.value = ''; activeCat = 'all'; buildFilters(); renderCards(); return; }
    const ctl = e.target.closest('[data-sl],[data-go]');
    if (ctl) { const sl = ctl.closest('.slider'); slideTo(sl, ctl.dataset.go !== undefined ? Number(ctl.dataset.go) : sl._i + Number(ctl.dataset.sl)); return; }
    if (Date.now() - swipeAt < 400) return;
    if (e.target.closest('a.card-open')) return;
    const c = e.target.closest('.card'); if (!c) return;
    const m = MODULES.find(x => x.id === Number(c.dataset.id));
    if (m.page) { location.href = pageUrl(m); return; }
    openModal(m.id, c);
  });
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('[data-filter]'); if (!b || b.dataset.filter === activeCat) return;
    activeCat = b.dataset.filter;
    $$('.filter').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderCards();
  });
  let searchTimer;
  search.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(renderCards, 160); });

  /* ---------- 5. MODAL I LIGHTBOX ---------- */
  const modal = $('#details'), panel = $('.modal-panel', modal), content = $('#modal-content');
  let currentId = null, lastFocus = null, visible = [];

  function fillModal(id) {
    const m = MODULES.find(x => x.id === id); if (!m) return;
    const d = L(m);
    const hero = m.images.length && !m.visualFirst ? `<img src="${esc(m.images[0].src)}" alt="${esc(alt(m.images[0]))}" style="${imgStyle(m.images[0])}">` : visual(m);
    const gallery = m.images.length > 1 ? `<section class="m-gallery"><h3>${esc(t('modal.gallery'))}</h3><div class="m-thumbs">${m.images.map((img, k) => `<button type="button" data-lb="${k}" aria-label="${esc(alt(img))}"><img src="${esc(img.src)}" alt="" loading="lazy" style="${imgStyle(img)}"></button>`).join('')}</div></section>` : '';
    const video = /^https:\/\/(www\.)?(youtube\.com|youtu\.be|vimeo\.com)\//i.test(m.videoUrl || '') || /\.mp4$/i.test(m.videoUrl || '')
      ? `<a class="btn btn-ghost" href="${esc(m.videoUrl)}" target="_blank" rel="noopener">▶ ${esc(t('modal.video'))}</a>` : '';
    const demo = /^https:\/\//i.test(m.demoUrl || '') ? `<a class="btn btn-ghost" href="${esc(m.demoUrl)}" target="_blank" rel="noopener">${esc(t('modal.demo'))} ↗</a>` : '';
    const feats = d.features?.length ? `<section class="m-features"><h3>${esc(t('modal.features'))}</h3><div class="m-feat-grid">${d.features.map((f, k) => `<div class="m-feat"><span class="mf-n">${String(k + 1).padStart(2, '0')}</span><strong>${esc(f.title)}</strong><p>${esc(f.text)}</p></div>`).join('')}</div></section>` : '';
    const qr = m.qr ? `<section class="m-qr"><div class="m-qr-code"><img src="${esc(m.qr)}" alt="${esc(t('modal.qrAlt'))}" width="200" height="200"></div><div><span class="eyebrow">${esc(t('modal.qrEyebrow'))}</span><h3>${esc(t('modal.qrTitle'))}</h3><p>${esc(t('modal.qrText'))}</p>${m.demoUrl ? `<a class="btn btn-ghost btn-sm" href="${esc(m.demoUrl)}" target="_blank" rel="noopener">${esc(m.demoUrl.replace('https://', ''))} ↗</a>` : ''}</div></section>` : '';
    content.innerHTML = `
      <div class="m-hero${m.images.length && !m.visualFirst ? '' : ' has-vis'}">${hero}</div>
      <div class="m-head stagger"><span class="eyebrow">${esc([...new Set([t('categories.' + m.category), d.tag])].join(' · '))}</span><h2 id="modal-title">${esc(d.title)}</h2><p>${esc(d.intro)}</p></div>
      <div class="m-body stagger">
        <div class="m-cols"><section class="m-box"><h3>${esc(t('modal.purpose'))}</h3><p>${esc(d.purpose)}</p></section>
        <section class="m-box"><h3>${esc(t('modal.gains'))}</h3><ul>${d.gains.map(g => `<li>${esc(g)}</li>`).join('')}</ul></section></div>
        <div class="m-benefits">${d.benefits.map(b => `<div class="m-ben"><strong>${esc(b.title)}</strong><p>${esc(b.text)}</p></div>`).join('')}</div>
        <section class="m-example"><h3>${esc(t('modal.example'))}</h3><p>${esc(d.example)}</p></section>
        ${feats}${qr}${gallery}
        <div class="m-actions"><a class="btn btn-red" href="#kontakt" data-inquiry="${esc(d.title)}">${esc(t('modal.activate'))} <span class="arr" aria-hidden="true">↗</span></a>${demo}${video}<button type="button" class="btn btn-ghost" data-close>${esc(t('modal.back'))}</button></div>
      </div>`;
    watchVis(content);
  }

  function openModal(id, fromEl) {
    lastFocus = document.activeElement;
    visible = $$('.card', grid).map(c => Number(c.dataset.id));
    if (!visible.includes(id)) visible = MODULES.map(m => m.id);
    currentId = id; fillModal(id);
    // Panel "izlazi" iz kartice na koju je kliknuto
    if (fromEl && !reduced) {
      const r = fromEl.getBoundingClientRect();
      panel.style.setProperty('--fx', `${r.left + r.width / 2 - innerWidth / 2}px`);
      panel.style.setProperty('--fy', `${r.top + r.height / 2 - innerHeight / 2}px`);
    } else { panel.style.removeProperty('--fx'); panel.style.removeProperty('--fy'); }
    modal.hidden = false; panel.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));
    panel.focus({ preventScroll: true });
    const m = MODULES.find(x => x.id === id);
    history.replaceState(null, '', `${location.search}#modul-${m.slug}`);
  }
  function closeModal() {
    if (modal.hidden) return;
    modal.classList.remove('open');
    setTimeout(() => { modal.hidden = true; content.innerHTML = ''; }, reduced ? 0 : 450);
    document.documentElement.style.overflow = '';
    currentId = null;
    history.replaceState(null, '', location.pathname + location.search);
    lastFocus?.focus?.({ preventScroll: true });
  }
  function stepModal(dir) {
    const i = visible.indexOf(currentId); if (i < 0) return;
    const next = visible[(i + dir + visible.length) % visible.length];
    content.style.setProperty('--sx', `${dir * 30}px`);
    content.classList.add('swap');
    setTimeout(() => {
      currentId = next; fillModal(next); panel.scrollTop = 0;
      content.style.setProperty('--sx', `${-dir * 30}px`);
      requestAnimationFrame(() => content.classList.remove('swap'));
      history.replaceState(null, '', `${location.search}#modul-${MODULES.find(x => x.id === next).slug}`);
    }, 250);
  }
  modal.addEventListener('click', e => {
    if (e.target.closest('[data-close]')) return closeModal();
    const inq = e.target.closest('[data-inquiry]');
    if (inq) { e.preventDefault(); const title = inq.dataset.inquiry; closeModal(); setTimeout(() => prefillForm(title), reduced ? 0 : 350); return; }
    const lb = e.target.closest('[data-lb]');
    if (lb) { const m = MODULES.find(x => x.id === currentId); openLightbox(m.images.map(img => ({ src: img.full || img.src, cap: alt(img) })), Number(lb.dataset.lb)); }
    const heroImg = e.target.closest('.m-hero>img');
    if (heroImg) { const m = MODULES.find(x => x.id === currentId); openLightbox(m.images.map(img => ({ src: img.full || img.src, cap: alt(img) })), 0); }
  });
  $('#modal-prev').addEventListener('click', () => stepModal(-1));
  $('#modal-next').addEventListener('click', () => stepModal(1));

  // Fokus ostaje unutar otvorenog dijaloga
  function trapFocus(e, root) {
    const f = $$('a[href],button:not([disabled]),input,[tabindex]:not([tabindex="-1"])', root).filter(x => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  const lb = $('#lightbox'), lbImg = $('#lb-img'), lbCap = $('#lb-cap');
  let lbList = [], lbIndex = 0, lbFocus = null;
  function showLb(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    lbImg.classList.add('fade');
    setTimeout(() => { lbImg.src = lbList[lbIndex].src; lbImg.alt = lbList[lbIndex].cap; lbCap.textContent = lbList[lbIndex].cap; lbImg.classList.remove('fade'); }, 150);
    $('#lb-prev').hidden = $('#lb-next').hidden = lbList.length < 2;
  }
  function openLightbox(list, i = 0) {
    lbFocus = document.activeElement; lbList = list;
    lbImg.src = list[i].src; lbImg.alt = list[i].cap; lbCap.textContent = list[i].cap; lbIndex = i;
    $('#lb-prev').hidden = $('#lb-next').hidden = list.length < 2;
    lb.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('open')));
    $('#lb-close').focus();
  }
  function closeLightbox() {
    lb.classList.remove('open');
    setTimeout(() => { lb.hidden = true; lbImg.src = ''; }, 300);
    lbFocus?.focus?.();
  }
  $('#lb-close').addEventListener('click', closeLightbox);
  $('#lb-prev').addEventListener('click', () => showLb(lbIndex - 1));
  $('#lb-next').addEventListener('click', () => showLb(lbIndex + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  let touchX = null;
  lb.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => { if (touchX === null) return; const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1)); touchX = null; });

  document.addEventListener('keydown', e => {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') showLb(lbIndex + 1);
      else if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
      else if (e.key === 'Tab') trapFocus(e, lb);
      return;
    }
    if (!modal.hidden) {
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight' && !e.target.matches('input')) stepModal(1);
      else if (e.key === 'ArrowLeft' && !e.target.matches('input')) stepModal(-1);
      else if (e.key === 'Tab') trapFocus(e, panel);
    }
  });

  /* ---------- 6. SHOWCASE, SCROLL EFEKTI, SITNICE ---------- */
  // "U akciji": svaki tab prikazuje sve pojedinačne ekrane svog modula kao slajdove
  const SHOW_SLUGS = ['kasa', 'order-display', 'order-status-display', 'qr-web-ordering', 'mobile-business-overview', 'backoffice'];
  let renderShow = () => {};
  function showcase() {
    const sec = $('.showcase'), tabs = $$('.show-tab'), stage = $('#show-stage');
    const IMG_T = 3500, VIS_T = 9000; let tab = 0, img = 0, timer = null, inView = false, mod = null, items = [];
    const dur = k => (items[k] && items[k].visual ? VIS_T : IMG_T);
    const show = k => {
      img = k;
      stage.style.setProperty('--sl-time', `${dur(k)}ms`);
      $$('.slide', stage).forEach((x, j) => x.classList.toggle('active', j === k));
      $$('.sl-dot', stage).forEach((x, j) => { x.classList.remove('on'); if (j === k) { void x.offsetWidth; x.classList.add('on'); } });
      schedule();
    };
    renderShow = () => {
      mod = MODULES.find(x => x.slug === SHOW_SLUGS[tab]);
      const ims = mod.show || mod.images; items = ims;
      stage.innerHTML = ims.map((im, k) => im.visual
          ? `<div class="slide is-vis${k ? '' : ' active'}" data-k="${k}">${visual(mod)}</div>`
          : `<button type="button" class="slide${k ? '' : ' active'}${im.fit === 'contain' ? ' fit' : ''}" data-k="${k}" style="${im.bg ? `background:${im.bg}` : ''}" aria-label="${esc(t('show.zoom'))}"><img src="${esc(im.src)}" alt="${esc(alt(im))}" decoding="async" style="${imgStyle(im)}${im.bg ? `;background:${im.bg}` : ''}"></button>`).join('')
        + (ims.length > 1 ? `<div class="sl-dots">${ims.map((_, k) => `<button type="button" class="sl-dot${k ? '' : ' on'}" data-go="${k}" aria-label="${k + 1} / ${ims.length}"></button>`).join('')}</div>` : '')
        + '<span class="zoom-hint" aria-hidden="true">⤢</span>';
      watchVis(stage);
      stage.style.setProperty('--sl-time', `${dur(0)}ms`);
      sec.style.setProperty('--slide-time', `${ims.reduce((a, _, k) => a + dur(k), 0)}ms`);
      tabs.forEach((tb, k) => { tb.classList.toggle('active', k === tab); tb.setAttribute('aria-selected', String(k === tab)); });
      const bar = tabs[tab].querySelector('.st-bar'); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
      img = 0; schedule();
    };
    const next = () => { if (img + 1 < items.length) show(img + 1); else { tab = (tab + 1) % tabs.length; renderShow(); } };
    const schedule = () => { clearTimeout(timer); if (inView && !reduced && !sec.classList.contains('paused')) timer = setTimeout(next, dur(img)); };
    tabs.forEach((tb, k) => tb.addEventListener('click', () => { tab = k; renderShow(); }));
    stage.addEventListener('click', e => {
      const d = e.target.closest('[data-go]'); if (d) { show(Number(d.dataset.go)); return; }
      const sl = e.target.closest('button.slide'); if (!sl) return; const pics = items.filter(x => !x.visual); openLightbox(pics.map(im => ({ src: im.full || im.src, cap: alt(im) })), pics.indexOf(items[Number(sl.dataset.k)]));
    });
    const frame = $('.stage-frame');
    frame.addEventListener('pointerenter', () => { sec.classList.add('paused'); clearTimeout(timer); });
    frame.addEventListener('pointerleave', () => { sec.classList.remove('paused'); schedule(); });
    let tx = null;
    frame.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    frame.addEventListener('touchend', e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null; if (Math.abs(dx) > 40) show((img + (dx < 0 ? 1 : -1) + items.length) % items.length); }, { passive: true });
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; inView ? schedule() : clearTimeout(timer); }, { threshold: .3 }).observe(sec);
    renderShow();
  }

  // brojač prometa u kartici analitike
  setInterval(() => {
    $$('[data-fx-count]').forEach(el => {
      if (!el.closest('.card.in')) return;
      const from = Number(el.dataset.v || el.dataset.fxCount), to = from + 300 + Math.round(Math.random() * 15) * 100;
      el.dataset.v = to; animateNumber(el, from, to, 900);
    });
  }, 2600);

  function marqueeItems() { return MODULES.map(m => `<span>${esc(L(m).title)}</span>`).join(''); }
  function buildMarquee() { const m = $('#marquee'); if (m) m.innerHTML = marqueeItems() + marqueeItems(); }

  function orbit() {
    $$('.io-ring').forEach(ring => {
      const items = $$('span', ring), n = items.length;
      items.forEach((s, i) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2; s.style.left = `${50 + 50 * Math.cos(a)}%`; s.style.top = `${50 + 50 * Math.sin(a)}%`; });
    });
  }

  function scrollFx() {
    const header = $('#header'), bar = $('#progress');
    let ticking = false;
    const onScroll = () => {
      const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
      header.classList.toggle('scrolled', y > 10);
      bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    // Aktivni link u navigaciji
    const links = $$('.nav-links a');
    const secObs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(a => { const s = $(a.getAttribute('href')); if (s) secObs.observe(s); });

    // Reveal pri skrolovanju
    const rev = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); }
    }), { threshold: .14, rootMargin: '0px 0px -60px 0px' });
    $$('.reveal').forEach(el => rev.observe(el));
    const steps = $('.steps'); rev.observe(steps);
  }

  function counters() {
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, to = Number(el.dataset.count);
      animateNumber(el, 1, to, 750); obs.unobserve(el);
    }), { threshold: .6 });
    $$('[data-count]').forEach(el => obs.observe(el));
  }

  function pointerFx() {
    if (reduced || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
    // 3D nagib hero table prati miša
    const art = $('#hero-art'), board = $('.board');
    art?.addEventListener('pointermove', e => {
      const r = art.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      board.style.transform = `rotateY(${-10 + x * 12}deg) rotateX(${6 - y * 10}deg)`;
    });
    art?.addEventListener('pointerleave', () => { board.style.transform = ''; });
  }

  function mobileMenu() {
    const btn = $('#menu-btn'), nav = $('#nav-links');
    const set = open => { btn.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
    document.addEventListener('click', e => { if (!e.target.closest('.nav') && nav.classList.contains('open')) set(false); });
  }

  // FAQ: zatvori ostale kada se jedno pitanje otvori
  function faq() {
    $$('.faq-list details').forEach(d => d.addEventListener('toggle', () => { if (d.open) $$('.faq-list details').forEach(o => { if (o !== d) o.open = false; }); }));
  }

  // Dugme "na vrh" sa prstenom koji prikazuje koliko je stranice pređeno
  function toTop() {
    const btn = $('#to-top'); if (!btn) return;
    const ring = $('.tt-ring circle', btn), C = 2 * Math.PI * 22;
    ring.style.strokeDasharray = C;
    let ticking = false;
    const upd = () => {
      const h = document.documentElement.scrollHeight - innerHeight, p = h > 0 ? scrollY / h : 0;
      ring.style.strokeDashoffset = C * (1 - p);
      btn.classList.toggle('show', scrollY > innerHeight * .6);
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    btn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
    upd();
  }

  /* ---------- KONTAKT FORMA ----------
     Statičan sajt -> fetch POST (JSON) na CONFIG.formEndpoint (podešava se u config.js).
     Ako endpoint nije podešen, forma otvara mail klijent sa popunjenom porukom (mailto). */
  const CONFIG = Object.assign({ formEndpoint: '', formAccessKey: '', contactEmail: 'podrska@octopos.rs' }, window.OCTOPOS_CONFIG || {});
  function prefillForm(title) {
    const msg = $('#f-message'), sec = $('#kontakt');
    if (msg && !msg.value.trim()) msg.value = t('form.prefill') + title + '.';
    sec?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    setTimeout(() => $('#f-name')?.focus({ preventScroll: true }), reduced ? 0 : 700);
  }
  function form() {
    const f = $('#contact-form'); if (!f) return;
    const status = $('#form-status'), btn = $('button[type="submit"]', f);
    const setStatus = (type, key) => { status.className = 'form-status ' + type; status.textContent = t(key); };
    f.addEventListener('submit', async e => {
      e.preventDefault();
      if (f.elements.company.value) return; // honeypot: botovi popunjavaju skriveno polje
      let ok = true;
      $$('[required]', f).forEach(el => {
        const valid = el.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) : el.value.trim().length > 1;
        el.closest('.field').classList.toggle('invalid', !valid);
        el.setAttribute('aria-invalid', String(!valid));
        if (!valid && ok) { el.focus({ preventScroll: true }); el.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' }); ok = false; }
      });
      if (!ok) return setStatus('err', 'form.invalid');
      const E = f.elements;
      const data = { name: E.name.value.trim(), surname: E.surname.value.trim(), email: E.email.value.trim(), message: E.message.value.trim(), language: lang, page: location.href };
      if (!CONFIG.formEndpoint) {
        const body = `${data.message}\n\n${data.name} ${data.surname}\n${data.email}`;
        location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(t('cta.subject') + ' - ' + data.name + ' ' + data.surname)}&body=${encodeURIComponent(body)}`;
        return setStatus('ok', 'form.mailto');
      }
      btn.disabled = true; f.classList.add('sending'); setStatus('', 'form.sending');
      try {
        const payload = Object.assign({ subject: `${t('cta.subject')} - ${data.name} ${data.surname}`, from_name: `${data.name} ${data.surname}`, replyto: data.email }, data);
        if (CONFIG.formAccessKey) payload.access_key = CONFIG.formAccessKey;
        const res = await fetch(CONFIG.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) throw new Error(String(res.status));
        f.reset(); setStatus('ok', 'form.sent');
      } catch {
        setStatus('err', 'form.error');
      } finally { btn.disabled = false; f.classList.remove('sending'); }
    });
    f.addEventListener('input', e => { const fl = e.target.closest('.field'); if (fl?.classList.contains('invalid')) { fl.classList.remove('invalid'); e.target.removeAttribute('aria-invalid'); } });
  }

  /* ---------- 7. POKRETANJE ---------- */
  // Na osvežavanje (F5) stranica uvek kreće od vrha, bez skoka na #sidro ili otvorenog modula
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const navEntry = performance.getEntriesByType?.('navigation')?.[0];
  const isReload = navEntry ? navEntry.type === 'reload' : false;
  if (isReload && (location.hash || params.has('inquiry'))) {
    params.delete('inquiry');
    history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : ''));
  }
  const toTopNow = () => scrollTo({ top: 0, left: 0, behavior: 'instant' });
  if (isReload || !location.hash) { toTopNow(); addEventListener('load', toTopNow, { once: true }); }

  function init() {
    $('#year').textContent = new Date().getFullYear();
    applyI18n();
    buildFilters();
    renderCards(false);
    buildMarquee();
    heroBoard();
    showcase();
    orbit();
    scrollFx();
    counters();
    pointerFx();
    mobileMenu();
    faq();
    toTop();
    form();
    $$('[data-inquiry-api]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); prefillForm('API demo token'); }));
    $$('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));

    // Intro zavesa, pa ulazna animacija hero dela
    const intro = $('#intro');
    const start = () => { intro.classList.add('done'); document.documentElement.classList.add('loaded'); };
    if (reduced) start(); else setTimeout(start, 850);

    // Direktan link ka modulu: promo.octopos.rs/#modul-kiosk
    // Dolazak sa API stranice: index.html?inquiry=api#kontakt
    if (params.get('inquiry') === 'api') setTimeout(() => prefillForm('API konektor (demo token)'), reduced ? 0 : 1100);

    const slug = location.hash.startsWith('#modul-') ? location.hash.slice(7) : null;
    const m = slug && MODULES.find(x => x.slug === slug);
    if (m) setTimeout(() => openModal(m.id), reduced ? 0 : 1200);
  }
  init();
})();


/* Recommendations based on existing Octopos modules; no separate catalog */
(() => {
  const combos = {
    restaurant:['kasa','android-ordering-payment','qr-web-ordering','kiosk','order-display','backoffice'],
    fastfood:['kiosk','qr-web-ordering','android-ordering-payment','kasa','order-display','order-status-display'],
    cafe:['android-ordering-payment','qr-web-ordering','kiosk','kasa','order-display','mobile-business-overview'],
    retail:['kasa','backoffice','api-connector','mobile-business-overview'],
    hotel:['android-ordering-payment','qr-web-ordering','kiosk','kasa','hotel-pms-connection','backoffice']
  };
  const picker=document.getElementById('rec-picker'), grid=document.getElementById('rec-cards');
  if(!picker || !grid)return;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let active='restaurant';
  const locale=()=>document.documentElement.lang==='en'?'en':'sr';
  const t=k=>(window.OCTOPOS_I18N?.[locale()]?.[k] || window.OCTOPOS_I18N?.sr?.[k] || k);
  function draw(){
    const l=locale();const mods=window.OCTOPOS_MODULES||[];
    document.getElementById('rec-result-title').textContent=t('rec.'+active);
    document.getElementById('rec-result-desc').textContent=t('rec.'+active+'.desc');
    document.getElementById('rec-total').textContent=combos[active].length;
    grid.innerHTML=combos[active].map((slug,i)=>{
      const m=mods.find(x=>x.slug===slug); if(!m)return '';
      const v=m[l]||m.sr;
      const href=m.page ? m.page+(l==='en'?'?lang=en':'') : '#modul-'+encodeURIComponent(m.slug);
      const label=esc(t('rec.module'));const featured=['kiosk','android-ordering-payment','qr-web-ordering'].includes(slug);
      return `<a class="rec-module${featured?' rec-module-featured':''}" href="${href}" style="--ri:${i}"><span class="rec-index">${String(i+1).padStart(2,'0')}</span><span class="rec-module-body"><strong>${esc(v.title)}</strong>${featured?`<span class="rec-featured-label">${esc(t('rec.priority'))}</span>`:''}<small>${esc(v.intro)}</small><em>${label} <span aria-hidden="true">↗</span></em></span></a>`;
    }).join('');
  }
  grid.addEventListener('click',e=>{
    const a=e.target.closest('a.rec-module');if(!a || !a.hash.startsWith('#modul-'))return;
    e.preventDefault();
    const slug=decodeURIComponent(a.hash.slice(7));
    function openExisting(){const card=document.getElementById('modul-'+slug);if(card)card.click();}
    if(document.getElementById('modul-'+slug))return openExisting();
    const search=document.getElementById('search');if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));}
    const all=document.querySelector('[data-filter=all]');if(all)all.click();
    setTimeout(openExisting,500);
  });
  picker.addEventListener('click',e=>{const b=e.target.closest('[data-rec]');if(!b)return;active=b.dataset.rec;picker.querySelectorAll('[data-rec]').forEach(x=>{let yes=x===b;x.classList.toggle('is-active',yes);x.setAttribute('aria-pressed',String(yes));});draw()});
  // Language toggle in the existing site runs asynchronously; redraw afterwards.
  const ob=new MutationObserver(draw);ob.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  draw();
})();

/* Promotional module links use the existing catalog modal. */
(() => {
  document.querySelectorAll('[data-module-link]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const slug = link.dataset.moduleLink;
    function show() { const card = document.getElementById('modul-'+slug); if(card) card.click(); }
    const card=document.getElementById('modul-'+slug);
    if(card) return show();
    const search=document.getElementById('search');if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));}
    const all=document.querySelector('[data-filter=all]');if(all)all.click();
    setTimeout(show,450);
  }));
})();
