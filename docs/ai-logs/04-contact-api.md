# 04 — Contact API + Env Validation (+ Rate Limiting)

**Date (Africa/Casablanca):** 2025-09-19 — time: 03:02 AM 
**Branch:** dev  
**Tool:** Windsurf (SWE-1) + Terminal (npm)  
**Commit(s):** 1266f44 (HEAD -> dev, origin/dev) feat(contact): add validated contact API and UI

## Prompt (verbatim)
```text
Context pack
Project: amilemia.dev — Next.js 15 (App Router), TypeScript strict, Tailwind v4, shadcn, sonner, Zod, Resend, contentlayer2/next-contentlayer2.
State: Pages & routing shipped. Contact page UI exists with client Zod schema but no API integration yet.
Constraints: a11y AA, TypeScript strict, small diffs, no extra deps.

Goal: Implement a typed POST /api/contact with runtime env validation and wire the Contact page to use it.

Tasks
1) Create `src/lib/env.ts` with runtime-validated envs using Zod:
   - RESEND_API_KEY: string (non-empty)
   - CONTACT_TO: string (valid email)
   Export a parsed `env`. If invalid, throw early with a clear message.

2) Create `src/lib/validation/contact.ts`:
   - `export const ContactSchema = z.object({ name: z.string().min(2), email: z.string().email(), message: z.string().min(10).max(2000) })`
   - `export type ContactInput = z.infer<typeof ContactSchema>`

3) Implement `src/app/api/contact/route.ts` (App Router handler):
   - `export async function POST(req: Request)`:
     - Parse JSON, validate with `ContactSchema.safeParse`.
     - On success: use Resend SDK to send an email to `env.CONTACT_TO`.
       - Use a safe “from” like `Portfolio <onboarding@resend.dev>` for dev.
       - Subject: `${name} sent a message from amilemia.dev`
       - Plain text body: include name, email, message.
     - Return JSON `{ ok: true }` (200). On validation error return 400 with field errors. On send failure return 500 with message.
   - Ensure proper headers (`content-type: application/json`).

4) Wire the Contact page submit:
   - In `src/app/contact/page.tsx`, replace the submit stub with an `async` fetch to `/api/contact`.
   - Disable the submit button while pending; show `toast("Message sent!")` on 200, `toast.error(...)` on error.
   - Keep client-side Zod validation; on API 400, surface server field errors next to inputs.
   - Add `aria-live="polite"` region for form status.

5) Add a `.env.local.example` at repo root with:
   RESEND_API_KEY=your_resend_api_key
   CONTACT_TO=your_verified_email@example.com
   # For dev you can keep `from` as onboarding@resend.dev

Output
- File list with one-line rationale each
- Full code for each new/changed file
- “Verification” section (commands + curl/Thunder Client and UI steps)
- “README notes” block (env vars, setup steps, dev ‘from’ note)

Acceptance criteria
- Submitting the Contact form with valid inputs returns 200 and shows success toast.
- Invalid inputs are blocked client-side; server also returns 400 with field errors if forced.
- Missing envs cause a clear startup error (runtime validation).
```

**Follow-up prompt (rate limiting):**
```text
It works, implement rate limiting only for now.
```

## AI Output (verbatim excerpts)
```text
Implementation Summary
Environment Validation (src/lib/env.ts): runtime validation for RESEND_API_KEY and CONTACT_TO with Zod. Clear error messages.
Contact Validation (src/lib/validation/contact.ts): Zod schema (name, email, message) + inferred types.
API Route (src/app/api/contact/route.ts): POST handler; parses JSON; validates; sends via Resend; returns 200/400/500 with structured JSON.
Contact Page (src/app/contact/page.tsx): wired to POST /api/contact, loading state, toasts, aria-live status.
Documentation (docs/ENV_SETUP.md): env setup steps, dev/production notes.

Rate limiting:
- Installed @upstash/ratelimit and @upstash/redis
- Updated API route to rate limit requests: 3 req/min per IP
- Created docs/RATE_LIMITING.md with setup steps and env vars
```

