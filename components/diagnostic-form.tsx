"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function DiagnosticForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("submitting");
    setMessage("");
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/v1/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "We could not submit that request.");
      setStatus("success");
      setMessage(data.delivered ? "Request delivered. We will use these details to prepare the right diagnostic conversation." : "Demo request accepted locally. Set LEAD_WEBHOOK_URL before using this form to capture live enquiries.");
      formElement.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not submit that request.");
    }
  }

  return <form className="diagnostic-form" onSubmit={submit}>
    <div className="form-grid"><label>Name<input required name="name" autoComplete="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" autoComplete="email" placeholder="you@company.com" /></label><label>Company<input required name="company" autoComplete="organization" placeholder="Company name" /></label><label>Role<input required name="role" placeholder="CTO, AI lead, platform lead…" /></label><label>Agent stack<select required name="stack" defaultValue=""><option value="" disabled>Select your current stack</option><option>LangGraph / LangChain</option><option>CrewAI</option><option>Custom TypeScript or Python</option><option>MCP tools</option><option>Other / mixed</option></select></label><label>Engagement<select required name="engagement" defaultValue=""><option value="" disabled>What would help most?</option><option>Fleet Diagnostic</option><option>Stabilization Sprint</option><option>Managed Governance</option></select></label></div><label>Primary production issue<textarea required name="issue" rows={4} placeholder="Where does the system feel fragile, opaque, expensive, or hard to govern?" /></label><label>Fleet complexity and data boundary notes<textarea name="context" rows={3} placeholder="Approximate number of workflows, tools, models, environments, or compliance constraints." /></label><button className="outline-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting…" : "Request a diagnostic"} <b>↗</b></button><p className="form-note">Demo-safe by default. A configured intake webhook is required for durable lead delivery.</p>{message && <p className={status === "success" ? "form-message success" : "form-message error"} role="status">{message}</p>}</form>;
}
