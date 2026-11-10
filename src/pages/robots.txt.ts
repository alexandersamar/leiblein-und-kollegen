import type { APIRoute } from 'astro';

// robots.txt: Sitemap-Zeile nur, wenn die Domain in astro.config.mjs gesetzt ist
export const GET: APIRoute = ({ site }) => {
  // Vorschau-Build (PREVIEW=1): komplett sperren
  if (process.env.PREVIEW) return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /404.html'];
  if (site) lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`);
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
