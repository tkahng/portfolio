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
  tagline: string
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
  tagline: '12+ years building production systems. Former CTO. CMU Architecture.',
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
