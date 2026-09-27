const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// Replace Methodenkoffer modal header
appCode = appCode.replace(
  /<div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-850 rounded-t-2xl shrink-0">[\s\S]*?<h3 className="font-black text-white flex items-center gap-2 text-xl \[text-wrap:balance\]"><Lightbulb className="w-6 h-6 text-blue-500" \/> Methodenkoffer<\/h3>[\s\S]*?<button onClick=\{\(\) => setShowMethods\(false\)\} className="text-slate-300 hover:text-white">Schließen<\/button>[\s\S]*?<\/div>/g,
  `<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-800 bg-slate-850 rounded-t-2xl shrink-0">
              <h3 id="methods-title" className="font-black text-white flex items-center gap-2 text-xl [text-wrap:balance]"><Lightbulb className="w-6 h-6 text-blue-500" /> Methodenkoffer</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button onClick={() => handlePrintModal('methods-title', 'methods-content')} className="text-slate-300 hover:text-white flex items-center gap-2 text-sm bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                  <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Als PDF speichern</span><span className="sm:hidden">PDF</span>
                </button>
                <button onClick={() => setShowMethods(false)} className="text-slate-300 hover:text-white">Schließen</button>
              </div>
            </div>`
);

// Replace Notizbuch modal header
appCode = appCode.replace(
  /<div className="flex justify-between items-center p-6 border-b border-slate-800 bg-amber-500\/10 rounded-t-2xl shrink-0">[\s\S]*?<h3 className="font-black text-amber-500 flex items-center gap-2 text-xl \[text-wrap:balance\]"><NotebookPen className="w-6 h-6" \/> Notizbuch<\/h3>[\s\S]*?<button onClick=\{\(\) => setShowNotes\(false\)\} className="text-slate-300 hover:text-white">Schließen<\/button>[\s\S]*?<\/div>/g,
  `<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-800 bg-amber-500/10 rounded-t-2xl shrink-0">
              <h3 id="notes-title" className="font-black text-amber-500 flex items-center gap-2 text-xl [text-wrap:balance]"><NotebookPen className="w-6 h-6" /> Notizbuch</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button onClick={() => handlePrintModal('notes-title', 'notes-content')} className="text-amber-500/70 hover:text-amber-400 flex items-center gap-2 text-sm bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors">
                  <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Als PDF speichern</span><span className="sm:hidden">PDF</span>
                </button>
                <button onClick={() => setShowNotes(false)} className="text-slate-300 hover:text-white">Schließen</button>
              </div>
            </div>`
);

appCode = appCode.replace(/<div className="p-6 overflow-y-auto space-y-4">/, '<div id="methods-content" className="p-6 overflow-y-auto space-y-4">');

appCode = appCode.replace(/<div className="p-6 overflow-y-auto space-y-6">/, '<div id="notes-content" className="p-6 overflow-y-auto space-y-6">');


fs.writeFileSync('src/App.tsx', appCode);
console.log('App fixed');
