import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { appendEvents, authorize } from "@/lib/store";
import type { AgentEventV1 } from "@/lib/contracts";

const VendorRiskRequestSchema = z.object({ vendorName: z.string().trim().min(2).max(160).default("New vendor") });

export async function POST(request: Request) {
  const parsed = VendorRiskRequestSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Provide a vendor name with at least two characters." }, { status: 400 });
  const { vendorName } = parsed.data;
  const runId = `run_vr_${randomUUID().slice(0, 8)}`;
  const correlationId = `corr_${randomUUID().slice(0, 8)}`;
  const startedAt = Date.now();
  const at = (offsetMs: number) => new Date(startedAt + offsetMs).toISOString();
  const base = { schemaVersion: "agent-event.v1" as const, organizationId: "org_northstar", workspaceId: "ws_northstar_prod", fleetId: "fleet_vendor_risk", workflowId: "workflow_vendor_review", runId, correlationId };
  const policy = authorize({ workspaceId: base.workspaceId, fleetId: base.fleetId, agentId: "agent_legal", runId, idempotencyKey: `idem_${randomUUID().replaceAll("-", "")}`, action: { type: "tool", toolName: "vendor_note_create", actionClass: "write", riskLevel: "high", argumentDigest: `digest_${randomUUID().replaceAll("-", "").slice(0, 16)}` }, estimatedTokens: 420, estimatedCostUsd: 0.018 });
  const events: AgentEventV1[] = [
    { ...base, eventId: `evt_${randomUUID()}`, occurredAt: at(0), agentId: "agent_orchestrator", spanId: "span_01", kind: "run", phase: "started", subject: `${vendorName} vendor-risk review`, status: "ok", attributes: { scenario: "vendor-risk", mode: "deterministic-workflow" } },
    { ...base, eventId: `evt_${randomUUID()}`, occurredAt: at(250), agentId: "agent_orchestrator", spanId: "span_02", parentSpanId: "span_01", kind: "handoff", phase: "completed", subject: "Specialist routing", status: "ok", attributes: { agents: "research,security,legal" } },
    { ...base, eventId: `evt_${randomUUID()}`, occurredAt: at(600), agentId: "agent_research", spanId: "span_03", parentSpanId: "span_01", kind: "retrieval", phase: "completed", subject: "Public evidence collection", status: "ok", durationMs: 350, attributes: { sourceScope: "public-only", vendor: vendorName } },
    { ...base, eventId: `evt_${randomUUID()}`, occurredAt: at(1150), agentId: "agent_security", spanId: "span_04", parentSpanId: "span_01", kind: "model", phase: "completed", subject: "Security control assessment", status: "ok", durationMs: 550, model: { provider: "deterministic", name: "vendor-risk-synthesis-v1", inputTokens: 1822, outputTokens: 414, costUsd: 0.018 }, attributes: { result: "review-required" } },
    { ...base, eventId: `evt_${randomUUID()}`, occurredAt: at(1450), agentId: "agent_legal", spanId: "span_05", parentSpanId: "span_01", kind: "tool", phase: policy.decision === "allow" ? "completed" : "denied", subject: `Draft external note for ${vendorName}`, status: policy.decision === "allow" ? "ok" : "blocked", tool: { name: "vendor_note_create", actionClass: "write", argumentDigest: `digest_${runId.slice(-8)}` }, policy: { decision: policy.decision, policyVersion: policy.policyVersion, reasonCode: policy.reasonCode, authorizationId: policy.authorizationId }, attributes: { approvalRequired: policy.requiresApproval } },
    { ...base, eventId: `evt_${randomUUID()}`, occurredAt: at(1600), agentId: "agent_orchestrator", spanId: "span_06", parentSpanId: "span_01", kind: "run", phase: "completed", subject: `${vendorName} vendor-risk review`, status: policy.decision === "allow" ? "ok" : "pending", durationMs: 1600, attributes: { outcome: policy.decision === "allow" ? "recommendation-ready" : "approval-queued" } },
  ];
  const stored = appendEvents(events);
  return NextResponse.json({ runId, vendorName, decision: policy.decision, accepted: stored.accepted, duplicateCount: stored.duplicateCount }, { status: 201 });
}
