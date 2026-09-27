const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex4 = /<div>\s*<label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Reflexion der Ausbildungssituation<\/label>\s*<p className="text-xs text-slate-400 mb-2">Trage deine Notizen für Pendleton Regel 1 & 2 ein \(Zusammenarbeit, was läuft gut\?\)\.<\/p>\s*<textarea[\s\S]*?<\/textarea>\s*<\/div>\s*<div>\s*<label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Ziele des Praxiseinsatzes<\/label>\s*<p className="text-xs text-slate-400 mb-2">Trage deine Gesprächsstrategie für Pendleton Regel 3 & 4 ein \(Sicherheitsdefizite und Konsequenzen\)\.<\/p>\s*<textarea[\s\S]*?<\/textarea>\s*<\/div>/g;

const replacement4 = `
                    <StyledTextarea
                      label="Reflexion der Ausbildungssituation"
                      description="Trage deine Notizen für Pendleton Regel 1 & 2 ein (Zusammenarbeit, was läuft gut?)."
                      step="1"
                      value={bibbReflexion}
                      onChange={(e: any) => setBibbReflexion(e.target.value)}
                      placeholder="Deine Strategie für den positiven Einstieg..."
                    />
                    <StyledTextarea
                      label="Ziele des Praxiseinsatzes"
                      description="Trage deine Gesprächsstrategie für Pendleton Regel 3 & 4 ein (Sicherheitsdefizite und Konsequenzen)."
                      step="2"
                      value={bibbZiele}
                      onChange={(e: any) => setBibbZiele(e.target.value)}
                      placeholder="Wie platzierst du die Kritik?..."
                    />
`;

code = code.replace(regex4, replacement4);
fs.writeFileSync('src/CaseContent.tsx', code);
