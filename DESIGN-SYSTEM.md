# Designsystem – Leiblein + Kollegen

Alle Regeln der Website an einer Stelle. Die Werte stehen als CSS-Variablen im `:root` von `public/assets/styles.css`. Neue Seiten verwenden **nur** diese Variablen und die Komponenten unten – keine festen px- oder Farbwerte.

## Grundregeln

- Abstände zwischen Elementen nur über `gap`, nie über `margin`.
- Schrift Brix Sans, nur die Stärken 300 / 500 / 700. Größen nur über `--t-*`.
- Farben nur über die Variablen unten. Alle Linien und Rahmen 10 %.
- Ecken gerade (Radius 0). Die abgeschrägte Ecke (20px, `clip-path`) ist ein **Akzent** – nur für Buttons und einzelne hervorgehobene Elemente pro Seite (z. B. Kontaktkarte, Anfrage-Formular, aktiver Ablauf-Schritt), nie auf allen Karten, sonst verliert sie ihre Wirkung.
- Seitenkopf mit Foto immer wie die Startseite (`hero-d`: Foto rechts randlos mit weichem Übergang); ohne Foto einfacher Kopf auf Fresh-10.
- Icons: Strichstärke 1,5 px, enger viewBox; jedes Icon liegt zusätzlich als Datei in `public/assets/icons/*.svg`.
- Text wird nie abgeschnitten: Masken und `overflow` dürfen keine Buchstaben beschneiden.

## Farben

| Variable | Wert | Einsatz |
|---|---|---|
| `--solid` | #231e3c | Text, dunkle Flächen |
| `--red` | #e65f5a | Akzente, Hauptbutton |
| `--fresh` | #96d2e1 | Akzente, Buttons auf dunkel |
| `--fresh-10` | #eef8fa | helle Sektionen, Bild-Platzhalter |
| `--white` | #ffffff | Hintergrund, Karten |

**Transparenzen auf hell (Solid Blue):**

| Variable | Deckkraft | Einsatz |
|---|---|---|
| `--muted` | 75 % | Sekundärtext |
| `--solid-60` | 60 % | Meta: Datum, Bildunterschrift |
| `--solid-40` | 40 % | Nummern im Inhaltsverzeichnis |
| `--solid-20` | 20 % | inaktiv, Trenner auf Farbe |
| `--line` | 10 % | alle Linien und Rahmen |
| `--solid-5` | 5 % | weicher Schatten, Platzhalter für fehlende Bilder (mit Logo) |

**Transparenzen auf dunkel (Weiß):**

| Variable | Deckkraft | Einsatz |
|---|---|---|
| `--white-80` | 80 % | „Glas“-Header |
| `--on-dark-muted` | 70 % | Sekundärtext auf dunkel |
| `--white-20` | 20 % | aktiver Eintrag im Inhaltsverzeichnis |
| `--line-dark` | 10 % | Linien auf dunkel |
| `--white-4` | 4 % | Karten auf dunkel (Leistungen) |

Schatten: `--shadow-soft` (Cookie-Hinweis, Menü), `--shadow-rail` (Kontaktleiste rechts). Dekorative Lichtflecken und Verläufe auf Fotos sind eigene Gradienten und gehören nicht zur Palette.

## Typografie

| Variable | Größe / Zeilenhöhe · Stärke | Einsatz |
|---|---|---|
| `--t-caps` | 12/18 · 700 · Versalien, Sperrung 2px | Überzeilen, Tags, Labels, Footer-Überschriften |

Überzeilen-Plus: gezeichnet (kein Schriftzeichen), 8×8 = Versalhöhe, Strich 2px, sitzt in der 18er-Zeile bei 4–12 bündig mit den Buchstaben; Farbe über `color` des `::before`.
| `--t-small` | 14/20 | Kleiner Text, Bildunterschriften, Info-Leiste |
| `--t-nav` | 15/24 | Footer, Inhaltsverzeichnis der Rechtsseiten |
| `--t-body` | 16/26 · 300 | Fließtext |
| `--t-ui` | 16/20 · 500/700 | Buttons, Menüpunkte |
| `--t-lead` | 18/28 · 300 | Einleitung unter Überschriften |
| `--t-h6` | 18/26 · 700 | Zwischenüberschriften |
| `--t-h5` | 20/26 · 700 | Kartentitel, FAQ-Fragen |
| `--t-h4` | 24/30 · 700 | Abschnittstitel der Rechtsseiten |
| `--t-h3` | 30/36 · 700 | große Zitate |
| `--t-h2` | 60/56 → 48/46 → 44/42 → 36/34 | Sektionsüberschriften (kleiner auf schmaleren Bildschirmen) |
| `--t-display` | 80/76 → 60/57 → 44/42 | Hero-Überschrift |

