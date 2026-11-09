# Platform security alerts

Triage in the same pass (do not mute):

1. Supabase Advisor **ERROR** on linked project
2. Vercel env `securityIssues`
3. GitHub Dependabot / required CI failures

For this repo: `npm run test:security` after RLS/revoke changes; `supabase db advisors --linked --type security` when linked. Fix the constraint; do not dismiss without an equivalent fix on `main`.
