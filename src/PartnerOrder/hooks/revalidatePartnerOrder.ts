import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidatePartnerOrder: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating partner order`)

    revalidateTag('global_partnerOrder')

    // The partner block can sit on any page, and pages are statically
    // generated, so the whole site has to be re-rendered for a reorder to show.
    revalidatePath('/', 'layout')
  }

  return doc
}
