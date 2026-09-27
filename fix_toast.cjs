const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const effectCode = `
  useEffect(() => {
    if (achievementToast) {
      const timer = setTimeout(() => setAchievementToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [achievementToast]);

  useEffect(() => {`;

code = code.replace(/  useEffect\(\(\) => \{\n    if \(showFinalModal\)/, effectCode + '\n    if (showFinalModal)');

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated');
