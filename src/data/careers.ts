// Karriere: Einstiegswege und Teamstimmen (Texte von der bisherigen Website, „Du“-Ansprache)
export const team = [
  { name: 'Elina Mergelsberg', role: 'Steuerassistentin (B.A.)', img: 'elina-mergelsberg', quote: 'Bei Leiblein + Kollegen kann ich meine Begeisterung für wirtschaftliche Zusammenhänge weiterentwickeln und mein Wissen direkt in der Praxis einsetzen.' },
  { name: 'Tim Nguyen', role: 'Steuerfachwirt', img: 'tim-nguyen', quote: 'Aufgaben werden bei uns auf alle Schultern verteilt – stressige Zeiten bewältigen wir gemeinsam.' },
  { name: 'Michelle Raab', role: 'Auszubildende zur Steuerfachangestellten', img: 'michelle-raab', quote: 'Egal, welche Herausforderung ich habe – es ist immer jemand da, der hilft.' },
  { name: 'Nikolas Schmiedecke', role: 'Steuerassistent', img: 'nikolas-schmiedecke', quote: 'In meinem vielfältigen Arbeitsbereich lerne ich täglich Neues. Langeweile? Fehlanzeige!' },
  { name: 'Yevheniia Borodina', role: 'Steuerassistentin', img: 'yevheniia-borodina', quote: 'Unser Team arbeitet nicht nur zusammen, sondern fühlt sich auch wie eine zweite Familie an.' },
  { name: 'Alper Öztürk', role: 'Steuerfachangestellter', img: 'alper-oeztuerk', quote: 'Bei einem so netten Team ist für mich jeder Tag ein Highlight.' },
];

