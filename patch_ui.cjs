const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Fix whitespace wrapping on map buttons so they stay on one line
code = code.replace(/<span className="font-bold text-sm">01 Empfang<\/span>/g, '<span className="font-bold text-sm whitespace-nowrap">01 Empfang</span>');
code = code.replace(/<span className="font-bold text-sm">02 Büro<\/span>/g, '<span className="font-bold text-sm whitespace-nowrap">02 Büro</span>');
code = code.replace(/<span className="font-bold text-sm">03 Bewohnerzimmer<\/span>/g, '<span className="font-bold text-sm whitespace-nowrap">03 Bewohnerzimmer</span>');
code = code.replace(/<span className="font-bold text-sm">04 PD Büro<\/span>/g, '<span className="font-bold text-sm whitespace-nowrap">04 PD Büro</span>');

// 2. Enhance empty state to draw attention
const emptyStateOld = `<div className="text-center text-slate-600 my-8 font-bold uppercase tracking-widest">
                Bitte wähle einen Raum auf der Karte.
              </div>`;
const emptyStateNew = `<div className="text-center bg-slate-800/50 border-2 border-dashed border-slate-600 rounded-xl p-8 my-4 flex flex-col items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center animate-bounce text-amber-500 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                </div>
                <span className="text-slate-300 font-bold uppercase tracking-widest text-sm">Wähle zuerst einen Raum auf der Karte</span>
              </div>`;
code = code.replace(emptyStateOld, emptyStateNew);

// 3. Highlight case buttons
const caseBtnOld = `                    <button 
                      key={c.id} 
                      onClick={() => setActiveCase(c.id)}
                      className={\`text-left p-4 rounded-xl border transition-all \${isActive ? 'bg-slate-800 border-medical shadow-md ring-2 ring-medical/30' : 'bg-slate-950 border-slate-700 hover:border-slate-500'}\`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-medical text-[10px] font-black tracking-widest uppercase mb-1 block">Lernsituation</span>
                          <h4 className="font-bold text-white text-base">{c.title}</h4>
                          <span className="text-sm text-slate-400">{c.subtitle}</span>
                        </div>`;
const caseBtnNew = `                    <button 
                      key={c.id} 
                      onClick={() => setActiveCase(c.id)}
                      className={\`text-left p-5 rounded-xl border-2 transition-all relative overflow-hidden group \${isActive ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-slate-800 border-slate-600 hover:border-amber-400 hover:bg-slate-700 hover:shadow-lg hover:-translate-y-0.5'}\`}
                    >
                      <div className={\`absolute left-0 top-0 bottom-0 w-2 transition-colors \${isActive ? 'bg-amber-500' : 'bg-medical group-hover:bg-amber-400'}\`}></div>
                      <div className="flex items-start justify-between pl-3">
                        <div>
                          <span className={\`text-[10px] font-black tracking-widest uppercase mb-1 block transition-colors \${isActive ? 'text-amber-500' : 'text-medical group-hover:text-amber-400'}\`}>
                            {isActive ? 'Aktuelle Auswahl' : 'Verfügbare Lernsituation'}
                          </span>
                          <h4 className="font-bold text-white text-base leading-tight mb-1">{c.title}</h4>
                          <span className="text-sm text-slate-300">{c.subtitle}</span>
                        </div>`;
code = code.replace(caseBtnOld, caseBtnNew);

fs.writeFileSync('src/App.tsx', code);
