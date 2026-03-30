# Portfolio Site Design

**Date:** 2026-03-29
**Project:** tkahng/portfolio
**Stack:** TanStack Start, React 19, Tailwind v4, shadcn/ui (new-york, zinc)

---

## Overview

A personal portfolio for Tchunoo Rhee Kahng — Senior Full-Stack Engineer with 12+ years experience, ex-CTO, CMU Architecture grad. The site must present his engineering depth clearly to recruiters and hiring managers.

**Structure:** Hybrid — a rich single landing page plus individual project detail pages.

---

## Prerequisites

Before implementation begins:

1. Add shadcn/ui components:

   ```bash
   pnpm dlx shadcn@latest add button card badge separator
   ```

   This generates files in `src/components/ui/`.

2. Verify eslint is resolvable (`@tanstack/eslint-config` brings it as a peer dep — confirm with `pnpm why eslint`).

3. All new source files must be auto-formatted and linted before each task is considered done. Run `pnpm run check` which executes `prettier --write . && eslint --fix` (it auto-fixes; a zero exit code means clean).

---

## Routes

| Route             | File                            | Purpose                          |
| ----------------- | ------------------------------- | -------------------------------- |
| `/`               | `src/routes/index.tsx`          | Landing page with all 6 sections |
| `/projects/$slug` | `src/routes/projects/$slug.tsx` | Project case-study detail page   |

The existing `src/routes/about.tsx` should be deleted — its content is superseded by the landing page About section. After deletion, run `pnpm dev` or `pnpm build` once to regenerate `src/routeTree.gen.ts` (auto-managed by TanStack Router — do not edit it manually).

The root `head()` in `src/routes/__root.tsx` should be updated: title → `"Tchunoo Rhee Kahng — Software Engineer"`, add a meta description.

A `notFoundComponent` must be added to `createRootRoute({...})` in `__root.tsx` to handle `notFound()` throws from the project detail loader. It can be a minimal component: a centered message and a link back to `/`.

---

## Data Layer

All content lives in typed data files. Route components import from these — no content hardcoded in components. Content is derived from `cv.md`; correct any typos when transcribing (e.g. "domjain-specific" → "domain-specific" in the summary).

### `src/data/projects.ts`

Exports a `Project[]` array. Each project object:

```ts
interface Project {
  slug: string // url key, e.g. "builderful"
  title: string
  description: string // one sentence for grid card
  image: string // served at this path, e.g. "/projects/builderful.png"
  role: string // e.g. "Lead Backend Engineer"
  company: string // e.g. "Qwerky Inc"
  period: string // e.g. "2020–2024"
  problem: string // one paragraph: what was broken or missing
  contributions: string[] // bullet points: what was built
  stack: string[] // tech tags
}
```

Projects (in display order): Builderful, Deepform, Markurz, Construckit. All images are already in `public/projects/`. The path value is the public URL root — e.g. `/projects/builderful.png`, not a relative filesystem path.

### `src/data/cv.ts`

Exports structured CV data:

```ts
interface ExperienceEntry {
  company: string
  role: string
  location: string
  period: string
  description: string // one sentence for the timeline
}

interface CV {
  name: string
  title: string
  location: string
  contact: { email: string; github: string; linkedin: string }
  summary: string
  experience: ExperienceEntry[]
  skills: Record<string, string[]> // category → tech list
  education: {
    institution: string
    degree: string
    location: string
    period: string
  }
}
```

Three experience entries (reverse-chronological):

1. Career Break & Relocation — Apr 2024–Present
2. Qwerky Inc, CTO — Oct 2020–Apr 2024
3. Insigong, Computational Design Engineer — Jan 2012–Oct 2020

---

## Landing Page (`/`)

The `<main>` uses the existing `page-wrap px-4 pb-8 pt-14` classes. Each section is a direct child — some wrapped in `island-shell` cards, others not. Sections do not nest inside each other.

Apply `rise-in` to the Hero card only (the first visible element). Remaining sections do not animate on mount. Do not replicate the staggered `animationDelay` pattern from the existing template `index.tsx` — it is being replaced entirely.

### 1. Hero

