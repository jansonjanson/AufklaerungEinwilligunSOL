const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex1 = /<div className="pt-1">\s*<p className="text-slate-200 font-bold mb-2">Lade das Dokument „Erstgespräch“ herunter\.<\/p>\s*<a href="https:\/\/github\.com\/jansonjanson\/assetsdokufeedbackreflexion\/blob\/main\/Erstgespr%C3%A4ch\.docx\?raw=true" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600\/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg font-bold text-sm transition-colors border border-blue-500\/30">\s*<FileText className="w-4 h-4" \/> Download \(\.docx\)\s*<\/a>\s*<\/div>\s*<\/div>\s*<div className="flex items-start gap-4 bg-slate-900\/50 p-4 rounded-xl border border-slate-800">\s*<div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500\/20">2<\/div>\s*<div className="pt-1">\s*<p className="text-slate-200 font-bold">Fülle es in Hinsicht auf diese Fortbildung für dich aus\.<\/p>\s*<p className="text-slate-400 text-sm mt-1">Nimm dir ein paar Minuten Zeit, um deine Erwartungen und Ziele zu notieren\.<\/p>\s*<\/div>/;

const replacement1 = `<div className="pt-1 w-full">
                  <p className="text-slate-200 font-bold mb-2">Lade das Dokument „Erstgespräch“ herunter.</p>
                  <a href="https://github.com/jansonjanson/assetsdokufeedbackreflexion/blob/main/Erstgespr%C3%A4ch.docx?raw=true" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg font-bold text-sm transition-colors border border-blue-500/30 mb-4">
                    <FileText className="w-4 h-4" /> Direktdownload (.docx)
                  </a>
                  <p className="text-slate-300 text-sm mb-4">Alternativ kannst du das Dokument auch hier vom fobizz PA-Team Board herunterladen. Beide Wege stehen dir im Alltag offen.</p>
                  {renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz PA-Team Board")}
                </div>
              </div>
              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">2</div>
                <div className="pt-1">
                  <p className="text-slate-200 font-bold">Fülle das Dokument für dich aus.</p>
                  <p className="text-slate-300 text-sm mt-2">Trage deinen Namen und deinen "Praxiseinsatzort" (also dort, wo du tätig bist) ein. Fülle dann die ersten beiden Kategorien <strong>"Reflexion der Ausbildungssituation"</strong> und <strong>"Ziele des Praxiseinsatzes"</strong> aus. Den restlichen Teil kannst du auslassen, bitte sieh ihn dir aber einmal an und lies ihn dir durch.</p>
                </div>`;

code = code.replace(regex1, replacement1);
fs.writeFileSync('src/CaseContent.tsx', code);
