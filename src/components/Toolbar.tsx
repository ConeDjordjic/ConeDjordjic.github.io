import { useState } from "react";
import { resume } from "../data/resume";

interface Props { onToggleRight: () => void; rightPanel: string }

export function Toolbar({ onToggleRight, rightPanel }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  const handleMenu = (m: string) => {
    if (m === "View") {
      onToggleRight();
      return;
    }
    setOpen(open === m ? null : m);
  };

  return (
    <header className="sticky top-0 z-50 bg-panel border-b border-line">
      <div className="flex items-center justify-between px-5 h-9 text-xs tracking-[.04em]">
        <div className="flex items-center">
          {["File", "Edit", "View", "Analysis", "Help"].map(m => (
            <div key={m} className="relative">
              <button
                onClick={() => handleMenu(m)}
                onMouseEnter={() => open && setOpen(m)}
                className={`px-3 py-1 rounded-sm transition-colors ${open === m ? "bg-panel2 text-text" : "text-text3 hover:text-text hover:bg-panel2/50"}`}
              >
                {m}
                {m === "View" && (
                  <span className="ml-1.5 text-[11px] text-text3">({rightPanel === "hex" ? "hex" : "str"})</span>
                )}
              </button>
              {open === m && (
                <div className="absolute top-full left-0 mt-0.5 bg-panel2 border border-line rounded-sm py-1 min-w-[160px] shadow-lg z-50"
                  onMouseLeave={() => setOpen(null)}>
                  {m === "File" && (
                    <>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Open binary...</div>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Export analysis</div>
                      <div className="border-t border-line my-0.5" />
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Exit</div>
                    </>
                  )}
                  {m === "Edit" && (
                    <>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Rename function</div>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Patch bytes</div>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Cross-reference</div>
                    </>
                  )}
                  {m === "Analysis" && (
                    <>
                      <div className="px-3 py-1 text-highlight text-[13px] cursor-default">▶ Analyze all</div>
                      <div className="border-t border-line my-0.5" />
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Decompile function</div>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Find strings</div>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Check for vulns</div>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Generate call graph</div>
                    </>
                  )}
                  {m === "Help" && (
                    <>
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">About this binary</div>
                      <div className="px-3 py-1 text-string text-[13px] cursor-default">ELF64 x86-64 • {resume.personal.nameFirst} {resume.personal.nameLast}</div>
                      <div className="border-t border-line my-0.5" />
                      <div className="px-3 py-1 text-text3 text-[13px] cursor-default">Keyboard shortcuts</div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-text3">
          <span className="text-string">{resume.personal.nameFirst.toLowerCase()}_{resume.personal.nameLast.toLowerCase()}.bin</span>
          <span className="text-line">-</span>
          <span className="text-highlight">analysis complete</span>
          <span className="w-2 h-2 rounded-full bg-keyword animate-[blink_1.2s_ease-in-out_infinite]" />
        </div>
      </div>

      <div className="flex items-center gap-1 px-5 h-7 bg-bg border-b border-line text-[13px] tracking-[.04em]">
        <span className="text-addr select-none">▶</span>
        <span className="text-keyword select-none">sym</span>
        <span className="text-text3 select-none">.</span>
        <span className="text-func select-none">load</span>
        <span className="text-text3 select-none">(</span>
        <span className="text-string select-none">"{resume.personal.nameFirst}_{resume.personal.nameLast}.bin"</span>
        <span className="text-text3 select-none">)</span>
        <span className="ml-4 text-text3 text-[12px] select-none">// loaded {resume.personal.status.toLowerCase()}</span>

        <span className="ml-auto flex items-center gap-3 text-[12px] text-text3">
          <span>segments:</span>
          <span className="text-text2">.text</span>
          <span className="text-text2">.data</span>
          <span className="text-text2">.rodata</span>
          <span className="text-text2">.bss</span>
        </span>
      </div>
    </header>
  );
}
