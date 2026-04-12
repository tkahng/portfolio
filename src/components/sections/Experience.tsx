// src/components/sections/Experience.tsx
import { cv } from '../../data/cv'

export default function Experience() {
  return (
    <section>
      <p className="island-kicker mb-4">Career</p>
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        Experience
      </h2>
      <div className="island-shell rounded-2xl px-6 py-6 sm:px-8">
        <ol className="relative border-l border-border">
          {cv.experience.map((entry) => (
            <li
              key={`${entry.company}-${entry.period}`}
              className="mb-8 ml-6 last:mb-0"
            >
              <span
                aria-hidden="true"
                className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full border border-border bg-muted"
              >
                <span className="h-2 w-2 rounded-full bg-foreground" />
              </span>
              <p className="island-kicker mb-0.5">{entry.period}</p>
              <h3 className="text-base font-semibold text-foreground">
                {entry.role}
              </h3>
              <p className="mb-1 text-sm font-medium text-foreground">
                {entry.company} · {entry.location}
              </p>
              <p className="text-sm text-muted-foreground">
                {entry.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
