const fs = require('fs');

function optimizeFile(filepath) {
  let code = fs.readFileSync(filepath, 'utf8');
  
  // Add pretty wrap to text-white paragraphs
  code = code.replace(/<p className="([^"]*text-white[^"]*)"/g, (match, p1) => {
    let classes = p1;
    if (!classes.includes('leading-relaxed') && !classes.includes('leading-tight') && !classes.includes('leading-none')) {
      classes += ' leading-relaxed';
    }
    if (!classes.includes('[text-wrap:pretty]') && !classes.includes('text-pretty')) {
      classes += ' [text-wrap:pretty]';
    }
    return '<p className="' + classes + '"';
  });

  // Add balance wrap to headings
  code = code.replace(/<h([1-6]) className="([^"]*)"/g, (match, tag, p1) => {
    let classes = p1;
    if (!classes.includes('[text-wrap:balance]') && !classes.includes('text-balance')) {
      classes += ' [text-wrap:balance]';
    }
    return '<h' + tag + ' className="' + classes + '"';
  });

  fs.writeFileSync(filepath, code);
  console.log(filepath + ' optimized step 2');
}

optimizeFile('src/CaseContent.tsx');
optimizeFile('src/App.tsx');
