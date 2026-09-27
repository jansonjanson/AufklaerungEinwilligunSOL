import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, ExternalLink, Maximize2, Bot, FileText, ArrowRight, Play, Copy, Check, ChevronRight, Lock as LockIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CASES = [
  { id: 1, roomId: 'empfang', title: 'Akte 01: Das Erstgespräch (Icebreaker)', tag: 'Doku-Start', subtitle: 'Lade das Erstgespräch herunter und fülle es aus.' },
  { id: 2, roomId: 'empfang', title: 'Akte 02: Die Digitale Zentrale', tag: 'Tool-Intro', subtitle: 'Fobizz Pinnwand als digitales Unterstützungstool.' },
  { id: 3, roomId: 'zimmer', title: 'Akte 03: Ärztliche vs. Pflegerische Aufklärung', tag: 'Grenzen der Delegation', subtitle: 'Grenzen der Aufklärung und Delegation bei Frau Meinhardt klären.' },
  { id: 4, roomId: 'zimmer', title: 'Akte 04: Die 4 Säulen der wirksamen Einwilligung', tag: 'Informed Consent', subtitle: 'Informed Consent: Wann ist eine Einwilligung rechtlich bindend?' },
  { id: 5, roomId: 'zimmer', title: 'Akte 05: Jura-Check (Quiz)', tag: 'Jura-Check', subtitle: 'Patientenzimmer freischalten: Teste dein Rechtswissen!' },
  { id: 6, roomId: 'buero', title: 'Akte 06: Das Eskalationsmodell bei Einwilligungsunfähigkeit', tag: 'Mutmaßliche Einwilligung', subtitle: 'Der 6-stufige Stufenprozess bei nicht einwilligungsfähigen Patient:innen.' },
  { id: 7, roomId: 'buero', title: 'Akte 07: Wissenstest: Eskalationsmodell (Quiz)', tag: 'Wissenstest', subtitle: 'Teste dein Wissen zur mutmaßlichen Einwilligung und Willensermittlung.' },
  { id: 8, roomId: 'pdbuero', title: 'Akte 08: Fallsimulation: Der graue Bereich der Aufklärung', tag: 'Recht & KI-Labor', subtitle: 'Komplexe Fallsimulation: Azubi Emma, Assistenzarzt & Herr Müller.' }
];

interface CaseViewerProps {
  caseId: number;
}


const StyledTextarea = ({ label, description, value, onChange, placeholder, step, color = "blue" }: any) => {
  const [copied, setCopied] = React.useState(false);
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
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl relative group">
      <div className="flex justify-between items-center mb-3">
        <h5 className={`font-bold ${titleColor} text-sm uppercase tracking-widest`}>{title}</h5>
        <button onClick={handleCopy} className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors" title="In die Zwischenablage kopieren">
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
        {content}
      </div>
    </div>
  );
};

