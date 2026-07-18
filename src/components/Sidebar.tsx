import { useEffect, useState } from "react";

interface Props { onSelect: (id: string) => void; onClick: (id: string) => void; active: string }

const symbols = [
  { addr: "0x00401000", label: "_start", id: "header", type: "entry" },
  { addr: "0x00401180", label: "work_history", id: "work", type: "func" },
  { addr: "0x00401600", label: "projects", id: "projects", type: "func" },
  { addr: "0x00401a80", label: "skills_table", id: "skills", type: "data" },
  { addr: "0x00401c00", label: "education", id: "education", type: "func" },
  { addr: "0x00401d40", label: "contact_block", id: "footer", type: "data" },
];

export function Sidebar({ onSelect, onClick, active }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.id;
            if (id) onSelect(id);
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );

    symbols.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [onSelect]);

  const types = [
    { key: "entry", label: "Entry points", icon: "▶", color: "text-warn" },
    { key: "func", label: "Functions", icon: "ƒ", color: "text-highlight" },
    { key: "data", label: "Data", icon: "⬡", color: "text-string" },
  ];

  return (
    <aside className="hidden lg:block w-[250px] min-w-[250px] bg-panel border-r border-line sticky top-[56px] h-[calc(100vh-56px-28px)] overflow-y-auto scrollbar">
      <div className="px-4 py-3 border-b border-line text-[12px] tracking-[.1em] uppercase text-text3 flex items-center justify-between sticky top-0 bg-panel z-10">
        <span>Symbols</span>
        <span className="text-addr">{symbols.length}</span>
      </div>

      <div className="py-1">
        {types.map(type => {
          const items = symbols.filter(s => s.type === type.key);
          return (
            <div key={type.key}>
              <div className="px-4 py-1.5 text-[12px] tracking-[.08em] uppercase text-text3/50 flex items-center justify-between">
                <span>{type.label}</span>
                <span>{items.length}</span>
              </div>
              {items.map(s => (
                <button
                  key={s.id}
                  onClick={() => onClick(s.id)}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`w-full text-left pl-4 pr-3 py-1.5 text-xs tracking-[.03em] flex items-center gap-2 transition-all duration-150 ${
                    active === s.id
                      ? "bg-panel2 text-text border-l-[3px] border-keyword"
                      : "text-text2 border-l-[3px] border-transparent hover:bg-panel2/50 hover:text-text hover:border-l-line"
                  }`}
                >
                  <span className={`${type.color} text-[13px] min-w-[16px] text-center`}>
                    {hovered === s.id && active !== s.id ? "→" : type.icon}
                  </span>
                  <span className="text-addr text-[12px] min-w-[72px]">{s.addr}</span>
                  <span className={active === s.id ? type.color : ""}>{s.label}</span>
                  {active === s.id && (
                    <span className="ml-auto w-1 h-1 rounded-full bg-keyword animate-[blink_1s_ease-in-out_infinite]" />
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 border-t border-line text-[12px] text-text3/50 sticky bottom-0 bg-panel">
        <span className="text-keyword">;</span> {symbols.length} symbols
      </div>
    </aside>
  );
}
