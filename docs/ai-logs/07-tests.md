# 07 — Tests scaffold & specs (Vitest + RTL + Playwright)

**Date (Africa/Casablanca):** 2025-09-22 — time: 04:05 AM
**Branch:** dev  
**Tool:** Codex CLI
**Commit(s):** f9c6b1b (HEAD -> dev, origin/dev) test(setup,unit,component,e2e): add Vitest config and Playwright specs

## Prompt (verbatim)
```text
You are acting in-repo on a Next.js 15 App Router project (TypeScript strict, Tailwind v4, shadcn, sonner, Zod, Resend, contentlayer2). We use **npm** (not pnpm). Create a small but complete test scaffold:

Constraints
- Keep diffs small. Do NOT change existing component APIs, routes, or data-testids.
- No new runtime deps. Only use the testing stack already in package.json (Vitest, @testing-library/*, jsdom, Playwright). If a devDep is missing, modify package.json devDependencies and tell me to run `npm install` (do not run it yourself).
- Tests must pass on Windows.

Goals
1) Vitest + Testing Library setup (unit/component, jsdom)
2) A couple of representative unit tests:
   - Contact form schema (ContactSchema)
   - Project sorting logic (sort by `dates.end ?? dates.start` desc) without importing contentlayer
3) Optional component test for `ProjectCard` if it exists (otherwise create a skipped spec with a clear TODO)
4) Playwright e2e with dev server auto-start and a stub for POST /api/contact

Make the following changes:

A) Vitest config & setup
- Create `vitest.config.ts`:
  - `environment: "jsdom"`
  - `setupFiles: ["src/test/setupTests.ts"]`
  - `include: ["src/**/*.{test,spec}.{ts,tsx}"]`
  - CSS enabled
  - Alias `@` → `src`

- Create `src/test/setupTests.ts`:
  - `import "@testing-library/jest-dom"`
  - Provide a no-op `ResizeObserver` polyfill
  - Do not add global fetch polyfills (not needed here)

B) Unit tests
- Create `src/lib/validation/__tests__/contact.schema.test.ts`:
  - Import `ContactSchema` from `src/lib/validation/contact`
  - One valid payload test (success)
  - Three invalid payloads: short name, bad email, short/too-long message (expect failure)

- Create `src/lib/__tests__/content.sort.test.ts`:
  - Write a local `sortProjects` helper that sorts by `dates.end ?? dates.start` descending
  - Feed it a small array of 3 items and assert the order (don’t import contentlayer)

C) Component test (optional)
- If `src/components/ProjectCard.tsx` (or a similarly named file) exists, add `src/components/__tests__/ProjectCard.test.tsx` that:
  - Renders with title, summary, tags, and optional cover
  - Asserts the card has `data-testid="project-card"`
  - Asserts tags render with `data-testid="project-tag"`
  - Asserts the link points to the given `href`
  - Tabs once and expects the card (or its focusable wrapper) to receive focus
- If no ProjectCard exists, still create `src/components/__tests__/ProjectCard.test.tsx` but wrap its suite in `describe.skip("ProjectCard", ...)` with a TODO comment saying to enable after the component ships. The skipped test must compile.

D) Playwright e2e
- Create `playwright.config.ts`:
  - `testDir: "./e2e"`
  - `use.baseURL = "http://localhost:3000"`
  - `webServer`: `"npm run dev"`, `url: "http://localhost:3000"`, `reuseExistingServer: true`, `timeout: 120000`
  - Chromium desktop project only

- Create `e2e/home.spec.ts`:
  - Go to `/`, find the main H1, click the “View work” CTA, expect URL `/projects`

- Create `e2e/projects.spec.ts`:
  - Go to `/projects`, expect at least one project link is visible (use a role or a visible link; do not rely on component internals)
  - Click the first project link; expect URL matches `/projects/` and an H1 is visible on detail

- Create `e2e/contact.spec.ts`:
  - Intercept `POST **/api/contact` and fulfill `{ ok: true }`
  - Submit the form invalid first (expect visible validation text), then valid (expect toast text like “Message sent!”)
  - Use role/label queries where possible; fall back to stable `data-testid` only if needed

E) Scripts (if missing)
- In `package.json` ensure scripts exist (add if missing; do not remove existing):
  - `"test": "vitest --run"`
  - `"test:watch": "vitest"`
  - `"test:ui": "vitest --ui"`
  - `"e2e": "playwright test"`
  - `"e2e:open": "playwright test --ui"`
  - Keep existing `"dev"`, `"build"`, `"typecheck"`, `"lint"`, `"build:content"` intact.

Output format (strict)
1) **File tree diff** (added/changed paths + 1-line rationale each)
2) **Full file contents** for every new/changed file (no placeholders)
3) **Follow-up commands** for me to run (npm install if you added a devDep, `npm test`, `npm run e2e`)
4) **Notes**: any assumptions (e.g., if ProjectCard test was skipped), and where to tweak selectors if my UI copy differs slightly.

Acceptance criteria
- `npm test` passes on jsdom
- `npm run e2e` passes; dev server autostarts; contact POST is stubbed
- No app code refactors required; selectors stable; no new runtime deps
```

