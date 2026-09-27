const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const importTarget = `import { CheckCircle2 } from 'lucide-react';`;
const importReplacement = `import { CheckCircle2, ExternalLink, Maximize2 } from 'lucide-react';`;
code = code.replace(importTarget, importReplacement);

const stateTarget = `  const [kiOutput, setKiOutput] = useState('');`;
const stateReplacement = `  const [kiOutput, setKiOutput] = useState('');
  const [boardModal, setBoardModal] = useState<string | null>(null);`;
code = code.replace(stateTarget, stateReplacement);

const empfangTarget = `            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-medical font-bold text-lg">Dein Azubi-Board (fobizz)</h4>
                <div className="bg-white p-2 rounded shadow-md">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8" alt="QR Code Azubi Board" className="w-16 h-16" />
                </div>
              </div>
              <iframe src="https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?embed=true&token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8" frameBorder="0" className="w-full h-[500px] rounded-lg bg-white" allowFullScreen></iframe>
            </div>`;
const empfangReplacement = `            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <div>
                  <h4 className="text-amber-500 font-bold text-lg mb-2">Dein Azubi-Board (fobizz)</h4>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setBoardModal('https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?embed=true&token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8')} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-950 border border-slate-600 rounded-lg text-sm text-white transition-colors">
                      <Maximize2 className="w-4 h-4" /> Board hier vergrößern
                    </button>
                    <a href="https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-lg text-sm transition-colors">
                      <ExternalLink className="w-4 h-4" /> Im neuen Tab öffnen
                    </a>
                  </div>
                </div>
                <div className="bg-white p-2 rounded shadow-md shrink-0">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8" alt="QR Code Azubi Board" className="w-16 h-16" />
                </div>
              </div>
              <div className="relative w-full h-[300px] overflow-hidden rounded-lg bg-white group border border-slate-700">
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                  <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold shadow-xl border border-slate-700">Tipp: Vergrößern für besseren Überblick</span>
                </div>
                <iframe src="https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?embed=true&token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8" frameBorder="0" className="w-full h-full" allowFullScreen></iframe>
              </div>
            </div>`;
code = code.replace(empfangTarget, empfangReplacement);

const bueroTarget = `            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-medical font-bold text-lg">Unser PA-Team Board (fobizz)</h4>
                <div className="bg-white p-2 rounded shadow-md">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?token=b0cbca55223b034ebf4f4d6038851b70" alt="QR Code PA Board" className="w-16 h-16" />
                </div>
              </div>
              <iframe src="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70" frameBorder="0" className="w-full h-[500px] rounded-lg bg-white" allowFullScreen></iframe>
            </div>`;
const bueroReplacement = `            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <div>
                  <h4 className="text-amber-500 font-bold text-lg mb-2">Unser PA-Team Board (fobizz)</h4>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setBoardModal('https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70')} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-950 border border-slate-600 rounded-lg text-sm text-white transition-colors">
                      <Maximize2 className="w-4 h-4" /> Board hier vergrößern
                    </button>
                    <a href="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?token=b0cbca55223b034ebf4f4d6038851b70" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-lg text-sm transition-colors">
                      <ExternalLink className="w-4 h-4" /> Im neuen Tab öffnen
                    </a>
                  </div>
                </div>
                <div className="bg-white p-2 rounded shadow-md shrink-0">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?token=b0cbca55223b034ebf4f4d6038851b70" alt="QR Code PA Board" className="w-16 h-16" />
                </div>
              </div>
              <div className="relative w-full h-[300px] overflow-hidden rounded-lg bg-white group border border-slate-700">
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">
                  <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold shadow-xl border border-slate-700">Tipp: Vergrößern für besseren Überblick</span>
                </div>
                <iframe src="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70" frameBorder="0" className="w-full h-full" allowFullScreen></iframe>
              </div>
            </div>`;
code = code.replace(bueroTarget, bueroReplacement);

const renderTarget = `    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full flex flex-col">`;
const renderReplacement = `    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 h-full flex flex-col relative">
      
      {boardModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-6xl h-[90vh] bg-slate-900 rounded-2xl flex flex-col border border-slate-700 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-800 bg-slate-850">
              <h3 className="font-bold text-white flex items-center gap-2"><Maximize2 className="w-5 h-5 text-amber-500" /> fobizz Board (Vollbild)</h3>
              <div className="flex items-center gap-4">
                <a href={boardModal.replace('?embed=true&', '?')} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 text-sm font-bold flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" /> Neuen Tab öffnen
                </a>
                <button onClick={() => setBoardModal(null)} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                  Schließen
                </button>
              </div>
            </div>
            <iframe src={boardModal} frameBorder="0" className="flex-1 w-full bg-white" allowFullScreen></iframe>
          </div>
        </div>
      )}`;
code = code.replace(renderTarget, renderReplacement);

fs.writeFileSync('src/CaseContent.tsx', code);
