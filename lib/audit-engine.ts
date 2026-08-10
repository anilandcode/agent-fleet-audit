export type AuditPillar = "architecture" | "observability" | "cost" | "security" | "reliability";
export type FindingSeverity = "critical" | "high" | "medium" | "low";

export type AuditRule = {
  id: string;
  pillar: AuditPillar;
  weight: number;
  title: string;
  remediation: string;
};

export type AuditEvidence = { ruleId: string; pass: boolean; source: string; detail: string };
export type Finding = { id: string; pillar: AuditPillar; severity: FindingSeverity; title: string; evidence: string; remediation: string };

const PILLAR_WEIGHTS: Record<AuditPillar, number> = { architecture: 20, observability: 20, cost: 20, security: 25, reliability: 15 };

export const AUDIT_RULES: AuditRule[] = [
  { id: "ARC-001", pillar: "architecture", weight: 1, title: "Agents have single, documented responsibilities", remediation: "Document agent boundaries and route only scoped work to each agent." },
  { id: "OBS-001", pillar: "observability", weight: 1, title: "Runs, tools, models, and handoffs are traceable", remediation: "Emit canonical events for every model, tool, retrieval, and handoff operation." },
  { id: "COST-001", pillar: "cost", weight: 1, title: "Runtime budget enforcement exists", remediation: "Reserve task budget before execution and reconcile actual cost after completion." },
  { id: "SEC-001", pillar: "security", weight: 2, title: "High-impact tools require policy approval", remediation: "Classify tools and require parameter-bound approval for destructive or external actions." },
  { id: "REL-001", pillar: "reliability", weight: 1, title: "Failures have retries, limits, and escalation", remediation: "Add bounded retries, circuit breakers, and a human escalation path." },
];

export function calculateAudit(evidence: AuditEvidence[]) {
  const findings: Finding[] = [];
  const byPillar: Record<AuditPillar, { passed: number; total: number }> = {
    architecture: { passed: 0, total: 0 }, observability: { passed: 0, total: 0 }, cost: { passed: 0, total: 0 }, security: { passed: 0, total: 0 }, reliability: { passed: 0, total: 0 },
  };
  for (const rule of AUDIT_RULES) {
    const item = evidence.find((candidate) => candidate.ruleId === rule.id);
    const pass = item?.pass ?? false;
    byPillar[rule.pillar].total += rule.weight;
    if (pass) byPillar[rule.pillar].passed += rule.weight;
    if (!pass) {
      const severity: FindingSeverity = rule.id === "SEC-001" ? "critical" : rule.id === "COST-001" ? "high" : "medium";
      findings.push({ id: `F-${rule.id}`, pillar: rule.pillar, severity, title: rule.title, evidence: item?.detail ?? "No evidence was supplied for this control.", remediation: rule.remediation });
    }
  }
  const pillarScores = Object.fromEntries(Object.entries(byPillar).map(([pillar, state]) => [pillar, Math.round((state.passed / state.total) * 100)])) as Record<AuditPillar, number>;
  const score = Math.round((Object.entries(PILLAR_WEIGHTS) as [AuditPillar, number][]).reduce((total, [pillar, weight]) => total + pillarScores[pillar] * weight, 0) / 100);
  const readiness = findings.some((finding) => finding.severity === "critical") ? "critical" : score >= 85 ? "ready" : score >= 65 ? "needs_attention" : "at_risk";
  return { score, readiness, pillarScores, findings };
}
