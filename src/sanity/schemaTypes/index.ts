import { type SchemaTypeDefinition } from 'sanity'

import { siteSettings } from './documents/siteSettings'
import { service } from './documents/service'
import { swatch } from './documents/swatch'
import { galleryImage } from './documents/galleryImage'
import { faq } from './documents/faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, service, swatch, galleryImage, faq],
}
