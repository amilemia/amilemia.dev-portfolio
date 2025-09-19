# 01 — shadcn setup (UI primitives)

**Date (Africa/Casablanca):** 2025-09-19  — time: 12:00 AM  
**Branch:** dev  
**Tool:** shadcn CLI (non-AI)  
**Commit(s):** 379abae (HEAD -> dev, origin/dev, main) feat: integrate contentlayer and shadcn components

## Prompt (verbatim)
N/A (CLI). Commands executed:
```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card input textarea label form sonner separator badge navigation-menu dropdown-menu
```

## AI Output (verbatim)
N/A — CLI run. Paste an excerpt from your terminal output here (optional):
```text
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS config. Found v4.
…
✔ Created files:
  - src\components\ui\button.tsx
  - src\components\ui\card.tsx
  - src\components\ui\input.tsx
  - src\components\ui\textarea.tsx
  - src\components\ui\label.tsx
  - src\components\ui\sonner.tsx
  - src\components\ui\separator.tsx
  - src\components\ui\badge.tsx
  - src\components\ui\navigation-menu.tsx
  - src\components\ui\dropdown-menu.tsx
  - src\components\ui\form.tsx
Note: toast is deprecated; using sonner.
```

## Changed Files (summary)
- `src/components/ui/button.tsx` — shadcn Button
- `src/components/ui/card.tsx` — shadcn Card
- `src/components/ui/input.tsx` — shadcn Input
- `src/components/ui/textarea.tsx` — shadcn Textarea
- `src/components/ui/label.tsx` — shadcn Label
- `src/components/ui/form.tsx` — shadcn Form primitives
- `src/components/ui/sonner.tsx` — shadcn Sonner Toaster wrapper
- `src/components/ui/separator.tsx` — shadcn Separator
- `src/components/ui/badge.tsx` — shadcn Badge
- `src/components/ui/navigation-menu.tsx` — shadcn Nav menu
- `src/components/ui/dropdown-menu.tsx` — shadcn Dropdown menu
- `src/lib/utils.ts` — helper added by shadcn CLI
- `src/app/globals.css` — updated CSS variables by shadcn CLI

> Get exact list from the commit with: `git show --name-status --oneline HEAD`.


## Verification
Commands run:
```bash
pnpm dev
```
Observations:
- App compiles with new UI primitives ✅
- Keyboard focus rings visible on buttons/links/inputs ✅

## Notes for README (if any)
- Under Tech Stack → UI: “Tailwind CSS, shadcn components (Sonner for toasts)”

## Takeaways
- The new `shadcn` CLI works fine with Tailwind v4.
- The `toast` component is deprecated; `sonner` is used instead.
