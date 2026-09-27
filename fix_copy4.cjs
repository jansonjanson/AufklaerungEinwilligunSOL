const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

code = code.replace(
  /const handleCopyCase4 = \(\) => \{\s*navigator\.clipboard\.writeText\(`BIBB-Bogen Notizen:\\n\\nReflexion der Ausbildungssituation \(Regel 1 & 2\):\\n\$\{bibbReflexion\}\\n\\nZiele des Praxiseinsatzes \(Regel 3 & 4\):\\n\$\{bibbZiele\}`\);\s*setCopied\(true\);\s*setTimeout\(\(\) => setCopied\(false\), 2000\);\s*\};/,
  `const handleCopyCase4 = () => {
    navigator.clipboard.writeText(\`BIBB-Bogen Notizen:\\n\\nReflexion der Ausbildungssituation (Regel 1 & 2):\\n\${bibbReflexion}\\n\\nZiele des Praxiseinsatzes (Regel 3 & 4):\\n\${bibbZiele}\`);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };`
);

fs.writeFileSync('src/CaseContent.tsx', code);
