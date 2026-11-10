// Kanzlei & Team: Geschichte, Gründerprofile, Team, Partner (Fakten von der bisherigen Kanzleiseite; Team-Liste vom Mandanten bestätigen lassen)

export const history = [
  { year: '2004', title: 'Der Anfang', text: 'Eberhard Leiblein wird Steuerberater – 2010 folgt der Schritt in die Selbstständigkeit.' },
  { year: '2012', title: 'Eigene Gesellschaft', text: 'Gründung der Leiblein Steuerberatungsgesellschaft mbH in Aschaffenburg.' },
  { year: '2017', title: 'Leiblein + Kollegen', text: 'Eberhard und Irina Leiblein führen die Kanzlei gemeinsam – Steuern und Beratung aus einer Hand.' },
  { year: 'Heute', title: 'Digitale Kanzlei', text: 'Rund 20 Fachkräfte, ausgezeichnet als DATEV Digitale Kanzlei, für Unternehmen in ganz Deutschland.' },
];

export interface Founder {
  name: string; img: string; eyebrow: string; title: string; lead: string; role: string;
  cv: { k: string; v: string }[]; quals: { k: string; v: string }[];
}
export const founders: Founder[] = [
  {
    name: 'Eberhard Leiblein',
    img: 'eberhard-leiblein',
    eyebrow: 'Gründer · Geschäftsführer',
    title: 'Eberhard Leiblein – <em>Steuern und BWL Hand in Hand.</em>',
    lead: 'Steuerberater und Unternehmensberater mit Schwerpunkt Unternehmensnachfolge. Für ihn gehören Steuerrecht und Betriebswirtschaft zusammen – daraus ist unsere Philosophie der Lösung aus einer Hand entstanden.',
    role: 'Steuerberater seit 2004 · Unternehmensnachfolge · KfW-Gründungscoach',
    cv: [
      { k: 'Studium', v: 'Betriebswirt (FH), FH Würzburg-Schweinfurt' },
      { k: '2004', v: 'Bestellung zum Steuerberater' },
      { k: '2010', v: 'Selbstständiger Steuerberater' },
      { k: '2012', v: 'Gründung der Leiblein Steuerberatungsgesellschaft mbH' },
      { k: '2017', v: 'Gründung von Leiblein + Kollegen mit Irina Leiblein' },
    ],
    quals: [
      { k: 'KfW', v: 'Gründungscoach und Berater der KfW-Beraterbörse' },
      { k: 'Nachfolge', v: 'Qualifikation zur Unternehmensnachfolge' },
      { k: 'Mittelstand', v: 'Berater der Offensive Mittelstand' },
      { k: 'IHK', v: 'Ausbilderbescheinigung' },
    ],
  },
  {
    name: 'Irina Leiblein',
    img: 'irina-leiblein',
    eyebrow: 'Gründerin · Geschäftsführerin',
    title: 'Irina Leiblein – <em>Fachberatung für Heilberufe.</em>',
    lead: 'Steuerberaterin und Unternehmensberaterin. Seit 2014 berät sie Gründerinnen, Gründer und Unternehmen aller Rechtsformen – vom Freiberufler bis zur GmbH & Co. KG. Ihr Schwerpunkt: die steuerliche Beratung von Heilberufen.',
    role: 'Steuerberaterin seit 2014 · Fachberaterin für das Gesundheitswesen (DStV)',
    cv: [
      { k: 'Studium', v: 'Betriebswirtin (FH), FH Aschaffenburg' },
      { k: '2014', v: 'Steuerberaterin bei der Leiblein Steuerberatungsgesellschaft mbH' },
      { k: '2017', v: 'Gründung von Leiblein + Kollegen mit Eberhard Leiblein' },
    ],
    quals: [
      { k: 'DStV', v: 'Fachberaterin für das Gesundheitswesen (DStV e. V.)' },
      { k: 'KfW', v: 'Beraterin der KfW-Beraterbörse' },
      { k: 'BGA', v: 'Gelistete Expertin der Bundesweiten Gründerinnenagentur' },
      { k: 'Mittelstand', v: 'Beraterin der Offensive Mittelstand' },
      { k: 'IHK', v: 'Ausbilderbescheinigung' },
    ],
  },
];

