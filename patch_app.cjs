const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const marker1Target = `<button onClick={() => handleRoomClick(1)} className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 \${activeRoom === 1 ? 'ring-4 ring-medical/50 scale-110' : ''} bg-slate-900 border-2 border-medical text-white px-3 py-2 rounded shadow-lg flex items-center gap-2\`} style={{ top: '75%', left: '30%' }}>`;
const marker1Replacement = `<button onClick={() => handleRoomClick(1)} className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 \${activeRoom === 1 ? 'ring-4 ring-amber-500/50 scale-110' : ''} bg-slate-900 border-2 border-amber-500 text-white px-3 py-2 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] flex items-center gap-2\`} style={{ top: '75%', left: '30%' }}>`;
code = code.replace(marker1Target, marker1Replacement);

const marker2Target = `<button onClick={() => handleRoomClick(2)} className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 \${activeRoom === 2 ? 'ring-4 ring-medical/50 scale-110' : ''} bg-slate-900 border-2 border-medical text-white px-3 py-2 rounded shadow-lg flex items-center gap-2\`} style={{ top: '25%', left: '30%' }}>`;
const marker2Replacement = `<button onClick={() => handleRoomClick(2)} className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 \${activeRoom === 2 ? 'ring-4 ring-amber-500/50 scale-110' : ''} bg-slate-900 border-2 border-amber-500 text-white px-3 py-2 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] flex items-center gap-2\`} style={{ top: '25%', left: '30%' }}>`;
code = code.replace(marker2Target, marker2Replacement);

const marker3Target = `<button onClick={() => handleRoomClick(3)} className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 \${activeRoom === 3 ? 'ring-4 ring-medical/50 scale-110' : ''} bg-slate-900 border-2 border-medical text-white px-3 py-2 rounded shadow-lg flex items-center gap-2\`} style={{ top: '25%', left: '75%' }}>`;
const marker3Replacement = `<button onClick={() => handleRoomClick(3)} className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 z-10 \${activeRoom === 3 ? 'ring-4 ring-amber-500/50 scale-110' : ''} bg-slate-900 border-2 border-amber-500 text-white px-3 py-2 rounded-xl shadow-[0_4px_20px_rgba(245,158,11,0.3)] flex items-center gap-2\`} style={{ top: '25%', left: '75%' }}>`;
code = code.replace(marker3Target, marker3Replacement);

const marker4Target = `<button onClick={() => handleRoomClick(4)} className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all \${isRoom4Unlocked ? 'hover:scale-110 z-10 bg-slate-900 border-2 border-medical text-white shadow-lg' : 'opacity-70 grayscale cursor-not-allowed bg-slate-900 border-2 border-slate-600 text-slate-400'} px-3 py-2 rounded flex items-center gap-2 \${activeRoom === 4 ? 'ring-4 ring-medical/50 scale-110' : ''}\`} style={{ top: '75%', left: '75%' }}>`;
const marker4Replacement = `<button onClick={() => handleRoomClick(4)} className={\`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all \${isRoom4Unlocked ? 'hover:scale-110 z-10 bg-slate-900 border-2 border-amber-500 text-white shadow-[0_4px_20px_rgba(245,158,11,0.3)]' : 'opacity-70 grayscale cursor-not-allowed bg-slate-900 border-2 border-slate-600 text-slate-400'} px-3 py-2 rounded-xl flex items-center gap-2 \${activeRoom === 4 ? 'ring-4 ring-amber-500/50 scale-110' : ''}\`} style={{ top: '75%', left: '75%' }}>`;
code = code.replace(marker4Target, marker4Replacement);

fs.writeFileSync('src/App.tsx', code);
