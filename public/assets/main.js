// Leiblein + Kollegen: Header, Mobile-Menü, Slider, Einblendungen, Bewegung
// Einheitlicher Auslöser für alle Einblendungen beim Scrollen: erst, wenn die Oberkante ~20 % über dem unteren Fensterrand ist –
// so sieht man die Animation, statt dass sie am Rand schon vorbei ist. Sofort nur im ersten Bildschirm (Seitenkopf);
// alles darunter immer über denselben Auslöser – sonst hinge es von Fensterhöhe/Scrollstand ab, ob man die Animation sieht.
window.LK_REVEAL = { threshold: 0, rootMargin: '0px 0px -20% 0px' };
// Beim Laden schon sichtbare Elemente unterhalb des Seitenkopfs starten kurz nach dem Kopf (0,7 s) – kein leerer Streifen unten,
// und man sieht die Einblendung, statt dass sie gleichzeitig mit dem Kopf unbemerkt abläuft.
window.lkInView = (el) => { const r = el.getBoundingClientRect(); return !window.lkScrolled && r.top < innerHeight && r.bottom > 0; };
window.lkObserve = (io, el, fire) => {
  if (!window.lkInView(el)) { io.observe(el); return; }
  // erst nach dem ersten Zeichnen auslösen, sonst gibt es keinen Ausgangszustand und der Übergang entfällt
  if (el.closest('main > :first-child')) requestAnimationFrame(() => requestAnimationFrame(() => fire(el))); else setTimeout(() => fire(el), 700);
};
window.lkScrolled = false;
addEventListener('scroll', () => { window.lkScrolled = true; }, { passive: true, once: true });
// Neu laden mitten auf der Seite: der Browser springt an die alte Position zurück. Was dann im Bild (oder darüber) ist,
// soll sofort dastehen – nicht verschwinden und neu einblenden.
(() => {
  let user = false;
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((t) => addEventListener(t, () => { user = true; }, { passive: true, once: true }));
  const settle = () => {
    if (user || scrollY < 10) return;
    const root = document.documentElement;
    root.classList.add('lk-instant');
    const inView = (el) => el.getBoundingClientRect().top < innerHeight;
    document.querySelectorAll('.reveal').forEach((el) => { if (inView(getComputedStyle(el).display === 'contents' ? el.parentElement : el)) el.classList.add('is-visible'); });
    document.querySelectorAll('.sr').forEach((el) => { if (inView(el)) el.classList.add('sr-in'); });
    document.querySelectorAll('.sr-img, .sr-host').forEach((el) => { if (inView(el)) el.classList.add('sr-in'); });
    root.classList.add('lk-restored');  // Animationen des Seitenkopfs (z. B. mitlaufende Seitenleiste im Beitrag) nicht erneut abspielen
    document.querySelectorAll('.hero-d__claim, .d-title, .art__head h1').forEach((el) => { if (inView(el)) el.classList.add('lines-in'); });
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('lk-instant')));
  };
  addEventListener('load', () => { settle(); setTimeout(settle, 60); setTimeout(settle, 250); });
})();
(function () {
  const header = document.querySelector('.header');
  // Kopfzeile wechselt in den fixierten Zustand genau dann, wenn die Topbar vollständig aus dem Bild gescrollt ist
  // Startposition der Kopfzeile im Dokument (= Höhe von allem darüber, also der Topbar), bei Resize neu messen
  let stickAt = 0;
  const measure = () => {
    if (!header) return;
    const was = header.classList.contains('is-scrolled'); header.classList.remove('is-scrolled');
    const prev = header.style.position; header.style.position = 'relative';
    stickAt = Math.round(header.getBoundingClientRect().top + window.scrollY);
    header.style.position = prev; header.classList.toggle('is-scrolled', was);
  };
  const narrow = matchMedia('(max-width: 767px)');
  const onScroll = () => {
    if (!header) return;
    // bis 767px ist der Header immer im kompakten, fixierten Zustand
    header.classList.toggle('is-scrolled', narrow.matches || (stickAt ? window.scrollY >= stickAt : window.scrollY > 0));
  };
  measure();
  window.addEventListener('resize', () => { measure(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive: true });
  narrow.addEventListener('change', onScroll); onScroll();
  // Liegt der Header über einer dunklen Fläche, wird er deckend (sonst schimmert das Dunkel durch das Glas)
  const isDark = (el) => {
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const m = getComputedStyle(e).backgroundColor.match(/[\d.]+/g);
      if (m && (m[3] === undefined || +m[3] > .5)) return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) < 110;
    }
    return false;
  };
  let tick = false;
  const checkDark = () => {
    tick = false;
    if (!header) return;
    const y = Math.round(header.getBoundingClientRect().bottom) + 1;
    const under = document.elementsFromPoint(innerWidth / 2, y).find((e) => !header.contains(e) && !e.closest('.mobile-nav, .rail, .cookie'));
    // maßgeblich ist der Hintergrund der Sektion (nicht helle Karten darin)
    const sec = under && under.closest('section, footer, .footer');
    header.classList.toggle('on-dark', !!sec && isDark(sec));
  };
  const queueDark = () => { if (!tick) { tick = true; requestAnimationFrame(checkDark); } };
  window.addEventListener('scroll', queueDark, { passive: true });
  window.addEventListener('resize', queueDark);
  queueDark();
  onScroll();

  // Sprungmarken (z. B. „Branchen“ → /#branchen) wie bei Ahlhoff: 700 ms mit „swing“-Kurve, der Abschnitt endet genau
  // an der Unterkante der fixierten Kopfzeile (deren Höhe wird jedes Bild neu gemessen, sie schrumpft beim Scrollen).
  // Die Adresse bleibt unverändert, daher scrollt ein erneuter Klick wieder. Mausrad/Touch/Taste brechen ab, „weniger Bewegung“ springt.
  // Ziele können --anchor-top (fester Abstand von oben, z. B. bündig mit dem Inhaltsverzeichnis) oder --anchor-gap setzen.
  const OFFSET = 10;
  const DURATION = 700;
  const swing = (p) => 0.5 - Math.cos(p * Math.PI) / 2;
  let frame = 0;
  const stopScroll = () => cancelAnimationFrame(frame);
  const destination = (target) => {
    const cs = getComputedStyle(target);
    const top = target.getBoundingClientRect().top + window.scrollY;
    const fixedTop = parseFloat(cs.getPropertyValue('--anchor-top'));
    const gap = parseFloat(cs.getPropertyValue('--anchor-gap'));
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const y = !Number.isNaN(fixedTop) ? top - fixedTop : top - headerH + (Number.isNaN(gap) ? OFFSET : -gap);
    return Math.max(0, Math.min(y, document.documentElement.scrollHeight - innerHeight));
  };
  const scrollToTarget = (target, animate) => {
    stopScroll();
    if (!animate || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: destination(target), behavior: 'instant' });
      // die Kopfzeile schrumpft erst nach dem Sprung → zweimal nachmessen
      [60, 260].forEach((ms) => setTimeout(() => window.scrollTo({ top: destination(target), behavior: 'instant' }), ms));
      return;
    }
    const from = window.scrollY;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / DURATION, 1);
      window.scrollTo({ top: from + (destination(target) - from) * swing(p), behavior: 'instant' });
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  };
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('data-cookie-settings')) return;
    const url = new URL(a.href, location.href);
    if (!url.hash || url.hash === '#main' || url.pathname !== location.pathname || url.search !== location.search) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target, true);
  }, true);
  ['wheel', 'touchstart', 'keydown'].forEach((ev) => window.addEventListener(ev, stopScroll, { passive: true }));
  // Von einer anderen Seite mit #Sprungmarke geöffnet (z. B. /#branchen aus dem Footer): nach dem Laden genau unter die Kopfzeile setzen
  if (location.hash && location.hash !== '#main') {
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) addEventListener('load', () => scrollToTarget(target, false), { once: true });
  }

  // Mobile-Menü
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      // Menü direkt unter der tatsächlichen Header-Unterkante öffnen (über dem Header kann noch die Info-Leiste stehen)
      if (open) mobileNav.style.top = Math.round(document.querySelector('.header').getBoundingClientRect().bottom) + 'px';
      mobileNav.classList.toggle('is-open', open);
      document.querySelector('.header').classList.toggle('is-menu-open', open);
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  // Runde Avatare (Stimmen, Team, Kontakt): nicht geladen → ruhiger hellblauer Kreis statt Browser-Symbol
  const blankAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Crect width='10' height='10' fill='%23eef8fa'/%3E%3C/svg%3E";
  document.querySelectorAll('.stimme__av, .team-row__faces img, .faq-d__av').forEach((img) => {
    const swap = () => { img.closest('picture')?.querySelectorAll('source').forEach((s) => s.remove()); img.src = blankAvatar; img.removeAttribute('srcset'); };
    if (img.complete && img.naturalWidth === 0) swap(); else img.addEventListener('error', swap, { once: true });
  });
  // DATEV-Label nicht geladen → Bild weglassen, der Text daneben bleibt
  document.querySelectorAll('.seals-d__datev img, .datev-badge img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) img.remove(); else img.addEventListener('error', () => img.remove(), { once: true });
  });
  // Bild nicht geladen: kaputtes Bild entfernen und dem Rahmen „is-broken“ geben → zeigt das Logo als Wasserzeichen statt des Browser-Symbols
  document.querySelectorAll('.ph img, .wissen .post > picture img, .final-d__ph img').forEach((img) => {
    const box = img.closest('.ph, picture.ph, .wissen .post > picture, .final-d__ph') || img.parentElement;
    const drop = () => {
      const holder = img.closest('.ph, .final-d__ph') || img.closest('picture') || box;
      holder.querySelectorAll('source').forEach((s) => s.remove());
      img.remove();
      holder.classList.add('is-broken');
    };
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener('error', drop);
  });

  // Einblenden beim Scrollen
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, window.LK_REVEAL);
    // Blöcke mit display: contents (z. B. Wissen-Spalte auf dem Handy) haben keine eigene Box – dann den Eltern-Container beobachten
    const boxOf = (el) => (getComputedStyle(el).display === 'contents' ? el.parentElement : el);
    const owner = new Map();
    const io2 = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      (owner.get(e.target) || []).forEach((el) => el.classList.add('is-visible'));
      io2.unobserve(e.target);
    }), window.LK_REVEAL);
    items.forEach((el) => {
      const t = boxOf(el);
      if (t === el) { window.lkObserve(io, el, (x) => x.classList.add('is-visible')); return; }
      owner.set(t, [...(owner.get(t) || []), el]);
      window.lkObserve(io2, t, () => el.classList.add('is-visible'));
    });
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }
})();

