import { useState, useCallback, useRef } from "react";
import { Toolbar } from "./components/Toolbar";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Work } from "./components/Work";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { HexView } from "./components/HexView";
import { StringsPanel } from "./components/StringsPanel";
import { StatusBar } from "./components/StatusBar";

export default function App() {
  const [active, setActive] = useState("header");
  const [rightPanel, setRightPanel] = useState<"hex" | "strings">("hex");
  const scrolling = useRef(false);

  const handleClick = useCallback((id: string) => {
    scrolling.current = true;
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => { scrolling.current = false; }, 800);
  }, []);

  const handleObserve = useCallback((id: string) => {
    if (!scrolling.current) setActive(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Toolbar onToggleRight={() => setRightPanel(p => p === "hex" ? "strings" : "hex")} rightPanel={rightPanel} />
      <div className="flex flex-1">
        <Sidebar onSelect={handleObserve} onClick={handleClick} active={active} />
        <main className="flex-1 min-w-0">
          <Header />
          <Work />
          <Projects />
          <Skills />
          <Education />
          <Footer />
        </main>
        {rightPanel === "hex" ? <HexView /> : <StringsPanel />}
      </div>
      <StatusBar />
    </div>
  );
}
