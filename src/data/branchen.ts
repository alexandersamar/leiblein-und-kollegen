// Inhalte der Branchenseiten (außer Gesundheitswesen, die eine eigene Seite hat). /branchen/[slug]/ entsteht automatisch.
// Aufbau wie Gesundheitswesen: Kopf → Vertrauen → Zielgruppen → Leistungsumfang → Situationen → Warum wir → Stimmen → Ablauf → FAQ → Abschluss
// Texte: L+K-Entwurf nach Briefing (Abschnitt Zielgruppen/Branchen) und Startseite – mit dem Mandanten abstimmen.
import { services } from './site';

type Svc = keyof typeof services;
const img = (k: string, alt: string) => ({ webp: `/assets/img/branche-${k}-frame-800.webp 800w, /assets/img/branche-${k}-frame-1200.webp 1200w, /assets/img/branche-${k}-frame-1600.webp 1600w`, src: `/assets/img/branche-${k}-frame-1600.jpg`, alt, width: 1600, height: 1067 });

export interface Branche {
  slug: string;
  label: string;               // Brotkrumen / Menü
  eyebrow: string;
  title: string;               // H1, HTML erlaubt
  lead: string;
  note: string;                // rote Linie unter der Einleitung
  img: ReturnType<typeof img>;
  groups: { title: string; text: string }[];
  groupsHead: { title: string; lead: string };
  scope: string[];
  situations: { tag: string; q: string; a: string[]; link: Svc }[];
  person?: 'irina' | 'eberhard';
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
}

