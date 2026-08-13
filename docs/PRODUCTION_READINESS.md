# Production readiness

## Current assessment

| Area | Status | Evidence |
| --- | --- | --- |
| Public website | Demo ready | Responsive production build and deployed preview |
| `/app` dashboard | Demo ready | Interactive seeded workflow and report export |
| Contracts and engines | Foundation ready | Zod contracts, policy engine, audit engine, redaction, tests |
| API shape | Prototype ready | Versioned deterministic routes |
| Real multi-agent orchestration | Not implemented | Vendor workflow synthesizes scripted events |
| Durable persistence | Not implemented | Runtime uses process-local arrays/maps |
| Authentication and tenant authorization | Not implemented | Fixed seeded tenant checks only |
| Production enforcement | Not implemented | Budgets, approvals, and idempotency are not distributed/durable |
| Monitoring and operations | Not implemented | No live rate limits, alerts, Sentry, backup, or retention jobs |

The project is suitable for a portfolio, sales demonstration, architecture diagnostic, and implementation proposal. It is not ready to host customer governance data or enforce live production agent actions.

## Completed foundation

- Canonical provider-neutral agent event contract.
- Deterministic policy and budget decisions.
- Audit scoring and ranked findings.
- Attribute redaction and lead validation.
- Seeded vendor-risk workflow and event replay UI.
- Initial Supabase schema and RLS intent.
- TypeScript, contract, production-build, and responsive validation baseline.

## Production acceptance gates

1. **Persistence and auth:** apply migrations in staging; connect Supabase Auth/Postgres/Storage; implement server-side organization/workspace authorization; validate owner/admin/member/viewer RLS matrices.
2. **Durable decisions:** store events, authorizations, reservations, reconciliations, approvals, policy versions, audit reports, and evidence artifacts transactionally.
3. **Real orchestration:** connect one approved orchestrator and two-to-four specialist agents; emit canonical events for every model, retrieval, tool, handoff, policy, budget, approval, failure, and retry.
4. **Runtime enforcement:** make approvals single-use and action-digest-bound; prove idempotent authorization, replay rejection, budget race safety, and kill-switch propagation.
5. **Asynchronous work:** configure signed durable jobs, bounded retries, dead-letter handling, and safe cancellation for audit/report workflows.
6. **Observability:** export canonical events to OpenTelemetry-compatible spans; configure error monitoring, metrics, traces, alerts, and sensitive-data review.
7. **Abuse and isolation:** test injection, tool poisoning, cross-tenant access, event replay, approval replay, budget races, secret leakage, and malicious evidence.
8. **Operations:** implement distributed rate limits, backup/restore, retention/deletion, incident response, health checks, and staged rollback.
9. **Data/provider approval:** complete data-flow and provider handling reviews before model summaries or customer evidence are enabled.
10. **Lead operations:** configure an authenticated durable lead destination, privacy notice, consent handling, and delivery monitoring.

## Production definition of done

- All acceptance gates have evidence from a staging environment.
- RLS and API authorization tests cover every role and resource.
- A real workflow runs end-to-end with durable replayable evidence.
- Failure, retry, race, revocation, backup, restore, retention, and deletion rehearsals pass.
- Monitoring and alerts are demonstrated, not merely configured.
- Customer-facing claims match verified capabilities.

The concise external checklist remains in `production-gates.md`.
