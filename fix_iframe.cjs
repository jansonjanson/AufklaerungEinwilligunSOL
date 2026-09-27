const fs = require('fs');

let caseCode = fs.readFileSync('src/CaseContent.tsx', 'utf8');

const iframeAddition = `          <button 
            onClick={() => setLargeQr(qrUrl)}
            className="bg-white p-2 rounded shadow-md shrink-0 self-start sm:self-auto hover:scale-105 transition-transform cursor-pointer border-2 border-transparent hover:border-amber-500"
            title="QR Code vergrößern"
          >
            <img src={qrUrl} alt={\`QR Code \${title}\`} className="w-16 h-16" />
          </button>
        </div>
        <div className="w-full h-[500px] bg-slate-900 rounded-lg overflow-hidden border border-slate-600 relative">
          <iframe src={url} frameBorder="0" className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
        </div>
      </div>
    );
  };`;

// Replace the old button block down to the end of renderBoard
const targetBlock = `          <button 
            onClick={() => setLargeQr(qrUrl)}
            className="bg-white p-2 rounded shadow-md shrink-0 self-start sm:self-auto hover:scale-105 transition-transform cursor-pointer border-2 border-transparent hover:border-amber-500"
            title="QR Code vergrößern"
          >
            <img src={qrUrl} alt={\`QR Code \${title}\`} className="w-16 h-16" />
          </button>
        </div>
      </div>
    );
  };`;

if (caseCode.includes(targetBlock)) {
    caseCode = caseCode.replace(targetBlock, iframeAddition);
    fs.writeFileSync('src/CaseContent.tsx', caseCode);
    console.log('CaseContent updated with iframe!');
} else {
    console.log('Could not find target block to replace.');
}