Jede Variable hat eine Zeilenhöhe dazu: `--t-…-lh`, z. B. `font-size: var(--t-h5); line-height: var(--t-h5-lh);`.

Eigene Größen (dekorativ, ans Layout angepasst): Laufband, großes „+“ im Abschlussblock, 404, große Kennzahlen, Kartentitel Leistungen und „Gesundheitswesen“.

## Abstände

| Variable | Wert |
|---|---|
| `--sp-5` | 5px |
| `--sp-10` | 10px |
| `--sp-20` | 20px |
| `--sp-30` | 30px |
| `--sp-40` | 40px |
| `--sp-60` | 60px |
| `--sp-120` | 120px |

Sektionen: oben/unten 120 → 100 → 100 → 80 → 60 (Variable `--sec`, skaliert mit der Breite), Überschrift → Inhalt 60.

Innenabstand großer Inhaltsblöcke – Variablen `--box-pad` (oben/unten) und `--box-pad-x` (seitlich), gleiche Stufung wie die Sektionen: 120 (≥ 1536) → 100 (1280–1535) → 80 (1024–1279) → 60 (768–1023) → 30/20 (< 768). Verwendet von Karriere-Block (`.career-d`) und Abschluss-CTA (`.final-d`); neue große Blöcke nutzen dieselben Variablen.

Formular-Karten (Kontakt, Anfrage, Danke/Leider nicht) – Variable `--form-pad`: 80 (≥ 1280) → 60 (1024–1279) → 40 (768–1023) → 20 (< 768).

Bewusste Ausnahmen: Buttons 15/20 (ergibt Höhe 50), Menüpunkte 10/15 (zusammen 30 Abstand), Burger 12 (Klickfläche 48), Tags 3/10/1 (optische Zentrierung), Listeneinzug 24 (Breite des „+“ bzw. der Nummer), Reserve unter großen Überschriften (`.lw`, damit nichts abgeschnitten wird).

## Breakpoints

| Bereich | Bildschirmbreite | Inhaltsbreite | Gerät |
|---|---|---|---|
| XL | ≥ 1536 | 1420 | große Monitore |
| L | 1280–1535 | 1180 | Laptops |
| M | 1024–1279 | 960 | kleine Laptops, Tablet quer – ein Layout für den ganzen Bereich, inkl. 1024 |
| S | 768–1023 | 660 | Tablet hoch |
| XS | < 768 (zusätzlich ≤ 360) | 100 % − 40, höchstens 580 | Smartphones |

Schreibweise immer auf diesen Grenzen: `@media (max-width: 1023px)`, `@media (min-width: 1024px) and (max-width: 1279px)` usw. Lokale Ausnahmen: ≤ 440 und ≤ 400 (Feinanpassung von Text auf schmalen Smartphones). In `main.js` gilt dieselbe Grenze: bis 767px ist der Header immer kompakt.

## Komponenten

**Sektionskopf**

```html
<div class="d-head">
  <div class="d-head__top"><span class="d-eyebrow">Für wen wir arbeiten</span></div>
  <h2 class="d-title">Spezialisiert auf Unternehmen, <em>die digital wachsen wollen.</em></h2>
  <p>Ob Praxis, Handwerksbetrieb oder Onlinehandel …</p>
</div>
```

**Buttons** (Höhe 50, klein 40; `--t-ui`, immer Großbuchstaben, Ecke rechts oben abgeschrägt)