- Layout: centered, inside an `island-shell` card with `rise-in` and `rounded-[2rem]`
- The card contains two absolutely-positioned decorative `<div>` blob elements (radial gradient, pointer-events-none) in the top-left and bottom-right corners — these must be added explicitly in JSX, they are not provided by the `.island-shell` CSS class
- Content: `island-kicker` label, name in Fraunces (`display-title`, large), one-line bio, location tag, links row
- Links: GitHub, LinkedIn, email — shadcn `Button` variant="outline"; CV download — shadcn `Button` variant="default"
- CV download: link to `/tkahng-cv.pdf` (placeholder — add a PDF to `public/` or omit the button initially if no PDF is available)

### 2. About

- An `island-shell` card with `island-kicker` label "About" and the CV summary paragraph

### 3. Projects

- Section heading + 2-column responsive `Card` grid (`grid-cols-1 sm:grid-cols-2`)
- Each card: shadcn `Card` with `feature-card` class for hover effect, full-width `<img>` at top, `CardContent` with title, description, stack `Badge` tags (variant="secondary"), and "View project →" link
- Do not use `CardHeader` or `CardTitle` — render the title as a plain `<h3>` inside `CardContent` to keep the layout flexible
- Cards link to `/projects/$slug`

### 4. Skills

- Section heading + grouped tech `Badge` clusters
- One row per category from `cv.skills`: Languages, Backend, Frontend, Infrastructure, Data, Specialized
- Category labels use `island-kicker` class; badges use shadcn `Badge` variant="secondary"

### 5. Experience

- Section heading + vertical timeline (left border line + dot markers via CSS/Tailwind)
- Three `ExperienceEntry` items rendered from `cv.experience`, reverse-chronological
- Each entry: period, company + role, one-line `description`
- No bullet lists — detailed contributions live on project detail pages

### 6. Contact / Footer CTA

- Centered: "Get in touch" heading, email `<a>` link, GitHub + LinkedIn shadcn `Button` with lucide icons
- Sits above the existing site `<Footer>` component

---

## Project Detail Page (`/projects/$slug`)

Resolved via a TanStack Router `loader`. If the slug does not match any project, throw `notFound()` from `@tanstack/react-router` — do not use a conditional render. The `notFoundComponent` registered on the root route (see Routes section) will handle rendering.

Sections in order:

1. **Back navigation** — "← All projects" `<Link>`
2. **Header** — project title (Fraunces, large), company + period metadata
3. **Hero image** — full-width `<img>`, rounded, `aspect-video` object-cover
4. **Meta row** — two columns: My Role | Company & Period, separated by shadcn `Separator`
5. **The Problem** — `island-kicker` label + one paragraph
6. **What I Built** — `island-kicker` label + `<ul>` of `contributions`
7. **Tech Stack** — `island-kicker` label + `Badge` tags
8. **Prev / Next navigation** — links to adjacent projects by index in the `projects` array; does not wrap around (first project has no Prev, last has no Next)

---

## Styling Approach

- **shadcn/ui components used:** `Button`, `Card`, `CardContent`, `Badge`, `Separator`
- **Existing tokens kept:** `--sea-ink`, `--lagoon`, `--palm`, `--sand`, `--foam`, `--surface`, `island-shell`, `island-kicker`, `display-title`, `rise-in`, `feature-card`, `page-wrap`
- **Palette coexistence:** shadcn zinc variables and the teal palette coexist in `styles.css`. The teal `background:` shorthand on `body` takes precedence over `@layer base`'s `background-color` reset (shorthand wins specificity). shadcn components render with zinc tokens; custom sections use teal tokens.
- **Fonts:** Fraunces (display titles), Manrope (body) — already loaded via Google Fonts in `styles.css`
- **Dark mode:** existing `.dark` class toggle already wired via `ThemeToggle` component — no changes needed

---

## Component File Plan

```
src/
  data/
    projects.ts
    cv.ts
  routes/
    index.tsx            (rewrite)
    about.tsx            (delete)
    projects/
      $slug.tsx          (new)
  components/
    ui/                  (shadcn-generated: button, card, badge, separator)
    sections/
      Hero.tsx
      About.tsx
      ProjectsGrid.tsx
      Skills.tsx
      Experience.tsx
      ContactCTA.tsx
    ProjectCard.tsx
```

---

## Out of Scope

- Contact form (email link only)
- Blog / writing section
- Scroll-triggered animations beyond `rise-in` on the Hero
- CMS or database — data is static TypeScript
