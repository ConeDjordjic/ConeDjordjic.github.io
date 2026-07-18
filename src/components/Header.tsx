import { motion } from "motion/react";
import { resume } from "../data/resume";
import { DisasmLine } from "./DisasmLine";

const props = [
  { label: "Class", value: "ELF64" },
  { label: "Machine", value: "x86_64" },
  { label: "Endian", value: "LE" },
  { label: "Type", value: "EXEC" },
  { label: "ABI", value: "System V" },
  { label: "NX", value: "enabled", ok: true },
  { label: "ASLR", value: "enabled", ok: true },
  { label: "Stack Canary", value: "present", ok: true },
  { label: "PIE", value: "enabled", ok: true },
  { label: "RELRO", value: "full", ok: true },
];

export function Header() {
  const { nameFirst, nameLast, email, phone, phoneHref, location, tagline, taglineEmphasis } = resume.personal;

  return (
    <section id="header" className="px-6 py-10">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .6 }}>
        <div className="mb-4 text-[12px] tracking-[.08em] text-text3 uppercase">
          <span className="text-keyword">;</span> SEGMENT: .text
          <span className="mx-3 text-line">│</span>
          <span className="text-keyword">;</span> ARCH: {nameFirst}_{nameLast}
          <span className="mx-3 text-line">│</span>
          <span className="text-keyword">;</span> BUILD: 2026
        </div>

        <div className="border border-line rounded-sm bg-panel/50 p-5">
          <DisasmLine addr="0x00401000" opcode=".global" bytes="48 8b 05" />
          <DisasmLine addr="0x00401001" opcode=".type" bytes="f0 00 00">
            <span className="text-warn font-medium text-[clamp(1.2rem,2vw,1.4rem)]">{nameFirst} {nameLast}</span>
            <span className="text-text3 ml-2">@function</span>
          </DisasmLine>

          <div className="my-3 border-t border-line/50" />

          <DisasmLine addr="0x00401008" opcode="push" bytes="55" indent />
          <DisasmLine addr="0x00401009" opcode="mov" bytes="48 89 e5" indent>
            <span className="text-text2 text-[clamp(.95rem,1.5vw,1.05rem)]">{tagline} <span className="text-highlight font-medium">{taglineEmphasis}</span>.</span>
          </DisasmLine>
          <DisasmLine addr="0x00401012" opcode="lea" bytes="48 8d 3d" indent>
            <span className="text-string">{email}</span>
            <span className="text-text3 mx-2">,</span>
            <span className="text-addr">{phone}</span>
          </DisasmLine>
          <DisasmLine addr="0x0040101a" opcode="call" bytes="e8 41 01" indent>
            <span className="text-func">&lt;{location.replace(/\s*\/\s*/, "_")}&gt;</span>
          </DisasmLine>

          <div className="my-3 border-t border-line/50" />

          <DisasmLine addr="0x00401022" opcode="cmp" bytes="48 39" indent>
            <span className="text-string">"{resume.personal.status}"</span>
            <span className="text-text3">, 0</span>
          </DisasmLine>
          <DisasmLine addr="0x00401028" opcode="jne" bytes="75 0a" indent>
            <span className="text-highlight">available_for_work</span>
            <span className="inline-block ml-2 w-2 h-2 rounded-full bg-keyword animate-[blink_1s_ease-in-out_infinite]" />
          </DisasmLine>

          <div className="my-3 border-t border-line/50" />

          <DisasmLine addr="0x00401030" opcode="mov" bytes="48 c7" indent>
            <a href={`mailto:${email}`} className="text-func no-underline hover:underline">{email}</a>
          </DisasmLine>
          <DisasmLine addr="0x00401037" opcode="mov" bytes="48 c7" indent>
            <a href={phoneHref} className="text-string no-underline hover:underline">{phone}</a>
          </DisasmLine>
        </div>

        <div className="mt-4 border border-line/40 rounded-sm bg-panel/30 p-4">
          <DisasmLine addr="0x00401050" opcode=".comment" bytes="">
            <span className="text-text3 text-[12px]">; Binary properties (checksec)</span>
          </DisasmLine>
          <div className="ml-[310px] mt-2 grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-1.5">
            {props.map(p => (
              <div key={p.label} className="flex items-center gap-1.5 text-xs">
                <span className="text-text3">{p.label}:</span>
                <span className={p.ok ? "text-keyword" : "text-text2"}>{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
