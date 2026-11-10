# Leiblein + Kollegen – Website (Astro)

Statische Website, gebaut mit [Astro](https://astro.build). Ergebnis ist reines HTML/CSS/JS in `dist/`, das ohne PHP und Datenbank auf dem Strato-Webspace läuft.

## Designsystem

Farben, Schriftgrößen, Abstände, Breakpoints und Komponenten: siehe [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Neue Seiten verwenden nur diese Variablen.

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm install` | Abhängigkeiten installieren (einmalig) |
| `npm run dev` | Lokale Vorschau mit automatischem Neuladen (http://localhost:4321) |
| `npm run build` | Fertige Website nach `dist/` bauen |
| `npm run preview` | Gebaute Website aus `dist/` lokal ansehen |

## Struktur

```
src/
  data/site.ts          Kontakt, Social Media, Seiten-Adressen, Menüs (Header, mobil, Footer)
  data/faq.json         Strukturierte FAQ-Daten der Startseite
  layouts/Base.astro    Grundgerüst jeder Seite: <head>, Header, Footer, Cookie-Hinweis, Skripte
  components/           Wiederkehrende Bausteine (Header, Footer, Topbar, Rail, …)
  components/home/      Abschnitte der Startseite (Hero, Branchen, Leistungen, …)
  pages/                Eine Datei = eine Seite (index.astro → /, 404.astro → /404.html)
public/
  assets/               styles.css, main.js, Bilder, Schriften, Logos, Favicons (unverändert ausgeliefert)
  .htaccess             Weiterleitungen (HTTPS, www → ohne www), 404, Komprimierung, Cache
```

Neue Seite: Datei in `src/pages/` anlegen, z. B. `src/pages/kanzlei/index.astro` → `/kanzlei/`, und `Base` als Layout verwenden.

## Domain

Solange die Domain nicht feststeht, bleibt sie leer: Dann werden `canonical`, `og:url`, `og:image`, `sitemap.xml` und die Sitemap-Zeile in `robots.txt` weggelassen.

Sobald sie feststeht, in `astro.config.mjs` bei `SITE` eintragen (oder beim Build setzen: `SITE_URL=https://… npm run build`).

## Cache

`styles.css` und `main.js` erhalten beim Build automatisch eine Versionsnummer aus ihrem Inhalt (`?v=…`). Nach jeder Änderung lädt der Browser die neue Datei, ohne dass man etwas von Hand anpassen muss.

## Veröffentlichen

Inhalt von `dist/` (inkl. der versteckten Datei `.htaccess`) in das Wurzelverzeichnis des Strato-Webspace hochladen.

## Vorschau auf GitHub Pages

https://alexandersamar.github.io/leiblein-und-kollegen/ – wird bei jedem Push auf `main` automatisch gebaut (`.github/workflows/pages.yml`).
Der Vorschau-Build sperrt alle Seiten für Suchmaschinen (`PREVIEW=1`) und schreibt die Adressen auf den Unterordner um (`tools/rebase.mjs`, `BASE=/leiblein-und-kollegen`). Auf der echten Domain entfallen beide Schritte.
