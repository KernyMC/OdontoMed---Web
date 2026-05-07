import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  // Singleton — solo debe existir un documento de este tipo
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      description: 'Número con código de país, sin espacios ni guiones. Ej: +593996323991',
      validation: (Rule) => Rule.regex(/^\+\d{7,15}$/, {
        name: 'phone',
        invert: false,
      }).error('Debe tener formato +593996323991'),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      description: 'URL completa del perfil. Ej: https://instagram.com/odontomed',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      description: 'URL completa de la página.',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok',
      type: 'url',
      description: 'URL completa del perfil.',
    }),
  ],
  preview: {
    select: { title: 'whatsapp' },
    prepare({ title }) {
      return { title: 'Configuración del Sitio', subtitle: title ?? 'Sin WhatsApp configurado' }
    },
  },
})
