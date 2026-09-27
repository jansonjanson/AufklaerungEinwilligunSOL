const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// Update CASES array
code = code.replace(
  /\{ id: 5, roomId: 'zimmer', title: 'Akte 05: PA-on-Air \(Bonus\)', tag: 'Fehlervideo', subtitle: 'Analysiere das Fehlervideo und notiere Kritikpunkte\.' \},/,
  `{ id: 5, roomId: 'zimmer', title: 'Akte 05: Methoden-Check (Quiz)', tag: 'Wissenstest', subtitle: 'Teste dein Wissen zu Hattie, Pendleton und Johari.' },`
);
code = code.replace(
  /\{ id: 7, roomId: 'buero', title: 'Akte 07: KI-Labor & CREATE', tag: 'KI-Prompting', subtitle: 'Lerne das CREATE-Framework für KI-Prompts\.' \},/,
  `{ id: 7, roomId: 'buero', title: 'Akte 07: Gibbs-Reflexion (Quiz)', tag: 'Wissenstest', subtitle: 'Teste dein Wissen zum Gibbs-Zyklus.' },`
);
code = code.replace(
  /\{ id: 8, roomId: 'pdbuero', title: 'Akte 08: Fall Emma', tag: 'In-Action', subtitle: 'Beobachte das KOPA-Video zum Wundverband \(Schön\)\.' \}/,
  `{ id: 8, roomId: 'pdbuero', title: 'Akte 08: Fall Emma (In-Action Beobachtung & KI-Labor)', tag: 'In-Action', subtitle: 'Du begleitest Emma bei einem Wundverbandwechsel.' }`
);

// Add new state variables
code = code.replace(
  /const \[case7Text, setCase7Text\] = useState\(''\);/,
  `const [case7Text, setCase7Text] = useState('');
  const [case5QuizStep, setCase5QuizStep] = useState(0);
  const [case5Score, setCase5Score] = useState(0);
  const [case7QuizStep, setCase7QuizStep] = useState(0);
  const [case7Score, setCase7Score] = useState(0);
  const [case8Notes, setCase8Notes] = useState('');`
);

fs.writeFileSync('src/CaseContent.tsx', code);
