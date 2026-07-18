import { type ReactNode, useRef } from "react";
import { motion, useInView } from "motion/react";

export function ScrollReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ duration: .4, delay }}>
      {children}
    </motion.div>
  );
}
