const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');
const lines = code.split('\n');
lines[704] = "            {renderDocumentationStep(5, 'Sarah')}";
lines[819] = "            {renderDocumentationStep(5, 'Emma')}";
fs.writeFileSync('src/CaseContent.tsx', lines.join('\n'));