// Teamraster: ganze Mannschaft wie auf der bisherigen Kanzleiseite (Porträts freigestellt, 400/800 px), Maskottchen Hugo am Ende
export const members = [
  { name: 'Eberhard Leiblein', role: 'Steuerberater · Geschäftsführer', img: 'eberhard-leiblein', quote: 'Es macht Spaß, sich mit Mandanten und Kollegen auszutauschen und gemeinsam die besten Ergebnisse zu erzielen.' },
  { name: 'Irina Leiblein', role: 'Steuerberaterin · Geschäftsführerin', img: 'irina-leiblein', quote: 'Team bedeutet ‚Familie‘ – und genau das ist Leiblein + Kollegen für mich.' },
  { name: 'Gisela Brasch', role: 'Kaufmännische Angestellte', img: 'gisela-brasch', quote: 'Die erste Lektion bei Leiblein + Kollegen? Jeder hat ein offenes Ohr für meine Fragen.' },
  { name: 'Elina Mergelsberg', role: 'Steuerassistentin (B.A.)', img: 'elina-mergelsberg', quote: 'Bei Leiblein + Kollegen kann ich meine Begeisterung für wirtschaftliche Zusammenhänge weiterentwickeln, täglich Neues lernen und mein Wissen direkt in der Praxis einsetzen.' },
  { name: 'Viktoriia Arkhypova', role: 'Auszubildende zur Steuerfachangestellten', img: 'viktoriia-arkhypova', quote: 'Bei uns zählt nicht nur das Fachwissen, sondern auch das Miteinander!' },
  { name: 'Nikolas Schmiedecke', role: 'Steuerassistent', img: 'nikolas-schmiedecke', quote: 'In meinem vielfältigen Arbeitsbereich lerne ich täglich Neues. Langeweile? Fehlanzeige!' },
  { name: 'Yevheniia Borodina', role: 'Steuerassistentin', img: 'yevheniia-borodina', quote: 'Unser Team arbeitet nicht nur zusammen, sondern fühlt sich auch wie eine zweite Familie an.' },
  { name: 'Tim Nguyen', role: 'Steuerfachwirt', img: 'tim-nguyen', quote: 'Aufgaben werden bei uns auf alle Schultern verteilt – stressige Zeiten bewältigen wir gemeinsam.' },
  { name: 'Aleyna Durukan', role: 'Steuerfachangestellte', img: 'aleyna-durukan', quote: 'Effektive Steuerberatung beginnt mit einer starken Zusammenarbeit zwischen unserer Kanzlei und unseren Mandanten.' },
  { name: 'Michelle Raab', role: 'Auszubildende zur Steuerfachangestellten', img: 'michelle-raab', quote: 'Egal, welche Herausforderung ich habe – es ist immer jemand da, der hilft.' },
  { name: 'Alper Öztürk', role: 'Steuerfachangestellter', img: 'alper-oeztuerk', quote: 'Bei einem so netten Team ist für mich jeder Tag ein Highlight.' },
  { name: 'Anneliese Hasenstab', role: 'Steuerfachangestellte', img: 'anneliese-hasenstab', quote: 'Fairness ist bei uns der Schlüssel. Auch wenn es um persönliche Belange geht.' },
  { name: 'Emely Großmann', role: 'Auszubildende zur Steuerfachangestellten', img: 'emely-grossmann', quote: 'Bei Fragen und Problemen unterstützen wir uns gegenseitig. Es herrscht immer ein freundliches Miteinander.' },
  { name: 'Antonia Apruzzese', role: 'Kauffrau für Büromanagement', img: 'antonia-apruzzese', quote: 'Bei Leiblein + Kollegen erlebt man die perfekte Symbiose aus digitaler Steuerberatung und einem zukunftsorientierten Team.' },
  { name: 'Saskia Kampf', role: 'Steuerassistentin', img: 'saskia-kampf', quote: 'Mein Fachwissen kann ich dank vieler Schulungen vertiefen und weiter ausbauen.' },
  { name: 'Dion Xhemajli', role: 'Auszubildender zum Steuerfachangestellten', img: 'dion-xhemajli', quote: 'Zusammenarbeit macht stark – wir unterstützen uns, damit jeder sein Bestes geben kann!' },
  { name: 'Ruya Cayir', role: 'Werkstudentin', img: 'ruya-cayir', quote: 'Ich wurde herzlich im Team aufgenommen! Täglich kann ich mich auf meine Kollegen verlassen.' },
  { name: 'Evelyn Neschenz', role: 'Social Media Managerin', img: 'evelyn-neschenz', quote: 'Meine Herausforderung ist es, das „trockene“ Gebiet Steuern den Menschen auf digitalem Weg näherzubringen.' },
  { name: 'Matthias Neschenz', role: 'Datenschutzbeauftragter · M. Eng.', img: 'matthias-neschenz', quote: 'Stillstand gibt es bei uns nicht: Die individuelle Förderung gehört bei Leiblein + Kollegen dazu.' },
  { name: 'Hugo Moorhuhn', role: 'Kanzleimaskottchen', img: 'hugo-moorhuhn', quote: 'Wir haben uns in Wien bei einem Betriebsausflug kennengelernt. Ich habe mich direkt in das Team schockverliebt – deswegen musste ich einfach mit.' },
];

export const partners = [
  { k: 'StBK Nürnberg', v: 'Mitglied der beruflichen Selbstverwaltung durch die Steuerberaterkammer Nürnberg.' },
  { k: 'LSWB Bayern', v: 'Mitglied im Landesverband der steuerberatenden und wirtschaftsprüfenden Berufe in Bayern e. V.' },
  { k: 'StBV Hessen', v: 'Mitglied im Steuerberaterverband Hessen.' },
  { k: 'StBV Berlin-Brandenburg', v: 'Mitglied im Steuerberaterverband Berlin-Brandenburg – Verbindungen in ganz Deutschland.' },
  { k: 'DATEV', v: 'Ausgezeichnet als DATEV Digitale Kanzlei 2026 – sichere Software und Zusammenarbeit über DATEV.' },
  { k: 'DHBW', v: 'Partnerunternehmen der Dualen Hochschule Baden-Württemberg für das duale Studium.' },
];
