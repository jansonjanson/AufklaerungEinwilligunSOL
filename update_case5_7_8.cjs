const fs = require('fs');

let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const getCaseBlock = (caseNum) => {
  const regex = new RegExp(\`case \${caseNum}:\\s*return \\([\\s\\S]*?\\);\\s*(?:case |default:)\`, 'm');
  const match = code.match(regex);
  return match ? match[0] : null;
};

// We will build the new code blocks for Case 5, 7, 8.
const newCase5 = \`case 5:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white">Methoden-Check</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Bevor du das Büro (Raum 03) betreten darfst, musst du dein methodisches Wissen unter Beweis stellen. 
                Beantworte die drei folgenden Quiz-Fragen zu Hattie & Timperley, zum Pendleton-Modell und zum Johari-Fenster korrekt.
              </p>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              {case5QuizStep === 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 1: Hattie & Timperley</h4>
                  <p className="text-white">Was beschreibt die Feedback-Ebene "Feed Forward"?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => setCase5QuizStep(0)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">A) Wo stehe ich gerade?</button>
                    <button onClick={() => {setCase5Score(case5Score+1); setCase5QuizStep(1);}} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">B) Wie geht es weiter? (Nächste Schritte)</button>
                    <button onClick={() => setCase5QuizStep(0)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">C) Was war das anfängliche Ziel?</button>
                  </div>
                </div>
              )}
              {case5QuizStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 2: Pendleton-Modell</h4>
                  <p className="text-white">Welche Regel gilt im Pendleton-Modell als erster Schritt?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => {setCase5Score(case5Score+1); setCase5QuizStep(2);}} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">A) Der/Die Auszubildende reflektiert zuerst, was gut lief.</button>
                    <button onClick={() => setCase5QuizStep(1)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">B) Die Praxisanleitung kritisiert sofort die gemachten Fehler.</button>
                    <button onClick={() => setCase5QuizStep(1)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">C) Die Praxisanleitung lobt den Auszubildenden überschwänglich.</button>
                  </div>
                </div>
              )}
              {case5QuizStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 3: Johari-Fenster</h4>
                  <p className="text-white">Was beschreibt den "Blinden Fleck" im Johari-Fenster?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => setCase5QuizStep(2)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">A) Eigenschaften, die mir bekannt, aber anderen unbekannt sind.</button>
                    <button onClick={() => {setCase5Score(case5Score+1); setCase5QuizStep(3);}} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">B) Eigenschaften, die mir unbekannt, aber anderen (z.B. der PA) bekannt sind.</button>
                    <button onClick={() => setCase5QuizStep(2)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">C) Eigenschaften, die weder mir noch anderen bekannt sind.</button>
                  </div>
                </div>
              )}
              {case5QuizStep === 3 && (
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
                    <button onClick={() => {setCase5QuizStep(0); setCase5Score(0);}} className="text-slate-400 hover:text-slate-300 text-sm">Quiz wiederholen</button>
                  </div>
                </div>
              )}
            </div>
            
            {renderDocumentationStep(5, 'PA-On-Air (Bonus)')}
          </div>
        );
`;

const newCase7 = \`case 7:
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
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 1: Die richtige Reihenfolge</h4>
                  <p className="text-white">Welche Phase folgt im Gibbs-Zyklus direkt nach der "Beschreibung"?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => setCase7QuizStep(0)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">A) Die Analyse (Warum ist es passiert?)</button>
                    <button onClick={() => {setCase7Score(case7Score+1); setCase7QuizStep(1);}} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">B) Die Gefühle (Was ging mir durch den Kopf?)</button>
                    <button onClick={() => setCase7QuizStep(0)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">C) Die Auswertung (Was war gut/schlecht?)</button>
                  </div>
                </div>
              )}
              {case7QuizStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 2: Was war gut, was war schlecht?</h4>
                  <p className="text-white">In welcher Phase des Gibbs-Zyklus wird konkret gefragt: "Was hat geholfen und was war besonders schwer?"</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => {setCase7Score(case7Score+1); setCase7QuizStep(2);}} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">A) Auswertung (Evaluation)</button>
                    <button onClick={() => setCase7QuizStep(1)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">B) Schlussfolgerung (Conclusion)</button>
                    <button onClick={() => setCase7QuizStep(1)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">C) Aktionsplan (Action Plan)</button>
                  </div>
                </div>
              )}
              {case7QuizStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm">Frage 3: Der Ausblick</h4>
                  <p className="text-white">Welches Ziel verfolgt die finale Phase (der Aktionsplan) im Gibbs-Zyklus?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => setCase7QuizStep(2)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">A) Herausfinden, wer an einer eskalierten Situation schuld war.</button>
                    <button onClick={() => setCase7QuizStep(2)} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">B) Den Auszubildenden für seine Fehler sanktionieren.</button>
                    <button onClick={() => {setCase7Score(case7Score+1); setCase7QuizStep(3);}} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">C) Eine konkrete Verhaltensänderung oder einen Selbstschutz für zukünftige, ähnliche Situationen festlegen.</button>
                  </div>
                </div>
              )}
              {case7QuizStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="font-black text-emerald-500 mb-2 uppercase tracking-widest text-lg">Gibbs-Wissen sitzt!</h4>
                  <p className="text-slate-300 mb-6">Ausgezeichnet. Du kannst die 6 Phasen sicher benennen und zuordnen. Dieses Strukturmodell wird dir als Praxisanleitung künftig in schwierigen Situationen sehr helfen.</p>
                  <div className="mt-8">
                    <button onClick={() => {setCase7QuizStep(0); setCase7Score(0);}} className="text-slate-400 hover:text-slate-300 text-sm">Quiz wiederholen</button>
                  </div>
                </div>
              )}
            </div>
            {renderDocumentationStep(5, 'Gibbs-Quiz')}
          </div>
        );
`;

const newCase8 = \`case 8:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white">Die Mission: In-Action Beobachtung & KI-Labor</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Du begleitest Emma (2. Ausbildungsdrittel) bei einem ambulanten Wundverbandwechsel. In dieser finalen Lernsituation führen wir alle Fäden zusammen: Deine Beobachtungsgabe, dein Wissen über Feedback-Modelle und den Einsatz von Künstlicher Intelligenz.
              </p>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 z-10">1</div>
              <div className="w-full z-10">
                <p className="text-slate-200 font-bold text-sm mb-4">Die Beobachtung (Rohe Notizen)</p>
                <p className="text-slate-300 text-sm mb-4">Schau dir das KOPA-Video von Emma an. Mach dir handschriftlich oder digital Stichpunkte zur Anleitungssituation, z. B.: Was lief fachlich gut? Was ist noch ausbaufähig oder lief schief? Was kann sie nächstes Mal besser machen?</p>
                <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-4">
                  <iframe src="https://archive.org/embed/das-johari-fenster-1/KOPA_Emma.mp4" className="w-full h-full" allowFullScreen></iframe>
                </div>
                <div className="mt-4">
                  <StyledTextarea
                    label="Meine rohen Notizen zu Emmas Wundverbandwechsel"
                    value={case8Notes}
                    onChange={(e: any) => setCase8Notes(e.target.value)}
                    placeholder="Tippe hier deine Stichpunkte ein..."
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">2</div>
              <div className="w-full z-10">
                <p className="text-slate-200 font-bold text-sm mb-2">Das Mentoren-Gespräch (Der Lerngang)</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Du musst nun entscheiden, wie du Emma Feedback gibst. Braucht sie Hattie (Feedback), Pendleton (Feedback) und Johari (Grundlage für Feedback/Reflexion) oder Gibbs (Reflexion)? Nutze Prompt 1 (Sokratischer Dialog). Die KI wird dir keine fertige Lösung geben, sondern dich wie ein guter Mentor durchdenken lassen, welches Modell am besten zu Emmas Verhalten passt. Im Verlauf dieses Chats erarbeitet ihr gemeinsam das finale Gesprächskonzept für Emma.
                </p>
                <CopyBlock
                  title="Master-Prompt 1: Sokratischer Dialog (Tiefenreflexion & Modellauswahl)"
                  titleColor="text-amber-500"
                  content={\`C (Character): Agiere als hochqualifizierter Pflegepädagoge und erfahrener Mentor für mich als Praxisanleitung.

R (Request): Führe mit mir einen sokratischen Dialog. Hilf mir, meine rohen Beobachtungsnotizen zu reflektieren. Gehe mit mir die Feedback- und Reflexionsmodelle (Hattie & Timperley, Pendleton-Modell, Johari-Fenster, Gibbs-Zyklus) durch, damit ich selbst entscheiden kann, welches Modell für dieses spezifische Gespräch am besten geeignet ist. Erarbeite danach mit mir schrittweise das finale Feedback für den Azubi.

E (Examples): Gutes Beispiel für deine Fragen: "Wenn du dir Emmas Reaktion ansiehst, glaubst du, sie braucht eher eine fachliche Struktur nach Hattie oder müssen wir mit Pendleton eine Abwehrhaltung umgehen? Warum?" Schlechtes Beispiel (verboten): "Nutze Hattie. Sag ihr als Feed-Up, dass..."

A (Adjustments): Stelle immer nur EINE einzige kritische, offene Frage auf einmal. Warte meine Antwort zwingend ab! Liefere niemals fertige Lösungen. Zwinge mich zum Nachdenken und zum Begründen meiner methodischen Entscheidungen.

T (Type of Output): Interaktiver, fordernder Chat-Dialog.

E (Extras): Starte den Dialog, begrüße mich kurz, bestätige den Erhalt meiner Notizen und stelle mir die erste Leitfrage zur Sortierung meiner Beobachtungen.

Hier sind meine Daten:
Auszubildende: Emma, 2. Ausbildungsdrittel, ambulanter Wundverband
Meine rohen Notizen:
\${case8Notes || '[Bitte eigene Notizen einfügen]'}\`}
                />
                <div className="flex justify-end pt-2">
                  <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg text-sm">
                    Zu Gemini wechseln <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0 z-10">3</div>
              <div className="w-full z-10">
                <h4 className="font-bold text-white mb-2">Der Effizienz-Booster (Für den Praxisalltag)</h4>
                <p className="text-sm text-slate-300 mb-4">
                  Du hast im Dialog mit der KI nun gelernt, wie du Modelle auswählst. Im echten, stressigen Alltag hast du aber oft keine Zeit für lange Chats. Lerne hier dein Werkzeug für die Zukunft kennen: Nutze Prompt 2 (Feedback-Generator). Hier wirfst du künftig nur noch deine rohen Notizen und das gewünschte Modell in die Vorlage und erhältst in Sekunden einen fertigen, strukturierten Leitfaden. Teste es direkt mit deinen Notizen zu Emma aus!
                </p>
                <CopyBlock
                  title="Master-Prompt 2: Der strukturierte Feedback-Generator (Effizienz für die Praxis)"
                  titleColor="text-emerald-400"
                  content={\`C (Character): Agiere als analytischer Pflegepädagoge.

R (Request): Übersetze meine unstrukturierten, rohen Beobachtungsnotizen aus einer Praxisanleitung in ein pädagogisch wertvolles, sofort anwendbares Feedback.

E (Examples): Wenn ich 'Hattie' wähle, nutze exakt diese Struktur: "1. Feed Up: Das heutige Ziel war... 2. Feed Back: Folgendes habe ich beobachtet... 3. Feed Forward: Beim nächsten Mal werden wir..." Wenn ich 'Pendleton' wähle, strukturiere es so: "1. Azubi fragt sich... 2. PA ergänzt... 3. Azubi reflektiert Fehler... 4. PA setzt Verbesserungsziele..."

A (Adjustments): Nutze eine wertschätzende, aber glasklare Sprache. Erfinde absolut keine eigenen pflegerischen Fakten, Diagnosen oder Vorfälle, sondern nutze streng NUR die Informationen aus meinen Notizen!

T (Type of Output): Strukturierter Fließtext mit übersichtlichen Absätzen/Bulletpoints, exakt passend zu den Phasen des gewählten Modells.

E (Extras): Beziehe folgende Parameter ein:
Gewünschtes Feedback-Modell: [HIER GEWÜNSCHTES MODELL EINTRAGEN, z. B. Hattie / Pendleton / Gibbs]
Sprachliches Niveau für den Azubi: [HIER NIVEAU EINTRAGEN, z. B. Fachsprache / Leichte Sprache B1]
Meine rohen Notizen:
\${case8Notes || '[Bitte eigene Notizen einfügen]'}\`}
                />
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/30">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">4</div>
              <div className="w-full">
                <h4 className="font-bold text-emerald-400 mb-1">Transfer ins fobizz Board</h4>
                <p className="text-sm text-slate-300 mb-3">Kopiere das finale Feedback und poste es auf unserem fobizz Azubi-Board in der Spalte "Emma", damit sie es in Ruhe nachlesen kann.</p>
                {renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz Azubi-Board")}
              </div>
            </div>

            {renderDocumentationStep(5, 'Emma')}
          </div>
        );\n`;

code = code.replace(/case 5:\s*return \([\s\S]*?\);\s*(?=case 6:|default:)/, newCase5);
code = code.replace(/case 7:\s*return \([\s\S]*?\);\s*(?=case 8:|default:)/, newCase7);
code = code.replace(/case 8:\s*return \([\s\S]*?\);\s*(?=default:)/, newCase8);

fs.writeFileSync('src/CaseContent.tsx', code);
