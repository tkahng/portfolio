// src/data/projects.ts

export interface Project {
  slug: string
  title: string
  description: string
  images: string[]
  role: string
  company: string
  period: string
  problem: string
  contributions: string[]
  stack: string[]
  url?: string
}

export const projects: Project[] = [
  {
    slug: 'playground',
    title: 'Playground',
    description:
      'My personal feature playground — multi-tenant teams, kanban project management, real-time notifications, and a full RBAC admin panel.',
    images: [
      '/projects/playground-rockpaperscissors.png',
      '/projects/playground-play.png',
      '/projects/playground-sayhello.png',
    ],
    role: 'Sole Developer',
    company: 'Personal / Sabbatical',
    period: '2025',
    problem:
      'Personal project where I can implement any feature I think is cool.',
    contributions: [
      'Built a Go REST API backend with multi-provider authentication (email/password with email verification, Google OAuth2, GitHub OAuth2) inspired by Supabase GoTrue — all providers share a unified callback endpoint.',
      'Designed a flexible RBAC permission model supporting direct assignment, role-based assignment, and subscription-based role grants.',
      'Implemented multi-tenant teams: users can create or join teams and invite others via invite links.',
      'Built a kanban task board with drag-and-drop, project grouping, and real-time due-date alerts delivered over Server-Sent Events (SSE).',
      'Developed a full admin panel covering user management, role and permission CRUD, product/subscription management, and audit views.',
      'Wrote the React SPA frontend (TypeScript) consuming the Go API, with CI via GitHub Actions.',
    ],
    stack: [
      'Go',
      'PostgreSQL',
      'PLpgSQL',
      'TypeScript',
      'React',
      'SSE',
      'OAuth2',
      'Docker',
    ],
    url: 'https://playground.k2dv.io',
  },
  {
    slug: 'builderful',
    title: 'Builderful',
    description:
      'Construction materials e-commerce platform — search, vendor quotes, order management, and payments.',
    images: ['/projects/builderful.png'],
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
    url: 'https://www.instagram.com/builderful/',
  },
  {
    slug: 'deepform',
    title: 'Deepform',
    description:
      'Browser-based 3D model analysis engine for architects — classifies geometry and produces floor area breakdowns.',
    images: ['/projects/deepform.png'],
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
    url: 'https://docs.deepform.net/',
  },
  {
    slug: 'markurz',
    title: 'Markurz',
    description:
      'Productivity browser extension — clip highlighted web content directly into Notion, Jira, Trello, or Microsoft To Do.',
    images: ['/projects/markurz.png'],
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
    url: 'https://markurzblog.webflow.io/',
  },

  {
    slug: 'construckit',
    title: 'Construckit',
    description:
      'Construction project management SaaS — approval workflows and document sharing for construction teams.',
    images: ['/projects/construckit.png'],
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
  {
    slug: 'masan-ocean-city',
    title: 'Masan Ocean City',
    description: '',
    images: [
      '/projects/masan-main.jpeg',
      '/projects/masan-entry.jpg',
      '/projects/masan-model.jpg',
      '/projects/masan-site.jpeg',
      '/projects/masan-frank-gehry-autograph.png',
    ],
    role: 'Computation Design Engineer',
    company: 'Insigong',
    period: '2014-2016',
    problem:
      'Designing a new city on the coast of Masan, a coastal city in South Korea, required a complex and detailed design that involved a lot of engineering analysis and a lot of collaboration with local stakeholders.',
    contributions: [
      'Python/C# development for custom design tooling',
      'Design and 3d modeling of the "Fish Scale Music Hall"',
      'Won 1st place in the 2015 Korean Design Competition',
      'In collaboration with Gehry Partners',
    ],
    stack: [
      'Python',
      'C#',
      'Dotnet',
      'Rhino3dm',
      'Autodesk Revit',
      'Grasshopper3d',
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
  if (index === -1) {
    return { prev: null, next: null }
  }
  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}
