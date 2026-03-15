import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'OdontMed-Web',

  projectId: 'g6lpsvgv',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
