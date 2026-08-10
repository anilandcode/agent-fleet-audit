import type { AuthorizeRequest, Decision } from "@/lib/contracts";

export type WorkspacePolicy = {
  version: string;
  monthlyBudgetUsd: number;
  agentBudgetUsd: number;
  approvalRequiredAboveUsd: number;
  blockedTools: string[];
  highRiskTools: string[];
  killSwitch: boolean;
};

export type BudgetSnapshot = {
  workspaceSpentUsd: number;
  agentSpentUsd: number;
};

export type PolicyResult = {
  decision: Decision;
  reasonCode: string;
  reason: string;
  policyVersion: string;
  remainingWorkspaceBudgetUsd: number;
  remainingAgentBudgetUsd: number;
  requiresApproval: boolean;
};

export function evaluateAuthorization(request: AuthorizeRequest, policy: WorkspacePolicy, budget: BudgetSnapshot): PolicyResult {
  const remainingWorkspaceBudgetUsd = Math.max(0, policy.monthlyBudgetUsd - budget.workspaceSpentUsd);
  const remainingAgentBudgetUsd = Math.max(0, policy.agentBudgetUsd - budget.agentSpentUsd);
  const base = { policyVersion: policy.version, remainingWorkspaceBudgetUsd, remainingAgentBudgetUsd };

  if (policy.killSwitch) {
    return { ...base, decision: "deny", reasonCode: "KILL_SWITCH_ACTIVE", reason: "The fleet kill switch is active.", requiresApproval: false };
  }
  if (policy.blockedTools.includes(request.action.toolName)) {
    return { ...base, decision: "deny", reasonCode: "TOOL_BLOCKED", reason: `${request.action.toolName} is blocked by policy.`, requiresApproval: false };
  }
  if (request.estimatedCostUsd > remainingWorkspaceBudgetUsd || request.estimatedCostUsd > remainingAgentBudgetUsd) {
    return { ...base, decision: "throttle", reasonCode: "BUDGET_EXHAUSTED", reason: "The requested reservation would exceed an active budget.", requiresApproval: false };
  }
  const requiresApproval = request.action.actionClass === "destructive" || request.action.actionClass === "publish" || request.action.riskLevel === "critical" || policy.highRiskTools.includes(request.action.toolName) || request.estimatedCostUsd > policy.approvalRequiredAboveUsd;
  if (requiresApproval) {
    return { ...base, decision: "require_approval", reasonCode: "APPROVAL_REQUIRED", reason: "This action is high impact and needs a parameter-bound human approval.", requiresApproval: true };
  }
  return { ...base, decision: "allow", reasonCode: "POLICY_ALLOW", reason: "The action is within scope, policy, and budget.", requiresApproval: false };
}
