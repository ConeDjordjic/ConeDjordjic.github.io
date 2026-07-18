import { motion } from "motion/react";
import { resume } from "../data/resume";
import { ScrollReveal } from "./ScrollReveal";
import { DisasmLine } from "./DisasmLine";

const skills = resume.skills.find(s => s.type === "chips");
const langs = resume.skills.find(s => s.type === "text");
const chips = (skills?.items as { label: string }[] | undefined) ?? [];
const langItems = (langs?.items as { language: string; level: string }[] | undefined) ?? [];

export function Skills() {
  return (
    <section id="skills" className="px-6 py-10 border-t border-line">
      <ScrollReveal>
        <div className="mb-6">
          <DisasmLine addr="0x00401a80" bytes="" opcode=".data skills_table" />
          <div className="text-[12px] tracking-[.08em] text-text3 mt-1 ml-[80px]">
            <span className="text-keyword">;</span> IMPORTS: {chips.length} symbols
            <span className="mx-3 text-line">│</span>
            <span className="text-keyword">;</span> EXPORTS: {langItems.length} languages
          </div>
        </div>
      </ScrollReveal>

      <DisasmLine addr="0x00401a84" opcode=".import" bytes="">
        <span className="text-text3 text-[12px]">; {skills?.name}</span>
      </DisasmLine>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 ml-[310px]">
        {chips.map((c, i) => (
          <motion.span key={c.label}
            className="text-keyword"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: i * .015, duration: .15 }}
          >
            {c.label}
            {i < chips.length - 1 && <span className="text-text3">,</span>}
          </motion.span>
        ))}
      </div>

      <div className="mt-6">
        <DisasmLine addr="0x00401b10" opcode=".export" bytes="">
          <span className="text-text3 text-[12px]">; {langs?.name}</span>
        </DisasmLine>
        {langItems.map((l, i) => (
          <DisasmLine key={l.language} addr={`0x00401b1${i + 4}`} opcode=".lang" bytes="" indent>
            <span className="text-string">"{l.language}"</span>
            <span className="text-text3">:</span>
            <span className="text-addr ml-2">{l.level}</span>
          </DisasmLine>
        ))}
      </div>
    </section>
  );
}