```html
<a class="btn btn--primary" href="/anfrage/">Erstgespräch anfragen <svg class="icon icon--arrow"><use href="#i-arrow"/></svg></a>
<a class="btn btn--line" href="tel:+49602145670"><svg class="icon"><use href="#i-phone"/></svg> 06021 45670-0</a>
<a class="btn btn--dark btn--sm" href="/anfrage/">Erstgespräch anfragen</a>
<a class="btn btn--dark" href="tel:+49602145670" aria-label="Anrufen"><svg class="icon"><use href="#i-phone"/></svg></a>
```

`btn--primary` rot (Hover Fresh Blue), `btn--dark` Solid Blue, `btn--line` Rahmen, `btn--sm` klein.

**Link mit Pfeil**

```html
<a class="link-arrow" href="/anfrage/"><span>Erstgespräch anfragen</span> <svg class="icon"><use href="#i-arrow"/></svg></a>
```

**Tags**: `<span class="ind-card__tag">Unser Schwerpunkt</span>`, Hinweis auf Rechtsseiten: `<span class="legal-ref">WCAG 1.4.3</span>`.

**Icons** (Sprite in `src/components/Sprite.astro`, Einbindung `<svg class="icon"><use href="#…"/></svg>`):
`i-arrow`, `i-arrow-left`, `i-link`, `i-chev`, `i-phone`, `i-mail`, `i-pin`, `i-check`, `i-clock`, `i-health`, `i-tool`, `i-cart`, `i-building`, `i-star`, `i-cloud`, `i-phone-app`, `i-plug`, `i-shield`, `s-facebook`, `s-linkedin`, `s-instagram`, `s-xing`.

## Unterseiten-Bausteine

Komponenten in `src/components/page/`, Styles im Abschnitt „Unterseiten“ von `styles.css`.

| Baustein | Einsatz |
|---|---|
| `PageHero` | Seitenkopf: Brotkrumen, Überzeile, H1 (`<em>` = rot), Einleitung, optional Hinweiszeile (rote Linie), Buttons, Bild. Ohne `img` einspaltig. |
| `SectionHead` | Sektionskopf (`d-head`), `start` = linksbündig. |
| `FaqBlock` | FAQ wie auf der Startseite mit eigenen Fragen; strukturierte Daten über `faqJsonLd()` aus `src/data/faqJsonLd.ts`. |
| `PostCard` | Beitragskarte; ohne Bild heller Platzhalter. |
| `.tg` / `.tg__item` | Kartenraster 3 Spalten (`.tg--4`, `.tg--2`); mit `.tg__num` (rote Nummer) oder Icon; als `<a>` mit Hover rot. Auf weißen Sektionen automatisch Fresh-10-Karten. |
| `.split` | Zweispaltig: Kopf links (5/12), Inhalt rechts (7/12). |
| `.plus-list` | Liste mit rotem „+“ (`.plus-list--2` zweispaltig). |
| `.expert` | Porträt + Text (Ansprechpartner/in). |
| `.qcard` | Zitat-Karte mit Avatar (auf `.tg__item`). |
| `.cinfo` | Kontaktkarten (Adresse, Telefon, Zeiten). |
| `.form`, `.field`, `.consent`, `.form-card` | Formulare: Felder 50 hoch, Rahmen 10 %, Fokus Solid, ungültig Rot. |
| `.qf` | Mehrstufiges Anfrage-Formular; Optionen und Ausschlüsse in `src/data/anfrage.ts`, Logik in `main.js`. |
| `.article`, `.prose` | Beitragsseite: Kopf, Bild, Fließtext (H2 = `--t-h4`, Listen mit „+“). |

Seitenvorlagen mit Daten: Leistungen `src/data/services.ts` → `/leistungen/[slug]/`, Karriere-Einstiege `src/data/careers.ts` → `/karriere/[slug]/`, Beiträge `src/data/posts.json` → `/wissen/[slug]/`.

## Einblendung erster Bildschirm (Unterseiten)

Wie Startseite: Überzeile sofort (`e-up`), Titel zeilenweise per Skript; Untertitel/Einleitung auf allen Seiten (auch Startseite) als ganzer Block (`e-up` .45s bzw. im Sektionskopf hochgleiten mit .45s Verzögerung – wie „Passt das zu Ihnen?“), nie zeilenweise (Selektoren in `main.js`: `.hero-d__claim, .d-title, .art__head h1` bzw. `.hero-d__intro > .lead, .d-head > p, .pg-hero__txt > .lead, .art__head > .lead, .split__head > .lead`), danach Hinweis/Autorzeile/Schritte .55s, Buttons .67s, Karten/Bild/Seitenleiste .3s. Neue Kopf-Bausteine immer in diese Listen aufnehmen.

