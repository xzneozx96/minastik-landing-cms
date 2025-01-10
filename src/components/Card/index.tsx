'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import Image from 'next/image'
import { formatDateTime } from '@/utilities/formatDateTime'
import { formatAuthors } from '@/utilities/formatAuthors'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'populatedAuthors' | 'publishedAt'
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, populatedAuthors, publishedAt } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const titleToUse = titleFromProps || title

  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space

  const href = `/${relationTo}/${slug}`

  return (
    <article className={cn('hover:cursor-pointer', className)} ref={card.ref}>
      <div className="group/card relative h-full overflow-hidden rounded-2xl p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/20 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100">
        <div className="relative z-20 h-full overflow-hidden rounded-[inherit] after:absolute text-white glassy-card p-0">
          {/* Thumbnail */}
          <div className="relative w-full">
            {!metaImage && <div className="">No image</div>}
            {metaImage && typeof metaImage !== 'string' && <Media resource={metaImage} />}
          </div>

          {/* Content */}
          <div className="p-6">
            {showCategories && hasCategories && (
              <div className="text-sm mb-4">
                {showCategories && hasCategories && (
                  <div>
                    {categories?.map((category, index) => {
                      if (typeof category === 'object') {
                        const { title: titleFromCategory } = category

                        const categoryTitle = titleFromCategory || 'Untitled category'

                        return (
                          <div
                            className="hidden mb-2 text-sm font-semibold md:block text-w-blue"
                            key={index}
                          >
                            <span className="title-badge btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                              <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                                {categoryTitle}
                              </span>
                            </span>
                          </div>
                        )
                      }

                      return null
                    })}
                  </div>
                )}
              </div>
            )}

            {titleToUse && (
              <div className="prose">
                <h3 className="line-clamp-2">
                  <Link className="not-prose" href={href} ref={link.ref}>
                    {titleToUse}
                  </Link>
                </h3>
              </div>
            )}

            {description && (
              <div className="mt-2">
                {description && (
                  <p className="text-blue-100 line-clamp-3">{sanitizedDescription}</p>
                )}
              </div>
            )}

            <div className="flex items-center gap-3 mt-10">
              <Image
                className="inline-flex shrink-0 rounded-full"
                src="/images/testimonial-07.jpg"
                width={36}
                height={36}
                alt={titleToUse || 'Post'}
              />
              <div className="text-sm flex flex-col font-medium text-gray-200">
                {hasAuthors && <span>{formatAuthors(populatedAuthors)}</span>}

                {!hasAuthors && <span>Admin</span>}

                {publishedAt && (
                  <time className="text-indigo-200/70" dateTime={publishedAt}>
                    {formatDateTime(publishedAt)}
                  </time>
                )}
              </div>

              <div className="text-sm ml-auto text-indigo-200/70 flex items-center">
                <span className="mx-2 text-gray-300">•</span>
                <span>5 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
