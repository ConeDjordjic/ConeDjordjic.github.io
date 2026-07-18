import { resume } from "../data/resume";
import { DisasmLine } from "./DisasmLine";

export function Footer() {
  return (
    <footer id="footer" className="px-6 py-12 border-t border-line">
      <div className="mb-5">
        <DisasmLine addr="0x00401d40" bytes="" opcode=".data contact_block" />
        <div className="text-[12px] tracking-[.06em] text-text3 mt-1.5 ml-[80px]">
          <span className="text-keyword">;</span> {resume.personal.status}
        </div>
      </div>

      <div className="border border-line/30 rounded-sm bg-panel/30 p-5">
        <DisasmLine addr="0x00401d44" opcode=".string" bytes="" indent>
          <a href={`mailto:${resume.personal.email}`} className="text-string no-underline hover:underline text-sm">
            "{resume.personal.email}"
          </a>
        </DisasmLine>
        <DisasmLine addr="0x00401d60" opcode=".string" bytes="" indent>
          <a href={resume.personal.phoneHref} className="text-addr no-underline hover:underline text-sm">
            "{resume.personal.phone}"
          </a>
        </DisasmLine>
        <DisasmLine addr="0x00401d70" opcode=".string" bytes="" indent>
          <span className="text-text2 text-sm">"{resume.personal.location}"</span>
        </DisasmLine>
        <DisasmLine addr="0x00401d80" opcode=".string" bytes="" indent>
          <a href={`https://github.com/${resume.social.github}`} target="_blank" rel="noreferrer"
            className="text-func no-underline hover:underline text-sm">
            "github.com/{resume.social.github}"
          </a>
        </DisasmLine>

        <div className="mt-5 ml-[310px] text-[12px] text-text3/50 flex gap-5">
          <span><span className="text-keyword">;</span> built: {new Date().getFullYear()}</span>
          <span><span className="text-keyword">;</span> by: {resume.personal.nameFirst} {resume.personal.nameLast}</span>
        </div>
      </div>
    </footer>
  );
}
