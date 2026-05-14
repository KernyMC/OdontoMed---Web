import { sanityClient, urlFor } from '../lib/sanity'
import { defineQuery } from 'groq'
import { withCache } from '../lib/cache'

// ── Tipos ──────────────────────────────────────────────────────────────────

export interface ServiceBenefit {
  _key: string
  title: string
  description?: string
}

export interface ServiceSpecialist {
  _id:         string
  name:        string
  specialty:   string
  photoUrl:    string | null
  description?: string
}

export interface SanityService {
  _id: string
  title: string
  slug: string
  category: string
  group: 'odontologia' | 'medicina'
  desc: string
  imgUrl: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
  benefits?: ServiceBenefit[]
  whyUs?: string
  specialists?: ServiceSpecialist[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

// ── Queries GROQ ─────────────────────────────────────────────────────────────
// defineQuery() estabiliza el template para que la caché de Sanity funcione
// correctamente y habilita TypeGen si se configura en sanity.cli.ts.

const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    group,
    desc,
    image,
    body,
    benefits[] { _key, title, description },
    whyUs,
    "specialists": specialists[]->{ _id, name, specialty, description, "photoUrl": photo.asset->url }
  }
`)

const SERVICE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    group,
    desc,
    image,
    body,
    benefits[] { _key, title, description },
    whyUs,
    seo { metaTitle, metaDescription },
    "specialists": specialists[]->{ _id, name, specialty, description, "photoUrl": photo.asset->url }
  }
`)

// ── Helpers ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveImgUrl(raw: any, w: number, h: number): string {
  if (raw.image?.asset) {
    return urlFor(raw.image).width(w).height(h).fit('crop').auto('format').url()
  }
  return ''
}

// ── Funciones públicas (con caché in-process) ─────────────────────────────
// - withCache() = TTL cache en memoria del proceso Node (10 min para servicios)
// - useCdn:true en el cliente = caché en el edge de Sanity CDN (~60 s)
// Juntas evitan roundtrips innecesarios sin sacrificar frescura del contenido.

/** Lista completa de servicios — cache permanente (vida del proceso Node).
 *  Los servicios son contenido estático: no se invalida hasta reiniciar el server. */
export async function getServices(): Promise<SanityService[]> {
  return withCache(
    'services:list',
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = await sanityClient.fetch(SERVICES_QUERY)
      return raw.map((s) => ({ ...s, imgUrl: resolveImgUrl(s, 800, 600) }))
    },
    Infinity,
  )
}

/** Servicio individual por slug — cache permanente (vida del proceso Node). */
export async function getServiceBySlug(slug: string): Promise<SanityService | null> {
  return withCache(
    `services:slug:${slug}`,
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const s: any = await sanityClient.fetch(SERVICE_BY_SLUG_QUERY, { slug })
      if (!s) return null
      return { ...s, imgUrl: resolveImgUrl(s, 1200, 900) }
    },
    Infinity,
  )
}
