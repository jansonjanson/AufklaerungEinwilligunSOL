import React, { useState, useEffect } from 'react';
import { Trophy, Lock as LockIcon, CheckCircle2, ChevronLeft, NotebookPen, Lightbulb, Map as MapIcon, Info, ArrowDown, FolderOpen, Award, RotateCcw, X, Book, Shield, Scale, FileText, Printer, Download, BookOpen, Bot, ExternalLink, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import CaseViewer, { CASES } from './CaseContent';

const ROOMS = [
  { id: 'empfang', name: '01 Empfang', top: '75%', left: '30%' },
  { id: 'zimmer', name: '02 Bewohnerzimmer', top: '25%', left: '75%' },
  { id: 'buero', name: '03 Büro', top: '25%', left: '30%' },
  { id: 'pdbuero', name: '04 PD Büro', top: '75%', left: '75%' }
];

export default function App() {
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [activeCase, setActiveCase] = useState<number | null>(null);
  const [progress, setProgress] = useState<number[]>([]);
  
  const rightPaneRef = React.useRef<HTMLDivElement>(null);
  
  const [showNotes, setShowNotes] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  
  const [tutorialStep, setTutorialStep] = useState(0);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handlePrintModal = (titleId: string, contentId: string) => {
    const content = document.getElementById(contentId);
    const title = document.getElementById(titleId);
    if (!content || !title) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${title.innerText}</title>
          <style>
            body { font-family: sans-serif; padding: 20px; line-height: 1.6; color: #111; max-width: 800px; margin: 0 auto; }
            h2 { color: #000; border-bottom: 2px solid #000; padding-bottom: 10px; }
            h4 { color: #222; margin-top: 30px; font-size: 18px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            p { margin-top: 10px; margin-bottom: 10px; }
            ul, ol { margin-top: 10px; margin-bottom: 15px; padding-left: 20px; }
            li { margin-bottom: 5px; }
            img { max-height: 200px; margin-top: 10px; border: 1px solid #ddd; border-radius: 8px; }
            strong { font-weight: bold; }
            .bg-slate-850, .bg-black\\/50, .bg-slate-900 { 
              background: #f9f9f9 !important; 
              padding: 20px; 
              margin-bottom: 20px; 
              border: 1px solid #ccc; 
              border-left: 5px solid #666; 
              border-radius: 8px; 
            }
            .text-white { color: #000 !important; }
            .text-slate-300, .text-slate-200 { color: #333 !important; }
            .text-blue-400, .text-purple-400, .text-rose-400, .text-emerald-400, .text-sky-400, .text-amber-400, .text-amber-500 { color: #000 !important; font-weight: bold; }
            a { color: #0056b3; text-decoration: none; }
            .hidden-print, button { display: none !important; }
          </style>
        </head>
        <body>
          <h2>${title.innerText}</h2>
          ${content.innerHTML}
          <script>
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const [adminPassword, setAdminPassword] = useState('');

  // States for progression and highlights
  const [unlockedMethods, setUnlockedMethods] = useState<string[]>([]);
  const [unlockedNotes, setUnlockedNotes] = useState<string[]>([]);
  const [achievementToast, setAchievementToast] = useState<{title: string, subtitle: string} | null>(null);
  const [showFinalModal, setShowFinalModal] = useState(false);


  useEffect(() => {
    if (achievementToast) {
      const timer = setTimeout(() => setAchievementToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [achievementToast]);

  useEffect(() => {
    if (showFinalModal) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
  }, [showFinalModal]);

  const [highlightBack, setHighlightBack] = useState(false);
  const [highlightMethodTutorial, setHighlightMethodTutorial] = useState(false);
  const [canCompleteCase, setCanCompleteCase] = useState(true);
  const [backTutorialSeen, setBackTutorialSeen] = useState(false);

  // Save Slots State
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [saveSlots, setSaveSlots] = useState<Record<string, { date: string, progress: number[], methods: string[], notes: string[] }>>({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('praxis-save-prog-v3');
    const savedMethods = localStorage.getItem('praxis-save-meth-v3');
    const savedNotes = localStorage.getItem('praxis-save-notes-v3');
    const savedSlots = localStorage.getItem('praxis-save-slots-v3');
    const bTutorialSeen = localStorage.getItem('praxis-tutorial-back-v3');

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedMethods) setUnlockedMethods(JSON.parse(savedMethods));
    if (savedNotes) setUnlockedNotes(JSON.parse(savedNotes));
    if (savedSlots) setSaveSlots(JSON.parse(savedSlots));
    if (bTutorialSeen) setBackTutorialSeen(true);
    
    const adminSaved = localStorage.getItem('praxis-admin-v3');
    if (adminSaved === 'true') {
      setIsAdmin(true);
    }
    
    const tutorialSeen = localStorage.getItem('tutorial-seen-v3');
    if (!tutorialSeen) {
      setTutorialStep(1);
    }
  }, []);

  const saveToLocalStorage = (newProg: number[], newMeth: string[], newNotes: string[]) => {
    localStorage.setItem('praxis-save-prog-v3', JSON.stringify(newProg));
    localStorage.setItem('praxis-save-meth-v3', JSON.stringify(newMeth));
    localStorage.setItem('praxis-save-notes-v3', JSON.stringify(newNotes));
  };

  const showAchievement = (title: string, subtitle: string) => {
    setAchievementToast({ title, subtitle });
    setTimeout(() => {
      setAchievementToast(null);
    }, 4000);
  };

  const nextTutorialStep = () => {
    if (tutorialStep >= 6) {
      setTutorialStep(0);
      localStorage.setItem('tutorial-seen-v3', 'true');
    } else {
      setTutorialStep(s => s + 1);
    }
  };

  const handleSaveToSlot = (slotId: string) => {
    const newSlots = {
      ...saveSlots,
      [slotId]: {
        date: new Date().toLocaleString('de-DE'),
        progress,
        methods: unlockedMethods,
        notes: unlockedNotes
      }
    };
    setSaveSlots(newSlots);
    localStorage.setItem('praxis-save-slots-v3', JSON.stringify(newSlots));
  };

  const handleLoadFromSlot = (slotId: string) => {
    const slot = saveSlots[slotId];
    if (slot) {
      setProgress(slot.progress);
      setUnlockedMethods(slot.methods);
      setUnlockedNotes(slot.notes);
      saveToLocalStorage(slot.progress, slot.methods, slot.notes);
      setShowSaveModal(false);
      setActiveRoom(null);
      setActiveCase(null);
      showAchievement('Spielstand geladen', 'Dein Fortschritt wurde erfolgreich wiederhergestellt.');
    }
  };

  const performResetGame = () => {
    localStorage.removeItem('praxis-save-prog-v3');
    localStorage.removeItem('praxis-save-meth-v3');
    localStorage.removeItem('praxis-save-notes-v3');
    localStorage.removeItem('praxis-admin-v3');
    localStorage.removeItem('tutorial-seen-v3');
    setProgress([]);
    setUnlockedMethods([]);
    setUnlockedNotes(['start']);
    setActiveRoom(null);
    setActiveCase(null);
    setIsAdmin(false);
    setShowResetConfirm(false);
    setTutorialStep(1);
    showAchievement('Reset erfolgreich', 'Alle Fortschritte wurden zurückgesetzt.');
  };

  const handleUnlockNote = (noteId: string) => {
    setUnlockedNotes(prev => {
      if (!prev.includes(noteId)) {
        const newNotes = [...prev, noteId];
        if (noteId === 'badge_expert_5') {
          setAchievementToast({ title: '🏆 Jura-Ass (Akte 05)', subtitle: 'Hervorragend! Paragrafen-Quiz fehlerfrei gemeistert.' });
        } else if (noteId === 'badge_expert_7') {
          setAchievementToast({ title: '🏆 Ethik-Experte (Akte 07)', subtitle: 'Respekt! Algorithmus zur mutmaßlichen Einwilligung perfekt durchschaut.' });
        } else if (noteId === 'easter_egg_bgb') {
          setAchievementToast({ title: '📖 BGB gefunden!', subtitle: '„Wer schreibt, der bleibt.“ Dokumentation ist dein juristischer Schutz.' });
        } else if (noteId === 'easter_egg_shield') {
          setAchievementToast({ title: '🛡️ Schutzschild gefunden!', subtitle: 'Dein Schutzschild ist das mutige „Nein“ zur unzulässigen Delegation.' });
        } else if (noteId.startsWith('badge_')) {
          setAchievementToast({ title: 'Badge freigeschaltet!', subtitle: 'Neuer Eintrag im Notizbuch.' });
        } else if (noteId.startsWith('easter_egg_') || noteId.startsWith('ee_')) {
          setAchievementToast({ title: 'Geheimnis gefunden!', subtitle: 'Neuer Eintrag im Notizbuch.' });
        }
        return newNotes;
      }
      return prev;
    });
  };

  const handleOpenCase = (id: number) => {
    setActiveCase(id);
    
    let newMeth = [...unlockedMethods];
    let newNotes = [...unlockedNotes];
    let unlockedSomething = false;

    if ((id === 1 || id === 2) && !newNotes.includes('note_1')) {
      newNotes.push('note_1');
      if (!newNotes.includes('start')) newNotes.push('start');
      showAchievement('Neuer Eintrag im Notizbuch!', 'Fobizz Links freigeschaltet.');
    }
    if (id === 3 && !newNotes.includes('note_3')) {
      newNotes.push('note_3');
      unlockedSomething = true;
    }
    if (id === 4 && !newNotes.includes('note_4')) {
      newNotes.push('note_4');
      unlockedSomething = true;
    }
    if (id === 6 && !newNotes.includes('note_6')) {
      newNotes.push('note_6');
      unlockedSomething = true;
    }
    if (id === 8 && !newNotes.includes('note_8')) {
      newNotes.push('note_8');
      unlockedSomething = true;
    }

    if (id === 3 && !newMeth.includes('aufklaerung')) {
      newMeth.push('aufklaerung');
      unlockedSomething = true;
      showAchievement('Methodenkoffer erweitert!', 'Ärztliche vs. Pflegerische Aufklärung freigeschaltet.');
    }
    if (id === 4 && !newMeth.includes('consent')) {
      newMeth.push('consent');
      unlockedSomething = true;
      showAchievement('Methodenkoffer erweitert!', 'Die 4 Säulen der wirksamen Einwilligung freigeschaltet.');
    }
    if (id === 6 && !newMeth.includes('eskalation')) {
      newMeth.push('eskalation');
      unlockedSomething = true;
      showAchievement('Methodenkoffer erweitert!', 'Der Stufenprozess der mutmaßlichen Einwilligung freigeschaltet.');
    }
    if (id === 7 && !newMeth.includes('create')) {
      newMeth.push('create');
      unlockedSomething = true;
      showAchievement('Methodenkoffer erweitert!', 'CREATE-Framework für KI-Prompts freigeschaltet.');
    }
    if (id === 8 && (!newMeth.includes('recht_doku') || !newMeth.includes('synergien'))) {
      if (!newMeth.includes('recht_doku')) newMeth.push('recht_doku');
      if (!newMeth.includes('synergien')) newMeth.push('synergien');
      unlockedSomething = true;
      showAchievement('Methodenkoffer erweitert!', 'Rechtssichere Dokumentation & Systemische Synergien freigeschaltet.');
    }

    if (newMeth.length > unlockedMethods.length || newNotes.length > unlockedNotes.length) {
      setUnlockedMethods(newMeth);
      setUnlockedNotes(newNotes);
      saveToLocalStorage(progress, newMeth, newNotes);
    }

    if (unlockedSomething && unlockedMethods.length === 0) {
      setHighlightMethodTutorial(true);
    }
  };

  const markCaseComplete = (id: number) => {
    if (!progress.includes(id)) {
      const newProgress = [...progress, id];
      setProgress(newProgress);
      saveToLocalStorage(newProgress, unlockedMethods, unlockedNotes);

      if (newProgress.length === 8) {
        setTimeout(() => {
          showAchievement('🎉 Herzlichen Glückwunsch!', 'Du hast alle Akten und Herausforderungen erfolgreich gemeistert. Das Abenteuer ist abgeschlossen!');
          setShowFinalModal(true);
        }, 1500);
      }

      // Trigger highlight back button
      setHighlightBack(true);
      setTimeout(() => setHighlightBack(false), 5000);
      
      if (rightPaneRef.current) {
        rightPaneRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }

      if (!backTutorialSeen) {
        setBackTutorialSeen(true);
        localStorage.setItem('praxis-tutorial-back-v3', 'true');
      }
    }
  };

  const isRoom3Unlocked = isAdmin || [1, 2, 3, 4, 5].every(id => progress.includes(id));
  const isRoom4Unlocked = isAdmin || [1, 2, 3, 4, 5, 6, 7].every(id => progress.includes(id));

  const handleRoomClick = (roomId: string) => {
    if (roomId === 'pdbuero' && !isRoom4Unlocked) {
      alert('Dieser Raum ist noch verschlossen. Schließe zuerst alle vorherigen Akten ab.');
      return;
    }
    if (roomId === 'buero' && !isRoom3Unlocked) {
      alert('Dieser Raum ist noch verschlossen. Schließe zuerst alle vorherigen Akten (Raum 1 & 2) komplett ab.');
      return;
    }
    setActiveRoom(roomId);
    setActiveCase(null);
  };

  const roomCases = activeRoom ? CASES.filter(c => c.roomId === activeRoom) : [];
  const allCasesInRoomDone = roomCases.length > 0 && roomCases.every(c => progress.includes(c.id));

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'Janson') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminPassword('');
      const allProg = [1, 2, 3, 4, 5, 6, 7, 8];
      const allMeth = ['aufklaerung', 'consent', 'eskalation', 'create', 'synergien', 'recht_doku'];
      const allNotes = ['start', 'note_1', 'note_3', 'note_4', 'note_6', 'note_8', 'easter_egg_bgb', 'easter_egg_shield', 'badge_expert_5', 'badge_expert_7'];
      setProgress(allProg);
      setUnlockedMethods(allMeth);
      setUnlockedNotes(allNotes);
      saveToLocalStorage(allProg, allMeth, allNotes);
      localStorage.setItem('praxis-admin-v3', 'true');
      alert('Admin-Modus aktiviert. Alle Räume und Inhalte sind nun freigeschaltet.');
    } else {
      alert('Falsches Passwort!');
    }
  };

  const getTutorialBoxClasses = () => {
    const base = "fixed bg-slate-900 border-2 border-amber-500 p-6 rounded-2xl max-w-md w-[90%] text-center shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-in fade-in duration-300 z-[100] pointer-events-auto";
    switch(tutorialStep) {
      case 2: return `${base} bottom-10 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:right-10 left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-auto`;
      case 3: return `${base} bottom-10 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-10 left-1/2 -translate-x-1/2 lg:translate-x-0`;
      case 4: return `${base} top-24 left-1/2 -translate-x-1/2`;
      case 5: return `${base} bottom-24 left-1/2 -translate-x-1/2`;
      case 6: return `${base} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;
      default: return `${base} top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-slate-200 font-sans relative">
      
      {/* Header */}
      <header className={`h-16 shrink-0 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 shadow-lg transition-all duration-300 ${tutorialStep === 4 || highlightMethodTutorial ? 'relative z-50 pointer-events-none' : 'relative z-20'}`}>
        <div className="flex-1 min-w-0 pr-4">
          <h1 className="text-sm md:text-lg font-bold tracking-widest text-amber-500 uppercase leading-tight line-clamp-2 [text-wrap:balance]">Praxisanleitung: Aufklärung, Einwilligung & Patientenrechte</h1>
          <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest mt-1 block">J. Rosenow M. A.</span>
        </div>
        
        <div className="flex gap-2 items-center shrink-0">
          {progress.length === 8 && (
            <button 
              onClick={() => setShowFinalModal(true)} 
              className="p-2 bg-amber-500/10 border border-amber-500/50 hover:bg-amber-500/20 text-amber-500 rounded-lg transition-all duration-300 hidden sm:flex items-center justify-center mr-2 animate-pulse" 
              title="Abschluss-Abzeichen ansehen">
              <Trophy className="w-5 h-5" />
            </button>
          )}
          <div className="hidden lg:flex flex-col text-right mr-4">
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest">Fortschritt</span>
            <span className="text-sm font-black font-mono text-amber-500">{progress.length}/8 Akten bearbeitet</span>
          </div>
          
          <div className={`flex gap-2 items-center transition-all duration-300 ${tutorialStep === 4 || highlightMethodTutorial ? 'bg-slate-900 p-2 rounded-xl ring-4 ring-amber-500/50 shadow-2xl relative z-50' : ''}`}>
            <a 
              href="https://notebook.google.com/notebook/36294d79-a601-4870-a351-53ab8c954ac3" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-2 bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white rounded-lg transition-all flex items-center gap-1.5 font-bold text-xs sm:text-sm shadow-sm"
              title="Digitalen KI-Helfer in Google NotebookLM öffnen"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="hidden sm:inline">KI-Helfer</span>
            </a>
            
            <button 
              onClick={() => { setShowMethods(true); setHighlightMethodTutorial(false); }} 
              className={`px-3 py-2 sm:px-4 bg-slate-800 border rounded-lg transition-all flex items-center gap-2 font-bold text-xs sm:text-sm ${highlightMethodTutorial ? 'border-amber-500 text-amber-500 animate-pulse ring-2 ring-amber-500/50' : 'border-slate-700 hover:bg-slate-700 hover:text-amber-500 text-slate-300'}`}
            >
              <Lightbulb className={`w-4 h-4 ${highlightMethodTutorial ? 'text-amber-500' : ''}`} /> 
              <span className="hidden sm:inline">Methodenkoffer</span>
              {unlockedMethods.length > 0 && <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">{unlockedMethods.length}</span>}
            </button>
            
            <button onClick={() => setShowNotes(true)} className="px-3 py-2 sm:px-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
              <NotebookPen className="w-4 h-4" /> <span className="hidden sm:inline">Notizbuch</span>
              {unlockedNotes.length > 1 && <span className="bg-slate-900 text-amber-500 text-[10px] px-1.5 py-0.5 rounded-full ml-1 font-bold">{unlockedNotes.length - 1}</span>}
            </button>
          </div>

          <button onClick={() => setTutorialStep(1)} className={`p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-300 ml-1 sm:ml-2 ${tutorialStep === 6 ? 'relative z-[70] ring-4 ring-amber-500/50 bg-slate-700 text-amber-500 shadow-2xl' : ''}`} title="Tutorial neu starten">
            <Info className="w-5 h-5 text-blue-400" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* LEFT PANE: MAP */}
        <div className={`w-full lg:w-3/5 h-1/2 lg:h-full bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex items-center justify-center p-4 sm:p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 transition-all duration-300 ${tutorialStep === 2 ? 'relative z-50 pointer-events-none' : 'relative z-10'}`}>
          <div className={`relative w-full aspect-[16/11] max-w-6xl shadow-2xl rounded-2xl overflow-hidden border-2 transition-all duration-300 ${tutorialStep === 2 ? 'border-amber-500 ring-4 ring-amber-500/50 scale-[1.02] bg-slate-900' : 'border-slate-800 bg-slate-900'}`}>
            <img 
              src="https://github.com/jansonjanson/AufklaerungEinwilligunSOL/blob/main/Map.jpg?raw=true" 
              alt="Stationsplan" 
              className="absolute inset-0 w-full h-full object-cover" 
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedRaw) {
                  target.dataset.triedRaw = 'true';
                  target.src = 'https://raw.githubusercontent.com/jansonjanson/AufklaerungEinwilligunSOL/main/Map.jpg';
                } else if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = 'https://raw.githubusercontent.com/jansonjanson/assetsdokufeedbackreflexion/main/Map%20Final.jpg';
                }
              }}
            />
            
            
            {/* Easter Eggs */}
            {!unlockedNotes.includes('easter_egg_bgb') && (
              <button 
                onClick={() => handleUnlockNote('easter_egg_bgb')} 
                className="absolute top-[41%] left-[23%] w-[8%] h-[13%] rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/20 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center group" 
                title="BGB (Bürgerliches Gesetzbuch) untersuchen"
              >
                <Book className="w-5 h-5 text-amber-400 opacity-90 group-hover:scale-125 transition-transform" />
              </button>
            )}
            {!unlockedNotes.includes('easter_egg_shield') && (
              <button 
                onClick={() => handleUnlockNote('easter_egg_shield')} 
                className="absolute top-[2%] left-[83%] w-[10%] h-[10%] rounded-lg border-2 border-dashed border-amber-500/50 bg-amber-500/20 opacity-0 hover:opacity-100 transition-opacity z-10 cursor-pointer flex items-center justify-center group" 
                title="Schutzschild der Pflege untersuchen"
              >
                <Shield className="w-5 h-5 text-amber-400 opacity-90 group-hover:scale-125 transition-transform" />
              </button>
            )}
            
            {ROOMS.map((room) => {
              const isLocked = (room.id === 'pdbuero' && !isRoom4Unlocked) || (room.id === 'buero' && !isRoom3Unlocked);
              let isPulsating = false;
              if (tutorialStep > 3 && progress.length === 0 && room.id === 'empfang') {
                isPulsating = true;
              } else if (progress.includes(1) && progress.includes(2) && !progress.includes(3) && room.id === 'zimmer') {
                isPulsating = true;
              } else if ([1, 2, 3, 4, 5].every(id => progress.includes(id)) && !progress.includes(6) && room.id === 'buero') {
                isPulsating = true;
              } else if ([1, 2, 3, 4, 5, 6, 7].every(id => progress.includes(id)) && !progress.includes(8) && room.id === 'pdbuero') {
                isPulsating = true;
              }

              return (
                <div className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10" style={{ top: room.top, left: room.left }} key={room.id}>
                {isPulsating && (
                  <>
                    <div className="absolute inset-0 rounded-xl bg-amber-500 animate-ping opacity-75"></div>
                    <div className="absolute inset-[-10px] rounded-xl border border-amber-500 animate-pulse opacity-50"></div>
                  </>
                )}
                <button 
                  onClick={() => handleRoomClick(room.id)} 
                  className={`relative w-full h-full transition-all ${
                    isLocked 
                      ? 'opacity-80 grayscale cursor-not-allowed bg-slate-900 border-2 border-slate-700 text-slate-400' 
                      : `hover:scale-110 ${activeRoom === room.id ? 'ring-4 ring-amber-500/50 scale-110 bg-slate-900' : 'bg-slate-900/90 hover:bg-slate-900'} border-2 ${isPulsating ? 'border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]' : 'border-amber-500 shadow-[0_8px_30px_rgba(245,158,11,0.4)]'} text-white`
                  } px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2 backdrop-blur-sm`} 
                >
                  {isLocked && <LockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />}
                  <span className="font-black text-xs sm:text-sm whitespace-nowrap drop-shadow-md">{room.name}</span>
                </button>
              </div>
              )
            })}
          </div>
        </div>
        
        {/* RIGHT PANE: CASE FILE */}
        <div ref={rightPaneRef} className={`w-full lg:w-2/5 h-1/2 lg:h-full overflow-hidden bg-slate-900 flex flex-col transition-all duration-300 ${tutorialStep === 3 ? 'relative z-50 pointer-events-none ring-4 ring-amber-500/50 bg-slate-800 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]' : 'relative z-10'}`}>
          
          {!activeRoom && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center opacity-60">
              <MapIcon className="w-16 h-16 sm:w-24 sm:h-24 text-slate-700 mb-6" />
              <h3 className="text-lg sm:text-xl font-black text-slate-300 uppercase tracking-widest mb-2 [text-wrap:balance]">Kein Raum ausgewählt</h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed [text-wrap:pretty]">Klicke auf einen der gelben Marker auf dem Stationsplan, um zu starten.</p>
            </div>
          )}

          {activeRoom && !activeCase && (
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-xs sm:text-sm font-black tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2 [text-wrap:balance]">
                Verfügbare Akten in <span className="text-amber-500">{ROOMS.find(r => r.id === activeRoom)?.name}</span>
              </h2>
              
              <div className="flex flex-col relative">
                {roomCases.map((c, index) => {
                  const isDone = progress.includes(c.id);
                  const isNext = !isDone && (index === 0 || progress.includes(roomCases[index - 1].id));

                  return (
                    <React.Fragment key={c.id}>
                      <button 
                        onClick={() => handleOpenCase(c.id)}
                        className={`text-left p-4 sm:p-5 rounded-xl border-2 transition-all relative overflow-hidden group 
                          ${isDone 
                            ? 'bg-slate-900 border-slate-700 hover:opacity-100' 
                            : 'bg-slate-800 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)] hover:-translate-y-0.5 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] z-10' 
                          }`}
                      >
                        <div className={`absolute left-0 top-0 bottom-0 w-2 transition-colors ${isDone ? 'bg-slate-700' : 'bg-amber-500'}`}></div>
                        <div className="flex items-start justify-between pl-3">
                          <div>
                            <span className={`text-[10px] font-black tracking-widest uppercase mb-1 block ${isDone ? 'text-slate-400' : 'text-amber-500'}`}>{c.tag}</span>
                            <h4 className={`font-bold text-base sm:text-lg leading-tight mb-1 ${isDone ? 'text-slate-400' : 'text-white'}`}>{c.title}</h4>
                            <span className={`text-xs sm:text-sm ${isDone ? 'text-slate-600' : 'text-slate-300'}`}>{c.subtitle}</span>
                          </div>
                          {isDone && (
  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 rotate-[-15deg] pointer-events-none z-20 animate-in zoom-in spin-in-12 duration-500 origin-center">
    <div className="border-2 sm:border-4 border-emerald-500/80 text-emerald-500/80 text-[10px] sm:text-lg font-black uppercase tracking-widest px-2 sm:px-4 py-0.5 sm:py-1 rounded shadow-lg backdrop-blur-sm bg-slate-900/40">
      GESCHLOSSEN
    </div>
  </div>
)}
                        </div>
                      </button>
                      
                      {/* Visual flow arrow between cases */}
                      {index < roomCases.length - 1 && (
                        <div className="flex justify-center my-2 opacity-50">
                          <ArrowDown className={`w-5 h-5 ${isDone ? 'text-emerald-500/50' : 'text-amber-500/50'}`} />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
                {roomCases.length === 0 && (
                  <div className="text-slate-400 italic p-4 text-center border border-dashed border-slate-700 rounded-xl text-sm">Keine Akten in diesem Raum gefunden.</div>
                )}
              </div>

              {allCasesInRoomDone && (
                <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 sm:p-5 rounded-xl mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-in fade-in">
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-emerald-400 font-bold mb-1 [text-wrap:balance]">Alle Akten in diesem Raum sind erledigt!</h4>
                      <p className="text-emerald-100/70 text-sm">Du hast alle Lernsituationen hier abgeschlossen.</p>
                    </div>
                  </div>
                  {activeRoom === 'empfang' && (
                    <button onClick={() => setActiveRoom('zimmer')} className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all shrink-0">
                      Weiter zum Bewohnerzimmer <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                  {activeRoom === 'zimmer' && isRoom3Unlocked && (
                    <button onClick={() => setActiveRoom('buero')} className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all shrink-0">
                      Weiter zum Büro <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                  {activeRoom === 'buero' && isRoom4Unlocked && (
                    <button onClick={() => setActiveRoom('pdbuero')} className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all shrink-0">
                      Weiter zum PD Büro <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {activeRoom && activeCase && (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className={`sticky top-0 z-10 bg-slate-900/95 backdrop-blur-md border-b p-4 shrink-0 shadow-sm flex items-center justify-start transition-all duration-300 ${highlightBack ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-slate-800'}`}>
                <button 
                  onClick={() => setActiveCase(null)} 
                  className={`flex items-center gap-2 font-black text-sm transition-all uppercase tracking-widest px-4 py-2 rounded-lg border shadow-lg ${
                    highlightBack 
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 border-amber-400 animate-pulse' 
                      : 'text-amber-500 hover:text-amber-400 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" /> Zurück zur Raumübersicht
                </button>
                
                {/* Back Button Tutorial Popover */}
                {highlightBack && progress.length === 1 && (
                  <div className="absolute top-16 left-4 bg-slate-900 border-2 border-amber-500 p-4 rounded-xl shadow-xl z-20 animate-in fade-in slide-in-from-top-2 max-w-xs">
                    <p className="text-amber-500 font-bold text-sm mb-1">Gut gemacht!</p>
                    <p className="text-slate-300 text-xs leading-relaxed [text-wrap:pretty]">Akte abgeschlossen. Klicke hier, um in die Raumübersicht zurückzukehren. Hast du alle Akten hier bearbeitet, kannst du in den nächsten Raum gehen.</p>
                    <div className="absolute -top-2 left-8 w-4 h-4 bg-slate-900 border-t-2 border-l-2 border-amber-500 transform rotate-45"></div>
                  </div>
                )}
              </div>
              
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto relative scroll-smooth">
                <CaseViewer caseId={activeCase} onCanComplete={setCanCompleteCase} onUnlockNote={handleUnlockNote} />
              </div>

              <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] z-20">
                {progress.includes(activeCase) ? (
                  <div className="space-y-3">
                    <button disabled className="w-full font-black text-base sm:text-lg py-3 sm:py-4 rounded-xl flex items-center justify-center gap-3 bg-slate-800 text-slate-400 border border-slate-700 cursor-default">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> Akte erledigt ✓
                    </button>
                    <button onClick={() => setActiveCase(null)} className="w-full font-black text-sm py-3 rounded-xl flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all uppercase tracking-widest">
                      <ChevronLeft className="w-5 h-5" /> Zurück zur Raumübersicht
                    </button>
                  </div>
                ) : (
                  <button disabled={!canCompleteCase} onClick={() => markCaseComplete(activeCase)} className={`w-full font-black text-base sm:text-lg py-3 sm:py-4 rounded-xl flex items-center justify-center gap-3 transition-all ${canCompleteCase ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]' : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-80'}`}>
                    Akte abschließen <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Global Footer */}
      <div className={`h-16 shrink-0 bg-slate-950 border-t border-slate-900 flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${tutorialStep === 5 ? 'relative z-50 pointer-events-none' : 'relative z-20'}`}>
        <div className="flex items-center gap-2">
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-600 hidden sm:block">Asset: Praxisanleitung</div>
          <button onClick={() => setShowAdminModal(true)} className="text-slate-700 hover:text-amber-500 transition-colors p-1" title="Admin-Bereich">
            <LockIcon className="w-3 h-3" />
          </button>
        </div>
        
        <div className={`flex gap-3 transition-all duration-300 ml-auto mr-24 sm:mr-32 md:mr-36 ${tutorialStep === 5 ? 'bg-slate-900 p-3 rounded-xl ring-4 ring-amber-500/50 shadow-2xl relative z-50' : ''}`}>
          <button onClick={() => setShowContactModal(true)} className="px-3 py-2 sm:px-4 bg-blue-600/20 text-blue-500 border border-blue-500/30 hover:bg-blue-600 hover:text-white rounded-lg text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 uppercase tracking-widest shadow-lg">
            Kontakt
          </button>
          <button onClick={() => setShowSaveModal(true)} className="px-3 py-2 sm:px-4 bg-emerald-600/20 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white rounded-lg text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 uppercase tracking-widest shadow-lg">
            <FolderOpen className="w-4 h-4" /> Speicherstände
          </button>
          <button onClick={() => setShowResetConfirm(true)} className="px-3 py-2 sm:px-4 bg-rose-600/20 text-rose-500 border border-rose-500/30 hover:bg-rose-600 hover:text-white rounded-lg text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 uppercase tracking-widest shadow-lg">
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* ACHIEVEMENT TOAST */}
      {achievementToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[80] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-slate-900 border-2 border-amber-500 p-4 rounded-2xl shadow-[0_0_40px_rgba(245,158,11,0.3)] flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-amber-500 font-black uppercase tracking-widest text-xs mb-0.5 [text-wrap:balance]">{achievementToast.title}</h4>
              <p className="text-white font-bold text-sm leading-relaxed [text-wrap:pretty]">{achievementToast.subtitle}</p>
            </div>
          </div>
        </div>
      )}

      {/* METHOD TUTORIAL OVERLAY */}
      {highlightMethodTutorial && (
        <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-all duration-300 pointer-events-auto flex items-center justify-center">
          <div className="bg-slate-900 border-2 border-amber-500 p-6 sm:p-8 rounded-2xl max-w-lg w-[90%] text-center shadow-[0_0_40px_rgba(245,158,11,0.3)] animate-in zoom-in-95 pointer-events-auto absolute top-24 left-1/2 -translate-x-1/2 z-[100]">
            <Lightbulb className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-black text-white mb-2 uppercase tracking-tight [text-wrap:balance]">Neues Wissen verfügbar!</h2>
            <p className="text-slate-300 mb-6 leading-relaxed text-sm sm:text-base [text-wrap:pretty]">Du hast soeben deinen ersten Eintrag für den Methodenkoffer freigeschaltet. Klicke oben auf den markierten Button, um dir das neue Methodenwissen anzusehen, das dir bei der Lösung der Akte helfen wird!</p>
            <button onClick={() => setHighlightMethodTutorial(false)} className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors w-full border border-slate-700">Verstanden</button>
          </div>
        </div>
      )}

      {/* TUTORIAL OVERLAY */}
      {tutorialStep > 0 && (
        <>
           <div className="fixed inset-0 z-40 bg-slate-950/85 backdrop-blur-sm transition-all duration-300 pointer-events-auto"></div>
           
           {tutorialStep === 1 && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-slate-900 border-2 border-amber-500 p-6 sm:p-8 rounded-2xl max-w-lg w-[90%] text-center shadow-[0_0_40px_rgba(245,158,11,0.2)] animate-in zoom-in-95 pointer-events-auto">
                  <Info className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h2 className="text-xl sm:text-2xl font-black text-white mb-4 uppercase tracking-tight [text-wrap:balance]">Willkommen zur Simulation!</h2>
                  <p className="text-slate-300 mb-8 leading-relaxed text-sm sm:text-base [text-wrap:pretty]">Bevor du dokumentierst, reflektierst und Feedback gibst, zeigen wir dir in wenigen Schritten die wichtigsten Funktionen.</p>
                  <button onClick={nextTutorialStep} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black uppercase tracking-widest rounded-xl transition-colors w-full shadow-lg">Tutorial starten</button>
                </div>
              </div>
           )}

           {tutorialStep > 1 && (
              <div className={getTutorialBoxClasses()}>
                <p className="text-slate-200 mb-6 font-medium leading-relaxed text-sm sm:text-base">
                  {tutorialStep === 2 && "Links siehst du die Raumübersicht. Klicke auf die gelben Marker, um die verschiedenen Räume zu betreten und nach Akten zu suchen."}
                  {tutorialStep === 3 && "Rechts öffnet sich dann deine Übersicht der Akten. Hier bearbeitest und dokumentierst du die einzelnen Lernsituationen des jeweiligen Raums."}
                  {tutorialStep === 4 && "Oben rechts findest du dein Werkzeug: Das Notizbuch enthält wichtige Tipps, der Methodenkoffer liefert dir das nötige Theoriewissen. Beides wird durch das Öffnen und Bearbeiten von Akten stufenweise erweitert!"}
                  {tutorialStep === 5 && "Ganz unten rechts kannst du in verschiedenen Speicherslots deinen Fortschritt sichern, laden oder alles zurücksetzen."}
                  {tutorialStep === 6 && "Falls du diese Einleitung noch einmal ansehen möchtest, klicke auf diesen Info-Button. Das war's – viel Erfolg!"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Schritt {tutorialStep - 1} / 5</span>
                  <button onClick={nextTutorialStep} className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black uppercase tracking-widest rounded-xl transition-colors shadow-lg">
                    {tutorialStep === 6 ? "Verstanden!" : "Weiter"}
                  </button>
                </div>
              </div>
           )}
        </>
      )}

      {/* MODAL: ADMIN */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-850 rounded-t-2xl">
              <h3 className="font-black text-white flex items-center gap-2 text-xl [text-wrap:balance]"><LockIcon className="w-6 h-6 text-amber-500" /> Admin-Bereich</h3>
              <button onClick={() => setShowAdminModal(false)} className="text-slate-300 hover:text-white">Schließen</button>
            </div>
            <form onSubmit={handleAdminLogin} className="p-6">
              <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">Bitte gib das Admin-Passwort ein, um alle Räume und Inhalte sofort freizuschalten.</p>
              <input 
                type="password" 
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                placeholder="Passwort" 
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white mb-4 focus:border-amber-500 outline-none transition-colors"
                autoFocus
              />
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-black p-3 rounded-xl transition-colors">
                Entsperren
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET CONFIRM */}
      
      {/* MODAL: KONTAKT */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-blue-500/10 rounded-t-2xl shrink-0">
              <h3 className="font-black text-blue-400 text-xl [text-wrap:balance]">Kontakt</h3>
              <button onClick={() => setShowContactModal(false)} className="text-slate-300 hover:text-white">Schließen</button>
            </div>
            <div className="p-6 text-center">
              <p className="text-slate-200 mb-4 leading-relaxed text-sm">Fragen? Ideen? Dann meld´ dich gerne unter:</p>
              <a href="mailto:Jan_Rosenow@web.de" className="inline-block px-4 py-2 bg-blue-600/20 text-blue-400 font-bold rounded-lg border border-blue-500/30 hover:bg-blue-600 hover:text-white transition-colors">
                Jan_Rosenow@web.de
              </a>
            </div>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border-2 border-rose-500/50 rounded-2xl w-full max-w-sm shadow-[0_0_50px_rgba(243,24,73,0.3)] animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 [text-wrap:balance]">Spielstand zurücksetzen?</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed [text-wrap:pretty]">Bist du sicher? Alle bisherigen Fortschritte, freigeschalteten Notizen und Methoden gehen unwiderruflich verloren.</p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={performResetGame} 
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors shadow-lg"
                >
                  Ja, alles löschen
                </button>
                <button 
                  onClick={() => setShowResetConfirm(false)} 
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SAVE SLOTS */}
      
      {/* MODAL: NOTIZBUCH */}
      {showNotes && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-800 bg-amber-500/10 rounded-t-2xl shrink-0">
              <h3 id="notes-title" className="font-black text-amber-500 flex items-center gap-2 text-xl [text-wrap:balance]"><NotebookPen className="w-6 h-6" /> Notizbuch</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button onClick={() => handlePrintModal('notes-title', 'notes-content')} className="text-amber-500/70 hover:text-amber-400 flex items-center gap-2 text-sm bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-colors">
                  <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Als PDF speichern</span><span className="sm:hidden">PDF</span>
                </button>
                <button onClick={() => setShowNotes(false)} className="text-slate-300 hover:text-white">Schließen</button>
              </div>
            </div>
            
            <div id="notes-content" className="p-6 overflow-y-auto space-y-6">
              {/* Digitale Werkzeuge & Quellen: Zentral für den Praxiseinsatz */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 border-b border-slate-800">
                <div className="bg-purple-950/40 border border-purple-500/40 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-purple-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-purple-400" /> Digitaler KI-Helfer
                      </h4>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 font-mono px-1.5 py-0.5 rounded">NotebookLM</span>
                    </div>
                    <p className="text-xs text-purple-200/90 leading-relaxed mb-3">
                      Enthält alle Kursunterlagen, Gesetzestexte (§ 630 BGB, § 1827 BGB) und didaktischen Handreichungen zur interaktiven Fallberatung und Reflexion.
                    </p>
                  </div>
                  <a 
                    href="https://notebook.google.com/notebook/36294d79-a601-4870-a351-53ab8c954ac3" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    KI-Helfer öffnen <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="bg-blue-950/40 border border-blue-500/40 rounded-xl p-3.5 flex flex-col justify-between shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-blue-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-blue-400" /> Fachquelltext (PDF)
                      </h4>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-1.5 py-0.5 rounded">Quelltext</span>
                    </div>
                    <p className="text-xs text-blue-200/90 leading-relaxed mb-3">
                      Offizieller Quelltext und Leitfaden: Struktur, rechtliche Maßstäbe und Durchführung von Aufklärungsgesprächen.
                    </p>
                  </div>
                  <a 
                    href="https://github.com/jansonjanson/AufklaerungEinwilligunSOL/blob/main/Aufklaerungsgespraech.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    Aufklärungsgespräch.pdf <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Lehrvideos & Expertenwissen */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">Lehrvideos & Expertenwissen</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <a 
                    href="https://youtu.be/sg50e_i_PT8?si=nvHiyiHJ7gEWW5Dt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-2.5 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-rose-400" />
                    </div>
                    <div className="min-w-0">
                      <strong className="text-white block group-hover:text-amber-400 transition-colors truncate">Juristische Aspekte der Aufklärung</strong>
                      <span className="text-[11px] text-slate-400 block line-clamp-1">Rechtliche Grundlagen & Haftung</span>
                    </div>
                  </a>

                  <a 
                    href="https://youtu.be/dUTMy6FxXuU?si=DPZRasFGxlk4F8RM" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-2.5 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-rose-400" />
                    </div>
                    <div className="min-w-0">
                      <strong className="text-white block group-hover:text-amber-400 transition-colors truncate">Patienten RICHTIG aufklären!</strong>
                      <span className="text-[11px] text-slate-400 block line-clamp-1">Prof. Frohnhofen (Rechtsdepesche)</span>
                    </div>
                  </a>
                </div>
              </div>

              {unlockedNotes.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-700 rounded-xl">
                  <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-300 font-bold leading-relaxed [text-wrap:pretty]">Dein Notizbuch ist leer.</p>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed [text-wrap:pretty]">Sammle Erkenntnisse und Beobachtungen in den Akten.</p>
                </div>
              ) : (
                <>
                  {unlockedNotes.includes('note_1') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 01 & 02: Das Erstgespräch & Digitale Zentrale</h4>
                      <ul className="space-y-2 text-sm">
                        <li><strong className="text-white">fobizz Boards & Tutorial:</strong></li>
                        <li><a href="https://app.fobizz.com/pinboard/info" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Link zum fobizz Video-Tutorial</a></li>
                        <li><a href="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Link zum PA-Team Board</a> (Passwort: <span className="text-amber-500 font-mono">Praxisanleitung</span>)</li>
                        <li><a href="https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Link zum Azubi-Board</a> (Passwort: <span className="text-amber-500 font-mono">Auszubildende</span>)</li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_3') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 03: Ärztliche vs. Pflegerische Aufklärung</h4>
                      <div className="space-y-2 text-sm text-slate-300">
                        <p><strong>Eingriffsaufklärung (§ 630e BGB):</strong> Strikt ärztlicher Vorbehalt, absolut unübertragbar an Pflegekräfte oder Azubis. Pflege assistiert und kontrolliert das Vorliegen der Einwilligung vor Eingriffsbeginn.</p>
                        <p><strong>Sicherungsaufklärung:</strong> Originäre Pflegeaufgabe! Schutz- und verhaltensbezogene Information des Patienten zur Abwendung von Pflege- und Begleitschäden (z. B. Sturzprävention, Dekubitusprophylaxe, Mobilisationshinweise).</p>
                        <p><strong>Therapeutische Aufklärung:</strong> Interprofessionelle Information zur Verhaltenssteuerung (z. B. Schmerztherapie, Wundschonung).</p>
                      </div>
                    </div>
                  )}
                  {unlockedNotes.includes('note_4') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 04: Die 4 Säulen der wirksamen Einwilligung</h4>
                      <ul className="space-y-1 text-sm text-slate-300">
                        <li><strong className="text-purple-400">1. Einwilligungsfähigkeit:</strong> Patient versteht Wesen, Bedeutung und Tragweite der Maßnahme (situativ orientiert).</li>
                        <li><strong className="text-purple-400">2. Aufklärung:</strong> Rechtzeitig, verständlich und umfassend über Diagnose, Verlauf, Risiken und Alternativen.</li>
                        <li><strong className="text-purple-400">3. Freiwilligkeit:</strong> Vollkommen ohne Zwang, Druck oder Überredung durch Angehörige oder Personal.</li>
                        <li><strong className="text-purple-400">4. Widerruflichkeit:</strong> Jederzeit formlos und ohne Nachteile für die weitere Versorgung widerrufbar.</li>
                      </ul>
                    </div>
                  )}
                  {unlockedNotes.includes('note_6') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 06: Das Eskalationsmodell (Mutmaßlicher Wille)</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-slate-300">
                        <li>Prüfung der aktuellen Einwilligungsfähigkeit</li>
                        <li>Patientenverfügung (§ 1827 BGB) auf konkrete Situation prüfen</li>
                        <li>Gesetzlichen Betreuer / Vorsorgebevollmächtigten hinzuziehen</li>
                        <li>Ermittlung des mutmaßlichen Willens anhand früherer Äußerungen & Wertvorstellungen</li>
                        <li>Objektives Patientenwohl (nur bei unaufklärbarem Willen im Notfall)</li>
                        <li>Interprofessionelle ethische Fallbesprechung</li>
                      </ol>
                    </div>
                  )}
                  {unlockedNotes.includes('note_8') && (
                    <div className="bg-black/50 border border-slate-800 rounded-lg p-4">
                      <h4 className="font-bold text-slate-300 text-sm mb-2 uppercase tracking-widest border-b border-slate-800 pb-2 [text-wrap:balance]">Akte 08: Fall Herr Müller (Schutzfunktion der Pflege)</h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Schutz vor rechtswidriger Delegation: Eingriffsaufklärung (Sedierung/Koloskopie) darf nicht delegiert werden. Bei Weinen/Angst fehlt die informierte Freiwilligkeit. Die Praxisanleitung schützt die Schülerin und remonstriert gegenüber der Stationsleitung.
                      </p>
                    </div>
                  )}
                  {unlockedNotes.includes('easter_egg_bgb') && (
                    <div className="bg-amber-950/40 border border-amber-500/40 rounded-lg p-4">
                      <h4 className="font-bold text-amber-400 text-sm mb-1 uppercase tracking-widest flex items-center gap-2 [text-wrap:balance]"><Book className="w-4 h-4 text-amber-400" /> BGB-Fund: Dokumentation als Schutz</h4>
                      <p className="text-sm text-amber-100/90 leading-relaxed [text-wrap:pretty]">
                        „Nicht jede Aufklärung muss schriftlich erfolgen, aber wer schreibt, der bleibt. Eine gute Dokumentation ist dein bester juristischer Schutz.“ (§ 630f BGB)
                      </p>
                    </div>
                  )}
                  {unlockedNotes.includes('easter_egg_shield') && (
                    <div className="bg-blue-950/40 border border-blue-500/40 rounded-lg p-4">
                      <h4 className="font-bold text-blue-400 text-sm mb-1 uppercase tracking-widest flex items-center gap-2 [text-wrap:balance]"><Shield className="w-4 h-4 text-blue-400" /> Der Schutzschild: Mut zum Nein</h4>
                      <p className="text-sm text-blue-100/90 leading-relaxed [text-wrap:pretty]">
                        „Die Delegation der ärztlichen Aufklärung an die Pflege ist unzulässig. Dein Schild ist das mutige, aber professionelle ‚Nein‘, wenn ärztliche Aufgaben delegiert werden sollen.“
                      </p>
                    </div>
                  )}
                  {unlockedNotes.includes('badge_expert_5') && (
                    <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-4">
                      <h4 className="font-bold text-emerald-400 text-sm mb-1 uppercase tracking-widest flex items-center gap-2 [text-wrap:balance]"><Award className="w-4 h-4 text-emerald-400" /> Abzeichen: Jura-Ass (Akte 05)</h4>
                      <p className="text-sm text-emerald-100/90 leading-relaxed [text-wrap:pretty]">
                        Hervorragend! Du hast das Paragrafen-Quiz fehlerfrei gemeistert. Du kennst die Grenzen der Delegation ganz genau.
                      </p>
                    </div>
                  )}
                  {unlockedNotes.includes('badge_expert_7') && (
                    <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-lg p-4">
                      <h4 className="font-bold text-emerald-400 text-sm mb-1 uppercase tracking-widest flex items-center gap-2 [text-wrap:balance]"><Award className="w-4 h-4 text-emerald-400" /> Abzeichen: Ethik-Experte (Akte 07)</h4>
                      <p className="text-sm text-emerald-100/90 leading-relaxed [text-wrap:pretty]">
                        Respekt! Du hast den Algorithmus zur mutmaßlichen Einwilligung perfekt durchschaut.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SAVE SLOTS */}
      {showSaveModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-850 rounded-t-2xl shrink-0">
              <h3 className="font-black text-white flex items-center gap-2 text-xl [text-wrap:balance]"><FolderOpen className="w-6 h-6 text-emerald-500" /> Speicherstände</h3>
              <button onClick={() => setShowSaveModal(false)} className="text-slate-300 hover:text-white">Schließen</button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">Hier kannst du deinen aktuellen Fortschritt lokal in deinem Browser speichern oder einen alten Spielstand laden.</p>
              
              {[1, 2, 3].map((slotIndex) => {
                const slotId = `slot_${slotIndex}`;
                const slot = saveSlots[slotId];
                return (
                  <div key={slotId} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <strong className="text-white">Speicherplatz {slotIndex}</strong>
                      {slot ? (
                        <span className="text-xs text-slate-400">{slot.date}</span>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Leer</span>
                      )}
                    </div>
                    {slot && (
                      <div className="text-xs text-slate-400 flex gap-4">
                        <span>Akten gelöst: {slot.progress.length}</span>
                        <span>Methoden: {slot.methods.length}</span>
                      </div>
                    )}
                    <div className="flex gap-2 mt-2">
                      <button 
                        onClick={() => handleSaveToSlot(slotId)}
                        className="flex-1 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-500 border border-emerald-500/30 rounded-lg text-sm font-bold transition-colors"
                      >
                        Hier Speichern
                      </button>
                      {slot && (
                        <button 
                          onClick={() => {
                            handleLoadFromSlot(slotId);
                            setShowSaveModal(false);
                          }}
                          className="flex-1 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-500 border border-blue-500/30 rounded-lg text-sm font-bold transition-colors"
                        >
                          Laden
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: METHODENKOFFER */}
      {showMethods && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-slate-800 bg-slate-850 rounded-t-2xl shrink-0">
              <h3 id="methods-title" className="font-black text-white flex items-center gap-2 text-xl [text-wrap:balance]"><Lightbulb className="w-6 h-6 text-blue-500" /> Methodenkoffer</h3>
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <button onClick={() => handlePrintModal('methods-title', 'methods-content')} className="text-slate-300 hover:text-white flex items-center gap-2 text-sm bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
                  <Printer className="w-4 h-4" /> <span className="hidden sm:inline">Als PDF speichern</span><span className="sm:hidden">PDF</span>
                </button>
                <button onClick={() => setShowMethods(false)} className="text-slate-300 hover:text-white">Schließen</button>
              </div>
            </div>
            
            <div id="methods-content" className="p-6 overflow-y-auto space-y-4">
              {unlockedMethods.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-700 rounded-xl">
                  <LockIcon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-300 font-bold leading-relaxed [text-wrap:pretty]">Der Methodenkoffer ist noch leer.</p>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed [text-wrap:pretty]">Öffne weitere Akten, um hier wichtige Theorien und Rechtsmodelle freizuschalten.</p>
                </div>
              ) : (
                <>
                  {unlockedMethods.includes('aufklaerung') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-blue-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Ärztliche vs. Pflegerische Aufklärung (§ 630e BGB) & Grenzen der Delegation</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Im deutschen Medizin- und Pflegerecht ist die Aufklärung über medizinische Maßnahmen streng geregelt. Jede medizinische oder pflegerische Einwirkung auf den menschlichen Körper ist tatbestandlich eine Körperverletzung (§ 223 StGB), die erst durch eine wirksame Einwilligung gerechtfertigt wird.
                      </p>
                      <div className="space-y-3 text-sm text-slate-300 mt-2">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <strong className="text-blue-400 block mb-1">1. Risiko- und Eingriffsaufklärung (Arztvorbehalt):</strong>
                          <p>Umfasst Wesen, Bedeutung, Ablauf, Risiken und echte Alternativen invasiver oder risikobehafteter Eingriffe (z. B. Operationen, Koloskopien, Narkosen, Bluttransfusionen). Diese Aufgabe ist <strong>strikt delegationsunfähig</strong>. Sie darf unter keinen Umständen an Pflegekräfte, Hebammen oder Auszubildende übertragen werden!</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <strong className="text-emerald-400 block mb-1">2. Sicherungsaufklärung (Originäre Pflegeaufgabe):</strong>
                          <p>Verhaltens- und Schutzaufklärung zur Abwendung typischer Pflege- und Begleitschäden (z. B. Sturzprävention, Nutzung von Bettgittern/Gehhilfen, Lagerungsintervalle bei Dekubitusrisiko, Nachsorgeverhalten). Muss zeitnah und nachvollziehbar dokumentiert werden.</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <strong className="text-amber-400 block mb-1">3. Therapeutische Aufklärung (Interprofessionell):</strong>
                          <p>Gemeinsame Information über verhaltensbezogene Therapiebegleitung (z. B. Schmerzmedikation, Mobilisationsregeln, Wundschonung).</p>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-800/80">
                        <a 
                          href="https://github.com/jansonjanson/AufklaerungEinwilligunSOL/blob/main/Aufklaerungsgespraech.pdf" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg text-xs font-bold transition-colors border border-blue-500/30"
                        >
                          <FileText className="w-3.5 h-3.5" /> Quelltext: Aufklärungsgespräch (PDF) <ExternalLink className="w-3 h-3" />
                        </a>
                        <a 
                          href="https://youtu.be/sg50e_i_PT8?si=nvHiyiHJ7gEWW5Dt" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg text-xs font-bold transition-colors border border-rose-500/30"
                        >
                          <Play className="w-3.5 h-3.5 fill-rose-300" /> Video: Juristische Aspekte <ExternalLink className="w-3 h-3" />
                        </a>
                        <a 
                          href="https://notebook.google.com/notebook/36294d79-a601-4870-a351-53ab8c954ac3" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white rounded-lg text-xs font-bold transition-colors border border-purple-500/30"
                        >
                          <Bot className="w-3.5 h-3.5" /> Zum KI-Helfer (NotebookLM) <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {unlockedMethods.includes('consent') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-purple-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Die 4 Säulen der wirksamen Einwilligung (Informed Consent)</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Damit eine Einwilligung rechtlich wirksam schützt, müssen alle vier Säulen zeitgleich und uneingeschränkt erfüllt sein. Fehlt auch nur eine einzige Säule, ist die Einwilligung unwirksam:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 space-y-2 mt-2">
                        <li><strong className="text-purple-400">Säule 1 – Einwilligungsfähigkeit:</strong> Der Patient muss im konkreten Moment („situativ orientiert“) in der Lage sein, Wesen, Tragweite und Risiken der Maßnahme verstandesmäßig zu erfassen und seinen Willen danach frei zu bestimmen.</li>
                        <li><strong className="text-purple-400">Säule 2 – Ordnungsgemäße Aufklärung:</strong> Rechtzeitig (vor dem Eingriff, mit Bedenkzeit), verständlich (ohne unverständlichen Fachjargon), umfassend und persönlich durch den Behandler.</li>
                        <li><strong className="text-purple-400">Säule 3 – Freiwilligkeit:</strong> Die Entscheidung muss vollkommen frei von psychischem Zwang, institutionellem Druck oder unzulässiger Beeinflussung durch Personal oder Angehörige fallen.</li>
                        <li><strong className="text-purple-400">Säule 4 – Jederzeitige Widerruflichkeit:</strong> Der Patient muss wissen, dass er eine einmal gegebene Einwilligung jederzeit formlos und ohne Nachteile für die weitere Grund- und Regelversorgung widerrufen kann.</li>
                      </ul>

                      <div className="pt-2 flex flex-wrap gap-2 border-t border-slate-800/80">
                        <a 
                          href="https://youtu.be/dUTMy6FxXuU?si=DPZRasFGxlk4F8RM" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg text-xs font-bold transition-colors border border-rose-500/30"
                        >
                          <Play className="w-3.5 h-3.5 fill-rose-300" /> Video: Patienten RICHTIG aufklären! (Prof. Frohnhofen) <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}

                  {unlockedMethods.includes('eskalation') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-emerald-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Der Stufenprozess der mutmaßlichen Einwilligung (Eskalationsmodell)</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Kann ein Patient seinen Willen akut nicht selbst äußern (z. B. Koma, schwere Delir-/Demenzphase), greift das rechtliche Eskalationsmodell. Oberste Richtschnur ist immer das Selbstbestimmungsrecht:
                      </p>
                      <ol className="list-decimal list-inside text-sm text-slate-300 space-y-2 mt-2">
                        <li><strong className="text-emerald-400">1. Prüfung der Einwilligungsfähigkeit:</strong> Ist der Zustand dauerhaft oder nur passager? Kann durch einfache Sprache oder Beruhigung noch Einwilligungsfähigkeit hergestellt werden?</li>
                        <li><strong className="text-emerald-400">2. Patientenverfügung prüfen (§ 1827 BGB):</strong> Liegt eine schriftliche Verfügung vor? Trifft sie exakt auf die aktuelle Lebens- und Behandlungssituation zu? Wenn ja: Unmittelbar bindend!</li>
                        <li><strong className="text-emerald-400">3. Gesetzliche Vertretung / Vorsorgebevollmächtigte:</strong> Einbindung des legitimierten Vertreters. Der Vertreter entscheidet nicht nach eigenem Gutdünken, sondern muss den Patientenwillen zur Geltung bringen.</li>
                        <li><strong className="text-emerald-400">4. Ermittlung des mutmaßlichen Willens:</strong> Rekonstruktion anhand früherer Äußerungen, religiöser/ethischer Überzeugungen, Werte und Lebensgestaltung.</li>
                        <li><strong className="text-emerald-400">5. Objektives Patientenwohl (Notfallanker):</strong> Nur wenn der individuelle Wille auch nach sorgfältiger Recherche unaufklärbar bleibt und eine akute Notfallsituation vorliegt.</li>
                        <li><strong className="text-emerald-400">6. Ethische Fallbesprechung:</strong> Bei Zweifeln oder Dissens zwischen Behandlern und Vertretern wird das klinische Ethikkomitee einberufen.</li>
                      </ol>
                    </div>
                  )}

                  {unlockedMethods.includes('create') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-amber-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Das CREATE-Framework (für KI-Prompts in Pflege & Pädagogik)</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Eine strukturierte Methode, um exakte und qualitativ hochwertige Ergebnisse von generativer KI (wie Gemini oder ChatGPT) für didaktische und rechtliche Fallanalysen zu erhalten:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                        <li><strong className="text-amber-400">C – Character (Rolle):</strong> Wer soll die KI sein? (z. B. „Experte für Pflegepädagogik und Medizinrecht...“)</li>
                        <li><strong className="text-amber-400">R – Request (Aufgabe):</strong> Was genau soll die KI tun? (z. B. „Führe einen sokratischen Reflexionsdialog zum Fall Herr Müller...“)</li>
                        <li><strong className="text-amber-400">E – Examples (Beispiele):</strong> Gewünschtes Frage- oder Antwortmuster vorgeben.</li>
                        <li><strong className="text-amber-400">A – Adjustments (Anpassungen):</strong> Einschränkungen (z. B. „Stelle immer nur eine Frage auf einmal, keine voreiligen Lösungen“).</li>
                        <li><strong className="text-amber-400">T – Type of Output (Format):</strong> Fließtext, Tabelle oder Chat-Dialog.</li>
                        <li><strong className="text-amber-400">E – Extras (Zusätze):</strong> Rohe Fallnotizen, Beobachtungen und Kontextfaktoren einfügen.</li>
                      </ul>
                    </div>
                  )}

                  {unlockedMethods.includes('recht_doku') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-rose-500 animate-in fade-in slide-in-from-left-4 mt-4 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Rechtssichere Dokumentation & Remonstrationsrecht (§ 630f BGB)</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        „Wer schreibt, der bleibt.“ Die Pflegedokumentation ist eine gesetzliche Pflichturkunde (§ 630f BGB). Sie dient dem Patientenschutz und der Beweissicherung.
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
                        <li><strong>Beweislastregel:</strong> Was nicht dokumentiert ist, gilt im Schadens- und Haftungsprozess juristisch als nicht durchgeführt!</li>
                        <li><strong>Remonstrationspflicht:</strong> Verlangt ein Vorgesetzter oder Arzt rechtswidrige Handlungen (z. B. Abnahme einer ärztlichen Eingriffsaufklärung durch Azubis oder Pflegekräfte), ist die Pflegefachkraft gesetzlich verpflichtet, Bedenken anzumelden (Remonstration) und die Durchführung zu verweigern.</li>
                      </ul>
                    </div>
                  )}

                  {unlockedMethods.includes('synergien') && (
                    <div className="bg-slate-850 p-5 rounded-xl border border-slate-800 border-l-4 border-l-sky-500 animate-in fade-in slide-in-from-left-4 mt-8 space-y-3">
                      <h4 className="font-bold text-white text-lg mb-1 [text-wrap:balance]">Systemische Synergien: Recht, Ethik und Pflegepädagogik</h4>
                      <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">
                        Die juristischen und pädagogischen Modelle greifen nahtlos ineinander:
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-300 mt-2 space-y-2">
                        <li><strong className="text-sky-400">Informed Consent & Schutzfunktion:</strong> Eine Praxisanleitung lehrt Auszubildende, dass Patientenautonomie (Art. 2 GG) nicht verhandelbar ist. Die Pflege agiert hier als ethische Anwältin des Patienten.</li>
                        <li><strong className="text-sky-400">Eskalationsmodell & Didaktik:</strong> In Not- und Grenzsituationen gibt der 6-Stufen-Algorithmus der Schülerin Handlungssicherheit und schützt vor juristischer Fehlentscheidung.</li>
                        <li><strong className="text-sky-400">KI-Sparring als Zukunftskompetenz:</strong> Das CREATE-Framework ermöglicht es Praxisanleitenden, komplexe ethische Grauzonen interaktiv und sokratisch vorzudenken.</li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
{/* FINAL ACHIEVEMENT MODAL */}
      {showFinalModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-amber-500 rounded-2xl max-w-2xl w-full p-8 shadow-[0_0_40px_rgba(245,158,11,0.2)] animate-in zoom-in-95 fade-in duration-300 relative my-8">
            <button onClick={() => setShowFinalModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <Award className="w-10 h-10 text-slate-900" />
              </div>
              <h2 className="text-3xl font-black text-amber-500 uppercase tracking-widest [text-wrap:balance]">Geschafft!</h2>
              <p className="text-xl text-white font-bold mt-2 leading-relaxed [text-wrap:pretty]">Meister der Aufklärung, Patientenrechte & Pflegeethik.</p>
            </div>
            
            <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
              <p>
                Du lehnst dich in deinem Bürostuhl zurück. Alle 8 Akten auf deiner Station sind erfolgreich bearbeitet.
                Vom ersten Kennenlernen über die scharfe juristische Trennung von Eingriffs- und Sicherungsaufklärung 
                bis hin zum sensiblen Umgang mit mutmaßlichem Patientenwillen und dem Praxisfall von Herrn Müller: 
                Du hast bewiesen, dass du höchste Rechts- und Methodenkompetenz mit empathischer Pflegepädagogik verbindest.
              </p>
              
              <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
                <h3 className="font-bold text-amber-500 mb-3 uppercase tracking-widest text-xs [text-wrap:balance]">Dein erworbenes Kompetenzprofil:</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Ärztliche vs. Pflegerische Aufklärung (§ 630e BGB):</strong> Klare Einhaltung des Arztvorbehalts und mutige Abwehr unzulässiger Delegation.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Die 4 Säulen der Einwilligung:</strong> Informed Consent durch Einwilligungsfähigkeit, Aufklärung, Freiwilligkeit und Widerruflichkeit.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Eskalationsmodell der mutmaßlichen Einwilligung:</strong> Strukturierte Willensermittlung von der Patientenverfügung (§ 1827 BGB) bis zur ethischen Fallbesprechung.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>CREATE-Framework & KI-Labor:</strong> Einsatz generativer KI als sokratischer Mentor für Reflexion und rechtssichere Handlungsleitfäden.</span></li>
                  <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> <span><strong>Rechtssichere Dokumentation & Remonstration:</strong> „Wer schreibt, der bleibt“ – Schutzfunktion für Patient und Pflegefachkraft.</span></li>
                </ul>
              </div>
              
              <p>
                Dein Methodenkoffer ist nun prall gefüllt. Du bist bestens gerüstet, um Auszubildende in der Pflegepraxis 
                fachlich exzellent, rechtssicher und mit klarer ethischer Haltung anzuleiten.
              </p>
              <p className="font-bold text-center mt-6 pt-4 border-t border-slate-700">
                Vielen Dank für deine engagierte Teilnahme an der Praxisanleitung!
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button onClick={() => setShowFinalModal(false)} className="px-8 py-3 bg-amber-500 text-slate-900 font-black uppercase tracking-widest text-sm rounded-lg hover:bg-amber-400 transition-colors shadow-lg hover:shadow-amber-500/25">
                Zurück zur Station
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
