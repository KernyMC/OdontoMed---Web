import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'techItem',
  title: 'Equipo / Estudio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Grupo',
      type: 'string',
      options: {
        list: [
          { title: 'Radiografías',       value: 'radiografia' },
          { title: 'Tomografías',        value: 'tomografia'  },
          { title: 'Tecnología Digital', value: 'digital'     },
          { title: 'Lab. & Cardiología', value: 'laboratorio' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Orden dentro del grupo',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'group' },
  },
})
