'use client'
import React from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { CanvasRevealEffect } from '@/ui/canvas-reveal-effect'
import Image from 'next/image'
import { Media, Partner } from '@/payload-types'

export type Props = {
  partners: Partner[]
}

export const CanvasRevealEffectLogos: React.FC<Props> = (props) => {
  const logos = props.partners

  const quarterLength = logos.length / 4

  const rows = [
    logos.slice(0, quarterLength),
    logos.slice(quarterLength, quarterLength * 2),
    logos.slice(quarterLength * 2, quarterLength * 3),
    logos.slice(quarterLength * 3),
  ]

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-4">
        {rows.flat().map((logo, index) => (
          <Card logo={logo} key={index}>
            <CanvasRevealEffect
              animationSpeed={3}
              containerClassName="bg-black"
              colors={[[59, 130, 246]]}
              dotSize={3}
            />
            {/* Radial gradient for the cute fade */}
            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-[#0B0C14]/50 dark:bg-[#0B0C14]/90" />
          </Card>
        ))}
      </div>
    </>
  )
}

const Card = ({ logo, children }: { logo: Partner; children?: React.ReactNode }) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto relative rounded-lg p-6 h-[200px]"
      style={{
        background: 'hsla(0,0%,100%,.03)',
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0 rounded-lg"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 text-center h-full">
        <div className="group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full h-full mx-auto flex items-center justify-center">
          {/* {icon} */}
          <Image
            src={(logo.logo as Media)?.thumbnailURL || ''}
            alt={logo.title}
            width={100}
            height={60}
            className="relative h-[150px] w-[120px] object-contain mix-blend-normal"
            style={{
              filter: 'contrast(0%) brightness(2)',
            }}
          />
        </div>
        <h2 className="dark:text-white text-lg opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-20 transition duration-200">
          {logo.title}
        </h2>
      </div>
    </div>
  )
}
