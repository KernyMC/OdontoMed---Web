import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'techGroup',
  title: 'Grupo de Tecnología',
  type: 'document',
  fields: [
    defineField({
      name: 'key',
      title: 'Identificador',
      type: 'string',
      description: 'Valor fijo: radiografia | tomografia | digital | laboratorio',
      options: {
        list: [
          { title: 'Radiografías',          value: 'radiografia'  },
          { title: 'Tomografías',           value: 'tomografia'   },
          { title: 'Tecnología Digital',    value: 'digital'      },
          { title: 'Lab. & Cardiología',    value: 'laboratorio'  },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Nombre del grupo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Imagen de fondo',
      type: 'image',
      description: 'Se usa como fondo en la sección de tecnología del home.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texto del enlace',
      type: 'string',
      description: 'Ej: "Ver estudios", "Ver equipos", "Ver servicios"',
      initialValue: 'Ver más',
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor de la página /tecnologia',
      type: 'string',
      description: 'Sin #. Ej: tech-rx, tech-tomo, tech-digital, tech-lab',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'key', media: 'image' },
  },
})
