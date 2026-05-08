import { sanityClient, urlFor } from '../lib/sanity'
import { withCache } from '../lib/cache'
import { defineQuery } from 'groq'

// ── Tipos ──────────────────────────────────────────────────────────────────

export type TechGroupKey = 'radiografia' | 'tomografia' | 'digital' | 'laboratorio'

export interface TechGroup {
  key:        TechGroupKey
  label:      string
  desc:       string
  imgUrl:     string | null
  ctaLabel:   string
  anchor:     string
  itemCount:  number
  order:      number
}

export interface TechItem {
  _id:   string
  title: string
  slug:  string
  group: TechGroupKey
  desc:  string
  order: number
}

// ── Queries ────────────────────────────────────────────────────────────────

const TECH_GROUPS_QUERY = defineQuery(`
  *[_type == "techGroup"] | order(order asc) {
    key,
    label,
    desc,
    image,
    ctaLabel,
    anchor,
    "itemCount": count(*[_type == "techItem" && group == ^.key]),
    order
  }
`)

const TECH_ITEMS_QUERY = defineQuery(`
  *[_type == "techItem"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    group,
    desc,
    order
  }
`)

// ── Helpers ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveGroupImgUrl(raw: any): string | null {
  if (raw.image?.asset) {
    return urlFor(raw.image).width(1200).height(800).fit('crop').auto('format').url()
  }
  return null
}

// ── Funciones públicas ─────────────────────────────────────────────────────

export async function getTechGroups(): Promise<TechGroup[]> {
  return withCache(
    'tech:groups',
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = await sanityClient.fetch(TECH_GROUPS_QUERY)
      return raw.map((g) => ({
        key:       g.key,
        label:     g.label     ?? '',
        desc:      g.desc      ?? '',
        imgUrl:    resolveGroupImgUrl(g),
        ctaLabel:  g.ctaLabel  ?? 'Ver más',
        anchor:    g.anchor    ?? '',
        itemCount: g.itemCount ?? 0,
        order:     g.order     ?? 0,
      }))
    },
    Infinity,
  )
}

export async function getTechItems(): Promise<TechItem[]> {
  return withCache(
    'tech:items',
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = await sanityClient.fetch(TECH_ITEMS_QUERY)
      return raw.map((i) => ({
        _id:   i._id,
        title: i.title ?? '',
        slug:  i.slug  ?? '',
        group: i.group,
        desc:  i.desc  ?? '',
        order: i.order ?? 0,
      }))
    },
    Infinity,
  )
}
