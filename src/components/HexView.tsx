import { useMemo, useRef, useEffect } from "react";

function encode(str: string): number[] {
  return Array.from(str).map(c => c.charCodeAt(0));
}

const SECTION_MAP: Record<string, string[]> = {
  header:   [".elf_header", ".text:header"],
  work:     [".text:work[0]", ".text:work[1]"],
  projects: [".text:projects[0]", ".text:projects[1]", ".text:projects[2]", ".text:projects[3]"],
  skills:   [".rodata:stack"],
  education:[".data:education"],
  footer:   [".data:contact"],
};

interface Props {
  activeSection?: string;
  hoveredSection?: string | null;
}

export function HexView({ activeSection, hoveredSection }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { bytes, annotations, rows } = useMemo(() => {
    const segs: { label: string; data: number[]; color: string }[] = [
      { label: ".elf_header", data: [...Array(64)].map((_, i) => [0x7f,0x45,0x4c,0x46,0x02,0x01,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0x3e,0x00,0x01,0x00,0x00,0x00,0x00,0x10,0x40,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x40,0x00,0x38,0x00,0x01,0x00,0x00,0x00][i]), color: "text-text3" },
      { label: ".text:header", data: encode("Nemanja_Djordjic_2026"), color: "text-warn" },
      { label: ".text:work[0]", data: encode("Self-employed_malware_analysis_pentest"), color: "text-func" },
      { label: ".text:work[1]", data: encode("Early-stage_startup_Full-stack_NoviSad"), color: "text-func" },
      { label: ".text:projects[0]", data: encode("miru_MCP_Grafana_Prometheus_Rust"), color: "text-highlight" },
      { label: ".text:projects[1]", data: encode("tripwire_React_dashboard_monitor"), color: "text-highlight" },
      { label: ".text:projects[2]", data: encode("kz_wc_replacement_CLI_Rust_90x"), color: "text-highlight" },
      { label: ".text:projects[3]", data: encode("unpack_malware_triage_PE_analysis"), color: "text-highlight" },
      { label: ".rodata:stack", data: encode("Go_Rust_Python_TS_C#_React_PG_Redis_Docker_NGINX_Linux_ASM_Ghidra_x64dbg"), color: "text-keyword" },
      { label: ".data:contact", data: encode("cone.djordjic@gmail.com_+381652097466"), color: "text-string" },
      { label: ".data:education", data: encode("FTN_EECS_Bachelors_2027_NoviSad"), color: "text-string" },
    ];

    const allBytes: number[] = [];
    const annotations: { offset: number; label: string; color: string; len: number }[] = [];
    let off = 0;

    for (const seg of segs) {
      annotations.push({ offset: off, label: seg.label, color: seg.color, len: seg.data.length });
      allBytes.push(...seg.data);
      const pad = 16 - (allBytes.length % 16);
      if (pad < 16) {
        for (let i = 0; i < pad; i++) allBytes.push(0x00);
      }
      off = allBytes.length;
    }

    return { bytes: allBytes, annotations, rows: Math.ceil(allBytes.length / 16) };
  }, []);

  const highlightLabels = useMemo(() => {
    const target = hoveredSection ?? activeSection;
    if (!target || !SECTION_MAP[target]) return new Set<string>();
    return new Set(SECTION_MAP[target]);
  }, [hoveredSection, activeSection]);

  useEffect(() => {
    if (!activeSection || !containerRef.current) return;
    const labels = SECTION_MAP[activeSection];
    if (!labels) return;
    const ann = annotations.find(a => labels.includes(a.label));
    if (!ann) return;
    const targetRow = Math.floor(ann.offset / 16);
    const rowEl = containerRef.current.querySelector(`[data-row="${targetRow}"]`);
    if (rowEl) {
      rowEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeSection, annotations]);

  const isRowHighlighted = (row: number) => {
    return annotations.some(a => {
      const start = Math.floor(a.offset / 16);
      const end = Math.floor((a.offset + a.len - 1) / 16);
      return row >= start && row <= end && highlightLabels.has(a.label);
    });
  };

  return (
    <aside className="hidden xl:block w-[370px] min-w-[370px] bg-panel border-l border-line sticky top-[56px] h-[calc(100vh-56px-28px)] overflow-y-auto scrollbar">
      <div className="px-4 py-3 border-b border-line text-[12px] tracking-[.1em] uppercase text-text3 flex items-center justify-between sticky top-0 bg-panel z-10">
        <span>Hex Dump</span>
        <span className="text-addr">0x0000–0x{(bytes.length - 1).toString(16).toUpperCase()}</span>
      </div>

      <div ref={containerRef} className="p-2.5 font-mono text-[13px] leading-[1.9] tracking-[.05em]">
        {Array.from({ length: rows }, (_, row) => {
          const rowBytes = bytes.slice(row * 16, row * 16 + 16);
          const addr = (row * 16).toString(16).padStart(8, "0");

          const ann = annotations.find(a => {
            const start = Math.floor(a.offset / 16);
            return row === start;
          });

          const endAnn = annotations.find(a => Math.floor((a.offset + a.len - 1) / 16) === row);
          const highlighted = isRowHighlighted(row);

          return (
            <div
              key={row}
              data-row={row}
              className={`group flex items-start transition-all duration-300 py-[1px] ${
                highlighted ? "bg-warn/10 shadow-[inset_4px_0_0_#f2a5bc]" : "hover:bg-panel2/60"
              } ${ann ? "border-t border-line/30" : ""}`}
            >
              <span className={`min-w-[70px] shrink-0 transition-colors duration-300 ${highlighted ? "text-warn" : "text-addr"}`}>{addr}</span>
              <span className="flex gap-[1px] flex-wrap max-w-[136px] shrink-0">
                {rowBytes.map((b, i) => {
                  const globalOff = row * 16 + i;
                  const inSegment = annotations.some(a => globalOff >= a.offset && globalOff < a.offset + a.len);
                  const hex = b.toString(16).padStart(2, "0");
                  const isZero = b === 0x00;
                  if (isZero && !inSegment) return <span key={i} className={highlighted ? "text-text3/25" : "text-text3/15"}>{hex}</span>;
                  if (isZero && inSegment) return <span key={i} className={highlighted ? "text-text3/45" : "text-text3/30"}>{hex}</span>;
                  if (b < 0x20) return <span key={i} className={highlighted ? "text-addr/55" : "text-addr/40"}>{hex}</span>;
                  if (b >= 0x7f) return <span key={i} className={highlighted ? "text-highlight/65" : "text-highlight/50"}>{hex}</span>;
                  return <span key={i} className={`transition-colors duration-300 ${highlighted ? "text-text" : "text-text2 group-hover:text-text"}`}>{hex}</span>;
                })}
              </span>
              <span className={`ml-2 min-w-[80px] text-[12px] transition-colors duration-300 ${highlighted ? "text-text" : "text-text3"}`}>
                {rowBytes.map(b => {
                  const c = String.fromCharCode(b);
                  return c.match(/[\x20-\x7e]/) ? c : ".";
                }).join("")}
              </span>
              {ann && (
                <span className={`ml-2 text-[11px] ${ann.color} shrink-0 font-medium transition-all duration-300 ${
                  highlighted ? "opacity-100" : "opacity-70"
                }`}>
                  ;{ann.label}
                </span>
              )}
              {endAnn && !ann && (
                <span className="ml-2 text-[11px] text-text3/30 shrink-0 italic">
                  ;continued
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-4 py-2 border-t border-line text-[12px] font-mono text-text3/60 sticky bottom-0 bg-panel">
        <span className="text-keyword">;</span> {annotations.length} sections
        <span className="mx-2 text-line">│</span>
        <span className="text-addr">{bytes.length} bytes</span>
        <span className="mx-2 text-line">│</span>
        <span>ELF64 · x86-64 · LE</span>
      </div>
    </aside>
  );
}