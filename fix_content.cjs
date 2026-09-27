const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// 1. Update component signature and add states
code = code.replace(
  /export default function CaseViewer\(\{ caseId \}: CaseViewerProps\) \{/,
  `export default function CaseViewer({ caseId, onCanComplete }: CaseViewerProps & { onCanComplete?: (val: boolean) => void }) {
  const [hasCopied, setHasCopied] = useState(false);
  
  React.useEffect(() => {
    setIsSaved(false);
    setHasCopied(false);
  }, [caseId]);
  
  React.useEffect(() => {
    if (caseId === 5) {
      if (onCanComplete) onCanComplete(case5QuizStep === 4);
    } else if (caseId === 7) {
      if (onCanComplete) onCanComplete(case7QuizStep === 4);
    } else {
      if (onCanComplete) onCanComplete(true);
    }
  }, [caseId, case5QuizStep, case7QuizStep, onCanComplete]);`
);

// 2. Fix the copy handler for Case 3 to also setHasCopied(true)
code = code.replace(
  /const handleCopy = \(\) => \{\s*const textToCopy = `FEED UP:\\n\$\{feedUpText\}\\n\\nFEED BACK:\\n\$\{feedBackText\}\\n\\nFEED FORWARD:\\n\$\{feedForwardText\}`;\s*navigator\.clipboard\.writeText\(textToCopy\);\s*setCopied\(true\);\s*setTimeout\(\(\) => setCopied\(false\), 2000\);\s*\};/,
  `const handleCopy = () => {
    const textToCopy = \`FEED UP:\\n\${feedUpText}\\n\\nFEED BACK:\\n\${feedBackText}\\n\\nFEED FORWARD:\\n\${feedForwardText}\`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };`
);

// 3. Fix Case 4 copy handler
code = code.replace(
  /const handleCopyCase4 = \(\) => \{\s*const textToCopy = `Öffentliche Person:\\n\$\{johari1\}\\n\\nBlinder Fleck:\\n\$\{johari2\}\\n\\nMein Geheimnis:\\n\$\{johari3\}\\n\\nUnbekanntes:\\n\$\{johari4\}\\n\\nReflexion der Ausbildungssituation:\\n\$\{bibbReflexion\}\\n\\nZiele des Praxiseinsatzes:\\n\$\{bibbZiele\}`;\s*navigator\.clipboard\.writeText\(textToCopy\);\s*setCopied\(true\);\s*setTimeout\(\(\) => setCopied\(false\), 2000\);\s*\};/,
  `const handleCopyCase4 = () => {
    const textToCopy = \`Öffentliche Person:\\n\${johari1}\\n\\nBlinder Fleck:\\n\${johari2}\\n\\nMein Geheimnis:\\n\${johari3}\\n\\nUnbekanntes:\\n\${johari4}\\n\\nReflexion der Ausbildungssituation:\\n\${bibbReflexion}\\n\\nZiele des Praxiseinsatzes:\\n\${bibbZiele}\`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };`
);

fs.writeFileSync('src/CaseContent.tsx', code);
