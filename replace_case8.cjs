const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex8 = /<div className="bg-slate-950 border border-slate-700 p-4 rounded-xl">\s*<h5 className="font-bold text-blue-400 text-sm uppercase tracking-widest mb-3">Master-Prompt A: Sokratischer Reflexions-Dialog<\/h5>\s*<div className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">\s*\{`([\s\S]*?)`\}\s*<\/div>\s*<\/div>\s*<div className="bg-slate-950 border border-slate-700 p-4 rounded-xl">\s*<h5 className="font-bold text-emerald-400 text-sm uppercase tracking-widest mb-3">Master-Prompt B: Der strukturierte Feedback-Generator<\/h5>\s*<div className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">\s*\{`([\s\S]*?)`\}\s*<\/div>\s*<\/div>/;

const replacement8 = `
                  <CopyBlock
                    title="Master-Prompt A: Sokratischer Reflexions-Dialog"
                    titleColor="text-blue-400"
                    content={\`$1\`}
                  />
                  <CopyBlock
                    title="Master-Prompt B: Der strukturierte Feedback-Generator"
                    titleColor="text-emerald-400"
                    content={\`$2\`}
                  />
`;

code = code.replace(regex8, replacement8);
fs.writeFileSync('src/CaseContent.tsx', code);
