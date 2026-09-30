import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  CheckCircle2, 
  ExternalLink, 
  Maximize2, 
  Bot, 
  FileText, 
  Play, 
  Copy, 
  Check, 
  Book, 
  Shield, 
  Scale, 
  HelpCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { CASES } from './constants';
export { CASES };

interface CaseViewerProps {
  caseId: number;
  onCanComplete?: (val: boolean) => void;
  onUnlockNote?: (noteId: string) => void;
}

const StyledTextarea = ({ label, description, value, onChange, placeholder, step, color = "blue" }: any) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const colorMap: any = {
    blue: {
      bg: "bg-blue-600",
      text: "text-blue-400",
      focus: "focus-within:border-blue-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(59,130,246,0.15)]",
      focusBorder: "focus:border-blue-500"
    },
    amber: {
      bg: "bg-amber-600",
      text: "text-amber-400",
      focus: "focus-within:border-amber-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(245,158,11,0.15)]",
      focusBorder: "focus:border-amber-500"
    },
    emerald: {
      bg: "bg-emerald-600",
      text: "text-emerald-400",
      focus: "focus-within:border-emerald-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(16,185,129,0.15)]",
      focusBorder: "focus:border-emerald-500"
    },
    purple: {
      bg: "bg-purple-600",
      text: "text-purple-400",
      focus: "focus-within:border-purple-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(168,85,247,0.15)]",
      focusBorder: "focus:border-purple-500"
    },
    rose: {
      bg: "bg-rose-600",
      text: "text-rose-400",
      focus: "focus-within:border-rose-500",
      shadow: "focus-within:shadow-[0_0_15px_rgba(244,63,94,0.15)]",
      focusBorder: "focus:border-rose-500"
    }
  };

  const activeColor = colorMap[color] || colorMap.blue;

  return (
    <div className={`bg-slate-900 border border-slate-700 p-4 rounded-xl relative group ${activeColor.focus} ${activeColor.shadow} transition-all mb-4`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          {step && <span className={`${activeColor.bg} text-white text-xs font-black w-5 h-5 flex items-center justify-center rounded-full`}>{step}</span>}
          {label && <label className={`text-xs font-bold ${activeColor.text} uppercase tracking-widest`}>{label}</label>}
        </div>
        <button onClick={handleCopy} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors" title="Kopieren">
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      {description && <p className="text-xs text-slate-300 mb-3 leading-relaxed [text-wrap:pretty]">{description}</p>}
      <textarea
        value={value}
        onChange={onChange}
        className={`w-full h-24 p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 ${activeColor.focusBorder} outline-none transition-colors text-sm shadow-inner resize-y`}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

const CopyBlock = ({ title, content, titleColor = "text-blue-400" }: any) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl relative group my-3">
      <div className="flex justify-between items-center mb-3">
        <h5 className={`font-bold ${titleColor} text-sm uppercase tracking-widest`}>{title}</h5>
        <button onClick={handleCopy} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold" title="In die Zwischenablage kopieren">
          {copied ? <><Check className="w-3.5 h-3.5 text-emerald-500" /> Kopiert</> : <><Copy className="w-3.5 h-3.5" /> Prompt kopieren</>}
        </button>
      </div>
      <div className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto bg-slate-900/80 p-3 rounded-lg border border-slate-800 select-all">
        {content}
      </div>
    </div>
  );
};

