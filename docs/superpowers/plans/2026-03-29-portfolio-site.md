# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Tchunoo Rhee Kahng's personal portfolio site on top of an existing TanStack Start template — replacing placeholder content with a real landing page and project detail pages.

**Architecture:** Static typed data in `src/data/` drives all content. Six section components compose the landing page. A dynamic `$slug` route renders project case studies. shadcn/ui components (Card, Badge, Button, Separator) are layered over the existing teal/sea design tokens.

**Tech Stack:** TanStack Start (React 19 SSR), Tailwind v4, shadcn/ui (new-york, zinc), TypeScript, Vitest + Testing Library

---

## File Map

| File                                       | Action   | Responsibility                                   |
| ------------------------------------------ | -------- | ------------------------------------------------ |
| `src/data/cv.ts`                           | Create   | CV content: summary, experience, skills, contact |
| `src/data/projects.ts`                     | Create   | Project data + `getProjectBySlug` helper         |
| `src/tests/data.test.ts`                   | Create   | Unit tests for data helpers                      |
| `src/routes/__root.tsx`                    | Modify   | Title, meta description, `notFoundComponent`     |
| `src/routes/index.tsx`                     | Rewrite  | Landing page composing all 6 section components  |
| `src/routes/about.tsx`                     | Delete   | Superseded by landing page About section         |
| `src/routes/projects/$slug.tsx`            | Create   | Project case-study detail page with loader       |
| `src/components/Header.tsx`                | Modify   | Portfolio branding, nav links                    |
| `src/components/Footer.tsx`                | Modify   | Portfolio branding, real links                   |
| `src/components/sections/Hero.tsx`         | Create   | Centered hero with name, bio, links              |
| `src/components/sections/About.tsx`        | Create   | Summary card                                     |
| `src/components/sections/ProjectsGrid.tsx` | Create   | 2×2 project card grid                            |
| `src/components/sections/Skills.tsx`       | Create   | Grouped tech badge clusters                      |
| `src/components/sections/Experience.tsx`   | Create   | Vertical timeline                                |
| `src/components/sections/ContactCTA.tsx`   | Create   | Centered contact section                         |
| `src/components/ProjectCard.tsx`           | Create   | Card used in the grid                            |
| `src/components/ui/`                       | Generate | shadcn button, card, badge, separator            |

---

## Task 1: Install shadcn/ui components

**Files:**

- Generate: `src/components/ui/button.tsx`, `card.tsx`, `badge.tsx`, `separator.tsx`

- [ ] **Step 1: Add shadcn components**

```bash
cd /path/to/portfolio
pnpm dlx shadcn@latest add button card badge separator
```

Accept all prompts (overwrite if asked). This writes into `src/components/ui/`.

- [ ] **Step 2: Verify eslint resolves**

```bash
pnpm why eslint
```

Expected: shows eslint in the dependency tree (via `@tanstack/eslint-config`). If missing, install it: `pnpm add -D eslint`.

- [ ] **Step 3: Verify check passes on unmodified codebase**

```bash
pnpm run check
```

Expected: exits 0. This confirms prettier + eslint work before we make any changes.

---

## Task 2: Create data/cv.ts

**Files:**

