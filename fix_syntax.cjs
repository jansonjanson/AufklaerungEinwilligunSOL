const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Replace the buggy button rendering
code = code.replace(/<button \n\s*onClick=\{\(\) => handleRoomClick\(room\.id\)\} \n\s*className=\{`relative w-full h-full transition-all \$\{[\s\S]*?style=\{\{ top: room\.top, left: room\.left \}\}\n\s*>\n\s*\{isLocked && <LockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" \/>\}\n\s*<span className="font-black text-xs sm:text-sm whitespace-nowrap drop-shadow-md">\{room\.name\}<\/span>\n\s*<\/button>\n\s*\)/, 
`<button 
                  onClick={() => handleRoomClick(room.id)} 
                  className={\`relative w-full h-full transition-all \${
                    isLocked 
                      ? 'opacity-80 grayscale cursor-not-allowed bg-slate-900 border-2 border-slate-700 text-slate-400' 
                      : \`hover:scale-110 \${activeRoom === room.id ? 'ring-4 ring-amber-500/50 scale-110 bg-slate-900' : 'bg-slate-900/90 hover:bg-slate-900'} border-2 \${isPulsating ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]' : 'border-amber-500 shadow-[0_8px_30px_rgba(245,158,11,0.4)]'} text-white\`
                  } px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 backdrop-blur-sm\`} 
                >
                  {isLocked && <LockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />}
                  <span className="font-black text-xs sm:text-sm whitespace-nowrap drop-shadow-md">{room.name}</span>
                </button>
              </div>
              )`);

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx fixed');
