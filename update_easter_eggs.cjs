const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Replace Map Icons
const oldMapIcons = `            {/* Easter Eggs */}
            {!unlockedNotes.includes('easter_egg_coffee') && (
              <button onClick={() => handleUnlockNote('easter_egg_coffee')} className="absolute top-[35%] left-[45%] text-slate-700 hover:text-amber-500 transition-colors opacity-30 hover:opacity-100 z-10" title="Hmmm, Kaffee...">
                <Coffee className="w-5 h-5 sm:w-8 sm:h-8" />
              </button>
            )}
            {!unlockedNotes.includes('easter_egg_key') && (
              <button onClick={() => handleUnlockNote('easter_egg_key')} className="absolute top-[85%] left-[20%] text-slate-700 hover:text-amber-500 transition-colors opacity-30 hover:opacity-100 z-10" title="Verlorener Schlüssel?">
                <Key className="w-5 h-5 sm:w-8 sm:h-8" />
              </button>
            )}`;

const newMapIcons = `            {/* Easter Eggs */}
            {!unlockedNotes.includes('ee_schoen') && (
              <button onClick={() => handleUnlockNote('ee_schoen')} className="absolute top-[82%] left-[40%] w-16 h-16 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Pflanze/Telefon)"></button>
            )}
            {!unlockedNotes.includes('ee_johari') && (
              <button onClick={() => handleUnlockNote('ee_johari')} className="absolute top-[15%] left-[85%] w-16 h-16 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Fenster)"></button>
            )}
            {!unlockedNotes.includes('ee_hattie') && (
              <button onClick={() => handleUnlockNote('ee_hattie')} className="absolute top-[20%] left-[20%] w-16 h-16 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Bücherregal)"></button>
            )}
            {!unlockedNotes.includes('ee_pendleton') && (
              <button onClick={() => handleUnlockNote('ee_pendleton')} className="absolute top-[80%] left-[85%] w-16 h-16 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Monitor)"></button>
            )}`;

appCode = appCode.replace(oldMapIcons, newMapIcons);

// 2. Replace Notebook Notes
const oldNotes = `              {unlockedNotes.includes('easter_egg_coffee') && (
                <div className="bg-black/50 border border-slate-800 rounded-lg p-4 animate-in fade-in slide-in-from-left-4">
                  <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-amber-700" /> Kaffee-Pause
                  </h4>
                  <p className="text-slate-300 text-sm">Du hast den versteckten Kaffee gefunden! Bonus-Tipp: Mach als Praxisanleitung regelmäßig Pausen. In der Hektik vergessen wir oft uns selbst – und ein kurzer Moment zum Durchatmen ist manchmal effektiver als stures Weiterarbeiten.</p>
                </div>
              )}
              {unlockedNotes.includes('easter_egg_key') && (
                <div className="bg-black/50 border border-slate-800 rounded-lg p-4 animate-in fade-in slide-in-from-left-4">
                  <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 flex items-center gap-2">
                    <Key className="w-4 h-4 text-amber-700" /> Der Schlüssel zur Station
                  </h4>
                  <p className="text-slate-300 text-sm">Einen Schlüssel gefunden! Der Schlüssel zu gutem Feedback ist übrigens: Erst Beziehung aufbauen, dann Feedback geben. Ohne Vertrauen prallt jede gut gemeinte Kritik ab.</p>
                </div>
              )}`;

const newNotes = `              {unlockedNotes.includes('ee_schoen') && (
                <div className="bg-slate-900 border border-amber-500/50 rounded-lg p-4 animate-in fade-in slide-in-from-left-4">
                  <h4 className="font-bold text-amber-500 text-sm mb-2 uppercase tracking-widest border-b border-amber-500/30 pb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Jazz am Patientenbett (Donald Schön)
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Gefunden! Wusstest du, dass Donald Schön (der Erfinder der 'In-Action'-Reflexion) eigentlich studierter Philosoph und Pianist war? Er hat sein Modell zur Praxisreflexion davon abgeleitet, wie Jazz-Musiker beim Spielen live miteinander improvisieren. Echte Pflege-Profis reflektieren im Tun eben wie gute Jazz-Musiker – fundiert, situativ und im Flow.</p>
                </div>
              )}
              {unlockedNotes.includes('ee_johari') && (
                <div className="bg-slate-900 border border-amber-500/50 rounded-lg p-4 animate-in fade-in slide-in-from-left-4">
                  <h4 className="font-bold text-amber-500 text-sm mb-2 uppercase tracking-widest border-b border-amber-500/30 pb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Das Johari-Fenster
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Erwischt! Weißt du eigentlich, woher der exotisch klingende Name 'Johari' stammt? Es ist keine fernöstliche Philosophie, sondern schlicht ein Kofferwort aus den Vornamen der beiden US-Psychologen, die das Modell 1955 erfanden: Joe Luft und Harry Ingham. Wieder was gelernt für den nächsten Kaffee-Plausch!</p>
                </div>
              )}
              {unlockedNotes.includes('ee_hattie') && (
                <div className="bg-slate-900 border border-amber-500/50 rounded-lg p-4 animate-in fade-in slide-in-from-left-4">
                  <h4 className="font-bold text-amber-500 text-sm mb-2 uppercase tracking-widest border-b border-amber-500/30 pb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Hatties Daten-Berg
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Geheimnis entdeckt! Für seine berühmte Studie hat John Hattie über 800 Meta-Analysen mit mehr als 80 Millionen Lernenden ausgewertet. Das Ergebnis? Formatives Feedback ist einer der allerstärksten Motoren für Lernerfolg. Dein Feedback-Wort zur rechten Zeit hat also wissenschaftlich bewiesen mehr Macht als jedes Lehrbuch.</p>
                </div>
              )}
              {unlockedNotes.includes('ee_pendleton') && (
                <div className="bg-slate-900 border border-amber-500/50 rounded-lg p-4 animate-in fade-in slide-in-from-left-4">
                  <h4 className="font-bold text-amber-500 text-sm mb-2 uppercase tracking-widest border-b border-amber-500/30 pb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Pendletons Arzt-Trick
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">Gut gesucht! David Pendleton (Psychologe) entwickelte seine berühmten 4 Feedback-Regeln 1984 speziell für das Konsultationstraining von Ärzten. Der psychologische Kniff, den Lernenden zuerst das eigene Positive benennen zu lassen, um Abwehrhaltungen zu vermeiden, klappte bei Medizinstudenten hervorragend – und ist heute in der Pflege unsere beste Waffe gegen das 'Das weiß ich schon!'-Syndrom.</p>
                </div>
              )}`;

appCode = appCode.replace(oldNotes, newNotes);

// 3. Update the toast condition in handleUnlockNote
appCode = appCode.replace(/else if \(noteId\.startsWith\('easter_egg'\)\) \{/g, `else if (noteId.startsWith('ee_')) {`);

fs.writeFileSync('src/App.tsx', appCode);
console.log('App.tsx updated');
