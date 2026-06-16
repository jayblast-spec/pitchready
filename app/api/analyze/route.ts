import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export type RiskLevel = "low" | "medium" | "high";

export type PitchAnalysis = {
  ideaTitle: string;
  oneLiner: string;
  verdict: "Strong" | "Promising" | "Needs Work" | "Risky";
  marketSize: { estimate: string; reasoning: string };
  icp: { description: string; painPoint: string; willingness: string };
  moat: { exists: boolean; description: string };
  risks: Array<{ risk: string; severity: RiskLevel; mitigation: string }>;
  opportunities: string[];
  nextSteps: string[];
  investorTake: string;
  score: number;
};

const DEMO: PitchAnalysis = {
  ideaTitle: "AI-powered invoice generator for freelancers",
  oneLiner: "Browser-only invoice tool that auto-fills client details and generates PDF — zero backend, zero signup.",
  verdict: "Promising",
  marketSize: {
    estimate: "$2–4B TAM (freelancer productivity tools segment)",
    reasoning: "60M+ freelancers globally, growing 15% YoY. Existing tools (FreshBooks, Wave) target SMBs and are over-engineered for solo operators.",
  },
  icp: {
    description: "Solo freelancer or independent consultant, $50–200K/year revenue, 5–20 active clients",
    painPoint: "Spends 30–60 min per invoice using clunky tools or templates — unbillable admin time they hate",
    willingness: "High — invoicing directly ties to getting paid. Tools that speed this up have immediate ROI.",
  },
  moat: {
    exists: true,
    description: "No moat yet. Speed-to-market and strong UX can create switching costs. Consider: saved client profiles, recurring invoice templates, and payment integration as lock-in.",
  },
  risks: [
    { risk: "Dominated by incumbents (FreshBooks, Wave, PayPal Invoicing)", severity: "high", mitigation: "Win on zero-friction: no account, instant PDF. Target freelancers who find those tools bloated." },
    { risk: "Feature creep kills the simplicity advantage", severity: "medium", mitigation: "Write a 'never build' list. Core loop: fill form → download PDF. Everything else is v2." },
    { risk: "Payment integration expectation from users", severity: "medium", mitigation: "Frame as 'create + print' tool. Payments are a separate product if you go there." },
  ],
  opportunities: [
    "Expand to contract generation (the next doc freelancers need)",
    "Add client portal with payment link (Stripe) to move up the value chain",
    "White-label for agencies managing freelancer teams",
    "NGN + African market is underserved — you already have the currency",
  ],
  nextSteps: [
    "Ship it — get 100 real users before building anything else",
    "Add Google Analytics to track drop-off in the form",
    "Post in 3 freelancer communities (Reddit, LinkedIn, Twitter) with a real invoice you made",
    "Collect 10 user interviews: what's missing? what nearly stopped them using it?",
  ],
  investorTake: "Too early for VC but perfect for bootstrapping. Validate with organic traction first. If you hit 1K weekly active users without paid ads, the story gets interesting.",
  score: 72,
};

export async function POST(req: NextRequest) {
  const { idea } = await req.json();

  if (!idea || typeof idea !== "string") {
    return NextResponse.json({ error: "idea required" }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    await new Promise((r) => setTimeout(r, 1800));
    return NextResponse.json({ demo: true, analysis: DEMO });
  }

  const systemPrompt = `You are a world-class startup advisor and investor with experience at Y Combinator, a16z, and First Round Capital.
Given a startup idea description, provide a rigorous, honest, and actionable analysis.

Be direct and critical — don't sugarcoat weaknesses. A 72/100 score is generous. Most ideas score 40-65.

Return ONLY valid JSON matching exactly this shape:
{
  "ideaTitle": "short product name",
  "oneLiner": "one sentence product description",
  "verdict": "Strong|Promising|Needs Work|Risky",
  "marketSize": {
    "estimate": "TAM range with segment label",
    "reasoning": "2-3 sentences on the market opportunity"
  },
  "icp": {
    "description": "specific person description (role, revenue, situation)",
    "painPoint": "the specific pain this solves",
    "willingness": "assessment of willingness to pay"
  },
  "moat": {
    "exists": true/false,
    "description": "honest assessment of defensibility"
  },
  "risks": [
    {
      "risk": "specific risk",
      "severity": "low|medium|high",
      "mitigation": "concrete mitigation"
    }
  ],
  "opportunities": ["specific opportunity string", ...],
  "nextSteps": ["concrete action string", ...],
  "investorTake": "honest 2-3 sentence investor perspective",
  "score": 0-100
}`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Startup idea:\n\n${idea}` },
      ],
      temperature: 0.4,
      max_tokens: 2500,
    }),
  });

  if (!response.ok) return NextResponse.json({ error: "AI unavailable" }, { status: 500 });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? "";

  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const analysis: PitchAnalysis = JSON.parse(jsonMatch ? jsonMatch[0] : content);
    return NextResponse.json({ demo: false, analysis });
  } catch {
    return NextResponse.json({ error: "Parse failed" }, { status: 500 });
  }
}
