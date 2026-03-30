// src/components/sections/ProjectsGrid.tsx
import { projects } from '../../data/projects'
import ProjectCard from '../ProjectCard'

export default function ProjectsGrid() {
  return (
    <section>
      <p className="island-kicker mb-4">Work</p>
      <h2 className="mb-6 text-2xl font-bold text-[var(--sea-ink)]">
        Projects
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
