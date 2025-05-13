import type { Project, ProjectBlock as ProjectBlockProps, ProjectCategory } from '@/payload-types'
import { HeroParallax } from '@/ui/hero-parralax'
import ProjectList from '@/ui/project-list'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const ProjectBlock: React.FC<ProjectBlockProps> = async ({
  richText,
  populateBy,
  layout,
}) => {
  const limit = layout === 'list' ? 50 : 15

  let projects: Project[] = []
  let projectCategories: ProjectCategory[] = []

  const payload = await getPayload({ config: configPromise })

  if (populateBy === 'collection') {
    const fetchedProjects = await payload.find({
      collection: 'projects',
      depth: 1,
      limit,
      sort: '-updatedAt',
    })

    projects = fetchedProjects.docs
  }

  if (layout === 'list') {
    const fetchedProjectCategories = await payload.find({
      collection: 'project-categories',
      depth: 1,
      limit,
    })

    projectCategories = fetchedProjectCategories.docs
  }

  return layout === 'parallax' ? (
    <HeroParallax richText={richText} projects={projects} />
  ) : (
    <ProjectList projectCategories={projectCategories} projects={projects} />
  )
}
