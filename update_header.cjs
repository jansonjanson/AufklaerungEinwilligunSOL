const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the Trophy icon with Trophy from lucide-react if not imported
if (!appCode.includes('Trophy')) {
  appCode = appCode.replace(/import \{ Lock as LockIcon/, 'import { Trophy, Lock as LockIcon');
}

// Add the button
const target = `<div className="flex gap-2 items-center shrink-0">`;
const replacement = `<div className="flex gap-2 items-center shrink-0">
          {progress.length === 8 && (
            <button 
              onClick={() => setShowFinalModal(true)} 
              className="p-2 bg-amber-500/10 border border-amber-500/50 hover:bg-amber-500/20 text-amber-500 rounded-lg transition-all duration-300 hidden sm:flex items-center justify-center mr-2 animate-pulse" 
              title="Abschluss-Abzeichen ansehen">
              <Trophy className="w-5 h-5" />
            </button>
          )}`;

appCode = appCode.replace(target, replacement);

fs.writeFileSync('src/App.tsx', appCode);
console.log('App.tsx updated');
