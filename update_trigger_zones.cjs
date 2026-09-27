const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Replace Map Icons (Trigger zones)
const oldMapIcons = `            {/* Easter Eggs */}
            {!unlockedNotes.includes('ee_schoen') && (
              <button onClick={() => handleUnlockNote('ee_schoen')} className="absolute top-[75%] left-[12%] w-24 h-24 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Telefon)"></button>
            )}
            {!unlockedNotes.includes('ee_johari') && (
              <button onClick={() => handleUnlockNote('ee_johari')} className="absolute top-[10%] left-[80%] w-24 h-24 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Fenster)"></button>
            )}
            {!unlockedNotes.includes('ee_hattie') && (
              <button onClick={() => handleUnlockNote('ee_hattie')} className="absolute top-[12%] left-[18%] w-20 h-28 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Anatomie Poster)"></button>
            )}
            {!unlockedNotes.includes('ee_pendleton') && (
              <button onClick={() => handleUnlockNote('ee_pendleton')} className="absolute top-[65%] left-[90%] w-24 h-20 rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/10 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Diagramm)"></button>
            )}`;

const newMapIcons = `            {/* Easter Eggs */}
            {!unlockedNotes.includes('ee_schoen') && (
              <button onClick={() => handleUnlockNote('ee_schoen')} className="absolute top-[41%] left-[23%] w-[8%] h-[13%] rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/20 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Telefon)"></button>
            )}
            {!unlockedNotes.includes('ee_johari') && (
              <button onClick={() => handleUnlockNote('ee_johari')} className="absolute top-[2%] left-[83%] w-[10%] h-[10%] rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/20 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Fenster)"></button>
            )}
            {!unlockedNotes.includes('ee_hattie') && (
              <button onClick={() => handleUnlockNote('ee_hattie')} className="absolute top-[2.5%] left-[35.5%] w-[7%] h-[8%] rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/20 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Arbeitsbüro)"></button>
            )}
            {!unlockedNotes.includes('ee_pendleton') && (
              <button onClick={() => handleUnlockNote('ee_pendleton')} className="absolute top-[36%] left-[76.5%] w-[7%] h-[13%] rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/20 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center" title="Untersuchen (Pflegebarn Poster)"></button>
            )}`;

appCode = appCode.replace(oldMapIcons, newMapIcons);

// 2. Fix Emma Video Link
appCode = appCode.replace(
  /"https:\/\/archive\.org\/embed\/das-johari-fenster-1\/KOPA_Emma\.mp4"/g,
  '"https://youtu.be/GTNMMDBW_ws?si=FCp8XDN3ZqeTTaFE"'
);

fs.writeFileSync('src/App.tsx', appCode);
console.log('App.tsx updated');
