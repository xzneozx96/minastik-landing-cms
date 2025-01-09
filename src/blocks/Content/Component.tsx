import RichText from '@/components/RichText'
import React from 'react'
import { cn } from 'src/utilities/cn'

import type { ContentBlock as ContentBlockProps, Media } from '@/payload-types'

import { BorderBeam } from '@/ui/border-beam'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  // const colsSpanClasses = {
  //   full: '12',
  //   half: '6',
  //   oneThird: '4',
  //   twoThirds: '8',
  // }

  const colsSpanClasses = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
    twoFifth: 'lg:col-span-5',
    threeFifth: 'lg:col-span-7',
  }

  return (
    <div className="container mt-16 md:mt-32 relative">
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-8">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {
              blockHeading,
              headingDecorator,
              blockMedia,
              reverseOrder,
              featureCategory,
              richText,
              size,
            } = col

            return (
              <div
                className={cn(
                  `col-span-4 ${colsSpanClasses[size!]}`,
                  {
                    'md:col-span-2': size !== 'full',
                  },
                  { 'section-heading': blockHeading },
                )}
                key={index}
              >
                {blockHeading && richText && <RichText data={richText} enableGutter={false} />}

                {headingDecorator && (
                  <div className="cool-animation hidden md:block mix-blend-luminosity">
                    <video autoPlay muted loop>
                      <source src="videos//cool-animation.webm" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {!blockHeading && (
                  <div className="group/card relative h-full overflow-hidden rounded-2xl p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/20 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20 before:group-hover:opacity-100">
                    <div className="relative z-20 h-full overflow-hidden rounded-[inherit] after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50 glassy-card">
                      <BorderBeam />

                      {/* Content */}
                      <div className={cn('relative z-10', { 'order-1': reverseOrder })}>
                        {featureCategory && (
                          <div className="mb-5">
                            <span className="btn-sm relative title-badge rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,theme(colors.gray.700/.15),theme(colors.gray.700/.5))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                              <span className="bg-gradient-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                                {featureCategory}
                              </span>
                            </span>
                          </div>
                        )}

                        {richText && <RichText data={richText} enableGutter={false} />}
                      </div>

                      <div className={cn('z-10 flex-1', reverseOrder ? 'pb-6' : 'pt-6')}>
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="rounded-lg md:h-full w-full object-cover"
                        >
                          {blockMedia && (
                            <source src={(blockMedia as Media).url || ''} type="video/mp4" />
                          )}
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
