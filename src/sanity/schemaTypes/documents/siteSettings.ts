import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description:
    'Global website information — logo, contact details, GST number, address, and social links. There is only one of these.',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Website Name',
      type: 'string',
      description: 'The name of your business, shown in the browser tab and headings.',
      initialValue: 'Lime Craft Collective',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Your brand logo. Shown in the top-left of the navigation bar and in the footer.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Your display phone number, e.g. +91 8586096452',
      initialValue: '+91 8586096452',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description:
        'The number used for the "Get in Touch" WhatsApp button. Country code + number only, no symbols, e.g. 918586096452',
      initialValue: '918586096452',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'The email address customers can write to.',
      initialValue: 'limecraftcollective@gmail.com',
      validation: (rule) => rule.required().email().error('Please enter a valid email address'),
    }),
    defineField({
      name: 'gstNumber',
      title: 'GST Number',
      type: 'string',
      description: 'Your registered GST number, shown in the footer.',
      initialValue: '07CZUPR8920H1ZK',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Registered Address',
      type: 'text',
      rows: 2,
      description: 'Your business address, shown in the footer and on the contact page.',
      initialValue: 'F-1/298 Sangam Vihar, New Delhi - 110080',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram Link',
      type: 'url',
      description: 'The full link to your Instagram profile, e.g. https://instagram.com/limecraftcollective',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }).error('Please enter a full link starting with http:// or https://'),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook Link (optional)',
      type: 'url',
      description: 'The full link to your Facebook page. Leave empty if you do not use Facebook.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }).error('Please enter a full link starting with http:// or https://'),
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      subtitle: 'email',
      media: 'logo',
    },
  },
})
