"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  { icon: "📏", title: "Market sizing", body: "TAM estimate with reasoning — not just a number but why that market is the right size for your idea right now." },
  { icon: "👤", title: "ICP definition", body: "The AI identifies your specific ideal customer, their pain point, and their real willingness to pay for a solution." },
  { icon: "🏰", title: "Moat assessment", body: "Honest evaluation of your defensibility. If there's no moat yet, the AI tells you exactly what would create one." },
  { icon: "⚠️", title: "Risk breakdown", body: "Top risks ranked by severity, each with a concrete mitigation you can act on now. No vague warnings." },
  { icon: "🎯", title: "Next steps", body: "Specific, prioritized actions to take in the next 30 days — not generic advice, tailored to your idea." },
  { icon: "💼", title: "Investor take", body: "How an investor would actually view this pitch — what they'd fund, what they'd pass on, and why." },
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
            <div className="mb-3 text-2xl">{f.icon}</div>
            <p className="mb-1 font-semibold text-foreground">{f.title}</p>
            <p className="text-sm text-muted leading-relaxed">{f.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
