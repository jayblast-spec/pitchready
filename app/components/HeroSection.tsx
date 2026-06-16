"use client";

import { motion } from "framer-motion";

export default function HeroSection({ onAnalyzeClick }: { onAnalyzeClick: () => void }) {
  return (
    <section className="gold-bg circuit-grid relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-accent/6 blur-[130px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent-2"
        >
          <span>◈</span> AI startup analyzer · Free · YC-style feedback
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Your startup idea.
          <br />
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Ruthlessly evaluated.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          Describe your startup idea and get an honest AI analysis: market sizing, ideal customer profile,
          competitive moat, top risks, and concrete next steps — investor-grade, in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <button
            onClick={onAnalyzeClick}
            className="rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-background hover:opacity-90 active:scale-95 transition-all"
          >
            Analyze my idea →
          </button>
          <span className="text-xs text-muted">Honest feedback · No fluff · No signup</span>
        </motion.div>

        {/* Score preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-4 w-full max-w-xs rounded-2xl border border-border bg-surface p-5 text-left shadow-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-foreground">Pitch Score</p>
            <span className="text-2xl font-black text-accent">72</span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "72%" }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
            />
          </div>
          <div className="space-y-1.5 text-xs">
            {["Market sizing: Promising", "ICP: Well-defined", "Moat: Weak — needs work"].map((s, i) => (
              <motion.p
                key={s}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-muted"
              >
                {s}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted"
      >
        <span className="text-xs">Pitch it below</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className="h-4 w-px bg-muted/50" />
      </motion.div>
    </section>
  );
}
