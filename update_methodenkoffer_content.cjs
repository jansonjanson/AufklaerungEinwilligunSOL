const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// We need to replace the content of each unlockedMethods block.
// Since regex matching the whole block might be tricky due to dynamic content, 
// let's split the file or use a simpler approach.

function replaceBlock(code, methodId, newContent) {
  const regex = new RegExp(`(\\{unlockedMethods\\.includes\\('${methodId}'\\) && \\()[\\s\\S]*?(<\\/div>\\s*\\}\\))`, 'g');
  return code.replace(regex, `$1\n${newContent}\n$2`);
}

const hattieContent = `                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-blue-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Das zielorientierte Feedback-Modell nach Hattie und Timperley</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Das weltbekannte Modell „The Power of Feedback“ (2007) definiert Feedback als Information, die hilft, die Lücke zwischen dem aktuellen Leistungsstand und einem gewünschten Ziel zu schließen. Um diese Diskrepanz effektiv zu reduzieren, muss Feedback drei fundamentale Fragen beantworten:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li><strong className="text-blue-400">Feed Up („Where am I going?“):</strong> Klärt die Ziele und Erfolgskriterien. Ohne klare Ziele weiß der Lernende nicht, wohin die Reise geht.</li>
                        <li><strong className="text-blue-400">Feed Back („How am I going?“):</strong> Gibt eine formative Bestandsaufnahme darüber, wie sich der Lernende im Verhältnis zum Ziel schlägt.</li>
                        <li><strong className="text-blue-400">Feed Forward („Where to next?“):</strong> Zeigt konkrete Wege und Strategien auf, um den nächsten Schritt zu meistern. Dies ist der wichtigste, aber in der Praxis am seltensten genutzte Schritt!</li>
                      </ul>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty] mt-4">
                        Die Wirkung dieses Feedbacks hängt entscheidend davon ab, auf welcher <strong>Ebene</strong> es ansetzt:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li><strong className="text-white">Aufgabenebene (Task Level):</strong> Geht es um richtig oder falsch? (Fördert primär Oberflächenwissen, ist aber für Basisfertigkeiten wichtig).</li>
                        <li><strong className="text-white">Prozessebene (Process Level):</strong> Konzentriert sich auf Strategien und kognitive Prozesse zur Aufgabenbewältigung. (Fördert tieferes Verständnis und Transfer).</li>
                        <li><strong className="text-white">Selbstregulationsebene (Self-Regulation Level):</strong> Stärkt die Fähigkeit des Lernenden, das eigene Lernen selbst zu steuern und zu überwachen.</li>
                        <li><strong className="text-white">Selbst-Ebene (Self Level):</strong> Lob oder persönliche Bewertungen ohne direkten Aufgabenbezug (z. B. „Du bist super!“). Empirische Daten zeigen: Dieses Feedback ist meist wirkungslos oder sogar kontraproduktiv, da es die Aufmerksamkeit von der Aufgabe ablenkt.</li>
                      </ul>
                      
                      <div className="flex gap-4 mt-6 overflow-x-auto pb-4">
                        <div className="shrink-0 flex flex-col gap-2">
                          <a href="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Hattie.1.png" target="_blank" rel="noopener noreferrer" className="block relative group">
                            <img src="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Hattie.1.png" alt="Hattie Übersicht 1" className="h-40 object-contain rounded-lg border border-slate-700 group-hover:border-amber-500 transition-colors" />
                            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <span className="bg-slate-900 text-white px-2 py-1 rounded text-xs font-bold border border-slate-700">Vergrößern</span>
                            </div>
                          </a>
                          <a href="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Hattie.1.png" download className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 justify-center bg-slate-800 py-1.5 rounded-md border border-slate-700"><Download className="w-3 h-3" /> Download</a>
                        </div>
                        <div className="shrink-0 flex flex-col gap-2">
                          <a href="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Hattie.2.png" target="_blank" rel="noopener noreferrer" className="block relative group">
                            <img src="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Hattie.2.png" alt="Hattie Übersicht 2" className="h-40 object-contain rounded-lg border border-slate-700 group-hover:border-amber-500 transition-colors" />
                            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <span className="bg-slate-900 text-white px-2 py-1 rounded text-xs font-bold border border-slate-700">Vergrößern</span>
                            </div>
                          </a>
                          <a href="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Hattie.2.png" download className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 justify-center bg-slate-800 py-1.5 rounded-md border border-slate-700"><Download className="w-3 h-3" /> Download</a>
                        </div>
                      </div>`;

