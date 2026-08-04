import { defineType, defineField, defineArrayMember } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  description:
    'One of your services, such as Microtopping or Limewash. Each service becomes its own page on the website.',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      description: 'The name of the service, e.g. Microtopping',
      validation: (rule) => rule.required().error('Give this service a name'),
    }),
    defineField({
      name: 'slug',
      title: 'Web Address (slug)',
      type: 'slug',
      description:
        'The end part of the web address for this service, e.g. /services/microtopping. Usually you can leave this auto-generated.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('A web address is needed'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description:
        'A one or two sentence summary, shown on cards and overview sections around the site.',
      validation: (rule) => rule.required().max(200).warning('Keep it under 200 characters for best results'),
    }),
    defineField({
      name: 'description',
      title: 'Main Description',
      type: 'text',
      rows: 6,
      description: 'The main paragraph shown at the top of the service page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'A large, high-quality photo representing this service.',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whyPoints',
      title: 'Why Choose This Service',
      type: 'array',
      description:
        'The bullet-point list that sells this service. Each item shows a bold title with a short explanation underneath.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'point',
          title: 'Point',
          fields: [
            defineField({
              name: 'title',
              title: 'Point Title',
              type: 'string',
              description: 'A short headline for this point, e.g. Seamless, Joint-Free Surfaces',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Explanation',
              type: 'text',
              rows: 3,
              description: 'One or two sentences explaining this point.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'swatches',
      title: 'Related Texture Swatches',
      type: 'array',
      description:
        'The texture swatches shown on this service page. Add existing swatches from the Texture Swatches section.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'swatch' }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'heroImage',
    },
  },
})