## Seitenkopf der Leistungsseiten

`PageHero` mit `frame` + `note` + `team`, danach `<Vertrauen band={false} />`:
- Text | Foto: ab 1280 50/50, 1024–1279 7:5 (Buttons in einer Zeile), ≤1023 untereinander, Text mittig.
- Unter der Einleitung (max. 540) die rote Linie (`note`) mit der Zielgruppe, danach Buttons, danach Team-Zeile (`.team-row--light`: Avatare + „Rund 20 Fachkräfte · über 20 Jahre Erfahrung · 100 % digital“, wie Kanzlei-Block der Startseite). Auf Handys (≤767) stehen die Avatare über dem Text, beides mittig.
- Foto bleibt in der Spalte (Inhaltskante), abgeschrägte Ecke 30, ab 1024 so hoch wie der Text, mindestens 420 (`--ph-min`); blendet ein und setzt sich aus leichtem Zoom; dahinter oben links „+“-Raster, links unten rotes Glühen wie Startseite. ≤1023: Foto 3:2 unter dem Text, mit Ecke.
- Abstände wie Startseite: Kopf + Einleitung (`.pg-hero__intro`, 20) → Hinweis → Buttons → Team je 30; unten normaler Sektionsabstand, danach Vertrauensleiste.

Reihenfolge Leistungsseite (Briefing): Kopf → Vertrauensleiste → Überblick + Vorteile → Leistungsumfang (dunkel) → Warum wir (`.why-person`, weiße Sektion, Namensschild Fresh 10: links Kopf + vier Gründe 2×2 mit Begriff `--t-h3` (Handy `--t-h4`) – DATEV, 20+, 1:1, 100 %; rechts Porträt mit Namensschild wie Kanzlei-Block, Höhe = Textspalte, mind. 420) → Ablauf → FAQ → Abschluss.

## Sektionstitel in einer Zeile

Kurze Titel, die einzeilig wirken sollen: `.d-title--line` (hebt die Breitenbegrenzung des Sektionskopfs auf; Umbruch nur bei Platzmangel, z. B. Handy).

## Einblendung beim Scrollen (alle Seiten gleich)

- Sektionskopf: Überzeile → Titel zeilenweise → Untertitel als Block.
- Listen, Raster und Karten erscheinen **Eintrag für Eintrag** (`stagger` bzw. `sr`, Abstand ~0,12 s) – nie als ein Block. Gilt für `.ind, .pillars-d, .plus-d, .sit, .posts, .stimmen, .founders-d, .faq, .aud, .scope, .pgrid, .pidx, .ctab`, Kanzlei-Werte, Warum-wir-Gründe, Vertrauensleiste. Neue Listen in `main.js` ergänzen.
- Auslöser einheitlich (`window.LK_REVEAL`): beim Scrollen, wenn die Oberkante ~20 % über dem unteren Fensterrand ist. Beim Laden bereits sichtbare Elemente unterhalb des Seitenkopfs starten 0,7 s nach dem Kopf (kein leerer Streifen). Gruppen in Karten starten mit ihrer Karte.
- Kein Element einer Sektion steht statisch, während der Rest einblendet. Footer bewusst ohne Einblendung.

## Brotkrumen

Komponente `src/components/page/Crumbs.astro` (inkl. strukturierte Daten `BreadcrumbList`).

