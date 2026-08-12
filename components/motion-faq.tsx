"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";

const items = [
  ["Which agent stacks can you audit?", "LangGraph, CrewAI, custom TypeScript or Python orchestration, MCP tools, retrieval systems, and mixed production estates."],
  ["Do you need access to raw prompts?", "No. The diagnostic can start with repository, architecture, traces, configuration, and redacted examples."],
  ["What does a diagnostic produce?", "A readiness score, architecture map, severity-ranked findings, and a prioritized implementation path."],
  ["Can you work with an existing observability tool?", "Yes. A provider-neutral event model keeps existing tracing and provider choices portable."],
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const answerId = `faq-${question.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;
  return <div className={open ? "faq-item open" : "faq-item"}>
    <m.button whileTap={{ scale: .99 }} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={answerId}>{question}<span aria-hidden="true">{open ? "−" : "+"}</span></m.button>
    <AnimatePresence initial={false}>
      {open && <m.div id={answerId} role="region" key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }}><p>{answer}</p></m.div>}
    </AnimatePresence>
  </div>;
}

export function MotionFaq() {
  return <div className="faq-compact">{items.map(([question, answer]) => <FaqItem question={question} answer={answer} key={question} />)}</div>;
}