const VideoPlayerBlock = ({ title, youtubeId, subtitle, linkUrl }: { title: string, youtubeId: string, subtitle?: string, linkUrl: string }) => {
  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl mb-6">
      <div className="p-4 bg-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center shrink-0">
            <Play className="w-5 h-5 fill-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-rose-500/20 text-rose-400 rounded">Lehrvideo</span>
              <h4 className="font-bold text-white text-sm sm:text-base">{title}</h4>
            </div>
            {subtitle && <p className="text-xs text-slate-300 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <a 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors border border-slate-700 shadow-sm"
        >
          Auf YouTube ansehen <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
      <div className="relative aspect-video w-full bg-black">
        <iframe 
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} 
          title={title} 
          className="absolute inset-0 w-full h-full border-0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default function CaseViewer({ caseId, onCanComplete, onUnlockNote }: CaseViewerProps) {
  // Case 1 states
  const [case1Notes, setCase1Notes] = useState(() => localStorage.getItem('praxis-c1-notes') || '');
  const [case1ShowSolution, setCase1ShowSolution] = useState(false);

  // Case 2 states
  const [case2DefSelbst, setCase2DefSelbst] = useState(() => localStorage.getItem('praxis-c2-defselbst') || '');
  const [case2DefSicher, setCase2DefSicher] = useState(() => localStorage.getItem('praxis-c2-defsicher') || '');
  const [case2ShowSolution, setCase2ShowSolution] = useState(false);

  // Case 3 states
  const [case3Evaluation, setCase3Evaluation] = useState(() => localStorage.getItem('praxis-c3-eval') || '');
  const [case3ShowSolution, setCase3ShowSolution] = useState(false);

  // Case 4 states
  const [case4S1, setCase4S1] = useState(() => localStorage.getItem('praxis-c4-s1') || '');
  const [case4S2, setCase4S2] = useState(() => localStorage.getItem('praxis-c4-s2') || '');
  const [case4S3, setCase4S3] = useState(() => localStorage.getItem('praxis-c4-s3') || '');
  const [case4S4, setCase4S4] = useState(() => localStorage.getItem('praxis-c4-s4') || '');
  const [case4ShowSolution, setCase4ShowSolution] = useState(false);

  // Case 5 states (Quiz)
  const [case5Q1, setCase5Q1] = useState<string | null>(null);
  const [case5Q2, setCase5Q2] = useState<{ [key: string]: boolean }>({ A: false, B: false, C: false, D: false, E: false });
  const [case5Q3Text, setCase5Q3Text] = useState(() => localStorage.getItem('praxis-c5-q3text') || '');
  const [case5Q4, setCase5Q4] = useState<string | null>(null);
  const [case5Submitted, setCase5Submitted] = useState(false);
  const [case5Passed, setCase5Passed] = useState(false);

  // Case 6 states (Delegation)
  const [case6Answers, setCase6Answers] = useState<{ [key: number]: string }>({ 1: '', 2: '', 3: '', 4: '' });
  const [case6Submitted, setCase6Submitted] = useState(false);
  const [case6Passed, setCase6Passed] = useState(false);

  // Case 7 states (Eskalationsmodell Order)
  const [case7Slots, setCase7Slots] = useState<{ [key: number]: string }>({ 1: '', 2: '', 3: '', 4: '' });
  const [case7Submitted, setCase7Submitted] = useState(false);
  const [case7Passed, setCase7Passed] = useState(false);

  // Case 8 states
  const [case8Notes, setCase8Notes] = useState(() => localStorage.getItem('praxis-c8-notes') || '');
  const [case8ShowSolution, setCase8ShowSolution] = useState(false);

  // Case 9 states
  const [case9Analysis, setCase9Analysis] = useState(() => localStorage.getItem('praxis-c9-analysis') || '');
  const [case9ShowSolution, setCase9ShowSolution] = useState(false);

  // Save changes
  useEffect(() => { localStorage.setItem('praxis-c1-notes', case1Notes); }, [case1Notes]);
  useEffect(() => { localStorage.setItem('praxis-c2-defselbst', case2DefSelbst); }, [case2DefSelbst]);
  useEffect(() => { localStorage.setItem('praxis-c2-defsicher', case2DefSicher); }, [case2DefSicher]);
  useEffect(() => { localStorage.setItem('praxis-c3-eval', case3Evaluation); }, [case3Evaluation]);
  useEffect(() => { localStorage.setItem('praxis-c4-s1', case4S1); }, [case4S1]);
  useEffect(() => { localStorage.setItem('praxis-c4-s2', case4S2); }, [case4S2]);
  useEffect(() => { localStorage.setItem('praxis-c4-s3', case4S3); }, [case4S3]);
  useEffect(() => { localStorage.setItem('praxis-c4-s4', case4S4); }, [case4S4]);
  useEffect(() => { localStorage.setItem('praxis-c5-q3text', case5Q3Text); }, [case5Q3Text]);
  useEffect(() => { localStorage.setItem('praxis-c8-notes', case8Notes); }, [case8Notes]);
  useEffect(() => { localStorage.setItem('praxis-c9-analysis', case9Analysis); }, [case9Analysis]);

  // Completion criteria handling
  useEffect(() => {
    if (!onCanComplete) return;

    if (caseId === 1) {
      onCanComplete(case1Notes.trim().length > 10);
    } else if (caseId === 2) {
      onCanComplete(case2DefSelbst.trim().length > 5 && case2DefSicher.trim().length > 5);
    } else if (caseId === 3) {
      onCanComplete(case3Evaluation.trim().length > 10);
    } else if (caseId === 4) {
      onCanComplete(case4S1.trim().length > 2 && case4S2.trim().length > 2 && case4S3.trim().length > 2 && case4S4.trim().length > 2);
    } else if (caseId === 5) {
      onCanComplete(case5Passed);
    } else if (caseId === 6) {
      onCanComplete(case6Passed);
    } else if (caseId === 7) {
      onCanComplete(case7Passed);
    } else if (caseId === 8) {
      onCanComplete(case8Notes.trim().length > 10);
    } else if (caseId === 9) {
      onCanComplete(case9Analysis.trim().length > 10);
    }
  }, [
    caseId, 
    case1Notes, 
    case2DefSelbst, 
    case2DefSicher, 
    case3Evaluation, 
    case4S1, 
    case4S2, 
    case4S3, 
    case4S4, 
    case5Passed, 
    case6Passed, 
    case7Passed, 
    case8Notes, 
    case9Analysis, 
    onCanComplete
  ]);

  // Case 5 validation
  const evaluateCase5 = () => {
    const q1Correct = case5Q1 === 'B';
    const q2Correct = case5Q2.A === true && case5Q2.B === false && case5Q2.C === true && case5Q2.D === false && case5Q2.E === true;
    const cleanQ3 = case5Q3Text.trim().toLowerCase();
    const q3Correct = cleanQ3 === 'körperverletzung' || cleanQ3 === 'koerperverletzung' || cleanQ3.includes('körperverletzung') || cleanQ3.includes('koerperverletzung');
    const q4Correct = case5Q4 === 'B';

    const allCorrect = q1Correct && q2Correct && q3Correct && q4Correct;
    setCase5Submitted(true);
    setCase5Passed(allCorrect);

    if (allCorrect && onUnlockNote) {
      onUnlockNote('badge_expert_5');
    }
  };

  // Case 6 validation
  const evaluateCase6 = () => {
    const correct1 = case6Answers[1] === 'delegationsverbot';
    const correct2 = case6Answers[2] === 'delegierbar';
    const correct3 = case6Answers[3] === 'vorbehalt';
    const correct4 = case6Answers[4] === 'sicherungsaufklaerung';

    const allCorrect = correct1 && correct2 && correct3 && correct4;
    setCase6Submitted(true);
    setCase6Passed(allCorrect);
  };

  // Case 7 validation
  const evaluateCase7 = () => {
    // 1: Notfallindikation, 2: Patientenverfügung, 3: Betreuer/Vollmacht, 4: Mutmaßlicher Wille
    const correct1 = case7Slots[1] === 'notfall';
    const correct2 = case7Slots[2] === 'verfuegung';
    const correct3 = case7Slots[3] === 'betreuer';
    const correct4 = case7Slots[4] === 'mutmasslich';

    const allCorrect = correct1 && correct2 && correct3 && correct4;
    setCase7Submitted(true);
    setCase7Passed(allCorrect);

    if (allCorrect && onUnlockNote) {
      onUnlockNote('badge_expert_7');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* CASE 01: RAUM 01 ANMELDUNG */}
      {caseId === 1 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400 font-black text-xs uppercase tracking-wider">Raum 01: Anmeldung</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Akte 01: Rechtliche Aspekte der Aufklärung</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Lieber Kurs, bevor Sie zu den Patient:innen gehen, müssen die rechtlichen Rahmenbedingungen absolut klar sein. Lesen Sie sich die folgenden juristischen Kernauszüge aus dem BGB und dem CNE-Fachartikel sorgfältig durch. Für ein tieferes Verständnis laden Sie sich das vollständige PDF herunter.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2.5 mt-4 pt-3 border-t border-slate-800">
              <a 
                href="https://www.gesetze-im-internet.de/bgb/__630d.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition-colors border border-slate-700 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> § 630d BGB auf gesetze-im-internet.de
              </a>
              <a 
                href="https://www.gesetze-im-internet.de/bgb/__630e.html" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition-colors border border-slate-700 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" /> § 630e BGB auf gesetze-im-internet.de
              </a>
              <a 
                href="https://github.com/jansonjanson/AufklaerungEinwilligunSOL/blob/main/Aufklaerungsgespraech.pdf?raw=true" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded-lg text-xs font-bold transition-colors border border-blue-500/40 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" /> Vollständigen Artikel herunterladen (.pdf)
              </a>
            </div>
          </div>

          {/* In-Game-Document-Viewer */}
          <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-850 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-200">In-Game-Dokument: Juristischer Fachtext & Gesetzestexte</span>
              </div>
              <button 
                onClick={() => onUnlockNote && onUnlockNote('easter_egg_bgb')}
                className="text-slate-500 hover:text-amber-400 transition-colors p-1"
                title="BGB-Auszug untersuchen"
              >
                <Book className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-5 sm:p-6 bg-slate-950/90 text-slate-300 font-serif text-sm leading-relaxed max-h-96 overflow-y-auto space-y-5 border-t border-slate-900 shadow-inner">
              <div className="border-l-4 border-amber-500 pl-4 py-1 bg-amber-500/5 rounded-r">
                <h4 className="font-sans font-black text-amber-400 text-xs uppercase tracking-widest mb-1">Bürgerliches Gesetzbuch (BGB) – Auszug</h4>
                <p className="font-bold text-white text-sm">§ 630d Einwilligung</p>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  (1) Vor Durchführung einer medizinischen Maßnahme [...] ist der Behandelnde verpflichtet, die Einwilligung des Patienten einzuholen.<br />
                  (2) Die Wirksamkeit der Einwilligung setzt voraus, dass der Patient vor der Einwilligung [...] aufgeklärt worden ist.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-1 bg-blue-500/5 rounded-r">
                <p className="font-bold text-white text-sm">§ 630e Aufklärungspflichten</p>
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  (1) Der Behandelnde ist verpflichtet, den Patienten über sämtliche für die Einwilligung wesentlichen Umstände aufzuklären. [...]<br />
                  (2) Die Aufklärung muss:
                </p>
                <ul className="list-disc list-inside mt-1 text-xs sm:text-sm text-slate-300 space-y-1">
                  <li><strong>mündlich durch den Behandelnden</strong> oder durch eine Person erfolgen, die über die zur Durchführung der Maßnahme notwendige Ausbildung verfügt; ergänzend kann auch auf Unterlagen Bezug genommen werden [...],</li>
                  <li><strong>so rechtzeitig erfolgen</strong>, dass der Patient seine Entscheidung [...] wohlüberlegt treffen kann.</li>
                </ul>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <h4 className="font-sans font-black text-blue-400 text-xs uppercase tracking-widest mb-2">CNE-Artikel: Aufklärung und Einwilligung in der Praxis</h4>
                <div className="space-y-2 text-xs sm:text-sm font-sans text-slate-300">
                  <p>
                    <strong className="text-white">I. Tatbestand der Körperverletzung:</strong> Jeder ärztliche Heileingriff stellt tatbestandlich eine Körperverletzung dar (§ 223 StGB). Dies gilt für Operationen, Punktionen und sogar einfache Blutentnahmen. Fehlt die wirksame Einwilligung, ist der Eingriff rechtswidrig.
                  </p>
                  <p>
                    <strong className="text-white">II. Unzulässigkeit der Delegation:</strong> Die Aufklärung muss durch einen Arzt erfolgen, eine Delegation an nichtärztliches Personal ist unstatthaft.
                  </p>
                  <p>
                    <strong className="text-white">III. Urteilskraft und Gemütsruhe:</strong> Die Einholung der ausdrücklichen Einwilligung hat vor dem Eingriff zu erfolgen; sie erfordert die nötige Urteilskraft und Gemütsruhe des Patienten. Das alleinige Aushändigen eines Bogens reicht nicht.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Arbeitsauftrag 1 */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <h3 className="font-bold text-white text-base mb-1">Arbeitsauftrag:</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">
              Posten Sie in die untenstehende Box in eigenen Worten Ihre <strong>drei wichtigsten Erkenntnisse</strong> aus dem Text. (Kein Copy-Paste!).
            </p>

            <StyledTextarea 
              label="Ihre 3 wichtigsten juristischen Erkenntnisse"
              placeholder="1. Körperverletzung: ...&#10;2. Arztvorbehalt: ...&#10;3. Urteilskraft & Gemütsruhe: ..."
              value={case1Notes}
              onChange={(e: any) => setCase1Notes(e.target.value)}
              color="blue"
            />

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button 
                onClick={() => setCase1ShowSolution(!case1ShowSolution)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
              >
                {case1ShowSolution ? 'Musterlösung verbergen' : 'Erkenntnisse mit KI-Tutor / Musterlösung abgleichen'}
              </button>
            </div>

            {case1ShowSolution && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-slate-200 space-y-2 animate-in fade-in">
                <h5 className="font-black text-emerald-400 uppercase tracking-wider text-xs">Musterlösung:</h5>
                <p>Hervorragend. Vergleichen Sie Ihre Notizen mit diesen juristischen Kernfakten:</p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                  <li><strong className="text-white">Körperverletzung:</strong> Jeder Eingriff (auch eine Blutentnahme) ist rechtlich eine Körperverletzung und zwingend einwilligungspflichtig (§ 223 StGB).</li>
                  <li><strong className="text-white">Arztvorbehalt & Mündlichkeit:</strong> Die Aufklärung darf niemals an die Pflege delegiert werden, sie muss mündlich durch einen Arzt erfolgen (§ 630e BGB). Ein Formular allein reicht nicht.</li>
                  <li><strong className="text-white">Urteilskraft:</strong> Die Einwilligung erfordert absolute Urteilskraft und Gemütsruhe des Patienten zum Zeitpunkt der Unterschrift.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 02: RAUM 01 ANMELDUNG */}
      {caseId === 2 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400 font-black text-xs uppercase tracking-wider">Raum 01: Anmeldung</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Akte 02: Patientenaufklärung in der Praxis (Videos)</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Die Theorie sitzt. Sehen Sie sich nun die beiden Praxis-Videos der Rechtsdepesche (mit Prof. Dr. med. Helmut Frohnhofen) an. Hier wird die wichtige Abgrenzung zwischen ärztlicher und pflegerischer Aufklärung sowie die Bedeutung des 'Aufklärungsverzichts' deutlich.
            </p>
          </div>

          {/* Video 1 */}
          <VideoPlayerBlock 
            title="Juristische Aspekte der Patientenaufklärung"
            subtitle="Aufklärungspflicht, Beweislastumkehr (§ 630h BGB) und unzulässige Delegation"
            youtubeId="sg50e_i_PT8"
            linkUrl="https://youtu.be/sg50e_i_PT8?si=nvHiyiHJ7gEWW5Dt"
          />

          {/* Video 2 */}
          <VideoPlayerBlock 
            title="Patienten RICHTIG aufklären! – Prof. Dr. med. Helmut Frohnhofen"
            subtitle="Rechtsdepesche: Praktische Kommunikation, Vulnerabilität & Aufklärungsverzicht"
            youtubeId="dUTMy6FxXuU"
            linkUrl="https://youtu.be/dUTMy6FxXuU?si=DPZRasFGxlk4F8RM"
          />

          {/* Video-Highlights Box */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 mb-6 shadow-md">
            <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <span>💡</span> Wichtige Video-Kernzitate von Prof. Dr. Frohnhofen:
            </h4>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 leading-relaxed">
              <li>Aufklärung basiert auf einer vertrauensvollen Beziehung und verlangt einen freien, unbeeinflussten Willen.</li>
              <li>Bei elektiven Eingriffen muss eine klare räumliche und zeitliche Trennung zwischen Aufklärungsgespräch und OP-Beginn liegen.</li>
              <li>Ein Aufklärungsverzicht des Patienten ist zulässig, muss jedoch zwingend in der Akte dokumentiert werden!</li>
            </ul>
          </div>

          {/* Arbeitsauftrag 2 */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div>
              <h3 className="font-bold text-white text-base mb-1">Arbeitsauftrag:</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Die Videos unterscheiden zwei wesentliche Aufklärungstypen. Definieren Sie in den Feldern, worum es sich handelt und wer die Verantwortung trägt.
              </p>
            </div>

            <StyledTextarea 
              label="Definition & Zuständigkeit: Selbstbestimmungsaufklärung (Eingriffsaufklärung)"
              description="Was umfasst diese Aufklärung und wer darf sie ausschließlich durchführen?"
              placeholder="Definition, Inhalte (Risiken, Diagnose, Alternativen) und ärztliche Zuständigkeit..."
              value={case2DefSelbst}
              onChange={(e: any) => setCase2DefSelbst(e.target.value)}
              color="amber"
            />

            <StyledTextarea 
              label="Definition & Zuständigkeit: Therapeutische Aufklärung (Sicherungsaufklärung)"
              description="Was umfasst diese Aufklärung und welche Rolle spielen Pflegefachkräfte?"
              placeholder="Definition, therapie-sicherndes Verhalten (z.B. Sturzprophylaxe, Nüchternheit, Diabetisches Fußsyndrom) und pflegerische Verantwortung..."
              value={case2DefSicher}
              onChange={(e: any) => setCase2DefSicher(e.target.value)}
              color="emerald"
            />

            <button 
              onClick={() => setCase2ShowSolution(!case2ShowSolution)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
            >
              {case2ShowSolution ? 'Musterlösung verbergen' : 'Musterlösung anzeigen'}
            </button>

            {case2ShowSolution && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-slate-200 space-y-2 animate-in fade-in">
                <h5 className="font-black text-emerald-400 uppercase tracking-wider text-xs">Musterlösung:</h5>
                <p>Bitte prüfen Sie Ihre Definitionen:</p>
                <div className="space-y-2 text-slate-300">
                  <p>
                    <strong className="text-amber-400">Selbstbestimmungsaufklärung:</strong> Klärt über Risiken, Nebenwirkungen, Diagnosen und Behandlungsmethoden auf. Sie ist Grundlage für den freien Willen des Patienten.<br />
                    <strong className="text-white">Zuständigkeit:</strong> Ausschließliche ärztliche Pflicht (striktes Delegationsverbot).
                  </p>
                  <p>
                    <strong className="text-emerald-400">Therapeutische Aufklärung / Sicherungsaufklärung:</strong> Der Patient wird ins Bild gesetzt, wie er sich verhalten muss, um den Heilungserfolg nicht zu gefährden (Compliance), z.B. beim Diabetischen Fußsyndrom, Nüchternheitsregeln oder Sturzprophylaxe.<br />
                    <strong className="text-white">Zuständigkeit:</strong> Hier tragen auch Pflegefachkräfte eine hohe Eigenverantwortung bei der Anleitung und Edukation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 03: RAUM 02 PATIENTENZIMMER */}
      {caseId === 3 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 font-black text-xs uppercase tracking-wider">Raum 02: Patientenzimmer</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Akte 03: Die Prämedikation (Fallvignette)</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Wenden Sie Ihr juristisches Wissen auf ein typisches operatives Krankenhausszenario an.
            </p>
          </div>

          {/* Szenario-Block */}
          <div className="bg-amber-950/20 border-2 border-amber-500/50 p-5 rounded-2xl shadow-lg relative">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-amber-400 text-sm uppercase tracking-wider">Fallvignette: Herr Yilmaz (65)</h3>
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed [text-wrap:pretty]">
              „Herr Yilmaz (65) soll am Vormittag operiert werden. Am Morgen, kurz nach der Gabe eines stark beruhigenden Medikaments (Prämedikation), wird er in der OP-Schleuse vom Assistenzarzt über den bevorstehenden Eingriff aufgeklärt. Herr Yilmaz wirkt sehr schläfrig, nickt aber und unterschreibt den Aufklärungsbogen.“
            </p>
          </div>

          {/* Arbeitsauftrag */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div>
              <h3 className="font-bold text-white text-base mb-1">Arbeitsauftrag:</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Bewerten Sie aus rechtlicher Sicht die Wirksamkeit der Einwilligung von Herrn Yilmaz. Was lief falsch? Begründen Sie Ihre Einschätzung kurz und fachlich korrekt in der Box.
              </p>
            </div>

            <StyledTextarea 
              label="Ihre juristische Bewertung"
              placeholder="Begründen Sie, warum die Einwilligung wirksam oder unwirksam ist (Urteilskraft, zeitlicher Vorlauf, Konsequenzen)..."
              value={case3Evaluation}
              onChange={(e: any) => setCase3Evaluation(e.target.value)}
              color="amber"
            />

            <button 
              onClick={() => setCase3ShowSolution(!case3ShowSolution)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
            >
              {case3ShowSolution ? 'Musterlösung verbergen' : 'Musterlösung anzeigen'}
            </button>

            {case3ShowSolution && (
              <div className="mt-4 p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-slate-200 space-y-3 animate-in fade-in">
                <h5 className="font-black text-emerald-400 uppercase tracking-wider text-xs">Musterlösung:</h5>
                <p className="font-bold text-white">Die Einwilligung ist unwirksam. Begründung:</p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li>
                    <strong className="text-white">Fehlende Urteilskraft & Gemütsruhe:</strong> Herr Yilmaz war durch die Prämedikation medikamentös beeinflusst und besaß nicht mehr die nötige „Urteilskraft und Gemütsruhe“, um die Tragweite der Erklärung zu erfassen.
                  </li>
                  <li>
                    <strong className="text-white">Verletzung der Rechtzeitigkeit:</strong> Es gab keine deutliche Trennung zwischen dem Aufklärungsgespräch und dem Behandlungsgeschehen. Der Patient muss die Möglichkeit haben, die Entscheidung zu reflektieren (ausreichender zeitlicher Vorlauf, bei elektiven Eingriffen mind. 24h!).
                  </li>
                </ol>
                <div className="p-3 bg-rose-950/40 border border-rose-500/40 rounded-lg text-rose-300 font-bold">
                  Folge: Der Eingriff wäre mangels wirksamer Einwilligung eine strafbare Körperverletzung (§ 223 StGB).
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 04: RAUM 02 PATIENTENZIMMER */}
      {caseId === 4 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 font-black text-xs uppercase tracking-wider">Raum 02: Patientenzimmer</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Akte 04: Formen der Einwilligung (Mini-Fälle)</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Einwilligungen müssen nicht immer schriftlich erfolgen. Ordnen Sie den folgenden vier pflegerischen und ärztlichen Alltagssituationen die korrekte juristische Form zu.
            </p>
          </div>

          <div className="space-y-4">
            <StyledTextarea 
              step="1"
              label="Szenario 1: Blutentnahme"
              description="Sie kommen zur routinemäßigen Blutentnahme (venös). Frau Kowalski streckt Ihnen freiwillig den Arm entgegen. Welche Einwilligungsform liegt vor?"
              placeholder="Welche Einwilligungsform liegt vor? (z.B. konkludent...)"
              value={case4S1}
              onChange={(e: any) => setCase4S1(e.target.value)}
              color="blue"
            />

            <StyledTextarea 
              step="2"
              label="Szenario 2: Notfallversorgung"
              description="Ein bewusstloser Patient wird nach einem schweren Autounfall blutend eingeliefert (es droht Lebensgefahr). Keine Angehörigen erreichbar. Auf welcher Basis wird notoperiert?"
              placeholder="Welche rechtliche Grundlage / Einwilligungsform greift hier?"
              value={case4S2}
              onChange={(e: any) => setCase4S2(e.target.value)}
              color="amber"
            />

            <StyledTextarea 
              step="3"
              label="Szenario 3: Geplante Operation"
              description="Geplante, komplexe Hüft-TEP-Operation in 3 Wochen."
              placeholder="Welche Form der Einwilligung und Aufklärung ist hier zwingend?"
              value={case4S3}
              onChange={(e: any) => setCase4S3(e.target.value)}
              color="purple"
            />

            <StyledTextarea 
              step="4"
              label="Szenario 4: Gallengangverletzung & nachträgliche Rüge"
              description="Ein Arzt klärt vor einer Gallen-OP nicht über das Risiko einer Gallengangverletzung auf. Die Komplikation tritt ein. Vor Gericht beruft sich der Arzt darauf, dass der Patient bei Kenntnis des Risikos wegen starker Schmerzen die OP dennoch hätte durchführen lassen. Welche Einwilligungsform meint er?"
              placeholder="Welche besondere juristische Einwilligungsform / Einwand des Behandlers liegt hier vor?"
              value={case4S4}
              onChange={(e: any) => setCase4S4(e.target.value)}
              color="rose"
            />

            <button 
              onClick={() => setCase4ShowSolution(!case4ShowSolution)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
            >
              {case4ShowSolution ? 'Musterlösung verbergen' : 'Musterlösung anzeigen'}
            </button>

            {case4ShowSolution && (
              <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-slate-200 space-y-3 animate-in fade-in">
                <h5 className="font-black text-emerald-400 uppercase tracking-wider text-xs">Hier ist die juristische Einordnung:</h5>
                <ul className="space-y-2 text-slate-300">
                  <li>
                    <strong className="text-blue-400">Szenario 1:</strong> <strong>Konkludente (stillschweigende) Einwilligung.</strong> Das schlüssige Verhalten (Arm hinhalten) reicht bei Routineeingriffen aus.
                  </li>
                  <li>
                    <strong className="text-amber-400">Szenario 2:</strong> <strong>Mutmaßliche Einwilligung.</strong> In unaufschiebbaren Notfällen (Gefahr im Verzug) wird im mutmaßlichen Sinne des Patienten gehandelt.
                  </li>
                  <li>
                    <strong className="text-purple-400">Szenario 3:</strong> <strong>Ausdrückliche (meist schriftliche) Einwilligung</strong> nach rechtzeitiger Selbstbestimmungsaufklärung.
                  </li>
                  <li>
                    <strong className="text-rose-400">Szenario 4:</strong> <strong>Hypothetische Einwilligung</strong> (Einwand des Behandelnden nach § 630h Abs. 2 BGB; unterliegt vor Gericht sehr strengen Hürden!).
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 05: RAUM 03 STATIONSZIMMER (JURA-QUIZ) */}
      {caseId === 5 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-400 font-black text-xs uppercase tracking-wider">Raum 03: Stationszimmer</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Akte 05: Das große Jura-Quiz</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Sie kennen nun die Theorie aus Raum 01 und 02. Bevor Sie im ärztlichen Dienst intervenieren dürfen, müssen die harten juristischen Fakten sitzen.
            </p>
          </div>

          <div className="space-y-5">
            {/* Frage 1 */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Frage 1 (Single Choice): Der rechtliche Status des OP-Eingriffs</span>
              <p className="text-sm font-bold text-white">
                Wie wird ein operativer Heileingriff (z.B. Appendektomie) nach ständiger Rechtsprechung des BGH rechtlich bewertet, bevor eine wirksame Einwilligung vorliegt?
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                {[
                  { id: 'A', text: 'Als rechtmäßiger Heileingriff, sofern er medizinisch indiziert ist.' },
                  { id: 'B', text: 'Als tatbestandliche Körperverletzung (§ 223 StGB).' },
                  { id: 'C', text: 'Als vertragliche Dienstleistung.' }
                ].map((opt) => (
                  <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${case5Q1 === opt.id ? 'bg-purple-950/40 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                    <input 
                      type="radio" 
                      name="q1" 
                      checked={case5Q1 === opt.id} 
                      onChange={() => setCase5Q1(opt.id)}
                      className="accent-purple-500" 
                    />
                    <span><strong>{opt.id})</strong> {opt.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Frage 2 */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Frage 2 (Multiple Choice): Formen der Einwilligung</span>
              <p className="text-sm font-bold text-white">
                Welche Aussagen zu Einwilligungsformen sind richtig? (Wählen Sie alle passenden aus)
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                {[
                  { id: 'A', text: 'Eine konkludente Einwilligung liegt z. B. vor, wenn der Patient bei der Blutentnahme freiwillig den Arm hinstreckt.' },
                  { id: 'B', text: 'Eine mutmaßliche Einwilligung kann nur angenommen werden, wenn der Patient zuvor ausdrücklich zugestimmt hat.' },
                  { id: 'C', text: 'Eine hypothetische Einwilligung liegt vor, wenn bei lückenhafter Aufklärung der Patient bei Kenntnis aller Umstände trotzdem eingewilligt hätte.' },
                  { id: 'D', text: 'Eine ausdrückliche Einwilligung muss immer schriftlich erfolgen, sonst ist sie ungültig.' },
                  { id: 'E', text: 'Eine mutmaßliche Einwilligung kann bei Bewusstlosigkeit angenommen werden, wenn der Eingriff dem mutmaßlichen Willen entspricht.' }
                ].map((opt) => (
                  <label key={opt.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${case5Q2[opt.id] ? 'bg-purple-950/40 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                    <input 
                      type="checkbox" 
                      checked={case5Q2[opt.id]} 
                      onChange={(e) => setCase5Q2({ ...case5Q2, [opt.id]: e.target.checked })}
                      className="accent-purple-500 mt-0.5" 
                    />
                    <span><strong>{opt.id})</strong> {opt.text}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Frage 3 (Lückentext) */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Frage 3 (Lückentext): Tatbestand des Heileingriffs</span>
              <p className="text-sm font-bold text-white">
                „Jeder ärztliche Heileingriff erfüllt nach ständiger Rechtsprechung ohne wirksame Einwilligung zunächst den Straftatbestand der __________ (§ 223 StGB).“
              </p>
              <input 
                type="text"
                value={case5Q3Text}
                onChange={(e) => setCase5Q3Text(e.target.value)}
                placeholder="Begriff eingeben (z.B. Körperverletzung)..."
                className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-slate-200 focus:border-purple-500 outline-none text-sm shadow-inner"
              />
            </div>

            {/* Frage 4 (Beweislast) */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Frage 4 (Single Choice): Beweislast nach § 630h BGB</span>
              <p className="text-sm font-bold text-white">
                Wer trägt nach § 630h BGB in einem Zivilprozess die Beweislast dafür, dass ordnungsgemäß und rechtzeitig aufgeklärt wurde?
              </p>
              <div className="space-y-2 text-xs sm:text-sm">
                {[
                  { id: 'A', text: 'Der Patient' },
                  { id: 'B', text: 'Die Behandlerseite (Arzt / Klinik)' },
                  { id: 'C', text: 'Die Krankenkasse' }
                ].map((opt) => (
                  <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${case5Q4 === opt.id ? 'bg-purple-950/40 border-purple-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'}`}>
                    <input 
                      type="radio" 
                      name="q4" 
                      checked={case5Q4 === opt.id} 
                      onChange={() => setCase5Q4(opt.id)}
                      className="accent-purple-500" 
                    />
                    <span><strong>{opt.id})</strong> {opt.text}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={evaluateCase5}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-colors"
            >
              Quiz auswerten & Freischaltung prüfen
            </button>

            {case5Submitted && (
              <div className={`p-4 rounded-xl border text-sm ${case5Passed ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-rose-950/40 border-rose-500 text-rose-300'}`}>
                {case5Passed ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <strong>Hervorragend gelöst!</strong> Alle 4 Fragen wurden juristisch präzise beantwortet. Badge <strong>„Jura-Ass (Akte 05)“</strong> freigeschaltet!
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <strong>Noch nicht ganz korrekt.</strong> Bitte überprüfen Sie Ihre Antworten (Tipp: Frage 2 hat 3 richtige Antworten, Frage 3 ist "Körperverletzung", Frage 4 = Behandlerseite).
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 06: RAUM 03 STATIONSZIMMER (GRENZEN DER DELEGATION) */}
      {caseId === 6 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-400 font-black text-xs uppercase tracking-wider">Raum 03: Stationszimmer</span>
            <div className="flex items-center justify-between mt-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">Akte 06: Die Grenzen der Delegation</h2>
              <button 
                onClick={() => onUnlockNote && onUnlockNote('easter_egg_shield')}
                className="text-slate-500 hover:text-amber-400 transition-colors p-1"
                title="Schutzschild der Pflege untersuchen"
              >
                <Shield className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Als Pflegefachkraft arbeiten Sie in vertikaler Arbeitsteilung mit dem ärztlichen Dienst. Aber nicht alles ist delegierbar. Ordnen Sie zu, in wessen Verantwortungsbereich die folgenden Aufgaben fallen.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            {[
              { id: 1, text: 'Aufklärung über seltene, aber typische Operationsrisiken.' },
              { id: 2, text: 'Venöse Blutentnahme und subkutane Injektionen.' },
              { id: 3, text: 'Feststellung des individuellen Pflegebedarfs.' },
              { id: 4, text: 'Aufklärung des Patienten über das Sturzrisiko nach Schlafmittelgabe.' }
            ].map((task) => (
              <div key={task.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{task.id}</span>
                  <p className="text-white text-xs sm:text-sm font-bold">{task.text}</p>
                </div>
                <select 
                  value={case6Answers[task.id]} 
                  onChange={(e) => setCase6Answers({ ...case6Answers, [task.id]: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-200 outline-none focus:border-purple-500"
                >
                  <option value="">-- Verantwortungsbereich auswählen --</option>
                  <option value="delegationsverbot">Absolutes Delegationsverbot (Ärztliche Kernaufgabe)</option>
                  <option value="delegierbar">Delegierbare ärztliche Maßnahme (Behandlungspflege)</option>
                  <option value="vorbehalt">Pflegerische Vorbehaltsaufgabe (§ 4 PflBG)</option>
                  <option value="sicherungsaufklaerung">Pflegerische Sicherungsaufklärung</option>
                </select>
              </div>
            ))}

            <button 
              onClick={evaluateCase6}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-colors"
            >
              Zuordnung überprüfen
            </button>

            {case6Submitted && (
              <div className={`p-4 rounded-xl border text-sm ${case6Passed ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-rose-950/40 border-rose-500 text-rose-300'}`}>
                {case6Passed ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <strong>Perfekt zugeordnet!</strong> Die rechtlichen Grenzen zwischen Arztvorbehalt, Behandlungs- und Sicherungspflege sind eindeutig geklärt.
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <strong>Einige Zuordnungen stimmen noch nicht.</strong> Denken Sie daran: Risikoaufklärung = Arztvorbehalt, Blutentnahme = delegierbare Maßnahme, Pflegebedarf = Vorbehalt § 4 PflBG, Sturzrisiko = Sicherungsaufklärung.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 07: RAUM 04 ARZTZIMMER (ESKALATIONSMODELL) */}
      {caseId === 7 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 font-black text-xs uppercase tracking-wider">Raum 04: Arztzimmer</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Akte 07: Das Eskalationsmodell (Willensermittlung)</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Ein bewusstloser Notfallpatient wird eingeliefert. Ordnen Sie die rechtlichen Stufen der Willensermittlung in die korrekte chronologische Reihenfolge, bevor Sie handeln.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            {[1, 2, 3, 4].map((slotNum) => (
              <div key={slotNum} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-black uppercase tracking-wider text-rose-400 shrink-0">Stufe {slotNum}:</span>
                <select 
                  value={case7Slots[slotNum]} 
                  onChange={(e) => setCase7Slots({ ...case7Slots, [slotNum]: e.target.value })}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs sm:text-sm text-slate-200 outline-none focus:border-rose-500"
                >
                  <option value="">-- Stufe auswählen --</option>
                  <option value="mutmasslich">Mutmaßlicher Wille (Ethische Abwägung)</option>
                  <option value="notfall">Notfallindikation / Vitalgefahr (Sofortiges Handeln)</option>
                  <option value="betreuer">Gesetzlicher Betreuer / Bevollmächtigter</option>
                  <option value="verfuegung">Suche nach Patientenverfügung</option>
                </select>
              </div>
            ))}

            <button 
              onClick={evaluateCase7}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-lg transition-colors"
            >
              Reihenfolge überprüfen
            </button>

            {case7Submitted && (
              <div className={`p-4 rounded-xl border text-sm ${case7Passed ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-rose-950/40 border-rose-500 text-rose-300'}`}>
                {case7Passed ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <strong>Hervorragend!</strong> Sie haben das Eskalationsmodell fehlerfrei durchschaut. Badge <strong>„Ethik-Experte (Akte 07)“</strong> freigeschaltet!
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <strong>Reihenfolge noch nicht ganz richtig.</strong> Chronologie: 1. Notfallindikation → 2. Suche nach Patientenverfügung → 3. Gesetzlicher Betreuer / Vorsorgevollmacht → 4. Mutmaßlicher Wille.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 08: RAUM 04 ARZTZIMMER (KI-LABOR & REMONSTRATION) */}
      {caseId === 8 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 font-black text-xs uppercase tracking-wider">Raum 04: Arztzimmer</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Akte 08: KI-Labor & Remonstration</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Üben Sie das rechtssichere Handeln und die professionelle Remonstration bei unzulässiger Delegation mithilfe sokratischer KI-Prompts.
            </p>
          </div>

          {/* Schritt 1: Beobachtung */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center">1</span>
              <h3 className="font-bold text-white text-base">Schritt 1: Reale Konfliktsituation (Herr Chen)</h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty] bg-slate-950 p-4 rounded-xl border border-slate-800">
              „Sie bereiten Herrn Chen auf seine OP vor. Der gestresste Chirurg kommt ins Patientenzimmer, legt den leeren Aufklärungsbogen auf den Nachttisch und sagt zu Ihnen: <em>'Ich muss sofort in den OP 2, Notfall. Klären Sie Herrn Chen bitte kurz über die Schnittführung auf und lassen Sie ihn hier unterschreiben, sonst fällt sein Termin heute aus.'</em> Notieren Sie roh, was hier rechtlich falsch läuft.“
            </p>

            <StyledTextarea 
              label="Ihre Roh-Notizen zur Situation"
              placeholder="Was läuft hier rechtlich schief? (Arztvorbehalt, Zeitdruck, fehlende Mündlichkeit, Remonstrationspflicht)..."
              value={case8Notes}
              onChange={(e: any) => setCase8Notes(e.target.value)}
              color="rose"
            />
          </div>

          {/* Schritt 2: Prompt A */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-black text-xs flex items-center justify-center">2</span>
              <h3 className="font-bold text-white text-base">Schritt 2: Prompt A – Sokratischer Lern-Dialog</h3>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed [text-wrap:pretty]">
              Kopieren Sie diesen Prompt in den digitalen KI-Helfer (Google NotebookLM), um sich sokratisch befragen zu lassen:
            </p>

            <CopyBlock 
              title="Prompt A: Sokratischer Dialog mit dem KI-Tutor"
              content={`C: Agiere als Jura-Dozent in der Pflegeausbildung.
R: Führe einen sokratischen Dialog mit mir. Hilf mir, meine rohen Beobachtungen rechtlich einzuordnen. Schwerpunkt: Ärztliches Delegationsverbot der Aufklärung und meine Remonstrationspflicht.
A: Stelle nur EINE offene Frage. Gib keine fertigen Lösungen vor. Zwinge mich, die rechtlichen Vorgaben selbst anzuwenden.
E: Starte den Dialog basierend auf diesen Notizen: ${case8Notes || '[Ihre Notizen aus Schritt 1]'}`}
              titleColor="text-purple-400"
            />

            <a 
              href="https://notebook.google.com/notebook/36294d79-a601-4870-a351-53ab8c954ac3" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white rounded-lg text-xs font-bold transition-colors border border-purple-500/40"
            >
              <Bot className="w-4 h-4" /> Zum KI-Helfer in Google NotebookLM
            </a>
          </div>

          {/* Schritt 3: Prompt B */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-black text-xs flex items-center justify-center">3</span>
              <h3 className="font-bold text-white text-base">Schritt 3: Prompt B – Generator für rechtssichere Dokumentation</h3>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed [text-wrap:pretty]">
              Nutzen Sie diesen Prompt, um Ihre Weigerung (Remonstration) sachlich und gerichtsfest zu formulieren:
            </p>

            <CopyBlock 
              title="Prompt B: Rechtssicherer Doku- & CIRS-Generator"
              content={`C: Agiere als Experte für Pflegedokumentation und Arzthaftung.
R: Übersetze meine unstrukturierten Beobachtungsnotizen in einen rechtssicheren, sachlichen Dokumentationseintrag oder eine CIRS-Meldung, der meine fachliche Weigerung (Remonstration) belegt.
A: Absolut sachlich, wertfrei, keine Emotionen. Fokussiere dich auf Fakten, Uhrzeiten und die abgelehnte Delegation.
E: Meine Notizen: ${case8Notes || '[Ihre Notizen aus Schritt 1]'}`}
              titleColor="text-blue-400"
            />
          </div>

          {/* Schritt 4: Fobizz Transfer */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black text-xs flex items-center justify-center">4</span>
              <h3 className="font-bold text-white text-base">Schritt 4: Fobizz Azubi-Board</h3>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed [text-wrap:pretty]">
              Kopieren Sie Ihren finalen, rechtssicheren Dokumentationseintrag und posten Sie ihn auf dem digitalen fobizz Azubi-Board:
            </p>

            <div className="h-96 w-full rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
              <iframe 
                src="https://tools.fobizz.com/boards/embed/dc44fa12-32b0-466d-8b43-ce066e409b30" 
                title="fobizz Azubi-Board" 
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* CASE 09: RAUM 04 ARZTZIMMER (BEWEISLAST & DOKUMENTATION) */}
      {caseId === 9 && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-400 font-black text-xs uppercase tracking-wider">Raum 04: Arztzimmer</span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-2">Akte 09: Beweislast & Dokumentation</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">
              Schützen Sie sich und Patient:innen durch rechtssichere Dokumentationsroutinen.
            </p>
          </div>

          {/* Szenario */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
            <h3 className="font-bold text-white text-base">Szenario:</h3>
            <p className="text-slate-200 text-sm leading-relaxed [text-wrap:pretty] bg-slate-950 p-4 rounded-xl border border-slate-800">
              „Eine Operation ist handwerklich perfekt verlaufen, doch der Patient klagt auf Schmerzensgeld wegen einer angeblich fehlenden Risikoaufklärung. Es steht Aussage gegen Aussage.“
            </p>

            <h3 className="font-bold text-white text-base pt-2">Arbeitsauftrag:</h3>
            <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
              Lesen Sie den In-Game-Auszug zu § 630h BGB. Wer muss in einem Gerichtsprozess beweisen, dass die Aufklärung ordnungsgemäß und rechtzeitig stattgefunden hat? Welche Rolle spielt dabei Ihre Pflegedokumentation?
            </p>

            {/* In-Game-Reader */}
            <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">§ 630h BGB (Beweislast bei Haftung für Behandlungs- und Aufklärungsfehler)</span>
              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed italic">
                (2) Der Behandelnde hat zu beweisen, dass er eine Einwilligung gemäß § 630d eingeholt und entsprechend den Anforderungen des § 630e aufgeklärt hat. Genügt die Aufklärung nicht den Anforderungen, kann der Behandelnde sich darauf berufen, dass der Patient auch im Falle einer ordnungsgemäßen Aufklärung in die Maßnahme eingewilligt hätte.
              </p>
            </div>

            <StyledTextarea 
              label="Ihre rechtliche Analyse zur Beweislast"
              placeholder="Wer trägt die Beweislast? Welche Bedeutung hat die Pflegedokumentation vor Gericht? ('Wer schreibt, der bleibt')..."
              value={case9Analysis}
              onChange={(e: any) => setCase9Analysis(e.target.value)}
              color="rose"
            />

            <button 
              onClick={() => setCase9ShowSolution(!case9ShowSolution)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700"
            >
              {case9ShowSolution ? 'Musterlösung verbergen' : 'Antwort juristisch auswerten / Musterlösung anzeigen'}
            </button>

            {case9ShowSolution && (
              <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs sm:text-sm text-slate-200 space-y-2 animate-in fade-in">
                <h5 className="font-black text-emerald-400 uppercase tracking-wider text-xs">Musterlösung:</h5>
                <p>
                  <strong>Korrekt analysiert!</strong> In der Arzthaftung gilt die <strong>Beweislastumkehr zugunsten des Patienten</strong>. Das Krankenhaus muss beweisen, dass richtig und rechtzeitig aufgeklärt wurde.
                </p>
                <p>
                  Ihre Pflegedokumentation ist hierbei das wichtigste juristische Schutzschild (<em>„Wer schreibt, der bleibt“</em>). Fehlt die Dokumentation in der Patientenakte, geht das Gericht nach § 630h BGB davon aus, dass die Maßnahme oder Aufklärung <strong>nicht stattgefunden hat</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
