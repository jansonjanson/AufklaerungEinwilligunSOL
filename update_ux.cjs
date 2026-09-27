const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update Pulsating logic
const oldPulsating = `              if (tutorialStep > 3 && progress.length === 0 && room.id === 'empfang') {
                isPulsating = true;
              } else if (progress.includes(1) && progress.includes(2) && !progress.includes(3) && room.id === 'zimmer') {
                isPulsating = true;
              }`;

const newPulsating = `              if (tutorialStep > 3 && progress.length === 0 && room.id === 'empfang') {
                isPulsating = true;
              } else if (progress.includes(1) && progress.includes(2) && !progress.includes(3) && room.id === 'zimmer') {
                isPulsating = true;
              } else if ([1, 2, 3, 4, 5].every(id => progress.includes(id)) && !progress.includes(6) && room.id === 'buero') {
                isPulsating = true;
              } else if ([1, 2, 3, 4, 5, 6, 7].every(id => progress.includes(id)) && !progress.includes(8) && room.id === 'pdbuero') {
                isPulsating = true;
              }`;

code = code.replace(oldPulsating, newPulsating);


// 2. Update allCasesInRoomDone success block
const oldDoneBlock = `              {allCasesInRoomDone && (
                <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl mt-6 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-emerald-400 font-bold mb-1">Alle Akten in diesem Raum sind erledigt!</h4>
                    <p className="text-emerald-100/70 text-sm">Du kannst nun über die Raumübersicht links in den nächsten Raum wechseln.</p>
                  </div>
                </div>
              )}`;

const newDoneBlock = `              {allCasesInRoomDone && (
                <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 sm:p-5 rounded-xl mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-in fade-in">
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-emerald-400 font-bold mb-1">Alle Akten in diesem Raum sind erledigt!</h4>
                      <p className="text-emerald-100/70 text-sm">Du hast alle Lernsituationen hier abgeschlossen.</p>
                    </div>
                  </div>
                  {activeRoom === 'empfang' && (
                    <button onClick={() => setActiveRoom('zimmer')} className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all shrink-0">
                      Weiter zum Bewohnerzimmer <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                  {activeRoom === 'zimmer' && isRoom3Unlocked && (
                    <button onClick={() => setActiveRoom('buero')} className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all shrink-0">
                      Weiter zum Büro <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                  {activeRoom === 'buero' && isRoom4Unlocked && (
                    <button onClick={() => setActiveRoom('pdbuero')} className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all shrink-0">
                      Weiter zum PD Büro <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                </div>
              )}`;

code = code.replace(oldDoneBlock, newDoneBlock);

fs.writeFileSync('src/App.tsx', code);