- Create: `src/data/cv.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/data/cv.ts

export interface ExperienceEntry {
  company: string
  role: string
  location: string
  period: string
  description: string
}

export interface CV {
  name: string
  title: string
  location: string
  contact: {
    email: string
    github: string
    linkedin: string
  }
  summary: string
  experience: ExperienceEntry[]
  skills: Record<string, string[]>
  education: {
    institution: string
    degree: string
    location: string
    period: string
  }
}

export const cv: CV = {
  name: 'Tchunoo Rhee Kahng',
  title: 'Senior Full-Stack Software Engineer',
  location: 'Fullerton, CA',
  contact: {
    email: 'tkahng@gmail.com',
    github: 'https://github.com/tkahng',
    linkedin: 'https://www.linkedin.com/in/tchunoo-kahng-612aa6152/',
  },
  summary:
    'Senior full-stack engineer with 12+ years building production systems across startups and design-technology firms. As CTO of a startup, led end-to-end backend architecture, cloud migration, API design, and cross-functional coordination with frontend and mobile teams. Experienced shipping e-commerce platforms, serverless workloads, and domain-specific analysis engines in TypeScript, Go, C#, and Java on AWS infrastructure.',
  experience: [
    {
      company: 'Career Break & Relocation',
      role: 'Independent',
      location: 'Fullerton, CA',
      period: 'Apr 2024 – Present',
      description:
        'Deepening skills in Go, Kubernetes, and infrastructure engineering after relocating from South Korea.',
    },
    {
      company: 'Qwerky Inc',
      role: 'CTO / Full-Stack Engineer',
      location: 'Seoul, South Korea',
      period: 'Oct 2020 – Apr 2024',
      description:
        'Led engineering across four products at a construction-tech startup, owning backend architecture, data modeling, infrastructure, and technical strategy.',
    },
    {
      company: 'Insigong',
      role: 'Computational Design Engineer',
      location: 'Seoul, South Korea',
      period: 'Jan 2012 – Oct 2020',
      description:
        'Built Python/C# automation tools and GIS + ML pipelines for architectural design and urban feasibility analysis.',
    },
  ],
  skills: {
    Languages: ['Go', 'TypeScript', 'Java', 'C# (.NET)', 'Python'],
    Backend: [
      'Node.js',
      'NestJS',
      'Apollo GraphQL',
      'Prisma',
      'TypeORM',
      'Spring Boot',
      'ASP.NET',
    ],
    Frontend: ['React', 'Next.js', 'Angular'],
    Infrastructure: [
      'Docker',
      'Kubernetes',
      'Terraform',
      'AWS (CDK, Lambda, RDS, EC2)',
      'GitHub Actions',
      'Proxmox',
    ],
    Data: ['PostgreSQL', 'PostGIS', 'Redis', 'Kafka', 'BullMQ', 'Pandas', 'H3'],
    Specialized: [
      'AEC/BIM Development (Revit API, Rhino SDK, Hypar Elements)',
      'Geospatial (QGIS, Deck.gl)',
    ],
  },
  education: {
    institution: 'Carnegie Mellon University',
    degree: 'School of Architecture',
    location: 'Pittsburgh, PA',
    period: '2008 – 2011',
  },
}
```

- [ ] **Step 2: Run check**

```bash
pnpm run check
```

Expected: exits 0.

---

## Task 3: Create data/projects.ts

**Files:**

- Create: `src/data/projects.ts`

- [ ] **Step 1: Create the file**