- Auf allen Unterseiten außer Startseite, 404 und Rechtstexten (Impressum, Datenschutz, Barrierefreiheit).
- Menü-Hover: rote 1px-Linie wächst von links (.25s) und liegt genau auf der Unterkante des Headers (auf der Header-Linie), auch im fixierten Zustand.
- Header bis zur Fixierung ohne Hintergrund (transparent) – auf allen Seiten. Seitenkopf mit Foto: das Foto läuft wie auf der Startseite unter den Header bis an den oberen Rand.
- Header der Unterseiten (`.header--sub`): unten 1px-Linie (`--line`) auf Inhaltsbreite, solange er nicht fixiert ist; fixiert übernimmt die volle Linie des Glas-Hintergrunds.
- Abstand Brotkrumen → Inhalt (`--crumb-gap`): 60 ab 1536, sonst 40.
- Eigene Leiste direkt unter dem Header (`CrumbBar`, 20 unter seiner Linie), unabhängig vom Seitenkopf darunter – wie bei Ahlhoff. Auf allen Breiten linksbündig an der Inhaltskante (auch wenn der Seitenkopf darunter zentriert ist). Lange Pfade brechen um und schieben den Inhalt nach unten (nie überdecken).
- Abschluss-CTA übernimmt den Hintergrund der Sektion davor (nach Fresh-10 also Fresh-10) – kein weißer Streifen dazwischen.
- Stil: `--t-small`, Links Solid 60 % (Hover Rot), Trenner = kleiner roter Pfeil (›), aktuelle Seite Solid, 500.
- Fließtext (inline): der Pfeil hängt am vorherigen Glied, ein langer Titel läuft in derselben Zeile weiter und bricht normal um.
- Letztes Glied = Name der Seite aus dem Menü; bei Beiträgen der Titel.
- Die Überzeile darunter wiederholt die Brotkrumen nicht, sondern nennt das Thema (z. B. „Für Ärzte & Heilberufe“).

## Wissen-Übersicht

- Aufbau `.wlist` (gap `--g4` = 60, ab ≤1279 40): Kopf → Kasten `.wlist__box` (Themen + Beiträge, gap 20) → Seitennavigation. Keine Außen-/Innenabstände als Ersatz für gap.
- Themen (`.wbar`): Reiter auf einer Linie (1px `--line`), Abstand 30 (Handy 20), Innenabstand oben 0 / unten 10, Text Solid 60 / 500; aktiver Reiter Solid 700 mit roter 1px-Linie (wie Menü), Hover: Linie wächst von links ein wie im Menü (`scaleX`, Ursprung links, .25s). Anzahl als kleine rote Zahl (`--t-caps`, 700) hinter dem Namen. Handy: eine Zeile zum Wischen, läuft wie die Slider bis an beide Bildschirmränder (`--bleed`), kein Verlauf; die Linie bleibt auf Inhaltsbreite.
- Seitennavigation (`.pager`): Zahlen 01/02/03 ohne Rahmen (Solid 40, 700), aktive Seite Solid mit roter 1px-Linie (Innenabstand oben 0 / unten 5 – Linie nah an der Zahl; „Zurück / Weiter“ gleich hoch: Zeilenhöhe 26 + unten 5); außen „Zurück / Weiter“ (`--t-small`, 700, Pfeil weicht beim Hover nach außen). Abstand 30 (Handy 20). Keine Buttons, keine abgeschrägten Ecken.

## Beitrag (Wissen-Artikel)

- Beitragsbild mit abgeschrägter Ecke 30 (Handy 20) – nur im Einzelbeitrag, nicht in den Karten der Übersicht.
- Titel (H1) `--t-art`: 44/46, bis 1279 36/38, bis 767 30/32 (Zeilenhöhe = Größe + 2) – eine Stufe unter H2, weil Beitragstitel lang sind.
- Text in Abschnitten: jede H2 beginnt einen eigenen weißen Kasten (`.art__sec`, Innenabstand 40 / Handy 20), Kästen mit Abstand 20 auf Fresh 10. Einleitung vor der ersten H2 gehört zum ersten Kasten.
- Listen: Punkte mit dünnem rotem Haken (1,5px, Maske 16px, Zeilenmitte). Ein Punkt mit Unterliste ist nur eine fette Überschrift ohne Zeichen – kein Plus im Fließtext.
- Zwei Ansprech-CTAs zwischen den Kästen (wie Ahlhoff): groß `.art-cta--big` (Foto-Spalte links 240/200 + dunkler Kasten rechts, Abstand 20, beide gleich hoch; Handy: Foto 260 darunter) nach dem ersten Abschnitt; kurz `.art-cta` (dunkle Leiste; Titel beider CTAs H3, Handy H4, Text Fließtext) nach Abschnitt ⌊n/2⌋+1, bei 2 Abschnitten am Ende. Kasten ohne abgeschrägte Ecke.
- Beitragsbilder aus den Originalen (`~/Desktop/photo`) in 800/1200/1600 (WebP) + 800/1600 (JPG), immer mit `srcset`/`sizes`.

