const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

const target = 'className={`flex gap-3 transition-all duration-300 ml-auto ${tutorialStep === 5 ? \'bg-slate-900 p-3 rounded-xl ring-4 ring-amber-500/50 shadow-2xl relative z-50\' : \'\'}`}';
const replacement = 'className={`flex gap-3 transition-all duration-300 ml-auto mr-24 sm:mr-32 md:mr-36 ${tutorialStep === 5 ? \'bg-slate-900 p-3 rounded-xl ring-4 ring-amber-500/50 shadow-2xl relative z-50\' : \'\'}`}';

appCode = appCode.replace(target, replacement);

fs.writeFileSync('src/App.tsx', appCode);
console.log('Buttons moved');
