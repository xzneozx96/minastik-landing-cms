import type { Project, ProjectBlock as ProjectBlockProps } from '@/payload-types'
import { HeroParallax } from '@/ui/hero-parralax'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const ProjectBlock: React.FC<ProjectBlockProps> = async ({ richText, populateBy }) => {
  const limit = 15

  let projects: Project[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedProjects = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
    })

    projects = fetchedProjects.docs
  }

  return <HeroParallax richText={richText} projects={projects} />
}
