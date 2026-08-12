"use client";

import { useMemo, useState } from "react";
import { m } from "motion/react";
import { PlatformTraceMap } from "@/components/system-visuals";

const stages = [
  { title: "Classify request", agent: "Orchestrator", detail: "Vendor risk review selected. Public sources only.", state: "allow" },
  { title: "Gather evidence", agent: "Research", detail: "Trust center, privacy, and subprocessor evidence linked.", state: "allow" },
  { title: "Evaluate policy", agent: "Security", detail: "Action scope and budget reservation passed.", state: "allow" },
  { title: "Request approval", agent: "Legal", detail: "External note is high impact. Human approval required.", state: "approval" },
];

export function LandingDemo() {
  const [active, setActive] = useState(3);
  const selected = useMemo(() => stages[active], [active]);
  return <div className="platform-window"><header><div><i className="window-dot" />NORTHSTAR PROCUREMENT <small>SEEDED DEMO WORKSPACE</small></div><span>RUN_VR_2408</span></header><div className="platform-main"><aside className="fleet-column"><span className="panel-label">Fleet boundary</span><h3>Single-tenant<br />control plane</h3><div className="fleet-stack">{[["MEMORY","01"],["AGENTS","04"],["POLICIES","12"],["APPROVALS","01"]].map(([label,count], index) => <m.button whileHover={{ x: 3 }} whileTap={{ scale: .985 }} onClick={() => setActive(index)} className={active === index ? "active" : ""} key={label}>{label} <b>{count}</b></m.button>)}</div><small className="sealed">◌ ISOLATED WORKSPACE</small></aside><section className="collaboration"><span className="panel-label">Multi-agent collaboration</span><m.div key={active} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}><h3>{selected.title}</h3><p>{selected.detail}</p></m.div><div className="collaboration-canvas" data-platform-canvas><PlatformTraceMap /><i className="collab-center" data-platform-core /><span className="collab-tag t-one">RESEARCH</span><span className="collab-tag t-two">SECURITY</span><span className="collab-tag t-three">LEGAL</span><span className="collab-tag t-four">POLICY</span><span className="collab-tag t-five">EVIDENCE</span></div><div className="platform-stat"><span>DECISION</span><b>{selected.state === "approval" ? "REQUIRE APPROVAL" : "ALLOW"}</b><span>RESERVED</span><b>$0.018</b><span>LATENCY</span><b>1.88s</b></div></section></div></div>;
}
