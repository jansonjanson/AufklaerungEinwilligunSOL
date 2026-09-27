const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regexRooms = /\{ROOMS\.map\(\(room\) => \{\s*const isLocked = room\.id === 'pdbuero' && !isRoom4Unlocked;\s*return \(\s*<button\s*key=\{room\.id\}\s*onClick=\{\(\) => handleRoomClick\(room\.id\)\}\s*className=\{\`absolute transform -translate-x-1\/2 -translate-y-1\/2 transition-all z-10 \$\{\s*isLocked\s*\? 'opacity-80 grayscale cursor-not-allowed bg-slate-900 border-2 border-slate-700 text-slate-500'\s*: \`hover:scale-110 \$\{activeRoom === room\.id \? 'ring-4 ring-amber-500\/50 scale-110 bg-slate-900' : 'bg-slate-900\/90 hover:bg-slate-900'\} border-2 border-amber-500 text-white shadow-\[0_8px_30px_rgba\(245,158,11,0\.4\)\]\`\s*\}\s*px-3 py-1\.5 sm:px-4 sm:py-2\.5 rounded-xl flex items-center gap-2 backdrop-blur-sm\`\}\s*style=\{\{ top: room\.top, left: room\.left \}\}\s*>\s*\{isLocked && <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" \/>\}\s*<span className="font-black text-xs sm:text-sm whitespace-nowrap drop-shadow-md">\{room\.name\}<\/span>\s*<\/button>\s*\)\s*\}\)\}/;

const replacementRooms = `{ROOMS.map((room) => {
              const isLocked = room.id === 'pdbuero' && !isRoom4Unlocked;
              let isPulsating = false;
              if (tutorialStep > 3 && progress.length === 0 && room.id === 'empfang') {
                isPulsating = true;
              } else if (progress.includes(1) && progress.includes(2) && !progress.includes(3) && room.id === 'zimmer') {
                isPulsating = true;
              }

              return (
                <button 
                  key={room.id}
                  onClick={() => handleRoomClick(room.id)} 
                  className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all z-10 \${
                    isLocked 
                      ? 'opacity-80 grayscale cursor-not-allowed bg-slate-900 border-2 border-slate-700 text-slate-500' 
                      : \`hover:scale-110 \${activeRoom === room.id ? 'ring-4 ring-amber-500/50 scale-110 bg-slate-900' : 'bg-slate-900/90 hover:bg-slate-900'} border-2 \${isPulsating ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)] animate-pulse' : 'border-amber-500 shadow-[0_8px_30px_rgba(245,158,11,0.4)]'} text-white\`
                  } px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 backdrop-blur-sm\`} 
                  style={{ top: room.top, left: room.left }}
                >
                  {isLocked && <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" />}
                  <span className="font-black text-xs sm:text-sm whitespace-nowrap drop-shadow-md">{room.name}</span>
                </button>
              )
            })}`;

code = code.replace(regexRooms, replacementRooms);
fs.writeFileSync('src/App.tsx', code);
