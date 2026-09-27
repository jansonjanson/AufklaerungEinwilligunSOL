const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const components = `
const StyledTextarea = ({ label, description, value, onChange, placeholder, step }: any) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl relative group focus-within:border-blue-500 focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {step && <span className="bg-blue-600 text-white text-xs font-black w-5 h-5 flex items-center justify-center rounded-full">{step}</span>}
          {label && <label className="text-xs font-bold text-blue-400 uppercase tracking-widest">{label}</label>}
        </div>
        <button onClick={handleCopy} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Kopieren">
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      {description && <p className="text-xs text-slate-400 mb-3">{description}</p>}
      <textarea
        value={value}
        onChange={onChange}
        className="w-full h-24 p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-blue-500 outline-none transition-colors text-sm shadow-inner resize-y"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

const CopyBlock = ({ title, content, titleColor = "text-blue-400" }: any) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl relative group">
      <div className="flex justify-between items-center mb-3">
        <h5 className={\`font-bold \${titleColor} text-sm uppercase tracking-widest\`}>{title}</h5>
        <button onClick={handleCopy} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="In die Zwischenablage kopieren">
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
        {content}
      </div>
    </div>
  );
};

`;

code = code.replace("export default function CaseViewer", components + "export default function CaseViewer");
fs.writeFileSync('src/CaseContent.tsx', code);
