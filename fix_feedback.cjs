const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// 1. Add feedback state variables
const stateToAdd = `
  const [case5Feedback, setCase5Feedback] = useState<{msg: string, isError: boolean, showNext?: boolean} | null>(null);
  const [case7Feedback, setCase7Feedback] = useState<{msg: string, isError: boolean, showNext?: boolean} | null>(null);
`;
code = code.replace(
  /const \[case7Q4Slots, setCase7Q4Slots\] = useState<Record<number, string>>\(\{\}\);/,
  `const [case7Q4Slots, setCase7Q4Slots] = useState<Record<number, string>>({});${stateToAdd}`
);

// We need to implement the feedback UI in case 5 and 7.
// Let's replace the alert() calls and step advancements.

// CASE 5
const case5Regex = /case 5:\s*return \([\s\S]*?\);\s*(?=case 6:)/;
const newCase5 = `case 5:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white">Methoden-Check</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Bevor du das Büro (Raum 03) betreten darfst, musst du dein methodisches Wissen unter Beweis stellen. 
                Löse die folgenden vielfältigen Aufgaben zu Hattie & Timperley, zum Pendleton-Modell und zum Johari-Fenster.
              </p>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 relative">
              {case5QuizStep === 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 1: Single Choice (Hattie & Timperley)</h4>
                  <p className="text-white">Was beschreibt die Feedback-Ebene "Feed Forward"?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => setCase5Feedback({msg: 'Falsch! Das wäre Feedback (Wo stehe ich gerade?).', isError: true})} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">A) Wo stehe ich gerade?</button>
                    <button onClick={() => {
                      setCase5Feedback({msg: 'Richtig! Sehr gut erkannt. "Feed Forward" richtet den Blick in die Zukunft.', isError: false, showNext: true});
                    }} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">B) Wie geht es weiter? (Nächste Schritte)</button>
                    <button onClick={() => setCase5Feedback({msg: 'Falsch! Das wäre Feed Up (Was war das anfängliche Ziel?).', isError: true})} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">C) Was war das anfängliche Ziel?</button>
                  </div>
                  {case5Feedback && case5QuizStep === 0 && (
                    <div className={\`mt-4 p-4 rounded-lg \${case5Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}\`}>
                      {case5Feedback.msg}
                      {case5Feedback.showNext && (
                        <button onClick={() => {setCase5Score(case5Score+1); setCase5Feedback(null); setCase5QuizStep(1);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case5QuizStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 2: Multiple Choice (Pendleton-Modell)</h4>
                  <p className="text-white">Welche der folgenden Aussagen gehören zu den 4 Regeln des Pendleton-Modells? (Wähle alle korrekten aus)</p>
                  <div className="space-y-2 mt-4">
                    {[
                      { id: 'a', label: '1. Azubi reflektiert zuerst, was gut lief' },
                      { id: 'b', label: '2. PA ergänzt, was gut lief' },
                      { id: 'c', label: '3. PA kritisiert als Erstes die Fehler' },
                      { id: 'd', label: '4. Azubi überlegt, was beim nächsten Mal besser gemacht werden kann' }
                    ].map(opt => (
                      <label key={opt.id} className={\`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors \${case5Q2Answers[opt.id] ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}\`}>
                        <input type="checkbox" className="w-5 h-5 accent-blue-500" checked={!!case5Q2Answers[opt.id]} onChange={(e) => setCase5Q2Answers({...case5Q2Answers, [opt.id]: e.target.checked})} />
                        <span className="text-slate-300">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => {
                    if (case5Q2Answers['a'] && case5Q2Answers['b'] && !case5Q2Answers['c'] && case5Q2Answers['d']) {
                      setCase5Feedback({msg: 'Korrekt! Pendleton vermeidet sofortige Kritik und lässt den Azubi zuerst reflektieren.', isError: false, showNext: true});
                    } else {
                      setCase5Feedback({msg: 'Nicht ganz richtig. Denke daran: Pendleton vermeidet sofortige Kritik durch die PA. (Tipp: 3 Antworten sind richtig)', isError: true});
                    }
                  }} className="mt-4 px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400">Überprüfen</button>
                  {case5Feedback && case5QuizStep === 1 && (
                    <div className={\`mt-4 p-4 rounded-lg \${case5Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}\`}>
                      {case5Feedback.msg}
                      {case5Feedback.showNext && (
                        <button onClick={() => {setCase5Score(case5Score+1); setCase5Feedback(null); setCase5QuizStep(2);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case5QuizStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 3: Lückentext (Johari-Fenster)</h4>
                  <p className="text-white">Wie nennt man den Bereich im Johari-Fenster, der Eigenschaften enthält, die mir selbst *unbekannt*, aber den anderen (z.B. der PA) *bekannt* sind?</p>
                  <div className="mt-4">
                    <StyledTextarea 
                      label="Dein Lösungswort" 
                      value={case5Q3Text} 
                      onChange={(e: any) => setCase5Q3Text(e.target.value)} 
                      placeholder="Trage den Begriff ein..."
                    />
                  </div>
                  <button onClick={() => {
                    const ans = case5Q3Text.toLowerCase().trim();
                    if (ans === 'blinder fleck' || ans === 'der blinde fleck' || ans.includes('blinder fleck') || ans.includes('blinden fleck')) {
                      setCase5Feedback({msg: 'Exzellent! Der Blinde Fleck ist der Bereich, in dem wir auf Feedback von außen angewiesen sind.', isError: false, showNext: true});
                    } else {
                      setCase5Feedback({msg: 'Falsch. Tipp: Es ist etwas, das man selbst nicht sehen kann. Man nennt es "Der ..." (2 Worte).', isError: true});
                    }
                  }} className="mt-4 px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400">Überprüfen</button>
                  {case5Feedback && case5QuizStep === 2 && (
                    <div className={\`mt-4 p-4 rounded-lg \${case5Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}\`}>
                      {case5Feedback.msg}
                      {case5Feedback.showNext && (
                        <button onClick={() => {setCase5Score(case5Score+1); setCase5Feedback(null); setCase5QuizStep(3);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case5QuizStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 4: Richtig oder Falsch (Hattie & Timperley)</h4>
                  <p className="text-white">Die Ebene "Feed Up" klärt die Frage: "Wo stehe ich gerade?".</p>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => {
                      setCase5Feedback({msg: 'Falsch! "Feed Up" klärt die Frage: "Wohin gehe ich?" (Das Ziel). "Wo stehe ich gerade?" ist "Feed Back".', isError: true});
                    }} className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 font-bold transition-colors">Richtig</button>
                    <button onClick={() => {
                      setCase5Feedback({msg: 'Richtig! Sehr gut aufgepasst. "Feed Up" behandelt das Ziel ("Wohin gehe ich?").', isError: false, showNext: true});
                    }} className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 font-bold transition-colors">Falsch</button>
                  </div>
                  {case5Feedback && case5QuizStep === 3 && (
                    <div className={\`mt-4 p-4 rounded-lg \${case5Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}\`}>
                      {case5Feedback.msg}
                      {case5Feedback.showNext && (
                        <button onClick={() => {setCase5Score(case5Score+1); setCase5Feedback(null); setCase5QuizStep(4);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Ergebnis ansehen</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case5QuizStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="font-black text-emerald-500 mb-2 uppercase tracking-widest text-lg">Wissenstest bestanden!</h4>
                  <p className="text-slate-300 mb-6">Du hast alle Fragen korrekt beantwortet. Deine methodischen Grundlagen sitzen perfekt.</p>
                  <p className="text-amber-500 font-bold bg-amber-500/10 inline-block px-4 py-2 rounded-lg border border-amber-500/30">
                    <Lock className="w-4 h-4 inline mr-2" /> Raum 03 (Büro) ist nun für dich freigeschaltet!
                  </p>
                  <div className="mt-8">
                    <button onClick={() => {setCase5QuizStep(0); setCase5Score(0); setCase5Q2Answers({}); setCase5Q3Text(''); setCase5Feedback(null);}} className="text-slate-400 hover:text-slate-300 text-sm">Quiz wiederholen</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
`;

