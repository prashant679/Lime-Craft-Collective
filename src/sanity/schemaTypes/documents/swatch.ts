import { defineType, defineField, defineArrayMember } from 'sanity'

export const swatch = defineType({
  name: 'swatch',
  title: 'Texture Swatch',
  type: 'document',
  description:
    'One texture sample shown in the swatch picker, e.g. Smooth, Semi-Rough, Rough, or a Limewash finish like Liquid Metal.',
  fields: [
    defineField({
      name: 'name',
      title: 'Swatch Name',
      type: 'string',
      description: 'The name visitors will see on the swatch tile, e.g. Lime Silk',
      validation: (rule) => rule.required().error('Give this swatch a name'),
    }),
    defineField({
      name: 'image',
      title: 'Texture Photo',
      type: 'image',
      description: 'A close-up photo of this texture, ideally square or near-square.',
      options: { hotspot: true },
      validation: (rule) => rule.required().error('Add a photo of the texture'),
    }),
    defineField({
      name: 'textureCategory',
      title: 'Texture Category',
      type: 'string',
      description:
        'How would you describe this texture? "Signature Finish" is for special Limewash looks like Liquid Metal or Lime Silk.',
      options: {
        list: [
          { title: 'Smooth', value: 'smooth' },
          { title: 'Semi-Rough', value: 'semiRough' },
          { title: 'Rough', value: 'rough' },
          { title: 'Signature Finish', value: 'signature' },
        ],
        layout: 'radio',
      },
      initialValue: 'smooth',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'One sentence about this texture and where it works best.',
    }),
    defineField({
      name: 'services',
      title: 'Show This Swatch On These Service Pages',
      type: 'array',
      description:
        'Choose which service pages display this swatch (e.g. Microtopping and/or Limewash).',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'textureCategory',
      media: 'image',
    },
  },
})
