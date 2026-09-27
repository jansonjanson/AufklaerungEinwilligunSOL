const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Easter eggs state and UI
code = code.replace(/import { Lock as LockIcon, CheckCircle2, ChevronLeft, NotebookPen, Lightbulb, Map as MapIcon, Info, ArrowDown, FolderOpen, Award, RotateCcw, X } from 'lucide-react';/,
`import { Lock as LockIcon, CheckCircle2, ChevronLeft, NotebookPen, Lightbulb, Map as MapIcon, Info, ArrowDown, FolderOpen, Award, RotateCcw, X, Coffee, Key } from 'lucide-react';`);

// We use unlockedNotes to track easter eggs. e.g. 'easter_egg_coffee', 'easter_egg_key', 'badge_expert_5', 'badge_expert_7'

// 2. Add handleUnlockNote function
code = code.replace(/  const handleOpenCase = \(id: number\) => {/,
`  const handleUnlockNote = (noteId: string) => {
    setUnlockedNotes(prev => {
      if (!prev.includes(noteId)) {
        const newNotes = [...prev, noteId];
        // Don't show toast for every small note, but for badges we can:
        if (noteId.startsWith('badge_expert')) {
          setAchievementToast({ title: 'Perfekt!', subtitle: 'Experten-Badge freigeschaltet.' });
        } else if (noteId.startsWith('easter_egg')) {
          setAchievementToast({ title: 'Geheimnis gefunden!', subtitle: 'Neuer Eintrag im Notizbuch.' });
        }
        return newNotes;
      }
      return prev;
    });
  };

  const handleOpenCase = (id: number) => {`);

// Pass handleUnlockNote to CaseViewer
code = code.replace(/<CaseViewer caseId=\{activeCase\} onCanComplete=\{setCanCompleteCase\} \/>/,
`<CaseViewer caseId={activeCase} onCanComplete={setCanCompleteCase} onUnlockNote={handleUnlockNote} />`);

// 3. Add stamp effect on cases
code = code.replace(/{isDone && <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 shrink-0" \/>}/,
`{isDone && (
  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 rotate-[-15deg] pointer-events-none z-20 animate-in zoom-in spin-in-12 duration-500 origin-center">
    <div className="border-2 sm:border-4 border-emerald-500/80 text-emerald-500/80 text-[10px] sm:text-lg font-black uppercase tracking-widest px-2 sm:px-4 py-0.5 sm:py-1 rounded shadow-lg backdrop-blur-sm bg-slate-900/40">
      GESCHLOSSEN
    </div>
  </div>
)}`);

// Increase opacity of done case
code = code.replace(/bg-slate-900 border-slate-700 opacity-70 hover:opacity-100/, `bg-slate-900 border-slate-700 hover:opacity-100`);

// 4. Room ripple effect
const oldPulse = `border-2 \${isPulsating ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)] animate-pulse' : 'border-amber-500 shadow-[0_8px_30px_rgba(245,158,11,0.4)]'} text-white\`} px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 backdrop-blur-sm\`} 
                  style={{ top: room.top, left: room.left }}
                >
                  {isLocked && <LockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />}
                  <span className="font-black text-xs sm:text-sm whitespace-nowrap drop-shadow-md">{room.name}</span>
                </button>`;

const newPulse = `border-2 \${isPulsating ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]' : 'border-amber-500 shadow-[0_8px_30px_rgba(245,158,11,0.4)]'} text-white\`} px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 backdrop-blur-sm\`} 
                >
                  {isLocked && <LockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />}
                  <span className="font-black text-xs sm:text-sm whitespace-nowrap drop-shadow-md">{room.name}</span>
                </button>
              </div>`;

code = code.replace(oldPulse, newPulse);

code = code.replace(/<button \n\s*key=\{room\.id\}\n\s*onClick=\{\(\) => handleRoomClick\(room\.id\)\} \n\s*className={`absolute transform -translate-x-1\/2 -translate-y-1\/2 transition-all z-10 \$\{/,
`<div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ top: room.top, left: room.left }} key={room.id}>
                {isPulsating && (
                  <>
                    <div className="absolute inset-0 rounded-xl bg-amber-500 animate-ping opacity-75"></div>
                    <div className="absolute inset-[-10px] rounded-xl border border-amber-500 animate-pulse opacity-50"></div>
                  </>
                )}
                <button 
                  onClick={() => handleRoomClick(room.id)} 
                  className={\`relative w-full h-full transition-all \${`);

// 5. Easter eggs on Map
const easterEggs = `
            {/* Easter Eggs */}
            {!unlockedNotes.includes('easter_egg_coffee') && (
              <button onClick={() => handleUnlockNote('easter_egg_coffee')} className="absolute top-[35%] left-[45%] text-slate-700 hover:text-amber-500 transition-colors opacity-30 hover:opacity-100 z-10" title="Hmmm, Kaffee...">
                <Coffee className="w-5 h-5 sm:w-8 sm:h-8" />
              </button>
            )}
            {!unlockedNotes.includes('easter_egg_key') && (
              <button onClick={() => handleUnlockNote('easter_egg_key')} className="absolute top-[85%] left-[20%] text-slate-700 hover:text-amber-500 transition-colors opacity-30 hover:opacity-100 z-10" title="Verlorener Schlüssel?">
                <Key className="w-5 h-5 sm:w-8 sm:h-8" />
              </button>
            )}
            
            {ROOMS.map`;
code = code.replace(/\{ROOMS\.map/, easterEggs);

// 6. Update Notizbuch Content
const newNotebookContent = `
              {unlockedNotes.includes('badge_expert_5') && (
                <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/50 rounded-lg p-4 animate-in fade-in zoom-in-95">
                  <h4 className="font-bold text-amber-400 text-sm mb-2 uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" /> Flawless-Experte (Akte 05)
                  </h4>
                  <p className="text-slate-300 text-sm">Hervorragend! Du hast das erste Methoden-Quiz komplett fehlerfrei gemeistert. Du scheinst die Grundlagen wirklich verinnerlicht zu haben.</p>
                </div>
              )}
              {unlockedNotes.includes('badge_expert_7') && (
                <div className="bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-500/50 rounded-lg p-4 animate-in fade-in zoom-in-95">
                  <h4 className="font-bold text-amber-400 text-sm mb-2 uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" /> Meister der Reflexion (Akte 07)
                  </h4>
                  <p className="text-slate-300 text-sm">Respekt! Der Gibbs-Zyklus sitzt perfekt. Keine Fehler beim Quiz – du hast die Struktur voll verstanden.</p>
                </div>
              )}
              {unlockedNotes.includes('easter_egg_coffee') && (
                <div className="bg-black/50 border border-slate-800 rounded-lg p-4 animate-in fade-in slide-in-from-left-4">
                  <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-700" /> Kaffee-Pause
                  </h4>
                  <p className="text-slate-300 text-sm">Du hast den versteckten Kaffee gefunden! Bonus-Tipp: Mach als Praxisanleitung regelmäßig Pausen. In der Hektik vergessen wir oft uns selbst – und ein kurzer Moment zum Durchatmen ist manchmal effektiver als stures Weiterarbeiten.</p>
                </div>
              )}
              {unlockedNotes.includes('easter_egg_key') && (
                <div className="bg-black/50 border border-slate-800 rounded-lg p-4 animate-in fade-in slide-in-from-left-4">
                  <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-700" /> Der Schlüssel zur Station
                  </h4>
                  <p className="text-slate-300 text-sm">Einen Schlüssel gefunden! Der Schlüssel zu gutem Feedback ist übrigens: Erst Beziehung aufbauen, dann Feedback geben. Ohne Vertrauen prallt jede gut gemeinte Kritik ab.</p>
                </div>
              )}
`;

code = code.replace(/\{unlockedNotes\.includes\('note_8'\) && \(/, newNotebookContent + "\n              {unlockedNotes.includes('note_8') && (");

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated');