code = code.replace(case5Regex, newCase5);

// CASE 7
const case7Regex = /case 7:\s*return \([\s\S]*?\);\s*(?=case 8:)/;
const newCase7 = `case 7:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white">Wissenstest: Gibbs-Reflexionszyklus</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Um den Reflexionszyklus nach Gibbs in Zukunft sicher anwenden zu können, überprüfe hier dein theoretisches Wissen aus der Akte 06 (Fall Sarah).
              </p>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              {case7QuizStep === 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 1: Single Choice</h4>
                  <p className="text-white">Welche Phase folgt im Gibbs-Zyklus direkt nach der "Beschreibung"?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => setCase7Feedback({msg: 'Falsch! Erst müssen die Gefühle reflektiert werden.', isError: true})} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">A) Die Analyse (Warum ist es passiert?)</button>
                    <button onClick={() => {
                      setCase7Feedback({msg: 'Richtig! Im Gibbs-Zyklus werden direkt nach der sachlichen Beschreibung die Gefühle und Gedanken beleuchtet.', isError: false, showNext: true});
                    }} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">B) Die Gefühle (Was ging mir durch den Kopf?)</button>
                    <button onClick={() => setCase7Feedback({msg: 'Falsch! Die Auswertung kommt erst nach den Gefühlen.', isError: true})} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">C) Die Auswertung (Was war gut/schlecht?)</button>
                  </div>
                  {case7Feedback && case7QuizStep === 0 && (
                    <div className={\`mt-4 p-4 rounded-lg \${case7Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}\`}>
                      {case7Feedback.msg}
                      {case7Feedback.showNext && (
                        <button onClick={() => {setCase7Score(case7Score+1); setCase7Feedback(null); setCase7QuizStep(1);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case7QuizStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 2: Multiple Choice</h4>
                  <p className="text-white">Welche Leitfragen gehören typischerweise zur Phase "Analyse"? (Wähle alle passenden aus)</p>
                  <div className="space-y-2 mt-4">
                    {[
                      { id: 'a', label: 'Warum ist es so passiert, wie es passiert ist?' },
                      { id: 'b', label: 'Was hat Fachwissen oder Theorie damit zu tun?' },
                      { id: 'c', label: 'Was war gut oder schlecht daran?' },
                      { id: 'd', label: 'Welche externen Faktoren haben die Situation beeinflusst?' }
                    ].map(opt => (
                      <label key={opt.id} className={\`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors \${case7Q2Answers[opt.id] ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}\`}>
                        <input type="checkbox" className="w-5 h-5 accent-blue-500" checked={!!case7Q2Answers[opt.id]} onChange={(e) => setCase7Q2Answers({...case7Q2Answers, [opt.id]: e.target.checked})} />
                        <span className="text-slate-300">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => {
                    if (case7Q2Answers['a'] && case7Q2Answers['b'] && !case7Q2Answers['c'] && case7Q2Answers['d']) {
                      setCase7Feedback({msg: 'Hervorragend! Option C gehört zur "Auswertung", die anderen drei sind Kernfragen der Analyse.', isError: false, showNext: true});
                    } else {
                      setCase7Feedback({msg: 'Nicht ganz! Überlege genau: Eine Option dreht sich um "gut oder schlecht" – das ist eigentlich Teil der "Auswertung", nicht der "Analyse".', isError: true});
                    }
                  }} className="mt-4 px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400">Überprüfen</button>
                  {case7Feedback && case7QuizStep === 1 && (
                    <div className={\`mt-4 p-4 rounded-lg \${case7Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}\`}>
                      {case7Feedback.msg}
                      {case7Feedback.showNext && (
                        <button onClick={() => {setCase7Score(case7Score+1); setCase7Feedback(null); setCase7QuizStep(2);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case7QuizStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 3: Richtig oder Falsch</h4>
                  <p className="text-white">Das Hauptziel der Phase "Schlussfolgerung" (Conclusion) ist es, einen Schuldigen für das aufgetretene Problem zu benennen.</p>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => {
                      setCase7Feedback({msg: 'Falsch! Es geht darum zu erkennen, was man künftig anders hätte machen können, nicht um bloße Schuldzuweisung.', isError: true});
                    }} className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 font-bold transition-colors">Richtig</button>
                    <button onClick={() => {
                      setCase7Feedback({msg: 'Richtig! Die Schlussfolgerung zielt auf Lernen ab, nicht auf die Suche nach Schuldigen.', isError: false, showNext: true});
                    }} className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 font-bold transition-colors">Falsch</button>
                  </div>
                  {case7Feedback && case7QuizStep === 2 && (
                    <div className={\`mt-4 p-4 rounded-lg \${case7Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}\`}>
                      {case7Feedback.msg}
                      {case7Feedback.showNext && (
                        <button onClick={() => {setCase7Score(case7Score+1); setCase7Feedback(null); setCase7QuizStep(3);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case7QuizStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 4: Dropdown-Zuordnung</h4>
                  <p className="text-white mb-4">Ordne die fehlenden Phasen des Gibbs-Zyklus in die korrekte chronologische Reihenfolge ein.</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <span className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0">1</span>
                      <span className="text-slate-300">Beschreibung</span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <span className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0">2</span>
                      <select value={case7Q4Slots[2] || ''} onChange={(e) => setCase7Q4Slots({...case7Q4Slots, 2: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-600 rounded p-2 outline-none focus:border-amber-500">
                        <option value="">-- Wähle eine Phase --</option>
                        <option value="Auswertung">Auswertung</option>
                        <option value="Aktionsplan">Aktionsplan</option>
                        <option value="Gefühle">Gefühle</option>
                        <option value="Analyse">Analyse</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <span className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0">3</span>
                      <select value={case7Q4Slots[3] || ''} onChange={(e) => setCase7Q4Slots({...case7Q4Slots, 3: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-600 rounded p-2 outline-none focus:border-amber-500">
                        <option value="">-- Wähle eine Phase --</option>
                        <option value="Auswertung">Auswertung</option>
                        <option value="Aktionsplan">Aktionsplan</option>
                        <option value="Gefühle">Gefühle</option>
                        <option value="Analyse">Analyse</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <span className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0">4</span>
                      <select value={case7Q4Slots[4] || ''} onChange={(e) => setCase7Q4Slots({...case7Q4Slots, 4: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-600 rounded p-2 outline-none focus:border-amber-500">
                        <option value="">-- Wähle eine Phase --</option>
                        <option value="Auswertung">Auswertung</option>
                        <option value="Aktionsplan">Aktionsplan</option>
                        <option value="Gefühle">Gefühle</option>
                        <option value="Analyse">Analyse</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <span className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0">5</span>
                      <span className="text-slate-300">Schlussfolgerung</span>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                      <span className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center shrink-0">6</span>
                      <select value={case7Q4Slots[6] || ''} onChange={(e) => setCase7Q4Slots({...case7Q4Slots, 6: e.target.value})} className="w-full bg-slate-900 text-white border border-slate-600 rounded p-2 outline-none focus:border-amber-500">
                        <option value="">-- Wähle eine Phase --</option>
                        <option value="Auswertung">Auswertung</option>
                        <option value="Aktionsplan">Aktionsplan</option>
                        <option value="Gefühle">Gefühle</option>
                        <option value="Analyse">Analyse</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={() => {
                    if (case7Q4Slots[2] === 'Gefühle' && case7Q4Slots[3] === 'Auswertung' && case7Q4Slots[4] === 'Analyse' && case7Q4Slots[6] === 'Aktionsplan') {
                      setCase7Feedback({msg: 'Perfekt! Du hast alle Phasen in die richtige Reihenfolge gebracht.', isError: false, showNext: true});
                    } else {
                      setCase7Feedback({msg: 'Leider noch nicht ganz korrekt. Prüfe die Reihenfolge: Beschreibung -> ? -> ? -> ? -> Schlussfolgerung -> ?', isError: true});
                    }
                  }} className="mt-4 px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400">Überprüfen</button>
                  {case7Feedback && case7QuizStep === 3 && (
                    <div className={\`mt-4 p-4 rounded-lg \${case7Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}\`}>
                      {case7Feedback.msg}
                      {case7Feedback.showNext && (
                        <button onClick={() => {setCase7Score(case7Score+1); setCase7Feedback(null); setCase7QuizStep(4);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Ergebnis ansehen</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case7QuizStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="font-black text-emerald-500 mb-2 uppercase tracking-widest text-lg">Gibbs-Wissen sitzt!</h4>
                  <p className="text-slate-300 mb-6">Ausgezeichnet. Du kannst die 6 Phasen sicher benennen und zuordnen. Dieses Strukturmodell wird dir als Praxisanleitung künftig in schwierigen Situationen sehr helfen.</p>
                  <div className="mt-8">
                    <button onClick={() => {setCase7QuizStep(0); setCase7Score(0); setCase7Q2Answers({}); setCase7Q4Slots({}); setCase7Feedback(null);}} className="text-slate-400 hover:text-slate-300 text-sm">Quiz wiederholen</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
`;

code = code.replace(case7Regex, newCase7);

fs.writeFileSync('src/CaseContent.tsx', code);
