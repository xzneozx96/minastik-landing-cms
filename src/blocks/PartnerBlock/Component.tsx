import React from 'react'
import type { Partner, PartnerBlock as PartnerBlockProps } from '@/payload-types'
import LogoRippleAnimation from '@/ui/logo-ripple-animation'
import { CanvasRevealEffectLogos } from '@/ui/canvase-reveal-logos'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const PartnerBlock: React.FC<PartnerBlockProps> = async ({ richText, populateBy }) => {
  const limit = 50

  let partners: Partner[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedPartners = await payload.find({
      collection: 'partners',
      depth: 1,
      limit,
    })

    partners = fetchedPartners.docs
  }

  return (
    <div className="container relative">
      <LogoRippleAnimation />

      <div className="pt-80">
        <div className="relative section-heading">
          {richText && <RichText data={richText} enableGutter={false} />}
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <CanvasRevealEffectLogos partners={partners} />
        </div>
      </div>
    </div>
  )
}
