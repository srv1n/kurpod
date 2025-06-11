import { image } from '@/sanity/image'
import { getPostsForFeed } from '@/sanity/queries'
import { Feed } from 'feed'
import assert from 'node:assert'

export async function GET(req: Request) {
  let siteUrl = new URL(req.url).origin

  let feed = new Feed({
    title: 'The Radiant Blog',
    description:
      'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
    author: {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
    },
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  let posts = await getPostsForFeed()

  posts.forEach((post) => {
    try {
      assert(typeof post.title === 'string')
      assert(typeof post.slug === 'string')
      assert(typeof post.excerpt === 'string')
      assert(typeof post.publishedAt === 'string')
    } catch (error) {
      console.log('Post is missing required fields for RSS feed:', post)
      return
    }

    feed.addItem({
      title: post.title,
      id: post.slug,
      link: `${siteUrl}/blog/${post.slug}`,
      content: post.excerpt,
      image: post.mainImage
        ? image(post.mainImage)
            .size(1200, 800)
            .format('jpg')
            .url()
            .replaceAll('&', '&amp;')
        : undefined,
      author: post.author?.name ? [{ name: post.author.name }] : [],
      contributor: post.author?.name ? [{ name: post.author.name }] : [],
      date: new Date(post.publishedAt),
    })
  })

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
