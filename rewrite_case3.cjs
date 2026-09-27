const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex3 = /<div className="flex items-start gap-4 bg-slate-900\/50 p-4 rounded-xl border border-slate-800">\s*<div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0">1<\/div>\s*<div className="pt-1">[\s\S]*?<\/span>\s*<\/p>\s*<\/div>\s*<\/div>\s*<\/div>/m;

const replacement3 = `<div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0">1</div>
                <div className="pt-1">
                  <p className="text-slate-200 font-bold text-sm mb-4">Video ansehen: Das Hattie-Feedback</p>
                  <p className="text-slate-300 text-sm mb-4">Sieh dir das Video vollständig an. Du erfährst hier etwas zu Lukas Fall und lernst das Feedback-Modell von Hattie & Timperley kennen. Dieses fachliche Wissen steht dir ab jetzt auch im Methodenkoffer zur Verfügung.</p>
                  <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-700 shadow-lg mb-4">
                    <iframe src="https://archive.org/embed/der-emotionale-block-sarah/Die_Kluft__Tun_vs_Lukas.mp4" frameBorder="0" className="w-full h-full" allowFullScreen></iframe>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">2</div>
                <div className="pt-1 w-full">
                  <p className="text-slate-200 font-bold text-sm mb-4">Analysiere die Fallvignette. Wo liegen die genauen Fehler, wo die Stärken?</p>
                  <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-l-blue-500 shadow-md">
                    <h4 className="font-black text-white text-lg mb-4 flex items-center gap-2">Fallvignette: Lukas (3. Ausbildungsjahr)</h4>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Im morgendlichen Vorgespräch auf dem Wohnbereich hast du mit Lukas ein klares Ziel für den heutigen Tag vereinbart: Die strikte Einhaltung der Hygienerichtlinien (aseptisches Arbeiten) beim komplexen Verbandwechsel.
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Lukas führt den Verbandwechsel beim Ulcus Cruris von Bewohnerin Frau Meinhardt durch. Er tritt sehr selbstbewusst auf, kommuniziert empathisch mit der Bewohnerin und führt die Wundreinigung an sich technisch routiniert und zügig durch. 
                      <br/><br/>
                      <span className="text-amber-400 font-bold">Das Problem:</span> Während er das Wundsekret entfernt, legt er die sterile anatomische Pinzette für einige Sekunden auf der unsterilen Bettdecke der Bewohnerin ab, nimmt sie danach wieder auf und arbeitet damit weiter. Zudem vergisst er die hygienische Händedesinfektion unmittelbar vor dem Entnehmen und Auflegen der neuen, sterilen Kompresse.
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-900 p-4 rounded-lg border border-slate-700">
                      Nach der Maßnahme im Dienstzimmer fragst du Lukas, wie er seine Leistung einschätzt.<br/>
                      <span className="italic text-white">Seine Antwort: „Das lief doch super, oder? Frau Meinhardt war total entspannt und den Ablauf habe ich im Schlaf drauf. Ich fühle mich da vollständig kompetent.“</span>
                    </p>
                  </div>
                </div>
              </div>`;

code = code.replace(regex3, replacement3);
fs.writeFileSync('src/CaseContent.tsx', code);
