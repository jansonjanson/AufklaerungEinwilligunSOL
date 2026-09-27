const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// CASE 3
const case3OriginalSaveTarget = /<div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">\s*<button onClick=\{\(\) => setIsSaved\(false\)\} className="text-xs text-slate-400 hover:text-slate-300">Erneut bearbeiten<\/button>\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>\s*<div className="flex items-start gap-4 bg-slate-900\/50 p-4 rounded-xl border border-slate-800">/g;

// Only replace the FIRST match (which is Case 3, because it's before Case 4)
let matchCount = 0;
code = code.replace(case3OriginalSaveTarget, (match) => {
  matchCount++;
  if (matchCount === 1) {
    return `<div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                         <button onClick={() => setIsSaved(false)} className="text-xs text-slate-400 hover:text-slate-300">Erneut bearbeiten</button>
                         {!hasCopied && (
                            <button onClick={handleCopy} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 animate-pulse uppercase tracking-widest text-sm">
                              <Copy className="w-5 h-5" /> Feedback jetzt kopieren
                            </button>
                         )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {hasCopied && (
              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 animate-in fade-in slide-in-from-top-4">`;
  }
  return match;
});

// We need to close the `hasCopied` check around the PA-Team board in Case 3.
// The PA board in case 3 is: `{renderBoard(..., "fobizz PA-Team Board")}\n                </div>\n              </div>\n            </div>` (Wait, let's look exactly at how Case 3 ends.)
fs.writeFileSync('src/CaseContent.tsx', code);
