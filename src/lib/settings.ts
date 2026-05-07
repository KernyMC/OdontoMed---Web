import { sanityClient } from './sanity'
import { withCache } from './cache'
import { defineQuery } from 'groq'

export interface SiteSettings {
  whatsapp:  string | null
  instagram: string | null
  facebook:  string | null
  tiktok:    string | null
}

const SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    whatsapp,
    instagram,
    facebook,
    tiktok
  }
`)

const FALLBACK: SiteSettings = {
  whatsapp:  null,
  instagram: null,
  facebook:  null,
  tiktok:    null,
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return withCache(
    'siteSettings',
    async () => {
      const data = await sanityClient.fetch(SETTINGS_QUERY)
      return data ?? FALLBACK
    },
    Infinity,
  )
}