export interface Track {
  slug: string; label: string; eyebrow: string; title: string; lead: string;
  facts: { title: string; text: string }[]; intro: string[]; learn: string[];
  quote: { text: string; name: string; role: string; img: string };
  img: { webp: string; src: string; alt: string; width: number; height: number };
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
}
export const tracks: Track[] = [
  {
    slug: 'ausbildung',
    label: 'Ausbildung',
    eyebrow: 'Dein Einstieg',
    title: 'Ausbildung zur/zum <em>Steuerfachangestellten.</em>',
    lead: 'Von Beginn an Teil des Teams: Bei uns übernimmst du gleich deine eigenen Aufgaben – mit sehr guten Chancen auf Übernahme.',
    facts: [{ title: 'Abwechslungsreiche Aufgaben', text: 'Lohn, Buchhaltung, Abschlüsse – du lernst die ganze Bandbreite der Steuerberatung kennen.' }, { title: 'Gute Übernahmechancen', text: 'Wir bilden aus, um zu bleiben: Eine Übernahme nach der Ausbildung ist immer unser Ziel.' }, { title: 'Team-Events', text: 'Gemeinsame Events und Reisen – unser Zusammenhalt endet nicht mit dem Feierabend.' }],
    intro: [
      'Wir gehen gern die ersten Schritte im Berufsleben gemeinsam mit dir: Jährlich bilden wir zur/zum Steuerfachangestellten aus, alle drei Jahre zur Kauffrau / zum Kaufmann für Büromanagement.',
      'Du lernst alles Wichtige – in einem eingespielten Team, das dir Verantwortung zutraut und dich dabei begleitet.',
    ],
    learn: ['Lohnabrechnungen erstellen', 'Aufgaben der Finanzbuchhaltung', 'Gewinn und Verlust eines Unternehmens ermitteln', 'Steuererklärungen vorbereiten', 'Digital arbeiten mit DATEV'],
    quote: { text: 'Egal, welche Herausforderung ich habe – es ist immer jemand da, der hilft.', name: 'Michelle Raab', role: 'Auszubildende zur Steuerfachangestellten', img: 'michelle-raab' },
    img: { webp: '/assets/img/karriere-ausbildung-frame-800.webp 800w, /assets/img/karriere-ausbildung-frame-1200.webp 1200w, /assets/img/karriere-ausbildung-frame-1600.webp 1600w', src: '/assets/img/karriere-ausbildung-frame-1600.jpg', alt: 'Kollegin unterstützt einen jungen Kollegen bei der Arbeit am Laptop', width: 1600, height: 1067 },
    faq: [
      { q: 'Welchen Schulabschluss brauche ich?', a: 'In der Regel die mittlere Reife oder das (Fach-)Abitur. Wichtiger als Noten sind uns Interesse an Zahlen, Sorgfalt und Lust aufs Lernen.' },
      { q: 'Wann beginnt die Ausbildung?', a: 'Die Ausbildung startet jedes Jahr im Herbst und dauert drei Jahre – bei guten Leistungen ist eine Verkürzung möglich.' },
      { q: 'Wie läuft die Bewerbung ab?', a: 'Schick uns Anschreiben, Lebenslauf und die letzten Zeugnisse per E-Mail. Danach lernen wir uns in einem persönlichen Gespräch kennen – gern auch mit einem Probetag.' },
      { q: 'Werde ich nach der Ausbildung übernommen?', a: 'Wir bilden aus, um zu bleiben: Eine Übernahme nach der bestandenen Prüfung ist immer unser Ziel.' },
    ],
    seo: { title: 'Ausbildung Steuerfachangestellte/r in Aschaffenburg | Leiblein + Kollegen', description: 'Ausbildung zur/zum Steuerfachangestellten bei Leiblein + Kollegen in Aschaffenburg: eigene Aufgaben ab Tag 1, digitale Kanzlei, gute Übernahmechancen.' },
  },
  {
    slug: 'duales-studium',
    label: 'Duales Studium',
    eyebrow: 'Dein Einstieg',
    title: 'Duales Studium <em>mit der DHBW Mosbach.</em>',
    lead: 'Studieren und arbeiten in einem: Du sammelst praktische Erfahrung in unserer Kanzlei und übernimmst früh Verantwortung.',
    facts: [{ title: 'Praxis in der Kanzlei', text: 'Zwischen den Theoriephasen arbeitest du an echten Mandaten mit – mit Verantwortung von Anfang an.' }, { title: 'Gute Übernahmechancen', text: 'Nach dem Bachelor hast du sehr gute Chancen, fest in unser Team zu wechseln.' }, { title: 'Team-Events', text: 'Gemeinsame Events und Reisen – unser Zusammenhalt endet nicht mit dem Feierabend.' }],
    intro: [
      'Im dreijährigen Studium zum Bachelor of Arts – Betriebswirtschaftliche Steuerlehre, Unternehmensrechnung und Finanzen – bieten wir gemeinsam mit der DHBW Mosbach beides: fundierte Theorie und echte Praxis.',
      'Neben dem Blockunterricht an der Hochschule lernst du bei uns im Team, wie Steuerberatung im Alltag funktioniert.',
    ],
    learn: ['Praxisorientierte Steuerlehre', 'Betriebliches Rechnungswesen', 'Betriebliche Finanzen', 'Mitarbeit an echten Mandaten', 'Digital arbeiten mit DATEV'],
    quote: { text: 'Duales Studium, das heißt Theorie mit praktischer Erfahrung verbinden.', name: 'Nikolas Schmiedecke', role: 'Steuerassistent', img: 'nikolas-schmiedecke' },
    img: { webp: '/assets/img/karriere-studium-frame-800.webp 800w, /assets/img/karriere-studium-frame-1200.webp 1200w, /assets/img/karriere-studium-frame-1600.webp 1600w', src: '/assets/img/karriere-studium-frame-1600.jpg', alt: 'Zwei Kollegen besprechen Auswertungen gemeinsam am Laptop', width: 1600, height: 1067 },
    faq: [
      { q: 'Wie ist das Studium aufgebaut?', a: 'Theorie- und Praxisphasen wechseln sich etwa alle drei Monate ab: an der DHBW Mosbach im Hörsaal, bei uns in der Kanzlei an echten Mandaten.' },
      { q: 'Welche Voraussetzungen brauche ich?', a: 'Die allgemeine oder fachgebundene Hochschulreife. Interesse an Steuern, Zahlen und Unternehmen bringst du mit – alles andere lernst du bei uns.' },
      { q: 'Wie bewerbe ich mich?', a: 'Bewirb dich direkt bei uns als Partnerunternehmen – mit Anschreiben, Lebenslauf und Zeugnissen per E-Mail. Die Immatrikulation an der DHBW organisieren wir gemeinsam.' },
      { q: 'Wie geht es nach dem Bachelor weiter?', a: 'Nach dem Abschluss hast du sehr gute Chancen auf eine Übernahme – zum Beispiel als Steuerassistent/in mit dem Ziel Steuerberater/in.' },
    ],
    seo: { title: 'Duales Studium Steuerlehre (DHBW) | Leiblein + Kollegen', description: 'Duales Studium BWL – Steuerlehre, Unternehmensrechnung und Finanzen mit der DHBW Mosbach bei Leiblein + Kollegen in Aschaffenburg.' },
  },
];
export const careerContact = { name: 'Irina Leiblein', email: 'i.leiblein@leiblein-und-kollegen.de' };

// Häufige Fragen der Karriereseite („Du“)
export const careerFaq = [
  { q: 'Kann ich bei euch wirklich remote arbeiten?', a: 'Ja. Du arbeitest im Büro in Aschaffenburg, hybrid oder komplett remote – als DATEV Digitale Kanzlei arbeiten wir papierlos, Mandate und Teamabstimmung laufen digital.' },
  { q: 'Welche Perspektive habt ihr für Steuerberater?', a: 'Wer Verantwortung übernehmen möchte, kann bei uns wachsen – bis hin zur Partnerschaft. Das besprechen wir offen im ersten Gespräch.' },
  { q: 'Wie läuft die Bewerbung ab?', a: 'Bewirb dich über die Stellenanzeige oder schick uns deine Unterlagen per E-Mail. Danach lernen wir uns in einem persönlichen Gespräch kennen – per Video oder bei uns im Büro.' },
  { q: 'Ich finde keine passende Stelle – kann ich mich trotzdem bewerben?', a: 'Sehr gern. Wir suchen immer Menschen, die unsere Kanzlei mit ihrem Know-how bereichern. Schick uns einfach eine Initiativbewerbung.' },
];
