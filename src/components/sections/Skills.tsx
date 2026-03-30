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
