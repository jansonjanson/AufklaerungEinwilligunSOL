const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex1 = /<div className="pt-1 w-full">\s*<p className="text-slate-200 font-bold text-sm mb-4">Wissens-Videos: Das Johari-Fenster & Pendleton-Modell<\/p>/;
const rep1 = `<div className="pt-1 w-full">
                <p className="text-slate-200 font-bold text-sm mb-4">Wissens-Videos: Das Johari-Fenster & Pendleton-Modell</p>
                <p className="text-slate-300 text-sm mb-4">Bitte sieh dir beide Videos zunächst vollständig an. Dort werden die beiden Modelle erklärt, die wir gleich brauchen. Das Wissen ist danach wieder in deinem Methodenkoffer gespeichert.</p>`;
code = code.replace(regex1, rep1);

const regex2 = /<div className="w-full z-10">\s*<p className="text-slate-200 font-bold text-sm mb-4">Video: Fall Marc<\/p>/;
const rep2 = `<div className="w-full z-10">
                <p className="text-slate-200 font-bold text-sm mb-4">Video: Fall Marc</p>
                <p className="text-slate-300 text-sm mb-4">Bitte sieh dir auch dieses Video vollständig an. Die Inhalte werden hier nochmal wiederholt, aber Marc wird auch schon als Person eingeführt und erstes Hintergrundwissen übertragen.</p>`;
code = code.replace(regex2, rep2);

fs.writeFileSync('src/CaseContent.tsx', code);
