"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AgentEventV1 } from "@/lib/contracts";

type Snapshot = {
  tenant: { organization: { name: string; plan: string }; workspace: { name: string; role: string }; fleet: { name: string; environment: string } };
  budget: { workspaceSpentUsd: number; agentSpentUsd: number; monthlyBudgetUsd: number; agentBudgetUsd: number };
  audit: { score: number; readiness: string; pillarScores: Record<string, number>; findings: { id: string; severity: string; title: string; remediation: string }[] };
  events: AgentEventV1[];
};

const label = (value: string) => value.replaceAll("_", " ");

export function ControlPlane() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<AgentEventV1 | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningWorkflow, setRunningWorkflow] = useState(false);

  useEffect(() => {
    fetch("/api/v1/platform").then((response) => response.json()).then((data: Snapshot) => {
      setSnapshot(data);
      setSelectedEvent(data.events.at(-1) ?? null);
    }).finally(() => setLoading(false));
  }, []);

  async function runVendorRiskWorkflow() {
    setRunningWorkflow(true);
    try {
      await fetch("/api/v1/workflows/vendor-risk", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ vendorName: "Atlas Supplier Group" }) });
      const response = await fetch("/api/v1/platform");
      const next = await response.json() as Snapshot;
      setSnapshot(next);
      setSelectedEvent(next.events.at(-1) ?? null);
    } finally {
      setRunningWorkflow(false);
    }
  }

  const budgetPercent = useMemo(() => snapshot ? Math.round((snapshot.budget.workspaceSpentUsd / snapshot.budget.monthlyBudgetUsd) * 100) : 0, [snapshot]);
  if (loading || !snapshot) return <main className="app-loading">Loading the control plane…</main>;

  return <main className="app-shell">
    <aside className="sidebar"><Link className="brand" href="/">AGENT FLEET <i>AUDIT</i></Link><div className="workspace"><span>WORKSPACE</span><strong>{snapshot.tenant.workspace.name}</strong><small>{snapshot.tenant.workspace.role} · {snapshot.tenant.organization.plan}</small></div><nav><a className="current" href="#overview">Overview</a><a href="#trace">Traces</a><a href="#policy">Policies</a><a href="#evidence">Evidence</a><a href="#findings">Findings</a></nav><div className="sidebar-bottom"><span>DEMO MODE</span><p>Every event is deterministic and explicitly labeled.</p><Link href="/">← Marketing site</Link></div></aside>
    <section className="app-main" id="overview"><header className="app-header"><div><span className="eyebrow">{snapshot.tenant.organization.name}</span><h1>{snapshot.tenant.fleet.name}</h1></div><div className="header-actions"><span className="live-pill"><i /> governed</span><button className="app-run" type="button" onClick={runVendorRiskWorkflow} disabled={runningWorkflow}>{runningWorkflow ? "Running review…" : "Run vendor review"}</button><a className="app-export" href="/api/v1/reports/demo/export">Export report ↗</a></div></header>
      <div className="metrics"><article><small>READINESS SCORE</small><strong>{snapshot.audit.score}<em>/100</em></strong><span className="metric-state">{label(snapshot.audit.readiness)}</span></article><article><small>ACTIVE RUNS</small><strong>02</strong><span>1 requires approval</span></article><article><small>MONTHLY SPEND</small><strong>${snapshot.budget.workspaceSpentUsd.toFixed(2)}</strong><span>${snapshot.budget.monthlyBudgetUsd.toFixed(0)} policy ceiling</span></article><article><small>CRITICAL FINDINGS</small><strong>{snapshot.audit.findings.filter((finding) => finding.severity === "critical").length}</strong><span>Action required</span></article></div>
      <div className="app-grid"><section className="card trace-card" id="trace"><div className="card-head"><div><span className="panel-label">Run replay</span><h2>Vendor-risk review</h2></div><span className="run-tag">RUN_VR_2408</span></div><div className="event-stream">{snapshot.events.map((event) => <button onClick={() => setSelectedEvent(event)} className={selectedEvent?.eventId === event.eventId ? "event-row selected" : `event-row ${event.status === "blocked" ? "blocked" : ""}`} key={event.eventId}><time>{new Date(event.occurredAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</time><span className="event-icon">{event.kind.slice(0, 1).toUpperCase()}</span><span><b>{event.kind}.{event.phase}</b><small>{event.subject}</small></span><i>{event.status}</i></button>)}</div></section>
      <section className="card detail-card" id="policy"><span className="panel-label">Policy inspector</span>{selectedEvent ? <><h2>{selectedEvent.subject}</h2><p>The event contract records the control decision without exposing raw prompts or tool arguments.</p><div className="inspector-list"><div><span>Agent</span><b>{selectedEvent.agentId.replace("agent_", "")}</b></div><div><span>Correlation</span><b>{selectedEvent.correlationId}</b></div><div><span>Phase</span><b>{selectedEvent.phase}</b></div>{selectedEvent.policy && <div><span>Decision</span><b className="gold">{label(selectedEvent.policy.decision)}</b></div>}{selectedEvent.model && <div><span>Actual cost</span><b>${selectedEvent.model.costUsd.toFixed(3)}</b></div>}</div></> : null}</section>
      <section className="card budget-card"><div className="card-head"><div><span className="panel-label">Cost governance</span><h2>Policy envelope</h2></div><span>{budgetPercent}% used</span></div><div className="budget-bar"><i style={{ width: `${budgetPercent}%` }} /></div><div className="budget-numbers"><b>${snapshot.budget.workspaceSpentUsd.toFixed(2)}</b><span>${snapshot.budget.monthlyBudgetUsd.toFixed(0)}</span></div><div className="policy-check"><span>Per-agent ceiling</span><b>${snapshot.budget.agentSpentUsd.toFixed(2)} / ${snapshot.budget.agentBudgetUsd}</b></div><div className="policy-check"><span>High-impact actions</span><b>require approval</b></div><div className="policy-check"><span>Emergency stop</span><b className="success">ready</b></div></section>
      <section className="card evidence-card" id="evidence"><div className="card-head"><div><span className="panel-label">Evidence drawer</span><h2>Redacted provenance</h2></div><span className="evidence-status">scoped</span></div><p>Sources are retained as attributable evidence records, with access scope and relevance preserved for audit replay.</p><div className="evidence-list"><div><span>TRUST CENTER</span><b>Public web · 0.93 relevance</b></div><div><span>PRIVACY POLICY</span><b>Public web · 0.88 relevance</b></div><div><span>SUBPROCESSOR LIST</span><b>Public web · 0.84 relevance</b></div></div></section>
      <section className="card findings-card" id="findings"><div className="card-head"><div><span className="panel-label">Audit findings</span><h2>Evidence needs action</h2></div><span className="finding-count">{snapshot.audit.findings.length}</span></div>{snapshot.audit.findings.map((finding) => <article key={finding.id}><span className={`severity ${finding.severity}`}>{finding.severity}</span><div><b>{finding.title}</b><p>{finding.remediation}</p></div></article>)}</section></div>
    </section>
  </main>;
}
