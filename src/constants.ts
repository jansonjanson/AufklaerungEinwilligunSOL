export interface Room {
  id: string;
  name: string;
  top: string;
  left: string;
  description?: string;
}

export interface CaseItem {
  id: number;
  hour: number;
  session: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  content: string;
  tasks: string[];
  roomId: string;
  tag?: string;
}

export const MAP_IMAGE_URL = 'https://github.com/jansonjanson/AufklaerungEinwilligunSOL/blob/main/Map.jpg?raw=true';

export const ROOMS: Room[] = [
  { id: 'anmeldung', name: '01 Anmeldung', top: '75%', left: '30%', description: 'Rechtliche Grundlagen, BGB-Paragrafen und Praxis-Videos' },
  { id: 'patientenzimmer', name: '02 Patientenzimmer', top: '25%', left: '75%', description: 'Prämedikation, Urteilskraft und Formen der Einwilligung' },
  { id: 'stationszimmer', name: '03 Stationszimmer', top: '25%', left: '30%', description: 'Jura-Quiz, Körperverletzung und Grenzen der Delegation' },
  { id: 'arztzimmer', name: '04 Arztzimmer', top: '75%', left: '75%', description: 'Eskalationsmodell, Remonstration, KI-Labor und Beweislast' }
];

export const CASES: CaseItem[] = [
  {
    id: 1,
    hour: 1,
    session: 1,
    roomId: 'anmeldung',
    tag: 'Grundlagen',
    title: 'Die juristische Basis',
    subtitle: '§ 223 StGB & § 630 BGB',
    icon: 'FileText',
    description: 'Jeder ärztliche Heileingriff ist rechtlich eine Körperverletzung. Erarbeiten Sie sich das juristische Fundament.',
    content: 'Studium des BGB und des CNE-Fachartikels. Extrahieren der wichtigsten juristischen Erkenntnisse.',
    tasks: ['Dokumentenstudium', 'Erkenntnisse mit KI abgleichen']
  },
  {
    id: 2,
    hour: 1,
    session: 2,
    roomId: 'anmeldung',
    tag: 'Video-Analyse',
    title: 'Aufklärungstypen in der Praxis',
    subtitle: 'Arztvorbehalt vs. Pflege',
    icon: 'Play',
    description: 'Video-Analyse: Wer klärt worüber auf? Die strikte Trennung von Eingriffs- und Sicherungsaufklärung.',
    content: 'Zwei Praxis-Videos der Rechtsdepesche mit Prof. Dr. med. Helmut Frohnhofen.',
    tasks: ['Video-Analyse', 'Definition der Zuständigkeiten']
  },
  {
    id: 3,
    hour: 2,
    session: 1,
    roomId: 'patientenzimmer',
    tag: 'Fallvignette',
    title: 'Fallvignette: Die Prämedikation',
    subtitle: 'Urteilskraft & Vorlaufzeit',
    icon: 'AlertCircle',
    description: 'Frau Meinhardt wird in der OP-Schleuse unter Medikamenteneinfluss aufgeklärt. Eine juristische Falle.',
    content: 'Bewertung der Einwilligungsfähigkeit und der Rechtzeitigkeit der ärztlichen Aufklärung.',
    tasks: ['Rechtliche Bewertung', 'Musterlösung prüfen']
  },
  {
    id: 4,
    hour: 2,
    session: 2,
    roomId: 'patientenzimmer',
    tag: 'Einwilligung',
    title: 'Die 4 Einwilligungsformen',
    subtitle: 'Von konkludent bis mutmaßlich',
    icon: 'CheckSquare',
    description: 'Einwilligungen müssen nicht immer schriftlich erfolgen. Ordnen Sie 4 Alltagssituationen juristisch korrekt ein.',
    content: 'Fallbeispiele zu: Konkludent, Mutmaßlich, Ausdrücklich, Hypothetisch (sowie Aufklärungsverzicht).',
    tasks: ['Szenarien bewerten']
  },
  {
    id: 5,
    hour: 3,
    session: 1,
    roomId: 'stationszimmer',
    tag: 'Wissenstest',
    title: 'Das große Jura-Quiz',
    subtitle: 'Wissenstest & Beweislast',
    icon: 'HelpCircle',
    description: 'Testen Sie Ihr juristisches Wissen zu Körperverletzung, Beweislastumkehr und den Einwilligungsformen.',
    content: 'Klausur-Simulator mit Multiple-Choice und Lückentexten.',
    tasks: ['Klausurfragen beantworten']
  },
  {
    id: 6,
    hour: 3,
    session: 2,
    roomId: 'stationszimmer',
    tag: 'Delegation',
    title: 'Grenzen der Delegation',
    subtitle: 'Was darf die Pflege?',
    icon: 'Shield',
    description: 'Vertikale Arbeitsteilung im Krankenhaus. Welche Aufgaben sind delegationsfähig und welche sind ärztlicher Vorbehalt?',
    content: 'Zuordnung von Aufgaben zu Arztvorbehalt, Behandlungspflege und § 4 PflBG.',
    tasks: ['Verantwortungsbereiche abstecken']
  },
  {
    id: 7,
    hour: 4,
    session: 1,
    roomId: 'arztzimmer',
    tag: 'Eskalationsmodell',
    title: 'Das Eskalationsmodell',
    subtitle: 'Handeln bei Bewusstlosigkeit',
    icon: 'ListOrdered',
    description: 'Ein bewusstloser Notfallpatient wird eingeliefert. Wie ist die korrekte rechtliche Reihenfolge der Willensermittlung?',
    content: 'Sortieren Sie die Phasen von Notfallindikation bis zum mutmaßlichen Willen.',
    tasks: ['Reihenfolge herstellen']
  },
  {
    id: 8,
    hour: 4,
    session: 2,
    roomId: 'arztzimmer',
    tag: 'KI & Doku',
    title: 'KI-Labor & Remonstration',
    subtitle: 'Kollision im Arztzimmer',
    icon: 'Bot',
    description: 'Der Chirurg delegiert rechtswidrig die Risikoaufklärung an Sie. Nutzen Sie KI, um die Remonstration zu trainieren.',
    content: 'Sokratischer KI-Dialog zur Remonstrationspflicht und Generator für rechtssichere Pflegedokumentation.',
    tasks: ['KI-Sparring', 'Rechtssichere Doku erstellen', 'fobizz Board']
  }
];
