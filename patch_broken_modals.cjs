const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// Find the start of the broken block: {showSaveModal && (
// And replace everything until {/* FINAL ACHIEVEMENT MODAL */}
const startIndex = appCode.indexOf('{showSaveModal && (');
const endIndex = appCode.indexOf('{/* FINAL ACHIEVEMENT MODAL */}');

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find start or end index!');
  process.exit(1);
}

const replacement = `
      {/* MODAL: NOTIZBUCH */}
      {showNotes && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-800 bg-amber-500/10 rounded-t-2xl shrink-0">
              <h3 id="notes-title" className="font-black text-amber-500 flex items-center gap-2 text-xl [text-wrap:balance]"><NotebookPen className="w-6 h-6" /> Notizbuch</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button onClick={() => handlePrintModal('notes-title', 'notes-content')} className="text-amber-500/70 hover:text-amber-400 flex items-center gap-2 text-sm bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors">
                  <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Als PDF speichern</span><span className="sm:hidden">PDF</span>
                </button>
                <button onClick={() => setShowNotes(false)} className="text-slate-300 hover:text-white">Schließen</button>
              </div>
            </div>
            
            <div id="notes-content" className="p-6 overflow-y-auto space-y-6">
              {unlockedNotes.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-700 rounded-xl">
                  <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-300 font-bold leading-relaxed [text-wrap:pretty]">Dein Notizbuch ist leer.</p>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed [text-wrap:pretty]">Sammle Erkenntnisse und Beobachtungen in den Akten.</p>
                </div>
              ) : (
                <>
                  {unlockedNotes.includes('note_1') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 01: Das Erstgespräch</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://archive.org/download/azubi-gesprach-1/Azubi-Gespr%C3%A4ch_1.mp4" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline flex items-center gap-2">Video: Azubi-Gespräch 1</a></li>
                        <li><a href="https://github.com/jansonjanson/medienibfpadokufeedback/raw/refs/heads/main/Medien/Erstgespr%C3%A4ch.pdf" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline flex items-center gap-2">PDF: Erstgespräch Formular</a></li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_3') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 03: Fall Lukas</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://archive.org/download/lukas-wundverband/Lukas_Wundverband.mp4" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-2">Video: Lukas Wundverband</a></li>
                        <li><a href="https://github.com/jansonjanson/medienibfpadokufeedback/raw/refs/heads/main/Medien/Beurteilungsbogen_Lukas_Wundverband.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-2">PDF: Beurteilungsbogen Lukas</a></li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_4') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 04: Fall Marc</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://archive.org/embed/das-johari-fenster-1/Das_Johari-Fenster+(1).mp4" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-2">Video: Das Johari-Fenster</a></li>
                        <li><a href="https://archive.org/embed/das-johari-fenster-1/Das_Pendleton-Modell.mp4" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-2">Video: Das Pendleton-Modell</a></li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_6') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 06: Fall Sarah</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://archive.org/embed/der-emotionale-block-sarah/Der_emotionale_Block_Sarah.mp4" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline flex items-center gap-2">Video: Der emotionale Block Sarah</a></li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SAVE SLOTS */}
      {showSaveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-850 rounded-t-2xl shrink-0">
              <h3 className="font-black text-white flex items-center gap-2 text-xl [text-wrap:balance]"><FolderOpen className="w-6 h-6 text-emerald-500" /> Speicherstände</h3>
              <button onClick={() => setShowSaveModal(false)} className="text-slate-300 hover:text-white">Schließen</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">Hier kannst du deinen aktuellen Fortschritt lokal in deinem Browser speichern oder einen alten Spielstand laden.</p>
              
              {[1, 2, 3].map((slotIndex) => {
                const slotId = \`slot_\${slotIndex}\`;
                const slot = saveSlots[slotId];
                return (
                  <div key={slotId} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <strong className="text-white">Speicherplatz {slotIndex}</strong>
                      {slot ? (
                        <span className="text-xs text-slate-400">{slot.date}</span>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Leer</span>
                      )}
                    </div>
                    {slot && (
                      <div className="text-xs text-slate-400 flex gap-4">
                        <span>Akten gelöst: {slot.progress.length}</span>
                        <span>Methoden: {slot.methods.length}</span>
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => handleSaveToSlot(slotId)}
                        className="flex-1 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-500 border border-emerald-500/30 rounded-lg text-sm font-bold transition-colors"
                      >
                        Hier Speichern
                      </button>
                      {slot && (
                        <button 
                          onClick={() => {
                            handleLoadFromSlot(slotId);
                            setShowSaveModal(false);
                          }}
                          className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-500 border border-blue-500/30 rounded-lg text-sm font-bold transition-colors"
                        >
                          Laden
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: METHODENKOFFER */}
      {showMethods && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-800 bg-slate-850 rounded-t-2xl shrink-0">
              <h3 id="methods-title" className="font-black text-white flex items-center gap-2 text-xl [text-wrap:balance]"><Lightbulb className="w-6 h-6 text-blue-500" /> Methodenkoffer</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button onClick={() => handlePrintModal('methods-title', 'methods-content')} className="text-slate-300 hover:text-white flex items-center gap-2 text-sm bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                  <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Als PDF speichern</span><span className="sm:hidden">PDF</span>
                </button>
                <button onClick={() => setShowMethods(false)} className="text-slate-300 hover:text-white">Schließen</button>
              </div>
            </div>
            
            <div id="methods-content" className="p-6 overflow-y-auto space-y-4">
              {unlockedMethods.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-700 rounded-xl">
                  <LockIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-300 font-bold leading-relaxed [text-wrap:pretty]">Der Methodenkoffer ist noch leer.</p>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed [text-wrap:pretty]">Öffne weitere Akten, um hier wichtige Theorien und Modelle freizuschalten.</p>
                </div>
              ) : (
                <>
                  {unlockedMethods.includes('hattie') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-blue-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
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
                      
                      <div className="flex gap-4 mt-6 overflow-x-auto pb-4 hidden-print-container">
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
                      </div>
                    </div>
                  )}
                  {unlockedMethods.includes('pendleton') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-purple-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
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
                      
                      <div className="mt-6 flex flex-col gap-2 items-start hidden-print-container">
                          <a href="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Pendleton.Ubersicht.png" target="_blank" rel="noopener noreferrer" className="block relative group">
                            <img src="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Pendleton.Ubersicht.png" alt="Pendleton Übersicht" className="h-40 object-contain rounded-lg border border-slate-700 group-hover:border-amber-500 transition-colors" />
                            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <span className="bg-slate-900 text-white px-2 py-1 rounded text-xs font-bold border border-slate-700">Vergrößern</span>
                            </div>
                          </a>
                          <a href="https://github.com/jansonjanson/medienibfpadokufeedback/releases/download/V1.0Media/Pendleton.Ubersicht.png" download className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-slate-800 py-1.5 px-3 rounded-md border border-slate-700"><Download className="w-3 h-3" /> Download</a>
                      </div>
                    </div>
                  )}
                  {unlockedMethods.includes('johari') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-rose-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
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
                      </ol>
                    </div>
                  )}
                  {unlockedMethods.includes('gibbs') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-emerald-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
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
                      </p>
                    </div>
                  )}
                  {unlockedMethods.includes('schoen') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-purple-500 animate-in fade-in slide-in-from-left-4 mt-4">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Schön (Reflection in Action)</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">Reflexion während der Handlung (in-action) vs. nach der Handlung (on-action).</p>
                    </div>
                  )}
                  {unlockedMethods.includes('create') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-amber-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Das CREATE-Framework (für KI-Prompts)</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        <strong className="text-white">Definition:</strong> Eine strukturierte Methode, um exakte und qualitativ hochwertige Ergebnisse von generativer KI (wie Gemini oder ChatGPT) zu erhalten.
                      </p>
                      <div>
                        <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                          <li><strong className="text-amber-400">C – Character (Rolle):</strong> Wer soll die KI sein? (z. B. „Agiere als Pflegepädagoge...“)</li>
                          <li><strong className="text-amber-400">R – Request (Aufgabe):</strong> Was genau soll die KI tun? (z. B. „Führe einen sokratischen Dialog...“)</li>
                          <li><strong className="text-amber-400">E – Examples (Beispiele):</strong> Wie soll das Ergebnis aussehen? (z. B. „Gutes Beispiel: 'Welches Verhalten führte zu...' / Schlechtes Beispiel: 'Das war falsch, sag ihr...'“)</li>
                          <li><strong className="text-amber-400">A – Adjustments (Anpassungen):</strong> Tonalität, Formatvorgaben oder Einschränkungen. (z. B. „Stelle immer nur eine Frage auf einmal...“)</li>
                          <li><strong className="text-amber-400">T – Type of Output (Format):</strong> Wie soll die Ausgabe erfolgen? (z. B. Tabelle, Fließtext, Chat-Dialog)</li>
                          <li><strong className="text-amber-400">E – Extras (Zusätze):</strong> Hintergrundinformationen oder Platzhalter für eigene Notizen.</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
`;

appCode = appCode.substring(0, startIndex) + replacement + appCode.substring(endIndex);

fs.writeFileSync('src/App.tsx', appCode);
console.log('Modals restored!');
