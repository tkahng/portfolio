// src/components/sections/ContactCTA.tsx
import { cv } from '../../data/cv'
import { Button } from '../ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="island-shell rounded-2xl px-6 py-10 text-center sm:px-10">
      <p className="island-kicker mb-3">Contact</p>
      <h2 className="mb-4 text-3xl font-bold text-foreground">
        Get in touch
      </h2>
      <p className="mx-auto mb-8 max-w-md text-muted-foreground">
        Open to senior engineering roles and interesting problems.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="outline">
          <a href={`mailto:${cv.contact.email}`}>
            <Mail aria-hidden="true" className="mr-1.5 h-4 w-4" />
            {cv.contact.email}
          </a>
        </Button>
        <Button asChild variant="outline">
          <a href={cv.contact.github} target="_blank" rel="noopener noreferrer">
            <Github aria-hidden="true" className="mr-1.5 h-4 w-4" />
            GitHub
          </a>
        </Button>
        <Button asChild variant="outline">
          <a
            href={cv.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin aria-hidden="true" className="mr-1.5 h-4 w-4" />
            LinkedIn
          </a>
        </Button>
      </div>
    </section>
  )
}