// Bewegung: gestaffeltes Einblenden, Zähler, seitliches Laufband
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Raster und Listen gestaffelt einblenden – Startseite und Unterseiten gleich (Einträge nacheinander, nicht als ein Block)
  document.querySelectorAll('.reveal.ind, .reveal.pillars-d, .reveal.plus-d, .reveal.sit, .reveal.posts, .reveal.stimmen, .reveal.founders-d, .reveal.faq, .reveal.aud, .reveal.scope, .reveal.pgrid, .reveal.pidx, .reveal.ctab, .reveal.legal-grid, .reveal.tgrid').forEach((el) => {
    // Ausgangszustand ohne Übergang setzen – sonst blenden schon sichtbare Einträge erst aus und dann wieder ein (Flackern beim Laden)
    [...el.children].forEach((c) => { c.style.transition = 'none'; });
    el.classList.add('stagger');
    void el.offsetWidth;
    [...el.children].forEach((c, i) => { c.style.transition = ''; c.style.transitionDelay = (i * 0.12) + 's'; });
    // Verzögerung nach dem Einblenden entfernen, damit Hover sofort reagiert
    el.addEventListener('transitionend', () => [...el.children].forEach((c) => { c.style.transitionDelay = ''; }), { once: true });
  });

  // Hochzählen der großen Zahlen
  const counters = [...document.querySelectorAll('.plus-d__big')].map((el) => {
    const m = el.firstChild && el.firstChild.nodeType === 3 ? el.firstChild.textContent.match(/^(\d+)/) : null;
    return m ? { el, node: el.firstChild, to: +m[1], rest: el.firstChild.textContent.slice(m[1].length) } : null;
  }).filter(Boolean);
  const run = (c) => {
    if (reduce) return;
    const t0 = performance.now(), d = 1600;
    const tick = (t) => { const p = Math.min(1, (t - t0) / d), e = 1 - Math.pow(1 - p, 3);
      c.node.textContent = Math.round(c.to * e) + c.rest; if (p < 1) requestAnimationFrame(tick); };
    c.node.textContent = '0' + c.rest; requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { const c = counters.find((x) => x.el === e.target); c && run(c); io.unobserve(e.target); } }), { threshold: .5 });
    counters.forEach((c) => io.observe(c.el));
  }

  // Seitliches Laufband + Ring-Rotation (scroll-gekoppelt)
  if (reduce) return;
  const band = document.querySelector('[data-scroll-x]');
  const ring = document.querySelector('.e-arch__ring');
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    if (band) {
      const r = band.parentElement.getBoundingClientRect();
      const p = (vh - r.top) / (vh + r.height);
      band.style.transform = `translateX(${-20 + p * 100 * parseFloat(band.dataset.scrollX) * -1 + 10}%)`;
    }
    if (ring) {
      const r = ring.getBoundingClientRect();
      ring.style.transform = `rotate(${(vh - r.top) * 0.06}deg)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
/* Überschriften zeilenweise einfahren: Wörter maskieren, Zeilen per Position ermitteln, beim Sichtbarwerden starten */
(() => {
  const heads = [...document.querySelectorAll('.hero-d__claim, .d-title, .art__head h1')];
  // Untertitel kommen überall als ganzer Block (CSS, wie „Passt das zu Ihnen?“) – zeilenweise nur die Überschriften
  const leads = [];
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrapWords = (node, soft) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 1) { if (n.tagName !== 'BR') wrapWords(n, soft); return; }
      if (n.nodeType !== 3 || !n.textContent.trim()) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.append(' '); return; }
        if (soft) { const t = document.createElement('span'); t.className = 'lt'; t.textContent = part; frag.append(t); return; }
        const w = document.createElement('span'); w.className = 'lw';
        const i = document.createElement('span'); i.className = 'lw__i'; i.textContent = part;
        w.append(i); frag.append(w);
      });
      n.replaceWith(frag);
    });
  };
  const setLines = (h, base, step, sel) => {
    let top = null, line = -1;
    h.querySelectorAll(sel).forEach((w) => {
      const t = Math.round(w.offsetTop);
      if (top === null || Math.abs(t - top) > 4) { top = t; line++; }
      (sel === '.lw' ? w.firstChild : w).style.setProperty('--ld', (base + line * step).toFixed(2) + 's');
    });
  };
  heads.forEach((h) => wrapWords(h, false));
  leads.forEach((l) => wrapWords(l, true));
  const all = heads.concat(leads);
  if (still) { all.forEach((h) => h.classList.add('lines-in')); return; }
  const layout = () => {
    heads.forEach((h) => setLines(h, h.classList.contains('hero-d__claim') ? 0.15 : 0.08, 0.12, '.lw'));
    leads.forEach((l) => setLines(l, l.closest('.hero-d__content') ? 0.55 : 0.45, 0.07, '.lt'));
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
    layout();
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('lines-in'); io.unobserve(e.target); }
    }), window.LK_REVEAL);
    all.forEach((h) => window.lkObserve(io, h, (x) => x.classList.add('lines-in')));
  });
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 150); });
})();
/* Scroll-Choreografie: Gruppen markieren, Kinder gestaffelt einblenden, sobald die Gruppe sichtbar wird */
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups = [];
  const group = (host, kids, fx, step = 0.1, base = 0) => {
    if (!host) return;
    const list = typeof kids === 'string' ? [...host.querySelectorAll(kids)] : kids;
    // Ausgangszustand ohne Übergang (kein Aus- und wieder Einblenden beim Laden)
    list.forEach((k, i) => { k.style.transition = 'none'; k.classList.add('sr', 'sr--' + fx); k.style.setProperty('--sr-d', (base + i * step).toFixed(2) + 's'); });
    void host.offsetWidth;
    list.forEach((k) => { k.style.transition = ''; });
    groups.push(host);
  };
  const $ = (q) => document.querySelector(q), $$ = (q) => [...document.querySelectorAll(q)];
  // Textspalten, die bisher als ein Block kamen: Kinder einzeln (Überschrift/Lead animieren sich selbst)
  $$('#kanzlei .reveal:not(.founders-d), .flow .reveal:not(.e-arch), .faq-d__side, .final-d, .why-person__txt').forEach((col) => {
    col.classList.add('sr-host');
    group(col, [...col.children].filter((c) => !c.matches('.d-title, .lead, ol, .col-head, .why-person__list')), 'up', 0.12, 0.1);
  });
  // „Warum wir“ (Leistungsseiten): Gründe nacheinander
  $$('.why-person__list').forEach((ul) => group(ul, ':scope > li', 'up', 0.12, 0.2));
  // Ablauf: Schritte nacheinander, Linie zeichnet sich
  const ol = $('.flow ol');
  if (ol) { group(ol, ':scope > li', 'up', 0.16, 0.15); ol.querySelectorAll(':scope > li').forEach((li, i) => li.style.setProperty('--sr-d', (0.15 + i * 0.16).toFixed(2) + 's')); }
  // Chips / Fakten / Vorteile
  $$('.career-d__perks, .ind-card--feature .chips').forEach((ul) => group(ul, ':scope > li', 'soft', 0.06, 0.2));
  $$('.kanzlei-values').forEach((kv) => group(kv, ':scope > p, .kanzlei-values__rows > p', 'soft', 0.06, 0.2));
  // Team-Gesichter: kleine Ploppen
  group($('.team-row__faces'), ':scope > *', 'pop', 0.06, 0.1);
  // Siegel-Leiste
  group($('.seals-d'), '.seals-d__datev, .seals-d__marquee', 'up', 0.12, 0);  // DATEV-Siegel und Laufband gemeinsam (vorher kam das Siegel ohne Einblendung)
  // Karriere: Spalten links/rechts, Jobs gestaffelt
  const car = $('.career-d');
  if (car) {
    car.classList.add('sr-host');
    const cols = [...car.children];
    group(car, cols.slice(0, 1), 'left', 0, 0.05); group(car, cols.slice(1), 'right', 0.1, 0.15);
    group($('.jobs'), '.job, .jobs__sub, .jobs > .career-d__contact', 'up', 0.08, 0.3);
  }
  // Footer: bewusst ohne Einblendung
  // Fotos (außer Hero): langsames Setzen aus dem Zoom
  $$('.ph').forEach((ph) => { if (ph.closest('.hero-d') || !ph.querySelector('img')) return; ph.classList.add('sr-img'); groups.push(ph); });

  if (still) { groups.forEach((g) => g.classList.add('sr-in')); return; }
  // Hosts mit display:contents (z. B. Ablauf-Spalte im gestapelten Layout) haben keine Box – dann den Eltern-Container beobachten.
  // Ob ein Host „contents“ ist, hängt von der Fensterbreite ab: beim Ändern der Breite wird für noch nicht gezeigte Gruppen neu gewählt,
  // sonst bliebe z. B. „Schritt 1“ nach dem Verkleinern des Fensters unsichtbar, bis die Seite neu geladen wird.
  const watched = new Map(); // Gruppe → beobachtetes Element
  // Gruppen innerhalb einer Karte/eines Eintrags (z. B. Chips in der Branchenkarte) starten mit ihrer Karte – sonst steht die Karte schon da und unten fehlt noch etwas
  const targetOf = (g) => {
    const t = g.closest('.reveal > *') || g;
    return getComputedStyle(t).display === 'contents' ? t.parentElement : t;
  };
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    watched.forEach((t, g) => {
      if (t !== e.target) return;
      g.classList.add('sr-in');
      if (t !== g) t.classList.add('sr-in');
      watched.delete(g);
    });
    if (![...watched.values()].includes(e.target)) io.unobserve(e.target);
  }), window.LK_REVEAL);
  const watch = (g) => {
    const t = targetOf(g); const old = watched.get(g);
    if (old === t) return;
    watched.set(g, t);
    if (old && ![...watched.values()].includes(old)) io.unobserve(old);
    io.observe(t);
  };
  // Beim Laden schon sichtbare Gruppen sofort zeigen, alle anderen mit dem gemeinsamen späten Auslöser
  groups.forEach((g) => {
    const t = targetOf(g), r = t.getBoundingClientRect();
    const show = () => { g.classList.add('sr-in'); if (t !== g) t.classList.add('sr-in'); };
    if (!window.lkScrolled && r.top < innerHeight && r.bottom > 0) { if (t.closest('main > :first-child')) show(); else setTimeout(show, 700); }
    else watch(g);
  });
  let rz = 0;
  addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => [...watched.keys()].forEach(watch), 150); });
})();
/* Buttons: Text in zwei gestapelte Kopien legen (Roll-Effekt), Icons bleiben unverändert */
document.querySelectorAll('.btn').forEach((b) => {
  const nodes = [...b.childNodes].filter((n) => n.nodeType === 3 ? n.textContent.trim() : !n.matches('svg, .icon, .btn__count'));
  if (!nodes.length) return;
  const label = nodes.map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
  const roll = document.createElement('span'); roll.className = 'roll';
  const a = document.createElement('span'); a.textContent = label;
  const c = document.createElement('span'); c.textContent = label; c.setAttribute('aria-hidden', 'true');
  roll.append(a, c);
  nodes[0].replaceWith(roll); nodes.slice(1).forEach((n) => n.remove());
});
/* Laufband wie vorher an das Scrollen gekoppelt (gleiche Geschwindigkeit wie früher: 25 % der alten Spurbreite
   pro Durchlauf des Bands durch den Bildschirm) – aber endlos: Versatz läuft modulo einer Hälfte */
(() => {
  const t = document.querySelector('.e-band__track--loop');
  if (!t || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const band = t.parentElement;
  let ticking = false;
  const update = () => {
    ticking = false;
    const h = t.firstElementChild.offsetWidth;            // eine Hälfte = 3 Wiederholungen
    const oldTrack = h * 2 / 3;                            // frühere Spur = 2 Wiederholungen
    const speed = 0.25 * oldTrack / (innerHeight + band.offsetHeight) * 0.5;   // halbiert: ruhiger
    const x = ((scrollY * speed) % h + h) % h;
    t.style.transform = `translate3d(${-x}px, 0, 0)`;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update); update();
})();
/* Ganze Pixel auch bei Textbreiten: Glyphen haben gebrochene Breiten. Von oben nach unten jede Box mit gebrochener
   Breite auf den nächsten ganzen Pixel aufrunden (Inline-Text ausgenommen); bei Resize neu berechnen. */
(() => {
  const SKIP = 'svg, svg *, .lw, .lw *, .lt, .roll > span, .e-band, .e-band *, script, style, br, .sr-only';
  const snap = () => {
    document.querySelectorAll('[data-snap]').forEach((e) => { e.style.minWidth = ''; e.style.height = ''; e.style.aspectRatio = ''; e.removeAttribute('data-snap'); });
    const depth = (e) => { let d = 0; while (e.parentElement) { d++; e = e.parentElement; } return d; };
    // von innen nach außen: erst Kinder runden, dann ergibt sich die Elternbreite aus ganzen Werten (kein Überlauf durch Aufrunden)
    const all = [...document.body.querySelectorAll('*')].filter((e) => !e.matches(SKIP)).map((e) => [depth(e), e]).sort((a, b) => b[0] - a[0]).map((x) => x[1]);
    all.forEach((e) => {
      const cs = getComputedStyle(e);
      if (cs.display === 'inline' || cs.display === 'contents' || cs.display === 'none' || cs.position === 'fixed') return;
      const w = parseFloat(cs.width);
      if (!w || Math.abs(w - Math.round(w)) < 0.01) return;
      // nur Boxen, deren Breite vom Text kommt (≈ max-content); gestreckte/begrenzte Boxen erben ganze Werte vom Eltern-Element
      const prev = e.style.width; e.style.width = 'max-content'; const mc = parseFloat(getComputedStyle(e).width); e.style.width = prev;
      if (Math.abs(mc - w) > 0.5) return;
      e.style.minWidth = Math.ceil(w) + 'px';   // Mindestbreite statt fester Breite: Inhalt darf wachsen, nie unter den ganzen Pixel schrumpfen
      e.setAttribute('data-snap', '');
    });
    // Höhen aus Seitenverhältnissen (z. B. Bild 4:5 bei 350px Breite = 437.5px) ebenfalls aufrunden
    all.forEach((e) => {
      const cs = getComputedStyle(e);
      if (cs.display === 'inline' || cs.display === 'none' || cs.aspectRatio === 'auto') return;
      const h = parseFloat(cs.height);
      if (!h || Math.abs(h - Math.round(h)) < 0.01) return;
      e.style.setProperty('height', Math.ceil(h) + 'px', 'important'); e.style.aspectRatio = 'auto';   // important: schlägt auch „height: auto !important“ aus dem Stylesheet
      e.setAttribute('data-snap', '');
    });
  };
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => requestAnimationFrame(snap));
  let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(snap, 150); });
})();

// FAQ und Mobilmenü: Akkordeon weich auf- und zuklappen
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.faq details, .mobile-nav details').forEach((d) => {
    const s = d.querySelector('summary');
    let anim = null;
    s.addEventListener('click', (e) => {
      if (reduce) return;
      e.preventDefault();
      if (anim) anim.cancel();
      const from = d.offsetHeight;
      const opening = !d.open;
      if (opening) d.open = true; else d.classList.add('is-closing');
      const to = opening ? d.scrollHeight : s.offsetHeight + parseFloat(getComputedStyle(d).borderBottomWidth);
      const a = d.animate([{ height: from + 'px' }, { height: to + 'px' }], { duration: opening ? 450 : 350, easing: 'cubic-bezier(.2,.7,.2,1)' });
      anim = a;
      a.onfinish = () => {
        if (!opening) d.open = false;
        d.classList.remove('is-closing');
        if (anim === a) anim = null;
      };
      a.oncancel = () => { if (anim === a) anim = null; };
    });
  });
})();

// Cookie-Hinweis: Auswahl merken; Tracker erst nach Einwilligung (Event „consent“ für spätere Tags)
(() => {
  const box = document.querySelector('.cookie');
  if (!box) return;
  const KEY = 'lk-consent';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } };
  // Externe Inhalte (Karte): auch über den Schalter auf der Karte freigebbar (lk-map) – beides zählt als „an“
  const mapOn = () => { try { return localStorage.getItem('lk-map') === '1'; } catch (e) { return false; } };
  const withExt = (c) => c && ({ ...c, ext: !!(c.ext || mapOn()) });
  const set = box.querySelector('.cookie__set');
  const btnSettings = box.querySelector('[data-consent="settings"]');
  const btnSave = box.querySelector('[data-consent="save"]');
  const apply = (c) => document.dispatchEvent(new CustomEvent('consent', { detail: c }));
  const showSettings = (on) => { set.hidden = !on; btnSettings.hidden = on; btnSave.hidden = !on; };
  const open = (withSettings) => {
    const c = read();
    set.querySelector('[name="stat"]').checked = !!(c && c.stat);
    set.querySelector('[name="mkt"]').checked = !!(c && c.mkt);
    set.querySelector('[name="ext"]').checked = !!(c && c.ext) || mapOn();
    showSettings(!!withSettings);
    box.classList.remove('is-closing'); box.hidden = false;
  };
  const save = (stat, mkt, ext) => {
    const c = { v: 1, stat, mkt, ext, ts: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); if (!ext) localStorage.removeItem('lk-map'); } catch (e) {} // Auswahl im Hinweis gilt, auch für die Karte
    apply(c);
    box.classList.add('is-closing');
    box.addEventListener('animationend', () => { box.hidden = true; box.classList.remove('is-closing'); }, { once: true });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { box.hidden = true; box.classList.remove('is-closing'); }
  };
  box.addEventListener('click', (e) => {
    const b = e.target.closest('[data-consent]'); if (!b) return;
    const t = b.dataset.consent;
    if (t === 'all') save(true, true, true);
    else if (t === 'necessary') save(false, false, false);
    else if (t === 'settings') showSettings(true);
    else if (t === 'save') save(set.querySelector('[name="stat"]').checked, set.querySelector('[name="mkt"]').checked, set.querySelector('[name="ext"]').checked);
  });
  document.querySelectorAll('[data-cookie-settings]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); open(true); }));
  const c = read();
  if (c) apply(withExt(c)); else open(false);
})();

// Rechtstexte: Inhaltsverzeichnis markiert den Abschnitt, der gerade gelesen wird
(function () {
  const toc = document.querySelector('.legal-toc');
  if (!toc || !('IntersectionObserver' in window)) return;
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const visible = new Set();
  const update = () => {
    const ids = [...map.keys()].filter((id) => visible.has(id));
    const current = ids[0] || null;
    if (current) links.forEach((a) => a.classList.toggle('is-active', a === map.get(current)));
  };
  links[0] && links[0].classList.add('is-active');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) visible.add(e.target.id); else visible.delete(e.target.id); });
    update();
  }, { rootMargin: '-120px 0px -55% 0px' });
  map.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
})();


// Formularprüfung (Anfrage + Kontakt): statt Browser-Hinweisen eine Meldung im Markenstil (FormError.astro).
// Gibt das erste ungültige Feld zurück und zeigt den passenden Text; leer = alles in Ordnung.
const formCheck = (fields, box) => {
  const txt = box.querySelector('[data-form-err-txt]');
  const bad = fields.find((f) => f.type !== 'hidden' && !f.closest('.hp') && !f.checkValidity());
  if (!bad) { box.hidden = true; return null; }
  txt.textContent = bad.type === 'checkbox' ? 'Bitte stimmen Sie der Datenschutzerklärung zu.'
    : bad.type === 'email' && bad.value.trim() ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    : 'Bitte füllen Sie alle Pflichtfelder aus.';
  box.hidden = false;
  return bad;
};
const formErrorText = (box, t) => { box.querySelector('[data-form-err-txt]').textContent = t; box.hidden = false; };

// Kontaktformular: Prüfung beim Absenden, Meldung verschwindet, sobald alles stimmt (Versand wird beim Livegang angebunden)
(() => {
  document.querySelectorAll('form[data-check]').forEach((form) => {
    const box = form.querySelector('[data-form-err]');
    const fields = () => [...form.querySelectorAll('input, select, textarea')];
    let tried = false;
    form.addEventListener('submit', (e) => {
      tried = true;
      const bad = formCheck(fields(), box);
      if (bad) { e.preventDefault(); bad.focus(); }
    });
    form.addEventListener('input', () => { if (tried && !box.hidden) formCheck(fields(), box); });
    form.addEventListener('change', () => { if (tried && !box.hidden) formCheck(fields(), box); });
  });
})();

// Erstgespräch: mehrstufiges Formular. Auswahl mit data-reject → Seite „Leider nicht“ (keine Daten werden übertragen).
// Letzter Schritt: Pflichtfelder prüfen, dann Danke-Seite (Versand an E-Mail/CRM wird beim Livegang ergänzt).
(() => {
  const form = document.querySelector('[data-qf]');
  if (!form) return;
  const steps = [...form.querySelectorAll('.qf__step')];
  const back = form.querySelector('[data-qf-back]');
  const next = form.querySelector('[data-qf-next]');
  const err = form.querySelector('[data-form-err]');
  const count = form.querySelector('[data-qf-count]');
  const bar = form.querySelector('[data-qf-progress]');
  let i = 0;
  const show = (n) => {
    steps.forEach((s, k) => { s.hidden = k !== n; });
    i = n;
    back.hidden = n === 0;
    count.textContent = `Schritt ${n + 1} von ${steps.length}`;
    bar.style.width = `${((n + 1) / steps.length) * 100}%`;
    next.firstChild.textContent = n === steps.length - 1 ? 'Anfrage senden ' : 'Weiter ';
    err.hidden = true;
    const top = form.getBoundingClientRect().top;
    if (top < 0) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const step = steps[i];
    const radios = step.querySelectorAll('input[type="radio"]');
    if (radios.length) {
      const picked = step.querySelector('input[type="radio"]:checked');
      if (!picked && radios[0].required) { formErrorText(err, 'Bitte wählen Sie eine Antwort aus.'); return; }
      if (picked && picked.hasAttribute('data-reject')) { location.href = `${form.dataset.no}?grund=${encodeURIComponent(picked.name)}`; return; } // Grund steuert nur den Absagetext
      show(i + 1);
      return;
    }
    const bad = formCheck([...step.querySelectorAll('input, select, textarea')], err);
    if (bad) { bad.focus(); return; }
    // Beim Livegang: Versand an E-Mail/CRM hier – nur wenn das Honeypot-Feld „website“ leer ist (sonst Bot: nichts senden, trotzdem „Danke“)
    location.href = form.dataset.ok;
  });
  // Auswahl → automatisch weiter (außer im letzten Schritt)
  form.addEventListener('change', (e) => {
    if (e.target.type === 'radio' && i < steps.length - 1) setTimeout(() => form.requestSubmit(), 250);
  });
  back.addEventListener('click', () => show(Math.max(0, i - 1)));
  show(0);
})();

// Auswahlfeld im Markenstil ([data-sel], Komponente Select.astro): Liste wie das Untermenü, Bedienung wie ein natives Auswahlfeld
(() => {
  document.querySelectorAll('[data-sel]').forEach((root) => {
    const btn = root.querySelector('.sel__btn');
    const list = root.querySelector('.sel__list');
    const val = root.querySelector('.sel__val');
    const input = root.querySelector('input[type="hidden"]');
    const opts = [...list.querySelectorAll('[role="option"]')];
    let act = Math.max(0, opts.findIndex((o) => o.getAttribute('aria-selected') === 'true'));
    const mark = (n) => {
      act = (n + opts.length) % opts.length;
      opts.forEach((o, k) => o.classList.toggle('is-active', k === act));
      list.setAttribute('aria-activedescendant', opts[act].id);
      opts[act].scrollIntoView({ block: 'nearest' });
    };
    const open = () => {
      if (!list.hidden) return;
      list.hidden = false; btn.setAttribute('aria-expanded', 'true'); root.classList.add('is-open');
      mark(opts.findIndex((o) => o.getAttribute('aria-selected') === 'true')); list.focus();
    };
    const close = (focus = true) => {
      if (list.hidden) return;
      list.hidden = true; btn.setAttribute('aria-expanded', 'false'); root.classList.remove('is-open');
      if (focus) btn.focus();
    };
    const pick = (n) => {
      opts.forEach((o, k) => o.setAttribute('aria-selected', k === n ? 'true' : 'false'));
      val.textContent = opts[n].textContent; input.value = opts[n].dataset.value;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      close();
    };
    btn.addEventListener('click', () => (list.hidden ? open() : close()));
    btn.addEventListener('keydown', (e) => { if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); open(); } });
    opts.forEach((o, k) => {
      o.addEventListener('click', () => pick(k));
      o.addEventListener('mousemove', () => { if (k !== act) mark(k); });
    });
    list.addEventListener('keydown', (e) => {
      const k = { ArrowDown: act + 1, ArrowUp: act - 1, Home: 0, End: opts.length - 1 }[e.key];
      if (k !== undefined) { e.preventDefault(); mark(Math.min(Math.max(k, 0), opts.length - 1)); return; }
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(act); return; }
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key === 'Tab') { close(false); return; }
      const hit = opts.findIndex((o) => o.textContent.trim().toLowerCase().startsWith(e.key.toLowerCase()));
      if (e.key.length === 1 && hit > -1) mark(hit);
    });
    document.addEventListener('pointerdown', (e) => { if (!root.contains(e.target)) close(false); });
  });
})();

// Beitrag teilen: Links mit der aktuellen Adresse (Domain steht noch nicht fest), „Link kopieren“
(() => {
  const box = document.querySelector('[data-share]');
  if (!box) return;
  const u = encodeURIComponent(location.href);
  const t = encodeURIComponent(document.querySelector('h1')?.textContent || document.title);
  const to = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    xing: `https://www.xing.com/spi/shares/new?url=${u}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    mail: `mailto:?subject=${t}&body=${u}`,
  };
  box.querySelectorAll('[data-share-to]').forEach((a) => { a.href = to[a.dataset.shareTo]; });
  const copy = box.querySelector('[data-share-copy]');
  let copyTimer;
  copy?.addEventListener('click', async () => {
    const label = copy.querySelector('.share__label');
    clearTimeout(copyTimer);
    try { await navigator.clipboard.writeText(location.href); label.textContent = 'Link kopiert'; copy.classList.add('is-copied'); }
    catch (e) { label.textContent = 'Kopieren nicht möglich'; }
    copyTimer = setTimeout(() => { label.textContent = 'Link kopieren'; copy.classList.remove('is-copied'); }, 2000);
  });
})();
