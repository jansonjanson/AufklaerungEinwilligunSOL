const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        {/* Left Column (Map & Available Cases) */}
        <section className="w-7/12 flex flex-col border-r border-slate-800 bg-slate-900">
          
          {/* Map Area */}
          <div className="h-[60%] relative flex items-center justify-center p-6 border-b border-slate-800">
            <div className="relative w-full h-full max-w-5xl rounded-[2rem] overflow-hidden border border-slate-700 shadow-2xl bg-black">
              <img 
                src="https://raw.githubusercontent.com/jansonjanson/assetsdokufeedbackreflexion/main/Map%20Final.jpg" 
                alt="Klinik Map" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute inset-0 bg-medical/10 mix-blend-overlay pointer-events-none"></div>`;

const replacement = `        {/* Left Column (Map & Available Cases) */}
        <section className="w-7/12 flex flex-col border-r border-slate-800 bg-slate-900 overflow-y-auto">
          
          {/* Map Area */}
          <div className="relative flex items-center justify-center p-6 border-b border-slate-800 shrink-0">
            <div className="relative w-full aspect-[16/11] max-w-5xl rounded-[2rem] overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
              <img 
                src="https://raw.githubusercontent.com/jansonjanson/assetsdokufeedbackreflexion/main/Map%20Final.jpg" 
                alt="Klinik Map" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none"></div>`;

code = code.replace(target, replacement);

const target2 = `          {/* Cases List */}
          <div className="h-[40%] bg-slate-950 p-6 overflow-y-auto">`;

const replacement2 = `          {/* Cases List */}
          <div className="flex-1 bg-slate-950 p-6">`;

code = code.replace(target2, replacement2);
fs.writeFileSync('src/App.tsx', code);
