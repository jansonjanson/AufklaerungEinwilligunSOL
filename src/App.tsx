import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Lock as LockIcon, 
  CheckCircle2, 
  ChevronLeft, 
  NotebookPen, 
  Lightbulb, 
  Map as MapIcon, 
  Info, 
  ArrowDown, 
  FolderOpen, 
  Award, 
  RotateCcw, 
  X, 
  Book, 
  Shield, 
  Scale, 
  FileText, 
  Printer, 
  Download, 
  BookOpen, 
  Bot, 
  ExternalLink, 
  Play,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CaseViewer, { CASES } from './CaseContent';
import { ROOMS, MAP_IMAGE_URL } from './constants';

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
  const [adminPassword, setAdminPassword] = useState('');

  // States for progression and highlights
  const [unlockedMethods, setUnlockedMethods] = useState<string[]>([]);
  const [unlockedNotes, setUnlockedNotes] = useState<string[]>([]);
  const [achievementToast, setAchievementToast] = useState<{title: string, subtitle: string} | null>(null);
  const [showFinalModal, setShowFinalModal] = useState(false);

  const [highlightBack, setHighlightBack] = useState(false);
  const [highlightMethodTutorial, setHighlightMethodTutorial] = useState(false);
  const [canCompleteCase, setCanCompleteCase] = useState(true);

  // Save Slots State
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSlots, setSaveSlots] = useState<Record<string, { date: string, progress: number[], methods: string[], notes: string[] }>>({});

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

  useEffect(() => {
    const savedProgress = localStorage.getItem('praxis-jur-prog-v4');
    const savedMethods = localStorage.getItem('praxis-jur-meth-v4');
    const savedNotes = localStorage.getItem('praxis-jur-notes-v4');
    const savedSlots = localStorage.getItem('praxis-jur-slots-v4');

    if (savedProgress) setProgress(JSON.parse(savedProgress));
    if (savedMethods) setUnlockedMethods(JSON.parse(savedMethods));
    if (savedNotes) setUnlockedNotes(JSON.parse(savedNotes));
    if (savedSlots) setSaveSlots(JSON.parse(savedSlots));
    
    const adminSaved = localStorage.getItem('praxis-jur-admin-v4');
    if (adminSaved === 'true') {
      setIsAdmin(true);
    }
    
    const tutorialSeen = localStorage.getItem('praxis-jur-tutorial-v4');
    if (!tutorialSeen) {
      setTutorialStep(1);
    }
  }, []);

  const saveToLocalStorage = (newProg: number[], newMeth: string[], newNotes: string[]) => {
    localStorage.setItem('praxis-jur-prog-v4', JSON.stringify(newProg));
    localStorage.setItem('praxis-jur-meth-v4', JSON.stringify(newMeth));
    localStorage.setItem('praxis-jur-notes-v4', JSON.stringify(newNotes));
  };

  const showAchievement = (title: string, subtitle: string) => {
    setAchievementToast({ title, subtitle });
  };

  const handleSaveSlot = (slotKey: string) => {
    const newSlots = {
      ...saveSlots,
      [slotKey]: {
        date: new Date().toLocaleString('de-DE'),
        progress,
        methods: unlockedMethods,
        notes: unlockedNotes
      }
    };
    setSaveSlots(newSlots);
    localStorage.setItem('praxis-jur-slots-v4', JSON.stringify(newSlots));
    showAchievement('Gespeichert', `Spielstand wurde auf Slot ${slotKey} gesichert.`);
  };

  const handleLoadSlot = (slotKey: string) => {
    const slot = saveSlots[slotKey];
    if (slot) {
      setProgress(slot.progress);
      setUnlockedMethods(slot.methods);
      setUnlockedNotes(slot.notes);
      saveToLocalStorage(slot.progress, slot.methods, slot.notes);
      setActiveRoom(null);
      setActiveCase(null);
      showAchievement('Spielstand geladen', 'Ihr Lernfortschritt wurde erfolgreich wiederhergestellt.');
    }
  };

  const performResetGame = () => {
    localStorage.removeItem('praxis-jur-prog-v4');
    localStorage.removeItem('praxis-jur-meth-v4');
    localStorage.removeItem('praxis-jur-notes-v4');
    localStorage.removeItem('praxis-jur-admin-v4');
    localStorage.removeItem('praxis-jur-tutorial-v4');
    setProgress([]);
    setUnlockedMethods([]);
    setUnlockedNotes([]);
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
          setAchievementToast({ title: '🏆 Jura-Ass (Akte 05)', subtitle: 'Hervorragend! Sie haben das Paragrafen-Quiz fehlerfrei gemeistert.' });
        } else if (noteId === 'badge_expert_7') {
          setAchievementToast({ title: '🏆 Ethik-Experte (Akte 07)', subtitle: 'Respekt! Sie haben das Eskalationsmodell perfekt durchschaut.' });
        } else if (noteId === 'easter_egg_bgb') {
          setAchievementToast({ title: '📖 BGB gefunden!', subtitle: '„Wer schreibt, der bleibt.“ Dokumentation ist Ihr bester juristischer Schutz.' });
        } else if (noteId === 'easter_egg_shield') {
          setAchievementToast({ title: '🛡️ Schutzschild gefunden!', subtitle: 'Die Delegation der ärztlichen Aufklärung ist unzulässig. Ihr Schild ist das professionelle „Nein“.' });
        }
        localStorage.setItem('praxis-jur-notes-v4', JSON.stringify(newNotes));
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

    if (id === 1 && !newNotes.includes('note_1')) {
      newNotes.push('note_1');
      unlockedSomething = true;
      showAchievement('Neuer Eintrag im Notizbuch!', 'Grundlagen der Patientenaufklärung freigeschaltet.');
    }
    if (id === 2 && !newNotes.includes('note_2')) {
      newNotes.push('note_2');
      unlockedSomething = true;
      showAchievement('Neuer Eintrag im Notizbuch!', 'Praxis-Videos & Aufklärungstypen freigeschaltet.');
    }
    if (id === 3) {
      if (!newNotes.includes('note_3')) newNotes.push('note_3');
      if (!newMeth.includes('aufklaerung')) {
        newMeth.push('aufklaerung');
        showAchievement('Gesetzbuch erweitert!', '§ 630e BGB: Aufklärungspflichten freigeschaltet.');
      }
      unlockedSomething = true;
    }
    if (id === 4) {
      if (!newNotes.includes('note_4')) newNotes.push('note_4');
      if (!newMeth.includes('consent')) {
        newMeth.push('consent');
        showAchievement('Gesetzbuch erweitert!', 'Formen der wirksamen Einwilligung freigeschaltet.');
      }
      unlockedSomething = true;
    }
    if (id === 6) {
      if (!newNotes.includes('note_6')) newNotes.push('note_6');
      if (!newMeth.includes('delegation')) {
        newMeth.push('delegation');
        showAchievement('Gesetzbuch erweitert!', 'Grenzen der Delegation & § 4 PflBG freigeschaltet.');
      }
      unlockedSomething = true;
    }
    if (id === 7 && !newMeth.includes('eskalation')) {
      newMeth.push('eskalation');
      unlockedSomething = true;
      showAchievement('Gesetzbuch erweitert!', 'Das Eskalationsmodell der Willensermittlung freigeschaltet.');
    }
    if (id === 8) {
      if (!newNotes.includes('note_8')) newNotes.push('note_8');
      if (!newMeth.includes('remonstration')) {
        newMeth.push('remonstration');
        showAchievement('Gesetzbuch erweitert!', 'Remonstrationsrecht & KI-Prompts freigeschaltet.');
      }
      unlockedSomething = true;
    }
    if (id === 9) {
      if (!newNotes.includes('note_9')) newNotes.push('note_9');
      if (!newMeth.includes('beweislast')) {
        newMeth.push('beweislast');
        showAchievement('Gesetzbuch erweitert!', '§ 630h BGB: Beweislastumkehr freigeschaltet.');
      }
      unlockedSomething = true;
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

      if (newProgress.length === 9) {
        setTimeout(() => {
          setShowFinalModal(true);
        }, 600);
      } else {
        setHighlightBack(true);
      }
    }
  };

  // Lock status calculation
  const isRoom2Unlocked = isAdmin || (progress.includes(1) && progress.includes(2));
  const isRoom3Unlocked = isAdmin || (isRoom2Unlocked && progress.includes(3) && progress.includes(4));
  const isRoom4Unlocked = isAdmin || (isRoom3Unlocked && progress.includes(5) && progress.includes(6));

  const isRoomLocked = (roomId: string) => {
    if (isAdmin) return false;
    if (roomId === 'anmeldung') return false;
    if (roomId === 'patientenzimmer') return !isRoom2Unlocked;
    if (roomId === 'stationszimmer') return !isRoom3Unlocked;
    if (roomId === 'arztzimmer') return !isRoom4Unlocked;
    return false;
  };

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
            strong { font-weight: bold; }
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

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans select-none overflow-hidden">
      {/* Toast Notification */}
      {achievementToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border-2 border-amber-500 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 max-w-md">
          <Award className="w-8 h-8 text-amber-400 shrink-0 animate-bounce" />
          <div>
            <h4 className="font-bold text-sm text-amber-400">{achievementToast.title}</h4>
            <p className="text-xs text-slate-300 leading-snug">{achievementToast.subtitle}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="h-16 shrink-0 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 relative z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <Scale className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="font-black text-sm sm:text-base tracking-wide text-white uppercase flex items-center gap-2">
              Aufklärung & Einwilligung <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Skills Lab</span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">Chirurgische Station: Rechtssicherheit, Informed Consent & Patientenrechte</p>
          </div>
        </div>
        
        <div className="flex gap-2 items-center shrink-0">
          {progress.length === 9 && (
            <button 
              onClick={() => setShowFinalModal(true)} 
              className="p-2 bg-amber-500/10 border border-amber-500/50 hover:bg-amber-500/20 text-amber-500 rounded-lg transition-all duration-300 hidden sm:flex items-center justify-center mr-2 animate-pulse" 
              title="Abschluss-Zertifikat ansehen">
              <Trophy className="w-5 h-5" />
            </button>
          )}
          <div className="hidden lg:flex flex-col text-right mr-4">
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest">Fortschritt</span>
            <span className="text-sm font-black font-mono text-amber-500">{progress.length}/9 Akten erledigt</span>
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
              <Scale className={`w-4 h-4 ${highlightMethodTutorial ? 'text-amber-500' : 'text-amber-400'}`} /> 
              <span className="hidden sm:inline">Gesetzbuch</span>
              {unlockedMethods.length > 0 && <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">{unlockedMethods.length}</span>}
            </button>
            
            <button onClick={() => setShowNotes(true)} className="px-3 py-2 sm:px-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider">
              <NotebookPen className="w-4 h-4" /> <span className="hidden sm:inline">Notizbuch</span>
              {unlockedNotes.length > 0 && <span className="bg-slate-900 text-amber-500 text-[10px] px-1.5 py-0.5 rounded-full ml-1 font-bold">{unlockedNotes.length}</span>}
            </button>
          </div>

          <button onClick={() => setTutorialStep(1)} className={`p-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-300 ml-1 sm:ml-2 ${tutorialStep === 6 ? 'relative z-[70] ring-4 ring-amber-500/50 bg-slate-700 text-amber-500 shadow-2xl' : ''}`} title="Tutorial neu starten">
            <Info className="w-5 h-5 text-blue-400" />
          </button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* Left Pane: Station Map */}
        <div className={`w-full lg:w-1/2 p-4 sm:p-6 flex flex-col justify-center items-center bg-slate-950 border-r border-slate-900 relative transition-all duration-300 ${tutorialStep === 2 ? 'relative z-50 ring-4 ring-amber-500/50' : ''}`}>
          <div className="relative w-full max-w-lg aspect-square bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800/80 group">
            
            <img 
              src={MAP_IMAGE_URL} 
              alt="Stationsübersicht" 
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out" 
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

            {/* Room Markers */}
            {ROOMS.map(room => {
              const locked = isRoomLocked(room.id);
              const isActive = activeRoom === room.id;
              
              const roomCases = CASES.filter(c => c.roomId === room.id);
              const roomCompleted = roomCases.length > 0 && roomCases.every(c => progress.includes(c.id));
              const roomInProgress = roomCases.some(c => progress.includes(c.id)) && !roomCompleted;

              return (
                <button
                  key={room.id}
                  disabled={locked}
                  onClick={() => {
                    setActiveRoom(room.id);
                    setActiveCase(null);
                  }}
                  style={{ top: room.top, left: room.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/btn focus:outline-none transition-all duration-300 ${
                    locked ? 'opacity-40 cursor-not-allowed scale-90' : 'cursor-pointer hover:scale-110 active:scale-95'
                  }`}
                >
                  <div className={`relative p-3.5 sm:p-4 rounded-2xl flex items-center justify-center shadow-2xl border-2 backdrop-blur-md transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-500 border-white text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-110 ring-4 ring-amber-500/30'
                      : locked
                        ? 'bg-slate-900/90 border-slate-700 text-slate-500'
                        : roomCompleted
                          ? 'bg-emerald-600/90 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'bg-slate-900/90 border-amber-500/60 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:border-amber-400'
                  }`}>
                    {locked ? (
                      <LockIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : roomCompleted ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    ) : (
                      <MapIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}

                    {roomInProgress && !locked && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-ping" />
                    )}
                  </div>

                  <span className={`mt-2 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md border shadow-lg transition-all ${
                    isActive 
                      ? 'bg-amber-500 text-slate-950 border-amber-400 scale-105' 
                      : locked
                        ? 'bg-slate-900/80 text-slate-500 border-slate-800'
                        : 'bg-slate-900/90 text-slate-200 border-slate-700 group-hover/btn:border-amber-500/50 group-hover/btn:text-amber-400'
                  }`}>
                    {room.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Pane: Cases & Active Case Content */}
        <div ref={rightPaneRef} className={`w-full lg:w-1/2 flex flex-col bg-slate-900/50 backdrop-blur-sm overflow-y-auto relative transition-all duration-300 ${tutorialStep === 3 ? 'relative z-50 ring-4 ring-amber-500/50' : ''}`}>
          
          {!activeRoom && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
                <MapIcon className="w-8 h-8 text-amber-500/70" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Kein Raum betreten</h3>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed [text-wrap:pretty]">
                Klicken Sie auf der linken Stationskarte auf <strong className="text-amber-400">„01 Anmeldung“</strong>, um Ihre Schicht zu beginnen und die rechtlichen Grundlagen zu erarbeiten.
              </p>
            </div>
          )}

          {activeRoom && !activeCase && (
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-amber-500 uppercase">Ausgewählter Bereich</span>
                    <h2 className="text-2xl font-black text-white">
                      {ROOMS.find(r => r.id === activeRoom)?.name}
                    </h2>
                  </div>
                  <button 
                    onClick={() => setActiveRoom(null)}
                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors text-xs font-bold flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Raum verlassen
                  </button>
                </div>

                <div className="grid gap-3">
                  {CASES.filter(c => c.roomId === activeRoom).map(c => {
                    const isDone = progress.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleOpenCase(c.id)}
                        className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all group ${
                          isDone 
                            ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500' 
                            : 'bg-slate-900 border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 shadow-md'
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-slate-800 text-slate-400 rounded group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
                              {c.tag}
                            </span>
                            {isDone && (
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded">
                                Erledigt
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                            {c.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-1">
                            {c.subtitle}
                          </p>
                        </div>
                        <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                          isDone 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-slate-800 text-slate-400 group-hover:bg-amber-500 group-hover:text-slate-950'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5 rotate-180" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Room Completed Navigation Banner */}
              {CASES.filter(c => c.roomId === activeRoom).every(c => progress.includes(c.id)) && (
                <div className="mt-8 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-sm">Bereich erfolgreich abgeschlossen!</h4>
                      <p className="text-xs text-emerald-200/70">Sie haben alle Akten in diesem Bereich gelöst.</p>
                    </div>
                  </div>
                  {activeRoom === 'anmeldung' && isRoom2Unlocked && (
                    <button onClick={() => setActiveRoom('patientenzimmer')} className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-all shrink-0">
                      Weiter zum Patientenzimmer <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                  {activeRoom === 'patientenzimmer' && isRoom3Unlocked && (
                    <button onClick={() => setActiveRoom('stationszimmer')} className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-all shrink-0">
                      Weiter zum Stationszimmer <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                  {activeRoom === 'stationszimmer' && isRoom4Unlocked && (
                    <button onClick={() => setActiveRoom('arztzimmer')} className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-all shrink-0">
                      Weiter zum Arztzimmer <ChevronLeft className="w-4 h-4 rotate-180" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Active Case Screen */}
          {activeRoom && activeCase && (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Sticky Top Bar */}
              <div className={`sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b p-4 shrink-0 shadow-sm flex items-center justify-start transition-all duration-300 ${highlightBack ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'border-slate-800'}`}>
                <button 
                  onClick={() => { setActiveCase(null); setHighlightBack(false); }} 
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
                  <div className="absolute top-16 left-4 bg-slate-900 border-2 border-amber-500 p-4 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 max-w-xs">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-amber-500 font-bold text-sm">Hervorragend!</p>
                      <button onClick={() => setHighlightBack(false)} className="text-slate-400 hover:text-white p-0.5"><X className="w-3.5 h-3.5" /></button>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed [text-wrap:pretty]">Akte abgeschlossen! Klicken Sie hier, um in die Raumübersicht zurückzukehren. Haben Sie alle Akten eines Raums gelöst, wird der nächste Raum freigeschaltet.</p>
                    <div className="absolute -top-2 left-8 w-4 h-4 bg-slate-900 border-t-2 border-l-2 border-amber-500 transform rotate-45"></div>
                  </div>
                )}
              </div>
              
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto relative scroll-smooth">
                <CaseViewer caseId={activeCase} onCanComplete={setCanCompleteCase} onUnlockNote={handleUnlockNote} />
              </div>

              {/* Bottom Action Bar */}
              <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 shrink-0 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] z-20">
                {progress.includes(activeCase) ? (
                  <div className="space-y-3">
                    <button disabled className="w-full font-black text-base sm:text-lg py-3 sm:py-4 rounded-xl flex items-center justify-center gap-3 bg-slate-800 text-slate-400 border border-slate-700 cursor-default">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" /> Akte erledigt ✓
                    </button>
                    <button onClick={() => setActiveCase(null)} className="w-full font-black text-sm py-3 rounded-xl flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all uppercase tracking-widest">
                      <ChevronLeft className="w-5 h-5" /> Zurück zur Raumübersicht
                    </button>
                  </div>
                ) : (
                  <button 
                    disabled={!canCompleteCase} 
                    onClick={() => markCaseComplete(activeCase)} 
                    className={`w-full font-black text-base sm:text-lg py-3 sm:py-4 rounded-xl flex items-center justify-center gap-3 transition-all ${
                      canCompleteCase 
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer' 
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-80'
                    }`}
                  >
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
          <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hidden sm:block">Pflegerecht Skills Lab</div>
          <button onClick={() => setShowAdminModal(true)} className="text-slate-600 hover:text-amber-500 transition-colors p-1" title="Admin-Bereich">
            <LockIcon className="w-3 h-3" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 pointer-events-auto">
          <button onClick={() => setShowResetConfirm(true)} className="px-3 py-1.5 bg-slate-900 hover:bg-rose-950 hover:text-rose-400 border border-slate-800 text-slate-400 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Zurücksetzen</span>
          </button>
          
          <button onClick={() => setShowSaveModal(true)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm">
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" /> <span>Speicherplätze</span>
          </button>
        </div>
      </div>

      {/* TUTORIAL MODAL */}
      {tutorialStep > 0 && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border-2 border-amber-500 p-6 sm:p-8 rounded-3xl max-w-lg w-full shadow-2xl text-center relative animate-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4 shadow-inner">
              {tutorialStep === 1 && <Scale className="w-8 h-8 text-amber-500" />}
              {tutorialStep === 2 && <MapIcon className="w-8 h-8 text-amber-500" />}
              {tutorialStep === 3 && <FileText className="w-8 h-8 text-amber-500" />}
              {tutorialStep === 4 && <BookOpen className="w-8 h-8 text-amber-500" />}
              {tutorialStep === 5 && <FolderOpen className="w-8 h-8 text-amber-500" />}
              {tutorialStep === 6 && <Award className="w-8 h-8 text-amber-500" />}
            </div>

            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 px-2.5 py-1 bg-amber-500/10 rounded-full">
              Schritt {tutorialStep} von 6
            </span>

            <h3 className="text-xl font-black text-white mt-3 mb-3">
              {tutorialStep === 1 && "Willkommen auf der chirurgischen Station!"}
              {tutorialStep === 2 && "Die Raumübersicht (Krankenhaus)"}
              {tutorialStep === 3 && "Akten & juristische Fälle"}
              {tutorialStep === 4 && "Gesetzbuch, Notizen & KI-Helfer"}
              {tutorialStep === 5 && "Speicherstände verwalten"}
              {tutorialStep === 6 && "Bereit für die Schicht?"}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-6 [text-wrap:pretty]">
              {tutorialStep === 1 && "Ihre Schicht beginnt. Im Mittelpunkt des heutigen Skills-Lab-Trainings steht das Thema Aufklärung und Einwilligung. Sie werden lernen, wann ein Eingriff eine Körperverletzung darstellt, welche Einwilligungsformen es gibt und wo die strikten rechtlichen Grenzen zwischen ärztlichen und pflegerischen Aufgaben verlaufen. Klicken Sie auf die '01 Anmeldung', um Ihre ersten Arbeitsaufträge abzuholen."}
              {tutorialStep === 2 && "Links sehen Sie die Raumübersicht des Krankenhauses. Klicken Sie auf die Marker, um die Räume (01 Anmeldung, 02 Patientenzimmer, 03 Stationszimmer, 04 Arztzimmer) zu betreten."}
              {tutorialStep === 3 && "Rechts öffnet sich Ihre Aktenübersicht. Hier bearbeiten und lösen Sie die juristischen Fälle und Arbeitsaufträge."}
              {tutorialStep === 4 && "Oben rechts finden Sie Ihre Nachschlagewerke: Das Notizbuch speichert Ihre Erkenntnisse, das Gesetzbuch liefert Ihnen das juristische Fachwissen (§§ 630 BGB ff.). Beides wird mit Ihrem Lernfortschritt erweitert!"}
              {tutorialStep === 5 && "Ganz unten rechts können Sie in verschiedenen Speicherplätzen Ihren Fortschritt sichern, laden oder zurücksetzen."}
              {tutorialStep === 6 && "Falls Sie diese Einführung noch einmal ansehen möchten, klicken Sie auf das Info-Symbol oben rechts. Viel Erfolg beim rechtssicheren Lernen!"}
            </p>

            <div className="flex gap-3 justify-center">
              {tutorialStep > 1 && (
                <button 
                  onClick={() => setTutorialStep(prev => prev - 1)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors"
                >
                  Zurück
                </button>
              )}
              {tutorialStep < 6 ? (
                <button 
                  onClick={() => setTutorialStep(prev => prev + 1)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Weiter
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setTutorialStep(0);
                    localStorage.setItem('praxis-jur-tutorial-v4', 'true');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all"
                >
                  Schicht starten
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* NOTIZBUCH MODAL */}
      {showNotes && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <NotebookPen className="w-5 h-5 text-amber-400" />
                <h3 id="notes-title" className="font-black text-white text-base uppercase tracking-wider">Ihr Juristisches Notizbuch</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handlePrintModal('notes-title', 'notes-content')} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white" title="Drucken">
                  <Printer className="w-4 h-4" />
                </button>
                <button onClick={() => setShowNotes(false)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div id="notes-content" className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {unlockedNotes.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-700 rounded-xl">
                  <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Ihr Notizbuch ist noch leer.</p>
                  <p className="text-slate-500 text-xs mt-1">Sammeln Sie rechtliche Erkenntnisse und Badges beim Bearbeiten der Akten.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {unlockedNotes.includes('note_1') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30">
                      <h4 className="font-bold text-blue-400 text-sm mb-1">Akte 01: Rechtliche Grundlagen der Aufklärung</h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Jeder Heileingriff erfüllt tatbestandlich eine Körperverletzung (§ 223 StGB) und bedarf der wirksamen Einwilligung. Die Aufklärung muss mündlich durch den Arzt erfolgen (strikter Arztvorbehalt). Die Einwilligung erfordert Urteilskraft und Gemütsruhe.
                      </p>
                    </div>
                  )}

                  {unlockedNotes.includes('note_2') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30">
                      <h4 className="font-bold text-rose-400 text-sm mb-1">Akte 02: Praxis-Videos & Aufklärungstypen</h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        <strong>Selbstbestimmungsaufklärung:</strong> Diagnose, Risiken, Behandlungsalternativen – ausschließliche ärztliche Pflicht.<br />
                        <strong>Sicherungsaufklärung:</strong> Therapiebegleitende Verhaltensregeln (z.B. Sturzprophylaxe, Diabetisches Fußsyndrom) – hohe Eigenverantwortung der Pflegefachkräfte.
                      </p>
                    </div>
                  )}

                  {unlockedNotes.includes('note_3') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30">
                      <h4 className="font-bold text-amber-400 text-sm mb-1">Akte 03: Fallbewertung Prämedikation (Herr Yilmaz)</h4>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        Eine Aufklärung in der OP-Schleuse nach Verabreichung sedierender Medikamente ist rechtlich unwirksam (fehlende Urteilskraft & mangelnde Bedenkzeit). Folge: Der Eingriff ist mangels Einwilligung rechtswidrig.
                      </p>
                    </div>
                  )}

                  {unlockedNotes.includes('note_4') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-purple-500/30">
                      <h4 className="font-bold text-purple-400 text-sm mb-1">Akte 04: Die 4 Formen der Einwilligung</h4>
                      <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 mt-1">
                        <li><strong>Konkludent:</strong> Schlüssiges Verhalten (z.B. Arm hinhalten bei Blutentnahme).</li>
                        <li><strong>Mutmaßlich:</strong> Bei unaufschiebbarer Notfallindikation / Bewusstlosigkeit.</li>
                        <li><strong>Ausdrücklich:</strong> Mündlich oder schriftlich vor elektiven Eingriffen.</li>
                        <li><strong>Aufklärungsverzicht:</strong> Zulässig, aber zwingend dokumentationspflichtig!</li>
                      </ul>
                    </div>
                  )}

                  {unlockedNotes.includes('badge_expert_5') && (
                    <div className="bg-purple-950/40 p-4 rounded-xl border border-purple-500/50 flex items-start gap-3">
                      <Award className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white text-sm">🏆 Auszeichnung: Jura-Ass (Akte 05)</h4>
                        <p className="text-purple-200 text-xs mt-0.5">Paragrafen-Quiz fehlerfrei bestanden. Klare Differenzierung zwischen Einwilligungs- und Geschäftsfähigkeit nachgewiesen.</p>
                      </div>
                    </div>
                  )}

                  {unlockedNotes.includes('badge_expert_7') && (
                    <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-500/50 flex items-start gap-3">
                      <Award className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white text-sm">🏆 Auszeichnung: Ethik-Experte (Akte 07)</h4>
                        <p className="text-rose-200 text-xs mt-0.5">Eskalationsmodell der Willensermittlung bei Notfallpatient:innen perfekt geordnet.</p>
                      </div>
                    </div>
                  )}

                  {unlockedNotes.includes('easter_egg_bgb') && (
                    <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-500/50 flex items-start gap-3">
                      <Book className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white text-sm">📖 Easter Egg: Das BGB</h4>
                        <p className="text-amber-200 text-xs mt-0.5">„Wer schreibt, der bleibt.“ Die Pflegedokumentation ist Ihr stärkster juristischer Schutzschild.</p>
                      </div>
                    </div>
                  )}

                  {unlockedNotes.includes('easter_egg_shield') && (
                    <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/50 flex items-start gap-3">
                      <Shield className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white text-sm">🛡️ Easter Egg: Das Schutzschild</h4>
                        <p className="text-emerald-200 text-xs mt-0.5">Delegation der Risikoaufklärung ist unzulässig. Ihr Schutzschild ist das professionelle „Nein“ (Remonstration).</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GESETZBUCH MODAL */}
      {showMethods && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Scale className="w-5 h-5 text-amber-400" />
                <h3 id="methods-title" className="font-black text-white text-base uppercase tracking-wider">Juristisches Gesetzbuch (§§ 630 BGB ff.)</h3>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handlePrintModal('methods-title', 'methods-content')} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white" title="Drucken">
                  <Printer className="w-4 h-4" />
                </button>
                <button onClick={() => setShowMethods(false)} className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div id="methods-content" className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {unlockedMethods.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-700 rounded-xl">
                  <Scale className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Noch keine Paragrafen oder Handlungsleitfäden freigeschaltet.</p>
                  <p className="text-slate-500 text-xs mt-1">Bearbeiten Sie die Akten in den Räumen, um Gesetzestexte und Leitfäden freizuschalten.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {unlockedMethods.includes('aufklaerung') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-amber-400 text-sm mb-1">§ 630e BGB: Aufklärungspflichten & Arztvorbehalt</h4>
                      <p className="text-slate-300 text-xs">
                        Die Aufklärung über Art, Umfang, Durchführung, Risiken und Behandlungsalternativen ist eine <strong>persönliche ärztliche Pflicht</strong>. Eine Delegation an Pflegefachkräfte oder Auszubildende ist unzulässig und unwirksam.
                      </p>
                    </div>
                  )}

                  {unlockedMethods.includes('consent') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-purple-400 text-sm mb-1">§ 630d BGB: Einwilligung (Informed Consent)</h4>
                      <p className="text-slate-300 text-xs">
                        Voraussetzung für eine wirksame Einwilligung:
                        1. Natürliche Einsichts- und Urteilsfähigkeit (unabhängig von Volljährigkeit).
                        2. Vorherige rechtzeitige und verständliche Aufklärung.
                        3. Freiwilligkeit ohne Zwang oder Sedierung.
                        4. Jederzeitige formlose Widerruflichkeit.
                      </p>
                    </div>
                  )}

                  {unlockedMethods.includes('delegation') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-blue-400 text-sm mb-1">Delegationsrecht & § 4 PflBG (Vorbehaltsaufgaben)</h4>
                      <p className="text-slate-300 text-xs">
                        • <strong>Pflegerische Vorbehaltsaufgaben (§ 4 PflBG):</strong> Feststellung des Pflegebedarfs, Pflegeplanung, Steuerung und Evaluation.<br />
                        • <strong>Delegierbare Behandlungspflege:</strong> Injektionen, Blutentnahmen, Verbandswechsel (nach ärztlicher Anordnung und Fachkompetenz).<br />
                        • <strong>Absolutes Delegationsverbot:</strong> Eingriffs- und Risikoaufklärung.
                      </p>
                    </div>
                  )}

                  {unlockedMethods.includes('eskalation') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-rose-400 text-sm mb-1">Stufenprozess der Willensermittlung (§ 1827 BGB)</h4>
                      <p className="text-slate-300 text-xs">
                        1. Akute Notfallindikation (Gefahr im Verzug / Lebenserhaltung)<br />
                        2. Verbindliche Patientenverfügung (§ 1827 Abs. 1 BGB)<br />
                        3. Gesetzlicher Betreuer / Vorsorgebevollmächtigter (§ 1827 Abs. 2 BGB)<br />
                        4. Mutmaßlicher Patientenwille (frühere Aussagen, Wertvorstellungen)
                      </p>
                    </div>
                  )}

                  {unlockedMethods.includes('remonstration') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-emerald-400 text-sm mb-1">Remonstrationspflicht bei unzulässiger Delegation</h4>
                      <p className="text-slate-300 text-xs">
                        Wird Pflegefachkräften oder Auszubildenden eine unzulässige Aufgabe (z.B. Risikoaufklärung) aufgetragen, besteht eine <strong>rechtliche Pflicht zur Weigerung (Remonstration)</strong> und sachlichen Dokumentation, um Haftungsrisiken abzuwenden.
                      </p>
                    </div>
                  )}

                  {unlockedMethods.includes('beweislast') && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-amber-400 text-sm mb-1">§ 630h BGB: Beweislastumkehr & Dokumentation</h4>
                      <p className="text-slate-300 text-xs">
                        Vor Gericht muss der Behandelnde beweisen, dass die Aufklärung ordnungsgemäß erfolgt ist. Nicht dokumentierte Maßnahmen gelten rechtlich als nicht durchgeführt.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FINAL COMPLETION MODAL */}
      {showFinalModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-center relative animate-in zoom-in-95 duration-200">
            
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto mb-5 shadow-lg">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">Geschafft! Sie arbeiten juristisch sicher.</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 [text-wrap:pretty]">
              Sie haben alle 9 Akten der chirurgischen Station gemeistert und bewiesen, dass Sie rechtliche Fallstricke bei Aufklärung und Einwilligung sicher beherrschen.
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left space-y-2 text-xs text-slate-300 mb-6">
              <p><strong className="text-emerald-400">Körperverletzung:</strong> Jeder medizinische Heileingriff erfüllt diesen Tatbestand. Ohne Einwilligung ist er strafbar.</p>
              <p><strong className="text-emerald-400">Arztvorbehalt:</strong> Die Eingriffsaufklärung darf niemals an die Pflege delegiert werden.</p>
              <p><strong className="text-emerald-400">Sicherungsaufklärung:</strong> Für pflegerische Beratung (z.B. Sturzprophylaxe) tragen Sie die Durchführungsverantwortung.</p>
              <p><strong className="text-emerald-400">Beweislast:</strong> In der Arzthaftung gilt die Beweislastumkehr zugunsten des Patienten. Dokumentation ist Ihr bester Schutz!</p>
            </div>

            <button 
              onClick={() => setShowFinalModal(false)}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-colors"
            >
              Abschließen & zur Station zurückkehren
            </button>
          </div>
        </div>
      )}

      {/* SAVE SLOTS MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-amber-500" /> Speicherplätze
              </h3>
              <button onClick={() => setShowSaveModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-3 mb-6">
              {['Slot 1', 'Slot 2', 'Slot 3'].map((slotKey) => {
                const slotData = saveSlots[slotKey];
                return (
                  <div key={slotKey} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-white">{slotKey}</h4>
                      <p className="text-[11px] text-slate-400">
                        {slotData ? `${slotData.date} (${slotData.progress.length}/9 Akten)` : 'Leer'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleSaveSlot(slotKey)}
                        className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded text-xs font-bold transition-colors"
                      >
                        Speichern
                      </button>
                      {slotData && (
                        <button 
                          onClick={() => handleLoadSlot(slotKey)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-bold transition-colors"
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

      {/* RESET CONFIRM MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border-2 border-rose-500 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            <RotateCcw className="w-10 h-10 text-rose-500 mx-auto mb-3" />
            <h3 className="font-bold text-white text-lg mb-1">Fortschritt zurücksetzen?</h3>
            <p className="text-slate-300 text-xs mb-6">
              Möchten Sie alle gelösten Akten und freigeschalteten Notizen unwiderruflich zurücksetzen?
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold">
                Abbrechen
              </button>
              <button onClick={performResetGame} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold">
                Ja, alles zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN MODAL */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <LockIcon className="w-5 h-5 text-amber-500" /> Dozierenden-Modus
              </h3>
              <button onClick={() => setShowAdminModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isAdmin ? (
              <div className="space-y-4">
                <p className="text-emerald-400 text-xs font-bold">✓ Dozierenden-Modus ist aktiv. Alle Räume und Akten sind freigeschaltet.</p>
                <button 
                  onClick={() => {
                    setIsAdmin(false);
                    localStorage.removeItem('praxis-jur-admin-v4');
                    showAchievement('Dozierenden-Modus deaktiviert', 'Reguläre Freischaltungen aktiv.');
                  }}
                  className="w-full py-2 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 rounded-lg text-xs font-bold transition-colors"
                >
                  Dozierenden-Modus deaktivieren
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-400 text-xs">Geben Sie das Passwort ein, um alle Räume für Demonstrationszwecke freizuschalten:</p>
                <input 
                  type="password" 
                  value={adminPassword} 
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Passwort eingeben..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-amber-500"
                />
                <button 
                  onClick={() => {
                    if (adminPassword === 'pflege2026' || adminPassword === 'jura') {
                      setIsAdmin(true);
                      localStorage.setItem('praxis-jur-admin-v4', 'true');
                      setShowAdminModal(false);
                      showAchievement('Dozierenden-Modus aktiv', 'Alle Räume wurden freigeschaltet.');
                    } else {
                      alert('Falsches Passwort!');
                    }
                  }}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
                >
                  Freischalten
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
