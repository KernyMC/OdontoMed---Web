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
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Clínica actual', value: 'actual' },
          { title: 'Historia / Inicios', value: 'historia' },
        ],
        layout: 'radio',
      },
      initialValue: 'actual',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Año (solo para fotos históricas)',
      type: 'string',
      description: 'Ej: 1976, 1985. Aparece como etiqueta bajo la foto.',
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Menor número = aparece primero.',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'category', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle === 'actual' ? 'Clínica actual' : 'Historia',
        media,
      }
    },
  },
  orderings: [
    { title: 'Orden manual', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
