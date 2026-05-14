import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'clinicPhoto',
  title: 'Foto de Clínica',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Nombre del espacio',
      type: 'string',
      description: 'Ej: Sala de espera, Consultorio 1, Quirófano…',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Menor número = aparece primero.',
    }),
  ],
  preview: {
    select: { title: 'label', media: 'photo' },
    prepare({ title, media }) {
      return { title, subtitle: 'Clínica actual', media }
    },
  },
  orderings: [
    { title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
