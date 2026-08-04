import type { StructureResolver } from 'sanity/structure'
import {
  CogIcon,
  DocumentTextIcon,
  HelpCircleIcon,
  ImageIcon,
  SquareIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Website Content')
    .items([
      // 1. Site Settings — a single document edited in place, never duplicated
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),

      S.divider(),

      // 2. Content groups, organised for a non-technical editor
      S.listItem()
        .title('Services')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('service').title('Services')),

      S.listItem()
        .title('Texture Swatches')
        .icon(SquareIcon)
        .child(S.documentTypeList('swatch').title('Texture Swatches')),

      S.listItem()
        .title('Gallery')
        .icon(ImageIcon)
        .child(S.documentTypeList('galleryImage').title('Gallery')),

      S.listItem()
        .title('FAQs')
        .icon(HelpCircleIcon)
        .child(S.documentTypeList('faq').title('FAQs')),
    ])
