import { AgentEventV1Schema, type AgentEventV1, type AuthorizeRequest } from "@/lib/contracts";
import { evaluateAuthorization, type WorkspacePolicy } from "@/lib/policy-engine";
import { demoAudit, demoBudget, demoEvents, demoTenant } from "@/lib/demo-data";
import { redactAttributes } from "@/lib/redaction";

const policy: WorkspacePolicy = {
  version: "2026.08.10",
  monthlyBudgetUsd: demoBudget.monthlyBudgetUsd,
  agentBudgetUsd: demoBudget.agentBudgetUsd,
  approvalRequiredAboveUsd: demoBudget.approvalRequiredAboveUsd,
  blockedTools: ["database_delete", "credential_export"],
  highRiskTools: ["vendor_note_create", "send_external_email"],
  killSwitch: false,
};

let events = [...demoEvents];
type AuthorizationResponse = ReturnType<typeof evaluateAuthorization> & { authorizationId: string; expiresAt: string };
const idempotency = new Map<string, AuthorizationResponse>();

function authorizationId(key: string) { return `auth_${key.slice(-8)}`; }

export function appendEvents(nextEvents: AgentEventV1[]) {
  const accepted: string[] = [];
  for (const candidate of nextEvents) {
    const event = AgentEventV1Schema.parse(candidate);
    if (event.organizationId !== demoTenant.organization.id || event.workspaceId !== demoTenant.workspace.id) throw new Error("Event is not authorized for this workspace.");
    if (!events.some((existing) => existing.eventId === event.eventId)) {
      events.push({ ...event, attributes: redactAttributes(event.attributes) });
      accepted.push(event.eventId);
    }
  }
  return { accepted, duplicateCount: nextEvents.length - accepted.length };
}

export function listEvents() { return [...events].sort((a, b) => a.occurredAt.localeCompare(b.occurredAt)); }

export function authorize(request: AuthorizeRequest): AuthorizationResponse {
  const existing = idempotency.get(request.idempotencyKey);
  if (existing) return existing;
  if (request.workspaceId !== demoTenant.workspace.id || request.fleetId !== demoTenant.fleet.id) throw new Error("Unknown workspace or fleet.");
  const result = evaluateAuthorization(request, policy, { workspaceSpentUsd: demoBudget.workspaceSpentUsd, agentSpentUsd: demoBudget.agentSpentUsd });
  const response = { authorizationId: authorizationId(request.idempotencyKey), expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), ...result };
  idempotency.set(request.idempotencyKey, response);
  return response;
}

export function platformSnapshot() {
  return { tenant: demoTenant, budget: demoBudget, audit: demoAudit, events: listEvents() };
}
