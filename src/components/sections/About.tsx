// src/components/sections/About.tsx
import { cv } from '../../data/cv'

export default function About() {
  return (
    <section className="island-shell rounded-2xl px-6 py-8 sm:px-8">
      <p className="island-kicker mb-2">About</p>
      <h2 className="mb-4 text-2xl font-bold text-[var(--sea-ink)]">
        Background
      </h2>
      <p className="text-base leading-relaxed text-[var(--sea-ink-soft)]">
        {cv.summary}
      </p>
    </section>
  )
}
