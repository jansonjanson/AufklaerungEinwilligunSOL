const fs = require('fs');
let code = fs.readFileSync('src/constants.ts', 'utf8');

const newBlock = `
  {
    id: 'block4',
    hour: 4,
    session: 4,
    title: 'Block IV: KI als Doku-Assistent',
    subtitle: 'Sprachbarrieren & Dokumentation',
    icon: 'Bot',
    description: 'Sprachbarrieren verhindern oft eine tiefgehende Reflexion. Wir nutzen KI als Brücke, um rohe Beobachtungen in strukturiertes Feedback zu übersetzen.',
    content: 'Problem: Yusuf ist fachlich kompetent, scheitert aber an Fachbegriffen und Sprachbarrieren in der Dokumentation. Er handelt im Affekt (In-Action) richtig, kann es aber nicht (On-Action) reflektieren.',
    tasks: ['Analyse der Sprachbarriere', 'KI als Übersetzer für pflegerisches Feedback', 'Fall Yusuf: Ambulanter Wundverband']
  }
`;

code = code.replace(/id: 'block3'[\s\S]*?\}\n\];/, match => {
  return match.replace(/\}\n\];/, `},${newBlock}];`);
});

fs.writeFileSync('src/constants.ts', code);
