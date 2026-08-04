'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    // For singletons like siteSettings, keep publish and discard changes actions clean
    actions: (input, context) => {
      if (context.schemaType === 'siteSettings') {
        return input.filter(
          ({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)
        )
      }
      return input
    },
    // Hide singletons from global "Create New" options
    newDocumentOptions: (action, { creationContext }) => {
      if (creationContext.type === 'global') {
        return action.filter((template) => template.templateId !== 'siteSettings')
      }
      return action
    },
  },
})