## Slider (Handy ≤767)

Karten-Slider (Startseite „Wissen“, `.pgrid--slider` im Beitrag) laufen bis an den Bildschirmrand, die erste Karte startet an der Inhaltskante: `--bleed: max(20px, (100vw − 580px) / 2)` als negativer Rand, Innenabstand und `scroll-padding`. Karten 85 % breit, Abstand 20, Snap auf Kartenanfang.

## Kanzlei & Team, Karriere, Kontakt
- Seitenkopf wie Leistungsseiten: `PageHero frame team` (+ `note`), danach `Vertrauen band={false}` – auf Kanzlei, Karriere, Ausbildung, Duales Studium, Kontakt.
- Gründerprofile: dunkle Sektion `.founders-p` (gap 120, ≤1023: 60) mit zwei `.kanzlei`-Blöcken (Text + `founders-d--one`); das zweite Profil `.kanzlei--flip` (Porträt links ab 1024). Werdegang und Qualifikationen als `kanzlei-values` mit Überschrift.
- Einzelporträt `founders-d--one` (Kanzlei-Gründer, „Warum wir“, Expertin) unter 1024: Fotorahmen über die volle Spaltenbreite, 3:2 (768–1023) bzw. 1:1 (Handy), Person freigestellt unten mittig (`object-fit: contain`), Fresh-Fläche mit Kreuzmuster füllt die Seiten. Eine Regel für alle Seiten.
- Teamraster `.tgrid`: 4 Spalten (≤1023: 2), gap 40/20; Karte `.tm` = Porträt 1:1 freigestellt auf Fresh mit Plus-Raster, Ecke 20 abgeschrägt, darunter Name (H5), Rolle (small), Zitat (muted); Abstände nur über gap. Einblendung gestaffelt.
- Partner/Standort: `split` + `ctab`.
- FAQ auf Karriereseiten: `FaqBlock light mail={careerContact.email}` (Du-Ansprache, E-Mail an Irina Leiblein).
- Reihenfolge der Hintergründe: nie zwei gleiche Sektionen hintereinander; vor `Abschluss` weiß oder hellblau.

## Qualitätsprüfung (Pflicht vor jeder Abgabe)

`tools/design-check.py` prüft alle Seiten in 5 Breiten gegen die Regeln dieses Designsystems (Referenz = Startseite):
Überzeile → Titel 10, Titel → nächstes Element 20, Sektionskopf → Inhalt = `--g4`, Button-Abstand nebeneinander 20 / untereinander 10, Schriftgrößen nur aus der Skala, kein `margin` außer den erlaubten Ausnahmen, kein abgeschnittener Text, kein horizontales Scrollen, keine JS-Fehler, jede Hover-Änderung mit Übergang, keine festen Farben im Unterseiten-Block von `styles.css`.

```
python tools/design-check.py            # alle Seiten
python tools/design-check.py /kontakt/  # einzelne Seiten
```

Voraussetzung: laufender Dev-Server (`npx astro dev --port 8080 --host 127.0.0.1`), Python mit Playwright, Google Chrome. Ergebnis muss „OK – keine Abweichungen gefunden“ sein.

Regeln für neue Seiten:
- Muster der Startseite immer über die vorhandenen Bausteine/Klassen bauen (`d-head__top` für Überzeile + Titel, `split`, `aud`, `pidx`, `ctab`, `form-card`, `qf`, `pcard`, `Stimmen`, `Abschluss` …), nie von Hand nachbauen.
- CSS für Unterseiten steht im Block „UNTERSEITEN – ein Regelwerk“ in `styles.css`, gegliedert in 8 Abschnitte. Änderungen dort an der passenden Stelle vornehmen – keine Nachträge am Dateiende.

