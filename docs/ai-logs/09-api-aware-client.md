# 09 — API-aware client + changelog

**Date (Africa/Casablanca):** 2025-09-22 — time: 05:15 AM
**Branch:** dev  
**Tool:** Windsurf (SWE-1) + Terminal  
**Commit(s):** 2624a3d (HEAD -> dev, origin/dev)  feat(api): add contact OpenAPI spec and typed client

## Prompt (verbatim)
```text
Context pack
Project: amilemia.dev — Next.js 15 App Router, TypeScript strict, Tailwind v4, shadcn, sonner, Zod, Resend, contentlayer2. Using npm. Contact API lives at POST /api/contact and accepts { name, email, message } validated by Zod. Tests & CI exist.

Goal: Demonstrate API-aware generation by introducing an OpenAPI spec and using it to generate types + a typed client for /api/contact. Also add a repo-level CHANGELOG powered by Conventional Commits.

Tasks
A) OpenAPI
1) Create docs/api/contact.openapi.yaml  describing:
   - POST /api/contact
   - RequestBody: application/json { name: string(min 2), email: email, message: string(min 10, max 2000) }
   - Responses:
     200: { ok: true }
     400: { ok: false, error: string, fieldErrors?: Record<string,string[]> }
     500: { ok: false, error: string }
   - Include minimal examples.

2) Add a note (comment) that the spec mirrors Zod schema in src/lib/validation/contact.ts .

B) Types + Client
3) Update package.json  to include scripts:
   - "generate:api:types": "openapi-typescript docs/api/contact.openapi.yaml -o src/lib/api/types/contact.ts"
4) Create:
   - src/lib/api/types/  (folder, committed)
   - src/lib/api/client.ts : tiny fetch wrapper with:
     ```ts
     export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; fieldErrors?: Record<string,string[]> }
     export async function postContact(body: components["schemas"]["ContactRequest"]): Promise<ApiResult<paths["/api/contact"]["post"]["responses"]["200"]["content"]["application/json"]>>
     ```
     - Implement using fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }) 
     - Parse JSON; normalize to ApiResult shape.

5) Wire the Contact page to call postContact(...)  instead of raw fetch; keep the same UI and test selectors.

C) Changelog
6) Add CHANGELOG.md  (empty with a heading) and update README with a short “How to update changelog” section.
7) Update package.json  scripts:
   - "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
   (we will install the dev dep locally after this thread)

A11y/DevX
- No UI breaking changes; do not change testids.
- Keep diff small and readable.

Output format
1) File list with one-line rationale per file
2) Full code blocks for each new/changed file (OpenAPI YAML, client.ts, pkg.json patches, contact page patch, empty CHANGELOG)
3) Short "Verification" section (commands + expected results)
4) README notes (bullets to paste)

Acceptance criteria
- OpenAPI spec exists in docs/api and matches our Zod constraints.
- Generated types live in src/lib/api/types after running the script.
- Contact page uses the typed client; UX unchanged.
- CHANGELOG.md present; script exists to generate it from Conventional Commits.
```

## AI Output (verbatim / terminal excerpts)
```text
… (Your terminal & Windsurf outputs summarised)
- Installed dev deps: openapi-typescript, conventional-changelog-cli
- Generated types with: npm run generate:api:types
- Typechecked: npm run typecheck (passed)
- Tests: npm test (passed)
- Changelog generated: npm run changelog
- Commit & push completed on dev (2624a3d)
```

## Changed Files (summary)
- `docs/api/contact.openapi.yaml` — New OpenAPI 3.1 spec for `POST /api/contact`; mirrors Zod constraints; includes examples.
- `src/lib/api/types/contact.ts` — Generated TS types from the OpenAPI spec via `openapi-typescript`.
- `src/lib/api/client.ts` — Typed client wrapper (`postContact`) returning a discriminated `ApiResult` and normalizing errors.
- `src/app/contact/page.tsx` — Switched submit handler from raw `fetch` to `postContact(...)`; selectors unchanged.
- `CHANGELOG.md` — Initialized Conventional Commits-driven changelog.
- `package.json` — Added scripts: `generate:api:types`, `changelog`.
- `README.md` — Documented API types generation and changelog usage.
- `package-lock.json` — Updated by npm to include new dev dependencies.

> Get an exact list with: `git show --name-status --oneline 2624a3d`

## Verification
Commands run:
```bash
npm run generate:api:types
npm run typecheck
npm test
npm run dev
# optional
npm run changelog && git add CHANGELOG.md && git commit -m "docs(changelog): update"
```
Observed results:
- `src/lib/api/types/contact.ts` is generated ✅
- Typecheck passed ✅
- Unit tests passed ✅
- Contact page submits via typed client; UX unchanged ✅
- Changelog generated from Conventional Commits ✅

## Notes for README (pasted)
- **API-aware generation:** OpenAPI 3.1 spec for `/api/contact` → types via `openapi-typescript` → typed client wrapper.
- **API Types:** `npm run generate:api:types` to regenerate types from `docs/api/contact.openapi.yaml`.
- **Changelog:** Uses Conventional Commits; update with `npm run changelog`.

## Takeaways
- Small OpenAPI specs keep client/server contracts explicit and type-safe.
- Generated types make the contact integration safer and easier to evolve.
- Conventional Commits + changelog script produce an auditable history quickly.
