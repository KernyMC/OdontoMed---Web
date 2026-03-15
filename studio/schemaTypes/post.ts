import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Artículo del Blog',
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
      name: 'featured',
      title: 'Artículo destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de lectura',
      type: 'string',
      placeholder: '5 min',
    }),
    defineField({
      name: 'image',
      title: 'Imagen de portada',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Texto alternativo'}),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
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
  ],
  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
  orderings: [
    {title: 'Más reciente', name: 'publishedAtDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
})
