import { sanityClient } from './sanity'

// ── Types ────────────────────────────────────────────────────────────────────

export interface SanityService {
  slug: string
  title: string
  category: string
  group: 'odontologia' | 'medicina'
  image: { asset: { _ref: string } } | null
  desc: string
  order: number | null
}

export interface SanityPost {
  slug: string
  title: string
  category: string
  image: { asset: { _ref: string }; alt?: string } | null
  publishedAt: string
  readTime: string
  excerpt: string
  featured: boolean
}

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getServices(): Promise<SanityService[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc) {
      "slug": slug.current,
      title,
      category,
      group,
      image,
      desc,
      order
    }`
  )
}

export async function getServiceBySlug(slug: string): Promise<SanityService & { body: any[] }> {
  return sanityClient.fetch(
    `*[_type == "service" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      category,
      group,
      image,
      desc,
      body
    }`,
    { slug }
  )
}

export async function getPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      category,
      image,
      "publishedAt": publishedAt,
      readTime,
      excerpt,
      featured
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<SanityPost & { body: any[] }> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      category,
      image,
      "publishedAt": publishedAt,
      readTime,
      excerpt,
      featured,
      body
    }`,
    { slug }
  )
}
