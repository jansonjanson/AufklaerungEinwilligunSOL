const fs = require('fs');

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

const noteContentReplacement = `<>
                  {unlockedNotes.includes('note_1') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 01 & 02: Das Erstgespräch & Digitale Zentrale</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://archive.org/download/azubi-gesprach-1/Azubi-Gespr%C3%A4ch_1.mp4" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline flex items-center gap-2">Video: Azubi-Gespräch 1</a></li>
                        <li><a href="https://github.com/jansonjanson/medienibfpadokufeedback/raw/refs/heads/main/Medien/Erstgespr%C3%A4ch.pdf" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline flex items-center gap-2">PDF: Erstgespräch Formular</a></li>
                        <li className="pt-2"><strong className="text-white">fobizz PA-Team Board:</strong></li>
                        <li><a href="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Link zum Board</a> (Passwort: <span className="text-amber-500 font-mono">Praxisanleitung</span>)</li>
                        <li className="pt-2"><strong className="text-white">fobizz Azubi-Board:</strong></li>
                        <li><a href="https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Link zum Board</a> (Passwort: <span className="text-amber-500 font-mono">Auszubildende</span>)</li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_3') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 03: Fall Lukas</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://archive.org/details/der-emotionale-block-sarah/Die_Kluft__Tun_vs_Lukas.mp4" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-2">Video: Lukas Wundverband</a></li>
                        <li><a href="https://github.com/jansonjanson/medienibfpadokufeedback/raw/refs/heads/main/Medien/Beurteilungsbogen_Lukas_Wundverband.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-2">PDF: Beurteilungsbogen Lukas</a></li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_4') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 04: Fall Marc</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://archive.org/details/der-emotionale-block-sarah/Der_blinde_Fleck_Marc.mp4" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-2">Video: Der blinde Fleck Marc</a></li>
                        <li><a href="https://archive.org/details/das-johari-fenster-1/Das_Johari-Fenster+(1).mp4" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-2">Video: Das Johari-Fenster</a></li>
                        <li><a href="https://archive.org/details/das-johari-fenster-1/Das_Pendleton-Modell.mp4" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-2">Video: Das Pendleton-Modell</a></li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_6') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 06: Fall Sarah</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://archive.org/details/der-emotionale-block-sarah/Der_emotionale_Block_Sarah.mp4" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline flex items-center gap-2">Video: Der emotionale Block Sarah</a></li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_8') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 08: Fall Emma</h4>
                      <ul className="space-y-2 text-sm">
                        <li><a href="https://youtu.be/GTNMMDBW_ws?si=Pen8FmxXKSPVzMip" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-2">Video: Fall Emma (In-Action Beobachtung)</a></li>
                      </ul>
                    </div>
                  )}
                </>`;

// Need to match exactly the first `<>` in Notizbuch and `</>`
// Easiest is to replace the chunk
let indexNotes = appCode.indexOf('id="notes-content"');
if(indexNotes !== -1) {
    let startIndex = appCode.indexOf('<>', indexNotes);
    let endIndex = appCode.indexOf('</>', startIndex) + 3;
    if (startIndex !== -1 && endIndex !== -1) {
        appCode = appCode.substring(0, startIndex) + noteContentReplacement + appCode.substring(endIndex);
        fs.writeFileSync('src/App.tsx', appCode);
        console.log('App.tsx notes updated!');
    }
}
