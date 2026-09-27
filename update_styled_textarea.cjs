const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex = /const StyledTextarea = \(\{[^\}]*\}\: any\) => \{[\s\S]*?<\/div>\s*\);\s*\};/m;

const replacement = `const StyledTextarea = ({ label, description, value, onChange, placeholder, step, color = "blue" }: any) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const colorMap: any = {
    blue: {
      bg: "bg-blue-600",
      text: "text-blue-400",
      focus: "focus-within:border-blue-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)]",
      focusBorder: "focus:border-blue-500"
    },
    amber: {
      bg: "bg-amber-600",
      text: "text-amber-400",
      focus: "focus-within:border-amber-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(245,158,11,0.15)]",
      focusBorder: "focus:border-amber-500"
    },
    emerald: {
      bg: "bg-emerald-600",
      text: "text-emerald-400",
      focus: "focus-within:border-emerald-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      focusBorder: "focus:border-emerald-500"
    },
    purple: {
      bg: "bg-purple-600",
      text: "text-purple-400",
      focus: "focus-within:border-purple-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(168,85,247,0.15)]",
      focusBorder: "focus:border-purple-500"
    },
    rose: {
      bg: "bg-rose-600",
      text: "text-rose-400",
      focus: "focus-within:border-rose-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(244,63,94,0.15)]",
      focusBorder: "focus:border-rose-500"
    }
  };

  const activeColor = colorMap[color] || colorMap.blue;

  return (
    <div className={\`bg-slate-900 border border-slate-700 p-4 rounded-xl relative group \${activeColor.focus} \${activeColor.shadow} transition-all mb-4\`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {step && <span className={\`\${activeColor.bg} text-white text-xs font-black w-5 h-5 flex items-center justify-center rounded-full\`}>{step}</span>}
          {label && <label className={\`text-xs font-bold \${activeColor.text} uppercase tracking-widest\`}>{label}</label>}
        </div>
        <button onClick={handleCopy} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Kopieren">
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      {description && <p className="text-xs text-slate-400 mb-3">{description}</p>}
      <textarea
        value={value}
        onChange={onChange}
        className={\`w-full h-24 p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 \${activeColor.focusBorder} outline-none transition-colors text-sm shadow-inner resize-y\`}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};`;

code = code.replace(regex, replacement);

code = code.replace('<StyledTextarea\n                        label="Feed Up (Zielklärung)"', '<StyledTextarea\n                        color="blue"\n                        label="Feed Up (Zielklärung)"');
code = code.replace('<StyledTextarea\n                        label="Feed Back (Aktueller Stand)"', '<StyledTextarea\n                        color="amber"\n                        label="Feed Back (Aktueller Stand)"');
code = code.replace('<StyledTextarea\n                        label="Feed Forward (Nächster Schritt)"', '<StyledTextarea\n                        color="emerald"\n                        label="Feed Forward (Nächster Schritt)"');


fs.writeFileSync('src/CaseContent.tsx', code);
