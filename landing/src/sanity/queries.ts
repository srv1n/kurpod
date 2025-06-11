import { defineQuery } from 'next-sanity'
import { sanityFetch } from './client'

const TOTAL_POSTS_QUERY = defineQuery(/* groq */ `count(*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
])`)

export async function getPostsCount(category?: string) {
  return await sanityFetch({
    query: TOTAL_POSTS_QUERY,
    params: { category: category ?? null },
  })
}

const POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
]|order(publishedAt desc)[$startIndex...$endIndex]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
  },
}`)

export async function getPosts(
  startIndex: number,
  endIndex: number,
  category?: string,
) {
  return await sanityFetch({
    query: POSTS_QUERY,
    params: {
      startIndex,
      endIndex,
      category: category ?? null,
    },
  })
}

const FEATURED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && isFeatured == true
  && defined(slug.current)
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
    image,
  },
}`)

export async function getFeaturedPosts(quantity: number) {
  return await sanityFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity },
  })
}

const FEED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
]|order(isFeatured, publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
  },
}`)

export async function getPostsForFeed() {
  return await sanityFetch({
    query: FEED_POSTS_QUERY,
  })
}

const POST_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && slug.current == $slug
][0]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}
`)

export async function getPost(slug: string) {
  return await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })
}

const CATEGORIES_QUERY = defineQuery(/* groq */ `*[
  _type == "category"
  && count(*[_type == "post" && defined(slug.current) && ^._id in categories[]._ref]) > 0
]|order(title asc){
  title,
  "slug": slug.current,
}`)

export async function getCategories() {
  return await sanityFetch({
    query: CATEGORIES_QUERY,
  })
}
