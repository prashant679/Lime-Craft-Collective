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

import {CustomDeleteAction} from './src/sanity/actions/deleteAction'
import {PublishAllTool} from './src/sanity/tools/publishAllTool'
import {RocketIcon} from '@sanity/icons'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  tools: (prev) => [
    ...prev,
    {
      name: 'publish-all',
      title: 'Publish All',
      icon: RocketIcon,
      component: PublishAllTool,
    },
  ],
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  document: {
    // Custom actions for document types in Studio
    actions: (input, context) => {
      if (context.schemaType === 'siteSettings') {
        return input.filter(
          ({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)
        )
      }
      // Add custom primary Delete button for all editable content documents
      return [...input, CustomDeleteAction]
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
