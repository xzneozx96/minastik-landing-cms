import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import React, { cache } from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { TableOfContents } from '@/components/TableOfContent'
import { PostHero } from '@/heros/PostHero'
import { ScrollProgress } from '@/ui/scroll-progress'
import { generateIdForRichTextHeading } from '@/utilities/generateIdForRichTextHeading'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { formatAuthors } from '@/utilities/formatAuthors'
import { formatDateTime } from '@/utilities/formatDateTime'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractHeadings(nodes: { children: any[]; type: string; tag?: string }) {
  const headings: { id: string; tag: string; text: string; level: number }[] = []

  nodes.children.forEach((node) => {
    if (node.type === 'heading') {
      headings.push({
        id: generateIdForRichTextHeading(node.children[0].text || ''),
        tag: node.tag,
        level: parseInt(node.tag.replace('h', ''), 10), // Extract heading level (1, 2, 3, etc.). Used to create indent space accordingly
        text: node.children[0].text,
      })
    }
  })

  return headings
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  const { categories, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const headings = extractHeadings(post.content.root)

  return (
    <article className="pb-16">
      <ScrollProgress className="top-[70px] lg:top-[100px]" />

      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* hero banner */}
      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container flex flex-col lg:grid lg:grid-cols-12 gap-8 pt-10">
          {/* table of contents */}
          <aside className="lg:col-span-4 order-1">
            <TableOfContents headings={headings} />
          </aside>

          {/* main content */}
          <div className="lg:col-span-8 lg:max-w-[46rem] pb-12 xl:pl-11 xl:pr-16 order-2">
            {/* post title & metadata */}
            <div className="pb-10">
              <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
                <div className="uppercase text-sm mb-6">
                  {categories?.map((category, index) => {
                    if (typeof category === 'object' && category !== null) {
                      const { title: categoryTitle } = category

                      const titleToUse = categoryTitle || 'Untitled category'

                      const isLast = index === categories.length - 1

                      return (
                        <React.Fragment key={index}>
                          {titleToUse}
                          {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                        </React.Fragment>
                      )
                    }
                    return null
                  })}
                </div>

                <div className="">
                  <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                  {hasAuthors && (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm">Author</p>

                        <p>{formatAuthors(populatedAuthors)}</p>
                      </div>
                    </div>
                  )}
                  {publishedAt && (
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">Date Published</p>

                      <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* post content */}
            <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          </div>
        </div>

        {/* related posts */}
        <div className="container">
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-20 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