```typescript
// src/data/projects.ts

export interface Project {
  slug: string
  title: string
  description: string
  image: string
  role: string
  company: string
  period: string
  problem: string
  contributions: string[]
  stack: string[]
}

export const projects: Project[] = [
  {
    slug: 'builderful',
    title: 'Builderful',
    description:
      'Construction materials e-commerce platform — search, vendor quotes, order management, and payments.',
    image: '/projects/builderful.png',
    role: 'Lead Backend Engineer',
    company: 'Qwerky Inc',
    period: '2020 – 2024',
    problem:
      'A legacy PHP monolith ran on a single-point-of-failure VPS with no backups or automated recovery. The codebase had no mobile API and a heavily denormalized database that made schema changes risky.',
    contributions: [
      'Reverse-engineered the legacy PHP REST API and rewrote it as a TypeScript/Node.js GraphQL backend (Apollo Server, Prisma ORM), preserving API contracts while coordinating schema design with frontend and mobile teams.',
      'Cleaned and normalized a denormalized database using custom Python scripts before migration.',
      'Migrated the monolith from a single VPS to a containerized AWS deployment with managed RDS — gaining automated backups, point-in-time recovery, and infrastructure-as-code reproducibility.',
      'Built the quote-to-order pipeline: vendor quoting, order management, payment processing, and fulfillment workflows with admin tooling.',
      'Designed the search UI and built search APIs serving both web (Next.js) and mobile (React Native) clients.',
      'Developed serverless post-order and post-quote workloads on AWS Lambda (TypeScript).',
      'Co-authored the technical proposal that secured a South Korean government innovation grant for v2.',
    ],
    stack: [
      'TypeScript',
      'Node.js',
      'GraphQL',
      'Apollo Server',
      'Prisma',
      'PostgreSQL',
      'AWS Lambda',
      'AWS RDS',
      'Docker',
    ],
  },
  {
    slug: 'deepform',
    title: 'Deepform',
    description:
      'Browser-based 3D model analysis engine for architects — classifies geometry and produces floor area breakdowns.',
    image: '/projects/deepform.png',
    role: 'Sole Developer',
    company: 'Qwerky Inc',
    period: '2020 – 2024',
    problem:
      'Architectural feasibility analysis required manually reading Rhino 3D models, a process that was slow, Windows-only, and impossible to run in a web browser or cloud environment.',
    contributions: [
      'Built DeepformCore, a .NET Core analysis engine that reads Rhino 3dm files via an AWS Lambda function on Linux — a significant departure from the Windows-only norm in AEC software.',
      'Classified arbitrary 3D geometry into architectural components (floors, programs, levels) and produced floor area breakdowns by program and floor for feasibility dashboards.',
      'Adopted Hypar Elements, an open-source cross-platform BIM library, for JSON-serializable geometry processing to support future file format expansion.',
      'Built the main application backend in NestJS/TypeScript with TypeORM, Redis, and BullMQ for background job processing.',
    ],
    stack: [
      '.NET Core',
      'C#',
      'AWS Lambda',
      'NestJS',
      'TypeScript',
      'TypeORM',
      'Redis',
      'BullMQ',
      'Hypar Elements',
    ],
  },
  {
    slug: 'markurz',
    title: 'Markurz',
    description:
      'Productivity browser extension — clip highlighted web content directly into Notion, Jira, Trello, or Microsoft To Do.',
    image: '/projects/markurz.png',
    role: 'Backend Engineer',
    company: 'Qwerky Inc',
    period: '2020 – 2024',
    problem:
      'Knowledge workers lost time context-switching between research and task management tools. There was no way to create a task from web content without copying, switching apps, and pasting manually.',
    contributions: [
      'Built backend integrations for Notion, Jira, Trello, and Microsoft To Do, enabling one-click task creation from highlighted web content.',
      'Designed the GraphQL API connecting the browser extension to third-party task management services.',
      'Built the backend with NestJS, TypeORM, and BullMQ, deployed on Azure.',
    ],
    stack: [
      'NestJS',
      'TypeScript',
      'GraphQL',
      'TypeORM',
      'BullMQ',
      'Azure',
      'Notion API',
      'Jira API',
    ],
  },
  {
    slug: 'construckit',
    title: 'Construckit',
    description:
      'Construction project management SaaS — approval workflows and document sharing for construction teams.',
    image: '/projects/construckit.png',
    role: 'Backend Engineer',
    company: 'Qwerky Inc',
    period: '2020 – 2024',
    problem:
      'Construction teams managed approvals and document handoffs over email, leading to version confusion, missed sign-offs, and project delays.',
    contributions: [
      'Developed the NestJS/TypeScript REST backend with TypeORM and BullMQ for a collaboration platform focused on approval workflows and document sharing.',
      'Designed the data model for multi-party approval chains with audit trails.',
      'Deployed the service on Azure with background job processing via BullMQ.',
    ],
    stack: [
      'NestJS',
      'TypeScript',
      'REST',
      'TypeORM',
      'BullMQ',
      'PostgreSQL',
      'Azure',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const index = projects.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}
```

- [ ] **Step 2: Run check**

```bash
pnpm run check
```

Expected: exits 0.

---

## Task 4: Write and run data tests

**Files:**

- Create: `src/tests/data.test.ts`

- [ ] **Step 1: Write the tests**