## Terminal (key commands & outputs)
Commands:
```powershell
npm run dev
# (later)
npm install @upstash/ratelimit @upstash/redis
git add -A
git commit -m "feat(contact): add validated contact API and UI
  POST /api/contact accepts name, email, message and returns 202 with messageId, or
  400/429/500 on errors.

  Zod guards both sides of the form, surfacing validation and server failures with
  loading/toast feedback.

  Resend uses a dev sender locally and requests are rate limited through Upstash
  Redis.

  No breaking changes."
git push
```

Dev server logs (excerpt):
```text
   ▲ Next.js 15.5.3
   - Local:        http://localhost:3000
   - Environments: .env.local

Warning: Contentlayer might not work as expected on Windows
Contentlayer config change detected. Updating type definitions and data...
Contentlayer (Warning): Importing from `contentlayer/generated` might not work.
No path alias found for "contentlayer/generated" via tsconfig.json.

✓ Ready in 10.5s
Generated 1 documents in .contentlayer
✓ Compiled /api/contact in 1850ms (962 modules)
POST /api/contact 200 in 2689ms
```

cURL test:
```powershell
curl -X POST http://localhost:3000/api/contact `
  -H "content-type: application/json" `
  -d '{ "name":"Test User", "email":"test@example.com", "message":"Hello from curl!" }'
# → {"ok":true} (or 202 with messageId if you returned accepted)
```

Packages installed:
```text
+ @upstash/ratelimit 2.0.6
+ @upstash/redis 1.35.3
```

## Changed Files (summary)
- `src/app/api/contact/route.ts` — new POST endpoint; Zod validation; Resend send; later augmented with Upstash rate limiting (3/min/IP)
- `src/lib/env.ts` — runtime env validation for `RESEND_API_KEY`, `CONTACT_TO`
- `src/lib/validation/contact.ts` — shared Zod schema/types for contact payload
- `src/app/contact/page.tsx` — wired UI to API; loading/toasts; client validation; `data-testid`s
- `docs/ENV_SETUP.md` — environment variable setup & notes
- `docs/RATE_LIMITING.md` — Upstash documentation & envs
- `README.md` — updated Setup & Run (env), Features Implemented (Step 4), AI Usage
- `package.json` / `package-lock.json` — reflect dependency and script updates

> Get the exact file list after committing with:
> `git show --name-status --oneline 1266f44`

## Verification
Commands run:
```bash
npm run dev
# (optional) npm run build
```

UI checks:
- `/contact` renders form; invalid inputs show inline errors.
- Valid submission shows success toast and returns 200/202.
- Pending state disables submit; `aria-live="polite"` announces status.

API checks (curl):
```bash
curl -X POST http://localhost:3000/api/contact   -H "Content-Type: application/json"   -d '{"name":"Test User","email":"test@example.com","message":"Hello"}'
# Expect JSON { ok: true } and HTTP 200/202
```

Rate limiting:
- After 3 requests/min from the same IP, expect HTTP 429 with a clear message.
- Ensure Upstash env vars are present when rate limiting is active:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

## Notes for README
- **Environment:** add `.env.local` with `RESEND_API_KEY`, `CONTACT_TO` (sender uses `onboarding@resend.dev` in dev)
- **Features Implemented (Step 4):** typed POST `/api/contact`, runtime env validation, wired Contact UI, server field errors
- **Rate limiting:** `/api/contact` limited to 3 req/min/IP via Upstash Redis (document envs and setup)
- **AI Usage:** Windsurf implemented the route/env validation/UI wiring with a11y feedback

## Takeaways
- **Runtime env validation** surfaces misconfiguration immediately, improving DX.
- **Shared Zod schemas** keep client/server validation consistent and simplify error handling.
- **Windows warnings** from Contentlayer2 are benign; `tsconfig` path alias reminder is informational.
- **Rate limiting** via Upstash is straightforward; remember to set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in both local and production envs.
- **Commit hygiene:** One focused feature commit with clear message helps PR review; consider adding unit tests in Day 2.
