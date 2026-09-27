const fs = require('fs');

// --- 1. Modify App.tsx ---
let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// Add confetti import and Award, X from lucide-react if missing
appCode = appCode.replace(/import { Lock as LockIcon, CheckCircle2, ChevronLeft, NotebookPen, Lightbulb, Map as MapIcon, Info, ArrowDown, FolderOpen, Award, RotateCcw } from 'lucide-react';/, 
`import { Lock as LockIcon, CheckCircle2, ChevronLeft, NotebookPen, Lightbulb, Map as MapIcon, Info, ArrowDown, FolderOpen, Award, RotateCcw, X } from 'lucide-react';\nimport confetti from 'canvas-confetti';`);

// Change unlockedNotes initialization
appCode = appCode.replace(/const \[unlockedNotes, setUnlockedNotes\] = useState<string\[\]>\(\['start'\]\);/, 
`const [unlockedNotes, setUnlockedNotes] = useState<string[]>([]);`);

// Change handleOpenCase to include 'start' and fobizz tutorial when Akte 01 opens
appCode = appCode.replace(/if \(\(id === 1 \|\| id === 2\) && !newNotes\.includes\('note_1'\)\) {\s*newNotes\.push\('note_1'\);\s*showAchievement\('Neuer Eintrag im Notizbuch!', 'Fobizz Links freigeschaltet\.'\);\s*}/, 
`if ((id === 1 || id === 2) && !newNotes.includes('note_1')) {
      newNotes.push('note_1');
      if (!newNotes.includes('start')) newNotes.push('start');
      showAchievement('Neuer Eintrag im Notizbuch!', 'Fobizz Links freigeschaltet.');
    }`);

// Add useEffect for confetti on final modal
const finalModalEffect = `
  useEffect(() => {
    if (showFinalModal) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [showFinalModal]);
`;
appCode = appCode.replace(/const \[unlockedNotes, setUnlockedNotes\] = useState<string\[\]>\(\[\]\);/, `const [unlockedNotes, setUnlockedNotes] = useState<string[]>([]);${finalModalEffect}`);

// Style passwords in notebook
appCode = appCode.replace(/<strong className="text-slate-300">Praxisanleitung<\/strong>/g, `<strong className="text-amber-400 font-mono text-sm bg-amber-400/10 px-2 py-0.5 rounded">Praxisanleitung</strong>`);
appCode = appCode.replace(/<strong className="text-slate-300">Auszubildende<\/strong>/g, `<strong className="text-amber-400 font-mono text-sm bg-amber-400/10 px-2 py-0.5 rounded">Auszubildende</strong>`);

