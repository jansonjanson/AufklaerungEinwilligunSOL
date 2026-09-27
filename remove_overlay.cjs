const fs = require('fs');

let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// Replace the absolute overlay div
const overlayRegex = /<div className="absolute inset-0 bg-slate-900\/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none">[\s\S]*?Tipp: Vergrößern für Vollbild[\s\S]*?<\/div>/g;

code = code.replace(overlayRegex, '');

// Optionally remove the ' group' class from the wrapper
code = code.replace(/bg-white border border-slate-700 group/g, 'bg-white border border-slate-700');

fs.writeFileSync('src/CaseContent.tsx', code);
console.log('Overlay removed.');
