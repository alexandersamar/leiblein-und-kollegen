// Karte (Kontakt): MapLibre + OpenFreeMap erst nach Einwilligung – statische Datei (wie main.js), nicht über Vite gebündelt.
// Eine Quelle für die Freigabe: lk-consent.ext (Cookie-Hinweis) oder lk-map (Schalter auf der Karte).
// Widerruf im Cookie-Hinweis („Externe Inhalte“ abwählen) entfernt die Karte sofort und zeigt den Schalter wieder.
(() => {
  const STYLE = 'https://tiles.openfreemap.org/styles/positron';
  const MAP_KEY = 'lk-map';
  const allowed = () => {
    try {
      if (localStorage.getItem(MAP_KEY) === '1') return true;
      const c = JSON.parse(localStorage.getItem('lk-consent') || 'null');
      return !!(c && c.ext);
    } catch (e) { return false; }
  };
  let lib = null; // MapLibre nur einmal laden
  const loadLib = async () => {
    if (lib) return lib;
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = '/vendor/maplibre/maplibre-gl.css'; document.head.append(css);
    // Browser-Import an Vite vorbei (im Dev-Server dürfen Dateien aus public/ nicht über import() laufen)
    lib = await (new Function('u', 'return import(u)'))(new URL('/vendor/maplibre/maplibre-gl.mjs', location.href).href);
    lib.setWorkerUrl('/vendor/maplibre/maplibre-gl-worker.mjs');
    return lib;
  };

  document.querySelectorAll('[data-karte]').forEach((root) => {
    const mapEl = root.querySelector('.karte__gl');
    const consent = root.querySelector('.karte__consent');
    const sw = root.querySelector('.karte__sw');
    const msg = root.querySelector('.karte__msg');
    const state = { near: false, ok: allowed(), map: null, run: 0 };

    const showConsent = (on) => {
      sw.setAttribute('aria-checked', on ? 'false' : 'true');
      if (on) { consent.hidden = false; requestAnimationFrame(() => consent.classList.remove('is-off')); }
      else { consent.classList.add('is-off'); setTimeout(() => { if (state.ok) consent.hidden = true; }, 500); }
    };
    if (state.ok) { consent.hidden = true; consent.classList.add('is-off'); sw.setAttribute('aria-checked', 'true'); }
    else consent.hidden = false;

    const stop = () => {
      state.run++; // laufendes Laden verwerfen
      if (state.map) { state.map.remove(); state.map = null; }
      mapEl.replaceChildren();
      root.classList.remove('is-loading', 'is-ready', 'is-error'); msg.textContent = '';
    };

    const start = async () => {
      if (!state.near || !state.ok || state.map || root.classList.contains('is-loading')) return;
      const run = ++state.run;
      const fail = (why) => { if (run !== state.run) return; console.warn('[Karte]', why); root.classList.remove('is-loading'); root.classList.add('is-error'); msg.textContent = 'Die Karte konnte nicht geladen werden.'; };
      root.classList.remove('is-error'); root.classList.add('is-loading'); msg.textContent = 'Karte wird geladen …';
      try {
        const m = await loadLib();
        if (run !== state.run) return;
        const pos = [Number(root.dataset.lng), Number(root.dataset.lat)];
        const map = new m.Map({
          container: mapEl, style: STYLE, center: pos, zoom: 13, minZoom: 10,
          attributionControl: { compact: true },
          cooperativeGestures: true, // Seite scrollt weiter: Zoom mit Strg/⌘ + Scrollen, Verschieben mit zwei Fingern
          locale: {
            'CooperativeGesturesHandler.WindowsHelpText': 'Strg + Scrollen zum Zoomen der Karte',
            'CooperativeGesturesHandler.MacHelpText': '⌘ + Scrollen zum Zoomen der Karte',
            'CooperativeGesturesHandler.MobileHelpText': 'Karte mit zwei Fingern bewegen',
            'NavigationControl.ZoomIn': 'Vergrößern',
            'NavigationControl.ZoomOut': 'Verkleinern',
          },
        });
        state.map = map;
        map.addControl(new m.NavigationControl({ showCompass: false }), 'top-left');
        const pin = document.createElement('img');
        pin.src = '/assets/icons/map-pin.svg'; pin.width = 50; pin.height = 60; pin.alt = ''; pin.title = root.dataset.title || '';
        new m.Marker({ element: pin, anchor: 'bottom' }).setLngLat(pos).addTo(map);
        const timer = setTimeout(() => fail('Zeitüberschreitung beim Laden der Kacheln'), 15000); // Kacheln nicht erreichbar → Bild bleibt
        map.on('error', (e) => { if (!root.classList.contains('is-ready')) console.warn('[Karte]', e && e.error); });
        map.once('load', () => {
          clearTimeout(timer);
          if (run !== state.run) return;
          // kompakte Quellenangabe startet aufgeklappt (Streifen über „Route planen“) → auf das „i“ einklappen
          const a = mapEl.querySelector('.maplibregl-ctrl-attrib');
          if (a) { a.classList.remove('maplibregl-compact-show'); a.removeAttribute('open'); }
          msg.textContent = ''; root.classList.remove('is-loading'); root.classList.add('is-ready');
        });
      } catch (e) {
        fail(e); // kein WebGL, Skript blockiert o. Ä. → statisches Bild bleibt
      }
    };

    // Schalter auf der Karte: gibt nur die Karte frei
    sw.addEventListener('click', () => {
      if (state.ok) return;
      sw.setAttribute('aria-checked', 'true');
      try { localStorage.setItem(MAP_KEY, '1'); } catch (e) {}
      setTimeout(() => { state.ok = true; showConsent(false); start(); }, 450); // erst den Schalter fertig gleiten lassen
    });
    // Auswahl im Cookie-Hinweis gilt: „Externe Inhalte“ an → Karte laden, aus → Karte entfernen, Schalter wieder zeigen
    document.addEventListener('consent', (e) => {
      const ok = !!(e.detail && e.detail.ext);
      if (ok === state.ok) return;
      state.ok = ok;
      if (ok) { showConsent(false); start(); } else { stop(); showConsent(true); }
    });

    new IntersectionObserver(([en], o) => {
      if (!en.isIntersecting) return;
      o.disconnect(); state.near = true; start();
    }, { rootMargin: '400px 0px' }).observe(root);
  });
})();
