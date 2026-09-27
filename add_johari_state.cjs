const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex = /const \[bibbZiele, setBibbZiele\] = useState\(''\);/;
const replacement = `const [bibbZiele, setBibbZiele] = useState('');
  const [johari1, setJohari1] = useState('');
  const [johari2, setJohari2] = useState('');
  const [johari3, setJohari3] = useState('');
  const [johari4, setJohari4] = useState('');`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/CaseContent.tsx', code);
