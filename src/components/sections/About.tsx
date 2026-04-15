// src/components/sections/About.tsx
import { cv } from '../../data/cv'

export default function About() {
  return (
    <section className="island-shell px-6 py-8 sm:px-8">
      <h2 className="mb-4 text-2xl font-bold text-foreground">Background</h2>
      <p className="text-base leading-relaxed text-muted-foreground">
        {cv.summary}
      </p>
    </section>
  )
}
