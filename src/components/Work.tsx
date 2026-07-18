import { motion } from "motion/react";
import { resume } from "../data/resume";
import { ScrollReveal } from "./ScrollReveal";
import { DisasmLine } from "./DisasmLine";

export function Work() {
  return (
    <section id="work" className="px-6 py-10 border-t border-line">
      <ScrollReveal>
        <div className="mb-6">
          <DisasmLine addr="0x00401180" bytes="" opcode=".func work_history" />
          <div className="text-[12px] tracking-[.08em] text-text3 mt-1 ml-[80px]">
            <span className="text-keyword">;</span> 2 functions — Self_employed, Early_stage_startup
            <span className="mx-3 text-line">│</span>
            <span className="text-keyword">;</span> 2023–present
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-8">
        {resume.work.map((job, i) => (
          <ScrollReveal key={i} delay={i * .15}>
            <motion.div className="border border-line/50 rounded-sm bg-panel/30 p-4 transition-all duration-300 hover:border-addr/30 hover:bg-panel/50 group">
              <DisasmLine addr={`0x0040118${i + 4}`} opcode="call" bytes="e8">
                <span className="text-func font-medium text-[clamp(1rem,1.4vw,1.15rem)]">&lt;{job.company.replace(/\s+/g, "_")}&gt;</span>
              </DisasmLine>
              <DisasmLine addr={`0x0040119${i + 4}`} opcode=".arg" bytes="" indent>
                <span className="text-string">role:</span>
                <span className="text-text2 ml-1">"{job.role}"</span>
              </DisasmLine>
              <DisasmLine addr={`0x004011a${i + 4}`} opcode=".arg" bytes="" indent>
                <span className="text-string">t:</span>
                <span className="text-addr ml-1">{job.startDate}</span>
                <span className="text-text3"> → </span>
                <span className="text-highlight">{job.endDate}</span>
                <span className="text-text3 mx-2">|</span>
                <span className="text-string">loc:</span>
                <span className="text-text2 ml-1">"{job.location}"</span>
              </DisasmLine>
              <div className="mt-2 ml-[310px]">
                {job.highlights.map((h, j) => (
                  <motion.div key={j}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ delay: .1 + j * .1 }}
                  >
                    <DisasmLine addr={`0x004011c${j}`} opcode={j === 0 ? "mov" : "add"} bytes={j === 0 ? "48 b8" : "48 01"} indent>
                      <span className="text-text2">{h}</span>
                    </DisasmLine>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-4 ml-[80px] text-[10px] text-text3/50">
        <span className="text-keyword">;</span> Stack frame: 32 bytes · callee-saved: rbx, rbp
      </div>
    </section>
  );
}
