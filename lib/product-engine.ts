export type IntelligenceInput = { input?: string };

const product = {
  "repo": "PitchReady",
  "suite": "Creator / Founder Tools",
  "category": "Investor readiness",
  "audience": "founders, accelerators, consultants, and startup studios",
  "promise": "stress-test a pitch until the story, market, and ask are impossible to ignore",
  "inputLabel": "Startup idea, traction, or pitch notes",
  "placeholder": "AI-native knowledge platform that generates products from reusable memory",
  "primary": "Review pitch",
  "gradient": "from-indigo-300 via-blue-300 to-cyan-300",
  "modules": [
    "Narrative audit",
    "Market wedge",
    "Moat pressure test",
    "Financial ask review",
    "Investor question prep"
  ],
  "outputs": [
    "Pitch score",
    "Weakest assumption",
    "Investor-ready rewrite",
    "Next proof milestone"
  ],
  "next": [
    "deck slide parser",
    "investor objection simulator",
    "traction benchmark database",
    "data-room checklist"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}
