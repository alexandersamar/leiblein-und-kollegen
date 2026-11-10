// Zentrale Daten der Website: Kontakt, Social Media und Navigation.
// Änderungen hier wirken auf Header, mobiles Menü, Footer, Schnellkontakt-Leiste und strukturierte Daten aller Seiten.

export const firm = {
  name: 'Leiblein & Kollegen Steuerberatungsgesellschaft mbH',
  brand: 'Leiblein + Kollegen',
  phone: '06021 45670-0',
  phoneHref: 'tel:+49602145670',
  phoneSchema: '+49 6021 45670-0',
  email: 'info@leiblein-und-kollegen.de',
  street: 'Frohsinnstraße 24',
  zip: '63739',
  city: 'Aschaffenburg',
  maps: 'https://maps.app.goo.gl/g2Qp4w1sBsB6Skc66',
};

export const socials = [
  { label: 'Facebook', icon: 's-facebook', href: 'https://www.facebook.com/steuerberatung.aschaffenburg', schema: true },
  { label: 'Instagram', icon: 's-instagram', href: 'https://www.instagram.com/leiblein_steuerberater/', schema: true },
  { label: 'LinkedIn', icon: 's-linkedin', href: 'https://de.linkedin.com/company/steuerberater-aschaffenburg', schema: true },
  { label: 'XING', icon: 's-xing', href: 'https://www.xing.com/profile/Eberhard_Leiblein', schema: false },
];

// Seiten-Adressen an einer Stelle
export const url = {
  home: '/',
  leistungen: '/leistungen/',
  beratung: '/leistungen/unternehmensberatung/',
  gruendung: '/leistungen/gruendung/',
  nachfolge: '/leistungen/unternehmensnachfolge/',
  backoffice: '/leistungen/back-office-service/',
  fibu: '/leistungen/buchhaltung/',
  lohn: '/leistungen/lohnbuchhaltung/',
  jahresabschluss: '/leistungen/jahresabschluss-steuern/',
  // Keine eigene Übersichtsseite laut Briefing: „Branchen“ führt zum Branchen-Block der Startseite
  branchen: '/#branchen',
  gesundheit: '/branchen/gesundheitswesen/',
  handwerk: '/branchen/handwerk/',
  ecommerce: '/branchen/e-commerce/',
  immobilien: '/branchen/immobilien/',
  gesellschaften: '/branchen/gmbh-personengesellschaften/',
  kanzlei: '/kanzlei/',
  karriere: '/karriere/',
  wissen: '/wissen/',
  kontakt: '/kontakt/',
  anfrage: '/anfrage/',
  anfrageDanke: '/anfrage/danke/',
  impressum: '/impressum/',
  datenschutz: '/datenschutz/',
  barrierefreiheit: '/barrierefreiheit/',
};

// Die 7 Leistungen laut Briefing – eine Liste, gleiche Namen überall (Header, mobiles Menü, Footer)
export const services = {
  beratung: { label: 'Unternehmensberatung & Controlling', href: url.beratung },
  gruendung: { label: 'Existenzgründung & Gründungscoaching', href: url.gruendung },
  nachfolge: { label: 'Unternehmensnachfolge', href: url.nachfolge },
  backoffice: { label: 'Back-Office-Service', href: url.backoffice },
  fibu: { label: 'Finanzbuchhaltung & digitale Buchhaltung', href: url.fibu },
  lohn: { label: 'Lohnbuchhaltung', href: url.lohn },
  jahresabschluss: { label: 'Jahresabschluss & betriebliche Steuern', href: url.jahresabschluss },
};
export const serviceList = Object.values(services);

// Header-Dropdown „Leistungen“: Spalten → Gruppen → Links
export const navLeistungen = [
  [
    { group: 'Beratung', links: [services.beratung, services.gruendung, services.nachfolge, services.backoffice] },
  ],
  [
    { group: 'Buchhaltung', links: [services.fibu, services.lohn] },
    { group: 'Steuern', links: [services.jahresabschluss] },
  ],
];

export const navBranchen = [
  { label: 'Gesundheitswesen', href: url.gesundheit },
  { label: 'Handwerk', href: url.handwerk },
  { label: 'E-Commerce', href: url.ecommerce },
  { label: 'Immobilien', href: url.immobilien },
  { label: 'GmbH & Personengesellschaften', href: url.gesellschaften },
];

export const navMain = [
  { label: 'Kanzlei', href: url.kanzlei },
  { label: 'Karriere', href: url.karriere },
  { label: 'Wissen', href: url.wissen },
  { label: 'Kontakt', href: url.kontakt },
];

// Mobiles Menü und Footer: dieselben 7 Leistungen
export const mobileLeistungen = serviceList;
export const footerLeistungen = serviceList;

export const footerKanzlei = [
  { label: 'Leistungen', href: url.leistungen },
  { label: 'Branchen', href: url.branchen },
  { label: 'Kanzlei & Team', href: url.kanzlei },
  { label: 'Karriere', href: url.karriere },
  { label: 'Wissen', href: url.wissen },
  { label: 'Kontakt', href: url.kontakt },
];

export const footerLegal = [
  { label: 'Impressum', href: url.impressum },
  { label: 'Datenschutz', href: url.datenschutz },
  { label: 'Barrierefreiheit', href: url.barrierefreiheit },
];
