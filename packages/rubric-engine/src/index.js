export const SECTORS = ["Commercial", "University", "Public", "Research"];
export const JURISDICTIONS = ["Indonesia", "International"];

export const INDICATORS = [
  { id: "IV1.1", construct: "IV1", label: "Public AI Ethics Charter", phase: "Days 1-30", risk: "Unguided AI deployment (M1/M2)", reg: { Indonesia: "SE Menkominfo 9/2023", International: "ISO/IEC 42001 5.2" } },
  { id: "IV1.2", construct: "IV1", label: "Fairness & Bias Mitigation", phase: "Days 31-60", risk: "Discriminatory decisions (M1)", reg: { Indonesia: "UU PDP Pasal 10", International: "EU AI Act Art. 10" } },
  { id: "IV1.3", construct: "IV1", label: "Human-in-the-Loop (HITL) Oversight", phase: "Days 1-30", risk: "Chatbot misrepresentation & legal liability (DV2)", reg: { Indonesia: "OJK AI Guidelines", International: "EU AI Act Art. 14" } },
  { id: "IV1.4", construct: "IV1", label: "Stakeholder AI Disclosure", phase: "Days 1-30", risk: "Deceptive interaction & investigation (M3)", reg: { Indonesia: "UU PDP Pasal 20", International: "EU AI Act Art. 50" } },
  { id: "IV2.1", construct: "IV2", label: "Formal AI Impact Assessment (DPIA)", phase: "Days 1-30", risk: "Critical workflow failure (M1)", reg: { Indonesia: "UU PDP Pasal 34", International: "ISO/IEC 42001 6.1.2" } },
  { id: "IV2.2", construct: "IV2", label: "Pre-Deployment Safety Guardrails", phase: "Days 31-60", risk: "Prompt injection & PII leak (DV3)", reg: { Indonesia: "UU PDP Pasal 35", International: "OWASP LLM Top 10" } },
  { id: "IV2.3", construct: "IV2", label: "Adversarial Red-Teaming", phase: "Days 31-60", risk: "Edge-case jailbreaks & outages (DV4)", reg: { Indonesia: "OJK IT Risk Rules", International: "NIST AI RMF MEASURE 2.6" } },
  { id: "IV2.4", construct: "IV2", label: "Data Provenance & Lineage", phase: "Days 31-60", risk: "Unauthorized data scraping & fines (DV2)", reg: { Indonesia: "UU PDP Pasal 16 & 57", International: "GDPR Art. 5 & 83" } },
  { id: "IV3.1", construct: "IV3", label: "Executive AI Governance Committee", phase: "Days 1-30", risk: "Unchecked Shadow AI sprawl", reg: { Indonesia: "POJK Tata Kelola TI", International: "ISO/IEC 42001 5.1" } },
  { id: "IV3.2", construct: "IV3", label: "AI Procurement & Acceptable Use SOP", phase: "Days 1-30", risk: "Vendor data leaks (DV3)", reg: { Indonesia: "UU PDP Pasal 51", International: "NIST AI RMF GOVERN 6.1" } },
  { id: "IV3.3", construct: "IV3", label: "External Independent AI Audit", phase: "Days 61-90", risk: "Governance Theatre exposure", reg: { Indonesia: "OJK External Audit", International: "ISO/IEC 42001 9.2" } },
  { id: "IV3.4", construct: "IV3", label: "AI Incident Escalation & Kill-Switch", phase: "Days 1-30", risk: "Delayed crisis containment (M2/M3)", reg: { Indonesia: "UU PDP Pasal 46 (72h)", International: "EU AI Act Art. 73" } },
  { id: "IV4.1", construct: "IV4", label: "Dedicated AI Safety Budget", phase: "Days 61-90", risk: "Financial performance drag (DV1)", reg: { Indonesia: "POJK Rencana Bisnis", International: "ISO/IEC 42001 7.1" } },
  { id: "IV4.2", construct: "IV4", label: "Workforce AI Risk Literacy", phase: "Days 31-60", risk: "Staff misuse & automation bias", reg: { Indonesia: "SE Menkominfo Etika AI", International: "EU AI Act Art. 4" } },
  { id: "IV4.3", construct: "IV4", label: "Production Drift & Safety Telemetry", phase: "Days 61-90", risk: "Silent accuracy collapse (DV4)", reg: { Indonesia: "OJK Operational Monitoring", International: "NIST AI RMF MEASURE 2.4" } },
  { id: "IV4.4", construct: "IV4", label: "Legal-Tech-Ethics Review Loop", phase: "Days 61-90", risk: "Cross-department compliance gaps (DV2)", reg: { Indonesia: "UU PDP DPO Pasal 53", International: "NIST AI RMF GOVERN 3.1" } }
];