```typescript
// src/tests/data.test.ts
import { describe, it, expect } from 'vitest'
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
} from '../data/projects'
import { cv } from '../data/cv'

describe('projects data', () => {
  it('has 4 projects', () => {
    expect(projects).toHaveLength(4)
  })

  it('all projects have unique slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all projects have required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.image).toMatch(/^\/projects\//)
      expect(p.role).toBeTruthy()
      expect(p.company).toBeTruthy()
      expect(p.period).toBeTruthy()
      expect(p.problem).toBeTruthy()
      expect(p.contributions.length).toBeGreaterThan(0)
      expect(p.stack.length).toBeGreaterThan(0)
    }
  })
})

describe('getProjectBySlug', () => {
  it('returns the correct project for a known slug', () => {
    const project = getProjectBySlug('builderful')
    expect(project?.title).toBe('Builderful')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('nonexistent')).toBeUndefined()
  })
})

describe('getAdjacentProjects', () => {
  it('first project has no prev', () => {
    const { prev } = getAdjacentProjects(projects[0].slug)
    expect(prev).toBeNull()
  })

  it('last project has no next', () => {
    const { next } = getAdjacentProjects(projects[projects.length - 1].slug)
    expect(next).toBeNull()
  })

  it('middle project has both prev and next', () => {
    const { prev, next } = getAdjacentProjects(projects[1].slug)
    expect(prev).not.toBeNull()
    expect(next).not.toBeNull()
  })
})

describe('cv data', () => {
  it('has all required top-level fields', () => {
    expect(cv.name).toBeTruthy()
    expect(cv.title).toBeTruthy()
    expect(cv.location).toBeTruthy()
    expect(cv.contact.email).toBeTruthy()
    expect(cv.contact.github).toBeTruthy()
    expect(cv.contact.linkedin).toBeTruthy()
    expect(cv.summary).toBeTruthy()
  })

  it('has 3 experience entries in reverse-chronological order', () => {
    expect(cv.experience).toHaveLength(3)
    expect(cv.experience[0].company).toBe('Career Break & Relocation')
    expect(cv.experience[1].company).toBe('Qwerky Inc')
    expect(cv.experience[2].company).toBe('Insigong')
  })

  it('skills object has at least 4 categories', () => {
    expect(Object.keys(cv.skills).length).toBeGreaterThanOrEqual(4)
  })
})
```

- [ ] **Step 2: Run the tests**

```bash
pnpm test
```

Expected: all tests pass. If any fail, fix the data in `src/data/projects.ts` or `src/data/cv.ts` to match.

---

## Task 5: Update \_\_root.tsx

**Files:**

- Modify: `src/routes/__root.tsx`

- [ ] **Step 1: Update the file**

Replace the existing `__root.tsx` with:

```typescript
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Link } from '@tanstack/react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'

import appCss from '../styles.css?url'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

function NotFound() {
  return (
    <main className="page-wrap flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="island-kicker mb-3">404</p>
      <h1 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)]">
        Page not found
      </h1>
      <p className="mb-6 text-[var(--sea-ink-soft)]">
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 text-sm font-semibold text-[var(--lagoon-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
      >
        Back to home
      </Link>
    </main>
  )
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Tchunoo Rhee Kahng — Software Engineer' },
      {
        name: 'description',
        content:
          'Senior full-stack engineer with 12+ years building production systems. Ex-CTO, CMU Architecture grad. Based in Fullerton, CA.',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
        <Header />
        {children}
        <Footer />
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> }]}
        />
        <Scripts />
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Run check**

```bash
pnpm run check
```

Expected: exits 0.

---

## Task 6: Update Header.tsx and Footer.tsx

**Files:**

- Modify: `src/components/Header.tsx`
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Replace Header.tsx**

```typescript
// src/components/Header.tsx
import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2"
          >
            <span className="h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" />
            TK
          </Link>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-2 sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Home
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: 'builderful' }}
            className="nav-link"
          >
            Projects
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Replace Footer.tsx**

