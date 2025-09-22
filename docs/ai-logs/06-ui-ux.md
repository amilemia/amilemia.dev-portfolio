# 06 — Hire-me uplift (hero, availability, sticky CTA, card polish)

**Date (Africa/Casablanca):** 2025-09-21 — time: 9:48 PM
**Branch:** dev  
**Tool:** Windsurf (SWE-1) + Codex CLI
**Commit(s):** fe882fd (HEAD -> dev, origin/dev) feat(ui): uplift hire-me hero and cards

## Prompt (verbatim)
```text
Context pack
Project: amilemia.dev — Next.js 15, TypeScript strict, Tailwind v4, shadcn, sonner, contentlayer2.
State: Pages & routing shipped; a11y polish done; Contact API wired; ProjectCard and data-testids exist. We’re about to start writing tests, so keep selectors and component APIs stable.
Constraints: a11y AA, minimal diffs, no new deps, do not rename test ids or change component props.

Goal: Small conversion-focused UI pass that doesn’t break future tests.

Tasks
1) Home hero copy + CTAs
   - Title: “I build fast, accessible web apps.”
   - Subtitle: “Freelance web developer turning product ideas into shipped features—on time and tested.”
   - Primary CTA → /contact (“Start a project”)
   - Secondary CTA → /projects (“View work”)
   - Add a simple trust row with accessible text (placeholder logos, no external deps).

2) Availability pill
   - Show a small pill in the hero: “Available: 1 slot this month — Africa/Casablanca”.
   - Compute current month client-side; keep text accessible.

3) Sticky mobile CTA
   - On small screens, show a sticky footer button “Hire me” → /contact.
   - Ensure it’s keyboard reachable and respects prefers-reduced-motion.

4) Header active state (if not already)
   - Visually indicate current route; keep semantics and test ids stable.

5) ProjectCard micro-polish
   - Subtle hover (shadow/translate) + clear focus ring, gated by reduced motion.
   - Optional small “role” chip if present (no prop changes; conditionally render if role exists on the project data).
   - Keep existing data-testid="project-card" and project-tag unchanged.

Output
1) File list + one-line rationale
2) Full code patches
3) Verification: commands + URLs + keyboard steps
4) README notes: 3–4 bullets to paste under Features Implemented and AI Usage

Acceptance
- Hero shows new copy + 2 CTAs + availability pill
- Mobile shows sticky “Hire me” CTA
- Project cards feel a touch more premium, but selectors are unchanged
- No new packages; a11y and reduced motion respected
```

## AI Output (verbatim)
```text
Summary reported by SWE-1:
- Home Hero Section: replaced copy, added two CTAs (Start a project → /contact, View work → /projects), added trust row.
- Availability Pill: “Available: 1 slot this month — Africa/Casablanca” with subtle pulse dot.
- Project Card Enhancements: hover elevation/translate, clear focus ring, optional role chip; kept existing data-testid attributes.
- Sticky Mobile CTA: floating button on mobile linking to /contact; keyboard accessible; respects reduced motion.
- Header Active State: current route highlighted via active styling; semantics preserved.

Verification Steps (from SWE-1 message):
- Home: verify hero copy & CTAs; availability pill visible; trust indicators present.
- Navigation: active state updates as you switch pages; mobile nav OK.
- Project Cards: hover/focus behaviors present; role chips appear when project has a role.
- Mobile: sticky CTA appears at small viewport; links to /contact; keyboard focusable.
- README Notes: bullets for features and AI usage provided.

Notes:
- SWE-1 attempted multiple edits to `layout.tsx`; some operations could not overwrite the file. Final diff compiled and built locally before commit.
```

## Changed Files (summary)
> Exact list: run `git show --name-status --oneline HEAD` after the commit.

Observed from terminal/commit:
- `src/app/page.tsx` — new hero copy, availability pill, trust row, CTAs
- `src/app/projects/page.tsx` — card polish hooks applied to grid
- `src/app/layout.tsx` — header active state; sticky mobile CTA; `<Toaster />` remains
- `src/app/client-layout.tsx` (new) — introduced during active-state work; verify if needed
- `src/components/ThemeProvider.tsx` — touched during layout edits (imports)
- `src/components/ui/sonner.tsx` — import/usage touched
- `src/types/next.d.ts` (new) — type helper added
- `tsconfig.json` — minor edits from SWE-1
- **Lockfiles:** `package-lock.json` added; pnpm lockfile removed as we transition to npm
- EOL warnings: CRLF conversions reported by Git

## Verification
Commands run:
```bash
npm run dev
```
Manual checks:
- **Home** (`/`): hero shows new copy; two CTAs work; availability pill shows current month; trust row visible.
- **Projects** (`/projects`): cards retain data-testids; hover and focus rings work.
- **Mobile**: sticky “Hire me” button appears; tab focus works; activates `/contact`.
- **Header**: active nav item reflects current route.

## Notes for README (paste)
```markdown
### Hire-me uplift (pre-tests)
- Hero value prop with clear 2-CTA funnel (Start a project / View work)
- Availability pill (Africa/Casablanca)
- Mobile sticky “Hire me” CTA
- Subtle polish to project cards (hover/focus) without changing selectors
```
```markdown
### AI Usage (so far)
- **Windsurf (SWE-1):** small, test-safe UI uplift focused on conversion (no new deps, selectors stable).
```

## Takeaways & Follow-ups
- ✅ No new dependencies; selectors unchanged → safe to start tests.
- ✅ **Package manager:** Project standardized on npm; keep docs/CI/scripts aligned and remove leftover pnpm artifacts when encountered.
- ⚠️ **CRLF warnings:** add a `.gitattributes` to normalize line endings and avoid noise:
    ```gitattributes
    * text=auto
    *.ts  text eol=lf
    *.tsx text eol=lf
    *.js  text eol=lf
    *.jsx text eol=lf
    *.css text eol=lf
    *.md  text eol=lf
    ```
    Or set `git config --global core.autocrlf true` on Windows.
- ⚠️ **Client layout:** `src/app/client-layout.tsx` suggests `app/layout.tsx` might be client-ified for `usePathname`. Prefer keeping `app/layout.tsx` server-side and moving route awareness into a tiny `ClientNav` later to keep SSR benefits.