export default function CaseViewer({ caseId, onCanComplete, onUnlockNote }: CaseViewerProps & { onCanComplete?: (val: boolean) => void, onUnlockNote?: (noteId: string) => void }) {
  const [hasCopied, setHasCopied] = useState(false);
  

  const [boardModal, setBoardModal] = useState<string | null>(null);
  const [largeQr, setLargeQr] = useState<string | null>(null);

  // States for Akte 03: Ärztliche vs. Pflegerische Aufklärung
  const [eingriffsAufklaerungText, setEingriffsAufklaerungText] = useState('');
  const [sicherungsAufklaerungText, setSicherungsAufklaerungText] = useState('');
  const [therapeutischeAufklaerungText, setTherapeutischeAufklaerungText] = useState('');

  // States for Akte 04: Die 4 Säulen der wirksamen Einwilligung
  const [saeule1, setSaeule1] = useState('');
  const [saeule2, setSaeule2] = useState('');
  const [saeule3, setSaeule3] = useState('');
  const [saeule4, setSaeule4] = useState('');

  const [isSaved, setIsSaved] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Quizzes state (Akte 05 Jura-Check & Akte 07 Eskalationsmodell)
  const [case5QuizStep, setCase5QuizStep] = useState(0);
  const [juraCheckScore, setJuraCheckScore] = useState(0);
  const [case5Mistakes, setCase5Mistakes] = useState(0);
  const [case7QuizStep, setCase7QuizStep] = useState(0);
  const [case7Score, setCase7Score] = useState(0);
  const [case7Mistakes, setCase7Mistakes] = useState(0);
  
  // Case 8 Notes & States
  const [case8Notes, setCase8Notes] = useState('');
  const [case8Einschaetzung, setCase8Einschaetzung] = useState('');
  const [case8Handlung, setCase8Handlung] = useState('');
  
  const [case5Q2Answers, setCase5Q2Answers] = useState<Record<string, boolean>>({});
  const [case5Q3Text, setCase5Q3Text] = useState('');
  
  const [case7Q2Answers, setCase7Q2Answers] = useState<Record<string, boolean>>({});
  const [case7Q4Slots, setCase7Q4Slots] = useState<Record<number, string>>({});
  const [case5Feedback, setCase5Feedback] = useState<{msg: string, isError: boolean, showNext?: boolean} | null>(null);
  const [case7Feedback, setCase7Feedback] = useState<{msg: string, isError: boolean, showNext?: boolean} | null>(null);

  React.useEffect(() => {
    setIsSaved(false);
    setHasCopied(false);
  }, [caseId]);
  
  React.useEffect(() => {
    if (caseId === 5 && case5QuizStep === 4 && juraCheckScore === 4) {
      if (case5Mistakes === 0) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#fbbf24', '#f59e0b', '#d97706'] });
        if (onUnlockNote) onUnlockNote('badge_expert_5');
      } else {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, [caseId, case5QuizStep, juraCheckScore, case5Mistakes, onUnlockNote]);

  React.useEffect(() => {
    if (caseId === 7 && case7QuizStep === 4 && case7Score === 4) {
      if (case7Mistakes === 0) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors: ['#fbbf24', '#f59e0b', '#d97706'] });
        if (onUnlockNote) onUnlockNote('badge_expert_7');
      } else {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }
  }, [caseId, case7QuizStep, case7Score, case7Mistakes, onUnlockNote]);

  React.useEffect(() => {
    if (caseId === 5) {
      if (onCanComplete) onCanComplete(case5QuizStep === 4);
    } else if (caseId === 7) {
      if (onCanComplete) onCanComplete(case7QuizStep === 4);
    } else {
      if (onCanComplete) onCanComplete(true);
    }
  }, [caseId, case5QuizStep, case7QuizStep, onCanComplete]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`Rechtliche Aufklärung & Delegation (Frau Meinhardt):\n\n1. Eingriffsaufklärung (Arztvorbehalt):\n${eingriffsAufklaerungText}\n\n2. Sicherungsaufklärung (Pflegeaufgabe):\n${sicherungsAufklaerungText}\n\n3. Therapeutische Aufklärung (Interprofessionell):\n${therapeutischeAufklaerungText}`);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCase4 = () => {
    navigator.clipboard.writeText(`Die 4 Säulen der wirksamen Einwilligung (Informed Consent):\n\nSäule 1 (Einwilligungsfähigkeit):\n${saeule1}\n\nSäule 2 (Aufklärung):\n${saeule2}\n\nSäule 3 (Freiwilligkeit):\n${saeule3}\n\nSäule 4 (Widerruflichkeit):\n${saeule4}`);
    setCopied(true);
    setHasCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

    const renderBoard = (url: string, title: string) => {
    const rawUrl = url.replace('?embed=true&', '?');
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(rawUrl)}`;
    
    let password = null;
    if (title.toLowerCase().includes('pa-team')) {
      password = 'Praxisanleitung';
    } else if (title.toLowerCase().includes('azubi')) {
      password = 'Auszubildende';
    }

    return (
      <div className="bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-700 my-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <div>
            <h4 className="text-amber-500 font-bold text-lg mb-2 [text-wrap:balance]">{title}</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              <button onClick={() => setBoardModal(url)} className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-950 border border-slate-600 rounded-lg text-sm text-white transition-colors">
                <Maximize2 className="w-4 h-4" /> Vollbild
              </button>
              <a href={rawUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 rounded-lg text-sm transition-colors">
                <ExternalLink className="w-4 h-4" /> Neuen Tab öffnen
              </a>
            </div>
            {password && (
              <p className="text-sm text-slate-300 mt-2">
                Passwort: <strong className="text-amber-500 font-mono tracking-wider">{password}</strong>
              </p>
            )}
          </div>
          <button 
            onClick={() => setLargeQr(qrUrl)}
            className="bg-white p-2 rounded shadow-md shrink-0 self-start sm:self-auto hover:scale-105 transition-transform cursor-pointer border-2 border-transparent hover:border-amber-500"
            title="QR Code vergrößern"
          >
            <img src={qrUrl} alt={`QR Code ${title}`} className="w-16 h-16" />
          </button>
        </div>
        <div className="w-full h-[500px] bg-slate-900 rounded-lg overflow-hidden border border-slate-600 relative">
          <iframe src={url} frameBorder="0" className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const renderDocumentationStep = (stepNumber: string | number, name: string) => (
    <div className="flex gap-4 p-4 bg-blue-900/20 rounded-xl border border-blue-500/30 mt-6">
      <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">{stepNumber}</div>
      <div className="w-full">
        <h4 className="font-bold text-blue-400 mb-1 [text-wrap:balance]">Praxisanleitungsnachweis dokumentieren</h4>
        <p className="text-sm text-slate-300 mb-4 leading-relaxed [text-wrap:pretty]">
          Lade dir nach Erfüllung der aktuellen Arbeitsaufträge das Dokument "Praxisanleitungsnachweis" herunter und fülle es für {name} aus. Lade es anschließend auf dem fobizz Auszubildenden-Board in der Spalte für {name} hoch.
        </p>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 mb-4 space-y-2 text-sm text-slate-300">
          <p className="font-bold text-slate-200">So gehst du vor:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Klicke in Spalte "{name}" auf <strong>Karte hinzufügen</strong>.</li>
            <li>Gib der Karte einen Namen (z. B. "{name} Praxisanleitungsnachweis").</li>
            <li>Klicke auf <strong>Anlegen</strong>.</li>
            <li>Klicke die neue Karte an und lade dein Dokument unter Anhänge hoch (Dokument per Drag & Drop hochladen oder ein Klick auf „Hinzufügen“ und Datei auswählen).</li>
            <li>Klicke abschließend auf <strong>Speichern</strong>.</li>
          </ol>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          <a href="https://github.com/jansonjanson/assetsdokufeedbackreflexion/raw/main/Praxisanleitung.docx" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg text-sm">
            <FileText className="w-4 h-4" /> Download Nachweis
          </a>
        </div>
        {renderBoard("https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?embed=true&token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8", "fobizz Azubi-Board")}
      </div>
    </div>
  );

  switch (caseId) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white [text-wrap:balance]">Was erwartet dich hier?</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Wir lernen uns kennen, indem wir den Erstgesprächsbogen ausfüllen. Wir lernen das erste Beispiel für ein Dokumentationsformular in der Ausbildung kennen und beschäftigen uns bereits einmal kurz mit einem digitalen Unterstützungstool (unserem Fobizz PA-Board). 
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-amber-500 uppercase tracking-widest text-sm mb-4 [text-wrap:balance]">Dein Auftrag</h4>
              
              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">1</div>
                <div className="pt-1 w-full">
                  <p className="text-slate-200 font-bold mb-2">Lade das Dokument „Erstgespräch“ herunter.</p>
                  <a href="https://github.com/jansonjanson/assetsdokufeedbackreflexion/blob/main/Erstgespr%C3%A4ch.docx?raw=true" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg font-bold text-sm transition-colors border border-blue-500/30 mb-4">
                    <FileText className="w-4 h-4" /> Direktdownload (.docx)
                  </a>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">Alternativ kannst du das Dokument auch hier vom fobizz PA-Team Board herunterladen. Beide Wege stehen dir im Alltag offen.</p>
                  {renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz PA-Team Board")}
                </div>
              </div>
              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">2</div>
                <div className="pt-1">
                  <p className="text-slate-200 font-bold">Fülle das Dokument für dich aus.</p>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed [text-wrap:pretty]">Trage deinen Namen und deinen "Praxiseinsatzort" (also dort, wo du tätig bist) ein. Fülle dann die ersten beiden Kategorien <strong>"Reflexion der Ausbildungssituation"</strong> und <strong>"Ziele des Praxiseinsatzes"</strong> aus. Den restlichen Teil kannst du auslassen, bitte sieh ihn dir aber einmal an und lies ihn dir durch.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-black flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">3</div>
                <div className="pt-1 w-full">
                  <p className="text-slate-200 font-bold mb-2">Lade es in der Spalte „Upload Icebreaker Erstgespräch“ wieder hoch.</p>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">Nutze dafür das eingebettete fobizz PA-Team Board hier unten (oder öffne es im neuen Tab).</p>
                  
                  <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg flex flex-col gap-2 mb-4">
                    <p className="font-bold text-slate-200 mb-2 text-sm">So gehst du vor:</p>
                    <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke in Spalte „Upload Icebreaker Erstgespräch“ auf <strong>Karte hinzufügen</strong></span></div>
                    <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Gib der Karte einen Namen (z. B. "DEIN NAME")</span></div>
                    <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke auf <strong>Anlegen</strong></span></div>
                    <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke die neue Karte an und lade dein Dokument unter Anhänge hoch (Dokument per Drag & Drop hochladen oder ein Klick auf „Hinzufügen“ und Datei auswählen).</span></div>
                    <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke abschließend auf <strong>Speichern</strong>.</span></div>
                  </div>

                  {renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz PA-Team Board")}
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/20">4</div>
                <div className="pt-1">
                  <p className="text-slate-200 font-bold">Wir treffen uns im Plenum und gehen die Bögen gemeinsam durch.</p>
                  <p className="text-slate-300 text-sm mt-1 leading-relaxed [text-wrap:pretty]">Warte auf das Signal der Kursleitung.</p>
                </div>
              </div>

            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-amber-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white [text-wrap:balance]">Was erwartet dich hier?</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Hier lernst du ein Beispiel für digitale Unterstützung kennen: Die <strong>fobizz Pinnwand</strong>, unser digitales Unterstützungstool für die Praxisanleitung, Dokumentation, Feedback und Reflexion. Es gibt viele weitere Tools auf dem Markt, aber wir arbeiten exemplarisch mit diesem. Es bietet kostenlos viele Features an und ist DSGVO-konform.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-black text-amber-500 uppercase tracking-widest text-sm mb-4 [text-wrap:balance]">Dein Auftrag</h4>

              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">1</div>
                <div className="pt-1 w-full">
                  <p className="text-slate-200 font-bold mb-4">Intro-Video ansehen</p>
                  <a href="https://app.fobizz.com/pinboard/info" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="bg-slate-800 border-2 border-slate-700 hover:border-amber-500 rounded-xl p-8 flex flex-col items-center justify-center gap-4 transition-all hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                      <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-8 h-8 ml-1" />
                      </div>
                      <div className="text-center">
                        <h4 className="text-white font-bold text-lg mb-1 [text-wrap:balance]">Einführungsvideo öffnen</h4>
                        <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">Öffnet im neuen Tab</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">2</div>
                <div className="pt-1 w-full">
                  <p className="text-slate-200 font-bold mb-2">Beide Boards besuchen</p>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">Klicke dich durch die Funktionen, sieh dir die Spalten an und teste die Tools.</p>
                  {renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "1. fobizz PA-Team Board")}
                  {renderBoard("https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?embed=true&token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8", "2. fobizz Azubi-Board")}
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-black flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">3</div>
                <div className="pt-1">
                  <p className="text-slate-200 font-bold">Austausch im Plenum</p>
                  <p className="text-slate-300 text-sm mt-1 leading-relaxed [text-wrap:pretty]">Es folgt eine kurze Einführung und Beantwortung von Fragen durch den Trainer.</p>
                </div>
              </div>

            </div>
          </div>
        );
      
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white [text-wrap:balance]">Akte 03: Ärztliche vs. Pflegerische Aufklärung (Grenzen der Delegation)</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Aufklärung ist nicht gleich Aufklärung. Wir unterscheiden streng zwischen der Risiko-/Eingriffsaufklärung (z.B. vor einer OP) und der Sicherungsaufklärung (z.B. Anleitung zur Sturzprophylaxe). Fülle die Felder für eine Auszubildende (Frau Meinhardt) aus, um die Grenzen zu klären.
              </p>
            </div>
            
            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0">1</div>
              <div className="pt-1 w-full">
                <p className="text-slate-200 font-bold text-sm mb-2">Rechtlicher Hintergrund: Die zwei Arten der Aufklärung</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                  <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
                    <strong className="text-blue-400 font-bold block text-sm mb-1 uppercase tracking-wider">Eingriffs- / Risikoaufklärung (§ 630e BGB)</strong>
                    <p className="leading-relaxed">Reiner <strong>Arztvorbehalt</strong>! Umfasst Diagnose, Art, Umfang, Durchführung, zu erwartende Folgen und Risiken der Maßnahme sowie Alternativen. Darf <em>niemals</em> an die Pflege oder Auszubildende delegiert werden.</p>
                  </div>
                  <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700">
                    <strong className="text-emerald-400 font-bold block text-sm mb-1 uppercase tracking-wider">Sicherungs- / Therapieaufklärung (§ 630c BGB)</strong>
                    <p className="leading-relaxed"><strong>Originäre Pflegeaufgabe</strong>! Aufklärung über therapiegerechtes Verhalten zur Vermeidung von Selbstgefährdung (z.B. Sturz, Dekubitus, Einhaltung von Bettruhe, Umgang mit Hilfsmitteln).</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">2</div>
              <div className="pt-1 w-full z-10">
                <h4 className="font-black text-white text-base mb-2 [text-wrap:balance]">Fallkonstellation: Bewohnerin Frau Meinhardt</h4>
                <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-l-amber-500 shadow-md">
                  <p className="text-slate-300 text-sm leading-relaxed mb-3 [text-wrap:pretty]">
                    Frau Meinhardt (79 Jahre) soll eine Bluttransfusion erhalten. Gleichzeitig besteht bei ihr ein akutes Sturzrisiko und postoperative Wundschmerzen nach einem chirurgischen Eingriff. Deine Auszubildende fragt dich unsicher: <em>„Schwester, der Arzt hat gesagt, ich soll Frau Meinhardt den Bogen für die Bluttransfusion unterschreiben lassen und ihr alles erklären. Außerdem weiß ich nicht, was ich zum Sturzrisiko und den Schmerzmitteln sagen und dokumentieren darf.“</em>
                  </p>
                  <p className="text-amber-400 text-xs font-bold bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    Deine pädagogische Aufgabe: Erarbeite mit deiner Auszubildenden die glasklare Trennung der Verantwortungsbereiche.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 relative overflow-hidden group">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">3</div>
              <div className="w-full z-10">
                <h4 className="font-bold text-white mb-2 [text-wrap:balance]">Praxis-Leitfaden ausfüllen</h4>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed [text-wrap:pretty]">Formuliere die Antworten für deine Auszubildende, um die Grenzen der Aufklärung zu definieren:</p>
                {!isSaved ? (
                  <div className="space-y-4">
                    <StyledTextarea 
                      color="blue" 
                      label="1. Eingriffsaufklärung (Arztvorbehalt)" 
                      step="A" 
                      description="Beispiel: Einwilligung in eine Bluttransfusion. Was ist hierbei die Aufgabe der Pflege? (Fokus: Assistenz, Sicherstellung der ärztl. Aufklärung, nicht die Durchführung!)"
                      value={eingriffsAufklaerungText} 
                      onChange={(e: any) => setEingriffsAufklaerungText(e.target.value)} 
                      placeholder="Aufgabe der Pflege bei der Transfusion beschreiben..." 
                    />
                    <StyledTextarea 
                      color="amber" 
                      label="2. Sicherungsaufklärung (Pflegeaufgabe)" 
                      step="B" 
                      description="Beispiel: Aufklärung über das Sturzrisiko und die Bettgitter-Nutzung. Formuliere einen kurzen Dokumentationseintrag."
                      value={sicherungsAufklaerungText} 
                      onChange={(e: any) => setSicherungsAufklaerungText(e.target.value)} 
                      placeholder="Muster-Dokumentationseintrag zur Sicherungsaufklärung formulieren..." 
                    />
                    <StyledTextarea 
                      color="emerald" 
                      label="3. Therapeutische Aufklärung (Gemeinsam/Interprofessionell)" 
                      step="C" 
                      description="Beispiel: Umgang mit postoperativen Schmerzen. Welche Informationen gibst du dem Patienten?"
                      value={therapeutischeAufklaerungText} 
                      onChange={(e: any) => setTherapeutischeAufklaerungText(e.target.value)} 
                      placeholder="Aufklärung über Schmerztherapie und -äußerung formulieren..." 
                    />
                    <div className="flex justify-end">
                      <button onClick={() => setIsSaved(true)} className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Speichern</button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl relative">
                    <div className="space-y-4 pr-10">
                      <div><strong className="text-blue-400 block text-xs uppercase tracking-widest mb-1">Eingriffsaufklärung (Arztvorbehalt):</strong><p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed [text-wrap:pretty]">{eingriffsAufklaerungText || "Keine Eingabe"}</p></div>
                      <div><strong className="text-amber-400 block text-xs uppercase tracking-widest mb-1">Sicherungsaufklärung (Pflegeaufgabe):</strong><p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed [text-wrap:pretty]">{sicherungsAufklaerungText || "Keine Eingabe"}</p></div>
                      <div><strong className="text-emerald-400 block text-xs uppercase tracking-widest mb-1">Therapeutische Aufklärung (Gemeinsam):</strong><p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed [text-wrap:pretty]">{therapeutischeAufklaerungText || "Keine Eingabe"}</p></div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button onClick={() => setIsSaved(false)} className="text-xs text-slate-400 hover:text-slate-300">Erneut bearbeiten</button>
                      {!hasCopied && (
                        <button onClick={handleCopy} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 animate-pulse uppercase tracking-widest text-sm"><Copy className="w-5 h-5" /> Leitfaden jetzt kopieren</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {hasCopied && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0">4</div>
                  <div className="pt-1 w-full">
                    <h4 className="font-bold text-white mb-2 [text-wrap:balance]">Abgleich & Musterlösung</h4>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed [text-wrap:pretty]">Vergleiche deine Formulierungen mit den rechtlichen Standards.</p>
                    {!showSolution ? (
                      <button onClick={() => setShowSolution(true)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold transition-colors">Musterlösung einblenden</button>
                    ) : (
                      <div className="bg-slate-950 border-2 border-emerald-500/50 p-6 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <h5 className="font-black text-emerald-500 mb-4 uppercase tracking-widest text-sm [text-wrap:balance]">Juristische Musterlösung (Rechtliche Leitplanken)</h5>
                        <div className="space-y-4">
                          <div>
                            <strong className="text-white">1. Eingriffsaufklärung (Arztvorbehalt – Bluttransfusion):</strong>
                            <p className="text-slate-300 text-sm mt-1 leading-relaxed [text-wrap:pretty]">
                              „Die Risikoaufklärung über eine Transfusion (Risiko von Unverträglichkeiten, Infektionen, Antikörperbildung) ist absolut <strong>nicht delegationsfähig</strong>. Die Pflege darf den Bogen keinesfalls selbst mit der Patientin ausfüllen oder sie zur Unterschrift drängen. Aufgabe der Pflege: Vorbereitung der Unterlagen, Prüfung vor Transfusion, ob die ärztliche Aufklärung und schriftliche Einwilligung in der Akte vorliegt (Sorgfaltspflicht!), Bedside-Test-Assistenz, lückenlose Vitalzeichenüberwachung und Begleitung.“
                            </p>
                            <p className="text-emerald-400/80 text-xs mt-1 italic">Rechtlicher Grundsatz: Bei unzulässiger Delegation haftet der anordnende Arzt UND die ausführende Pflegekraft (Übernahme- und Durchführungsverantwortung)!</p>
                          </div>
                          <div className="h-px bg-slate-800"></div>
                          <div>
                            <strong className="text-white">2. Sicherungsaufklärung (Pflegeaufgabe – Sturzprophylaxe & Bettgitter):</strong>
                            <p className="text-slate-300 text-sm mt-1 leading-relaxed [text-wrap:pretty]">
                              <em>Muster-Doku:</em> „14:30 Uhr: Pat. ausführlich über erhöhtes Sturzrisiko infolge Sedierung/Schwäche aufgeklärt. Klingel in unmittelbare Reichweite platziert und Pat. instruiert, vor jedem Aufstehversuch zwingend die Pflege zu rufen. Pat. zeigt volles Verständnis und willigt ein, nicht selbstständig aufzustehen. Bett in Tiefstposition gebracht. (Hinweis: Bettgitter als freiheitsentziehende Maßnahme nur mit richterlicher Genehmigung oder ausdrücklicher informierter Einwilligung zulässig). Gez. Pflegefachkraft.“
                            </p>
                            <p className="text-emerald-400/80 text-xs mt-1 italic">Rechtlicher Grundsatz: Wer schreibt, der bleibt! Unterbleibt die Dokumentation, gilt die Aufklärung vor Gericht als nicht erfolgt (§ 630h Abs. 3 BGB Beweislastumkehr).</p>
                          </div>
                          <div className="h-px bg-slate-800"></div>
                          <div>
                            <strong className="text-white">3. Therapeutische Aufklärung (Umgang mit postoperativen Schmerzen):</strong>
                            <p className="text-slate-300 text-sm mt-1 leading-relaxed [text-wrap:pretty]">
                              „Pat. über Schmerzerfassung per NRS (Numerische Rating-Skala 0–10) informiert. Wichtigkeit der frühzeitigen Meldung von Schmerzen erklärt, bevor Schmerzspitzen entstehen. Aufklärung über Wirkweise des verordneten Bedarfsanalgetikums, mögliche Nebenwirkungen (z.B. Übelkeit, Müdigkeit) und ergänzende nicht-medikamentöse Maßnahmen (Lagerung, Schonhaltung vermeiden).“
                            </p>
                          </div>
                        </div>
                        <button onClick={() => setShowSolution(false)} className="text-slate-400 hover:text-slate-300 text-sm mt-2 font-bold">Ausblenden</button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black flex items-center justify-center shrink-0">5</div>
                  <div className="pt-1 w-full">
                    <h4 className="font-bold text-white mb-2 [text-wrap:balance]">Dokumentiere im PA-Team Board</h4>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed [text-wrap:pretty]">Kopiere deinen finalen Text und wechsle über den Link in unser fobizz PA-Team Board. Lege dort unter der Spalte „Frau Meinhardt“ eine neue Karte an, damit auch deine Kolleg:innen im nächsten Dienst Bescheid wissen.</p>
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg flex flex-col gap-2 mb-4">
                      <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke in Spalte "Frau Meinhardt" auf <strong>Karte hinzufügen</strong></span></div>
                      <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Gib der Karte einen Namen (z. B. "Frau Meinhardt Aufklärung & Delegation")</span></div>
                      <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke auf <strong>Anlegen</strong></span></div>
                      <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke die neue Karte an und füge deinen Text unter <strong>Beschreibung</strong> ein</span></div>
                      <div className="flex items-start gap-2 text-sm text-slate-300"><ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5"/> <span>Klicke abschließend auf <strong>Speichern</strong></span></div>
                    </div>
                    <a href="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg text-sm mb-6">Zum PA-Team Board <ExternalLink className="w-4 h-4" /></a>
                    {renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz PA-Team Board")}
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/30">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">6</div>
                  <div>
                    <h4 className="font-bold text-emerald-400 mb-1 [text-wrap:balance]">Wir treffen uns zur Besprechung im Plenum</h4>
                    <p className="text-sm text-slate-300 leading-relaxed [text-wrap:pretty]">Warte hier, bis die Kursleitung die nächste Phase einläutet.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-purple-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white [text-wrap:balance]">Akte 04: Die 4 Säulen der wirksamen Einwilligung (Informed Consent)</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Damit eine Einwilligung rechtlich bindend ist, müssen vier essenzielle Säulen stehen. Bröckelt eine davon, ist die Maßnahme juristisch eine Körperverletzung.
              </p>
            </div>
            
            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0">1</div>
              <div className="pt-1 w-full">
                <p className="text-slate-200 font-bold text-sm mb-2">Rechtliches Fundament: Das 4-Säulen-Modell</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <strong className="text-rose-400 font-bold block mb-1">1. Einwilligungsfähigkeit</strong>
                    <span>Der Patient muss intellektuell fähig sein, Bedeutung und Risiken des Eingriffs zu erfassen. Nicht identisch mit Geschäftsfähigkeit!</span>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <strong className="text-amber-400 font-bold block mb-1">2. Rechtzeitige & umfassende Aufklärung</strong>
                    <span>Vor dem Eingriff, mit ausreichend Bedenkzeit, verständlich, schonend und über realistische Alternativen.</span>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <strong className="text-blue-400 font-bold block mb-1">3. Freiwilligkeit</strong>
                    <span>Echte Selbstbestimmung ohne moralischen Druck, Nötigung oder Täuschung durch Personal oder Familie.</span>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                    <strong className="text-emerald-400 font-bold block mb-1">4. Jederzeitige Widerruflichkeit</strong>
                    <span>Der Patient kann zu jedem Zeitpunkt formlos 'Nein' sagen, ohne Begründung und ohne Verlust des Behandlungsanspruchs.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800 relative overflow-hidden group">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0 z-10">2</div>
              <div className="w-full z-10">
                <h4 className="font-bold text-white mb-2 [text-wrap:balance]">Die 4 Säulen in der Praxisprüfung</h4>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">
                  Fülle die vier Säulen für deine Praxisanleitung und Dokumentation aus:
                </p>
                {!isSaved ? (
                  <div className="space-y-4">
                    <StyledTextarea 
                      color="rose" 
                      label="Säule 1: Einwilligungsfähigkeit" 
                      description="Versteht der Patient Wesen, Bedeutung und Tragweite der Maßnahme? (Wie überprüfst du das?)" 
                      value={saeule1} 
                      onChange={(e: any) => setSaeule1(e.target.value)} 
                      placeholder="Beobachtung & Prüfung der Einsichts- und Urteilsfähigkeit..." 
                    />
                    <StyledTextarea 
                      color="amber" 
                      label="Säule 2: Aufklärung" 
                      description="Wurde der Patient rechtzeitig und umfassend (Diagnose, Verlauf, Risiken, Alternativen) informiert?" 
                      value={saeule2} 
                      onChange={(e: any) => setSaeule2(e.target.value)} 
                      placeholder="Prüfung der Aufklärungskriterien und Bedenkzeit..." 
                    />
                    <StyledTextarea 
                      color="blue" 
                      label="Säule 3: Freiwilligkeit" 
                      description="Handelt der Patient ohne Zwang oder Druck von Angehörigen/Personal?" 
                      value={saeule3} 
                      onChange={(e: any) => setSaeule3(e.target.value)} 
                      placeholder="Sicherstellung von Freiwilligkeit und echtem Willen..." 
                    />
                    <StyledTextarea 
                      color="emerald" 
                      label="Säule 4: Widerruflichkeit" 
                      description="Weiß der Patient, dass er die Einwilligung jederzeit ohne Nachteile widerrufen kann?" 
                      value={saeule4} 
                      onChange={(e: any) => setSaeule4(e.target.value)} 
                      placeholder="Hinweis auf und Umgang mit einem Widerruf..." 
                    />
                    
                    <div className="flex justify-end">
                      <button onClick={() => setIsSaved(true)} className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Speichern</button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl relative">
                    <div className="space-y-4 pr-10"> 
                       <div>
                          <strong className="text-rose-400 block text-xs uppercase tracking-widest mb-1">Säule 1: Einwilligungsfähigkeit:</strong>
                          <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed [text-wrap:pretty]">{saeule1 || "Keine Eingabe"}</p>
                       </div>
                       <div>
                          <strong className="text-amber-400 block text-xs uppercase tracking-widest mb-1">Säule 2: Aufklärung:</strong>
                          <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed [text-wrap:pretty]">{saeule2 || "Keine Eingabe"}</p>
                       </div>
                       <div>
                          <strong className="text-blue-400 block text-xs uppercase tracking-widest mb-1">Säule 3: Freiwilligkeit:</strong>
                          <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed [text-wrap:pretty]">{saeule3 || "Keine Eingabe"}</p>
                       </div>
                       <div>
                          <strong className="text-emerald-400 block text-xs uppercase tracking-widest mb-1">Säule 4: Widerruflichkeit:</strong>
                          <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed [text-wrap:pretty]">{saeule4 || "Keine Eingabe"}</p>
                       </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                       <button onClick={() => setIsSaved(false)} className="text-xs text-slate-400 hover:text-slate-300">Erneut bearbeiten</button>
                       {!hasCopied && (
                          <button onClick={handleCopyCase4} className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-black rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 animate-pulse uppercase tracking-widest text-sm">
                            <Copy className="w-5 h-5" /> 4 Säulen jetzt kopieren
                          </button>
                       )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {hasCopied && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 text-white font-black flex items-center justify-center shrink-0">3</div>
                  <div className="pt-1 w-full">
                    <h4 className="font-bold text-white mb-2 [text-wrap:balance]">Abgleich & Musterlösung</h4>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed [text-wrap:pretty]">Vergleiche deine Reflexion mit dem juristischen Standard.</p>
                    {!showSolution ? (
                      <button onClick={() => setShowSolution(true)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold transition-colors">Musterlösung einblenden</button>
                    ) : (
                      <div className="bg-slate-950 border-2 border-emerald-500/50 p-6 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <h5 className="font-black text-emerald-500 mb-4 uppercase tracking-widest text-sm [text-wrap:balance]">Juristischer Erwartungshorizont: Die 4 Säulen</h5>
                        <div className="space-y-4">
                          <div>
                            <strong className="text-rose-400 block mb-1">Säule 1 (Einwilligungsfähigkeit):</strong>
                            <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                              Der Patient muss in der Lage sein, die Informationen über die konkrete Maßnahme aufzunehmen, zu verstehen, gegeneinander abzuwägen und seinen Willen danach frei zu bestimmen („Teach-Back-Methode“: Lassen Sie den Patienten mit eigenen Worten erklären, worum es geht). Einwilligungsfähigkeit wird vermutet; Zweifel müssen begründet und dokumentiert werden.
                            </p>
                          </div>
                          <div className="h-px bg-slate-800"></div>
                          <div>
                            <strong className="text-amber-400 block mb-1">Säule 2 (Umfassende Aufklärung):</strong>
                            <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                              Die Aufklärung muss so rechtzeitig erfolgen, dass der Patient wohlüberlegt entscheiden kann (bei elektiven Eingriffen i.d.R. am Vortag, nicht erst auf dem Weg zum OP). Erforderlich ist die Information über Diagnose, Art, Schwere, Risiken und echte Behandlungsalternativen.
                            </p>
                          </div>
                          <div className="h-px bg-slate-800"></div>
                          <div>
                            <strong className="text-blue-400 block mb-1">Säule 3 (Freiwilligkeit):</strong>
                            <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                              Die Zustimmung muss autonom erfolgen. Häufige Fehlerquellen: Nötigung durch Angehörige („Opa, unterschreib jetzt endlich!“) oder suggestive Beeinflussung durch medizinisches Personal („Wenn Sie das nicht unterschreiben, müssen Sie nach Hause“).
                            </p>
                          </div>
                          <div className="h-px bg-slate-800"></div>
                          <div>
                            <strong className="text-emerald-400 block mb-1">Säule 4 (Widerruflichkeit):</strong>
                            <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                              Der Patient muss darüber belehrt werden, dass er seine Einwilligung jederzeit formlos (auch durch Kopfschütteln oder Abwehrbewegungen) widerrufen kann (§ 630d Abs. 1 Satz 3 BGB). Ein Widerruf beendet sofort jede Rechtfertigung der Maßnahme!
                            </p>
                          </div>
                        </div>
                        <button onClick={() => setShowSolution(false)} className="text-slate-400 hover:text-slate-300 text-sm mt-4 font-bold">Ausblenden</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/30">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">4</div>
                  <div>
                    <h4 className="font-bold text-emerald-400 mb-1 [text-wrap:balance]">Dokumentiere im PA-Team Board</h4>
                    <p className="text-sm text-slate-300 mb-3 leading-relaxed [text-wrap:pretty]">Kopiere die 4 Säulen und lege im fobizz PA-Team Board unter der Spalte „Informed Consent“ eine neue Karte an.</p>
                    <a href="https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg text-sm mb-4">Zum PA-Team Board <ExternalLink className="w-4 h-4" /></a>
                    {renderBoard("https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz PA-Team Board")}
                  </div>
                </div>

                {renderDocumentationStep(5, 'Informed Consent')}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white [text-wrap:balance]">Jura-Check: Patientenzimmer freischalten</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Bevor du das Büro (Raum 03) betreten darfst, musst du dein juristisches Grundwissen unter Beweis stellen. 
                Löse die folgenden 4 Aufgaben zur Aufklärung, Delegation, Haftung und Informed Consent.
              </p>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 relative">
              {case5QuizStep === 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm [text-wrap:balance]">Frage 1: Single Choice (Arztvorbehalt)</h4>
                  <p className="text-white leading-relaxed [text-wrap:pretty]">Wer darf die Risikoaufklärung für einen operativen Eingriff durchführen?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => {
                      setCase5Mistakes(m => m + 1);
                      setCase5Feedback({msg: 'Falsch! Die Risikoaufklärung unterliegt dem strikten Arztvorbehalt und darf auch bei Zeitnot niemals delegiert werden.', isError: true});
                    }} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">
                      A) Die examinierte Pflegekraft, wenn der Arzt keine Zeit hat.
                    </button>
                    <button onClick={() => {
                      setCase5Feedback({msg: 'Richtig! Das ist ärztlicher Vorbehalt (§ 630e BGB). Weder examinierte Pflegekräfte noch Auszubildende dürfen diese Aufgabe übernehmen.', isError: false, showNext: true});
                    }} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">
                      B) Der behandelnde oder ein aufklärender Arzt.
                    </button>
                    <button onClick={() => {
                      setCase5Mistakes(m => m + 1);
                      setCase5Feedback({msg: 'Falsch! Auch unter Aufsicht darf eine Auszubildende keine ärztliche Eingriffsaufklärung durchführen.', isError: true});
                    }} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">
                      C) Die Auszubildende unter Aufsicht.
                    </button>
                  </div>
                  {case5Feedback && case5QuizStep === 0 && (
                    <div className={`mt-4 p-4 rounded-lg ${case5Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}`}>
                      {case5Feedback.msg}
                      {case5Feedback.showNext && (
                        <button onClick={() => {setJuraCheckScore(s => s + 1); setCase5Feedback(null); setCase5QuizStep(1);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case5QuizStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm [text-wrap:balance]">Frage 2: Multiple Choice (Sicherungsaufklärung)</h4>
                  <p className="text-white leading-relaxed [text-wrap:pretty]">Welche Aussagen zur "Sicherungsaufklärung" in der Pflege sind korrekt? (Wähle alle passenden aus)</p>
                  <div className="space-y-2 mt-4">
                    {[
                      { id: 'a', label: 'A) Sie umfasst die Aufklärung über pflegerische Risiken (z.B. Sturz, Dekubitus).' },
                      { id: 'b', label: 'B) Sie bedarf immer einer schriftlichen Einwilligungserklärung.' },
                      { id: 'c', label: 'C) Sie muss dokumentiert werden, um im Schadensfall beweisen zu können, dass aufgeklärt wurde.' },
                      { id: 'd', label: 'D) Sie kann vom Arzt an die Reinigungskraft delegiert werden.' }
                    ].map(opt => (
                      <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${case5Q2Answers[opt.id] ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}>
                        <input type="checkbox" className="w-5 h-5 accent-blue-500" checked={!!case5Q2Answers[opt.id]} onChange={(e) => setCase5Q2Answers({...case5Q2Answers, [opt.id]: e.target.checked})} />
                        <span className="text-slate-300">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => {
                    if (case5Q2Answers['a'] && !case5Q2Answers['b'] && case5Q2Answers['c'] && !case5Q2Answers['d']) {
                      setCase5Feedback({msg: 'Richtig! Sicherungsaufklärung betrifft pflegerische Risiken und muss zwingend dokumentiert werden. Eine Schriftform ist nicht ausnahmslos zwingend (mündlich/konkludent reicht oft), aber wer schreibt, der bleibt!', isError: false, showNext: true});
                    } else {
                      setCase5Mistakes(m => m + 1);
                      setCase5Feedback({msg: 'Nicht ganz! Beachte: Eine strenge Schriftform ist bei der Sicherungsaufklärung gesetzlich nicht immer zwingend, aber Doku ist Pflicht (§ 630f BGB). Und an Reinigungskräfte kann man sie gewiss nicht delegieren.', isError: true});
                    }
                  }} className="mt-4 px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400">Überprüfen</button>
                  {case5Feedback && case5QuizStep === 1 && (
                    <div className={`mt-4 p-4 rounded-lg ${case5Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}`}>
                      {case5Feedback.msg}
                      {case5Feedback.showNext && (
                        <button onClick={() => {setJuraCheckScore(s => s + 1); setCase5Feedback(null); setCase5QuizStep(2);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case5QuizStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm [text-wrap:balance]">Frage 3: Lückentext (Strafrechtliche Einordnung)</h4>
                  <p className="text-white leading-relaxed [text-wrap:pretty]">Wie lautet der juristische Fachbegriff für jede medizinische/pflegerische Maßnahme (z.B. Blutabnahme, Waschen), die *ohne* wirksame Einwilligung des Patienten durchgeführt wird?</p>
                  <div className="mt-4">
                    <StyledTextarea 
                      label="Dein Lösungswort" 
                      value={case5Q3Text} 
                      onChange={(e: any) => setCase5Q3Text(e.target.value)} 
                      placeholder="Begriff eingeben (z. B. Körperverletzung)..."
                    />
                  </div>
                  <button onClick={() => {
                    const ans = case5Q3Text.toLowerCase().trim();
                    if (ans === 'körperverletzung' || ans === 'koerperverletzung' || ans.includes('körperverletzung') || ans.includes('koerperverletzung')) {
                      setCase5Feedback({msg: 'Exzellent! Nach ständiger BGH-Rechtsprechung erfüllt jeder Heileingriff und jede pflegerische Maßnahme ohne wirksame Einwilligung den Tatbestand der Körperverletzung (§ 223 StGB). Die Einwilligung ist der rechtfertigende Grund.', isError: false, showNext: true});
                    } else {
                      setCase5Mistakes(m => m + 1);
                      setCase5Feedback({msg: 'Falsch. Gesucht ist das Delikt aus dem Strafgesetzbuch (§ 223 StGB). Ein Eingriff in die körperliche Unversehrtheit ohne Einwilligung ist eine ...', isError: true});
                    }
                  }} className="mt-4 px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400">Überprüfen</button>
                  {case5Feedback && case5QuizStep === 2 && (
                    <div className={`mt-4 p-4 rounded-lg ${case5Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}`}>
                      {case5Feedback.msg}
                      {case5Feedback.showNext && (
                        <button onClick={() => {setJuraCheckScore(s => s + 1); setCase5Feedback(null); setCase5QuizStep(3);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case5QuizStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm [text-wrap:balance]">Frage 4: Richtig oder Falsch (Einwilligungsfähigkeit)</h4>
                  <p className="text-white leading-relaxed [text-wrap:pretty]">Einwilligungsfähigkeit ist identisch mit der rechtlichen Geschäftsfähigkeit.</p>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => {
                      setCase5Mistakes(m => m + 1);
                      setCase5Feedback({msg: 'Falsch! Einwilligungsfähigkeit hängt von der Einsichtsfähigkeit in die spezifische Maßnahme ab, nicht vom Alter oder der Geschäftsfähigkeit. Auch Minderjährige können einwilligungsfähig sein, während voll geschäftsfähige Personen bei akuter Verwirrtheit vorübergehend einwilligungsunfähig sein können.', isError: true});
                    }} className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 font-bold transition-colors">Richtig</button>
                    <button onClick={() => {
                      setCase5Feedback({msg: 'Richtig! Sehr gut aufgepasst. Die Einwilligungsfähigkeit ist eine Frage der natürlichen Einsichts- und Urteilsfähigkeit im konkreten Einzelfall – unabhängig von Geschäftsfähigkeit oder Volljährigkeit.', isError: false, showNext: true});
                    }} className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 font-bold transition-colors">Falsch</button>
                  </div>
                  {case5Feedback && case5QuizStep === 3 && (
                    <div className={`mt-4 p-4 rounded-lg ${case5Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}`}>
                      {case5Feedback.msg}
                      {case5Feedback.showNext && (
                        <button onClick={() => {setJuraCheckScore(s => s + 1); setCase5Feedback(null); setCase5QuizStep(4);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Ergebnis ansehen</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case5QuizStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="font-black text-emerald-500 mb-2 uppercase tracking-widest text-lg [text-wrap:balance]">Jura-Check bestanden!</h4>
                  <p className="text-slate-300 mb-2 leading-relaxed [text-wrap:pretty]">Du hast alle Rechtsfragen gemeistert. Die Grenzen der Delegation und die Bedingungen einer wirksamen Einwilligung sind dir glasklar.</p>
                  {case5Mistakes === 0 && (
                    <p className="text-amber-400 font-bold text-sm bg-amber-500/10 p-2 rounded-lg border border-amber-500/30 mb-4 inline-block">
                      ★ Abzeichen erhalten: Jura-Ass (Akte 05) – Fehlerfrei im ersten Durchlauf!
                    </p>
                  )}
                  <div>
                    <p className="text-amber-500 font-bold bg-amber-500/10 inline-block px-4 py-2 rounded-lg border border-amber-500/30">
                      <LockIcon className="w-4 h-4 inline mr-2" /> Raum 03 (Büro) ist nun für dich freigeschaltet!
                    </p>
                  </div>
                  <div className="mt-8">
                    <button onClick={() => {setCase5QuizStep(0); setJuraCheckScore(0); setCase5Mistakes(0); setCase5Q2Answers({}); setCase5Q3Text(''); setCase5Feedback(null);}} className="text-slate-400 hover:text-slate-300 text-sm">Quiz wiederholen</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-emerald-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white [text-wrap:balance]">Akte 06: Der Stufenprozess der mutmaßlichen Einwilligung (Eskalationsmodell)</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Was tun wir, wenn Patient:innen nicht einwilligungsfähig sind (z.B. bei schwerer Demenz, Koma oder im Akut-Notfall)? Dieser 6-stufige Prozess sichert dich ab.
              </p>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0">1</div>
              <div className="pt-1 w-full">
                <p className="text-slate-200 font-bold text-sm mb-3">Die 6 Stufen des rechtlichen Eskalationsmodells</p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="text-rose-400 block text-sm">Stufe 1: Notfallindikation</strong>
                      <span>Besteht akute Lebensgefahr oder schwere Gesundheitsgefahr? Wenn ja: Sofortiges lebenserhaltendes Handeln nach mutmaßlichem Willen, keine Verzögerung durch Betreuerbestellung!</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-amber-400 block text-sm">Stufe 2: Patientenverfügung (§ 1827 Abs. 1 BGB)</strong>
                      <span>Gibt es eine schriftliche, gültige und auf die konkrete Lebens- und Behandlungssituation zutreffende Verfügung? Wenn ja: Unmittelbar verbindlich – egal wie alt!</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="text-blue-400 block text-sm">Stufe 3: Vorsorgevollmacht / Gesetzlicher Betreuer</strong>
                      <span>Liegt keine spezifische Verfügung vor: Wer ist rechtlich zur Vertretung befugt (Aufgabenkreis Gesundheitsfürsorge)? Angehörige dürfen dies ohne Vollmacht/Ehegattennotvertretung nicht automatisch!</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center shrink-0">4</span>
                    <div>
                      <strong className="text-purple-400 block text-sm">Stufe 4: Früherer mündlicher Wille</strong>
                      <span>Was hat der Patient vor Eintritt der Einwilligungsunfähigkeit mündlich oder schriftlich geäußert (Behandlungswünsche, Wertvorstellungen, religiöse Überzeugungen)?</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0">5</span>
                    <div>
                      <strong className="text-teal-400 block text-sm">Stufe 5: Mutmaßlicher Wille</strong>
                      <span>Was würde der Patient in dieser Situation vernünftigerweise wollen, ausgehend von seiner bisherigen Lebensführung und seinen Wertmaßstäben? (Individuell, nicht gesellschaftlicher Durchschnitt!).</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">6</span>
                    <div>
                      <strong className="text-emerald-400 block text-sm">Stufe 6: Handlungsentschluss & Lückenlose Dokumentation</strong>
                      <span>Gemeinsame Entscheidung von Arzt und Vertreter/Pflege, präzise Begründung in der Patientenakte und Durchführung der Maßnahme.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">2</div>
              <div className="w-full z-10">
                <p className="text-slate-200 font-bold text-sm mb-4">Fallvignette im Pflegealltag: Frau Wagner (Zustand nach Apoplex)</p>
                <div className="bg-slate-800 p-5 rounded-xl border-l-4 border-l-blue-500 shadow-md">
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 [text-wrap:pretty]">
                    Bewohnerin Frau Wagner (82 Jahre, schwere Aphasie und Verwirrtheit nach Re-Insult, nicht ansprechbar für Aufklärungsgespräche) benötigt eine PEG-Sonde zur Ernährung. 
                    Ihre Tochter verlangt energisch: <em>„Legen Sie sofort die Magensonde, meine Mutter verhungert sonst!“</em>. Der Sohn hingegen widerspricht vehement: <em>„Mutter wollte niemals künstlich ernährt an Schläuchen hängen, das hat sie uns immer gesagt!“</em>
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4 [text-wrap:pretty]">
                    <strong className="text-amber-400">Das ethisch-juristische Dilemma:</strong> Es liegt kein akuter Erstickungsnotfall vor, aber eine langfristige Behandlungsentscheidung. Deine Auszubildende Sarah ist verunsichert: Auf wen müssen wir hören? Auf den Arzt? Auf die Tochter? Oder auf den Sohn?
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-700 [text-wrap:pretty]">
                    <strong className="text-emerald-400">Deine Anleitung:</strong> Gehe mit Sarah Schritt für Schritt das 6-Stufen-Eskalationsmodell durch, um eine rechtssichere Entscheidung herbeizuführen.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">3</div>
              <div className="w-full z-10">
                <h4 className="font-bold text-white mb-2 [text-wrap:balance]">Der Arbeitsauftrag (Das Azubi-Board)</h4>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed [text-wrap:pretty]">
                  Stelle die 6 Prüfschritte auf dem fobizz Azubi-Board für Sarah zusammen, damit sie im Dienst strukturiert vorgehen kann.
                </p>
                <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 mb-4">
                  <strong className="text-white block mb-2">Checkliste zur mutmaßlichen Einwilligung bei Frau Wagner:</strong>
                  <ol className="list-decimal pl-5 text-sm text-slate-300 space-y-1">
                    <li>1. Notfallindikation prüfen (Akute Lebensgefahr? Nein, elektive PEG-Anlage).</li>
                    <li>2. Existiert eine schriftliche Patientenverfügung in der Akte?</li>
                    <li>3. Gibt es eine Vorsorgevollmacht oder gerichtliche Betreuung mit Aufgabenkreis Gesundheit?</li>
                    <li>4. Welcher frühere Wille wurde gegenüber Angehörigen geäußert?</li>
                    <li>5. Was entspricht Frau Wagners mutmaßlichem Willen?</li>
                    <li>6. Dokumentation des Ethik-Konsils und ärztlich-pflegerischen Handlungsentschlusses.</li>
                  </ol>
                </div>
                {renderBoard("https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?embed=true&token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8", "fobizz Azubi-Board")}
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0">4</div>
              <div className="pt-1 w-full">
                <h4 className="font-bold text-white mb-2 [text-wrap:balance]">Juristische Musterlösung</h4>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed [text-wrap:pretty]">Abgleich für das Vorgehen bei Frau Wagner.</p>
                {!showSolution ? (
                  <button onClick={() => setShowSolution(true)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold transition-colors">
                    Musterlösung anzeigen
                  </button>
                ) : (
                  <div className="bg-slate-950 border-2 border-emerald-500/50 p-6 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <h5 className="font-black text-emerald-500 mb-4 uppercase tracking-widest text-sm [text-wrap:balance]">Lösungsalgorithmus bei uneinigen Angehörigen</h5>
                    <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                      <p>
                        <strong>1. Notfall?</strong> Nein, keine vitale Notfallindikation im Minutentakt. Ein Übergehen des Willens aus Eile ist unzulässig.
                      </p>
                      <p>
                        <strong>2. Patientenverfügung prüfen:</strong> Enthält die Akte eine PV, die den Verzicht auf künstliche Ernährung bei irreversiblem Hirnschaden festlegt? Wenn ja, ist diese für Arzt, Betreuer und Angehörige zwingend bindend (§ 1827 Abs. 1 BGB).
                      </p>
                      <p>
                        <strong>3. Vertretung klären:</strong> Haben Tochter oder Sohn eine Vorsorgevollmacht? Wenn keine Vollmacht vorliegt und sich die Geschwister widersprechen, muss beim Betreuungsgericht unverzüglich die Bestellung eines neutralen Berufsbetreuers angeregt werden.
                      </p>
                      <p>
                        <strong>4. Mündliche Äußerungen & mutmaßlicher Wille:</strong> Der Betreuer muss gemeinsam mit dem behandelnden Arzt ermitteln, was Frau Wagner selbst gewollt hätte. Bei anhaltendem Dissens über lebensverlängernde Maßnahmen ist eine Genehmigung des Betreuungsgerichts erforderlich (§ 1829 BGB).
                      </p>
                      <p className="text-emerald-400 font-bold pt-2 border-t border-slate-800">
                        Fazit für die Pflege: Neutral bleiben, keine Parteinahme für Tochter oder Sohn, lückenlose Dokumentation der Aussagen und unverzügliche Information des Arztes und der Stationsleitung!
                      </p>
                    </div>
                    <button onClick={() => setShowSolution(false)} className="text-slate-400 hover:text-slate-300 text-sm mt-4 font-bold">Ausblenden</button>
                  </div>
                )}
              </div>
            </div>
            
            {renderDocumentationStep(5, 'Sarah')}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white [text-wrap:balance]">Wissenstest: Eskalationsmodell bei Einwilligungsunfähigkeit</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                Um den Stufenprozess der mutmaßlichen Einwilligung in Notfällen und Grenzsituationen sicher anwenden zu können, überprüfe hier dein theoretisches Rechts- und Ethikwissen.
              </p>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              {case7QuizStep === 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm [text-wrap:balance]">Frage 1: Single Choice (Notfallkompetenz)</h4>
                  <p className="text-white leading-relaxed [text-wrap:pretty]">Ein bewusstloser Patient (ohne Angehörige/Verfügung) blutet stark. Was tust du?</p>
                  <div className="space-y-2 mt-4">
                    <button onClick={() => {
                      setCase7Mistakes(m => m + 1);
                      setCase7Feedback({msg: 'Falsch! Im akuten Notfall darf eine lebenserhaltende Maßnahme keinesfalls verzögert werden, um auf das Gericht oder Betreuer zu warten.', isError: true});
                    }} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">
                      A) Ich warte, bis ein gesetzlicher Betreuer bestellt wurde.
                    </button>
                    <button onClick={() => {
                      setCase7Feedback({msg: 'Richtig! Bei akuter Lebensgefahr greift die Notfallindikation und der mutmaßliche Wille zur Lebenserhaltung. Es muss unverzüglich gehandelt werden (§ 630d Abs. 1 Satz 4 BGB).', isError: false, showNext: true});
                    }} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 transition-colors">
                      B) Ich handele sofort aufgrund der Notfallkompetenz und des mutmaßlichen Willens (Lebenserhaltung).
                    </button>
                    <button onClick={() => {
                      setCase7Mistakes(m => m + 1);
                      setCase7Feedback({msg: 'Falsch! Die Polizei ist keine medizinische Instanz und kann keine Einwilligung erteilen.', isError: true});
                    }} className="w-full text-left p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 transition-colors">
                      C) Ich rufe die Polizei.
                    </button>
                  </div>
                  {case7Feedback && case7QuizStep === 0 && (
                    <div className={`mt-4 p-4 rounded-lg ${case7Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}`}>
                      {case7Feedback.msg}
                      {case7Feedback.showNext && (
                        <button onClick={() => {setCase7Score(s => s + 1); setCase7Feedback(null); setCase7QuizStep(1);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case7QuizStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm [text-wrap:balance]">Frage 2: Multiple Choice (Patientenautonomie vs. Betreuer)</h4>
                  <p className="text-white leading-relaxed [text-wrap:pretty]">Eine gesetzliche Betreuerin (Aufgabenkreis: Gesundheitsfürsorge) entscheidet *gegen* den klar formulierten Willen eines aktuell einwilligungsfähigen Patienten. Was stimmt? (Wähle alle passenden aus)</p>
                  <div className="space-y-2 mt-4">
                    {[
                      { id: 'a', label: 'A) Der Wille des einwilligungsfähigen Patienten hat immer Vorrang.' },
                      { id: 'b', label: 'B) Die Betreuerin hat das letzte Wort, da sie gerichtlich bestellt ist.' },
                      { id: 'c', label: 'C) Die Pflegekraft muss sich dem Patientenwillen beugen und dies dokumentieren.' },
                      { id: 'd', label: 'D) Der Arzt muss den Betreuer ignorieren.' }
                    ].map(opt => (
                      <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${case7Q2Answers[opt.id] ? 'bg-blue-900/30 border-blue-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}>
                        <input type="checkbox" className="w-5 h-5 accent-blue-500" checked={!!case7Q2Answers[opt.id]} onChange={(e) => setCase7Q2Answers({...case7Q2Answers, [opt.id]: e.target.checked})} />
                        <span className="text-slate-300">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <button onClick={() => {
                    if (case7Q2Answers['a'] && !case7Q2Answers['b'] && case7Q2Answers['c'] && case7Q2Answers['d']) {
                      setCase7Feedback({msg: 'Hervorragend! Ist der Patient einwilligungsfähig, entscheidet allein ER (§ 630d BGB). Ein Betreuer hat in diesem Moment keinerlei Vertretungsmacht. Arzt und Pflege müssen sich dem Patientenwillen beugen.', isError: false, showNext: true});
                    } else {
                      setCase7Mistakes(m => m + 1);
                      setCase7Feedback({msg: 'Nicht ganz richtig! Wichtiges juristisches Prinzip: Eine Betreuung ersetzt niemals den Willen eines Patienten, solange dieser einsichts- und urteilsfähig ist. Betreuer haben kein Bestimmungsrecht über einwilligungsfähige Personen! (Tipp: 3 Aussagen sind zutreffend)', isError: true});
                    }
                  }} className="mt-4 px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400">Überprüfen</button>
                  {case7Feedback && case7QuizStep === 1 && (
                    <div className={`mt-4 p-4 rounded-lg ${case7Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}`}>
                      {case7Feedback.msg}
                      {case7Feedback.showNext && (
                        <button onClick={() => {setCase7Score(s => s + 1); setCase7Feedback(null); setCase7QuizStep(2);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case7QuizStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm [text-wrap:balance]">Frage 3: Richtig oder Falsch (Formvorschrift Patientenverfügung)</h4>
                  <p className="text-white leading-relaxed [text-wrap:pretty]">Eine Patientenverfügung ist nur dann bindend, wenn sie notariell beglaubigt wurde.</p>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => {
                      setCase7Mistakes(m => m + 1);
                      setCase7Feedback({msg: 'Falsch! Eine notarielle Beglaubigung ist rechtlich NICHT erforderlich. Schriftform (eigenhändige Unterschrift) reicht gemäß § 1827 Abs. 1 BGB vollkommen aus.', isError: true});
                    }} className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-rose-900/40 border border-slate-700 text-slate-300 font-bold transition-colors">Richtig</button>
                    <button onClick={() => {
                      setCase7Feedback({msg: 'Richtig! Gesetzlich reicht die einfache Schriftform mit eigenhändiger Unterschrift (§ 1827 BGB). Ein Notar ist nicht zwingend vorgeschrieben.', isError: false, showNext: true});
                    }} className="flex-1 p-3 rounded-lg bg-slate-800 hover:bg-emerald-900/40 border border-slate-700 text-slate-300 font-bold transition-colors">Falsch</button>
                  </div>
                  {case7Feedback && case7QuizStep === 2 && (
                    <div className={`mt-4 p-4 rounded-lg ${case7Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}`}>
                      {case7Feedback.msg}
                      {case7Feedback.showNext && (
                        <button onClick={() => {setCase7Score(s => s + 1); setCase7Feedback(null); setCase7QuizStep(3);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Nächste Frage</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case7QuizStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  <h4 className="font-bold text-amber-500 mb-2 uppercase tracking-widest text-sm [text-wrap:balance]">Frage 4: Dropdown / Reihenfolge</h4>
                  <p className="text-white mb-4 leading-relaxed [text-wrap:pretty]">Ordne die Schritte der Willensermittlung bei einer nicht ansprechbaren, nicht notfallmäßigen Patientin in die korrekte Reihenfolge:</p>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <div key={stepNum} className="flex items-center gap-4 bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <span className="w-8 h-8 rounded-full bg-slate-700 text-amber-400 font-bold flex items-center justify-center shrink-0">
                          {stepNum}
                        </span>
                        <select 
                          value={case7Q4Slots[stepNum] || ''} 
                          onChange={(e) => setCase7Q4Slots({...case7Q4Slots, [stepNum]: e.target.value})} 
                          className="w-full bg-slate-900 text-white border border-slate-600 rounded p-2 outline-none focus:border-amber-500 text-sm"
                        >
                          <option value="">-- Wähle den Schritt --</option>
                          <option value="Prüfen auf Patientenverfügung">1. Prüfen auf Patientenverfügung</option>
                          <option value="Gesetzlichen Betreuer / Bevollmächtigten kontaktieren">2. Gesetzlichen Betreuer / Bevollmächtigten kontaktieren</option>
                          <option value="Bisherige mündliche Äußerungen evaluieren">3. Bisherige mündliche Äußerungen evaluieren</option>
                          <option value="Mutmaßlichen Willen (ethisch) ableiten">4. Mutmaßlichen Willen (ethisch) ableiten</option>
                        </select>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => {
                    if (
                      case7Q4Slots[1] === 'Prüfen auf Patientenverfügung' &&
                      case7Q4Slots[2] === 'Gesetzlichen Betreuer / Bevollmächtigten kontaktieren' &&
                      case7Q4Slots[3] === 'Bisherige mündliche Äußerungen evaluieren' &&
                      case7Q4Slots[4] === 'Mutmaßlichen Willen (ethisch) ableiten'
                    ) {
                      setCase7Feedback({msg: 'Perfekt! Du hast die Willensermittlung exakt nach dem juristischen Stufenmodell geordnet.', isError: false, showNext: true});
                    } else {
                      setCase7Mistakes(m => m + 1);
                      setCase7Feedback({msg: 'Leider noch nicht ganz korrekt. Das Stufenmodell verlangt: 1. Schriftliche Patientenverfügung -> 2. Bevollmächtigter/Betreuer -> 3. Mündliche Äußerungen -> 4. Mutmaßlicher Wille.', isError: true});
                    }
                  }} className="mt-4 px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400">Überprüfen</button>
                  {case7Feedback && case7QuizStep === 3 && (
                    <div className={`mt-4 p-4 rounded-lg ${case7Feedback.isError ? 'bg-rose-900/30 text-rose-300 border border-rose-800' : 'bg-emerald-900/30 text-emerald-300 border border-emerald-800'}`}>
                      {case7Feedback.msg}
                      {case7Feedback.showNext && (
                        <button onClick={() => {setCase7Score(s => s + 1); setCase7Feedback(null); setCase7QuizStep(4);}} className="block mt-3 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors">Ergebnis ansehen</button>
                      )}
                    </div>
                  )}
                </div>
              )}
              {case7QuizStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="font-black text-emerald-500 mb-2 uppercase tracking-widest text-lg [text-wrap:balance]">Eskalationsmodell gemeistert!</h4>
                  <p className="text-slate-300 mb-2 leading-relaxed [text-wrap:pretty]">Ausgezeichnet. Du kannst den Stufenprozess der mutmaßlichen Einwilligung bei unklaren Zuständen sicher navigieren und die Patientenautonomie schützen.</p>
                  {case7Mistakes === 0 && (
                    <p className="text-amber-400 font-bold text-sm bg-amber-500/10 p-2 rounded-lg border border-amber-500/30 mb-4 inline-block">
                      ★ Abzeichen erhalten: Ethik-Experte (Akte 07) – Fehlerfrei gelöst!
                    </p>
                  )}
                  <div>
                    <p className="text-amber-500 font-bold bg-amber-500/10 inline-block px-4 py-2 rounded-lg border border-amber-500/30">
                      <LockIcon className="w-4 h-4 inline mr-2" /> Raum 04 (PD Büro) ist nun für dich freigeschaltet!
                    </p>
                  </div>
                  <div className="mt-8">
                    <button onClick={() => {setCase7QuizStep(0); setCase7Score(0); setCase7Mistakes(0); setCase7Q2Answers({}); setCase7Q4Slots({}); setCase7Feedback(null);}} className="text-slate-400 hover:text-slate-300 text-sm">Quiz wiederholen</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
case 8:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 p-6 rounded-xl border-l-4 border-l-amber-500 shadow-md">
              <h3 className="font-bold text-lg mb-2 text-white [text-wrap:balance]">Die Königsdisziplin: Grauzone Aufklärung & Einwilligung</h3>
              <p className="text-slate-300 text-sm leading-relaxed [text-wrap:pretty]">
                In dieser finalen Akte führen wir alles zusammen: Deine juristische Fachkompetenz, deine ethische Haltung und die pädagogische Schutzfunktion für deine Auszubildende.
              </p>
              <div className="mt-4 p-4 bg-slate-900/80 rounded-lg border border-amber-500/30 text-amber-100 text-sm leading-relaxed">
                <p className="font-bold text-amber-400 mb-1">🚨 Der Praxisfall: Frau Meinhardt und Herr Müller</p>
                <p className="italic">
                  „Frau Meinhardt (Auszubildende) kommt aufgeregt zu dir: ‚Herr Müller (78, leicht dementiell verändert, aber situativ orientiert) soll morgen zur Koloskopie. Der Stationsarzt hat kurz reingeschaut, ihm den Aufklärungsbogen hingelegt und gesagt: Unterschreiben Sie hier mal eben, ich hab gleich OP. Herr Müller hat Angst, versteht die Risiken gar nicht und weint. Jetzt bittet mich die Pflegeleitung, ihm die Sedierungsrisiken zu erklären und schnell die Unterschrift einzuholen, damit die Vorbereitung starten kann.‘“
                </p>
                <p className="mt-2 font-medium text-white">
                  Wie handelst du als Praxisanleitung? Was lehrst du Frau Meinhardt über die rechtlichen Grenzen, die Pflichten des Arztes und den Patientenschutz?
                </p>
              </div>
            </div>

            {/* Schritt 1: Rechtsanalyse */}
            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-black flex items-center justify-center shrink-0 z-10">1</div>
              <div className="w-full z-10">
                <p className="text-slate-200 font-bold text-sm mb-2">Schritt 1: Juristische & Ethische Ersteinschätzung</p>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">
                  Analysiere die Situation juristisch: Welche <strong>3 gravierenden Rechtsbrüche bzw. Risiken</strong> drohen hier akut? (Hinweis: Denke an den Arztvorbehalt bei Eingriffsaufklärung § 630e BGB, mangelnde Freiwilligkeit / unzureichende Aufklärung sowie die fragliche Einwilligungsfähigkeit).
                </p>
                <StyledTextarea
                  label="Deine Analyse der Rechtsbrüche & Risiken"
                  description="Welche juristischen Grenzen werden hier von Stationsarzt und Pflegeleitung überschritten?"
                  value={case8Einschaetzung}
                  onChange={(e: any) => setCase8Einschaetzung(e.target.value)}
                  placeholder="1. Verstoß gegen Arztvorbehalt (§ 630e BGB): Pflege darf keine Risikoaufklärung für invasive Eingriffe/Sedierung durchführen...&#10;2. Keine informierte und freiwillige Einwilligung (Druck, Patient weint und versteht Risiken nicht)...&#10;3. Einwilligungsfähigkeit muss vorab geprüft werden (situative Orientierung validieren)..."
                />
              </div>
            </div>

            {/* Schritt 2: Sofortige Handlung */}
            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-900 font-black flex items-center justify-center shrink-0 z-10">2</div>
              <div className="w-full z-10">
                <p className="text-slate-200 font-bold text-sm mb-2">Schritt 2: Sofortige Intervention & Schutzfunktion</p>
                <p className="text-slate-300 text-sm mb-4 leading-relaxed [text-wrap:pretty]">
                  Wie intervenierst du unmittelbar? Wie schützt du Herrn Müller vor einer unaufgeklärten Maßnahme und wie stellst du dich schützend vor deine Auszubildende gegenüber der Stations-/Pflegeleitung?
                </p>
                <StyledTextarea
                  label="Deine Sofortmaßnahmen & Pädagogische Intervention"
                  description="Konkrete Schritte: Stoppen der Vorbereitung, Beruhigung von Herrn Müller, Remonstration / Gespräch mit Pflegeleitung & Arzt."
                  value={case8Handlung}
                  onChange={(e: any) => setCase8Handlung(e.target.value)}
                  placeholder="1. Patientenschutz: Frau Meinhardt sofort anweisen, keine Aufklärung durchzuführen und keine Unterschrift einzuholen. Zu Herrn Müller gehen, ihn beruhigen und versichern, dass nichts gegen seinen Willen geschieht.&#10;2. Remonstration & Leitung: Sachliches Gespräch mit der Pflegeleitung suchen, auf Arztvorbehalt hinweisen und die rechtswidrige Delegation ablehnen.&#10;3. Ärztliche Nachforderung: Den Arzt auffordern, die ordnungsgemäße Aufklärung persönlich durchzuführen oder den Eingriff zu verschieben..."
                />
              </div>
            </div>

            {/* Schritt 3: KI Sparringspartner */}
            <div className="flex items-start gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white font-black flex items-center justify-center shrink-0 z-10">3</div>
              <div className="w-full z-10">
                <h4 className="font-bold text-white mb-2 [text-wrap:balance]">Schritt 3: KI-Sparringspartner & Reflexion (CREATE-Framework)</h4>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed [text-wrap:pretty]">
                  Nutze moderne KI als sokratischen Mentor oder Effizienz-Generator für rechtssichere Argumentation und das didaktische Nachgespräch mit Frau Meinhardt.
                </p>
                
                <div className="space-y-4">
                  <CopyBlock
                    title="Master-Prompt 1: Sokratischer Reflexionsdialog (Pflegepädagogik & Medizinrecht)"
                    titleColor="text-amber-500"
                    content={`C (Character): Agiere als hochqualifizierter Pflegepädagoge und Experte für Medizinrecht und Pflegeethik.

R (Request): Führe mit mir einen fordernden, sokratischen Reflexionsdialog über den Fall 'Erzwungene Aufklärung bei Herrn Müller'. Hilf mir als Praxisanleitung, die juristischen Fallstricke (Arztvorbehalt § 630e BGB, unzulässige Delegation, mangelnde Freiwilligkeit, fragliche Einwilligungsfähigkeit) und die pädagogische Begleitung von Azubi Frau Meinhardt tiefgehend zu analysieren.

E (Examples): Stelle offene, bohrende Leitfragen wie z. B.: "Wenn die Pflegeleitung Druck macht, welche rechtliche Schutzfunktion hat hier das Remonstrationsrecht für dich und Frau Meinhardt?" oder "Wie kannst du Herrn Müllers situative Orientierung im Vorfeld validieren, bevor eine Sedierung überhaupt denkbar ist?"

A (Adjustments): Stelle immer nur EINE einzige präzise Frage auf einmal. Warte zwingend auf meine Antwort! Liefere keine voreiligen Musterlösungen, sondern fordere meine ethische und juristische Urteilskraft heraus.

T (Type of Output): Interaktiver Mentor-Dialog (Chat).

E (Extras): Starte den Dialog, indem du kurz auf den Fall eingehst und mir deine erste Leitfrage zur juristischen und ethischen Ersteinschätzung stellst.

Hier sind meine Daten:
Fall: Herr Müller (78, sedierungsbedürftige Koloskopie), Azubi Frau Meinhardt soll ärztliche Aufklärung übernehmen
Meine Einschätzung der Rechtsbrüche:
${case8Einschaetzung || '[Bitte Stichpunkte zu den Rechtsbrüchen einfügen]'}
Meine geplanten Interventionen:
${case8Handlung || '[Bitte Stichpunkte zur Intervention einfügen]'}`}
                  />

                  <div className="flex justify-end pt-1">
                    <a href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg text-sm">
                      Zu Gemini wechseln <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <CopyBlock
                    title="Master-Prompt 2: Strukturierter Handlungs- & Dokumentationsleitfaden (Effizienz)"
                    titleColor="text-emerald-400"
                    content={`C (Character): Agiere als analytischer Pflegepädagoge und Fachjurist für das Gesundheitswesen.

R (Request): Generiere aus meinen stichpunktartigen Notizen und Handlungsansätzen einen rechtssicheren, strukturierten Handlungs- und Dokumentationsleitfaden sowie einen Entwurf für ein klärendes Gespräch mit der Pflegeleitung und dem Stationsarzt (inkl. Remonstration/Dienstweg).

E (Examples): Gliedere die Antwort in: 1. Sofortmaßnahmen zum Schutz des Patienten (Sedierungsvorbereitung stoppen, Beruhigung), 2. Pädagogisches Schutzkonzept für Frau Meinhardt (Grenze der Delegation erklären), 3. Rechtliche Begründung (§ 630e BGB: Arztvorbehalt), 4. Entwurf eines rechtssicheren Doku-Eintrags im Pflegebericht.

A (Adjustments): Höchste juristische Präzision, deeskalierender aber kompromissloser Ton bzgl. Patientenschutz.

T (Type of Output): Strukturierter Leitfaden mit klaren Handlungsschritten und Formulierungshilfen.

E (Extras): Beziehe meine Notizen ein:
Notizen zur Situation & Ersteinschätzung:
${case8Einschaetzung || '[Keine Eingabe]'}
Geplante Sofortmaßnahmen & Intervention:
${case8Handlung || '[Keine Eingabe]'}`}
                  />
                </div>
              </div>
            </div>

            {/* Schritt 4: Board Transfer */}
            <div className="flex gap-4 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/30">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">4</div>
              <div className="w-full">
                <h4 className="font-bold text-emerald-400 mb-1 [text-wrap:balance]">Schritt 4: Transfer ins fobizz Board</h4>
                <p className="text-sm text-slate-300 mb-3 leading-relaxed [text-wrap:pretty]">Kopiere deine Ausarbeitung und poste deine Erkenntnisse auf unserem fobizz Azubi-Board in der Spalte "Frau Meinhardt", damit alle Beteiligten die Leitlinien nachvollziehen können.</p>
                {renderBoard("https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?embed=true&token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8", "fobizz Azubi-Board")}
              </div>
            </div>

            {renderDocumentationStep(5, 'Frau Meinhardt')}
          </div>
        );
      default:
        return <div className="text-slate-400 p-8 text-center">Akte wird geladen...</div>;
    }
  };

  const caseInfo = CASES.find(c => c.id === caseId);

  return (
    <div className="relative h-full flex flex-col">
      <div className="border-b border-slate-800 pb-6 mb-6 shrink-0">
        <span className="text-amber-500 font-black text-xs tracking-widest uppercase block mb-1">{caseInfo?.tag}</span>
        <h2 className="text-2xl font-black text-white tracking-tight [text-wrap:balance]">{caseInfo?.title}</h2>
        <p className="text-slate-300 mt-2 leading-relaxed [text-wrap:pretty]">{caseInfo?.subtitle}</p>
      </div>

      <div className="pb-8 flex-1">
        {renderContent()}
      </div>

      {/* Fullscreen Board Modal */}
      {boardModal && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-sm pointer-events-auto">
          <div className="w-full max-w-[95vw] h-[95vh] bg-slate-900 rounded-2xl flex flex-col border border-slate-700 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-slate-800 bg-slate-850 shrink-0">
              <h3 className="font-bold text-white flex items-center gap-2 [text-wrap:balance]"><Maximize2 className="w-5 h-5 text-amber-500" /> fobizz Board (Vollbild)</h3>
              <div className="flex items-center gap-4">
                <a href={boardModal.replace('?embed=true&', '?')} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-400 text-sm font-bold flex items-center gap-1">
                  <ExternalLink className="w-4 h-4" /> Neuen Tab öffnen
                </a>
                <button onClick={() => setBoardModal(null)} className="text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors">
                  Schließen
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-white relative overflow-auto -webkit-overflow-scrolling-touch">
              <iframe src={boardModal} frameBorder="0" className="absolute inset-0 w-full h-full" allowFullScreen style={{ minHeight: '100%' }}></iframe>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Large QR Modal */}
      {largeQr && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm pointer-events-auto" onClick={() => setLargeQr(null)}>
          <div className="bg-white p-8 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img src={largeQr} alt="QR Code Large" className="w-64 h-64 sm:w-80 sm:h-80 mx-auto" />
            <button onClick={() => setLargeQr(null)} className="mt-8 w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors uppercase tracking-widest">Schließen</button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
