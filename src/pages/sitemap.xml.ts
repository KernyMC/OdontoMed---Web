import type { APIRoute } from 'astro'
import { sanityClient } from '../utils/sanity'

const BASE = 'https://odonto-med.com'

const STATIC_PAGES = [
  { loc: '/',           priority: '1.0', changefreq: 'weekly'  },
  { loc: '/nosotros',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/servicios',  priority: '0.9', changefreq: 'monthly' },
  { loc: '/tecnologia', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog',       priority: '0.8', changefreq: 'weekly'  },
]

export const GET: APIRoute = async () => {
  const [posts, services] = await Promise.all([
    sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
    sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "service" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    ),
  ])

  const staticUrls = STATIC_PAGES.map(
    (p) => `
  <url>
    <loc>${BASE}${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )

  const postUrls = posts.map(
    (p) => `
  <url>
    <loc>${BASE}/blog/${p.slug}</loc>
    <lastmod>${new Date(p._updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
  )

  const serviceUrls = services.map(
    (s) => `
  <url>
    <loc>${BASE}/servicios/${s.slug}</loc>
    <lastmod>${new Date(s._updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...serviceUrls, ...postUrls].join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
