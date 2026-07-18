import { motion } from "motion/react";
import { resume } from "../data/resume";
import { ScrollReveal } from "./ScrollReveal";
import { DisasmLine } from "./DisasmLine";

const ordered = [resume.projects[0], resume.projects[1], resume.projects[3], resume.projects[2]];

export function Projects() {
  return (
    <section id="projects" className="px-6 py-10 border-t border-line">
      <ScrollReveal>
        <div className="mb-6">
          <DisasmLine addr="0x00401600" bytes="" opcode=".func projects" />
          <div className="text-[12px] tracking-[.08em] text-text3 mt-1 ml-[80px]">
            <span className="text-keyword">;</span> 4 targets — miru, tripwire, kz, unpack
          </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ordered.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * .1}>
            <motion.div
              className="border border-line/40 rounded-sm bg-panel/30 p-4 h-full transition-all duration-300 hover:border-highlight/20 hover:bg-panel/50 group"
            >
              <DisasmLine addr={`0x0040161${i}`} opcode="call" bytes="e8">
                <span className="text-func font-medium">{p.name}</span>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer"
                    className="ml-2 text-[12px] text-addr no-underline opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                    [→src]
                  </a>
                )}
              </DisasmLine>

              <DisasmLine addr={`0x0040162${i}`} opcode=".arg" bytes="" indent>
                <span className="text-string">id:</span>
                <span className="text-addr ml-1">{p.id}</span>
                <span className="text-text3 mx-2">|</span>
                <span className="text-string">type:</span>
                <span className="text-highlight ml-1">"{p.kicker}"</span>
              </DisasmLine>

              <div className="mt-1.5 ml-[310px]">
                <p className="text-text2 text-xs leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
