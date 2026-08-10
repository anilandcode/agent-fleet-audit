import assert from "node:assert/strict";
import { calculateAudit, type AuditEvidence } from "../lib/audit-engine";
import { evaluateAuthorization } from "../lib/policy-engine";
import { redactAttributes } from "../lib/redaction";
import { DiagnosticLeadSchema } from "../lib/lead-schema";

const baseRequest = { workspaceId: "ws", fleetId: "fleet", agentId: "agent", runId: "run", idempotencyKey: "idem_12345678", action: { type: "tool", toolName: "vendor_lookup", actionClass: "read" as const, riskLevel: "low" as const, argumentDigest: "fnv1a_12345678" }, estimatedTokens: 10, estimatedCostUsd: 1 };
const basePolicy = { version: "1", monthlyBudgetUsd: 100, agentBudgetUsd: 20, approvalRequiredAboveUsd: 10, blockedTools: [], highRiskTools: [], killSwitch: false };

assert.equal(evaluateAuthorization(baseRequest, basePolicy, { workspaceSpentUsd: 1, agentSpentUsd: 1 }).decision, "allow");
assert.equal(evaluateAuthorization({ ...baseRequest, action: { ...baseRequest.action, actionClass: "destructive" } }, basePolicy, { workspaceSpentUsd: 1, agentSpentUsd: 1 }).decision, "require_approval");
assert.equal(evaluateAuthorization({ ...baseRequest, estimatedCostUsd: 101 }, basePolicy, { workspaceSpentUsd: 1, agentSpentUsd: 1 }).decision, "throttle");
assert.equal(evaluateAuthorization(baseRequest, { ...basePolicy, killSwitch: true }, { workspaceSpentUsd: 1, agentSpentUsd: 1 }).decision, "deny");
assert.deepEqual(redactAttributes({ apiKey: "secret", owner: "owner@example.com", count: 2 }), { apiKey: "[redacted]", owner: "[email]", count: 2 });
assert.equal(DiagnosticLeadSchema.safeParse({ name: "Anil Khan", email: "anil@example.com", company: "Flowmarc", role: "Founder", stack: "Custom TypeScript or Python", engagement: "Fleet Diagnostic", issue: "Agent decisions and approval paths are not visible to engineering." }).success, true);
assert.equal(DiagnosticLeadSchema.safeParse({ name: "A", email: "not-an-email" }).success, false);

const allPassing: AuditEvidence[] = ["ARC-001", "OBS-001", "COST-001", "SEC-001", "REL-001"].map((ruleId) => ({ ruleId, pass: true, source: "test", detail: "verified" }));
assert.equal(calculateAudit(allPassing).score, 100);
const critical = calculateAudit(allPassing.map((item) => item.ruleId === "SEC-001" ? { ...item, pass: false } : item));
assert.equal(critical.readiness, "critical");
assert.equal(critical.findings[0]?.severity, "critical");
console.log("Contract checks passed.");
