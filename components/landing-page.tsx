import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { DiagnosticForm } from "@/components/diagnostic-form";
import { LandingDemo } from "@/components/landing-demo";
import { LandingMotion } from "@/components/landing-motion";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ArchitectureFlow, FleetTopology, HeroTerrain } from "@/components/system-visuals";

const capabilities = ["Architecture", "Evidence", "Policy", "Cost", "Security", "Reliability"];

const capabilityCards = [
  ["Architecture", "Responsibilities, handoffs, workflow state, memory, retrieval, and escalation paths."],
  ["Evidence", "Provider-neutral provenance across models, retrieval, tools, decisions, and outcomes."],
  ["Policy", "Permissions, approval gates, data boundaries, and enforceable rules at the point of action."],
  ["Cost", "Task, agent, and fleet envelopes with reservation, reconciliation, and stop thresholds."],
  ["Security", "Least-privilege tools, secret boundaries, validated inputs, and deliberate redaction."],
  ["Reliability", "Idempotency, bounded retries, fallback behaviour, evaluation evidence, and human handoffs."],
];

const failures = [
  {
    number: "01",
    title: "Unclear ownership",
    copy: "No accountable owner when an agent crosses systems.",
    asset: "unclear-ownership",
    alt: "A distant anonymous figure obscured behind multiple glass partitions.",
  },
  {
    number: "02",
    title: "Invisible handoffs",
    copy: "Work changes hands without a durable operational record.",
    asset: "invisible-handoffs",
    alt: "Two anonymous silhouettes separated by a central glass seam.",
  },
  {
    number: "03",
    title: "Untraceable context",
    copy: "Decisions drift away from the evidence that shaped them.",
    asset: "untraceable-context",
    alt: "An eye fragmented by overlapping translucent architectural layers.",
  },
  {
    number: "04",
    title: "Late policy checks",
    copy: "Controls arrive after a sensitive tool has already acted.",
    asset: "late-policy-checks",
    alt: "A barrier closing after an anonymous figure has crossed it.",
  },
  {
    number: "05",
    title: "Uncontrolled cost",
    copy: "Retries and parallel paths consume budget without a stop rule.",
    asset: "uncontrolled-cost",
    alt: "Branching rows of data-center lights multiplying into the distance.",
  },
  {
    number: "06",
    title: "Missing replay",
    copy: "The team cannot reconstruct the decision when scrutiny arrives.",
    asset: "missing-replay",
    alt: "An empty review room with dark archival screens and an interrupted light trail.",
  },
];

const evidenceSteps = [
  ["01", "Context & scope", "Establish the agent, run, tool boundary, and intended action."],
  ["02", "Evidence & sources", "Capture provenance without retaining raw prompts or unnecessary sensitive data."],
  ["03", "Policy & approval", "Apply budgets, permissions, and explicit human gates before execution."],
  ["04", "Outcome & replay", "Preserve a redacted, readable trail for remediation and review."],
];

function ResponsiveAsset({ asset, alt, className }: { asset: string; alt: string; className?: string }) {
  const root = "/media/agent-fleet/reference-clone";
  return <picture className={className}>
    <source srcSet={`${root}/${asset}.avif`} type="image/avif" />
    <img src={`${root}/${asset}.webp`} alt={alt} loading="lazy" decoding="async" />
  </picture>;
}

