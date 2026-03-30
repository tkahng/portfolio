// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import ProjectsGrid from '../components/sections/ProjectsGrid'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import ContactCTA from '../components/sections/ContactCTA'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <main className="page-wrap space-y-8 px-4 pb-8 pt-14">
      <Hero />
      <About />
      <ProjectsGrid />
      <Skills />
      <Experience />
      <ContactCTA />
    </main>
  )
}
