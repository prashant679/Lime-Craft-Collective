import { defineType, defineField, defineArrayMember } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  description:
    'One of your services, such as Micro Concrete, Limewash, Textured Finish, or Terrazzo Flooring. Each service becomes its own page on the website.',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      description: 'The name of the service, e.g. Micro Concrete',
      validation: (rule) => rule.required().error('Give this service a name'),
    }),
    defineField({
      name: 'slug',
      title: 'Web Address (slug)',
      type: 'slug',
      description:
        'The end part of the web address for this service, e.g. /services/micro-concrete. Usually you can leave this auto-generated.',
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
      name: 'textures',
      title: 'Texture & Tone',
      type: 'array',
      description:
        'The texture options shown on this service page, each with a short description.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'texture',
          title: 'Texture',
          fields: [
            defineField({
              name: 'name',
              title: 'Texture Name',
              type: 'string',
              description: 'e.g. Smooth, Semi-Rough, Rough',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              description: 'One or two sentences describing this texture.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'maintenancePoints',
      title: 'Care & Maintenance',
      type: 'array',
      description: 'Short maintenance tips shown on this service page.',
      of: [
        defineArrayMember({
          type: 'string',
          title: 'Tip',
        }),
      ],
    }),
    defineField({
      name: 'keyFeatures',
      title: 'Key Features',
      type: 'array',
      description:
        'Technical properties of this finish, e.g. Water-resistant, Crack-resistant, UV-resistant. Shown as a checklist.',
      of: [
        defineArrayMember({
          type: 'string',
          title: 'Feature',
        }),
      ],
    }),
    defineField({
      name: 'perfectApplications',
      title: 'Perfect Applications',
      type: 'array',
      description:
        'Where this finish gets used, e.g. bathroom floors, kitchen countertops, commercial spaces. Shown as a checklist.',
      of: [
        defineArrayMember({
          type: 'string',
          title: 'Application',
        }),
      ],
    }),
    defineField({
      name: 'processSteps',
      title: 'Application Process',
      type: 'array',
      description:
        'The step-by-step application process shown in the "Our Application Process" section on this service page. Each step is numbered automatically.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          title: 'Step',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              description: 'e.g. Surface Preparation',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 3,
              description: 'One or two sentences explaining this step.',
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'shortDescription',
      media: 'heroImage',
    },
  },
})
