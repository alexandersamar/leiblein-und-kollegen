"""Design-Check: prüft alle Seiten gegen die Regeln des Designsystems (Referenz = Startseite).

Aufruf (Dev-Server muss laufen, Python mit Playwright + Google Chrome):
    python tools/design-check.py                 # alle Seiten, 5 Breiten
    python tools/design-check.py /kontakt/       # einzelne Seiten

Prüft:
  1. Überzeile → Titel = 10, Titel → nächstes Element = 20 (wie Startseite)
  2. Sektionskopf → Inhalt = Abstand des Containers (--g4: 60/40/30)
  3. Abstand zwischen Buttons: nebeneinander 20, untereinander 10
  4. Schriftgrößen nur aus der Skala (+ dokumentierte Ausnahmen)
  5. Keine Außenabstände (margin) außer den erlaubten Ausnahmen
  6. Kein abgeschnittener Text, kein horizontales Scrollen, keine JS-Fehler
  7. Jede Hover-Änderung (Farbe, Hintergrund, Rahmen, Transform) hat einen Übergang (nur bei 1440)
  8. Statisch: keine festen Farben (#…/rgba) im Unterseiten-Block von styles.css außerhalb von SVG/Masken
Exit-Code 1, wenn etwas gefunden wurde.
"""
import re, sys, pathlib
from playwright.sync_api import sync_playwright

BASE = 'http://127.0.0.1:8080'
PAGES = sys.argv[1:] or ['/', '/branchen/gesundheitswesen/', '/branchen/handwerk/', '/branchen/e-commerce/', '/branchen/immobilien/', '/branchen/gmbh-personengesellschaften/', '/leistungen/', '/leistungen/buchhaltung/', '/leistungen/unternehmensberatung/', '/leistungen/gruendung/', '/leistungen/unternehmensnachfolge/', '/leistungen/back-office-service/', '/leistungen/lohnbuchhaltung/', '/leistungen/jahresabschluss-steuern/', '/kanzlei/', '/karriere/', '/karriere/ausbildung/', '/karriere/duales-studium/',
         '/wissen/', '/wissen/seite/2/', '/wissen/thema/steuern/', '/wissen/e-rechnung-umstellen/', '/kontakt/', '/anfrage/', '/anfrage/danke/', '/anfrage/leider-nicht/',
         '/impressum/', '/datenschutz/', '/barrierefreiheit/', '/404/']
WIDTHS = [1536, 1440, 1024, 768, 390]
SCALE = {12, 14, 15, 16, 18, 20, 24, 30}
# Dokumentierte Ausnahmen: große, responsive oder dekorative Größen (Startseite)
DECOR = '.d-title, .hero-d__claim, .art__head h1, .e-band, .final-d__plus, .e404, .plus-d__big, .pillar-d h3, .ind-card--feature h3, .stimme__mark, .eb-hero, .mobile-nav, .cookie, .seals-d, .footer, .topbar, .header, .rail, .mobile-cta, .legal-toc, .hiring__tag, .dropdown, svg, .sr-only, .lw, .roll'
MARGIN_OK = '.container, .lw, .lw *, .roll, .roll *, .eb-rot, .eb-rot *, .team-row__faces img, .final-d__ph, .founder-d__name, .sit-step__link, .pcard__txt .link-arrow, .tg__item .link-arrow, svg, .sr-only, .faq-d__av, .burger, .header, .header *, .mobile-nav *, .cookie, .cookie *, .footer *, .legal *, .rail *, .e404 *'

