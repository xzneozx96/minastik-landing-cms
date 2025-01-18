'use client'

import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function TableOfContents({
  headings,
}: {
  headings: { id: string; tag: string; text: string; level: number }[]
}) {
  const [activeId, setActiveId] = useState('')
  const scrollOffset = 120

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + scrollOffset + 20 // Adjust for the offset

      // Find the currently active section
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        const element = document.getElementById(heading.id)
        if (element && scrollPosition >= element.offsetTop) {
          setActiveId(heading.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any, id: string) => {
    e.preventDefault() // Prevent default anchor behavior
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - scrollOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div className="sticky top-36 border-2 border-border rounded-xl p-4">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}>
            <Link
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn('text-muted-foreground hover:text-[#60a5fa]', {
                'text-white underline': activeId === heading.id,
              })}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
