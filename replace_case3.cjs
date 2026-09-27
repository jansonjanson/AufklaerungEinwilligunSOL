const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex3 = /<div>\s*<label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Feed Up \(Zielklärung\)<\/label>\s*<textarea[\s\S]*?<\/textarea>\s*<\/div>\s*<div>\s*<label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Feed Back \(Aktueller Stand\)<\/label>\s*<textarea[\s\S]*?<\/textarea>\s*<\/div>\s*<div>\s*<label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Feed Forward \(Nächster Schritt\)<\/label>\s*<textarea[\s\S]*?<\/textarea>\s*<\/div>/g;

const replacement3 = `
                      <StyledTextarea
                        label="Feed Up (Zielklärung)"
                        step="A"
                        value={feedUpText}
                        onChange={(e: any) => setFeedUpText(e.target.value)}
                        placeholder="Wo soll es hingehen?..."
                      />
                      <StyledTextarea
                        label="Feed Back (Aktueller Stand)"
                        step="B"
                        value={feedBackText}
                        onChange={(e: any) => setFeedBackText(e.target.value)}
                        placeholder="Wie lief es gerade (Beobachtung)?..."
                      />
                      <StyledTextarea
                        label="Feed Forward (Nächster Schritt)"
                        step="C"
                        value={feedForwardText}
                        onChange={(e: any) => setFeedForwardText(e.target.value)}
                        placeholder="Wie können wir das heute vereinbarte Ziel erreichen?..."
                      />
`;

code = code.replace(regex3, replacement3);
fs.writeFileSync('src/CaseContent.tsx', code);
