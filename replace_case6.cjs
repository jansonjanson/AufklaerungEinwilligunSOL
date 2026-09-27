const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');
const replacement = fs.readFileSync('replace_case6_code.txt', 'utf8');

const regex = /case 6:\s*return \([\s\S]*?\{renderDocumentationStep\(5, 'Sarah'\)\}\s*<\/div>\s*\);/m;
code = code.replace(regex, replacement);
fs.writeFileSync('src/CaseContent.tsx', code);
