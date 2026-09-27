import fs from 'fs';

let appCode = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add imports
appCode = appCode.replace(
  "import { ChevronDown, ChevronUp } from 'lucide-react';",
  `import { ChevronDown, ChevronUp, Layers, Bot } from 'lucide-react';
import { OnboardingModal } from './components/OnboardingModal';
import { DokuBoards } from './components/DokuBoards';
import { AILab } from './components/AILab';`
);

// 2. Update navItems
appCode = appCode.replace(
  /const navItems = \[\s*\{ id: 'dashboard'[\s\S]*?\];/,
  `const navItems = [
    { id: 'dashboard', label: 'Zentrale', icon: LayoutDashboard },
    { id: 'doku', label: '3-Ebenen-Boards', icon: Layers },
    { id: 'course', label: 'Stollenausbau', icon: Pickaxe },
    { id: 'methods', label: 'Werkzeuge', icon: Wrench },
    { id: 'ai_lab', label: 'KI-Labor', icon: Bot },
    { id: 'videos', label: 'Archiv', icon: Video },
    { id: 'sources', label: 'Logbuch', icon: Library },
  ];`
);

// 3. Update activeSection rendering
appCode = appCode.replace(
  /\{activeSection === 'dashboard'[\s\S]*?\{activeSection === 'sources' && <Sources key="sources" \/>\}/,
  `{activeSection === 'dashboard' && (
              <Dashboard 
                key="dashboard"
                onStartCourse={() => setActiveSection('course')} 
                progress={(completedSteps.length / COURSE_STEPS.length) * 100}
              />
            )}
            {activeSection === 'doku' && <DokuBoards key="doku" />}
            {activeSection === 'course' && (
              <Course 
                key="course" 
                completedSteps={completedSteps}
                onToggleStep={toggleStepCompletion}
              />
            )}
            {activeSection === 'methods' && <Methods key="methods" />}
            {activeSection === 'ai_lab' && <AILab key="ai_lab" />}
            {activeSection === 'videos' && <VideoLibrary key="videos" />}
            {activeSection === 'sources' && <Sources key="sources" />}`
);

// 4. Add modal state
appCode = appCode.replace(
  "const [isSidebarOpen, setIsSidebarOpen] = useState(true);",
  `const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);`
);

// 5. Add modal rendering
appCode = appCode.replace(
  "return (",
  `return (
    <>
      <OnboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />`
);

appCode = appCode.replace(
  "  );\n}",
  "  );\n}\n"
);
appCode = appCode.replace(
  "    </div>\n  );\n}",
  "    </div>\n    </>\n  );\n}"
);


fs.writeFileSync('src/App.tsx', appCode);
