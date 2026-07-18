import { useMemo } from "react";

export function StringsPanel() {
  const strings = useMemo(() => [
    { offset: "0x00002010", len: 18, val: "Nemanja Djordjic", type: "ASCII" },
    { offset: "0x00002028", len: 26, val: "cone.djordjic@gmail.com", type: "ASCII" },
    { offset: "0x00002048", len: 16, val: "+381 65 209 7466", type: "ASCII" },
    { offset: "0x00002060", len: 30, val: "backend systems & security", type: "ASCII" },
    { offset: "0x00002088", len: 16, val: "reverse engineer", type: "ASCII" },
    { offset: "0x000020a0", len: 13, val: "penetration", type: "ASCII" },
    { offset: "0x000020b8", len: 9, val: "Novi Sad", type: "ASCII" },
    { offset: "0x00002100", len: 13, val: "Self-employed", type: "ASCII" },
    { offset: "0x00002118", len: 32, val: "software engineer & security", type: "ASCII" },
    { offset: "0x00002138", len: 38, val: "Windows malware sample analysis", type: "ASCII" },
    { offset: "0x00002178", len: 28, val: "sandboxed reverse engineering", type: "ASCII" },
    { offset: "0x00002198", len: 32, val: "black-box penetration tests", type: "ASCII" },
    { offset: "0x000021c0", len: 30, val: "privilege escalation chains", type: "ASCII" },
    { offset: "0x00002200", len: 4, val: "miru", type: "ASCII" },
    { offset: "0x00002210", len: 8, val: "tripwire", type: "ASCII" },
    { offset: "0x00002220", len: 2, val: "kz", type: "ASCII" },
    { offset: "0x00002230", len: 6, val: "unpack", type: "ASCII" },
    { offset: "0x00002240", len: 30, val: "PE parsing, API interception", type: "ASCII" },
    { offset: "0x00002268", len: 28, val: "process injection tracing", type: "ASCII" },
    { offset: "0x00002290", len: 2, val: "Go", type: "ASCII" },
    { offset: "0x00002298", len: 4, val: "Rust", type: "ASCII" },
    { offset: "0x000022a0", len: 6, val: "Python", type: "ASCII" },
    { offset: "0x000022b0", len: 10, val: "TypeScript", type: "ASCII" },
    { offset: "0x000022c8", len: 6, val: "Ghidra", type: "ASCII" },
    { offset: "0x000022d8", len: 6, val: "x64dbg", type: "ASCII" },
    { offset: "0x000022e8", len: 9, val: "Wireshark", type: "ASCII" },
    { offset: "0x000022f8", len: 9, val: "BurpSuite", type: "ASCII" },
    { offset: "0x00002310", len: 12, val: "x86/x64 Asm", type: "ASCII" },
    { offset: "0x00002328", len: 10, val: "PostgreSQL", type: "ASCII" },
    { offset: "0x00002340", len: 6, val: "Docker", type: "ASCII" },
    { offset: "0x00002350", len: 5, val: "Redis", type: "ASCII" },
    { offset: "0x00002360", len: 4, val: "gRPC", type: "ASCII" },
    { offset: "0x00002370", len: 5, val: "Linux", type: "ASCII" },
    { offset: "0x00002380", len: 7, val: "English", type: "ASCII" },
    { offset: "0x00002390", len: 7, val: "Serbian", type: "ASCII" },
  ], []);

  return (
    <aside className="hidden xl:block w-[340px] min-w-[340px] bg-panel border-l border-line sticky top-[56px] h-[calc(100vh-56px-28px)] overflow-y-auto scrollbar">
      <div className="px-4 py-3 border-b border-line text-[12px] tracking-[.1em] uppercase text-text3 flex items-center justify-between sticky top-0 bg-panel z-10">
        <span>Strings</span>
        <span className="text-addr">{strings.length}</span>
      </div>

      <div className="font-mono text-[13px] leading-[1.8] tracking-[.04em]">
        {strings.map((s, i) => (
          <div key={i} className="flex items-start px-3 py-0.5 hover:bg-panel2/50 transition-colors group">
            <span className="text-addr text-[12px] min-w-[72px] shrink-0">{s.offset}</span>
            <span className="text-text3 text-[12px] min-w-[52px] shrink-0">{s.len}B</span>
            <span className={`text-[12px] min-w-[48px] shrink-0 ${s.type === "Unicode" ? "text-highlight" : "text-text3/50"}`}>{s.type}</span>
            <span className="text-string group-hover:text-warn transition-colors truncate">"{s.val}"</span>
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-line text-[12px] text-text3/50 sticky bottom-0 bg-panel">
        <span className="text-keyword">;</span> strings extracted: {strings.length} entries
      </div>
    </aside>
  );
}