```typescript
// src/components/Footer.tsx
import { cv } from '../data/cv'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer mt-20 px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="m-0 text-sm">
          &copy; {year} {cv.name}. All rights reserved.
        </p>
        <p className="island-kicker m-0">Built with TanStack Start</p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Run check**

```bash
pnpm run check
```

Expected: exits 0.

---

## Task 7: Delete about.tsx and regenerate routeTree

**Files:**

- Delete: `src/routes/about.tsx`

- [ ] **Step 1: Delete the file**

```bash
rm src/routes/about.tsx
```

- [ ] **Step 2: Regenerate the route tree**

```bash
pnpm dev
```

Wait for the dev server to start (it auto-regenerates `src/routeTree.gen.ts`). Then stop it with Ctrl+C.

- [ ] **Step 3: Verify routeTree no longer references about**

```bash
grep -c "about" src/routeTree.gen.ts
```

Expected: 0.

---

## Task 8: Create section components

**Files:**

- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/About.tsx`
- Create: `src/components/sections/Skills.tsx`
- Create: `src/components/sections/Experience.tsx`
- Create: `src/components/sections/ContactCTA.tsx`

- [ ] **Step 1: Create Hero.tsx**

```typescript
// src/components/sections/Hero.tsx
import { cv } from '../../data/cv'
import { Button } from '../ui/button'
import { Github, Linkedin, Mail, Download } from 'lucide-react'

export default function Hero() {
  return (
    <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 text-center sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(79,184,178,0.32),transparent_66%)]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(47,106,74,0.18),transparent_66%)]" />

      <p className="island-kicker mb-3">{cv.title}</p>
      <h1 className="display-title mb-3 text-4xl font-bold leading-tight tracking-tight text-[var(--sea-ink)] sm:text-5xl">
        {cv.name}
      </h1>
      <p className="mb-2 text-sm text-[var(--sea-ink-soft)]">📍 {cv.location}</p>
      <p className="mx-auto mb-8 max-w-xl text-base text-[var(--sea-ink-soft)] sm:text-lg">
        12+ years building production systems. Ex-CTO. CMU Architecture.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="outline" size="sm">
          <a href={cv.contact.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-1.5 h-4 w-4" />
            GitHub
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={cv.contact.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="mr-1.5 h-4 w-4" />
            LinkedIn
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={`mailto:${cv.contact.email}`}>
            <Mail className="mr-1.5 h-4 w-4" />
            {cv.contact.email}
          </a>
        </Button>
        <Button asChild size="sm">
          <a href="/tkahng-cv.pdf" download>
            <Download className="mr-1.5 h-4 w-4" />
            Download CV
          </a>
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create About.tsx**

```typescript
// src/components/sections/About.tsx
import { cv } from '../../data/cv'

export default function About() {
  return (
    <section className="island-shell rounded-2xl px-6 py-8 sm:px-8">
      <p className="island-kicker mb-3">About</p>
      <p className="text-base leading-relaxed text-[var(--sea-ink-soft)]">
        {cv.summary}
      </p>
    </section>
  )
}
```

- [ ] **Step 3: Create Skills.tsx**

```typescript
// src/components/sections/Skills.tsx
import { cv } from '../../data/cv'
import { Badge } from '../ui/badge'

