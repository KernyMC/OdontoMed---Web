import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Grupo',
      type: 'string',
      options: {
        list: [
          {title: 'Odontología', value: 'odontologia'},
          {title: 'Medicina', value: 'medicina'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'desc',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Texto alternativo'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número para ordenar los servicios (menor = primero)',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
  orderings: [
    {title: 'Orden manual', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
})
