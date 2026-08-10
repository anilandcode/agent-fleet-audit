# Reuse audit

| Source | Generalized pattern | Adaptation required |
| --- | --- | --- |
| AgentPayOps | deterministic policy checks and spend decisions | replace sample-data coupling with versioned workspace policies and ledger reservations |
| Conductor | normalized event stream and fleet-run aggregation | persist canonical events instead of local JSON replay files |
| SupportPilot | RLS, tenant boundaries, jobs, health checks, evidence exports | apply to fleet governance resources and validate live RLS separately |
| VendorPulse Gate | evidence provenance, snapshot hashes, human override | make provenance tenant-scoped and durable |
| webflow-agent-kit | read-only defaults, mutation classes, approval hooks | generalize to arbitrary agent tools and runtime actions |

Every reused pattern has locally added contract tests. No source code, secrets, customer data, or unverified marketing claims are copied without review.
