const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex = /const \[copied, setCopied\] = useState\(false\);/;
const replacement = `const [copied, setCopied] = useState(false);
  const [case5Text, setCase5Text] = useState('');
  const [case7Text, setCase7Text] = useState('');`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/CaseContent.tsx', code);
