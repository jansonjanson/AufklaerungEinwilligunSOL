const fs = require('fs');

let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// Akte 03: Replace video link in step 1
code = code.replace(
  '<iframe src="https://archive.org/embed/3-hattie-und-timperley-1/3+-+Hattie+und+Timperley+(1).mp4" className="w-full h-full" allowFullScreen></iframe>',
  '<iframe src="https://archive.org/embed/der-emotionale-block-sarah/Die_Kluft__Tun_vs_Lukas.mp4" className="w-full h-full" allowFullScreen></iframe>'
);

// Akte 03: Remove the Lukas video from Step 2
const oldStep2Video = `<div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-6">\n                  <iframe src="https://archive.org/embed/der-emotionale-block-sarah/Die_Kluft__Tun_vs_Lukas.mp4" className="w-full h-full" allowFullScreen></iframe>\n                </div>`;
code = code.replace(oldStep2Video, '');

// Akte 04: Title
code = code.replace('Gesprächsvorbereitung (Johari & BIBB)', 'Gesprächsvorbereitung (Johari & Pendleton)');

// Akte 06: Bullets & Text
code = code.replace(
  '<li>Es reicht nicht, einfach nur die 6 Fragen hinzuklatschen! Verfasse einen wertschätzenden Einleitungstext für Sarah.</li>',
  '<li>Verfasse einen wertschätzenden und motivierenden Einleitungstext für Sarah, um sie gut auf die Reflexion einzustimmen.</li>'
);

const oldBullets6 = `<li>Mache das Ziel transparent: Warum soll sie diese Fragen beantworten? Nimm ihr den Druck (es ist keine Prüfung!).</li>
                    <li>Biete ihr an, sich jederzeit vorab melden zu können.</li>
                    <li>Füge dann die 6 Leitfragen des Gibbs-Zyklus (siehe Methodenkoffer) als Strukturhilfe an.</li>`;
const newBullets6 = `<li>Mache das Ziel transparent: Warum soll sie diese Fragen beantworten? Nimm ihr den Druck (es ist keine Prüfung!). Biete ihr an, sich jederzeit vorab melden zu können. Füge dann die 6 Leitfragen des Gibbs-Zyklus (siehe Methodenkoffer) als Strukturhilfe an.</li>`;
code = code.replace(oldBullets6, newBullets6);

const oldSolution6 = `"Liebe Sarah, der heutige Vormittag und der plötzliche Tod von Frau Wagner waren extrem belastend. Mir ist wichtig, dass du das nicht einfach wegschiebst, auch wenn du solche Situationen schon aus dem Krankenhaus kennst.`;
const newSolution6 = `"Liebe Sarah, der heutige Vormittag und der plötzliche Tod von Frau Wagner waren extrem belastend. Mir ist wichtig, dass du dich mit den Tod und dem Sterben von Menschen auseinandersetzen kannst. Daher möchte ich die Situation mit dir nachbesprechen und reflektieren.`;
code = code.replace(oldSolution6, newSolution6);

// Akte 08 (Emma): YT Video + Save state
code = code.replace(
  '<iframe src="https://archive.org/embed/das-johari-fenster-1/KOPA_Emma.mp4" className="w-full h-full" allowFullScreen></iframe>',
  '<iframe src="https://www.youtube.com/embed/GTNMMDBW_ws" className="w-full h-full" allowFullScreen></iframe>'
);

const oldNotes8 = `<div className="mt-4">
                  <StyledTextarea
                    label="Meine rohen Notizen zu Emmas Wundverbandwechsel"
                    value={case8Notes}
                    onChange={(e) => setCase8Notes(e.target.value)}
                    placeholder="Tippe hier deine Stichpunkte ein..."
                  />
                </div>`;
const newNotes8 = `{!isSaved ? (
                  <div className="space-y-4 mt-4">
                    <StyledTextarea
                      label="Meine rohen Notizen zu Emmas Wundverbandwechsel"
                      value={case8Notes}
                      onChange={(e) => setCase8Notes(e.target.value)}
                      placeholder="Tippe hier deine Stichpunkte ein..."
                    />
                    <div className="flex justify-end">
                      <button onClick={() => setIsSaved(true)} className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Speichern</button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl mt-4 relative">
                    <div className="space-y-4 pr-10">
                      <div>
                        <strong className="text-blue-400 block text-xs uppercase tracking-widest mb-1">Meine rohen Notizen:</strong>
                        <p className="text-slate-300 text-sm whitespace-pre-wrap">{case8Notes || "Keine Eingabe"}</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button onClick={() => setIsSaved(false)} className="text-xs text-slate-400 hover:text-slate-300">Erneut bearbeiten</button>
                      <button onClick={() => {
                        navigator.clipboard.writeText(case8Notes);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 uppercase tracking-widest text-sm">
                        <Copy className="w-5 h-5" /> Notizen kopieren
                      </button>
                    </div>
                  </div>
                )}`;

code = code.replace(oldNotes8, newNotes8);

fs.writeFileSync('src/CaseContent.tsx', code);