## AI Output (verbatim)
> Paste the Windsurf (SWE-1) response that produced the diffs here. If very long, keep the “file diff list” and link screenshots under `../screenshots/07-tests/`.

## Changed Files (summary)
**Created**
- `vitest.config.ts` — Vitest config (jsdom, RTL setup, alias @ → src)
- `src/test/setupTests.ts` — RTL + jest-dom setup; `ResizeObserver` polyfill
- `src/lib/validation/__tests__/contact.schema.test.ts` — ContactSchema unit tests
- `src/lib/__tests__/content.sort.test.ts` — sort-by-date unit test (no contentlayer import)
- `src/components/__tests__/ProjectCard.test.tsx` — component interactions/a11y (skipped if component absent)
- `playwright.config.ts` — e2e baseURL + dev webServer
- `e2e/home.spec.ts` — home → projects nav
- `e2e/projects.spec.ts` — projects list → detail flow
- `e2e/contact.spec.ts` — contact form validates; POST stubbed
- `src/test/patched-jsdom.environment.ts` — (if generated) environment helper
- `test-results/.last-run.json` — Playwright artifact

**Modified (from git add warnings)**
- `content/projects/hello-world.mdx` — CRLF/LF normalization noted by Git
- `package.json` — scripts ensured/updated
- `src/app/contact/page.tsx` — (if wired for stable selectors)
- `src/lib/content.ts` — (if any small export tweak or import path change)

> For the exact list, run:  
> `git show --name-status --oneline f9c6b1b`

## Verification
**Commands**
```bash
npm run build:content
# Output included:
# Warning: Contentlayer might not work as expected on Windows
# Contentlayer (Warning): Importing from `contentlayer/generated` might not work.
# No path alias found for "contentlayer/generated" via `compilerOptions.paths` in "tsconfig.json".
# Generated 1 documents in .contentlayer

npm test
# Vitest:
#  Test Files  2 passed | 1 skipped (3)
#       Tests  4 passed | 1 skipped (5)

npm run e2e
# Playwright:
#  Running 3 tests using 3 workers
#  3 passed (≈32s)
```

**Observations**
- Unit and component tests pass; ProjectCard suite skipped if component absent.
- e2e starts the dev server automatically and stubs `/api/contact`, keeping tests offline.
- Windows line-ending notices during `git add` were informational only.

**Note (Contentlayer warning)**
If you still see the alias warning, ensure `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "contentlayer/generated": [".contentlayer/generated"] }
  },
  "include": [".contentlayer/generated", "src", "next-env.d.ts", ".next/types/**/*.ts"]
}
```
Or set `disableImportAliasWarning: true` in `contentlayer.config.ts` to silence it.

## Notes for README
- **Testing**: Vitest + Testing Library (jsdom) for unit/component; Playwright for e2e with dev server auto-start.  
- **Commands**: `npm test`, `npm run e2e`.  
- **Network**: `/api/contact` is stubbed in e2e to avoid real email sends.  
- **Selectors**: prefer role/label queries; `data-testid` used only where necessary.

## Takeaways
- Keeping selectors stable and using role/label queries made tests resilient to UI copy tweaks.  
- Playwright `webServer` integration simplifies local e2e; network stubbing avoids external calls.  
- On Windows, configure line endings if desired:
  - Add `.gitattributes`: `* text=auto eol=lf`
  - Or run `git config core.autocrlf false` in the repo.
