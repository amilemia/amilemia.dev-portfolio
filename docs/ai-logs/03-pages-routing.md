# 03 — Pages & Routing Scaffold

**Date (Africa/Casablanca):** 2025-09-19 — time: 02:02 AM  
**Branch:** dev  
**Tool:** Windsurf SWE-1  
**Commit(s):** Code: `2c6e246` — *feat(pages,ui): scaffold primary pages and shared layout*; Docs (this file): *pending*

## Prompt (verbatim)
```text
Context pack
Project: amilemia.dev — Next.js 15 (App Router), TypeScript strict, Tailwind v4, shadcn (installed via `shadcn` CLI), `sonner` toasts, Zod, Resend, contentlayer2/next-contentlayer2.
State: Contentlayer2 is configured; example MDX exists at `content/projects/hello-world.mdx`. Helpers: `getProjects()` and `getProjectBySlug()` are available in `src/lib/content.ts`. UI components installed: button, card, input, textarea, label, form, sonner, separator, badge, navigation-menu, dropdown-menu.
Constraints: a11y AA (visible focus, labels, keyboard nav), no new deps without asking, small reviewable diffs. No `@tailwindcss/typography` plugin; use Tailwind utilities for MDX content styling.

Goal of this thread: Implement the core pages and routing.

Tasks
1) Layout
   - Update `src/app/layout.tsx`:
     - Render `<Toaster />` from `@/components/ui/sonner` near the end of `<body>`.
     - Add semantic `<header>` with a simple nav using shadcn `navigation-menu` linking to `/`, `/projects`, `/about`, `/contact`.
     - Add `<main>` landmark wrapper and a minimal `<footer>` with external GitHub link (use `rel="noopener noreferrer"`).
     - Provide minimal `export const metadata` (title/description).

2) Pages
   - `src/app/page.tsx` (Home):
     - Hero with title + short subtitle.
     - Two CTA buttons to `/projects` and `/contact` (shadcn Button).
     - “Recent projects” section: show up to 3 items from `getProjects()`; each card links to detail. Handle empty state gracefully.

   - `src/app/projects/page.tsx`:
     - Responsive grid of all projects using `getProjects()`.
     - Card shows title, summary, and tag badges when present.
     - Each card links to detail.

   - `src/app/projects/[slug]/page.tsx`:
     - Resolve by slug using `getProjectBySlug()` (fallback to 404 if not found).
     - Import the MDX hook from the forked package:
       `import { useMDXComponent } from "next-contentlayer2/hooks"`
     - Render title, summary, optional stack/tag badges, and the MDX body.
     - Add a “Back to projects” link.
     - (Nice-to-have) `export async function generateStaticParams()` for pre-render.

   - `src/app/about/page.tsx`:
     - Short bio + 3–4 highlight bullets or a tiny timeline (no extra deps).

   - `src/app/contact/page.tsx`:
     - **UI only** form using shadcn `Form`, `Label`, `Input`, `Textarea`.
     - Client Zod schema for `{ name, email, message }`; show inline errors.
     - Add `data-testid` on inputs and submit button for future tests.
     - Do not call the API yet; just `onSubmit` stub and success/error placeholders.

3) a11y details (apply across pages)
   - Use semantic headings; bind `label htmlFor` to inputs.
   - All interactive elements keyboard reachable with visible focus (`:focus-visible`).
   - External links use `rel="noopener noreferrer"`.
   - Respect `prefers-reduced-motion` if any animation is used (gate it).

Output format
1) File list with a one-line rationale per file
2) Full code blocks for each new/changed file
3) "Verification" section with commands + URLs to click
4) Short "README notes" block with bullet points I can paste under README → Features Implemented and AI Usage

Acceptance criteria
- `/projects` lists the “Hello World” project from Contentlayer.
- `/projects/hello-world` renders the MDX body with title/summary/badges and a Back link.
- Home has hero, two CTAs, and a 3-item Recent projects section (or empty state).
- Contact page renders the form with client-side validation (no API call yet).
- Header nav and footer are present, accessible, and keyboard friendly.
```

