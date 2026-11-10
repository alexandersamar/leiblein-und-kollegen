// Beiträge (aus der bisherigen Website übernommen) + Hilfsfunktionen
import posts from './posts.json';
export interface Post { slug: string; title: string; date: string | null; category: string; excerpt: string; readingMinutes: number; image: string | null; body: string }
export const allPosts = posts as Post[];
export const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString('de-DE', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
export const categories = [...new Set(allPosts.map((p) => p.category))];

// Zwischenüberschriften (h2) mit IDs versehen und als Inhaltsverzeichnis zurückgeben
const slugify = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, '').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
export const withToc = (html: string) => {
  const toc: { id: string; title: string }[] = [];
  const body = html.replace(/<h2>(.*?)<\/h2>/g, (_m, t) => {
    const title = t.replace(/<[^>]+>/g, '').replace(/^\d+\.\s*/, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    let id = slugify(title) || `abschnitt-${toc.length + 1}`;
    if (toc.some((x) => x.id === id)) id += `-${toc.length + 1}`;
    toc.push({ id, title });
    // Manuelle Nummern („1.“) aus den Überschriften entfernen: viele Beiträge nummerieren nur einen Teil (Fazit ohne Nummer) – die Nummer steht einheitlich im Inhaltsverzeichnis
    return `<h2 id="${id}">${t.replace(/^\s*\d+\.\s*/, '')}</h2>`;
  });
  return { body, toc };
};
export const countBy = (cat: string) => allPosts.filter((p) => p.category === cat).length;

// Seitenweise Darstellung (wie Ahlhoff): 1 großer + 6 Beiträge pro Seite
export const PER_PAGE = 7;
export const catSlug = (c: string) => c.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-');
export const pages = <T,>(list: T[]) => Array.from({ length: Math.max(1, Math.ceil(list.length / PER_PAGE)) }, (_, i) => list.slice(i * PER_PAGE, (i + 1) * PER_PAGE));
export const listUrl = (cat: string | null, n: number) => `/wissen/${cat ? `thema/${catSlug(cat)}/` : ''}${n > 1 ? `seite/${n}/` : ''}`;
