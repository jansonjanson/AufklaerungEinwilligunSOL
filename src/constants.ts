export interface Room {
  id: string;
  name: string;
  top: string;
  left: string;
  description?: string;
}

export const MAP_IMAGE_URL = 'https://github.com/jansonjanson/AufklaerungEinwilligunSOL/blob/main/Map.jpg?raw=true';

export const ROOMS: Room[] = [
  { id: 'anmeldung', name: '01 Anmeldung', top: '75%', left: '30%', description: 'Rechtliche Grundlagen, BGB-Paragrafen und Praxis-Videos' },
  { id: 'patientenzimmer', name: '02 Patientenzimmer', top: '25%', left: '75%', description: 'Prämedikation, Urteilskraft und Formen der Einwilligung' },
  { id: 'stationszimmer', name: '03 Stationszimmer', top: '25%', left: '30%', description: 'Jura-Quiz, Körperverletzung und Grenzen der Delegation' },
  { id: 'arztzimmer', name: '04 Arztzimmer', top: '75%', left: '75%', description: 'Eskalationsmodell, Remonstration, KI-Labor und Beweislast' }
];