export const branchen: Branche[] = [
  {
    slug: 'handwerk',
    label: 'Handwerk',
    eyebrow: 'Für Handwerksbetriebe',
    title: 'Steuerberatung für das Handwerk – <em>SHK und Bau.</em>',
    lead: 'Vom Einzelunternehmen zur GmbH oder Holding: Wir begleiten Ihren Betrieb bei Wachstum, Liquidität und Steuern – digital, persönlich und deutschlandweit.',
    note: 'Für Handwerksbetriebe ab 100.000 € Jahresumsatz, die digital zusammenarbeiten möchten',
    img: img('handwerk', 'Handwerker justiert eine Heizungsanlage'),
    groupsHead: { title: 'Betriebe, <em>die wir kennen.</em>', lead: 'Wir betreuen Handwerksbetriebe, die wachsen und ihre Zahlen digital und vorausschauend führen möchten.' },
    groups: [
      { title: 'SHK-Betriebe', text: 'Sanitär, Heizung und Klima – vom Meisterbetrieb bis zum Unternehmen mit mehreren Teams.' },
      { title: 'Bau & Ausbau', text: 'Bauhaupt- und Ausbaugewerbe mit Projekten, Abschlagsrechnungen und Nachunternehmern.' },
      { title: 'Elektro & Technik', text: 'Elektro-, Photovoltaik- und Gebäudetechnik-Betriebe mit wachsendem Auftragsvolumen.' },
      { title: 'Familienbetriebe', text: 'Betriebe, die in die nächste Generation gehen oder eine neue Struktur brauchen.' },
    ],
    scope: [
      'Digitale Finanzbuchhaltung über DATEV – Belege per App vom Einsatzort',
      'Lohnabrechnung inkl. Überstunden, Auslösen und Baulohn-Besonderheiten',
      'Jahresabschluss und betriebliche Steuererklärungen',
      'Prüfung der Rechtsform – Einzelunternehmen, GmbH oder Holding',
      'Liquiditätsplanung bei Vorfinanzierung von Material und Projekten',
      'Umsatzsteuer bei Bauleistungen (§ 13b UStG) im Blick',
      'Investitionsplanung für Fahrzeuge, Maschinen und Werkstatt',
      'Begleitung bei Betriebsübergabe und Nachfolge',
    ],
    situations: [
      { tag: 'Wachstum', q: 'Wir haben mehr Aufträge als je zuvor – aber am Monatsende ist das Konto knapp.', a: ['Liquiditätsplanung mit Blick auf Material und Abschläge', 'Kennzahlen, die zeigen, welche Aufträge sich lohnen'], link: 'beratung' },
      { tag: 'Rechtsform', q: 'Lohnt sich für meinen Betrieb eine GmbH oder Holding?', a: ['Vergleich von Steuern, Haftung und Entnahmen', 'Umstrukturierung Schritt für Schritt begleitet'], link: 'beratung' },
      { tag: 'Alltag', q: 'Ich will auf der Baustelle sein, nicht im Büro.', a: ['Belege per App, Buchhaltung und Lohn bei uns', 'Zahlungsverkehr und Mahnwesen auf Wunsch über unser Back Office'], link: 'fibu' },
      { tag: 'Übergabe', q: 'Mein Betrieb soll in der Familie bleiben.', a: ['Nachfolge frühzeitig planen und Betrieb bewerten', 'Steuerlich durchdachte Übergabe an die nächste Generation'], link: 'nachfolge' },
    ],
    person: 'eberhard',
    faq: [
      { q: 'Betreuen Sie auch Handwerksbetriebe außerhalb von Aschaffenburg?', a: 'Ja. Belege, Auswertungen und Besprechungen laufen digital über DATEV; Termine sind per Video oder bei uns in Aschaffenburg möglich.' },
      { q: 'Ab wann lohnt sich für einen Handwerksbetrieb die GmbH?', a: 'Das hängt vor allem von Gewinn, Entnahmen und Haftungsrisiko ab. Wir rechnen beide Varianten für Ihren Betrieb durch und zeigen, ab wann sich der Wechsel rechnet.' },
      { q: 'Wie kommen meine Belege von der Baustelle zu Ihnen?', a: 'Per App direkt vom Smartphone: fotografieren, hochladen, fertig. Bankumsätze übernehmen wir automatisch.' },
      { q: 'Kennen Sie sich mit § 13b UStG bei Bauleistungen aus?', a: 'Ja. Ob Sie Umsatzsteuer berechnen oder die Steuerschuld auf den Auftraggeber übergeht, prüfen wir bei Ein- und Ausgangsrechnungen im Rahmen der laufenden Buchhaltung.' },
      { q: 'Was passiert im Erstgespräch?', a: 'Wir besprechen Ihren Betrieb, Ihre Ziele und welche Leistungen sinnvoll sind. Danach wissen Sie, wie eine Zusammenarbeit konkret aussehen würde.' },
    ],
    seo: { title: 'Steuerberater für Handwerk, SHK und Bau | Leiblein + Kollegen', description: 'Steuerberatung für Handwerksbetriebe in SHK und Bau: Buchhaltung, Lohn, Jahresabschluss, Rechtsform und Nachfolge – digital und deutschlandweit.' },
  },
  {
    slug: 'e-commerce',
    label: 'E-Commerce',
    eyebrow: 'Für Online-Händler',
    title: 'Steuerberatung für E-Commerce – <em>automatisiert gebucht.</em>',
    lead: 'Shop, Marktplatz und Zahlungsanbieter laufen bei uns über Schnittstellen in die Buchhaltung – und die Umsatzsteuer im In- und Ausland behalten wir im Blick.',
    note: 'Für Online-Händler ab 100.000 € Jahresumsatz, die digital zusammenarbeiten möchten',
    img: img('ecommerce', 'Unternehmerin packt Online-Bestellungen'),
    groupsHead: { title: 'Händler, <em>die wir kennen.</em>', lead: 'Wir betreuen Online-Händler, deren Umsätze über viele Kanäle laufen – und die dafür eine automatisierte Buchhaltung brauchen.' },
    groups: [
      { title: 'Eigene Online-Shops', text: 'Shops auf Shopify, WooCommerce und anderen Systemen.' },
      { title: 'Marktplatz-Händler', text: 'Verkäufer auf Amazon, eBay und weiteren Marktplätzen.' },
      { title: 'Multichannel', text: 'Händler mit Shop, Marktplätzen und stationärem Verkauf zugleich.' },
      { title: 'Verkauf ins Ausland', text: 'Händler mit Kunden in der EU – inklusive OSS-Verfahren.' },
    ],
    scope: [
      'Schnittstellen zu Shop, Marktplätzen und Zahlungsanbietern (z. B. PayPal)',
      'Digitale, automatisierte Finanzbuchhaltung über DATEV',
      'Umsatzsteuer bei Verkäufen ins EU-Ausland (OSS-Verfahren)',
      'Abstimmung von Zahlungseingängen, Gebühren und Retouren',
      'Lohnabrechnung für Ihr Team',
      'Jahresabschluss und betriebliche Steuererklärungen',
      'Kennzahlen zu Marge, Kanälen und Liquidität',
      'Prüfung der Rechtsform beim Wachstum',
    ],
    situations: [
      { tag: 'Start', q: 'Ich verkaufe auf drei Kanälen – und verliere den Überblick über meine Zahlen.', a: ['Schnittstellen statt Handarbeit', 'Monatliche Auswertungen pro Kanal'], link: 'fibu' },
      { tag: 'Ausland', q: 'Meine Kunden sitzen in ganz Europa – was gilt bei der Umsatzsteuer?', a: ['OSS-Verfahren für Verkäufe in die EU', 'Laufende Prüfung von Lieferschwellen und Steuersätzen'], link: 'jahresabschluss' },
      { tag: 'Wachstum', q: 'Der Umsatz wächst, die Marge nicht.', a: ['Kennzahlen zu Gebühren, Retouren und Werbekosten', 'Liquiditätsplanung für Einkauf und Lager'], link: 'beratung' },
      { tag: 'Team', q: 'Ich stelle die ersten Mitarbeiter ein.', a: ['Lohnabrechnung und Meldungen', 'Lohnkosten vorab berechnet'], link: 'lohn' },
    ],
    faq: [
      { q: 'Welche Shop- und Marktplatzsysteme binden Sie an?', a: 'Gängige Systeme wie Shopify, WooCommerce und Amazon sowie Zahlungsanbieter wie PayPal binden wir – wo möglich – über Schnittstellen an DATEV an. Welche Lösung für Ihren Shop passt, klären wir im Erstgespräch.' },
      { q: 'Was ist das OSS-Verfahren?', a: 'Über den One-Stop-Shop melden Sie die Umsatzsteuer für Verkäufe an Privatkunden in anderen EU-Ländern zentral in Deutschland. Wir prüfen, ob Sie es nutzen sollten, und übernehmen die Meldungen.' },
      { q: 'Wie werden Gebühren und Retouren gebucht?', a: 'Marktplatz- und Zahlungsgebühren sowie Rückerstattungen werden über die Schnittstellen erfasst und mit den Auszahlungen abgestimmt – so stimmen Umsätze und Bankkonto überein.' },
      { q: 'Ich verkaufe noch wenig – passe ich zu Ihnen?', a: 'Wir betreuen Unternehmen ab rund 100.000 € Jahresumsatz. Sind Sie noch darunter, sagen wir Ihnen das im Erstgespräch offen.' },
      { q: 'Was passiert im Erstgespräch?', a: 'Wir besprechen Ihre Kanäle, Ihre Ziele und welche Leistungen sinnvoll sind. Danach wissen Sie, wie eine Zusammenarbeit konkret aussehen würde.' },
    ],
    seo: { title: 'Steuerberater für E-Commerce & Online-Händler | Leiblein + Kollegen', description: 'Automatisierte Buchhaltung für Online-Händler über Schnittstellen zu Shop, Marktplatz und PayPal – inklusive OSS-Verfahren, digital und deutschlandweit.' },
  },
  {
    slug: 'immobilien',
    label: 'Immobilien',
    eyebrow: 'Für Immobiliengesellschaften',
    title: 'Steuerberatung für Immobilien – <em>mit Back Office.</em>',
    lead: 'Mietcontrolling, Zahlungsverkehr, Buchhaltung und Steuern für Immobiliengesellschaften und Vermieter – auf Wunsch mit unserem Back-Office-Service.',
    note: 'Für Immobiliengesellschaften und Vermieter, die digital zusammenarbeiten möchten',
    img: img('immobilien', 'Zwei Geschäftspartner besprechen Unterlagen vor einem Gebäude'),
    groupsHead: { title: 'Eigentümer, <em>die wir kennen.</em>', lead: 'Wir betreuen Immobilienbestände, bei denen Mieten, Zahlungen und Steuern zuverlässig laufen müssen.' },
    groups: [
      { title: 'Immobiliengesellschaften', text: 'GmbH, GmbH & Co. KG und vermögensverwaltende Gesellschaften.' },
      { title: 'Familiengesellschaften', text: 'Familien, die gemeinsam Immobilien halten und verwalten.' },
      { title: 'Private Vermieter', text: 'Vermieter mit größerem Bestand und hohem Verwaltungsaufwand.' },
      { title: 'Gewerbliche Vermietung', text: 'Vermietung von Büro-, Praxis- und Gewerbeflächen.' },
    ],
    scope: [
      'Überwachung der Mieteingänge und Mahnwesen',
      'Zahlungsverkehr und kaufmännische Korrespondenz',
      'Digitale Finanzbuchhaltung über DATEV',
      'Nebenkosten im Blick und Belege digital archiviert',
      'Jahresabschluss und Steuererklärungen, inkl. gesonderter Feststellungen',
      'Umsatzsteuer bei gewerblicher Vermietung (Option) geprüft',
      'Gestaltung bei Kauf, Verkauf und Übertragung von Immobilien',
      'Erbschaft- und Schenkungsteuer bei Übertragungen in der Familie',
    ],
    situations: [
      { tag: 'Verwaltung', q: 'Wer hat diesen Monat eigentlich gezahlt?', a: ['Mieteingänge laufend überwacht', 'Mahnwesen über unser Back Office'], link: 'backoffice' },
      { tag: 'Ordnung', q: 'Belege, Verträge, Nebenkosten – alles liegt in Ordnern.', a: ['Digitale Archivierung und ersetzendes Scannen', 'Buchhaltung über DATEV'], link: 'backoffice' },
      { tag: 'Struktur', q: 'Halten wir unsere Immobilien in der richtigen Gesellschaft?', a: ['Vergleich von privater Vermietung, GmbH und KG', 'Steuerlich durchdachte Umstrukturierung'], link: 'beratung' },
      { tag: 'Familie', q: 'Die Immobilien sollen an die nächste Generation gehen.', a: ['Übertragung frühzeitig planen', 'Erbschaft- und Schenkungsteuer im Blick'], link: 'nachfolge' },
    ],
    faq: [
      { q: 'Was übernimmt Ihr Back-Office-Service für Immobilien?', a: 'Zum Beispiel die Überwachung der Mieteingänge, Mahnwesen, Zahlungsverkehr, Korrespondenz sowie Ablage und digitale Archivierung – ganz oder in Teilen.' },
      { q: 'Lohnt sich eine Immobilien-GmbH?', a: 'Das hängt von Ihren Zielen, dem Bestand und der geplanten Haltedauer ab. Wir vergleichen private Vermietung und Gesellschaft für Ihre Situation.' },
      { q: 'Betreuen Sie auch private Vermieter?', a: 'Ja, wenn der Bestand eine laufende Betreuung sinnvoll macht. Im Erstgespräch klären wir, ob wir zu Ihnen passen.' },
      { q: 'Was passiert im Erstgespräch?', a: 'Wir besprechen Ihren Bestand, Ihre Ziele und welche Leistungen sinnvoll sind. Danach wissen Sie, wie eine Zusammenarbeit konkret aussehen würde.' },
    ],
    seo: { title: 'Steuerberater für Immobilien & Vermieter | Leiblein + Kollegen', description: 'Mietcontrolling, Zahlungsverkehr, Buchhaltung und Steuern für Immobiliengesellschaften und Vermieter – mit Back-Office-Service, digital und deutschlandweit.' },
  },
  {
    slug: 'gmbh-personengesellschaften',
    label: 'GmbH & Personengesellschaften',
    eyebrow: 'Für Gesellschaften',
    title: 'Steuerberatung für GmbH <em>und Personengesellschaften.</em>',
    lead: 'Laufende Betreuung, Jahresabschluss und Gestaltungsberatung für Gesellschaften und Gesellschafter – mit Blick auf beide Ebenen.',
    note: 'Für Gesellschaften ab 100.000 € Jahresumsatz, die digital zusammenarbeiten möchten',
    img: img('gesellschaften', 'Geschäftsführung bespricht Zahlen am Bildschirm'),
    groupsHead: { title: 'Gesellschaften, <em>die wir kennen.</em>', lead: 'Wir betreuen Gesellschaften und ihre Gesellschafter – denn Steuern im Unternehmen und privat hängen eng zusammen.' },
    groups: [
      { title: 'GmbH & UG', text: 'Kapitalgesellschaften mit Geschäftsführern, die zugleich Gesellschafter sind.' },
      { title: 'GmbH & Co. KG', text: 'Personengesellschaften mit Haftungsbeschränkung und mehreren Gesellschaftern.' },
      { title: 'GbR, OHG & KG', text: 'Personengesellschaften, bei denen Betrieb und Privatsteuer zusammenspielen.' },
      { title: 'Holdings', text: 'Holding-Strukturen für Beteiligungen, Gewinne und die Nachfolge.' },
    ],
    scope: [
      'Laufende digitale Buchhaltung und Lohn über DATEV',
      'Jahresabschluss für alle Rechtsformen',
      'Körperschaft-, Gewerbe- und Umsatzsteuer',
      'Gesonderte und einheitliche Feststellungen für Personengesellschaften',
      'Geschäftsführer-Verträge und Vermeidung verdeckter Gewinnausschüttungen',
      'Gewinnverwendung, Ausschüttung und Gesellschafter-Darlehen',
      'Umstrukturierung und Holding-Gestaltung',
      'Begleitung bei Betriebsprüfungen',
    ],
    situations: [
      { tag: 'Jahresende', q: 'Was sollten wir vor dem 31.12. noch klären?', a: ['Herbstgespräch zu Verträgen, Rückstellungen und Investitionen', 'Gesellschafterbeschlüsse rechtzeitig vorbereitet'], link: 'jahresabschluss' },
      { tag: 'Geschäftsführer', q: 'Ist mein Gehalt als Gesellschafter-Geschäftsführer angemessen?', a: ['Fremdvergleich und Vermeidung verdeckter Gewinnausschüttungen', 'Tantieme und Pensionszusagen geprüft'], link: 'beratung' },
      { tag: 'Struktur', q: 'Brauchen wir eine Holding?', a: ['Vergleich von Steuern und Flexibilität', 'Umstrukturierung Schritt für Schritt begleitet'], link: 'beratung' },
      { tag: 'Wechsel', q: 'Ein Gesellschafter steigt aus – was bedeutet das steuerlich?', a: ['Anteilsübertragung und Verlustvorträge im Blick', 'Bewertung und Gestaltung des Übergangs'], link: 'nachfolge' },
    ],
    person: 'eberhard',
    faq: [
      { q: 'Betreuen Sie Gesellschaft und Gesellschafter gemeinsam?', a: 'Ja. Betrieb und private Steuer der Gesellschafter hängen eng zusammen – deshalb betrachten wir beide Ebenen und stimmen sie aufeinander ab.' },
      { q: 'Was ist eine verdeckte Gewinnausschüttung?', a: 'Ein Vorteil an den Gesellschafter, der einem fremden Dritten so nicht gewährt würde – etwa ein zu hohes Gehalt. Wir prüfen Verträge und Vereinbarungen auf Fremdüblichkeit.' },
      { q: 'Wann lohnt sich eine Holding?', a: 'Etwa wenn Gewinne reinvestiert, Beteiligungen gebündelt oder die Nachfolge vorbereitet werden sollen. Wir rechnen durch, ob sich die Struktur für Sie lohnt.' },
      { q: 'Erstellen Sie auch die Feststellungserklärung unserer KG?', a: 'Ja – inklusive Sonderbetriebseinnahmen und -ausgaben der Gesellschafter.' },
      { q: 'Was passiert im Erstgespräch?', a: 'Wir besprechen Ihre Gesellschaft, Ihre Ziele und welche Leistungen sinnvoll sind. Danach wissen Sie, wie eine Zusammenarbeit konkret aussehen würde.' },
    ],
    seo: { title: 'Steuerberater für GmbH & Personengesellschaften | Leiblein + Kollegen', description: 'Laufende Betreuung, Jahresabschluss und Gestaltungsberatung für GmbH, UG, GmbH & Co. KG und Holdings – für Gesellschaft und Gesellschafter.' },
  },
];
