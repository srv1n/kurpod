import { DocumentIcon } from '@heroicons/react/16/solid'
import { groq } from 'next-sanity'
import { defineField, defineType } from 'sanity'
import { apiVersion } from '../env'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) =>
        Rule.required().error('A slug is required for the post URL.'),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) =>
        Rule.required().error(
          'A publication date is required for ordering posts.',
        ),
    }),
    defineField({
      name: 'isFeatured',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (isFeatured, { getClient }) => {
          if (isFeatured !== true) {
            return true
          }

          let featuredPosts = await getClient({ apiVersion })
            .withConfig({ perspective: 'previewDrafts' })
            .fetch<number>(
              groq`count(*[_type == 'post' && isFeatured == true])`,
            )

          return featuredPosts > 3
            ? 'Only 3 posts can be featured at a time.'
            : true
        }),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      author: 'author.name',
      isFeatured: 'isFeatured',
    },
    prepare({ title, author, media, isFeatured }) {
      return {
        title,
        subtitle: [isFeatured && 'Featured', author && `By ${author}`]
          .filter(Boolean)
          .join(' | '),
        media,
      }
    },
  },
  orderings: [
    {
      name: 'isFeaturedAndPublishedAtDesc',
      title: 'Featured & Latest Published',
      by: [
        { field: 'isFeatured', direction: 'desc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
})