const pendletonContent = `                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-purple-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Das Pendleton-Modell: Kooperative Dialogführung</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Das 1984 von David Pendleton und Kollegen entwickelte Modell bricht mit dem klassischen, von oben herab diktierten Bewertungsansatz. Es etablierte sich vor allem in der medizinischen Ausbildung als Goldstandard für mündliche Feedbackgespräche.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Das Geheimnis des Modells liegt in einer festen, lernerzentrierten Gesprächsstruktur, den sogenannten <strong>„Pendleton's Rules“</strong>:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li><strong className="text-purple-400">Regel A:</strong> Der Feedbackempfänger reflektiert selbst, was an seiner Leistung gut gelaufen ist.</li>
                        <li><strong className="text-purple-400">Regel B:</strong> Der Feedbackgeber bestätigt und ergänzt diese Stärken aus seiner Beobachtung.</li>
                        <li><strong className="text-purple-400">Regel C:</strong> Der Feedbackempfänger identifiziert selbst, was verbessert werden kann.</li>
                        <li><strong className="text-purple-400">Regel D:</strong> Der Feedbackgeber formuliert konstruktive Kritik und erarbeitet gemeinsam mit dem Empfänger Lösungsstrategien.</li>
                        <li><strong className="text-purple-400">Regel E:</strong> Beide fassen die wichtigsten Erkenntnisse und den vereinbarten Aktionsplan zusammen.</li>
                      </ul>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty] mt-4">
                        Warum funktioniert das so gut? Indem der Lernende stets zuerst spricht, wird das Machtgefälle reduziert und eine psychologisch sichere Lernumgebung geschaffen. Das bewusste Voranstellen der Stärken öffnet den Empfänger für die anschließenden Verbesserungsvorschläge.
                      </p>
                      
                      <div className="mt-6 flex flex-col gap-2 items-start">
                          <a href="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Pendleton.Ubersicht.png" target="_blank" rel="noopener noreferrer" className="block relative group">
                            <img src="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Pendleton.Ubersicht.png" alt="Pendleton Übersicht" className="h-40 object-contain rounded-lg border border-slate-700 group-hover:border-amber-500 transition-colors" />
                            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <span className="bg-slate-900 text-white px-2 py-1 rounded text-xs font-bold border border-slate-700">Vergrößern</span>
                            </div>
                          </a>
                          <a href="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Pendleton.Ubersicht.png" download className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-slate-800 py-1.5 px-3 rounded-md border border-slate-700"><Download className="w-3 h-3" /> Download</a>
                      </div>`;

const johariContent = `                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-rose-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Das Johari-Fenster: Kommunikation und Vertrauensbildung</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Das Johari-Fenster (entwickelt 1955 von Joseph Luft und Harry Ingham) hilft uns, die Diskrepanz zwischen Selbst- und Fremdwahrnehmung zu verstehen. Es teilt Persönlichkeits- und Verhaltensmerkmale in vier Quadranten ein:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li><strong className="text-rose-400">Der öffentliche Bereich (Arena):</strong> Was ich von mir weiß und auch andere über mich wissen. Hier findet freie und produktive Zusammenarbeit statt.</li>
                        <li><strong className="text-rose-400">Der blinde Fleck (Blind Spot):</strong> Was andere an mir wahrnehmen (z. B. Gestik, Tonfall), mir selbst aber nicht bewusst ist. Dieser Bereich kann nur durch ehrliches Feedback minimiert werden!</li>
                        <li><strong className="text-rose-400">Der private Bereich (Fassade):</strong> Was ich über mich weiß, aber bewusst vor anderen verberge (Ängste, Absichten).</li>
                        <li><strong className="text-rose-400">Der unbekannte Bereich (Unknown Area):</strong> Was weder mir noch anderen bewusst ist (z. B. verborgene Talente oder unbewusste Motive).</li>
                      </ul>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty] mt-4">
                        Das Ziel jeder Teamentwicklung ist es, die <strong>Arena</strong> zu vergrößern. Das gelingt durch zwei Mechanismen:
                      </p>
                      <ol className="list-decimal list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li><strong>Feedback-Einholung (Feedback Solicitation):</strong> Verkleinert den blinden Fleck.</li>
                        <li><strong>Selbstoffenbarung (Self-Disclosure):</strong> Verkleinert die Fassade.</li>
                      </ol>`;

