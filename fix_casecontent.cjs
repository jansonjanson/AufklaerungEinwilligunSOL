const fs = require('fs');

let caseCode = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const newRenderBoard = `  const renderBoard = (url: string, title: string) => {
    const rawUrl = url.replace('?embed=true&', '?');
    const qrUrl = \`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=\${encodeURIComponent(rawUrl)}\`;
    
    let password = null;
    if (title.toLowerCase().includes('pa-team')) {
      password = 'Praxisanleitung';
    } else if (title.toLowerCase().includes('azubi')) {
      password = 'Auszubildende';
    }

    return (
      <div className="bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-700 my-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <div>
            <h4 className="text-amber-500 font-bold text-lg mb-2 [text-wrap:balance]">{title}</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              <button onClick={() => setBoardModal(url)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-950 border border-slate-600 rounded-lg text-sm text-white transition-colors">
                <Maximize2 className="w-4 h-4" /> Vollbild
              </button>
              <a href={rawUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-lg text-sm transition-colors">
                <ExternalLink className="w-4 h-4" /> Neuen Tab öffnen
              </a>
            </div>
            {password && (
              <p className="text-sm text-slate-300 mt-2">
                Passwort: <strong className="text-amber-500 font-mono tracking-wider">{password}</strong>
              </p>
            )}
          </div>
          <button 
            onClick={() => setLargeQr(qrUrl)}
            className="bg-white p-2 rounded shadow-md shrink-0 self-start sm:self-auto hover:scale-105 transition-transform cursor-pointer border-2 border-transparent hover:border-amber-500"
            title="QR Code vergrößern"
          >
            <img src={qrUrl} alt={\`QR Code \${title}\`} className="w-16 h-16" />
          </button>
        </div>
      </div>
    );
  };`;

const startIndex = caseCode.indexOf('const renderBoard = (url: string, title: string) => {');
const endIndex = caseCode.indexOf('  };', startIndex) + 4; // match the end of renderBoard

if (startIndex !== -1 && endIndex !== -1) {
    caseCode = caseCode.substring(0, startIndex) + newRenderBoard + caseCode.substring(endIndex);
    fs.writeFileSync('src/CaseContent.tsx', caseCode);
    console.log('CaseContent updated!');
} else {
    console.log('Could not find renderBoard bounds.');
}
