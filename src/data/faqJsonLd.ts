// Strukturierte Daten (schema.org FAQPage) aus einer Fragenliste
export const faqJsonLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((it) => ({ '@type': 'Question', name: it.q, acceptedAnswer: { '@type': 'Answer', text: it.a.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ') } })),
});