## Karte (Kontakt)
- Platz: im Abschnitt „Anfahrt“ links unter Text und Liste, rechts das rote Formular; ab 1024 reicht die Karte bis zur Unterkante des Formulars (`.split--map`).
- Komponente `Karte.astro`: MapLibre (selbst gehostet unter `/vendor/maplibre/`) mit OpenFreeMap-Stil „positron“, Pin `assets/icons/map-pin.svg` (Solid Blue, rotes Plus, weißer Rand), „Route planen“ (Google Maps, neuer Tab) unten links.
- DSGVO: Statusmeldung „Karte wird geladen …“ / „Die Karte konnte nicht geladen werden.“; bis zur Einwilligung statisches Kartenbild vom eigenen Server (`karte-800/1400.webp`) + Freigabe-Karte „Externe Inhalte erlauben“ (eckiger Schalter, Rot = an). Freigabe auch über Cookie-Hinweis (Kategorie „Externe Inhalte“, `ext` in `lk-consent`) oder Schalter (`lk-map`). Bibliothek lädt erst in Sichtnähe.
- Kontaktformular: Honeypot-Feld `.hp` (name „website“) – Server verwirft Nachrichten, in denen es gefüllt ist.

## Menü: aktueller Bereich
- Hauptmenü: der Punkt des aktuellen Bereichs (auch auf Unterseiten, z. B. Artikel → Wissen, Leistungsseite → Leistungen) steht wie beim Hover in Rot mit Linie (`.nav__item.is-current`); im Dropdown und im mobilen Menü ist die aktuelle Seite rot (`aria-current="page"`).

## Karriere: Reihenfolge der Sektionen
- Übersicht: Kopf → Vertrauen → Offene Stellen (weiß, normaler Abschnitt `.split` ohne innere Karte, Stellen als weiße Karten mit Linie; Ziel von „Jetzt bewerben“) → Was dich erwartet (dunkel) → Teamstimmen (Fresh 10, Zitatkarte Fresh Blue) → FAQ (weiß) → Abschluss.
- Ausbildung / Duales Studium: Kopf → Vertrauen → Einstieg (weiß) → Das lernst du (dunkel) → Teamstimmen (Fresh 10, große Zitatkarte Fresh Blue, Avatar darin weiß) → FAQ (weiß, wie auf allen Seiten) → Abschluss.
- Startseite oben (Kopfzeile ohne Linie): Menü-Hover nur Rot, keine Linie; nach dem Scrollen (fixierte Kopfzeile mit Linie) wie auf den Unterseiten.
- Untermenü (Dropdown) beginnt 10 px über der Linie der Kopfzeile (oben 11, fixiert 0 unter dem Menüpunkt); eine unsichtbare Brücke hält den Hover auf dem Weg dorthin.

## Formulare: Prüfung, Fehlermeldung, Auswahlfeld
- Keine Browser-Hinweise (`novalidate`): Prüfung in `main.js` (`formCheck`), Meldung über `FormError.astro` direkt über dem Absende-Button – rotes Quadrat mit weißem „!“ + Text in Rot (14/500). Auf der roten Kontaktkarte (`.form-card`) Quadrat und Text Solid Blue.
- Texte: „Bitte füllen Sie alle Pflichtfelder aus.“ · „Bitte geben Sie eine gültige E-Mail-Adresse ein.“ · „Bitte stimmen Sie der Datenschutzerklärung zu.“ · im Anfrage-Formular zusätzlich „Bitte wählen Sie eine Antwort aus.“ Der Cursor springt ins erste fehlerhafte Feld.
- Auswahlfeld nie als Browser-`<select>`, sondern `Select.astro`: Feld wie die Eingabefelder, Chevron 8 px wie im Menü, Liste wie das Untermenü (weiß, abgeschrägte Ecke mit Linie, Schatten), gewählter Eintrag mit rotem „+“.
- Anfrage-Formular: Antworten 16/22, Kästchen → Text 20, gewählte Antwort nur rote Rahmenlinie (kein Hintergrund); „Weiter“ immer rechts, „Zurück“ wie in Beiträgen (`link-arrow art__back`); Pflichtfeld-Hinweis unter den Buttons, getrennt durch eine eigene Linie (`.qf__sep`); Telefon unter den Schritten groß (`.anf__tel--big`); am Telefon Formular direkt nach dem Kopf, ohne feste CTA-Leiste.
