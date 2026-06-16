export type IntelligenceInput = { input?: string };
const product = {
  "repo": "PitchReady",
  "suite": "Creator / Founder Tools",
  "domain": "Founder readiness",
  "accent": "from-indigo-300 via-blue-300 to-cyan-300",
  "hero": "Pressure-test the pitch until the story can survive the room.",
  "sub": "PitchReady helps founders turn ambition into investor-ready clarity: wedge, market, moat, traction, objections, ask, and next proof milestone.",
  "input": "AI-native knowledge OS that turns memory, agents, and repo generation into a product factory",
  "cta": "Stress-test pitch",
  "score": "Investor readiness",
  "modules": [
    [
      "Narrative audit",
      "Find the story gap between vision and belief."
    ],
    [
      "Market wedge",
      "Clarify who buys first and why now."
    ],
    [
      "Moat pressure test",
      "Challenge defensibility before investors do."
    ],
    [
      "Ask and proof",
      "Turn the raise or partnership ask into concrete next evidence."
    ]
  ],
  "rows": [
    [
      "Founder story",
      "Narrative",
      "High",
      "Make the mission memorable without becoming vague."
    ],
    [
      "Market map",
      "Strategy",
      "High",
      "Show the first segment, urgency, and expansion path."
    ],
    [
      "Risk board",
      "Audit",
      "Medium",
      "List the objections that can kill the deal."
    ],
    [
      "Proof milestone",
      "Execution",
      "High",
      "Define the next result that changes belief."
    ]
  ],
  "missions": [
    [
      "Deck parser",
      "Read slide text and score narrative gaps."
    ],
    [
      "Investor objection simulator",
      "Generate likely questions by investor type."
    ],
    [
      "Benchmark library",
      "Compare claims against category norms and public comps."
    ],
    [
      "Data-room checklist",
      "Turn readiness gaps into evidence tasks."
    ]
  ]
} as const;
function scoreFor(subject: string) { let score = 57 + Math.min(30, Math.floor(subject.length / 6)); if (/risk|urgent|investor|client|payment|contract|meeting|decision|launch|proof|delay/i.test(subject)) score += 7; return Math.min(98, score); }
function band(score: number) { return score >= 86 ? 'strong' : score >= 72 ? 'ready' : score >= 60 ? 'needs review' : 'starter'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.repo,
    brand: 'ArkNet Digital',
    suite: product.suite,
    domain: product.domain,
    subject,
    score,
    status: band(score),
    executive_summary: product.sub,
    intelligence_map: product.modules.map(([label, value]) => ({ label, value, status: score >= 72 ? 'priority' : 'review' })),
    action_queue: product.rows.slice(0, 3).map(([item, owner, priority, note]) => ({ action: item + ' - ' + owner, priority, impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    generated_at: new Date().toISOString()
  };
}