export function evaluateOrganizationHealth({ orgName, sector = "Commercial", jurisdiction = "Indonesia", scores = {}, previousScores = null }) {
  const stats = { IV1: { e: 0, m: 0, na: 0 }, IV2: { e: 0, m: 0, na: 0 }, IV3: { e: 0, m: 0, na: 0 }, IV4: { e: 0, m: 0, na: 0 } };
  const roadmap = [], risks = [];

  for (const item of INDICATORS) {
    const val = scores[item.id] ?? null;
    const s = stats[item.construct];
    if (val === null || val === "NA") {
      s.na += 1;
      roadmap.push({ id: item.id, label: item.label, status: "NA (Unverified)", phase: item.phase, advice: `Publish verifiable evidence for ${item.label} (Non-Imputation Audit Rule).`, reg: item.reg[jurisdiction] });
    } else {
      const n = Number(val);
      s.e += n; s.m += 2;
      if (n < 2) {
        roadmap.push({ id: item.id, label: item.label, status: n === 0 ? "0 — Critical Sickness" : "1 — Informal Control", phase: item.phase, advice: n === 0 ? `Implement dedicated AI control for ${item.label} immediately.` : `Upgrade general IT practice for ${item.label} to AI-specific governance.`, reg: item.reg[jurisdiction] });
        risks.push({ id: item.id, area: item.label, severity: n === 0 ? "HIGH" : "MODERATE", incident: item.risk });
      }
    }
  }

  const pct = (c) => (stats[c].m > 0 ? Math.round((stats[c].e / stats[c].m) * 100) : 0);
  const iv1 = pct("IV1"), iv2 = pct("IV2"), iv3 = pct("IV3"), iv4 = pct("IV4");
  const totalE = Object.values(stats).reduce((a, b) => a + b.e, 0);
  const totalM = Object.values(stats).reduce((a, b) => a + b.m, 0);
  const totalNa = Object.values(stats).reduce((a, b) => a + b.na, 0);
  const healthScore = totalM > 0 ? Math.round((totalE / totalM) * 100) : 0;
  const theatreGap = Math.max(0, iv1 - Math.round((iv2 + iv4) / 2));
  const isGovernanceTheatre = iv1 >= 60 && theatreGap >= 25;
  const grade = healthScore >= 85 ? "A" : healthScore >= 70 ? "B" : healthScore >= 55 ? "C" : healthScore >= 40 ? "D" : "F";

  const sanctionTier = healthScore < 45 || risks.filter((r) => r.severity === "HIGH").length >= 4
    ? { tier: "TIER 3 — Statutory Sanction Risk", ref: jurisdiction === "Indonesia" ? "UU PDP Pasal 57 (Fines up to 2% Revenue) & OJK Order" : "EU AI Act Art. 99 (Fines up to 7% Turnover) & FTC/SEC", safeHarbor: "60-Day Safe-Harbor Cure available upon voluntary self-audit & remediation commitment." }
    : healthScore < 75 || isGovernanceTheatre
    ? { tier: "TIER 2 — Mandatory 90-Day Audit Notice", ref: jurisdiction === "Indonesia" ? "UU PDP Pasal 34/46 & POJK Audit Directive" : "ISO/IEC 42001 Major Non-Conformity", safeHarbor: "Zero penalty if remediated and re-audited within 90 days." }
    : { tier: "TIER 1 — Compliant Standing", ref: "Meets institutional AI assurance thresholds.", safeHarbor: "Full Safe-Harbor active." };

  const prev = previousScores ? evaluateOrganizationHealth({ orgName, sector, jurisdiction, scores: previousScores }) : null;
  return {
    orgName, sector, jurisdiction, healthScore, grade,
    constructPercentages: { IV1: iv1, IV2: iv2, IV3: iv3, IV4: iv4 },
    unverifiedNaCount: totalNa, isGovernanceTheatre, theatreGap,
    roadmap, risks, sanctionTier,
    reAuditDelta: prev ? { prevScore: prev.healthScore, delta: healthScore - prev.healthScore } : null
  };
}
