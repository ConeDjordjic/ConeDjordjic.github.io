import { resume } from "../data/resume";
import { ScrollReveal } from "./ScrollReveal";
import { DisasmLine } from "./DisasmLine";

export function Education() {
  const { degree, school, expected, location, coursework } = resume.education;

  return (
    <section id="education" className="px-6 py-10 border-t border-line">
      <ScrollReveal>
        <div className="mb-6">
          <DisasmLine addr="0x00401c00" bytes="" opcode=".func education" />
          <div className="text-[12px] tracking-[.08em] text-text3 mt-1 ml-[80px]">
            <span className="text-keyword">;</span> FTN, EECS, expected 2027
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={.15}>
        <div className="border border-line/40 rounded-sm bg-panel/30 p-4">
          <DisasmLine addr="0x00401c04" opcode="push" bytes="55" indent>
            <span className="text-string">"{degree}"</span>
          </DisasmLine>
          <DisasmLine addr="0x00401c08" opcode="mov" bytes="48 89" indent>
            <span className="text-text2">{school}</span>
            <span className="text-text3">,</span>
            <span className="text-addr ml-1">{location}</span>
          </DisasmLine>
          <DisasmLine addr="0x00401c10" opcode="lea" bytes="48 8d" indent>
            <span className="text-warn">expected:</span>
            <span className="text-highlight ml-1">"{expected}"</span>
          </DisasmLine>
          <div className="my-2 ml-[310px]">
            <p className="text-text2 text-xs leading-relaxed">{coursework}</p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
