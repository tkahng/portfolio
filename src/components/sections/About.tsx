// src/components/sections/About.tsx
import { cv } from '../../data/cv'

export default function About() {
  return (
    <section className="island-shell rounded-2xl px-6 py-8 sm:px-8">
      <p className="island-kicker mb-3">About</p>
      <p className="text-base leading-relaxed text-[var(--sea-ink-soft)]">
        {cv.summary}
      </p>
    </section>
  )
}
