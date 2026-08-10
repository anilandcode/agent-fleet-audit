# Production gates

Demo mode is intentionally deterministic and does not claim live enforcement against external systems. Before production use:

1. Apply the Supabase migrations and validate every role against live RLS policies.
2. Register a read-only GitHub App, verify webhook signatures, and test uninstall/revocation.
3. Configure signed background jobs and prove idempotent retries for audit/report work.
4. Configure distributed rate limits, error monitoring, and alert delivery.
5. Run a provider-specific data handling review before enabling model summaries.
6. Run abuse-case tests for injection, cross-tenant access, event replay, approval replay, and budget races.
7. Test backup/restore and retention jobs against a staging environment.
8. Replace the in-memory diagnostic-lead route with an authenticated CRM, email, or database destination; add privacy notice, consent handling, and delivery monitoring before sending live traffic.

The product is a production-readiness assessment and governance tool. It is not a security certification, penetration test, or compliance certification.
