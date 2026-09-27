const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// Ensure Printer and Download icons are imported
if (!appCode.includes('Printer')) {
  appCode = appCode.replace(/import \{ ([^}]+) \} from 'lucide-react';/, "import { $1, Printer, Download } from 'lucide-react';");
}

// 1. Add handlePrintModal function
const printFn = `
  const handlePrintModal = (titleId: string, contentId: string) => {
    const content = document.getElementById(contentId);
    const title = document.getElementById(titleId);
    if (!content || !title) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(\`
      <html>
        <head>
          <title>\${title.innerText}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; line-height: 1.6; color: #111; max-width: 800px; margin: 0 auto; }
            h2 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
            h4 { color: #222; margin-top: 30px; font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            p { margin-top: 10px; margin-bottom: 10px; }
            ul, ol { margin-top: 10px; margin-bottom: 15px; padding-left: 20px; }
            li { margin-bottom: 5px; }
            img { max-height: 200px; margin-top: 10px; border: 1px solid #ddd; border-radius: 8px; }
            strong { font-weight: bold; }
            .bg-slate-850, .bg-black\\\\/50, .bg-slate-900 { 
              background: #f9f9f9 !important; 
              padding: 20px; 
              margin-bottom: 20px; 
              border: 1px solid #ccc; 
              border-left: 5px solid #666; 
              border-radius: 8px; 
            }
            .text-white { color: #000 !important; }
            .text-slate-300, .text-slate-200 { color: #333 !important; }
            .text-blue-400, .text-purple-400, .text-rose-400, .text-emerald-400, .text-sky-400, .text-amber-400, .text-amber-500 { color: #000 !important; font-weight: bold; }
            a { color: #0056b3; text-decoration: none; }
            .hidden-print, button { display: none !important; }
          </style>
        </head>
        <body>
          <h2>\${title.innerText}</h2>
          \${content.innerHTML}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    \`);
    printWindow.document.close();
  };
`;

if (!appCode.includes('handlePrintModal')) {
  appCode = appCode.replace(/const \[showAdminModal, setShowAdminModal\] = useState\(false\);/, 'const [showAdminModal, setShowAdminModal] = useState(false);\n' + printFn);
}


// Replace Methodenkoffer modal header
appCode = appCode.replace(
  /<div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-850 rounded-t-2xl shrink-0">[\s\S]*?<h3 className="font-black text-white flex items-center gap-2 text-xl \[text-wrap:balance\]"><Lightbulb className="w-6 h-6 text-blue-500" \/> Methodenkoffer<\/h3>[\s\S]*?<button onClick=\{\(\) => setShowMethods\(false\)\} className="text-slate-300 hover:text-white">Schließen<\/button>[\s\S]*?<\/div>/,
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
  /<div className="flex justify-between items-center p-6 border-b border-slate-800 bg-amber-500\/10 rounded-t-2xl shrink-0">[\s\S]*?<h3 className="font-black text-amber-500 flex items-center gap-2 text-xl \[text-wrap:balance\]"><NotebookPen className="w-6 h-6" \/> Notizbuch<\/h3>[\s\S]*?<button onClick=\{\(\) => setShowNotes\(false\)\} className="text-slate-300 hover:text-white">Schließen<\/button>[\s\S]*?<\/div>/,
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

// Add id to contents
appCode = appCode.replace(/<div className="p-6 overflow-y-auto space-y-4">/, '<div id="methods-content" className="p-6 overflow-y-auto space-y-4">');
appCode = appCode.replace(/<div className="p-6 overflow-y-auto space-y-4 max-h-\[60vh\]">/, '<div id="notes-content" className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">'); // Might be different if not max-h

fs.writeFileSync('src/App.tsx', appCode);
console.log('App.tsx phase 1 updated');
