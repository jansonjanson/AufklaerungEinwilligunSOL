const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex = /const renderDocumentationStep = \(stepNumber: string \| number\) => \([\s\S]*?<\/div>\s*<\/div>\s*\);/m;

const replacement = `const renderDocumentationStep = (stepNumber: string | number, name: string) => (
    <div className="flex gap-4 p-4 bg-blue-900/20 rounded-xl border border-blue-500/30 mt-6">
      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">{stepNumber}</div>
      <div className="w-full">
        <h4 className="font-bold text-blue-400 mb-1">Praxisanleitungsnachweis dokumentieren</h4>
        <p className="text-sm text-slate-300 mb-4">
          Lade dir nach Erfüllung der aktuellen Arbeitsaufträge das Dokument "Praxisanleitungsnachweis" herunter und fülle es für {name} aus. Lade es anschließend auf dem fobizz Auszubildenden-Board in der Spalte für {name} hoch.
        </p>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 mb-4 space-y-2 text-sm text-slate-300">
          <p className="font-bold text-slate-200">So gehst du vor:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Klicke in Spalte "{name}" auf <strong>Karte hinzufügen</strong>.</li>
            <li>Gib der Karte einen Namen (z. B. "{name} Praxisanleitungsnachweis").</li>
            <li>Klicke auf <strong>Anlegen</strong>.</li>
            <li>Klicke die neue Karte an und lade dein Dokument unter Anhänge hoch (Dokument per Drag & Drop hochladen oder ein Klick auf „Hinzufügen“ und Datei auswählen).</li>
            <li>Klicke abschließend auf <strong>Speichern</strong>.</li>
          </ol>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <a href="https://github.com/jansonjanson/assetsdokufeedbackreflexion/raw/main/Praxisanleitung.docx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg text-sm">
            <FileText className="w-4 h-4" /> Download Nachweis
          </a>
        </div>
        {renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "Auszubildenden Board")}
      </div>
    </div>
  );`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/CaseContent.tsx', code);
