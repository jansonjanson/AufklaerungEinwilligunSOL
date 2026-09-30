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
  roomId: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  content: string;
  tasks: string[];
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
    title: 'Die juristische Basis', 
    subtitle: '§ 223 StGB & § 630 BGB', 
    icon: 'FileText', 
    description: 'Jeder ärztliche Heileingriff ist rechtlich eine Körperverletzung.', 
    content: 'Studium des BGB und des CNE-Fachartikels.', 
    tasks: ['Dokumentenstudium', 'Erkenntnisse mit KI abgleichen'],
    tag: 'Grundlagen'
  },
  { 
    id: 2, 
    hour: 1, 
    session: 2, 
    roomId: 'anmeldung',
    title: 'Aufklärungstypen in der Praxis', 
    subtitle: 'Arztvorbehalt vs. Pflege', 
    icon: 'Play', 
    description: 'Video-Analyse: Wer klärt worüber auf?', 
    content: 'Zwei Praxis-Videos der Rechtsdepesche.', 
    tasks: ['Video-Analyse', 'Definition der Zuständigkeiten'],
    tag: 'Praxis-Videos'
  },
  { 
    id: 3, 
    hour: 2, 
    session: 1, 
    roomId: 'patientenzimmer',
    title: 'Fallvignette: Die Prämedikation', 
    subtitle: 'Urteilskraft & Vorlaufzeit', 
    icon: 'AlertCircle', 
    description: 'Frau Meinhardt wird in der OP-Schleuse unter Medikamenteneinfluss aufgeklärt.', 
    content: 'Bewertung der Einwilligungsfähigkeit.', 
    tasks: ['Rechtliche Bewertung', 'Musterlösung prüfen'],
    tag: 'Fallanwendung'
  },
  { 
    id: 4, 
    hour: 2, 
    session: 2, 
    roomId: 'patientenzimmer',
    title: 'Die 4 Einwilligungsformen', 
    subtitle: 'Von konkludent bis mutmaßlich', 
    icon: 'CheckSquare', 
    description: 'Ordnen Sie 4 Alltagssituationen juristisch korrekt ein.', 
    content: 'Fallbeispiele zu: Konkludent, Mutmaßlich, Ausdrücklich, Hypothetisch.', 
    tasks: ['Szenarien bewerten'],
    tag: 'Einwilligung'
  },
  { 
    id: 5, 
    hour: 3, 
    session: 1, 
    roomId: 'stationszimmer',
    title: 'Das große Jura-Quiz', 
    subtitle: 'Wissenstest & Beweislast', 
    icon: 'HelpCircle', 
    description: 'Testen Sie Ihr juristisches Wissen.', 
    content: 'Klausur-Simulator mit MC-Fragen.', 
    tasks: ['Klausurfragen beantworten'],
    tag: 'Wissenstest'
  },
  { 
    id: 6, 
    hour: 3, 
    session: 2, 
    roomId: 'stationszimmer',
    title: 'Grenzen der Delegation', 
    subtitle: 'Was darf die Pflege?', 
    icon: 'Shield', 
    description: 'Welche Aufgaben sind delegationsfähig und welche sind ärztlicher Vorbehalt?', 
    content: 'Zuordnung von Aufgaben im Stationsalltag.', 
    tasks: ['Verantwortungsbereiche abstecken'],
    tag: 'Delegation'
  },
  { 
    id: 7, 
    hour: 4, 
    session: 1, 
    roomId: 'arztzimmer',
    title: 'Das Eskalationsmodell', 
    subtitle: 'Handeln bei Bewusstlosigkeit', 
    icon: 'ListOrdered', 
    description: 'Ein bewusstloser Notfallpatient wird eingeliefert.', 
    content: 'Reihenfolge der Willensermittlung herstellen.', 
    tasks: ['Reihenfolge herstellen'],
    tag: 'Eskalationsmodell'
  },
  { 
    id: 8, 
    hour: 4, 
    session: 2, 
    roomId: 'arztzimmer',
    title: 'KI-Labor & Remonstration', 
    subtitle: 'Kollision im Arztzimmer', 
    icon: 'Bot', 
    description: 'Der Chirurg delegiert rechtswidrig die Risikoaufklärung an Sie.', 
    content: 'Sokratischer KI-Dialog zur Remonstrationspflicht.', 
    tasks: ['KI-Sparring', 'Rechtssichere Doku erstellen'],
    tag: 'KI & Doku'
  }
];
