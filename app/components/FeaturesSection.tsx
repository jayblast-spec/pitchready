"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function RulerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h18v8H3z" />
      <path d="M7 8v3M11 8v3M15 8v3M19 8v3" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.4-3.6 4.2-5.5 7-5.5s5.6 1.9 7 5.5" />
    </svg>
  );
}
function MoatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M4 9l8 5 8-5" />
    </svg>
  );
}
function RiskIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l9 16H3z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}
function BriefcaseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="1.5" />
      <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}

const FEATURES = [
  { icon: RulerIcon, title: "Market sizing", body: "TAM estimate with reasoning — not just a number but why that market is the right size for your idea right now." },
  { icon: UserIcon, title: "ICP definition", body: "The AI identifies your specific ideal customer, their pain point, and their real willingness to pay for a solution." },
  { icon: MoatIcon, title: "Moat assessment", body: "Honest evaluation of your defensibility. If there's no moat yet, the AI tells you exactly what would create one." },
  { icon: RiskIcon, title: "Risk breakdown", body: "Top risks ranked by severity, each with a concrete mitigation you can act on now. No vague warnings." },
  { icon: TargetIcon, title: "Next steps", body: "Specific, prioritized actions to take in the next 30 days — not generic advice, tailored to your idea." },
  { icon: BriefcaseIcon, title: "Investor take", body: "How an investor would actually view this pitch — what they'd fund, what they'd pass on, and why." },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          The feedback founders{" "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            need to hear
          </span>
        </h2>
        <p className="mt-3 text-muted">Not cheerleading — real signal on whether your idea is worth building.</p>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-2xl border border-border bg-surface p-5 hover:border-accent/40 transition-colors"
          >
            <div className="icon-3d mb-3"><f.icon /></div>
            <p className="mb-1 font-semibold text-foreground">{f.title}</p>
            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
