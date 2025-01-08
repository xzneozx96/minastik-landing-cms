'use client'

import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  const openVoiceFlow = () => {
    ;(window as any).voiceflow.chat.open()
  }

  return (
    <div className="container">
      <div className="relative mt-32 isolate px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 md:pb-0 lg:flex lg:gap-x-10 lg:px-24 lg:pt-0 rounded-2xl">
        <div className="mx-auto max-w-lg text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left z-10">
          <div className="max-w-[48rem] flex items-center">
            {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <Button onClick={openVoiceFlow} variant="default" size="lg" id="trigger-ai-agent">
              Talk with Zober
            </Button>
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>

        {/* blur background */}
        <div className="absolute top-1/2 left-1/2 gradient-blur w-[85%] -translate-x-1/2 h-[85%] -translate-y-1/2 inset-0 blur-[3rem] -z-10"></div>

        {/* Always visible video */}
        <div className="absolute top-0 left-0 right-0 bottom-0 md:z-0 z-[-1]">
          <video
            src="/videos/glass-animation.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="md:object-cover h-full w-full object-cover rounded-lg lg:rounded-2xl"
          ></video>
        </div>

        {/* ai-chatbot.mp4 - hidden on mobile */}
        <div className="absolute h-full w-full right-0 hidden lg:block">
          <video
            src="/videos/ai-chatbot.mp4"
            autoPlay
            muted
            playsInline
            className="h-full w-full mix-blend-screen"
          ></video>
        </div>
      </div>
    </div>
  )
}
