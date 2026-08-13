# Deployment

## Vercel project

The repository is linked to the existing `agent-fleet-audit` Vercel project under `anilandcodes-projects`. Use preview deployments for design and functional review; do not promote production implicitly.

```bash
vercel --yes
```

Promote only after the preview passes responsive, interaction, asset, and console checks:

```bash
vercel --prod
```

## Environment variables

Only `LEAD_WEBHOOK_URL` is consumed by the current application. The other variables in `.env.example` document planned production integrations and do not activate functionality yet.

| Variable | Current behavior |
| --- | --- |
| `LEAD_WEBHOOK_URL` | Optional server-side destination for validated diagnostic leads |
| `NEXT_PUBLIC_APP_URL` | Documented future integration value; not read in current source |
| Supabase keys | Production target; not read in current source |
| GitHub App values | Production target; not read in current source |
| Upstash/QStash values | Production target; not read in current source |
| `SENTRY_DSN` | Production target; not read in current source |
| AI provider keys | Production target; not read in current source |

Never expose service-role keys or private keys through `NEXT_PUBLIC_*` variables. Store secrets only in Vercel environment settings.

## Release checks

1. Run `pnpm verify` locally.
2. Deploy a preview and test `/`, `/app`, `/api/v1/platform`, vendor workflow execution, report download, and diagnostic form states.
3. Check 1440×900, 1024px, 768px, and 390px.
4. Confirm no console, network, image, or font errors.
5. Confirm the commit intended for release is on the deployment.
6. Promote production only with explicit approval.

## Production limitations

Vercel deployment makes the demo publicly accessible; it does not make in-memory state durable. Serverless instances can reset or diverge. Do not enable live customers or claim enforcement until `PRODUCTION_READINESS.md` is complete.

## Rollback

Use Vercel deployment history to promote the last verified deployment. Do not rewrite Git history to roll back a release; create a forward revert or corrective commit and redeploy.