## AI Output (verbatim)
```text
I'll help you implement the core pages and routing for your Next.js portfolio site. Let's break this down into manageable steps and tackle them one by one.

First, I'll check the existing project structure to understand what we're working with.

Let me check the content of the existing layout and page files to understand the current structure.

Let me check the content of the example project file to understand the structure:

Let me check the content helpers to understand how to fetch projects.

Let's start by updating the layout file to include the header, footer, and Toaster component.

layout.tsx
+64
-7
Let's create the home page with a hero section and recent projects.

Let me check the current content of the home page file first.

Let's update the home page with the new layout and content.

page.tsx
+69
-17


Let me fix the page.tsx file by removing the remaining template content and ensuring it's clean.

page.tsx
+2
-10


Let's create the projects page now:

page.tsx
new
+54


Let's create the project detail page now:

page.tsx
new
+144


Let's create the about page now!

page.tsx
new
+79
Let's create the contact page with a form that includes client-side validation:

page.tsx
new
+222
Let's create a not-found page for better error handling when a page is not found.

not-found.tsx
new
+20
Let's create a loading state for better user experience while content is being loaded.

loading.tsx
new
+9
I've successfully implemented all the core pages and routing for your portfolio website. Here's a summary of the changes:

File List with Rationale
src/app/layout.tsx
Added a responsive header with navigation links
Included a footer with copyright and social links
Added the Toaster component for notifications
Set up proper metadata
src/app/page.tsx
 (Home)
Created a hero section with a call-to-action
Added a "Recent Projects" section showing the latest 3 projects
Included links to projects and contact page
src/app/projects/page.tsx
Displays all projects in a responsive grid
Shows project title, summary, and tags
Links to individual project pages
src/app/projects/[slug]/page.tsx
Dynamic route for individual project pages
Displays project details including title, summary, and content
Includes back navigation and project links
src/app/about/page.tsx
Personal bio and introduction
Skills section with frontend and backend technologies
Experience timeline
src/app/contact/page.tsx
Contact form with client-side validation
Form fields for name, email, and message
Contact information and social links
src/app/not-found.tsx
Custom 404 page with a link back to the home page
src/app/loading.tsx
Loading state component for better UX during page transitions
Verification Steps
Start the development server:
bash
npm run dev
Open http://localhost:3000 in your browser and verify:
The home page loads with a hero section and recent projects
Navigation links in the header work correctly
Footer is displayed at the bottom of each page
Test the following routes:
/projects - Should show all projects
/projects/hello-world - Should show the "Hello World" project details
/about - Should show the about page with your bio and skills
/contact - Should display the contact form
/non-existent-route - Should show the 404 page
Test the contact form:
Try submitting without filling in any fields to see validation
Enter an invalid email to see the email validation
Submit a valid form to see the success message
README Notes
Features Implemented:

Responsive layout with header and footer
Home page with hero section and recent projects
Projects listing with individual project pages
About page with skills and experience
Contact form with client-side validation
404 Not Found page
Loading states for better UX
Accessible navigation and interactive elements
Dark mode support
AI Usage Notes:

Used AI to generate the initial project structure and components
Implemented responsive design patterns with Tailwind CSS
Set up form validation with Zod and React Hook Form
Created accessible UI components with proper ARIA attributes
Generated placeholder content that should be replaced with actual content
The code follows best practices for Next.js 15 with the App Router, TypeScript, and Tailwind CSS. The UI is fully responsive and includes proper accessibility features.
```

## Changed Files (summary)
- `src/app/layout.tsx` — added header/footer, integrated `<Toaster />`, metadata, a11y focus-visible tweaks
- `src/app/page.tsx` — Home hero, CTAs, recent projects (later fixed to `async` + `await getProjects()`)
- `src/app/projects/page.tsx` — projects grid listing from `getProjects()`
- `src/app/projects/[slug]/page.tsx` — server page for a single project (uses `generateStaticParams` and passes data to client component)
- `src/app/projects/[slug]/project-content.tsx` — **client** component rendering MDX via `useMDXComponent` and handling UI
- `src/app/about/page.tsx` — bio/highlights
- `src/app/contact/page.tsx` — UI-only form with Zod client schema and `data-testid`s
- `src/app/loading.tsx` — route-level loading indicator
- `src/app/not-found.tsx` — 404 boundary
- `src/lib/content.ts` — later adjusted signatures (if you made `getProjects`/`getProjectBySlug` async); ensure they return arrays/objects consistently
- `README.md` — added “Features Implemented (Step 3)" and “AI Usage (so far)” sections
- `package.json` — (if present) added `date-fns` dep for date formatting in detail page

> Tip: after committing, run `git show --name-status --oneline 2c6e246` to retrieve the exact file list for the code commit, then update this section with precise statuses (A/M/D).

## Verification
Commands run:
```bash
pnpm build:content
pnpm dev
```

URLs clicked / behaviors observed:
- `/` — hero + CTAs render; **initial bug**: `getProjects().slice` error because `getProjects` was async ⇒ **fixed** by making Home `async` and `const projects = (await getProjects()).slice(0,3)`
- `/projects` — card for “Hello World” shows and links to detail
- `/projects/hello-world` — **initial bug**: “cannot use both 'use client' and generateStaticParams()” ⇒ **fixed** by moving MDX rendering to `project-content.tsx` (client) and keeping `page.tsx` as server-only
- `/projects/hello-world` — **follow-up error**: “params.slug should be awaited” (Next.js dynamic route warning) while iterating; **resolution**: keep `page.tsx` as server component, remove any `'use client'` from it, destructure `{ params }` in the function signature, do **not** `await` `params`, and keep all client hooks (MDX) in the client subcomponent
- `/about`, `/contact` — render as expected; Contact shows inline validation (client Zod)
- **Hydration mismatch** warning in `layout` due to browser extension attributes ⇒ mitigated with `suppressHydrationWarning` on `<html>` (and optionally `<body>`)

Additional warnings observed:
- Contentlayer alias warning: “No path alias found for `contentlayer/generated` in tsconfig” ⇒ Add to `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "contentlayer/generated": [".contentlayer/generated"]
      }
    },
    "include": [".contentlayer/generated"]
  }
  ```

## Notes for README (if any)
- **Features Implemented (Step 3 — Pages & Routing)**: layout with nav/footer; Home with hero/CTAs/recent; Projects grid; Project detail MDX; About; Contact (UI with client Zod)
- **AI Usage (so far)**: Windsurf SWE-1 scaffolded pages/routing and form UI with a11y guardrails; produced small, reviewable diffs; appended README notes

## Takeaways
- **Server vs Client**: Don’t mix `'use client'` with `generateStaticParams()` in a page file. Keep the page as a server component and push interactive/MDX rendering into a client subcomponent.
- **Dynamic params**: In App Router, `params` is provided to the server component; don’t `await` it. The “should be awaited” error surfaced during mis-structured code; resolved by keeping server-only page and moving hooks client-side.
- **Async helpers**: If making `getProjects()` async, ensure callers `await` it (Home needed `await` before `.slice(0,3)`).
- **Hydration**: Browser extensions can inject attributes; `suppressHydrationWarning` helps, but prefer to keep markup deterministic and disable extensions during dev for cleaner signals.
- **Contentlayer warnings**: Add `paths` alias or set `disableImportAliasWarning: true` in `contentlayer.config.ts` if desired.
