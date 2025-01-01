'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { AnimatedShinyTextWithBorder } from '@/ui/animated-shiny-text'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div>
      <div
        className="relative -mt-[10.4rem] flex items-center justify-center text-white"
        data-theme="dark"
      >
        {/* hero content */}
        <div className="container mb-8 z-10 relative flex items-center justify-center">
          <div className="text-center gradient-heading">
            <AnimatedShinyTextWithBorder text="✨ Grow with Minastik" />

            {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex justify-center gap-4 mt-10">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink key={i} size="lg" {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>

        {/* background image */}
        <div className="min-h-[80vh] select-none">
          {media && typeof media === 'object' && (
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
          )}
        </div>
      </div>

      {/* hero video */}
      <div className="glass-container mx-6 md:mx-auto -mt-[10.4rem] w-fit max-w-6xl">
        <div className="absolute top-1/2 left-1/2 gradient-blur w-[85%] -translate-x-1/2 h-[85%] -translate-y-1/2 inset-0 blur-[10rem]"></div>
        <video autoPlay playsInline muted loop className="lg:rounded-lg z-10 relative">
          <source src={'videos//ai-chatbot-dribble.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
