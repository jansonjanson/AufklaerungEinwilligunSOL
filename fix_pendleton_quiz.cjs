const fs = require('fs');

let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

code = code.replace(/zu den 4 Regeln des Pendleton-Modells/g, 'zu den Grundprinzipien des Pendleton-Modells');

fs.writeFileSync('src/CaseContent.tsx', code);
console.log('Pendleton quiz fixed.');
