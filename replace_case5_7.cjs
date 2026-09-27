const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex5 = /<textarea className="w-full h-24 p-4 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 mt-4 focus:border-amber-500 outline-none transition-colors" placeholder="Deine 3 Kritikpunkte..."><\/textarea>/g;

const replacement5 = `
            <StyledTextarea
              label="3 Kritikpunkte (PA-on-Air)"
              value={case5Text}
              onChange={(e: any) => setCase5Text(e.target.value)}
              placeholder="Deine 3 Kritikpunkte..."
            />
`;

code = code.replace(regex5, replacement5);

const regex7 = /<textarea className="w-full h-24 p-4 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-200 mb-4 focus:border-amber-500 outline-none transition-colors" placeholder="Formuliere deinen Prompt nach CREATE..."><\/textarea>/g;

const replacement7 = `
              <StyledTextarea
                label="Dein CREATE Prompt-Entwurf"
                value={case7Text}
                onChange={(e: any) => setCase7Text(e.target.value)}
                placeholder="Formuliere deinen Prompt nach CREATE..."
              />
`;

code = code.replace(regex7, replacement7);

fs.writeFileSync('src/CaseContent.tsx', code);