JS = r"""([SCALE, DECOR, MARGIN_OK]) => {
  const out = []; const R = e => e.getBoundingClientRect(); const vis = e => { const c = getComputedStyle(e); return c.display !== 'none' && c.visibility !== 'hidden' && R(e).height > 0; };
  const label = e => (e.tagName + '.' + (typeof e.className === 'string' ? e.className.split(' ').slice(0,2).join('.') : '') + ' "' + (e.textContent || '').trim().slice(0, 28) + '"');
  document.querySelectorAll('.d-head__top').forEach(t => {
    const e = t.querySelector(':scope > .d-eyebrow'), h = t.lastElementChild; if (!e || e === h || !vis(t)) return;
    const g1 = Math.round(R(h).top - R(e).bottom); if (g1 !== 10) out.push(['Überzeile→Titel ' + g1 + ' (soll 10)', label(h)]);
    let n = t.nextElementSibling; while (n && !vis(n)) n = n.nextElementSibling;
    if (n) { const g2 = Math.round(R(n).top - R(t).bottom); if (g2 !== 20) out.push(['Titel→nächstes ' + g2 + ' (soll 20)', label(h)]); }
  });
  document.querySelectorAll('.section > .container').forEach(c => {
    const h = [...c.children].find(x => x.classList.contains('d-head')); if (!h) return; let n = h.nextElementSibling; while (n && !vis(n)) n = n.nextElementSibling; if (!n) return;
    const want = parseInt(getComputedStyle(c).rowGap); const g = Math.round(R(n).top - R(h).bottom); if (want && g !== want) out.push(['Kopf→Inhalt ' + g + ' (soll ' + want + ')', label(h)]);
  });
  document.querySelectorAll('main .btn, body > section .btn').forEach(b2 => { if (b2.closest('.pager')) return; const b1 = b2.previousElementSibling; if (!b1 || !b1.classList.contains('btn') || !vis(b1) || !vis(b2)) return; const a = R(b1), b = R(b2); const st = b.top >= a.bottom - 1; const g = Math.round(st ? b.top - a.bottom : b.left - a.right); const soll = st ? 10 : 20; if (g !== soll) out.push(['Button-Abstand ' + g + ' (soll ' + soll + (st ? ', untereinander' : ', nebeneinander') + ')', label(b2)]); });
  document.querySelectorAll('main *, body > section *, body > section').forEach(e => {
    if (!vis(e) || e.closest(DECOR)) return;
    const c = getComputedStyle(e);
    if ([...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const fs = Math.round(parseFloat(c.fontSize)); if (!SCALE.includes(fs)) out.push(['Schriftgröße ' + fs + 'px außerhalb der Skala', label(e)]); }
    if (!e.matches(MARGIN_OK) && !e.closest('.lw, .roll, .eb-rot') && [c.marginTop, c.marginRight, c.marginBottom, c.marginLeft].some(v => v !== '0px' && v !== 'auto') && !(c.marginLeft === c.marginRight && c.marginTop === '0px' && c.marginBottom === '0px')) out.push(['margin ' + [c.marginTop, c.marginRight, c.marginBottom, c.marginLeft].join(' '), label(e)]);
    if (e.children.length === 0 && (e.textContent || '').trim() && c.overflow.includes('hidden') && e.scrollWidth > e.clientWidth + 1 && !c.webkitLineClamp) out.push(['abgeschnittener Text', label(e)]);
  });
  if (document.documentElement.scrollWidth > innerWidth) out.push(['horizontales Scrollen', '']);
  return out;
}"""
HOVER_JS = r"""(sel) => [...document.querySelectorAll(sel)].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && !e.closest('.header, .topbar, .footer, .cookie, .mobile-nav, .rail, .mobile-cta, .dropdown'); }).map((e, i) => { e.dataset.dc = i; return i; })"""
PROPS = ['color', 'backgroundColor', 'borderTopColor', 'transform', 'scale']

def static_colors():
    css = pathlib.Path(__file__).resolve().parents[1].joinpath('public/assets/styles.css').read_text()
    block = css[css.index('UNTERSEITEN – ein Regelwerk'):]
    bad = []
    for ln, line in enumerate(block.splitlines(), 1):
        clean = re.sub(r'url\("data:[^"]*"\)', '', line)
        clean = re.sub(r'(-webkit-)?mask(-image)?:[^;]*;', '', clean)
        if re.search(r'#[0-9a-fA-F]{3,6}\b|rgba?\(', clean): bad.append(f'styles.css (Unterseiten-Block Z. {ln}): feste Farbe – {line.strip()[:90]}')
    return bad

def main():
    problems = [f'[statisch] {b}' for b in static_colors()]
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
        for u in PAGES:
            for w in WIDTHS:
                pg = b.new_page(viewport={'width': w, 'height': 900}); errs = []
                pg.on('pageerror', lambda e: errs.append(str(e)))
                pg.goto(BASE + u); pg.wait_for_timeout(250)
                pg.add_style_tag(content='.cookie{display:none!important}')
                pg.evaluate("async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}scrollTo(0,0)}"); pg.wait_for_timeout(1200)
                for e in errs: problems.append(f'{u} @{w}: JS-Fehler {e}')
                if u != '/':
                    for what, where in pg.evaluate(JS, [sorted(SCALE), '.hero-d:not(.pg-hero-d), ' + DECOR, MARGIN_OK]):
                        problems.append(f'{u} @{w}: {what} – {where}')
                if w == 1440 and u != '/':
                    ids = pg.evaluate(HOVER_JS, 'main a, main button, main input, main textarea, main .qf__opt, body > section a, body > section button, body > section input, body > section textarea')
                    for i in ids:
                        el = pg.locator(f'[data-dc="{i}"]')
                        try:
                            before = el.evaluate("(e,P)=>{const c=getComputedStyle(e);return P.map(p=>c[p])}", PROPS)
                            el.hover(timeout=1500, force=True); pg.wait_for_timeout(30)
                            after = el.evaluate("(e,P)=>{pg_d=e;const c=getComputedStyle(e);return P.map(p=>c[p]).concat([c.transitionDuration, e.tagName+'.'+e.className+' '+(e.textContent||'').trim().slice(0,24)])}".replace('pg_d=e;', ''), PROPS)
                            changed = [PROPS[k] for k in range(len(PROPS)) if before[k] != after[k]]
                            if changed and all(float(x.rstrip('s')) == 0 for x in after[-2].split(',')):
                                problems.append(f'{u}: Hover ohne Übergang ({", ".join(changed)}) – {after[-1]}')
                        except Exception:
                            pass
                        pg.mouse.move(0, 0)
                pg.close()
        b.close()
    seen = []
    for x in problems:
        if x not in seen: seen.append(x)
    print('\n'.join(seen) if seen else 'OK – keine Abweichungen gefunden')
    print(f'\n{len(seen)} Befund(e), {len(PAGES)} Seiten × {len(WIDTHS)} Breiten')
    sys.exit(1 if seen else 0)

if __name__ == '__main__':
    main()
