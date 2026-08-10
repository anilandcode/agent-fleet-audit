# Agent Fleet Audit

Agent Fleet Audit is a multi-tenant control plane for teams that need to audit, observe, and govern production AI-agent systems. It combines a premium services site with a deterministic, interactive governance product.

## What works now

- Public conversion site and an interactive vendor-risk control-plane demo.
- Diagnostic intake with validated fields, an honest demo fallback, and optional `LEAD_WEBHOOK_URL` delivery for a real CRM or workflow destination.
- Audit-pillar, sample-output, proof, and FAQ surfaces that support a technical buyer through the full offer narrative.
- Tenant-scoped demo workspace, fleet inventory, traces, budgets, policies, findings, approvals, and report export.
- Canonical `AgentEventV1` telemetry contract and OpenTelemetry-ready mapping boundary.
- Deterministic policy engine with `allow`, `deny`, `require_approval`, and `throttle` outcomes.
- Audit engine across architecture, observability, cost governance, security, and reliability.
- Versioned API routes for event ingestion, authorization, budget reconciliation, audits, and reports.
- Contract tests for policy, budget, scoring, and redaction behavior.

## Local use

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/app` for the control plane.

```bash
pnpm verify
```

## Production integration gates

The app intentionally defaults to deterministic demo storage. A production deployment must configure Supabase Auth/Postgres/RLS/Storage, the GitHub App, a signed job provider, rate limiting, Sentry, and an approved model provider. See `docs/production-gates.md`.

For live diagnostic intake, set `LEAD_WEBHOOK_URL` to an approved CRM, form, email-workflow, or calendar-routing endpoint. Without it, the route accepts requests only in memory and labels the result as demo-local.

## Source reuse record

This product ports generalized patterns from the owner’s AgentPayOps, Conductor, SupportPilot, VendorPulse Gate, and webflow-agent-kit projects. See `docs/reuse-audit.md`; no customer data or private credentials are carried into this repository.
