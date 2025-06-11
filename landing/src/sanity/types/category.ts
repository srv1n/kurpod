import { TagIcon } from '@heroicons/react/16/solid'
import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
  name: 'category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
  ],
})
