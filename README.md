# Mena Estates

East Bay cash home buyer (Alameda + Contra Costa). Guest marketing + Supabase lead intake + Resend alert + thin Google-allowlist `/ops/leads`.

Not Mena Construction (`forge/mena` / menahomedesign.com). Not a lead marketplace.

## Stack

- Next.js App Router
- Vercel project `menaestates` (Framework Preset `nextjs`)
- Supabase Postgres `leads` (service-role inserts only)
- Resend email on every new lead

## Local

```bash
cp .env.example .env.local
# fill secrets
npm install
npm run db:migrate
npm run dev
```

- Marketing: `http://localhost:3000/`
- City landers: `/sell-house-fast-oakland` (and the other six buy cities)
- Guides: `/guides`, `/guides/sell-inherited-house-east-bay`, `/guides/sell-house-as-is-east-bay`
- Tool: `/tools/repair-or-as-is-east-bay`
- Ops: `http://localhost:3000/ops/leads` (Google at `/ops/login`; allowlist includes `parsorq@gmail.com`)

## Verify

Same commands as CI (`.github/workflows/ci.yml`):

```bash
npm run lint
npm run build
npm run test:security
```

Also: `npm run check:registries` (registry guard). Deploy notes: `DEPLOY.md`.

## Docs

- Voice: `docs/VOICE.md`
- RevOps + pipeline: `docs/internal/revops.md`
- Guest AEO overlay: `docs/standards/LLM_AEO.md`
- Install ledger: `docs/internal/INSTALL.md`
- Follow-on prompts B–E: `docs/internal/agent-prompts.md`
