import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji (alternative to image)',
      type: 'string',
      description: 'Si vous préférez utiliser un emoji au lieu d\'une image',
    }),
    defineField({
      name: 'iconUrl',
      title: 'Icon URL (alternative to image/emoji)',
      type: 'url',
      description: 'URL d\'une icône SVG (ex: depuis DevIcon, Simple Icons, etc.)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Database', value: 'database' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Tools', value: 'tools' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      description: 'Niveau de maîtrise de 1 à 5',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Ordre d\'affichage (les plus petits chiffres en premier)',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Afficher dans la liste principale des skills',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      emoji: 'emoji',
      media: 'icon',
      iconUrl: 'iconUrl',
      category: 'category',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, emoji, media, iconUrl, category, featured } = selection
      // Only use media if it's a Sanity image object, not a string path
      const isValidMedia = media && typeof media === 'object' && media.asset
      
      return {
        title: title,
        subtitle: `${category || 'No category'} ${featured ? '⭐' : ''}`,
        media: isValidMedia ? media : undefined,
      }
    },
  },
})