export default function Skills() {
  return (
    <section>
      <p className="island-kicker mb-4">Skills</p>
      <h2 className="mb-6 text-2xl font-bold text-[var(--sea-ink)]">
        Tech Stack
      </h2>
      <div className="island-shell rounded-2xl px-6 py-6 sm:px-8">
        <div className="space-y-4">
          {Object.entries(cv.skills).map(([category, techs]) => (
            <div key={category}>
              <p className="island-kicker mb-2">{category}</p>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create Experience.tsx**

```typescript
// src/components/sections/Experience.tsx
import { cv } from '../../data/cv'

export default function Experience() {
  return (
    <section>
      <p className="island-kicker mb-4">Career</p>
      <h2 className="mb-6 text-2xl font-bold text-[var(--sea-ink)]">
        Experience
      </h2>
      <div className="island-shell rounded-2xl px-6 py-6 sm:px-8">
        <ol className="relative border-l border-[var(--line)]">
          {cv.experience.map((entry) => (
            <li key={entry.company} className="mb-8 ml-6 last:mb-0">
              <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full border border-[var(--lagoon)] bg-[var(--foam)]">
                <span className="h-2 w-2 rounded-full bg-[var(--lagoon)]" />
              </span>
              <p className="island-kicker mb-0.5">{entry.period}</p>
              <h3 className="text-base font-semibold text-[var(--sea-ink)]">
                {entry.role}
              </h3>
              <p className="mb-1 text-sm font-medium text-[var(--lagoon-deep)]">
                {entry.company} · {entry.location}
              </p>
              <p className="text-sm text-[var(--sea-ink-soft)]">
                {entry.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create ContactCTA.tsx**

```typescript
// src/components/sections/ContactCTA.tsx
import { cv } from '../../data/cv'
import { Button } from '../ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="island-shell rounded-2xl px-6 py-10 text-center sm:px-10">
      <p className="island-kicker mb-3">Contact</p>
      <h2 className="display-title mb-4 text-3xl font-bold text-[var(--sea-ink)]">
        Get in touch
      </h2>
      <p className="mx-auto mb-8 max-w-md text-[var(--sea-ink-soft)]">
        Open to senior engineering roles and interesting problems.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <a href={`mailto:${cv.contact.email}`}>
            <Mail className="mr-1.5 h-4 w-4" />
            {cv.contact.email}
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={cv.contact.github} target="_blank" rel="noopener noreferrer">
            <Github className="mr-1.5 h-4 w-4" />
            GitHub
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={cv.contact.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="mr-1.5 h-4 w-4" />
            LinkedIn
          </a>
        </Button>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Run check**

```bash
pnpm run check
```

Expected: exits 0.

---

## Task 9: Create ProjectCard and ProjectsGrid

**Files:**

- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/sections/ProjectsGrid.tsx`

- [ ] **Step 1: Create ProjectCard.tsx**

```typescript
// src/components/ProjectCard.tsx
import { Link } from '@tanstack/react-router'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to="/projects/$slug" params={{ slug: project.slug }} className="no-underline">
      <Card className="feature-card h-full overflow-hidden border-[var(--line)] bg-transparent transition-transform hover:-translate-y-1">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-5">
          <h3 className="mb-1 text-base font-semibold text-[var(--sea-ink)]">
            {project.title}
          </h3>
          <p className="mb-3 text-sm leading-relaxed text-[var(--sea-ink-soft)]">
            {project.description}
          </p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-xs font-semibold text-[var(--lagoon-deep)]">
            View project →
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
```

- [ ] **Step 2: Create ProjectsGrid.tsx**

```typescript
// src/components/sections/ProjectsGrid.tsx
import { projects } from '../../data/projects'
import ProjectCard from '../ProjectCard'

export default function ProjectsGrid() {
  return (
    <section>
      <p className="island-kicker mb-4">Work</p>
      <h2 className="mb-6 text-2xl font-bold text-[var(--sea-ink)]">Projects</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Run check**

```bash
pnpm run check
```

Expected: exits 0.

---

## Task 10: Rewrite index.tsx

**Files:**

- Modify: `src/routes/index.tsx`

- [ ] **Step 1: Rewrite the file**

```typescript
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import ProjectsGrid from '../components/sections/ProjectsGrid'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import ContactCTA from '../components/sections/ContactCTA'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <main className="page-wrap space-y-8 px-4 pb-8 pt-14">
      <Hero />
      <About />
      <ProjectsGrid />
      <Skills />
      <Experience />
      <ContactCTA />
    </main>
  )
}
```

- [ ] **Step 2: Run check**

```bash
pnpm run check
```

Expected: exits 0.

- [ ] **Step 3: Verify in browser**

```bash
pnpm dev
```

Open http://localhost:3000. Verify:

- Hero shows name, title, links
- About shows summary
- Projects grid shows 4 cards in 2 columns
- Skills shows badge groups
- Experience shows 3 timeline entries
- Contact shows email + social buttons

Stop server with Ctrl+C.

---

## Task 11: Create project detail page

**Files:**

- Create: `src/routes/projects/$slug.tsx`

- [ ] **Step 1: Create the route file**

First create the directory:

```bash
mkdir -p src/routes/projects
```

Then create the file:

```typescript
// src/routes/projects/$slug.tsx
import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { Badge } from '../../components/ui/badge'
import { Separator } from '../../components/ui/separator'
import { getProjectBySlug, getAdjacentProjects } from '../../data/projects'

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug)
    if (!project) throw notFound()
    return project
  },
  component: ProjectDetail,
})

function ProjectDetail() {
  const project = Route.useLoaderData()
  const { prev, next } = getAdjacentProjects(project.slug)

  return (
    <main className="page-wrap px-4 pb-16 pt-10">
      <Link
        to="/"
        className="mb-8 inline-block text-sm font-medium text-[var(--lagoon-deep)] no-underline hover:underline"
      >
        ← All projects
      </Link>

      <header className="mb-8">
        <h1 className="display-title mb-2 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-[var(--sea-ink-soft)]">
          {project.company} · {project.period}
        </p>
      </header>

      <div className="island-shell mb-8 overflow-hidden rounded-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="aspect-video w-full object-cover"
        />
      </div>

      <div className="island-shell mb-8 grid grid-cols-2 gap-4 rounded-2xl px-6 py-5 sm:px-8">
        <div>
          <p className="island-kicker mb-1">My Role</p>
          <p className="font-medium text-[var(--sea-ink)]">{project.role}</p>
        </div>
        <Separator orientation="vertical" className="hidden sm:block" />
        <div>
          <p className="island-kicker mb-1">Company & Period</p>
          <p className="font-medium text-[var(--sea-ink)]">
            {project.company} · {project.period}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <p className="island-kicker mb-2">The Problem</p>
          <p className="text-[var(--sea-ink-soft)] leading-relaxed">
            {project.problem}
          </p>
        </section>

        <section>
          <p className="island-kicker mb-3">What I Built</p>
          <ul className="space-y-2">
            {project.contributions.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 text-[var(--sea-ink-soft)] leading-relaxed"
              >
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--lagoon)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <p className="island-kicker mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </section>
      </div>

      <Separator className="my-10" />

      <nav className="flex justify-between gap-4">
        <div>
          {prev && (
            <Link
              to="/projects/$slug"
              params={{ slug: prev.slug }}
              className="group flex flex-col text-sm no-underline"
            >
              <span className="island-kicker">Previous</span>
              <span className="font-semibold text-[var(--sea-ink)] group-hover:text-[var(--lagoon-deep)]">
                ← {prev.title}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link
              to="/projects/$slug"
              params={{ slug: next.slug }}
              className="group flex flex-col text-sm no-underline"
            >
              <span className="island-kicker">Next</span>
              <span className="font-semibold text-[var(--sea-ink)] group-hover:text-[var(--lagoon-deep)]">
                {next.title} →
              </span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  )
}
```

- [ ] **Step 2: Run check**

```bash
pnpm run check
```

Expected: exits 0.

- [ ] **Step 3: Verify in browser**

```bash
pnpm dev
```

Open http://localhost:3000/projects/builderful. Verify:

- Back link, title, company/period header
- Full-width project image
- Role + company meta row
- Problem paragraph, contributions list, tech stack badges
- Prev/Next nav (Builderful should have no Prev, Next should show Deepform)

Open http://localhost:3000/projects/nonexistent — should show the 404 "Page not found" component.

Stop with Ctrl+C.

- [ ] **Step 4: Run all tests one final time**

```bash
pnpm test
```

Expected: all tests pass.

- [ ] **Step 5: Final check**

```bash
pnpm run check
```

Expected: exits 0. All done.
