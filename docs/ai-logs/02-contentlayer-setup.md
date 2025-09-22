# 02 — Contentlayer2 setup (MDX Projects)

**Date (Africa/Casablanca):** 2025-09-19  — time: 12:02 AM  
**Branch:** dev  
**Tool:** Windsurf (SWE-1) + terminal  
**Commit(s):** 379abae (HEAD -> dev, origin/dev, main) feat: integrate contentlayer and shadcn components

## Prompt (verbatim)
```text
Context: Next.js 15 App Router, TypeScript strict, Tailwind v4, shadcn, contentlayer2@0.5.x, next-contentlayer2@0.5.x.
Goal: Set up Contentlayer2 for MDX projects.

Create contentlayer.config.ts using contentlayer2/source-files. Document type Project with fields:
title, slug, summary, cover?, tags[]?, role?, stack[]?, dates{start:date, end?:date}, links{repo?,live?}, metrics[{label,value}]? and MDX body. Add computedFields.url = /projects/${slug}.
Use remark-gfm + rehype-slug.

Ensure TypeScript can find generated types: in tsconfig.json, map "contentlayer/generated" to ".contentlayer/generated" and include ".contentlayer/generated" in include.
Wrap Next config with the fork: next.config.ts should export withContentlayer from "next-contentlayer2".
Add example file content/projects/hello-world.mdx with realistic frontmatter and short body.
Add src/lib/content.ts that exports getProjects() sorted by dates.end ?? dates.start desc using allProjects from "contentlayer/generated".
Add npm scripts: "build:content": "contentlayer2 build".

Acceptance criteria:
- npm run build:content succeeds and .contentlayer/generated exists.
- getProjects() returns the example project.
```

## AI Output (verbatim)
_Paste the Windsurf response that created/edited files. If it’s long, paste key parts and link screenshots saved under `docs/screenshots/`._

## Terminal (key commands & outputs)
Commands executed (from your history):
```bash
npm uninstall contentlayer next-contentlayer
npm install contentlayer2 next-contentlayer2
npm install --save-dev rehype-slug remark-gfm
npm run build:content
```
Selected excerpts (paste from your terminal):
```text
Ignored build scripts: contentlayer2, protobufjs
…
Do you approve? (y/N) · true
…
ConfigReadError: Cannot find package 'rehype-slug' …
…
devDependencies:
+ rehype-slug 6.0.0
+ remark-gfm 4.0.1
…
# final successful build
```
(If you still have Windows-specific warnings, note them here.)

## Changed Files (summary)
- `contentlayer.config.ts` — Project schema; remark-gfm & rehype-slug configured
- `content/projects/hello-world.mdx` — example MDX with frontmatter and body
- `src/lib/content.ts` — `getProjects()` and `getProjectBySlug()` helpers
- `tsconfig.json` — path map `"contentlayer/generated"` → `".contentlayer/generated"`, include generated types
- `next.config.ts` — wrapped with `withContentlayer` from `"next-contentlayer2"`
- `package.json` — added `"build:content": "contentlayer2 build"`
- `.gitignore` — (optional) added `.contentlayer/` to ignore generated types

> Get exact list from the commit with: `git show --name-status --oneline HEAD`.

## Verification
Commands run:
```bash
npm run build:content
npm run dev
```
Observations:
- `.contentlayer/generated` exists ✅
- `getProjects()` returns the “Hello World” entry in descending date order ✅
- Accessed `http://localhost:3000/projects` after wiring pages later (Step 3) ✅

## Notes for README (if any)
- Tech Stack → Content: “MDX + Contentlayer2 (Next 15-compatible) with remark-gfm & rehype-slug”
- Features Implemented (Step 2): “Content pipeline configured; example Project MDX added; helpers to fetch/sort content.”

## Takeaways
- npm handles the contentlayer build scripts without manual approval on Windows.
- Missing plugins (`rehype-slug`, `remark-gfm`) were the root cause of initial build failures.
- The fork (`contentlayer2/next-contentlayer2`) resolved Next 15 compatibility.
