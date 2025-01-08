import React from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="relative flex items-center">
      <div className="max-w-3xl mx-auto z-10 relative text-center">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
      </div>

      <div className="min-h-[640px] select-none">
        {/* {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )} */}
        {media && typeof media === 'object' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={media} />
        )}

        {/* add a little overlay at the bottom of the banner */}
        {/* <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" /> */}
      </div>
    </div>
  )
}
