import {defineField, defineType, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Artículo del Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
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
      options: {
        list: [
          {title: 'Cosmética', value: 'Cosmética'},
          {title: 'Salud Dental', value: 'Salud Dental'},
          {title: 'Prevención', value: 'Prevención'},
          {title: 'Ortodoncia', value: 'Ortodoncia'},
          {title: 'Implantes', value: 'Implantes'},
          {title: 'Odontopediatría', value: 'Odontopediatría'},
        ],
      },
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
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      description: 'Resumen breve del artículo (aparece en listados y SEO). Máx. 200 caracteres.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'intro',
      title: 'Párrafo de introducción',
      description: 'Lead paragraph con letra capitular al inicio del artículo.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'quote',
      title: 'Cita destacada',
      description: 'Pull quote que aparece entre la introducción y el cuerpo del artículo.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Contenido del artículo',
      description: 'Usa la barra de herramientas para agregar títulos, negritas, listas e imágenes.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Párrafo', value: 'normal'},
            {title: 'Título H2', value: 'h2'},
            {title: 'Título H3', value: 'h3'},
            {title: 'Título H4', value: 'h4'},
            {title: 'Cita en bloque', value: 'blockquote'},
          ],
          lists: [
            {title: 'Lista con viñetas', value: 'bullet'},
            {title: 'Lista numerada', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Negrita', value: 'strong'},
              {title: 'Itálica', value: 'em'},
              {title: 'Subrayado', value: 'underline'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL del enlace',
                    validation: (r) =>
                      r.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  }),
                  defineField({
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Abrir en nueva pestaña',
                    initialValue: false,
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Leyenda de la imagen (opcional)',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Más reciente',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
