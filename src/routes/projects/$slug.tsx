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
        className="mb-8 inline-block text-sm font-medium text-foreground no-underline hover:underline"
      >
        ← All projects
      </Link>

      <header className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground">
          {project.company} · {project.period}
        </p>
      </header>

      <div className="island-shell mb-8 overflow-hidden rounded-2xl">
        <a href={project.images[0]} target="_blank" rel="noopener noreferrer">
          <img
            src={project.images[0]}
            alt={project.title}
            className="aspect-video w-full cursor-pointer object-cover"
          />
        </a>
      </div>

      {project.images.length > 1 && (
        <div className="mb-8 grid grid-cols-2 gap-4">
          {project.images.slice(1).map((src, i) => (
            <div key={i} className="island-shell overflow-hidden rounded-2xl">
              <a href={src} target="_blank" rel="noopener noreferrer">
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 2}`}
                  className="aspect-video w-full cursor-pointer object-cover"
                />
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="island-shell mb-8 flex flex-col divide-y divide-[var(--line)] rounded-2xl px-6 py-5 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-8">
        <div className="pb-4 sm:pb-0 sm:pr-6">
          <p className="island-kicker mb-1">My Role</p>
          <p className="font-medium text-foreground">{project.role}</p>
        </div>
        <div className="pt-4 sm:pl-6 sm:pt-0">
          <p className="island-kicker mb-1">Company & Period</p>
          <p className="font-medium text-foreground">
            {project.company} · {project.period}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {project.url && (
          <section>
            <p className="island-kicker mb-3">Links</p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
            >
              View project →
            </a>
          </section>
        )}

        <section>
          <p className="island-kicker mb-2">The Problem</p>
          <p className="leading-relaxed text-muted-foreground">
            {project.problem}
          </p>
        </section>

        <section>
          <p className="island-kicker mb-3">What I Built</p>
          <ul className="space-y-2">
            {project.contributions.map((item, i) => (
              <li
                key={i}
                className="flex gap-3 leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground"
                />
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
              <span className="font-semibold text-foreground group-hover:text-muted-foreground">
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
              <span className="font-semibold text-foreground group-hover:text-muted-foreground">
                {next.title} →
              </span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  )
}
