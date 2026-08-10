import Link from "next/link";
import { DiagnosticForm } from "@/components/diagnostic-form";
import { LandingDemo } from "@/components/landing-demo";

const controls = [
  ["01", "Evidence stays connected", "Every action remains linked to its run, policy, tool scope, cost, and resulting evidence."],
  ["02", "Governance happens before execution", "High-impact tools, sensitive access, and budget thresholds are evaluated before they can act."],
  ["03", "Your fleet stays legible", "Give engineering, security, and leadership one defensible view of the system they share."],
];

const pillars = [
  ["Architecture", "Responsibilities, handoffs, workflow state, memory, retrieval, and escalation paths."],
  ["Observability", "Provider-neutral events across models, retrieval, tools, policies, retries, and outcomes."],
  ["Cost governance", "Task, agent, and fleet envelopes with reservation, reconciliation, and stop thresholds."],
  ["Security", "Least-privilege tools, secret boundaries, validated inputs, redaction, and approval gates."],
  ["Reliability", "Idempotency, bounded retries, fallback behavior, evaluation evidence, and human handoffs."],
];

export default function HomePage() {
  return <main className="site">
    <nav className="site-nav shell">
      <Link href="/" className="wordmark"><i className="orbit" />AGENT FLEET <em>AUDIT</em></Link>
      <div className="site-links"><a href="#platform">Platform</a><a href="#controls">Controls</a><a href="#engagements">Engagements</a></div>
      <a href="#engagements" className="outline-button nav-cta">Request a diagnostic</a>
    </nav>

    <section className="hero shell">
      <div className="hero-copy-block"><span className="kicker">Governed multi-agent operations</span><h1>Your agents.<br />Your evidence.<br /><em>Your control.</em></h1><p>Agent Fleet Audit makes every decision traceable before it becomes an operational or compliance problem.</p><div className="hero-actions"><a href="#engagements" className="outline-button">Request a diagnostic <b>↗</b></a><Link href="/app" className="quiet-link">Open control plane <b>→</b></Link></div></div>
      <div className="hero-surface" aria-label="Abstract visualization of governed agents and evidence flows"><span className="surface-label label-top">POLICY-GOVERNED EXECUTION</span><span className="surface-label label-bottom">EVIDENCE LAYER</span><div className="mesh"><i className="mesh-node node-one" /><i className="mesh-node node-two" /><i className="mesh-node node-three" /><i className="mesh-node node-four" /><i className="mesh-node node-five" /><span className="mesh-pill pill-one">SECURITY</span><span className="mesh-pill pill-two">APPROVALS</span><span className="mesh-pill pill-three">COST</span><span className="mesh-pill pill-four">TRACE</span><b className="mesh-core">AGENT<br />FLEET</b></div></div>
    </section>

    <section className="proof-rail"><div className="shell"><span>Tenant-aware</span><span>Policy-first</span><span>Evidence-backed</span><span>Framework-agnostic</span></div></section>

    <section id="controls" className="accountability shell"><div className="accountability-intro"><span className="kicker">Built for accountability</span><h2>Outputs are not enough.<br /><em>Show the decision path.</em></h2><p>Production agents need a record that survives scrutiny: what was requested, which data was used, which policy applied, and why an action did or did not happen.</p><a href="#platform" className="outline-button">Explore the platform <b>↓</b></a></div><ol className="evidence-path"><li><b>01</b><div><h3>Context &amp; scope</h3><p>Establish the agent, run, tool boundary, and intended action.</p></div></li><li><b>02</b><div><h3>Evidence &amp; sources</h3><p>Capture provenance without retaining raw prompts or unnecessary sensitive data.</p></div></li><li><b>03</b><div><h3>Policy &amp; approval</h3><p>Apply budgets, permissions, and explicit human gates before execution.</p></div></li><li><b>04</b><div><h3>Outcome &amp; replay</h3><p>Preserve a redacted, readable trail for remediation and review.</p></div></li></ol></section>

    <section className="pillar-section shell"><div className="section-heading"><div><span className="kicker">The diagnostic lens</span><h2>Five areas where<br /><em>agent systems fail.</em></h2></div><p>The audit moves through the operational system rather than treating security, cost, and traceability as isolated checks.</p></div><div className="pillar-grid">{pillars.map(([title, copy], index) => <article className="pillar-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><b>Inspect control ↗</b></article>)}</div></section>

    <section id="platform" className="platform-section"><div className="shell"><div className="section-heading"><div><span className="kicker">The platform</span><h2>One fleet.<br /><em>One control surface.</em></h2></div><p>Move from disconnected agent logs to a readable system of policies, traces, evidence, and accountable outcomes.</p></div><LandingDemo /></div></section>

    <section className="control-section shell"><div className="control-grid">{controls.map(([number, title, copy], index) => <article className={index === 1 ? "control-card lit" : "control-card"} key={number}><span>{number}</span><i className="control-icon">{index === 0 ? "⌘" : index === 1 ? "◌" : "↗"}</i><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section id="engagements" className="engagements shell"><div className="section-heading"><div><span className="kicker">How we work</span><h2>Start with the fleet<br /><em>you already have.</em></h2></div><p>A focused services offer for technical teams moving agents from promising prototype to governed production system.</p></div><div className="engagement-grid"><article><span>01 / Diagnostic</span><h3>Fleet Diagnostic</h3><strong>From $1,500</strong><p>3–5 business days. Architecture map, readiness score, prioritized findings, and a technical readout.</p><a href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Diagnostic">Request diagnostic <b>↗</b></a></article><article className="featured-offer"><span>02 / Remediation</span><h3>Stabilization Sprint</h3><strong>From $7,500</strong><p>2–3 weeks. Trace repair, tool controls, budgets, approvals, and an implementation-ready operating model.</p><a href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Stabilization">Scope a sprint <b>↗</b></a></article><article><span>03 / Governance</span><h3>Managed Governance</h3><strong>From $2,500/mo</strong><p>Ongoing health reviews, anomaly monitoring, control validation, and quarterly resilience exercises.</p><a href="mailto:hello@flowmarc.com?subject=Managed%20Agent%20Governance">Discuss governance <b>↗</b></a></article></div></section>

    <section id="diagnostic" className="diagnostic-section"><div className="shell diagnostic-layout"><div><span className="kicker">Start with evidence</span><h2>Tell us where the<br /><em>fleet feels fragile.</em></h2><p>Share enough context to make the first conversation useful. This is an intake for a technical diagnostic—not a generic sales funnel.</p><ul><li>Architecture and repository review</li><li>Readiness score and ranked findings</li><li>30/60/90-day stabilization path</li></ul></div><DiagnosticForm /></div></section>

    <section className="proof-section shell"><div className="proof-copy"><span className="kicker">Proof assets</span><h2>Useful before<br /><em>the call.</em></h2><p>Downloadable materials are represented by the live demo report today. A production deployment can route these to your CMS, email automation, and calendar provider.</p></div><div className="proof-assets"><a href="/api/v1/reports/demo/export"><span>01</span><strong>Sample redacted diagnostic report</strong><b>Download ↗</b></a><a href="#platform"><span>02</span><strong>Vendor-risk audit replay</strong><b>Explore ↘</b></a><a href="#controls"><span>03</span><strong>Five control areas to inspect</strong><b>Review ↘</b></a></div></section>

    <section className="faq-section shell"><span className="kicker">FAQ</span><h2>Questions technical teams<br /><em>ask before the audit.</em></h2><div className="faq-grid"><details><summary>Which agent stacks can you audit?</summary><p>LangGraph, CrewAI, custom TypeScript or Python orchestration, MCP tools, retrieval systems, and mixed production estates.</p></details><details><summary>Do you need access to raw prompts?</summary><p>No. The diagnostic can start with repository, architecture, traces, configuration, and redacted examples. Sensitive data stays within agreed boundaries.</p></details><details><summary>What does a diagnostic produce?</summary><p>A readiness score, an architecture map, severity-ranked findings, and a prioritized 30/60/90-day implementation path.</p></details><details><summary>Can you work with an existing observability tool?</summary><p>Yes. The approach begins with a provider-neutral event model so existing tracing and provider choices remain portable.</p></details></div></section>

    <section className="closing"><div className="shell"><span className="kicker">Agent Fleet Audit</span><h2>Governed.<br /><em>Traceable.</em> Yours.</h2><a className="outline-button" href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Diagnostic">Request a diagnostic <b>↗</b></a></div></section>
    <footer className="site-footer shell"><span>© 2026 Flowmarc Creative</span><span>Production agent architecture, not a security certification.</span><Link href="/app">Control plane demo ↗</Link></footer>
  </main>;
}
