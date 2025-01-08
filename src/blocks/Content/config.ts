import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: '1/3',
        value: 'oneThird',
      },
      {
        label: '2/5',
        value: 'twoFifth',
      },
      {
        label: '1/2',
        value: 'half',
      },
      {
        label: '3/5',
        value: 'threeFifth',
      },
      {
        label: '2/3',
        value: 'twoThirds',
      },
      {
        label: '100%',
        value: 'full',
      },
    ],
  },
  {
    name: 'featureCategory',
    type: 'text',
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  {
    name: 'blockHeading',
    type: 'checkbox',
  },
  {
    name: 'headingDecorator',
    type: 'checkbox',
  },
  {
    name: 'reverseOrder',
    type: 'checkbox',
  },
  {
    name: 'blockMedia',
    type: 'upload',
    relationTo: 'media',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
