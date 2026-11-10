// Inhalte der Leistungsseiten. Eine Leistung = ein Eintrag; /leistungen/[slug]/ entsteht automatisch.
// Texte teilweise von der bisherigen Website übernommen und gekürzt.
import { url } from './site';

export interface Service {
  slug: string;
  key: string;                 // Schlüssel in site.ts › services
  pillar: 'Beratung' | 'Buchhaltung' | 'Steuern';
  title: string;               // H1, HTML erlaubt
  teaser: string;              // Text in Übersicht/Karten
  lead: string;
  img: { webp: string; src: string; alt: string; width: number; height: number };
  intro: { title: string; text: string[] };
  scope: string[];             // Was wir übernehmen
  benefits: { title: string; text: string }[];
  faq: { q: string; a: string }[];
  person?: 'irina' | 'eberhard';  // Gesicht im Block „Warum wir“ (Standard: Irina)
  seo: { title: string; description: string };
}

export const servicePages: Service[] = [
  {
    slug: 'buchhaltung',
    key: 'fibu',
    pillar: 'Buchhaltung',
    title: 'Finanzbuchhaltung – <em>digital und beleglos.</em>',
    teaser: 'Belege per Upload, Buchungen bei uns, aktuelle Zahlen jederzeit online – auf Wunsch komplett papierlos.',
    lead: 'Konzentrieren Sie sich auf Ihr Tagesgeschäft. Wir kümmern uns um Ihre Finanzbuchhaltung – digital über DATEV, mit Schnittstellen zu Bank, Kasse und Shop.',
    img: { webp: '/assets/img/leistung-buchhaltung-800.webp 800w, /assets/img/leistung-buchhaltung-1200.webp 1200w, /assets/img/leistung-buchhaltung-1600.webp 1600w', src: '/assets/img/leistung-buchhaltung-1600.jpg', alt: 'Mitarbeiterin bearbeitet Belege und Unterlagen am Schreibtisch', width: 1600, height: 1067 },
    intro: {
      title: 'Buchhaltung ist mehr als Pflicht – <em>sie ist Ihr Kompass.</em>',
      text: [
        'Eine stets aktuelle Buchhaltung zeigt Ihnen, wo Ihr Unternehmen steht – und ist die Grundlage für jede gute Entscheidung. Wir übernehmen die laufende Buchführung und liefern Ihnen Auswertungen, mit denen Sie planen können.',
        'Ihre Belege digitalisieren Sie per Scan, App oder PDF – wir bearbeiten, erfassen und archivieren sie digital. Die Originale bleiben bei Ihnen, die Zahlen stehen Ihnen jederzeit online zur Verfügung.',
      ],
    },
    scope: [
      'Kontierung und elektronische Erfassung der laufenden Geschäftsvorfälle',
      'Digitale, papierlose Finanzbuchführung über DATEV',
      'Schnittstellen zu Bank, Kasse, Shop und Marktplätzen',
      'Laufende Abstimmung der Konten',
      'Offene-Posten-Verwaltung für Kunden und Lieferanten',
      'Prüfung der Umsatzsteuer-Identifikationsnummern',
      'Kostenrechnung und betriebswirtschaftliche Auswertungen (BWA)',
      'Organisation des Rechnungswesens und Übernahme des Mahnwesens',
    ],
    benefits: [
      { title: 'Zeit und Kosten sparen', text: 'Einfache, unkomplizierte Abwicklung – ohne Ordner und Postweg.' },
      { title: 'Aktuelle Zahlen', text: 'Auswertungen jederzeit abrufbar – die Basis für Ihre Planung.' },
      { title: 'Platz und Ordnung', text: 'Digitale Archivierung statt Aktenschrank.' },
      { title: 'Keine eigene Abteilung', text: 'Sie sparen Personalkosten und Einarbeitung.' },
    ],
    faq: [
      { q: 'Wie kommen meine Belege zu Ihnen?', a: 'Per Upload über DATEV Unternehmen online, per App oder als PDF. Bankumsätze und – wo möglich – Shop- und Kassendaten übernehmen wir automatisch über Schnittstellen.' },
      { q: 'Muss ich meine Belege weiterhin aufbewahren?', a: 'Die Originale bleiben bei Ihnen. Welche Belege Sie nach dem Digitalisieren wie lange aufbewahren müssen, klären wir mit Ihnen im Rahmen einer Verfahrensdokumentation.' },
      { q: 'Wie oft wird gebucht?', a: 'In der Regel monatlich – passend zu Ihren Umsatzsteuer-Voranmeldungen. Auf Wunsch auch häufiger, wenn Sie Ihre Zahlen enger steuern möchten.' },
      { q: 'Ich verkaufe online – übernehmen Sie auch Shop- und Marktplatzdaten?', a: 'Ja. Umsätze aus Shop-Systemen wie Shopify oder WooCommerce, von Marktplätzen wie Amazon und von Zahlungsdienstleistern wie PayPal übernehmen wir – wo möglich – automatisch über Schnittstellen. Die Umsatzsteuer bei Verkäufen ins EU-Ausland (OSS-Verfahren) behalten wir dabei im Blick.' },
      { q: 'Können Sie meine Buchhaltung vom bisherigen Steuerberater übernehmen?', a: 'Ja. Wir stimmen die Übergabe mit Ihrem bisherigen Berater ab und starten über das DATEV-Online-Onboarding.' },
    ],
    seo: { title: 'Digitale Finanzbuchhaltung | Leiblein + Kollegen', description: 'Digitale, beleglose Finanzbuchhaltung über DATEV – mit Schnittstellen zu Bank, Kasse und Shop. Für Unternehmen in ganz Deutschland.' },
  },
  {
    slug: 'unternehmensberatung',
    key: 'beratung',
    pillar: 'Beratung',
    title: 'Unternehmensberatung – <em>mit Blick aufs Ganze.</em>',
    teaser: 'Kennzahlen, Controlling und Umstrukturierung – etwa vom Einzelunternehmen zur GmbH oder Holding.',
    lead: 'Der Blick von außen ist oft ebenso wichtig wie der für das große Ganze. Wir verbinden Steuerrecht und Betriebswirtschaft – und helfen Ihnen, Ihr Unternehmen auf Kurs zu halten.',
    img: { webp: '/assets/img/leistung-beratung-800.webp 800w, /assets/img/leistung-beratung-1200.webp 1200w, /assets/img/leistung-beratung-1600.webp 1600w', src: '/assets/img/leistung-beratung-1600.jpg', alt: 'Berater bespricht Kennzahlen mit einer Unternehmerin am Laptop', width: 1600, height: 1067 },
    intro: {
      title: 'Zahlen verstehen, <em>Entscheidungen treffen.</em>',
      text: [
        'Als Unternehmer stehen Sie vor vielen Herausforderungen – im Tagesgeschäft, bei einer Neuorientierung oder beim Kauf und Verkauf eines Unternehmens. Hier den Überblick zu behalten, ist nicht leicht.',
        'Als unabhängige Berater behalten wir Veränderungen bei Gesetzen und Richtlinien im Blick und helfen Ihnen, sie in Ihrer Planung zu berücksichtigen. Steuerrecht, Betriebswirtschaft und Ihre Zahlen denken wir dabei zusammen.',
      ],
    },
    scope: [
      'Betriebswirtschaftliche Situationsanalyse und daraus abgeleitete Maßnahmenpläne',
      'Kennzahlen und Controlling – verständlich aufbereitet',
      'Liquiditäts- und Investitionsplanung',
      'Begleitung bei Veränderungen und Neuorientierung',
      'Prüfung der Rechtsform, z. B. vom Einzelunternehmen zur GmbH oder Holding',
      'Branchenspezifische Anforderungen im Blick',
      'Unterstützung bei Kauf, Gründung oder Verkauf eines Unternehmens',
      'Begleitung bei der Umsetzung der vereinbarten Maßnahmen',
    ],
    benefits: [
      { title: 'Blick von außen', text: 'Unabhängige Einschätzung statt Betriebsblindheit.' },
      { title: 'Steuer und Strategie', text: 'Steuerrecht und Betriebswirtschaft aus einer Hand.' },
      { title: 'Klare Kennzahlen', text: 'Sie sehen, wo Ihr Unternehmen wirklich steht.' },
      { title: 'Begleitung', text: 'Wir bleiben bei der Umsetzung an Ihrer Seite.' },
    ],
    faq: [
      { q: 'Wie läuft eine Unternehmensberatung bei Ihnen ab?', a: 'Nach dem ersten Gespräch erhalten Sie ein Angebot mit Vorgehen und Themen. Wir analysieren Ihre Zahlen und Abläufe, rechnen die Rentabilität nach und erarbeiten Vorschläge. Nach Ihrer Entscheidung begleiten wir auf Wunsch die Umsetzung.' },
      { q: 'Lohnt sich der Wechsel in eine GmbH oder Holding für mich?', a: 'Das hängt von Gewinn, Entnahmen, Haftung und Ihren Plänen ab. Wir rechnen die Varianten für Ihr Unternehmen durch und zeigen Ihnen Vor- und Nachteile, bevor Sie sich entscheiden.' },
      { q: 'Kommen Sie auch zu uns in den Betrieb?', a: 'Ja, wenn es sinnvoll ist. Für eine Analyse der Abläufe kann ein Berater zeitweise vor Ort sein; vieles lässt sich aber auch digital und per Videotermin klären.' },
      { q: 'Ist die Beratung auch ohne laufende Buchhaltung bei Ihnen möglich?', a: 'Ja. Am meisten bringt sie allerdings, wenn wir Ihre Zahlen laufend kennen – dann sind Auswertungen und Empfehlungen immer aktuell.' },
    ],
    seo: { title: 'Unternehmensberatung & Controlling | Leiblein + Kollegen', description: 'Betriebswirtschaftliche Beratung, Kennzahlen, Controlling und Umstrukturierung – Steuerrecht und Betriebswirtschaft aus einer Hand, deutschlandweit digital.' },
  },
  {
    slug: 'gruendung',
    key: 'gruendung',
    pillar: 'Beratung',
    title: 'Existenzgründung – <em>von der Idee zum Unternehmen.</em>',
    teaser: 'Rechtsform, Businessplan, Finanzierung und Fördermittel – mit einem zugelassenen KfW-Gründungscoach.',
    lead: 'Wir helfen Ihnen, aus Ihrer Idee ein erfolgreiches Unternehmen zu machen – von der Wahl der Rechtsform über den Businessplan bis zur Finanzierung.',
    img: { webp: '/assets/img/leistung-gruendung-800.webp 800w, /assets/img/leistung-gruendung-1200.webp 1200w, /assets/img/leistung-gruendung-1600.webp 1600w', src: '/assets/img/leistung-gruendung-1600.jpg', alt: 'Gründer bespricht seinen Plan mit einer Beraterin', width: 1600, height: 1068 },
    intro: {
      title: 'Gut vorbereitet <em>ist halb gegründet.</em>',
      text: [
        'Eine Gründung braucht nicht nur eine gute Idee, sondern auch Organisation: Geschäftsmodell, Finanzierung, Rechtsform und Businessplan müssen zusammenpassen. Wir klären mit Ihnen die wirtschaftlichen und steuerlichen Fragen von Anfang an.',
        'Eberhard Leiblein ist von der KfW als Gründungscoach zugelassen und auf die Beratung von Existenzgründungen spezialisiert. Nutzen Sie diese Erfahrung für einen sicheren Start.',
      ],
    },
    scope: [
      'Existenzgründungsberatung',
      'Wahl der Rechtsform – z. B. Einzelunternehmen, GbR, UG oder GmbH',
      'Mitwirkung beim Businessplan',
      'Unternehmensplanung: Vermögen, Erfolg und Finanzierung',
      'Unterlagen für Banken, Förderstellen und Teilhaber',
      'Fördermittelberatung und KfW-Gründungscoaching',
      'Beratung zu betrieblichen und privaten Versicherungen',
      'Steuerberatung für Franchisenehmer',
    ],
    benefits: [
      { title: 'KfW-Gründungscoach', text: 'Zugelassene Beratung durch Eberhard Leiblein.' },
      { title: 'Richtige Rechtsform', text: 'Haftung, Steuern und Kapital von Anfang an passend.' },
      { title: 'Überzeugender Plan', text: 'Unterlagen, die Banken und Förderstellen verstehen.' },
      { title: 'Sicherer Start', text: 'Buchhaltung und Steuern laufen ab Tag eins digital.' },
    ],
    faq: [
      { q: 'Welche Rechtsform passt zu meiner Gründung?', a: 'Das hängt von Ihren Zielen, dem Risiko und davon ab, ob weitere Personen beteiligt sind. Die GmbH ist beliebt, braucht aber mehr Startkapital; die UG ist eine gute Alternative für junge Gründer. Wir rechnen die Varianten mit Ihnen durch.' },
      { q: 'Was gehört in einen Businessplan?', a: 'Geschäftsidee und Kundennutzen, Marketingplan, Finanzierung mit Investitions- und Liquiditätsplanung sowie Chancen und Risiken. Wir prüfen den Plan und geben Hinweise zu Rechtsform und steuerlichen Besonderheiten.' },
      { q: 'Wie finanziere ich meine Gründung?', a: 'Neben Eigenkapital und Bankdarlehen gibt es Förderkredite der KfW sowie Venture Capital, Business Angels oder Crowdfunding. Wir helfen Ihnen, die passende Form zu finden und die Unterlagen vorzubereiten.' },
      { q: 'Was bedeutet KfW-Gründungscoaching?', a: 'Eberhard Leiblein ist als Gründungscoach zugelassen. Je nach aktuellem Förderprogramm kann die Beratung bezuschusst werden – wir klären im Erstgespräch, was für Sie möglich ist.' },
    ],
    person: 'eberhard',
    seo: { title: 'Existenzgründung & Gründungscoaching | Leiblein + Kollegen', description: 'Gründungsberatung mit KfW-Gründungscoach: Rechtsform, Businessplan, Finanzierung und Fördermittel – digital und persönlich.' },
  },
  {
    slug: 'unternehmensnachfolge',
    key: 'nachfolge',
    pillar: 'Beratung',
    title: 'Unternehmensnachfolge – <em>rechtzeitig geplant.</em>',
    teaser: 'Unternehmen übergeben oder übernehmen: Wert ermitteln, Übergang planen, steuerlich durchdacht.',
    lead: 'Ob Sie Ihr Unternehmen übergeben oder ein bestehendes übernehmen: Wir begleiten Sie von der Bewertung bis zur steuerlich durchdachten Übergabe.',
    img: { webp: '/assets/img/leistung-nachfolge-800.webp 800w, /assets/img/leistung-nachfolge-1200.webp 1200w, /assets/img/leistung-nachfolge-1600.webp 1600w', src: '/assets/img/leistung-nachfolge-1600.jpg', alt: 'Erfahrene Unternehmerin übergibt Unterlagen an ihren Nachfolger', width: 1600, height: 1067 },
    intro: {
      title: 'Eine Übergabe ist <em>eine große Chance.</em>',
      text: [
        'Wer ein am Markt etabliertes Unternehmen übernimmt, spart sich viele Risiken einer Neugründung. Dennoch gibt es neben den finanziellen Fragen eine Reihe von Punkten, die gut vorbereitet sein wollen.',
        'Die Unternehmensnachfolge ist der Schwerpunkt von Eberhard Leiblein. Gemeinsam mit Ihnen planen wir die einzelnen Schritte – in der Familie oder mit einem externen Nachfolger.',
      ],
    },
    scope: [
      'Frühzeitige Nachfolgeplanung – in der Familie oder extern',
      'Ermittlung des Unternehmenswerts (Substanz- und Ertragswert)',
      'Begleitung beim Kauf eines bestehenden Unternehmens',
      'Steuerlich durchdachte Gestaltung der Übergabe',
      'Erbschaft- und Schenkungsteuer im Blick',
      'Finanzierungs- und Liquiditätsplanung für den Übernehmer',
      'Abstimmung mit Notar, Rechtsanwalt und Bank',
    ],
    benefits: [
      { title: 'Realistischer Preis', text: 'Unternehmenswert nachvollziehbar ermittelt.' },
      { title: 'Steuern im Blick', text: 'Übergabe so gestaltet, dass nichts verschenkt wird.' },
      { title: 'Gewachsene Strukturen', text: 'Kunden, Personal und Abläufe bleiben erhalten.' },
      { title: 'Erfahrene Begleitung', text: 'Nachfolge ist der Schwerpunkt von Eberhard Leiblein.' },
    ],
    faq: [
      { q: 'Wann sollte ich mit der Nachfolgeplanung beginnen?', a: 'Möglichst früh – idealerweise einige Jahre vor der geplanten Übergabe. So bleibt Zeit, das Unternehmen gut aufzustellen, einen Nachfolger zu finden und die Übergabe steuerlich günstig zu gestalten.' },
      { q: 'Wie wird der Preis eines Unternehmens ermittelt?', a: 'Häufig über zwei Wege: den Substanzwert (Vermögen abzüglich Schulden) und den Ertragswert, der sich am Gewinn der letzten Jahre orientiert. Wir ermitteln einen realistischen Wert für Ihre Situation.' },
      { q: 'Begleiten Sie auch Käufer eines Unternehmens?', a: 'Ja. Wir prüfen Zahlen und Kaufpreis, planen die Finanzierung und achten darauf, dass Sie fachlich und organisatorisch gut in die neue Rolle starten.' },
      { q: 'Was ist bei einer Übergabe innerhalb der Familie wichtig?', a: 'Vor allem die Erbschaft- und Schenkungsteuer sowie eine faire Lösung für alle Beteiligten. Wir zeigen Ihnen die Gestaltungsmöglichkeiten und stimmen uns mit Notar und Rechtsanwalt ab.' },
    ],
    person: 'eberhard',
    seo: { title: 'Unternehmensnachfolge | Leiblein + Kollegen', description: 'Unternehmensnachfolge planen: Unternehmenswert ermitteln, Übergabe in der Familie oder extern steuerlich durchdacht gestalten.' },
  },
  {
    slug: 'back-office-service',
    key: 'backoffice',
    pillar: 'Beratung',
    title: 'Back-Office-Service – <em>wir halten Ihnen den Rücken frei.</em>',
    teaser: 'Zahlungsverkehr, Mahnwesen, Korrespondenz, Mieteingänge und digitales Archiv – wir halten Ihnen den Rücken frei.',
    lead: 'Sie konzentrieren sich auf Ihr Tagesgeschäft, wir organisieren den „Papierkram“ – zuverlässig, ordentlich und genau so, wie Ihr Unternehmen es braucht.',
    img: { webp: '/assets/img/leistung-backoffice-800.webp 800w, /assets/img/leistung-backoffice-1200.webp 1200w, /assets/img/leistung-backoffice-1600.webp 1600w', src: '/assets/img/leistung-backoffice-1600.jpg', alt: 'Mitarbeiterin ordnet Unterlagen im Büro', width: 1600, height: 1067 },
    intro: {
      title: 'Ordnung im Hintergrund, <em>Zeit im Vordergrund.</em>',
      text: [
        'Überweisungen, Mahnungen, Korrespondenz und Ablage kosten Zeit, die Ihnen für Ihre Kunden fehlt. Unser Back-Office-Service übernimmt diese Aufgaben – ganz oder in Teilen.',
        'Typische Mandanten sind Immobiliengesellschaften, Familienunternehmen und Selbstständige, die kein eigenes Büro aufbauen möchten. Finden Sie die gewünschte Leistung nicht in der Liste, sprechen Sie uns an.',
      ],
    },
    scope: [
      'Zahlungsverkehr und Banküberweisungen',
      'Mahnwesen',
      'Kaufmännische Korrespondenz',
      'Überwachung der Mieteingänge',
      'Ablage und Sortierung der Belege',
      'Vorbereitung für Lohn- und Finanzbuchhaltung',
      'Ersetzendes Scannen',
      'Archivierung – digital oder im Ordner',
    ],
    benefits: [
      { title: 'Mehr Zeit', text: 'Sie kümmern sich um Kunden statt um Papier.' },
      { title: 'Nichts geht unter', text: 'Zahlungen und Fristen werden zuverlässig überwacht.' },
      { title: 'Kein eigenes Büro', text: 'Sie sparen Personal, Platz und Einarbeitung.' },
      { title: 'Alles aus einer Hand', text: 'Back Office, Buchhaltung und Steuern greifen ineinander.' },
    ],
    faq: [
      { q: 'Für wen eignet sich der Back-Office-Service?', a: 'Für Unternehmen, die keine eigene Verwaltung aufbauen möchten – etwa Immobiliengesellschaften, Familienunternehmen oder Selbstständige mit wenig Zeit für Büroarbeit.' },
      { q: 'Kann ich nur einzelne Aufgaben abgeben?', a: 'Ja. Sie entscheiden, ob wir zum Beispiel nur Mahnwesen und Mieteingänge übernehmen oder das komplette Back Office.' },
      { q: 'Was bedeutet ersetzendes Scannen?', a: 'Papierbelege werden nach einem festgelegten Verfahren digitalisiert, sodass das digitale Dokument das Original rechtssicher ersetzt. Das Verfahren dokumentieren wir mit Ihnen.' },
      { q: 'Wie behalte ich den Überblick?', a: 'Sie sehen Zahlungen, Belege und Auswertungen digital über DATEV und erhalten bei Bedarf regelmäßige Rückmeldungen von Ihrer festen Ansprechpartnerin.' },
    ],
    seo: { title: 'Back-Office-Service | Leiblein + Kollegen', description: 'Zahlungsverkehr, Mahnwesen, Korrespondenz, Mieteingänge, Ablage und digitales Archiv – unser Back-Office-Service hält Ihnen den Rücken frei.' },
  },
  {
    slug: 'lohnbuchhaltung',
    key: 'lohn',
    pillar: 'Buchhaltung',
    title: 'Lohnbuchhaltung – <em>pünktlich und rechtssicher.</em>',
    teaser: 'Lohn- und Gehaltsabrechnungen, Meldungen und Beratung zur Gestaltung – mit DATEV.',
    lead: 'Wir übernehmen Ihre Lohn- und Gehaltsabrechnungen – mit DATEV und mit dem Blick für Änderungen im Steuer- und Sozialversicherungsrecht.',
    img: { webp: '/assets/img/leistung-lohn-800.webp 800w, /assets/img/leistung-lohn-1200.webp 1200w, /assets/img/leistung-lohn-1600.webp 1600w', src: '/assets/img/leistung-lohn-1600.jpg', alt: 'Mitarbeiterin bearbeitet Lohnabrechnungen am Laptop', width: 1600, height: 1068 },
    intro: {
      title: 'Ihre Mitarbeiter verlassen sich <em>auf ihren Lohn.</em>',
      text: [
        'Lohnabrechnung ist Vertrauenssache: Sie muss pünktlich, korrekt und auf dem aktuellen Stand der Gesetze sein. Wir sind Ihr zuverlässiger Partner für Lohn- und Gehaltsabrechnungen und arbeiten dabei mit DATEV.',
        'Wir übernehmen die laufende Abrechnung, beraten Sie bei der Gestaltung von Löhnen und Gehältern und unterstützen Sie bei Lohnsteuer- und Sozialversicherungsprüfungen.',
      ],
    },
    scope: [
      'Laufende Lohn- und Gehaltsabrechnung inkl. Lohnkonten',
      'Übernahme von Daten aus Zeiterfassung und Vorerfassung',
      'Überstunden, Prämien, Reisekosten, Urlaubs- und Krankenentgelt',
      'An- und Abmeldungen, Sozialversicherungsmeldungen, Beitragsnachweise',
      'Monatliche Lohnauswertungen und Zahlungsaufträge',
      'Lohnkostenberechnung bei Neueinstellungen und Lohnerhöhungen',
      'Netto-Entgelt-Optimierung und Gestaltung von Dienstverträgen',
      'Unterstützung bei Lohnsteuer- und Sozialversicherungsprüfungen',
    ],
    benefits: [
      { title: 'Rechtssicherheit', text: 'Auch bei Lohnsteuer- und Sozialversicherungsprüfungen.' },
      { title: 'Immer aktuell', text: 'Gesetzesänderungen fließen automatisch ein.' },
      { title: 'Mehr Netto', text: 'Gestaltungsmöglichkeiten für Ihre Mitarbeiter genutzt.' },
      { title: 'Weniger Aufwand', text: 'Sie konzentrieren sich auf Ihr Kerngeschäft.' },
    ],
    faq: [
      { q: 'Welche Daten brauchen Sie jeden Monat von mir?', a: 'Nur die Änderungen: Arbeitszeiten, Überstunden, Prämien, Krankheitstage, Ein- und Austritte. Daten aus Zeiterfassungsprogrammen übernehmen wir, wo möglich, elektronisch.' },
      { q: 'Kümmern Sie sich auch um Meldungen an Krankenkassen und Finanzamt?', a: 'Ja. An- und Abmeldungen, Beitragsnachweise, Sozialversicherungsmeldungen und Lohnsteueranmeldungen übermitteln wir fristgerecht.' },
      { q: 'Was ist Netto-Entgelt-Optimierung?', a: 'Mit steuer- und beitragsfreien Bestandteilen – etwa Zuschüssen oder Sachbezügen – kann mehr Netto beim Mitarbeiter ankommen, ohne dass Ihre Kosten im gleichen Maß steigen. Wir zeigen Ihnen, was in Ihrem Fall möglich ist.' },
      { q: 'Wie hoch sind die Kosten einer Neueinstellung?', a: 'Wir berechnen Ihnen vorab die Lohngesamtkosten pro Monat und Jahr – auch bei Lohnerhöhungen oder Änderungen der Steuerklasse.' },
    ],
    seo: { title: 'Lohnbuchhaltung | Leiblein + Kollegen', description: 'Lohn- und Gehaltsabrechnung mit DATEV: Meldungen, Auswertungen, Netto-Entgelt-Optimierung und Unterstützung bei Prüfungen – deutschlandweit digital.' },
  },
  {
    slug: 'jahresabschluss-steuern',
    key: 'jahresabschluss',
    pillar: 'Steuern',
    title: 'Jahresabschluss & Steuern – <em>sicher durchs Geschäftsjahr.</em>',
    teaser: 'Jahresabschlüsse für alle Rechtsformen, betriebliche Steuererklärungen und Begleitung bei Betriebsprüfungen.',
    lead: 'Jahresabschluss, betriebliche Steuererklärungen und Begleitung bei Betriebsprüfungen – aus einer Hand und für alle Rechtsformen.',
    img: { webp: '/assets/img/leistung-jahresabschluss-800.webp 800w, /assets/img/leistung-jahresabschluss-1200.webp 1200w, /assets/img/leistung-jahresabschluss-1600.webp 1600w', src: '/assets/img/leistung-jahresabschluss-1600.jpg', alt: 'Zwei Kolleginnen prüfen gemeinsam den Jahresabschluss', width: 1600, height: 1067 },
    intro: {
      title: 'Rückblick in Zahlen, <em>Ausblick mit Plan.</em>',
      text: [
        'Der Jahresabschluss ist der rechnerische Abschluss Ihres Geschäftsjahres und gibt einen sehr guten Überblick. Umso wichtiger ist es, die Gestaltungsmöglichkeiten zu kennen – wir erstellen ihn für alle Rechtsformen.',
        'Die betrieblichen Steuererklärungen gehören fest dazu. Und wenn das Finanzamt oder die Rentenversicherung prüft, stehen wir Ihnen mit unserer Erfahrung zur Seite.',
      ],
    },
    scope: [
      'Jahresabschlüsse für Personengesellschaften (e. K., GbR, OHG, KG, GmbH & Co. KG, Partnerschaft)',
      'Jahresabschlüsse für Kapitalgesellschaften (UG, GmbH, eG, AG)',
      'Einnahmen-Überschuss-Rechnung für Einzelunternehmer und Freiberufler',
      'Einkommen-, Umsatz- und Gewerbesteuererklärung',
      'Körperschaftsteuererklärung und gesonderte Feststellungen',
      'Erbschaft- und Schenkungsteuererklärung',
      'Begleitung bei Betriebsprüfungen und Umsatzsteuer-Sonderprüfungen',
      'Unterstützung bei Lohnsteuer- und Sozialversicherungsprüfungen',
    ],
    benefits: [
      { title: 'Alle Rechtsformen', text: 'Vom Einzelunternehmer bis zur AG.' },
      { title: 'Gestaltung nutzen', text: 'Spielräume im Abschluss gezielt eingesetzt.' },
      { title: 'Fristen im Griff', text: 'Erklärungen pünktlich und vollständig.' },
      { title: 'Keine Prüfungsangst', text: 'Wir bereiten Sie vor und begleiten Sie.' },
    ],
    faq: [
      { q: 'Wann sollte mein Jahresabschluss fertig sein?', a: 'So früh wie möglich – dann haben Sie aktuelle Zahlen für Bank und Planung und Zeit für Gestaltung. Mehr dazu in unserem Beitrag „Warum sollte man seinen Jahresabschluss möglichst früh erstellen?“.' },
      { q: 'Welche Steuererklärungen erstellen Sie für mein Unternehmen?', a: 'Je nach Rechtsform Einkommen-, Umsatz-, Gewerbe- und Körperschaftsteuererklärung sowie gesonderte und einheitliche Feststellungen. Auch Erbschaft- und Schenkungsteuererklärungen übernehmen wir.' },
      { q: 'Was passiert bei einer Betriebsprüfung?', a: 'Das Finanzamt prüft Buchhaltung und Steuererklärungen der letzten Jahre. Wir bereiten die Unterlagen mit Ihnen vor, begleiten die Prüfung und vertreten Ihre Interessen gegenüber den Prüfern.' },
      { q: 'Unterstützen Sie auch bei Sozialversicherungsprüfungen?', a: 'Ja – etwa bei Beiträgen und Meldungen, der Beurteilung von Beschäftigungsverhältnissen, Umlagen und Statusfeststellungen.' },
    ],
    seo: { title: 'Jahresabschluss & betriebliche Steuern | Leiblein + Kollegen', description: 'Jahresabschlüsse für alle Rechtsformen, betriebliche Steuererklärungen und Begleitung bei Betriebs- und Sozialversicherungsprüfungen.' },
  },
];

// Kurztexte für die Übersicht (alle 7 Leistungen, auch ohne eigene Seite)
export const serviceTeasers: Record<string, string> = {
  beratung: 'Kennzahlen, Controlling und Umstrukturierung – etwa vom Einzelunternehmen zur GmbH oder Holding.',
  gruendung: 'Rechtsform, Businessplan, Finanzierung und Fördermittel – mit einem zugelassenen KfW-Gründungscoach.',
  nachfolge: 'Unternehmen übergeben oder übernehmen: Wert ermitteln, Übergang planen, steuerlich durchdacht.',
  backoffice: 'Zahlungsverkehr, Mahnwesen, Korrespondenz, Mieteingänge und digitales Archiv – wir halten Ihnen den Rücken frei.',
  fibu: 'Belege per Upload, Buchungen bei uns, aktuelle Zahlen jederzeit online – auf Wunsch komplett papierlos.',
  lohn: 'Lohn- und Gehaltsabrechnungen, Meldungen und Beratung zur Gestaltung – mit DATEV.',
  jahresabschluss: 'Jahresabschlüsse für alle Rechtsformen, betriebliche Steuererklärungen und Begleitung bei Betriebsprüfungen.',
};
export { url };
