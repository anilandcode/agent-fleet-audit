import { calculateAudit, type AuditEvidence } from "@/lib/audit-engine";
import type { AgentEventV1 } from "@/lib/contracts";

export const demoTenant = {
  organization: { id: "org_northstar", name: "Northstar Procurement", plan: "governance" },
  workspace: { id: "ws_northstar_prod", name: "Production vendor workflows", role: "Owner" },
  fleet: { id: "fleet_vendor_risk", name: "Vendor Risk Review", environment: "production", status: "needs_attention" },
};

export const demoBudget = { workspaceSpentUsd: 417.28, agentSpentUsd: 68.44, monthlyBudgetUsd: 700, agentBudgetUsd: 100, approvalRequiredAboveUsd: 12 };

export const demoPolicies = [
  { name: "Tool boundary", description: "Vendor data writes and external communication need approval.", status: "active", version: "2026.08.10" },
  { name: "Cost envelope", description: "$700 workspace ceiling, $100 per-agent ceiling.", status: "active", version: "2026.08.10" },
  { name: "Emergency stop", description: "Fleet-wide kill switch for high-impact incidents.", status: "ready", version: "2026.08.10" },
];

export const demoEvidence: AuditEvidence[] = [
  { ruleId: "ARC-001", pass: true, source: "GitHub fixture", detail: "Workflow routing assigns bounded responsibilities to intake, security, legal, and synthesis agents." },
  { ruleId: "OBS-001", pass: true, source: "AgentEventV1 fixture", detail: "A linked event stream records model, retrieval, tool, and handoff spans." },
  { ruleId: "COST-001", pass: true, source: "Policy engine", detail: "Budget reservations are evaluated before tool execution and reconciled after completion." },
  { ruleId: "SEC-001", pass: false, source: "Policy review", detail: "The external vendor-note action is classified as write but is not yet approval-gated in the customer integration." },
  { ruleId: "REL-001", pass: false, source: "Run replay", detail: "The research agent retries timeouts but has no circuit-breaker threshold or human escalation fallback." },
];

export const demoAudit = calculateAudit(demoEvidence);

export const demoEvents: AgentEventV1[] = [
  { schemaVersion: "agent-event.v1", eventId: "evt_1f0a2b3c", occurredAt: "2026-08-10T10:02:00.000Z", organizationId: "org_northstar", workspaceId: "ws_northstar_prod", fleetId: "fleet_vendor_risk", agentId: "agent_orchestrator", workflowId: "workflow_vendor_review", runId: "run_vr_2408", spanId: "span_01", kind: "run", phase: "started", subject: "Vendor review orchestration", status: "ok", correlationId: "corr_vr_2408", attributes: { scenario: "vendor-risk", provenance: "SEEDED_DEMO_DATA" } },
  { schemaVersion: "agent-event.v1", eventId: "evt_2f0a2b3c", occurredAt: "2026-08-10T10:02:01.000Z", organizationId: "org_northstar", workspaceId: "ws_northstar_prod", fleetId: "fleet_vendor_risk", agentId: "agent_orchestrator", workflowId: "workflow_vendor_review", runId: "run_vr_2408", spanId: "span_02", parentSpanId: "span_01", kind: "policy", phase: "completed", subject: "Policy boundary evaluation", status: "ok", policy: { decision: "allow", policyVersion: "2026.08.10", reasonCode: "POLICY_ALLOW", authorizationId: "auth_78b1" }, correlationId: "corr_vr_2408", attributes: { sourceScope: "public-only", approvalRequired: false } },
  { schemaVersion: "agent-event.v1", eventId: "evt_3f0a2b3c", occurredAt: "2026-08-10T10:02:03.000Z", organizationId: "org_northstar", workspaceId: "ws_northstar_prod", fleetId: "fleet_vendor_risk", agentId: "agent_research", workflowId: "workflow_vendor_review", runId: "run_vr_2408", spanId: "span_03", parentSpanId: "span_01", kind: "retrieval", phase: "completed", subject: "Trust center retrieval", status: "ok", durationMs: 1240, correlationId: "corr_vr_2408", attributes: { evidenceOrigin: "SEEDED_DEMO_DATA", sourceType: "trust_center" } },
  { schemaVersion: "agent-event.v1", eventId: "evt_4f0a2b3c", occurredAt: "2026-08-10T10:02:05.000Z", organizationId: "org_northstar", workspaceId: "ws_northstar_prod", fleetId: "fleet_vendor_risk", agentId: "agent_security", workflowId: "workflow_vendor_review", runId: "run_vr_2408", spanId: "span_04", parentSpanId: "span_01", kind: "model", phase: "completed", subject: "Security control analysis", status: "ok", durationMs: 1880, model: { provider: "deterministic", name: "audit-summary-v1", inputTokens: 1822, outputTokens: 414, costUsd: 0.018 }, correlationId: "corr_vr_2408", attributes: { sourceFreshness: "seeded" } },
  { schemaVersion: "agent-event.v1", eventId: "evt_5f0a2b3c", occurredAt: "2026-08-10T10:02:08.000Z", organizationId: "org_northstar", workspaceId: "ws_northstar_prod", fleetId: "fleet_vendor_risk", agentId: "agent_legal", workflowId: "workflow_vendor_review", runId: "run_vr_2408", spanId: "span_05", parentSpanId: "span_01", kind: "tool", phase: "denied", subject: "Draft external vendor note", status: "blocked", tool: { name: "vendor_note_create", actionClass: "write", argumentDigest: "fnv1a_84ab203e" }, policy: { decision: "require_approval", policyVersion: "2026.08.10", reasonCode: "APPROVAL_REQUIRED", authorizationId: "auth_89df" }, correlationId: "corr_vr_2408", attributes: { risk: "high", provenance: "SEEDED_DEMO_DATA" } },
  { schemaVersion: "agent-event.v1", eventId: "evt_6f0a2b3c", occurredAt: "2026-08-10T10:02:10.000Z", organizationId: "org_northstar", workspaceId: "ws_northstar_prod", fleetId: "fleet_vendor_risk", agentId: "agent_orchestrator", workflowId: "workflow_vendor_review", runId: "run_vr_2408", spanId: "span_06", parentSpanId: "span_01", kind: "run", phase: "completed", subject: "Vendor review orchestration", status: "pending", durationMs: 10000, correlationId: "corr_vr_2408", attributes: { decision: "escalate", approvalQueue: "legal-review" } },
];

export const demoAgents = [
  { name: "Orchestrator", type: "coordination", status: "healthy", spend: "$68.44", runs: 29 },
  { name: "Research", type: "evidence", status: "healthy", spend: "$42.18", runs: 42 },
  { name: "Security", type: "risk", status: "healthy", spend: "$35.91", runs: 37 },
  { name: "Legal", type: "approval", status: "approval required", spend: "$19.42", runs: 21 },
];
