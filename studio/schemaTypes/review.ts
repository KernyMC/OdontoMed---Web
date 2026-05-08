import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Testimonio / Reseña',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto de perfil',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Reseña',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Enlace a la reseña en Google',
      type: 'url',
      description: 'URL de la reseña original en Google Maps.',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'body', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle?.slice(0, 80), media }
    },
  },
})
