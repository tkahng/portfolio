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
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="no-underline"
    >
      <Card className="feature-card h-full overflow-hidden border-[var(--line)] bg-transparent transition-transform hover:-translate-y-1">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-5">
          <h3 className="mb-1 text-base font-semibold text-foreground">
            {project.title}
          </h3>
          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-xs font-semibold text-foreground">
            View project →
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
