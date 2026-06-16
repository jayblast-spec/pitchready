"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PitchAnalysis } from "../api/analyze/route";

const SEVERITY_COLOR = { low: "text-success bg-success/10", medium: "text-warn bg-warn/10", high: "text-danger bg-danger/10", critical: "text-danger bg-danger/15 font-bold" };

const VERDICT_COLOR: Record<PitchAnalysis["verdict"], string> = {
  Strong: "bg-success/15 text-success border-success/30",
  Promising: "bg-accent/15 text-accent-2 border-accent/30",
  "Needs Work": "bg-warn/15 text-warn border-warn/30",
  Risky: "bg-danger/15 text-danger border-danger/30",
};

type State = "idle" | "loading" | "error" | { demo: boolean; analysis: PitchAnalysis };

const PLACEHOLDER = `AI-powered invoice generator for freelancers.

Freelancers waste 30-60 minutes per invoice using bloated tools designed for SMBs.
I'm building a browser-only tool: fill in client details, add line items, download PDF instantly.
No signup, no backend, no monthly fee. Free tool that gets freelancers to trust my brand,
then I upsell a contract generator and payment tracking feature.

Target: solo freelancers $50-150K/year. Pricing: free tool → $9/mo for power features.`;

export default function PitchForm() {
  const [idea, setIdea] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!idea.trim()) return;
    setState("loading");
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setState({ demo: data.demo, analysis: data.analysis });
    } catch {
      setState("error");
    }
  }

  const result = typeof state === "object" ? state : null;
  const a = result?.analysis;

  return (
    <section id="pitch" className="mx-auto w-full max-w-3xl px-4 pb-32">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">Describe your startup idea</label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder={PLACEHOLDER}
            rows={8}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none resize-none"
          />
          <p className="text-xs text-muted">Include: what it does, who it&apos;s for, how you make money, and what makes it different.</p>
        </div>
        <button
          type="submit"
          disabled={state === "loading" || !idea.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {state === "loading" ? (
            <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" /></svg> Analyzing…</>
          ) : "Analyze my idea →"}
        </button>
      </form>

      {state === "error" && <div className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger mb-8">Something went wrong. Please try again.</div>}

      <AnimatePresence>
        {result && a && (
          <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col gap-6">
            {result.demo && (
              <div className="flex items-center gap-2 rounded-xl border border-accent/30 bg-accent-soft px-4 py-2.5 text-xs text-accent-2">
                <span>◈</span> Demo analysis — add a Groq API key to analyze your real idea
              </div>
            )}

            {/* Header */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{a.ideaTitle}</h3>
                <p className="text-sm text-muted mt-1">{a.oneLiner}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-3xl font-black text-accent">{a.score}</div>
                <div className="text-xs text-muted">/100</div>
              </div>
            </motion.div>

            {/* Score bar + verdict */}
            <div className="flex flex-col gap-2">
              <div className="w-full h-2 rounded-full bg-surface-2 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${a.score}%` }} transition={{ delay: 0.2, duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" />
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold border rounded-full px-3 py-0.5 ${VERDICT_COLOR[a.verdict]}`}>{a.verdict}</span>
              </div>
            </div>

            {/* Market + ICP */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Market Size", content: <><p className="text-sm font-bold text-accent">{a.marketSize.estimate}</p><p className="text-xs text-muted mt-1">{a.marketSize.reasoning}</p></> },
                { title: "Ideal Customer", content: <><p className="text-sm text-foreground">{a.icp.description}</p><p className="text-xs text-muted mt-1">Pain: {a.icp.painPoint}</p><p className="text-xs text-muted mt-0.5">WTP: {a.icp.willingness}</p></> },
              ].map((card, i) => (
                <motion.div key={card.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.07 }} className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">{card.title}</p>
                  {card.content}
                </motion.div>
              ))}
            </div>

            {/* Moat */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className={`rounded-2xl border p-4 ${a.moat.exists ? "border-success/30 bg-success/5" : "border-warn/30 bg-warn/5"}`}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">Competitive Moat</p>
              <p className="text-sm text-foreground">{a.moat.description}</p>
            </motion.div>

            {/* Risks */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Key Risks</p>
              <div className="flex flex-col gap-2">
                {a.risks.map((r, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.06 }} className="rounded-xl border border-border bg-surface p-4">
                    <div className="flex items-start gap-2 mb-1">
                      <span className={`text-[10px] font-bold uppercase rounded-full px-2 py-0.5 shrink-0 ${SEVERITY_COLOR[r.severity]}`}>{r.severity}</span>
                      <p className="text-sm text-foreground">{r.risk}</p>
                    </div>
                    <p className="text-xs text-muted ml-0">↳ {r.mitigation}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Opportunities + next steps */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Opportunities</p>
                <ul className="flex flex-col gap-2">
                  {a.opportunities.map((o, i) => (
                    <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.05 }} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-accent mt-0.5">→</span> {o}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Next Steps</p>
                <ol className="flex flex-col gap-2">
                  {a.nextSteps.map((s, i) => (
                    <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.05 }} className="flex items-start gap-2 text-sm text-muted">
                      <span className="text-accent-2 font-bold shrink-0">{i + 1}.</span> {s}
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Investor take */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="rounded-2xl border border-accent/20 bg-accent-soft p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-2">Investor Take</p>
              <p className="text-sm text-foreground">{a.investorTake}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
