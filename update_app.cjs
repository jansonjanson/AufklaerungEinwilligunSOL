const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// Remove citations
code = code.replace(' [cite: 24, 25]', '');
code = code.replace(' [cite: 24, 25]', '');
// If there are others, we should catch them. Let's just use regex for all citations like [cite: ...]
code = code.replace(/ \[cite: [0-9, ]+\]/g, '');

// Add Passwords to Notizbuch Note 1
const oldNote1 = `<li><a href="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?token=b0cbca55223b034ebf4f4d6038851b70" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-2">PA-Team Board</a></li>
                    <li><a href="https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-2">Azubi-Board</a></li>`;

const newNote1 = `<li><a href="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?token=b0cbca55223b034ebf4f4d6038851b70" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-2">PA-Team Board</a></li>
                    <li><a href="https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-2">Azubi-Board</a></li>
                    <li className="mt-2 text-slate-400 text-xs">Passwort PA-Team Board: <strong className="text-slate-300">PA-Team</strong></li>
                    <li className="text-slate-400 text-xs">Passwort Azubi-Board: <strong className="text-slate-300">Azubi</strong></li>`;

code = code.replace(oldNote1, newNote1);

fs.writeFileSync('src/App.tsx', code);
