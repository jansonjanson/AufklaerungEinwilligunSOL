const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// I will just use string replacement for the step numbers
code = code.replace(
  '<div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">2</div>',
  '<div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">3</div>'
);

code = code.replace(
  '<div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-black flex items-center justify-center shrink-0">3</div>',
  '<div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0">4</div>'
);

code = code.replace(
  '{renderDocumentationStep(5, \'Lukas\')}',
  '{renderDocumentationStep(5, \'Lukas\')}' // Wait, it should be step 5, let's keep it 5 since it was 5 originally (though maybe it's 5). Actually let's check what it was.
);

fs.writeFileSync('src/CaseContent.tsx', code);
