const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// Update Case 3 rendering
// We find the block that renders the saved state in Case 3 and insert the pulsing button if !hasCopied
const case3SavedBlock = `<div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                        <button onClick={() => setIsSaved(false)} className="text-xs text-slate-400 hover:text-slate-300">Erneut bearbeiten</button>
                     </div>
                   </div>
                 )}
               </div>
             </div>`;

const case3SavedBlockNew = `<div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
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
             </div>`;

code = code.replace(case3SavedBlock, case3SavedBlockNew);

const case3Step4Block = `<div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
               <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0">4</div>`;

const case3Step4BlockNew = `{hasCopied && (
             <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 animate-in fade-in slide-in-from-top-4">
               <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0">4</div>`;

// Be careful to only replace the first occurrence which is in Case 3
code = code.replace(case3Step4Block, case3Step4BlockNew);
// And close the bracket after Case 3 step 4 ends
code = code.replace(
  /{renderBoard\("https:\/\/app\.fobizz\.com\/pinboard\/public_boards\/cbb73434-0114-4ee8-853d-31788b459d34\?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz PA-Team Board"\)}\n                <\/div>\n              <\/div>\n            <\/div>/,
  `{renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz PA-Team Board")}
                </div>
              </div>
            )}
            </div>`
);


// Same for Case 4 (Marc)
const case4SavedBlock = `<div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                      <button onClick={() => setIsSaved(false)} className="text-xs text-slate-400 hover:text-slate-300">Erneut bearbeiten</button>
                   </div>
                 </div>
               )}
             </div>
           </div>
           {renderDocumentationStep(7, 'Marc')}
         </div>`;

const case4SavedBlockNew = `<div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button onClick={() => setIsSaved(false)} className="text-xs text-slate-400 hover:text-slate-300">Erneut bearbeiten</button>
                      {!hasCopied && (
                        <button onClick={handleCopyCase4} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 animate-pulse uppercase tracking-widest text-sm">
                          <Copy className="w-5 h-5" /> Texte jetzt kopieren
                        </button>
                      )}
                   </div>
                 </div>
               )}
             </div>
           </div>
           {hasCopied && (
             <div className="animate-in fade-in slide-in-from-top-4">
               {renderDocumentationStep(7, 'Marc')}
             </div>
           )}
         </div>`;

code = code.replace(case4SavedBlock, case4SavedBlockNew);


fs.writeFileSync('src/CaseContent.tsx', code);
