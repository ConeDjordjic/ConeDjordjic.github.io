interface Props { addr: string; opcode: string; bytes: string; children?: React.ReactNode; indent?: boolean }

export function DisasmLine({ addr, opcode, bytes, children, indent }: Props) {
  return (
    <div className={`flex items-start text-sm tracking-[.03em] leading-[1.75] ${indent ? "ml-4" : ""}`}>
      <span className="text-addr min-w-[84px] shrink-0">{addr}</span>
      <span className="text-text3 min-w-[64px] shrink-0 text-[12px]">{bytes}</span>
      <span className="text-keyword min-w-[150px] shrink-0 text-[12px]">{opcode}</span>
      <span className="text-text">{children}</span>
    </div>
  );
}
