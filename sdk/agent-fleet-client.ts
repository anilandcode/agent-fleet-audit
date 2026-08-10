import { AgentEventV1Schema, AuthorizeRequestSchema, type AgentEventV1, type AuthorizeRequest, type Decision } from "../lib/contracts";

export type AgentFleetClientConfig = { baseUrl: string; apiKey: string };
export type Authorization = { authorizationId: string; expiresAt: string; decision: Decision; reasonCode: string; reason: string; policyVersion: string; remainingWorkspaceBudgetUsd: number; remainingAgentBudgetUsd: number; requiresApproval: boolean };

export function createAgentFleetClient(config: AgentFleetClientConfig) {
  const request = async <T>(path: string, body: unknown): Promise<T> => {
    const response = await fetch(`${config.baseUrl.replace(/\/$/, "")}${path}`, { method: "POST", headers: { "content-type": "application/json", "x-agent-fleet-key": config.apiKey }, body: JSON.stringify(body) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? `Agent Fleet API request failed: ${response.status}`);
    return data as T;
  };
  const authorize = (input: AuthorizeRequest) => request<Authorization>("/api/v1/authorize", AuthorizeRequestSchema.parse(input));
  return {
    authorize,
    record: (event: AgentEventV1) => request<{ accepted: string[]; duplicateCount: number }>("/api/v1/ingest/events", { events: [AgentEventV1Schema.parse(event)] }),
    recordBatch: (events: AgentEventV1[]) => request<{ accepted: string[]; duplicateCount: number }>("/api/v1/ingest/events", { events: events.map((event) => AgentEventV1Schema.parse(event)) }),
    async wrapTool<T>(input: AuthorizeRequest, tool: () => Promise<T>): Promise<T> {
      const authorization = await authorize(input);
      if (authorization.decision !== "allow") throw new Error(`${authorization.decision}: ${authorization.reason}`);
      return tool();
    },
  };
}
