const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// 1. Move the useEffects down below state declarations
const useEffects = `  React.useEffect(() => {
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
  }, [caseId, case5QuizStep, case7QuizStep, onCanComplete]);`;

code = code.replace(useEffects, ''); // remove from top

// insert after case7Feedback
code = code.replace(
  /const \[case7Feedback, setCase7Feedback\] = useState<\{msg: string, isError: boolean, showNext\?: boolean\} \| null>\(null\);/,
  `const [case7Feedback, setCase7Feedback] = useState<{msg: string, isError: boolean, showNext?: boolean} | null>(null);\n\n${useEffects}`
);


// 2. Fix handleCopy
code = code.replace(
  /const handleCopy = \(\) => \{\s*navigator\.clipboard\.writeText\(`Feed Up:\\n\$\{feedUpText\}\\n\\nFeed Back:\\n\$\{feedBackText\}\\n\\nFeed Forward:\\n\$\{feedForwardText\}`\);\s*setCopied\(true\);\s*setTimeout\(\(\) => setCopied\(false\), 2000\);\s*\};/,
  `const handleCopy = () => {
    navigator.clipboard.writeText(\`Feed Up:\\n\${feedUpText}\\n\\nFeed Back:\\n\${feedBackText}\\n\\nFeed Forward:\\n\${feedForwardText}\`);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };`
);

// 3. Fix handleCopyCase4
code = code.replace(
  /const handleCopyCase4 = \(\) => \{\s*navigator\.clipboard\.writeText\(`Quadranten 1:\\n\$\{johari1\}\\n\\nQuadranten 2:\\n\$\{johari2\}\\n\\nQuadranten 3:\\n\$\{johari3\}\\n\\nQuadranten 4:\\n\$\{johari4\}\\n\\nReflexion:\\n\$\{bibbReflexion\}\\n\\nZiele:\\n\$\{bibbZiele\}`\);\s*setCopied\(true\);\s*setTimeout\(\(\) => setCopied\(false\), 2000\);\s*\};/,
  `const handleCopyCase4 = () => {
    navigator.clipboard.writeText(\`Quadranten 1:\\n\${johari1}\\n\\nQuadranten 2:\\n\${johari2}\\n\\nQuadranten 3:\\n\${johari3}\\n\\nQuadranten 4:\\n\${johari4}\\n\\nReflexion:\\n\${bibbReflexion}\\n\\nZiele:\\n\${bibbZiele}\`);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };`
);

fs.writeFileSync('src/CaseContent.tsx', code);
