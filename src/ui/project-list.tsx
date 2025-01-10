'use client'

import { Media, Project, ProjectCategory } from '@/payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProjectList({
  projects,
  projectCategories,
}: {
  projects: Project[]
  projectCategories: ProjectCategory[]
}) {
  const [category, setCategory] = useState<number>(0)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects) // State for filtered projects

  useEffect(() => {
    const selectedCate = projectCategories[category - 1]

    if (!category) {
      // If no category is selected, show all projects
      setFilteredProjects(projects)
    } else {
      // Filter projects based on the selected category
      const filtered = projects.filter((project) =>
        project.categories?.map((cate: ProjectCategory) => cate.id).includes(selectedCate.id),
      )
      setFilteredProjects(filtered)
    }
  }, [category, projectCategories, projects]) // Add `projects` to the dependency array

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div>
        <div>
          {/* Buttons */}
          <div className="flex justify-center gap-4 pb-12 max-md:hidden md:pb-16">
            <div className="relative inline-flex flex-wrap justify-center rounded-[1.25rem] bg-gray-800/40">
              <button
                className={`flex flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${
                  category === 0
                    ? 'relative bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]'
                    : 'opacity-40 transition-opacity hover:opacity-90'
                }`}
                aria-pressed={category === 0}
                onClick={() => setCategory(0)}
              >
                <svg
                  className={`fill-current text-white`}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height={16}
                >
                  <path d="M.062 10.003a1 1 0 0 1 1.947.455c-.019.08.01.152.078.19l5.83 3.333c.052.03.115.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.854-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z" />
                </svg>
                <span>All Projects</span>
              </button>

              {projectCategories.map((projectCate, index) => {
                return (
                  <button
                    key={index}
                    className={`flex flex-1 items-center gap-2.5 whitespace-nowrap rounded-full px-3 py-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-200 ${
                      category === index + 1
                        ? 'relative bg-gradient-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]'
                        : 'opacity-40 transition-opacity hover:opacity-90'
                    }`}
                    aria-pressed={category === index + 1}
                    onClick={() => setCategory(index + 1)}
                  >
                    <svg
                      className={`fill-current text-white`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height={16}
                    >
                      <path d="M.062 10.003a1 1 0 0 1 1.947.455c-.019.08.01.152.078.19l5.83 3.333c.052.03.115.03.168 0l5.83-3.333a.163.163 0 0 0 .078-.188 1 1 0 0 1 1.947-.459 2.161 2.161 0 0 1-1.032 2.384l-5.83 3.331a2.168 2.168 0 0 1-2.154 0l-5.83-3.331a2.162 2.162 0 0 1-1.032-2.382Zm7.854-7.981-5.83 3.332a.17.17 0 0 0 0 .295l5.828 3.33c.054.031.118.031.17.002l5.83-3.333a.17.17 0 0 0 0-.294L8.085 2.023a.172.172 0 0 0-.17-.001ZM9.076.285l5.83 3.332c1.458.833 1.458 2.935 0 3.768l-5.83 3.333c-.667.38-1.485.38-2.153-.001l-5.83-3.332c-1.457-.833-1.457-2.935 0-3.767L6.925.285a2.173 2.173 0 0 1 2.15 0Z" />
                    </svg>
                    <span>{projectCate.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Cards */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export function ProjectItem({ project }: { project: Project }) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <article className="h-full">
        <div
          key={project.title}
          className="group/product lg:h-96 h-[18rem] w-full relative flex-shrink-0"
        >
          <Link
            href={project.websiteUrl}
            target="_blank"
            className="block group-hover/product:shadow-2xl "
          >
            <Image
              src={(project.preview as Media).url || ''}
              height="600"
              width="600"
              className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
              alt={project.title}
            />
          </Link>
        </div>

        <div className="text-white px-2 py-3">
          <h4 className="text-lg">{project.title}</h4>
        </div>
      </article>
    </motion.div>
  )
}
