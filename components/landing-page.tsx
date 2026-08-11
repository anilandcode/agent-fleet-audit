import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { DiagnosticForm } from "@/components/diagnostic-form";
import { LandingDemo } from "@/components/landing-demo";
import { LandingMotion } from "@/components/landing-motion";

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

const evidenceSteps = [
  ["01", "Context & scope", "Establish the agent, run, tool boundary, and intended action."],
  ["02", "Evidence & sources", "Capture provenance without retaining raw prompts or unnecessary sensitive data."],
  ["03", "Policy & approval", "Apply budgets, permissions, and explicit human gates before execution."],
  ["04", "Outcome & replay", "Preserve a redacted, readable trail for remediation and review."],
];

export function LandingPage() {
  return <LandingMotion><main className="site">
    <nav className="site-nav shell" aria-label="Primary navigation">
      <Link href="/" className="brand-link"><BrandMark /></Link>
      <div className="site-links"><a href="#platform">Platform</a><a href="#controls">Controls</a><a href="#engagements">Engagements</a></div>
      <a href="#diagnostic" className="button button-quiet nav-cta">Request a diagnostic <b>↗</b></a>
      <details className="mobile-menu"><summary aria-label="Open navigation"><span /><span /><span /></summary><div><a href="#platform">Platform</a><a href="#controls">Controls</a><a href="#engagements">Engagements</a><a href="#diagnostic">Request a diagnostic ↗</a></div></details>
    </nav>

    <section className="hero shell" data-hero-section>
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-copy-block">
        <span className="kicker" data-hero-kicker>Governed multi-agent operations</span>
        <h1 data-hero-title>Your agents.<br />Your evidence.<br /><em>Your control.</em></h1>
        <p data-hero-copy>Agent Fleet Audit makes every decision traceable before it becomes an operational or compliance problem.</p>
        <div className="hero-actions" data-hero-actions><a href="#diagnostic" className="button button-primary">Request a diagnostic <b>↗</b></a><Link href="/app" className="quiet-link">Open control plane <b>→</b></Link></div>
      </div>
      <div className="hero-surface" data-hero-art aria-label="Abstract visualization of governed agents and evidence flows">
        <Image src="/media/agent-fleet/hero-fleet-core.png" alt="An abstract network representing governed agent activity" fill priority sizes="(max-width: 900px) 124vw, 68vw" />
        <span className="surface-label label-top">GOVERNED EXECUTION</span><span className="surface-label label-bottom">EVIDENCE LAYER</span>
        <span className="surface-stat stat-one">12 policies applied</span><span className="surface-stat stat-two">4 approvals scoped</span>
      </div>
    </section>

    <section className="proof-rail"><div className="shell" data-stagger><span>Tenant-aware</span><span>Policy-first</span><span>Evidence-backed</span><span>Framework-agnostic</span></div></section>

    <section id="controls" className="accountability shell section-frame" data-reveal>
      <div className="accountability-intro"><span className="kicker">Built for accountability</span><h2>Outputs are not enough.<br /><em>Show the decision path.</em></h2><p>Production agents need a record that survives scrutiny: what was requested, which data was used, which policy applied, and why an action did or did not happen.</p><a href="#platform" className="button button-quiet">Explore the platform <b>↓</b></a></div>
      <ol className="evidence-path" data-stagger>{evidenceSteps.map(([number, title, copy]) => <li key={number}><b>{number}</b><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
    </section>

    <section className="pillar-section shell" data-reveal><div className="section-heading"><div><span className="kicker">The diagnostic lens</span><h2>Five areas where<br /><em>agent systems fail.</em></h2></div><p>The audit moves through the operational system rather than treating security, cost, and traceability as isolated checks.</p></div><div className="pillar-grid" data-stagger>{pillars.map(([title, copy], index) => <article className="pillar-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><b>Inspect control ↗</b></article>)}</div></section>

    <section id="platform" className="platform-section" data-platform-section><div className="platform-wash" data-platform-art><Image src="/media/agent-fleet/control-layers.png" alt="" fill sizes="100vw" /></div><div className="shell platform-content"><div className="section-heading" data-reveal><div><span className="kicker">The platform</span><h2>One fleet.<br /><em>One control surface.</em></h2></div><p>Move from disconnected agent logs to a readable system of policies, traces, evidence, and accountable outcomes.</p></div><div data-reveal><LandingDemo /></div></div></section>

    <section className="control-section shell" data-reveal><div className="control-grid" data-stagger>{controls.map(([number, title, copy], index) => <article className={index === 1 ? "control-card lit" : "control-card"} key={number}><span>{number}</span><i className="control-icon">{index === 0 ? "↗" : index === 1 ? "◌" : "⌁"}</i><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="cinematic-proof shell" data-reveal><div className="proof-image"><Image src="/media/agent-fleet/governance-space.png" alt="A dark architectural space representing secure agent governance" fill sizes="(max-width: 900px) 100vw, 62vw" /></div><div className="cinematic-copy"><span className="kicker">Operational clarity</span><h2>Build for the review<br /><em>you have not had yet.</em></h2><p>Governance becomes durable when the system can explain itself without relying on individual memory, raw prompt retention, or fragile tooling.</p><div className="proof-list"><span>Boundaries remain explicit</span><span>High-impact paths stay reviewable</span><span>Evidence survives remediation</span></div></div></section>

    <section id="engagements" className="engagements shell" data-reveal><div className="section-heading"><div><span className="kicker">How we work</span><h2>Start with the fleet<br /><em>you already have.</em></h2></div><p>A focused services offer for technical teams moving agents from promising prototype to governed production system.</p></div><div className="engagement-grid" data-stagger><article><span>01 / Diagnostic</span><h3>Fleet Diagnostic</h3><strong>From $1,500</strong><p>3–5 business days. Architecture map, readiness score, prioritized findings, and a technical readout.</p><a href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Diagnostic">Request diagnostic <b>↗</b></a></article><article className="featured-offer"><span>02 / Remediation</span><h3>Stabilization Sprint</h3><strong>From $7,500</strong><p>2–3 weeks. Trace repair, tool controls, budgets, approvals, and an implementation-ready operating model.</p><a href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Stabilization">Scope a sprint <b>↗</b></a></article><article><span>03 / Governance</span><h3>Managed Governance</h3><strong>From $2,500/mo</strong><p>Ongoing health reviews, anomaly monitoring, control validation, and quarterly resilience exercises.</p><a href="mailto:hello@flowmarc.com?subject=Managed%20Agent%20Governance">Discuss governance <b>↗</b></a></article></div></section>

    <section id="diagnostic" className="diagnostic-section"><div className="diagnostic-art"><Image src="/media/agent-fleet/evidence-vault.png" alt="" fill sizes="100vw" /></div><div className="shell diagnostic-layout" data-reveal><div><span className="kicker">Start with evidence</span><h2>Tell us where the<br /><em>fleet feels fragile.</em></h2><p>Share enough context to make the first conversation useful. This is an intake for a technical diagnostic—not a generic sales funnel.</p><ul><li>Architecture and repository review</li><li>Readiness score and ranked findings</li><li>30/60/90-day stabilization path</li></ul></div><DiagnosticForm /></div></section>

    <section className="proof-section shell" data-reveal><div className="proof-copy"><span className="kicker">Proof assets</span><h2>Useful before<br /><em>the call.</em></h2><p>Downloadable materials are represented by the live demo report today. A production deployment can route these to your CMS, email automation, and calendar provider.</p></div><div className="proof-assets" data-stagger><a href="/api/v1/reports/demo/export"><span>01</span><strong>Sample redacted diagnostic report</strong><b>Download ↗</b></a><a href="#platform"><span>02</span><strong>Vendor-risk audit replay</strong><b>Explore ↘</b></a><a href="#controls"><span>03</span><strong>Five control areas to inspect</strong><b>Review ↘</b></a></div></section>

    <section className="faq-section shell" data-reveal><span className="kicker">FAQ</span><h2>Questions technical teams<br /><em>ask before the audit.</em></h2><div className="faq-grid" data-stagger><details><summary>Which agent stacks can you audit?</summary><p>LangGraph, CrewAI, custom TypeScript or Python orchestration, MCP tools, retrieval systems, and mixed production estates.</p></details><details><summary>Do you need access to raw prompts?</summary><p>No. The diagnostic can start with repository, architecture, traces, configuration, and redacted examples. Sensitive data stays within agreed boundaries.</p></details><details><summary>What does a diagnostic produce?</summary><p>A readiness score, an architecture map, severity-ranked findings, and a prioritized 30/60/90-day implementation path.</p></details><details><summary>Can you work with an existing observability tool?</summary><p>Yes. The approach begins with a provider-neutral event model so existing tracing and provider choices remain portable.</p></details></div></section>

    <section className="closing"><div className="closing-image"><Image src="/media/agent-fleet/control-layers.png" alt="" fill sizes="100vw" /></div><div className="shell"><span className="kicker">Agent Fleet Audit</span><h2>Governed.<br /><em>Traceable.</em> Yours.</h2><a className="button button-primary" href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Diagnostic">Request a diagnostic <b>↗</b></a></div></section>
    <footer className="site-footer shell"><span>© 2026 Flowmarc Creative</span><span>Production agent architecture, not a security certification.</span><Link href="/app">Control plane demo ↗</Link></footer>
  </main></LandingMotion>;
}
