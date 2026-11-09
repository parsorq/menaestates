# Deploy — Mena Estates

## Live host

- **Vercel project:** `menaestates` (team `parsorqs-projects`)
- **Production URL (interim):** https://menaestates.vercel.app
- **Framework Preset:** `nextjs` (VH1; do not leave as Other / null)
- **Git remote:** `https://github.com/parsorq/menaestates`
- **Custom domain:** none yet. Use the Vercel URL until a Mena Estates domain is assigned. Then attach apex + www on this project, set redirects, and update `NEXT_PUBLIC_SITE_URL` + Resend DNS/`RESEND_FROM`.

## Do not touch

- `/Users/navszt/forge/mena` (Mena Construction)
- Vercel project `mena` (Construction)

## Env (Vercel Production + Preview)

Set the same keys as `.env.example`.

| Key | Production (interim) |
|-----|----------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://menaestates.vercel.app` |
| `RESEND_FROM` | `Mena Estates <onboarding@resend.dev>` until a real domain is verified in Resend |

After a custom domain ships: set `NEXT_PUBLIC_SITE_URL` to that origin and `RESEND_FROM` to a mailbox on the verified domain.

## Database

Supabase project `menaestates` (`qsijhuqxtvdxznbzwmkn`). Apply migrations with `npm run db:migrate` (linked CLI push).

## Verify (before merge / after host changes)

```bash
npm run lint
npm run build
npm run test:security
```

CI on `main` and PRs runs the same three (`npm ci` then those scripts). Dependabot stays on; triage alerts, do not mute. See `docs/internal/platform-security-alerts.md`.
