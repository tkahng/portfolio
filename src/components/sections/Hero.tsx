// src/components/sections/Hero.tsx
import { cv } from '../../data/cv'
import { Button } from '../ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
  return (
    <section className="island-shell rise-in relative overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-14">
      <p className="island-kicker mb-3">{cv.title}</p>
      <h1 className="mb-3 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
        {cv.name}
      </h1>
      <p className="mb-2 text-sm text-muted-foreground">{cv.location}</p>
      <p className="mx-auto mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
        {cv.tagline}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="outline" size="sm">
          <a href={cv.contact.github} target="_blank" rel="noopener noreferrer">
            <Github aria-hidden="true" className="mr-1.5 h-4 w-4" />
            GitHub
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a
            href={cv.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin aria-hidden="true" className="mr-1.5 h-4 w-4" />
            LinkedIn
          </a>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={`mailto:${cv.contact.email}`}>
            <Mail aria-hidden="true" className="mr-1.5 h-4 w-4" />
            {cv.contact.email}
          </a>
        </Button>
      </div>
    </section>
  )
}
