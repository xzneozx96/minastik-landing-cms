'use client'
import React from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SparklesCore } from './sparkles'
import { Media, Project } from '@/payload-types'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

export const HeroParallax = ({ projects, richText }: { projects: Project[]; richText: any }) => {
  const firstRow = projects.slice(0, 5)
  const secondRow = projects.slice(5, 10)
  const thirdRow = projects.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig)
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig,
  )
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig)
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig)
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig)
  return (
    <div
      ref={ref}
      className="lg:h-[2800px] h-[2100px] py-80 antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] will-change-transform overflow-hidden"
    >
      <Header richText={richText} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse md:space-x-20 space-x-10 md:mb-20 mb-10">
          {firstRow.map((project) => (
            <ProductCard project={project} translate={translateX} key={project.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row md:mb-20 mb-10 md:space-x-20 space-x-10">
          {secondRow.map((project) => (
            <ProductCard project={project} translate={translateXReverse} key={project.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse md:space-x-20 space-x-10">
          {thirdRow.map((project) => (
            <ProductCard project={project} translate={translateX} key={project.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Header = ({ richText }: { richText: any }) => {
  return (
    <div className="max-w-3xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0 text-center spotlight-background section-heading z-10">
      {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}

      <div className="absolute top-0 bottom-0 z-[-1] pointer-events-none select-none">
        <SparklesCore
          id="projects-sparkle"
          background="transparent"
          minSize={0.6}
          maxSize={2}
          speed={1.5}
          particleDensity={20}
          className="w-full h-full"
          particleColor="#32A7FF"
        />
      </div>

      <Button className="mt-10" variant="default" size="lg">
        <Link href="/portfolio">All Projects</Link>
      </Button>
    </div>
  )
}

export const ProductCard = ({
  project,
  translate,
}: {
  project: Project
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={project.title}
      className="group/product lg:h-96 lg:w-[30rem] h-[18rem] w-[24rem] relative flex-shrink-0 md:ml-20"
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
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={project.title}
        />
      </Link>

      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-60 bg-black pointer-events-none"></div>

      <div className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        <h2 className="text-2xl">{project.title}</h2>
        {project.description && <p>{project.description}</p>}
      </div>
    </motion.div>
  )
}
