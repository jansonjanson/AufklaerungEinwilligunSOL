const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');
code = code.replace(
  'Du hast sehr empathisch mit Herrn Müller kommuniziert und die Wundreinigung an sich zügig und technisch sicher durchgeführt. Mir ist jedoch aufgefallen, dass',
  'Du hast sehr empathisch mit Frau Meinhardt kommuniziert und die Wundreinigung an sich zügig und technisch sicher durchgeführt. Mir ist aufgefallen, dass'
);
fs.writeFileSync('src/CaseContent.tsx', code);
