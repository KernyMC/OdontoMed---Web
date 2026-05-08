import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { defineQuery } from 'groq'
import { withCache } from '../lib/cache'

// ─── Client ──────────────────────────────────────────────────────────────────

export const sanityClient = createClient({
  projectId: 'g6lpsvgv',
  dataset: 'production',
  apiVersion: '2026-04-14',
  // useCdn:true → Sanity CDN cachea en el edge (~60 s).
  // withCache() añade una capa in-process (5 min) para evitar roundtrips.
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// ─── GROQ Queries ────────────────────────────────────────────────────────────
// defineQuery() habilita TypeGen y garantiza que el template de query sea
// estable (necesario para que la caché de Sanity funcione correctamente).

export const POSTS_LIST_QUERY = defineQuery(/* groq */ `
  *[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    category,
    featured,
    readTime,
    excerpt,
    publishedAt,
    image
  }
`)

export const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    category,
    featured,
    readTime,
    excerpt,
    publishedAt,
    intro,
    quote,
    image,
    body[]{ ... },
    "author": author->{ _id, name, specialty, "photoUrl": photo.asset->url }
  }
`)

// ─── Funciones con caché (5 min in-process + CDN edge) ───────────────────────

/** Lista de posts para /blog — cache 1 hora.
 *  Se publica 1-2 posts/semana: 1 h de staleness es aceptable.
 *  Para invalidación instantánea al publicar, configura un webhook de Sanity
 *  que llame a invalidateCache('posts:list'). */
export async function getPosts(): Promise<any[]> {
  return withCache(
    'posts:list',
    () => sanityClient.fetch(POSTS_LIST_QUERY),
    60 * 60 * 1000,
  )
}

/** Post individual por slug — cache permanente (vida del proceso Node).
 *  Un post publicado no se edita: no hay razón para volver a fetching. */
export async function getPost(slug: string): Promise<any | null> {
  return withCache(
    `posts:slug:${slug}`,
    () => sanityClient.fetch(POST_QUERY, { slug }),
    Infinity,
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTHS = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

// ─── Portable Text → HTML ────────────────────────────────────────────────────

type MarkDef = {
  _key: string
  _type: string
  href?: string
  openInNewTab?: boolean
}

type PteSpan = {
  _type: 'span'
  text: string
  marks: string[]
}

type PteBlock = {
  _type: 'block'
  _key: string
  style: string
  listItem?: string
  children: PteSpan[]
  markDefs: MarkDef[]
}

type PteImage = {
  _type: 'image'
  _key: string
  asset: any
  alt?: string
  caption?: string
}

type PteNode = PteBlock | PteImage | { _type: string; _key: string }

function escapeHtml(str: string): string {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function renderSpans(children: PteSpan[], markDefs: MarkDef[]): string {
  const defsMap = new Map((markDefs || []).map((d) => [d._key, d]))
  return (children || [])
    .map((span) => {
      if (!span || span._type !== 'span') return ''
      let html = escapeHtml(span.text)
      for (const mark of span.marks || []) {
        const def = defsMap.get(mark)
        if (def) {
          if (def._type === 'link') {
            const rel = def.openInNewTab ? ' rel="noopener noreferrer"' : ''
            const target = def.openInNewTab ? ' target="_blank"' : ''
            html = `<a href="${escapeHtml(def.href || '')}"${target}${rel} class="text-brand-accent underline hover:text-brand-teal transition-colors">${html}</a>`
          }
        } else {
          switch (mark) {
            case 'strong': html = `<strong>${html}</strong>`; break
            case 'em':     html = `<em>${html}</em>`;         break
            case 'underline': html = `<u>${html}</u>`;        break
          }
        }
      }
      return html
    })
    .join('')
}

function renderTextBlock(block: PteBlock): string {
  const content = renderSpans(block.children, block.markDefs)
  const rawText = (block.children || []).map((s) => s.text || '').join('')

  switch (block.style) {
    case 'h2': {
      const id = slugify(rawText)
      return `<h2 id="${id}">${content}</h2>`
    }
    case 'h3': return `<h3>${content}</h3>`
    case 'h4': return `<h4>${content}</h4>`
    case 'blockquote': return `<blockquote>${content}</blockquote>`
    default:   return `<p>${content}</p>`
  }
}

export function portableTextToHtml(blocks: PteNode[]): string {
  if (!blocks?.length) return ''
  const html: string[] = []
  let i = 0

  while (i < blocks.length) {
    const node = blocks[i]

    if (node._type === 'image') {
      const img = node as PteImage
      const imgUrl = urlFor(img).width(1200).auto('format').url()
      const alt = escapeHtml(img.alt || '')
      const captionHtml = img.caption
        ? `<figcaption class="text-sm font-sans mt-4 opacity-60 text-center uppercase tracking-widest">${escapeHtml(img.caption)}</figcaption>`
        : ''
      html.push(
        `<figure class="my-12"><img src="${imgUrl}" alt="${alt}" loading="lazy" class="w-full h-auto object-cover grayscale-[20%]" />${captionHtml}</figure>`
      )
      i++
      continue
    }

    if (node._type === 'block') {
      const block = node as PteBlock

      if (block.listItem) {
        const tag = block.listItem === 'bullet' ? 'ul' : 'ol'
        const listClass =
          block.listItem === 'bullet'
            ? 'list-none space-y-4 mb-8 font-sans text-lg'
            : 'list-decimal ml-6 space-y-3 mb-8 font-sans text-lg'
        const items: string[] = []

        while (i < blocks.length) {
          const cur = blocks[i] as PteBlock
          if (cur._type !== 'block' || cur.listItem !== block.listItem) break
          const itemContent = renderSpans(cur.children, cur.markDefs || [])
          if (block.listItem === 'bullet') {
            items.push(
              `<li class="flex items-start gap-3"><span class="text-brand-accent" aria-hidden="true">◆</span><span>${itemContent}</span></li>`
            )
          } else {
            items.push(`<li>${itemContent}</li>`)
          }
          i++
        }
        html.push(`<${tag} class="${listClass}">${items.join('')}</${tag}>`)
        continue
      }

      html.push(renderTextBlock(block))
      i++
      continue
    }

    i++
  }

  return html.join('\n')
}

export function extractToc(blocks: PteNode[]): Array<{href: string; label: string}> {
  if (!blocks?.length) return []
  return (blocks as PteBlock[])
    .filter((b) => b._type === 'block' && b.style === 'h2')
    .map((b) => {
      const text = (b.children || []).map((s) => s.text || '').join('')
      return {href: `#${slugify(text)}`, label: text}
    })
}