// Add final modal if it is missing
if (!appCode.includes('Das Abenteuer ist abgeschlossen.')) {
  const finalModalRender = `
      {/* FINAL ACHIEVEMENT MODAL */}
      {showFinalModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500 rounded-2xl max-w-2xl w-full p-8 shadow-[0_0_40px_rgba(245,158,11,0.2)] animate-in zoom-in-95 fade-in duration-300 relative my-8">
            <button onClick={() => setShowFinalModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <Award className="w-10 h-10 text-slate-900" />
              </div>
              <h2 className="text-3xl font-black text-amber-500 uppercase tracking-widest">Geschafft!</h2>
              <p className="text-xl text-white font-bold mt-2">Dein Abenteuer als Praxisanleitung ist abgeschlossen.</p>
            </div>
            
            <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
              <p>
                Du lehnst dich in deinem Bürostuhl zurück. Der Stapel der Akten auf deinem Schreibtisch ist endlich abgearbeitet. 
                Die Gesichter der Auszubildenden, all die schwierigen Gespräche, die emotionalen Momente und die fachlichen 
                Durchbrüche – all das zieht noch einmal vor deinem inneren Auge vorbei. Du hast es geschafft. 
                Du hast nicht nur Probleme gelöst, sondern echte methodische Werkzeuge in deinen Alltag als Praxisanleitung integriert.
              </p>
              
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h3 className="font-bold text-amber-500 mb-3 uppercase tracking-widest text-xs">Dein gesammeltes Wissen:</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Hattie & Timperley:</strong> Feedback wirkt am besten, wenn es Feed Up (Ziel), Feed Back (Aktueller Stand) und Feed Forward (Nächste Schritte) verbindet.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Pendleton-Modell:</strong> Ein strukturierter Dialog, der den Auszubildenden zuerst reflektieren lässt und so Abwehrhaltungen reduziert.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Johari-Fenster:</strong> Das Erkennen und Verkleinern des "Blinden Flecks" durch offenes und ehrliches Feedback von außen.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Gibbs-Zyklus:</strong> Eine 6-Phasen-Reflexion von der bloßen Beschreibung bis hin zum konkreten, zukünftigen Aktionsplan.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Digitale & KI-Tools:</strong> Der Einsatz der fobizz Pinnwand und das Verständnis, wie KI (wie Claude oder ChatGPT) den Reflexionsprozess als Sparringspartner oder Impulsgeber bereichern kann.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>BIBB Unterlagen:</strong> Offizielle Dokumentationsunterlagen helfen, die Praxisanleitung strukturiert, nachvollziehbar und rechtssicher zu gestalten.</span></li>
                </ul>
              </div>
              
              <p>
                Dein virtueller Methodenkoffer ist nun prall gefüllt. Du hast bewiesen, dass du auch schwierigen Situationen mit Empathie, 
                Struktur und Fachwissen begegnen kannst. 
              </p>
              <p>
                Wir bedanken uns ganz herzlich für deine Teilnahme an diesem Point-and-Click Adventure! 
                Du kannst dieses Abenteuer jederzeit wiederholen, um dein Wissen aufzufrischen oder alternative Lösungswege (und Fehler) auszuprobieren.
              </p>
              <p className="font-bold text-center mt-6 pt-4 border-t border-slate-700">
                Fragen oder Feedback? Melde dich gerne bei uns!
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button onClick={() => setShowFinalModal(false)} className="px-8 py-3 bg-amber-500 text-slate-900 font-black uppercase tracking-widest text-sm rounded-lg hover:bg-amber-400 transition-colors shadow-lg hover:shadow-amber-500/25">
                Zurück ins Büro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
`;
  appCode = appCode.replace(/    <\/div>\n\s*\);\n\}\n\nexport default App;/, finalModalRender + "\n}\n\nexport default App;");
}

fs.writeFileSync('src/App.tsx', appCode);

// --- 2. Modify CaseContent.tsx ---
let caseCode = fs.readFileSync('src/CaseContent.tsx', 'utf8');

caseCode = caseCode.replace(/import { CheckCircle2, ExternalLink, Maximize2, Bot, FileText, ArrowRight, Play, Copy, Check, ChevronRight, Lock as LockIcon } from 'lucide-react';/, 
`import { CheckCircle2, ExternalLink, Maximize2, Bot, FileText, ArrowRight, Play, Copy, Check, ChevronRight, Lock as LockIcon } from 'lucide-react';\nimport confetti from 'canvas-confetti';`);

const quizEffect = `
  React.useEffect(() => {
    if (caseId === 5 && case5QuizStep === 4 && case5Score === 4) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [caseId, case5QuizStep, case5Score]);

  React.useEffect(() => {
    if (caseId === 7 && case7QuizStep === 4 && case7Score === 4) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, [caseId, case7QuizStep, case7Score]);
`;

caseCode = caseCode.replace(/React\.useEffect\(\(\) => {\n\s*if \(caseId === 5\) {\n\s*if \(onCanComplete\)/, 
`${quizEffect}\n  React.useEffect(() => {\n    if (caseId === 5) {\n      if (onCanComplete)`);

fs.writeFileSync('src/CaseContent.tsx', caseCode);
console.log('Modifications applied');
