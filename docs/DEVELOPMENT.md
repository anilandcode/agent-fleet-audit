# Development and validation

## Requirements

- Node.js 24.x
- pnpm 10.x
- Optional: Vercel CLI for previews
- Optional: Graphify CLI for the repository knowledge graph

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The project works without production credentials because it defaults to deterministic demonstration data.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm typecheck` | Validate TypeScript without output |
| `pnpm test` | Run deterministic contract checks |
| `pnpm build` | Create the production Next.js build |
| `pnpm verify` | Run typecheck, tests, and build |
| `graphify update .` | Refresh the code knowledge graph after code changes |

## Validation baseline

For changes to the landing page or dashboard:

- Test 1440×900, 1024px, 768px, and 390px.
- Confirm no horizontal overflow, clipped header, missing assets, font failures, console errors, or hydration errors.
- Exercise desktop and mobile navigation, `/app`, the vendor workflow, report export, diagnostic success/error states, FAQ, keyboard focus, and reduced motion.
- Confirm demo tabs expose correct `aria-selected`, focus order, and unique imagery.

For API or engine changes:

- Extend `tests/verify.ts` for policy, audit, redaction, and schema behavior.
- Validate tenant checks, duplicate events, idempotency, invalid payloads, approval binding, and budget thresholds.
- Keep seeded/demo provenance explicit in responses.

## Change discipline

- Update `DESIGN.md` when visual tokens, chapter structure, responsive behavior, or motion ownership changes.
- Update `docs/ASSET_INVENTORY.md` when generated images are added, removed, assigned, or archived.
- Update `docs/ARCHITECTURE.md` and `docs/PRODUCTION_READINESS.md` when storage, auth, jobs, telemetry, providers, or production guarantees change.
- Preserve user work in a dirty tree and stage only intentional files.
- Run `graphify update .` after modifying code.
