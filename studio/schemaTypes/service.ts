import {defineField, defineType, defineArrayMember} from 'sanity'
import {HeartIcon} from '@sanity/icons'

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  icon: HeartIcon,
  fields: [
    // ── Identificación ──────────────────────────────────────
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
      name: 'category',
      title: 'Categoría',
      type: 'string',
      description: 'Ej: Odontología Estética, Implantología, Medicina Infantil…',
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

    // ── Descripción corta (card + hero) ─────────────────────
    defineField({
      name: 'desc',
      title: 'Descripción corta',
      type: 'text',
      rows: 3,
      description: 'Se muestra en la tarjeta y en el hero de la página de detalle.',
      validation: (Rule) => Rule.required().max(200),
    }),

    // ── Imagen ───────────────────────────────────────────────
    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagen subida al Media Manager (recomendado).',
    }),
    // ── Contenido del procedimiento ──────────────────────────
    defineField({
      name: 'body',
      title: 'Descripción del procedimiento',
      type: 'array',
      description: 'Texto principal que aparece en la sección "Sobre el Procedimiento".',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Texto alternativo'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'whyUs',
      title: '¿Por qué elegirnos?',
      type: 'text',
      rows: 3,
      description: 'Párrafo que aparece en el recuadro destacado de la página de detalle.',
    }),

    // ── Beneficios clave (sidebar) ───────────────────────────
    defineField({
      name: 'benefits',
      title: 'Beneficios clave',
      type: 'array',
      description: 'Aparece en el sidebar de la página de detalle. Agrega hasta 6 ítems.',
      of: [
        defineArrayMember({
          type: 'object',
          preview: {select: {title: 'title', subtitle: 'description'}},
          fields: [
            defineField({
              name: 'title',
              title: 'Título del beneficio',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 2,
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),

    // ── Especialistas ────────────────────────────────────────
    defineField({
      name: 'specialists',
      title: 'Especialistas',
      type: 'array',
      description: 'Doctores que atienden este servicio.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'specialist' }] })],
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      description: 'Controla cómo aparece este servicio en Google. Si están vacíos, se usan el título y la descripción corta.',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta título',
          type: 'string',
          description: 'Máx. 60 caracteres.',
          validation: (Rule) => Rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta descripción',
          type: 'text',
          rows: 3,
          description: 'Máx. 160 caracteres.',
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),

    // ── Orden ────────────────────────────────────────────────
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Menor número = aparece primero. Deja vacío para orden automático.',
    }),
  ],

  preview: {
    select: {title: 'title', subtitle: 'category', media: 'image'},
  },
  orderings: [
    {title: 'Orden manual', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
})
