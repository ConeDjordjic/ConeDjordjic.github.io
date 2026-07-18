import { resume } from "../data/resume";

export function StatusBar() {
  return (
    <div className="sticky bottom-0 z-50 bg-panel2 border-t border-line px-5 h-7 flex items-center justify-between text-[12px] tracking-[.04em] text-text3">
      <div className="flex items-center gap-4">
        <span className="text-keyword">●</span>
        <span>analysis complete</span>
        <span className="text-line">│</span>
        <span className="text-addr">{resume.personal.nameFirst}_{resume.personal.nameLast}.bin</span>
        <span className="text-line">│</span>
        <span>sections: 6</span>
        <span className="text-line">│</span>
        <span>NX: <span className="text-keyword">enabled</span></span>
        <span className="text-line">│</span>
        <span>ASLR: <span className="text-keyword">enabled</span></span>
        <span className="text-line">│</span>
        <span>Stack Canary: <span className="text-warn">present</span></span>
      </div>
      <div className="flex items-center gap-4">
        <span>arch: x86_64</span>
        <span className="text-line">│</span>
        <span>fmt: ELF64</span>
        <span className="text-line">│</span>
        <span className="text-highlight">PIE</span>
        <span className="text-line">│</span>
        <span>{resume.personal.location}</span>
      </div>
    </div>
  );
}
