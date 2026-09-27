const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// 1. Signature update
code = code.replace(/export default function CaseViewer\(\{ caseId, onCanComplete \}: CaseViewerProps & \{ onCanComplete\?: \(val: boolean\) => void \}\) \{/,
`export default function CaseViewer({ caseId, onCanComplete, onUnlockNote }: CaseViewerProps & { onCanComplete?: (val: boolean) => void, onUnlockNote?: (noteId: string) => void }) {`);

// 2. Add Mistakes State
code = code.replace(/const \[case5Score, setCase5Score\] = useState\(0\);/, `const [case5Score, setCase5Score] = useState(0);\n  const [case5Mistakes, setCase5Mistakes] = useState(0);`);
code = code.replace(/const \[case7Score, setCase7Score\] = useState\(0\);/, `const [case7Score, setCase7Score] = useState(0);\n  const [case7Mistakes, setCase7Mistakes] = useState(0);`);

// 3. Increment Mistakes
// Case 5
code = code.replace(/setCase5Feedback\(\{msg: '([^']+)', isError: true\}\)/g, 
`(() => { setCase5Mistakes(m => m + 1); setCase5Feedback({msg: '$1', isError: true}); })()`);
// Case 7
code = code.replace(/setCase7Feedback\(\{msg: '([^']+)', isError: true\}\)/g, 
`(() => { setCase7Mistakes(m => m + 1); setCase7Feedback({msg: '$1', isError: true}); })()`);

// Reset mistakes when repeating quiz
code = code.replace(/setCase5Score\(0\);/g, `setCase5Score(0); setCase5Mistakes(0);`);
code = code.replace(/setCase7Score\(0\);/g, `setCase7Score(0); setCase7Mistakes(0);`);

// 4. Update Confetti / Badge Logic
const oldEffect = `  React.useEffect(() => {
    if (caseId === 5 && case5QuizStep === 4 && case5Score === 4) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [caseId, case5QuizStep, case5Score]);

  React.useEffect(() => {
    if (caseId === 7 && case7QuizStep === 4 && case7Score === 4) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [caseId, case7QuizStep, case7Score]);`;

const newEffect = `  React.useEffect(() => {
    if (caseId === 5 && case5QuizStep === 4 && case5Score === 4) {
      if (case5Mistakes === 0) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#fbbf24', '#f59e0b', '#d97706'] });
        if (onUnlockNote) onUnlockNote('badge_expert_5');
      } else {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, [caseId, case5QuizStep, case5Score, case5Mistakes, onUnlockNote]);

  React.useEffect(() => {
    if (caseId === 7 && case7QuizStep === 4 && case7Score === 4) {
      if (case7Mistakes === 0) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#fbbf24', '#f59e0b', '#d97706'] });
        if (onUnlockNote) onUnlockNote('badge_expert_7');
      } else {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, [caseId, case7QuizStep, case7Score, case7Mistakes, onUnlockNote]);`;

code = code.replace(oldEffect, newEffect);

fs.writeFileSync('src/CaseContent.tsx', code);
console.log('CaseContent.tsx updated');
