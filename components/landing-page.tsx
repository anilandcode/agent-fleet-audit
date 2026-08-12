import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { DiagnosticForm } from "@/components/diagnostic-form";
import { LandingDemo } from "@/components/landing-demo";
import { LandingMotion } from "@/components/landing-motion";
import { MobileNavigation } from "@/components/mobile-navigation";
import { MotionFaq } from "@/components/motion-faq";
import { MotionAnchor, MotionCard, MotionProvider } from "@/components/motion-ui";
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

function ExpansionAsset({ asset, alt, className, eager = false }: { asset: string; alt: string; className?: string; eager?: boolean }) {
  const root = "/media/agent-fleet/visual-expansion";
  return <picture className={className}>
    <source srcSet={`${root}/${asset}.avif`} type="image/avif" />
    <img src={`${root}/${asset}.webp`} alt={alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding={eager ? "sync" : "async"} />
  </picture>;
}

export function LandingPage() {
  return <MotionProvider><LandingMotion>
    <div className="reference-stage">
      <main className="site site-v2" data-site-canvas>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <header className="site-header" data-site-header>
          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/" className="brand-link"><BrandMark /></Link>
            <div className="site-links">
              <MotionAnchor href="#platform">Platform</MotionAnchor>
              <MotionAnchor href="#controls">Controls</MotionAnchor>
              <MotionAnchor href="#engagements">Engagements</MotionAnchor>
            </div>
            <MotionAnchor href="#diagnostic" className="button button-quiet nav-cta" arrow="↗">Request a diagnostic</MotionAnchor>
            <MobileNavigation />
          </nav>
          <i className="header-progress" data-header-progress aria-hidden="true" />
        </header>

        <div id="main-content">
          <section className="hero-chamber shell" data-hero-section>
            <div className="hero-frame" data-hero-art>
              <ExpansionAsset className="hero-raster" asset="hero-intelligence" alt="" eager />
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
                  <MotionAnchor href="#diagnostic" className="button button-primary" arrow="↗">Request a diagnostic</MotionAnchor>
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
              <MotionAnchor href="#platform" className="button button-quiet" arrow="↘">Discover the platform</MotionAnchor>
            </div>
            <div className="architecture-portrait" data-architecture-art>
              <ExpansionAsset className="editorial-raster" asset="editorial-intelligence" alt="An original abstract intelligence form made from graphite contours and fine evidence filaments." />
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

          <section className="architecture-chapter shell chapter" data-architecture-board>
            <div className="architecture-heading" data-reveal>
              <span className="kicker">System architecture</span>
              <h2>Designed as infrastructure,<br /><em>readable as evidence.</em></h2>
              <p>Each layer keeps its own responsibility while contributing to one connected decision record.</p>
            </div>
            <div className="architecture-board">
              <MotionCard className="architecture-panel tenant-panel">
                <div className="architecture-panel-copy"><span>01 / Isolation</span><h3>Single-tenant architecture</h3><p>Your policies, traces, and operational memory remain inside a governed boundary.</p></div>
                <div className="tenant-diagram" aria-hidden="true"><small>Customer tenant</small><i /><div><b>Evidence memory</b><b>Agent fleet</b><b>Policy gates</b></div><em>Dedicated environment</em></div>
              </MotionCard>
              <MotionCard className="architecture-panel collaboration-panel">
                <div className="architecture-panel-copy"><span>02 / Orchestration</span><h3>Multi-agent collaboration</h3><p>Agents coordinate through explicit context, evidence, and approval paths.</p></div>
                <div className="collaboration-map" aria-hidden="true"><i className="map-core">Shared record</i><b className="map-tag map-ops">Ops</b><b className="map-tag map-legal">Legal</b><b className="map-tag map-risk">Risk</b><b className="map-tag map-strategy">Strategy</b></div>
              </MotionCard>
              <MotionCard className="architecture-panel audit-panel">
                <div className="architecture-panel-copy"><span>03 / Provenance</span><h3>Built-in auditability</h3><p>Versioned evidence makes every decision traceable and replayable.</p></div>
                <div className="audit-layers" aria-hidden="true"><i /><i /><i /><b>V1</b><b>V2</b><b>V3</b></div>
              </MotionCard>
              <MotionCard className="architecture-panel routing-panel">
                <div className="architecture-panel-copy"><span>04 / Portability</span><h3>Provider-neutral routing</h3><p>Model choices can change without breaking the evidence contract.</p></div>
                <div className="routing-orbit" aria-hidden="true"><i /><b>Primary</b><b>Fallback</b><b>Private</b></div>
              </MotionCard>
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

          <section className="owned-intelligence shell chapter" data-owned-intelligence>
            <div className="owned-intelligence-heading" data-reveal>
              <h2>Own your<br />compounding<br /><em>advantage.</em></h2>
              <p>This is infrastructure that becomes yours: your operating context, your policies, your evidence, and your institutional memory. Nothing needs to be shared with a competing system to become more useful over time.</p>
            </div>
            <div className="owned-topology" data-owned-topology>
              <ArchitectureFlow />
              <span className="owned-core">Decision<br />record</span>
              <b className="owned-tag owned-legal">Legal</b><b className="owned-tag owned-ops">Ops</b><b className="owned-tag owned-strategy">Strategy</b><b className="owned-tag owned-risk">Risk</b><b className="owned-tag owned-policy">Policies</b><b className="owned-tag owned-security">Security</b>
            </div>
            <div className="brand-world" aria-label="Architectural environments representing governed operational intelligence">
              <MotionCard className="brand-scene brand-scene-wide"><ExpansionAsset asset="brand-lobby" alt="A cinematic graphite lobby with a restrained champagne wall light and original circular relief." /><div><span>01 / Context</span><h3>A clear operating world</h3><p>Responsibility becomes visible before action begins.</p></div></MotionCard>
              <MotionCard className="brand-scene"><ExpansionAsset asset="brand-escalator" alt="A dark graphite escalator hall with thin olive light lines and a blank illuminated wall." /><div><span>02 / Handoffs</span><h3>Movement with memory</h3><p>Every transition retains its operational context.</p></div></MotionCard>
              <MotionCard className="brand-scene"><ExpansionAsset asset="brand-gallery" alt="A quiet graphite gallery with an abstract empty light panel and champagne illumination." /><div><span>03 / Evidence</span><h3>Signals that persist</h3><p>Reviewable evidence stays attached to the outcome.</p></div></MotionCard>
            </div>
          </section>

          <section className="memory-chapter shell chapter" data-memory-chapter>
            <div className="memory-copy" data-reveal>
              <span className="kicker">Institutional knowledge</span>
              <h2>Knowledge should<br /><em>compound, not reset.</em></h2>
              <p>The fleet becomes more accountable with each governed interaction. Context survives handoffs, evidence remains reviewable, and operational learning returns to the system.</p>
              <ul><li>Context retention across runs and teams</li><li>Evidence persistence without raw prompt capture</li><li>Operational memory linked to policy and outcome</li></ul>
            </div>
            <div className="memory-stack" data-memory-stack>
              <MotionCard className="memory-card"><ExpansionAsset asset="memory-context" alt="An anonymous expert behind architectural glass with subtle persistent evidence traces." /><div><span>01 / Context retention</span><h3>Keep the reasoning environment</h3></div></MotionCard>
              <MotionCard className="memory-card"><ExpansionAsset asset="memory-evidence" alt="A cinematic translucent archive of graphite layers connected by a warm evidence filament." /><div><span>02 / Evidence persistence</span><h3>Preserve what shaped the outcome</h3></div></MotionCard>
              <MotionCard className="memory-card"><ExpansionAsset asset="editorial-intelligence" alt="An abstract graphite intelligence form with layered contours representing operational memory." /><div><span>03 / Operational memory</span><h3>Return learning to the fleet</h3></div></MotionCard>
            </div>
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
              <MotionAnchor href="#platform" className="button button-quiet" arrow="↓">Explore the platform</MotionAnchor>
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
              <MotionFaq />
            </div>
          </section>

          <footer className="reference-footer">
            <div className="shell footer-main">
              <div><BrandMark /><h2>Governed. Traceable. Yours.</h2><MotionAnchor className="button button-quiet" href="mailto:hello@flowmarc.com?subject=Agent%20Fleet%20Diagnostic" arrow="↗">Request a diagnostic</MotionAnchor></div>
              <nav aria-label="Footer navigation"><a href="#platform">Platform</a><a href="#controls">Controls</a><a href="#engagements">Engagements</a><Link href="/app">Control plane</Link></nav>
              <div className="footer-legal"><span>Production agent architecture</span><span>Not a security certification</span></div>
            </div>
            <div className="shell footer-wordmark" aria-hidden="true">AGENT FLEET AUDIT</div>
            <div className="shell footer-base"><span>© 2026 Flowmarc Creative</span><span>Evidence before impact.</span></div>
          </footer>
        </div>
      </main>
    </div>
  </LandingMotion></MotionProvider>;
}
