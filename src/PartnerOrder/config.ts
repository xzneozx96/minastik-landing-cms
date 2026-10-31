import type { GlobalConfig } from 'payload'

import { revalidatePartnerOrder } from './hooks/revalidatePartnerOrder'

export const PartnerOrder: GlobalConfig = {
  slug: 'partnerOrder',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Controls the order the partner logos appear in on the website. Drag the pills to reorder.',
  },
  fields: [
    {
      name: 'partners',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      admin: {
        description:
          'Partners listed here are shown in this order. A partner that is not listed is shown last, after these.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePartnerOrder],
  },
}