export function LandingPage() {
  return <LandingMotion>
    <div className="reference-stage">
      <main className="site site-v2" data-site-canvas>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <nav className="site-nav shell" aria-label="Primary navigation">
          <Link href="/" className="brand-link"><BrandMark /></Link>
          <div className="site-links">
            <a href="#platform">Platform</a>
            <a href="#controls">Controls</a>
            <a href="#engagements">Engagements</a>
          </div>
          <a href="#diagnostic" className="button button-quiet nav-cta">Request a diagnostic <b>↗</b></a>
          <MobileNavigation />
        </nav>

        <div id="main-content">
          <section className="hero-chamber shell" data-hero-section>
            <div className="hero-frame" data-hero-art>
              <div className="hero-frame-glow" data-ambient aria-hidden="true" />
              <div className="hero-frame-line hero-frame-line-a" aria-hidden="true" />
              <div className="hero-frame-line hero-frame-line-b" aria-hidden="true" />
              <span className="hero-system-label label-input">Policy-governed input</span>
              <span className="hero-system-label label-output">Connected evidence layer</span>
              <div className="hero-centered-copy">
                <span className="kicker" data-hero-kicker>Governed multi-agent operations</span>
                <h1 data-hero-title>Your agents.<br />Your evidence.<br /><em>Your control.</em></h1>
                <p data-hero-copy>Make every agent decision traceable before it becomes an operational or compliance problem.</p>
                <div className="hero-actions" data-hero-actions>
                  <a href="#diagnostic" className="button button-primary">Request a diagnostic <b>↗</b></a>
                  <Link href="/app" className="quiet-link">Open control plane <b>→</b></Link>
                </div>
              </div>
              <HeroTerrain />
            </div>
          </section>

          <section className="capability-rail" aria-label="Audit capabilities">
            <div className="shell" data-capability-rail>{capabilities.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
          </section>

          <section className="editorial-intro shell chapter" data-reveal>
            <div className="editorial-copy">
              <span className="kicker">A governed operating model</span>
              <h2>Agent Fleet Audit is how teams govern <em>production agent systems.</em></h2>
              <p>It replaces fragmented logs and individual memory with a connected record of context, evidence, policy, cost, and accountable outcomes.</p>
              <div className="editorial-callout"><b>→</b><span>You have built the agents.<br />Now make the system defensible.</span></div>
              <a href="#platform" className="button button-quiet">Discover the platform <b>↘</b></a>
            </div>
            <div className="architecture-portrait" data-architecture-art>
              <div className="portrait-glow" data-ambient aria-hidden="true" />
              <ArchitectureFlow />
              <span className="architecture-tag tag-context">Context</span>
              <span className="architecture-tag tag-policy-flow">Policy</span>
              <span className="architecture-tag tag-outcome">Outcome</span>
              <div className="portrait-caption"><b>Connected decision record</b><span>Evidence compounds. Accountability persists.</span></div>
            </div>
          </section>

          <section className="capability-chapter shell chapter" data-reveal>
            <div className="chapter-heading">
              <h2>Built for the<br /><em>enterprise reality.</em></h2>
              <p>Audit the operating system as a whole—without flattening architecture, security, cost, and reliability into isolated checklists.</p>
            </div>
            <div className="capability-mosaic" data-mosaic>
              {capabilityCards.slice(0, 4).map(([title, copy], index) => <article className="mosaic-card" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
              {capabilityCards.slice(4).map(([title, copy], index) => <article className="mosaic-card mosaic-card-bottom" key={title}><span>0{index + 5}</span><h3>{title}</h3><p>{copy}</p></article>)}
              <figure className="decision-visual">
                <ResponsiveAsset asset="architecture-mosaic" alt="An abstract connected decision record made of layered graphite planes, contour lines, and evidence nodes." />
                <figcaption><span>Live evidence topology</span><b>Source → policy → approval → outcome</b></figcaption>
              </figure>
            </div>
          </section>

          <section className="ownership-section chapter" data-ownership-section>
            <div className="shell ownership-heading" data-reveal>
              <h2>Who owns the decisions<br />your agents are making?</h2>
              <p><strong>Production agents create an accountability gap:</strong> they move quickly across models, tools, and data boundaries while the evidence needed for review is left behind.</p>
            </div>
            <div className="ownership-stage" data-ownership-stage>
              <div className="ownership-track" data-ownership-track>
                {failures.map(({ number, title, copy, asset, alt }) => <article className="failure-card" key={title}>
                  <ResponsiveAsset className="failure-image" asset={asset} alt={alt} />
                  <div className="failure-caption"><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>
                </article>)}
              </div>
            </div>
            <p className="ownership-swipe-hint shell">Swipe to inspect the six failure patterns →</p>
          </section>

          <section className="transition-chapter" data-transition-section>
            <div className="transition-glow" data-ambient aria-hidden="true" />
            <FleetTopology />
            <div className="transition-copy" data-reveal><span className="kicker">From fragments to a fleet</span><h2>What changes with<br /><em>Agent Fleet Audit?</em></h2></div>
          </section>

          <section id="controls" className="accountability-v2 shell chapter" data-reveal>
            <div className="accountability-intro">
              <span className="kicker">Built for accountability</span>
              <h2>Outputs are not enough.<br /><em>Show the decision path.</em></h2>
              <p>Production agents need a record that survives scrutiny: what was requested, which data was used, which policy applied, and why an action did or did not happen.</p>
              <a href="#platform" className="button button-quiet">Explore the platform <b>↓</b></a>
            </div>
            <ol className="evidence-path" data-timeline>
              <i className="timeline-progress" data-timeline-line aria-hidden="true" />
              {evidenceSteps.map(([number, title, copy]) => <li key={number}><b>{number}</b><div><h3>{title}</h3><p>{copy}</p></div></li>)}
            </ol>
          </section>

          <section id="platform" className="platform-section-v2 chapter" data-platform-section>
            <div className="platform-field" data-ambient aria-hidden="true" />
            <div className="shell">
              <div className="chapter-heading" data-reveal>
                <div><span className="kicker">The control plane</span><h2>One fleet.<br /><em>One defensible view.</em></h2></div>
                <p>Move from disconnected agent logs to a readable system of policies, traces, evidence, and accountable outcomes.</p>
              </div>
              <div data-product-window data-reveal><LandingDemo /></div>
            </div>
          </section>

          <section id="engagements" className="commercial-chapter shell chapter" data-reveal>
            <div className="chapter-heading">
              <div><span className="kicker">How we work</span><h2>Start with the fleet<br /><em>you already have.</em></h2></div>
              <p>A focused services offer for technical teams moving agents from promising prototype to governed production system.</p>
            </div>
            <div className="engagement-grid" data-stagger>
              <article><span>01 / Diagnostic</span><h3>Fleet Diagnostic</h3><strong>From $1,500</strong><p>3–5 business days. Architecture map, readiness score, prioritized findings, and a technical readout.</p><a href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Diagnostic">Request diagnostic <b>↗</b></a></article>
              <article className="featured-offer"><span>02 / Remediation</span><h3>Stabilization Sprint</h3><strong>From $7,500</strong><p>2–3 weeks. Trace repair, tool controls, budgets, approvals, and an implementation-ready operating model.</p><a href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Stabilization">Scope a sprint <b>↗</b></a></article>
              <article><span>03 / Governance</span><h3>Managed Governance</h3><strong>From $2,500/mo</strong><p>Ongoing health reviews, anomaly monitoring, control validation, and quarterly resilience exercises.</p><a href="mailto:hello@flowmarc.com?subject=Managed%20Agent%20Governance">Discuss governance <b>↗</b></a></article>
            </div>
          </section>

          <section id="diagnostic" className="conversion-chapter">
            <div className="shell conversion-layout" data-reveal>
              <div className="conversion-copy">
                <span className="kicker">Start with evidence</span>
                <h2>Tell us where the<br /><em>fleet feels fragile.</em></h2>
                <p>Share enough context to make the first conversation useful. This is an intake for a technical diagnostic—not a generic sales funnel.</p>
                <ul><li>Architecture and repository review</li><li>Readiness score and ranked findings</li><li>30/60/90-day stabilization path</li></ul>
              </div>
              <DiagnosticForm />
            </div>
            <div className="shell utility-grid" data-reveal>
              <div className="proof-assets">
                <a href="/api/v1/reports/demo/export"><span>01</span><strong>Sample redacted diagnostic report</strong><b>Download ↗</b></a>
                <a href="#platform"><span>02</span><strong>Vendor-risk audit replay</strong><b>Explore ↘</b></a>
                <a href="#controls"><span>03</span><strong>Five control areas to inspect</strong><b>Review ↘</b></a>
              </div>
              <div className="faq-compact">
                <details><summary>Which agent stacks can you audit?</summary><p>LangGraph, CrewAI, custom TypeScript or Python orchestration, MCP tools, retrieval systems, and mixed production estates.</p></details>
                <details><summary>Do you need access to raw prompts?</summary><p>No. The diagnostic can start with repository, architecture, traces, configuration, and redacted examples.</p></details>
                <details><summary>What does a diagnostic produce?</summary><p>A readiness score, architecture map, severity-ranked findings, and a prioritized implementation path.</p></details>
                <details><summary>Can you work with an existing observability tool?</summary><p>Yes. A provider-neutral event model keeps existing tracing and provider choices portable.</p></details>
              </div>
            </div>
          </section>

          <footer className="reference-footer">
            <div className="shell footer-main">
              <div><BrandMark /><h2>Governed. Traceable. Yours.</h2><a className="button button-quiet" href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Diagnostic">Request a diagnostic <b>↗</b></a></div>
              <nav aria-label="Footer navigation"><a href="#platform">Platform</a><a href="#controls">Controls</a><a href="#engagements">Engagements</a><Link href="/app">Control plane</Link></nav>
              <div className="footer-legal"><span>Production agent architecture</span><span>Not a security certification</span></div>
            </div>
            <div className="shell footer-wordmark" aria-hidden="true">AGENT FLEET AUDIT</div>
            <div className="shell footer-base"><span>© 2026 Flowmarc Creative</span><span>Evidence before impact.</span></div>
          </footer>
        </div>
      </main>
    </div>
  </LandingMotion>;
}
