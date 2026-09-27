const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex = /<h4 className="font-bold text-emerald-400 mb-1">Transfer ins fobizz Board<\/h4>\s*<p className="text-sm text-emerald-100\/70 mb-3">Lade deine Notizen später als Vorbereitung in euer geschütztes fobizz-PA-Board hoch\.<\/p>/;

const replacement = `<h4 className="font-bold text-emerald-400 mb-1">Dokumentiere im PA-Team Board</h4>
                <p className="text-sm text-emerald-100/70 mb-3">Kopiere deinen finalen Text und wechsle über den Link in unser fobizz PA-Team Board. Lege dort unter der Spalte „Marc“ eine neue Karte an, damit auch deine Kolleg:innen im nächsten Dienst Bescheid wissen.</p>
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg flex flex-col gap-2 mb-4">
                  <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke in Spalte "Marc" auf <strong>Karte hinzufügen</strong></span></div>
                  <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Gib der Karte einen Namen (z. B. "Marc Zwischengespräch Feedback")</span></div>
                  <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke auf <strong>Anlegen</strong></span></div>
                  <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke die neue Karte an und füge deinen Text unter <strong>Beschreibung</strong> ein</span></div>
                  <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke abschließend auf <strong>Speichern</strong></span></div>
                </div>`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/CaseContent.tsx', code);
