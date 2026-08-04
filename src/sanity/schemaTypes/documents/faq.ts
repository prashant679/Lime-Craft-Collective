import { defineType, defineField } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  description: 'A single question and answer shown on the FAQs page.',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The question a customer might ask, e.g. "What is microtopping?"',
      validation: (rule) => rule.required().error('Add the question'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 6,
      description: 'A clear, friendly answer to the question.',
      validation: (rule) => rule.required().error('Add the answer'),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Use 0, 1, 2 and so on.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'sortOrder',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled question',
        subtitle: subtitle !== undefined ? `Display order: ${subtitle}` : undefined,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
})
