// Qualifizierungs-Formular „Erstgespräch anfragen“ (Briefing Abschnitt 6).
// Schwellen und Ausschlüsse hier ändern: reject: true = Anfrage führt zur Seite „Leider nicht“ (keine Daten werden erfasst).
// Mindestumsatz: steht in der Antwort „unter …“ und im Absagetext
export const minUmsatz = '100.000 €';

export interface Option { label: string; value: string; reject?: boolean }
export interface Step { name: string; question: string; hint?: string; optional?: boolean; options: Option[] }

export const steps: Step[] = [
  { name: 'status', question: 'Wie sind Sie tätig?', options: [
    { label: 'Angestellt', value: 'angestellt', reject: true },
    { label: 'Selbstständig / Freiberuflich', value: 'selbststaendig' },
    { label: 'Unternehmer (GmbH, Personengesellschaft)', value: 'unternehmer' },
  ] },
  { name: 'umsatz', question: 'Wie hoch ist Ihr Jahresumsatz?', options: [
    { label: `unter ${minUmsatz}`, value: 'unter-100', reject: true },
    { label: '100.000 – 250.000 €', value: '100-250' },
    { label: '250.000 – 500.000 €', value: '250-500' },
    { label: 'über 500.000 €', value: 'ueber-500' },
  ] },
  { name: 'branche', question: 'In welcher Branche sind Sie tätig?', options: [
    { label: 'Gesundheitswesen', value: 'gesundheitswesen' },
    { label: 'Handwerk', value: 'handwerk' },
    { label: 'E-Commerce', value: 'e-commerce' },
    { label: 'Immobilien', value: 'immobilien' },
    { label: 'Dienstleistung', value: 'dienstleistung' },
    { label: 'Gastronomie', value: 'gastronomie', reject: true },
    { label: 'Taxi / Personenbeförderung', value: 'taxi', reject: true },
    { label: 'Sonstiges', value: 'sonstiges' },
  ] },
  { name: 'rechtsform', question: 'Welche Rechtsform hat Ihr Unternehmen?', options: [
    { label: 'Einzelunternehmen', value: 'einzelunternehmen' },
    { label: 'Einzelpraxis / Freiberufler', value: 'freiberufler' },
    { label: 'GbR / Partnerschaft', value: 'gbr' },
    { label: 'GmbH / UG', value: 'gmbh' },
    { label: 'GmbH & Co. KG', value: 'gmbh-co-kg' },
    { label: 'Verein', value: 'verein', reject: true },
    { label: 'Stiftung', value: 'stiftung', reject: true },
    { label: 'Genossenschaft', value: 'genossenschaft', reject: true },
    { label: 'gGmbH', value: 'ggmbh', reject: true },
    { label: 'Andere', value: 'andere' },
  ] },
  { name: 'anlass', question: 'Was ist Ihr Anlass?', hint: 'Optional – hilft uns bei der Vorbereitung.', optional: true, options: [
    { label: 'Mein Steuerberater hört auf', value: 'ruhestand' },
    { label: 'Unzufrieden mit dem bisherigen Service', value: 'unzufrieden' },
    { label: 'Gründung', value: 'gruendung' },
    { label: 'Wachstum / mehr Beratung', value: 'wachstum' },
    { label: 'Sonstiges', value: 'sonstiges' },
  ] },
];
export const contactTimes = ['Vormittags', 'Mittags', 'Nachmittags', 'Egal'];

// Absageseite: Text je nach Grund (= Name des Schritts, an dem abgesagt wurde). Ohne Grund gilt „umsatz“.
export const rejectTexts: Record<string, string> = {
  status: 'Wir beraten ausschließlich Unternehmen und Selbstständige. Für Ihre Einkommensteuererklärung als Arbeitnehmerin oder Arbeitnehmer ist ein Lohnsteuerhilfeverein oft die passende und günstige Wahl.',
  umsatz: `Wir haben uns auf Unternehmen ab ${minUmsatz} Jahresumsatz spezialisiert, die digital mit uns zusammenarbeiten möchten. Damit Sie die bestmögliche Betreuung bekommen, empfehlen wir Ihnen eine Kanzlei, die genau auf Ihre Situation ausgerichtet ist.`,
  branche: 'Bargeldintensive Branchen wie Gastronomie und Personenbeförderung brauchen eine besonders spezialisierte Betreuung. Darauf sind wir nicht ausgerichtet – eine Kanzlei mit genau diesem Schwerpunkt kann Sie besser begleiten.',
  rechtsform: 'Vereine, Stiftungen, Genossenschaften und gemeinnützige Gesellschaften folgen eigenen steuerlichen Regeln. Darauf sind wir nicht spezialisiert – eine Kanzlei mit Schwerpunkt Gemeinnützigkeit kann Sie besser begleiten.',
};