const gibbsContent = `                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-emerald-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Der Gibbs-Reflexionszyklus: Aus Erfahrung lernen</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Reflexion passiert nicht einfach so – sie muss strukturiert sein, um nicht in oberflächliches Jammern oder reine Schuldzuweisungen abzudriften. Graham Gibbs entwickelte 1988 einen sechsstufigen Zyklus, der emotionales Erleben und rationales Denken trennt:
                      </p>
                      <ol className="list-decimal list-inside text-sm text-slate-300 mt-2 space-y-1">
                        <li><strong className="text-emerald-400">Beschreibung (Description):</strong> Was ist genau passiert? (Nur objektive Fakten, keine Bewertung).</li>
                        <li><strong className="text-emerald-400">Gefühle und Gedanken (Feelings):</strong> Was habe ich währenddessen und danach gefühlt und gedacht?</li>
                        <li><strong className="text-emerald-400">Bewertung (Evaluation):</strong> Was war gut, was war schlecht an der Erfahrung?</li>
                        <li><strong className="text-emerald-400">Analyse (Analysis):</strong> Warum lief es so? Welche Theorien oder wissenschaftlichen Erkenntnisse erklären das Geschehene?</li>
                        <li><strong className="text-emerald-400">Schlussfolgerung (Conclusion):</strong> Was habe ich gelernt? Was hätte ich konkret anders machen können?</li>
                        <li><strong className="text-emerald-400">Aktionsplan (Action Plan):</strong> Wie werde ich in einer ähnlichen Situation in Zukunft genau handeln?</li>
                      </ol>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty] mt-4">
                        Indem Gibbs die Gefühle (Stufe 2) explizit isoliert, wird verhindert, dass Emotionen die rationale Analyse (Stufe 4) vernebeln. So gelingt der Schritt von der reinen Fehlerbetrachtung hin zu einer echten Verhaltensänderung.
                      </p>`;

appCode = replaceBlock(appCode, 'hattie', hattieContent);
appCode = replaceBlock(appCode, 'pendleton', pendletonContent);
appCode = replaceBlock(appCode, 'johari', johariContent);
appCode = replaceBlock(appCode, 'gibbs', gibbsContent);

// Also append Synergies block if everything is unlocked
const synergiesCode = `
                  {unlockedMethods.includes('hattie') && unlockedMethods.includes('pendleton') && unlockedMethods.includes('johari') && unlockedMethods.includes('gibbs') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-sky-500 animate-in fade-in slide-in-from-left-4 mt-8 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Systemische Synergien: Die Modelle im Zusammenspiel</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Die vier Modelle entfalten ihre größte Wirkung, wenn man sie miteinander verknüpft:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-2">
                        <li><strong className="text-sky-400">Schnittstelle Johari-Fenster und Hattie-Levels:</strong> Um den <em>blinden Fleck</em> nachhaltig abzubauen, reicht Feedback auf reiner Aufgabenebene nicht aus. Es braucht prozess- und selbstregulationsorientiertes Feedback, damit der Empfänger sein Verhalten tiefgreifend versteht und selbst steuern kann.</li>
                        <li><strong className="text-sky-400">Schnittstelle Gibbs-Zyklus und Pendleton-Selbstreflexion:</strong> In den Pendleton-Regeln muss der Lernende sich selbst einschätzen (Stärken/Schwächen). Damit dies nicht oberflächlich geschieht, kann er im Geist den Gibbs-Zyklus durchlaufen (von der objektiven Beschreibung über die Gefühlsanalyse zur theoriegeleiteten Bewertung), bevor er antwortet.</li>
                        <li><strong className="text-sky-400">Schnittstelle Feed Forward und Aktionsplan:</strong> Hatties zukunftsgerichtetes <em>Feed Forward</em> („Where to next?“) wird sowohl bei Pendleton (Phase E) als auch bei Gibbs (Phase 6) durch die Vereinbarung eines konkreten, messbaren Aktionsplans direkt in die Tat umgesetzt.</li>
                      </ul>
                    </div>
                  )}
`;

appCode = appCode.replace(/(\{\s*unlockedMethods\.includes\('create'\) && \([\s\S]*?<\/div>\s*\}\s*\))/, `$1\n${synergiesCode}`);

fs.writeFileSync('src/App.tsx', appCode);
console.log('App.tsx methods content updated');
