import React from 'react'
import type { Partner, PartnerBlock as PartnerBlockProps, PartnerOrder } from '@/payload-types'
import LogoRippleAnimation from '@/ui/logo-ripple-animation'
import { CanvasRevealEffectLogos } from '@/ui/canvase-reveal-logos'
import RichText from '@/components/RichText'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/**
 * Applies the editor-defined order from the `partnerOrder` global.
 *
 * The order is allowed to be out of sync with the partners collection: a
 * partner that was never added is shown last, and an entry pointing at a
 * deleted partner is ignored. That way the block always renders every
 * partner exactly once, whatever the editor did.
 */
export const applyPartnerOrder = (
  partners: Partner[],
  order: (string | Partner)[],
): Partner[] => {
  const byId = new Map(partners.map((partner) => [String(partner.id), partner]))
  const ordered: Partner[] = []
  const placed = new Set<string>()

  for (const entry of order) {
    const id = typeof entry === 'object' && entry !== null ? entry.id : entry

    if (!id) continue

    const key = String(id)

    if (placed.has(key)) continue

    const partner = byId.get(key)

    if (!partner) continue

    placed.add(key)
    ordered.push(partner)
  }

  const unlisted = partners.filter((partner) => !placed.has(String(partner.id)))

  return [...ordered, ...unlisted]
}

export const PartnerBlock: React.FC<PartnerBlockProps> = async ({ richText, populateBy }) => {
  const limit = 50

  let partners: Partner[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const [fetchedPartners, partnerOrder] = await Promise.all([
      payload.find({
        collection: 'partners',
        depth: 1,
        limit,
      }),
      payload.findGlobal({
        slug: 'partnerOrder',
        depth: 1,
      }),
    ])

    partners = applyPartnerOrder(
      fetchedPartners.docs,
      ((partnerOrder as PartnerOrder)?.partners as (string | Partner)[]) ?? [],
    )
  }

  return (
    <div className="container relative overflow-hidden">
      <LogoRippleAnimation />

      <div className="pt-80">
        <div className="relative section-heading">
          {richText && <RichText data={richText} enableGutter={false} />}
        </div>

        <div className="relative mx-auto max-w-6xl sm:px-6 py- sm:py-20">
          <CanvasRevealEffectLogos partners={partners} />
        </div>
      </div>
    </div>
  )
}
