// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domain der Website. Solange sie nicht feststeht, leer lassen:
// dann entfallen canonical, og:url, og:image, sitemap.xml und die Sitemap-Zeile in robots.txt.
// Sobald die Domain feststeht, hier eintragen (z. B. 'https://www.beispiel.de') oder beim Build setzen: SITE_URL=https://… npm run build
const SITE = process.env.SITE_URL || '';

// Lokale Vorschau (astro dev): Adressen auch ohne Schrägstrich am Ende annehmen – sonst zeigt Astro bei /gibts-nicht
// statt unserer 404-Seite seinen „trailingSlash“-Hinweis. Für den Build bleibt „always“ (Server: .htaccess).
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: SITE || undefined,
  // Ordner-Adressen wie /kanzlei/ → dist/kanzlei/index.html
  trailingSlash: isDev ? 'ignore' : 'always',
  build: { format: 'directory' },
  // HTML nicht zusammenpressen: Leerzeichen zwischen Inline-Elementen bleiben exakt wie im Entwurf
  compressHTML: false,
  // Entwickler-Leiste von Astro in der lokalen Vorschau ausblenden
  devToolbar: { enabled: false },
  integrations: SITE ? [sitemap({ filter: (page) => !page.includes('/404') })] : [],
});
