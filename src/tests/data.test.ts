// src/tests/data.test.ts
import { describe, it, expect } from 'vitest'
import {
  projects,
  getProjectBySlug,
  getAdjacentProjects,
} from '../data/projects'
import { cv } from '../data/cv'

describe('projects data', () => {
  it('has 4 projects', () => {
    expect(projects).toHaveLength(4)
  })

  it('all projects have unique slugs', () => {
    const slugs = projects.map((p) => p.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('all projects have required fields', () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy()
      expect(p.title).toBeTruthy()
      expect(p.description).toBeTruthy()
      expect(p.images[0]).toMatch(/^\/projects\//)
      expect(p.images.length).toBeGreaterThan(0)
      expect(p.role).toBeTruthy()
      expect(p.company).toBeTruthy()
      expect(p.period).toBeTruthy()
      expect(p.problem).toBeTruthy()
      expect(p.contributions.length).toBeGreaterThan(0)
      expect(p.stack.length).toBeGreaterThan(0)
    }
  })
})

describe('getProjectBySlug', () => {
  it('returns the correct project for a known slug', () => {
    const project = getProjectBySlug('builderful')
    expect(project?.title).toBe('Builderful')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getProjectBySlug('nonexistent')).toBeUndefined()
  })
})

describe('getAdjacentProjects', () => {
  it('first project has no prev', () => {
    const { prev } = getAdjacentProjects(projects[0].slug)
    expect(prev).toBeNull()
  })

  it('last project has no next', () => {
    const { next } = getAdjacentProjects(projects[projects.length - 1].slug)
    expect(next).toBeNull()
  })

  it('middle project has both prev and next', () => {
    const { prev, next } = getAdjacentProjects(projects[1].slug)
    expect(prev).not.toBeNull()
    expect(next).not.toBeNull()
  })

  it('returns null for both when slug is unknown', () => {
    const { prev, next } = getAdjacentProjects('nonexistent')
    expect(prev).toBeNull()
    expect(next).toBeNull()
  })
})

describe('cv data', () => {
  it('has all required top-level fields', () => {
    expect(cv.name).toBeTruthy()
    expect(cv.title).toBeTruthy()
    expect(cv.location).toBeTruthy()
    expect(cv.contact.email).toBeTruthy()
    expect(cv.contact.github).toBeTruthy()
    expect(cv.contact.linkedin).toBeTruthy()
    expect(cv.summary).toBeTruthy()
  })

  it('has 3 experience entries in reverse-chronological order', () => {
    expect(cv.experience).toHaveLength(3)
    expect(cv.experience[0].company).toBe('Career Break & Relocation')
    expect(cv.experience[1].company).toBe('Qwerky Inc')
    expect(cv.experience[2].company).toBe('Insigong')
  })

  it('skills object has at least 4 categories', () => {
    expect(Object.keys(cv.skills).length).toBeGreaterThanOrEqual(4)
  })

  it('has a tagline', () => {
    expect(cv.tagline).toBeTruthy()
  })
})
