import type { GlobalConfig } from 'payload'

import { revalidatePartnerOrder } from './hooks/revalidatePartnerOrder'

export const PartnerOrder: GlobalConfig = {
  slug: 'partnerOrder',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Controls the order the partner logos appear in on the website. Drag the rows to reorder.',
  },
  fields: [
    {
      name: 'order',
      type: 'array',
      admin: {
        initCollapsed: false,
        description:
          'Partners listed here are shown in this order. A partner that is not listed is shown last, after these.',
      },
      fields: [
        {
          name: 'partner',
          type: 'relationship',
          relationTo: 'partners',
          required: true,
          admin: {
            width: '100%',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePartnerOrder],
  },
}
