const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const regex3 = /<div className="flex items-start gap-4 bg-slate-900\/50 p-4 rounded-xl border border-slate-800">\s*<div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0 z-10">3<\/div>\s*<div className="w-full z-10">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div className="flex items-start gap-4 bg-slate-900\/50 p-4 rounded-xl border border-slate-800 relative overflow-hidden group">\s*<div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">4<\/div>\s*<div className="w-full z-10">\s*<h4 className="font-bold text-white mb-2">Dokumentiere deine Strategie<\/h4>\s*<p className="text-sm text-slate-400 mb-4">Wir nutzen die offiziellen Kategorien des BIBB-Zwischengesprächsbogens als unseren Spickzettel für das Gespräch\.<\/p>\s*\{\!isSaved \? \(\s*<div className="space-y-4">/;

const replacement3 = `<div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0 z-10">3</div>
              <div className="w-full z-10">
                <p className="text-slate-200 font-bold text-sm mb-4">Analysiere die Situation: Fallvignette Marc (1. Ausbildungsjahr)</p>
                <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-l-blue-500 shadow-md">
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Marc ist seit zwei Wochen auf deinem Wohnbereich. Er ist verbal sehr präsent, äußerst redegewandt und scheut keine Diskussion. Bei der Pflege arbeitet er schnell, aber fehleranfällig. Die Situation heute Morgen: Marc soll Frau Fichtmüller (Hemiparese nach Schlaganfall) vom Bett in den Rollstuhl mobilisieren. Anstatt die Maßnahme fachgerecht durchzuführen, delegiert er die Aufgabe an die 16-jährige FSJ-Praktikantin: "Geh du schon mal zu Fichtmüller und setz sie in den Stuhl, das ist ganz leicht. Einfach an die Bettkante setzen, Stuhl daneben und dann kräftig rüberziehen. Die Frau ist nicht besonders schwer. Ich muss mich erst noch um was anderes kümmern. Ich komm’ gleich nach"
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Du greifst sofort ein und begleitest die Mobilisation. Dabei fällt dir auf, dass Marc vergisst, die Rollstuhlbremsen festzustellen. Als der Rollstuhl beim Transfer gefährlich wegrollt und du ihn sicherst, verdreht Marc die Augen und reagiert genervt: "Das weiß ich doch selbst! Das war jetzt nur ein Flüchtigkeitsfehler, weil du dabei bist und mir zuschaust. Sonst mach ich das immer richtig!"
                  </p>
                  <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <p className="text-slate-300 text-sm leading-relaxed">Im Vorgespräch zum heutigen BIBB-Zwischengespräch fragst du ihn nach einer kurzen Vorab-Einschätzung.</p>
                    <p className="italic text-white text-sm mt-2 font-medium">Marcs Antwort: "Ich habe den Wohnbereich richtig gut im Griff. Organisation und Delegation sind voll mein Ding. Ich sehe mich da echt als High-Potential für spätere Leitungsaufgaben."</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 relative overflow-hidden group">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">4</div>
              <div className="w-full z-10">
                <h4 className="font-bold text-white mb-2">Dokumentiere deine Strategie</h4>
                <p className="text-sm text-slate-400 mb-4">
                  Die Situation mit dem wegrollenden Rollstuhl und der unzulässigen Delegation liegt nun zwei Tage zurück. Übermorgen steht das offizielle Zwischengespräch mit Marc an. Dies ist deine Chance, das Gespräch strategisch vorzubereiten. Marc hat einen riesigen „Blinden Fleck“. Konfrontierst du ihn jetzt unvorbereitet mit seinen Fehlern, wird er alles auf die Hektik der Station schieben. Wir gehen in zwei Schritten vor:
                </p>
                <div className="mb-4">
                  <strong className="text-white block mb-2">1. Die Diagnostik (Johari-Fenster):</strong>
                  <p className="text-sm text-slate-400 mb-4">Analysiere Marcs Verhalten in allen vier Quadranten, um seinen blinden Fleck exakt zu definieren.</p>
                </div>
                {!isSaved ? (
                  <div className="space-y-4">
                    <StyledTextarea
                      color="rose"
                      label="Quadranten 1: Öffentliche Person"
                      description="Was ist mir und Marc bekannt?"
                      value={johari1}
                      onChange={(e: any) => setJohari1(e.target.value)}
                      placeholder="z.B. Er ist redegewandt..."
                    />
                    <StyledTextarea
                      color="amber"
                      label="Quadranten 2: Blinder Fleck"
                      description="Was ist mir bekannt, aber Marc nicht?"
                      value={johari2}
                      onChange={(e: any) => setJohari2(e.target.value)}
                      placeholder="z.B. Er delegiert unzulässig..."
                    />
                    <StyledTextarea
                      color="blue"
                      label="Quadranten 3: Mein Geheimnis"
                      description="Was ist Marc bekannt, aber mir nicht?"
                      value={johari3}
                      onChange={(e: any) => setJohari3(e.target.value)}
                      placeholder="z.B. Ängste oder Unsicherheiten..."
                    />
                    <StyledTextarea
                      color="emerald"
                      label="Quadranten 4: Unbekanntes"
                      description="Was ist uns beiden nicht bekannt?"
                      value={johari4}
                      onChange={(e: any) => setJohari4(e.target.value)}
                      placeholder="z.B. Zukünftiges Potenzial..."
                    />
                    
                    <div className="mb-4 mt-8">
                      <strong className="text-white block mb-2">2. Die Intervention (Pendleton-Modell im BIBB-Bogen):</strong>
                      <p className="text-sm text-slate-400 mb-4">Skizziere deine Gesprächsnotizen direkt in die Kategorien des offiziellen BIBB-Zwischengesprächsbogens. Nutze Pendleton, um Abwehr zu vermeiden.</p>
                    </div>
`;

code = code.replace(regex3, replacement3);
fs.writeFileSync('src/CaseContent.tsx', code);
