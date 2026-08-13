"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { AnimatePresence, m } from "motion/react";

const stages = [
  { title: "Classify request", agent: "Orchestrator", detail: "Vendor risk review selected. Public sources only.", state: "allow", asset: "demo-memory", alt: "Layered persistent context fields connected to a governed memory source." },
  { title: "Gather evidence", agent: "Research", detail: "Trust center, privacy, and subprocessor evidence linked.", state: "allow", asset: "demo-agents", alt: "Four distinct agent clusters collaborating through a shared record." },
  { title: "Evaluate policy", agent: "Security", detail: "Action scope and budget reservation passed.", state: "allow", asset: "demo-policies", alt: "Governed signal paths passing through explicit policy gates." },
  { title: "Request approval", agent: "Legal", detail: "External note is high impact. Human approval required.", state: "approval", asset: "demo-approvals", alt: "Two signal streams paused around a human approval decision core." },
];

function DemoAsset({ asset, alt }: { asset: string; alt: string }) {
  const root = "/media/agent-fleet/visual-correction";
  return <picture>
    <source srcSet={`${root}/${asset}.avif`} type="image/avif" />
    <img src={`${root}/${asset}.webp`} alt={alt} loading="lazy" decoding="async" />
  </picture>;
}

export function LandingDemo() {
  const [active, setActive] = useState(3);
  const selected = useMemo(() => stages[active], [active]);
  const selectTab = (index: number) => {
    setActive(index);
    requestAnimationFrame(() => document.getElementById(`landing-demo-tab-${index}`)?.focus());
  };
  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % stages.length
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index - 1 + stages.length) % stages.length
        : event.key === "Home" ? 0 : event.key === "End" ? stages.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    selectTab(next);
  };
  return <div className="platform-window"><header><div><i className="window-dot" />NORTHSTAR PROCUREMENT <small>SEEDED DEMO WORKSPACE</small></div><span>RUN_VR_2408</span></header><div className="platform-main"><aside className="fleet-column"><span className="panel-label">Fleet boundary</span><h3>Single-tenant<br />control plane</h3><div className="fleet-stack" role="tablist" aria-label="Demo control-plane views">{[["MEMORY","01"],["AGENTS","04"],["POLICIES","12"],["APPROVALS","01"]].map(([label,count], index) => <m.button onClick={() => setActive(index)} onKeyDown={(event) => handleTabKey(event, index)} className={active === index ? "active" : ""} role="tab" aria-selected={active === index} aria-controls="landing-demo-panel" id={`landing-demo-tab-${index}`} tabIndex={active === index ? 0 : -1} key={label}>{label} <b>{count}</b></m.button>)}</div><small className="sealed">◌ ISOLATED WORKSPACE</small></aside><section className="collaboration" role="tabpanel" id="landing-demo-panel" aria-labelledby={`landing-demo-tab-${active}`}><span className="panel-label">Multi-agent collaboration</span><m.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h3>{selected.title}</h3><p>{selected.detail}</p></m.div><div className="collaboration-canvas" data-platform-canvas><AnimatePresence initial={false} mode="sync"><m.div className="demo-state-art" key={selected.asset} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .32 }}><DemoAsset asset={selected.asset} alt={selected.alt} /></m.div></AnimatePresence><span className="collab-tag t-one">RESEARCH</span><span className="collab-tag t-two">SECURITY</span><span className="collab-tag t-three">LEGAL</span><span className="collab-tag t-four">POLICY</span><span className="collab-tag t-five">EVIDENCE</span></div><div className="platform-stat"><span>DECISION</span><b>{selected.state === "approval" ? "REQUIRE APPROVAL" : "ALLOW"}</b><span>RESERVED</span><b>$0.018</b><span>LATENCY</span><b>1.88s</b></div></section></div></div>;
}
