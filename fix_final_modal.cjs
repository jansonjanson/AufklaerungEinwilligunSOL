const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add state variable
const stateToAdd = `
  const [showFinalModal, setShowFinalModal] = useState(false);
`;
code = code.replace(
  /const \[achievementToast, setAchievementToast\] = useState<\{title: string, subtitle: string\} \| null>\(null\);/,
  `const [achievementToast, setAchievementToast] = useState<{title: string, subtitle: string} | null>(null);${stateToAdd}`
);

// 2. Trigger showFinalModal
code = code.replace(
  /if \(newProgress\.length === 8\) \{\s*setTimeout\(\(\) => \{\s*showAchievement\('🎉 Herzlichen Glückwunsch!', 'Du hast alle Akten und Herausforderungen erfolgreich gemeistert\. Das Abenteuer ist abgeschlossen!'\);\s*\}, 1500\);\s*\}/,
  `if (newProgress.length === 8) {
        setTimeout(() => {
          showAchievement('🎉 Herzlichen Glückwunsch!', 'Du hast alle Akten und Herausforderungen erfolgreich gemeistert. Das Abenteuer ist abgeschlossen!');
          setShowFinalModal(true);
        }, 1500);
      }`
);

// 3. Render the final modal just before the end of return ()
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
                Fragen oder Feedback? Melde dich gerne bei uns unter Kontakt!
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
code = code.replace(/    <\/div>\n  \);\n\}\n\nexport default App;/, finalModalRender + "\n}\n\nexport default App;");

fs.writeFileSync('src/App.tsx', code);
