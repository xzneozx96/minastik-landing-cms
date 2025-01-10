import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'
import PageClient from './page.client'
import { Media } from '@/components/Media'
import Image from 'next/image'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <Fragment>
      <div className="relative flex items-center">
        <div className="container max-w-3xl mx-auto pt-10 z-10 relative md:text-center">
          <h2 className="text-2xl md:text-6xl font-bold">Technology News</h2>
          <p className="mt-5 text-blue-100 text-lg">
            Discover the power of AI-driven insights with our blog
            <br />
            where every post is crafted by advanced AI to bring you the latest in technology
          </p>
        </div>

        <div className="min-h-[500px] md:min-h-[640px] select-none">
          <picture>
            <Image
              src="/images/hero-spotlight.jpg"
              alt="blogs-banner"
              width={1920}
              height={1080}
              className="object-cover absolute w-full h-full top-0 left-0"
            />
          </picture>

          {/* add a little overlay at the bottom of the banner */}
          {/* <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" /> */}
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </Fragment>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
