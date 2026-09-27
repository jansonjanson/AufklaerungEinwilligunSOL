const fs = require('fs');

function optimizeFile(filepath) {
  let code = fs.readFileSync(filepath, 'utf8');
  
  code = code.replace(/<p className="([^"]*text-slate-[34]00[^"]*)"/g, (match, p1) => {
    let classes = p1;
    if (!classes.includes('leading-relaxed') && !classes.includes('leading-tight') && !classes.includes('leading-none')) {
      classes += ' leading-relaxed';
    }
    if (!classes.includes('[text-wrap:pretty]') && !classes.includes('text-pretty')) {
      classes += ' [text-wrap:pretty]';
    }
    return '<p className="' + classes + '"';
  });

  fs.writeFileSync(filepath, code);
  console.log(filepath + ' optimized');
}

optimizeFile('src/CaseContent.tsx');
optimizeFile('src/App.tsx');
