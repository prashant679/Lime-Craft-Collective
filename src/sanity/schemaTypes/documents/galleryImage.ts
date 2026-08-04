import { defineType, defineField } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  description: 'A project photo shown on the Gallery page.',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'A high-quality photo of a completed project.',
      options: { hotspot: true },
      validation: (rule) => rule.required().error('Add a photo'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'A short label for the photo, e.g. "Seamless microtopping floor". Also used as the photo description.',
      validation: (rule) => rule.required().error('Add a short caption'),
    }),
    defineField({
      name: 'service',
      title: 'Tagged Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description:
        'Which service this photo belongs to, so it can also appear on that service page. Leave empty for general photos.',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      media: 'image',
      serviceName: 'service.name',
    },
    prepare({ title, media, serviceName }) {
      return {
        title: title || 'Untitled photo',
        subtitle: serviceName || 'General',
        media,
      }
    },
  },
})
