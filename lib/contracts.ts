import { z } from "zod";

export const EVENT_KINDS = [
  "run",
  "model",
  "tool",
  "retrieval",
  "handoff",
  "policy",
  "budget",
  "approval",
  "error",
  "evaluation",
] as const;

export const EventKindSchema = z.enum(EVENT_KINDS);
export const EventPhaseSchema = z.enum(["started", "completed", "failed", "denied", "queued"]);
export const RiskLevelSchema = z.enum(["low", "medium", "high", "critical"]);
export const DecisionSchema = z.enum(["allow", "deny", "require_approval", "throttle"]);

export const AgentEventV1Schema = z.object({
  schemaVersion: z.literal("agent-event.v1"),
  eventId: z.string().min(8),
  occurredAt: z.string().datetime(),
  organizationId: z.string().min(1),
  workspaceId: z.string().min(1),
  fleetId: z.string().min(1),
  agentId: z.string().min(1),
  workflowId: z.string().min(1).optional(),
  runId: z.string().min(1),
  spanId: z.string().min(1),
  parentSpanId: z.string().min(1).optional(),
  kind: EventKindSchema,
  phase: EventPhaseSchema,
  subject: z.string().min(1),
  status: z.enum(["ok", "error", "blocked", "pending"]).default("ok"),
  durationMs: z.number().nonnegative().optional(),
  model: z.object({ provider: z.string(), name: z.string(), inputTokens: z.number().nonnegative(), outputTokens: z.number().nonnegative(), costUsd: z.number().nonnegative() }).optional(),
  tool: z.object({ name: z.string(), actionClass: z.enum(["read", "write", "destructive", "publish"]), argumentDigest: z.string().min(8) }).optional(),
  policy: z.object({ decision: DecisionSchema, policyVersion: z.string(), reasonCode: z.string(), authorizationId: z.string() }).optional(),
  correlationId: z.string().min(1),
  attributes: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).default({}),
});

export type AgentEventV1 = z.infer<typeof AgentEventV1Schema>;
export type Decision = z.infer<typeof DecisionSchema>;
export type RiskLevel = z.infer<typeof RiskLevelSchema>;

export const AuthorizeRequestSchema = z.object({
  workspaceId: z.string().min(1),
  fleetId: z.string().min(1),
  agentId: z.string().min(1),
  runId: z.string().min(1),
  idempotencyKey: z.string().min(8),
  action: z.object({
    type: z.string().min(1),
    toolName: z.string().min(1),
    actionClass: z.enum(["read", "write", "destructive", "publish"]),
    riskLevel: RiskLevelSchema,
    argumentDigest: z.string().min(8),
  }),
  estimatedTokens: z.number().int().nonnegative().default(0),
  estimatedCostUsd: z.number().nonnegative().default(0),
});

export type AuthorizeRequest = z.infer<typeof AuthorizeRequestSchema>;

export const IngestBatchSchema = z.object({ events: z.array(AgentEventV1Schema).min(1).max(500) });
