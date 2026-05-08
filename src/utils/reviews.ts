import { sanityClient, urlFor } from '../lib/sanity'
import { withCache } from '../lib/cache'
import { defineQuery } from 'groq'

export interface Review {
  _id:      string
  name:     string
  body:     string
  photoUrl: string | null
  link:     string | null
  order:    number
}

const REVIEWS_QUERY = defineQuery(`
  *[_type == "review"] | order(order asc, _createdAt asc) {
    _id,
    name,
    body,
    photo,
    link,
    order
  }
`)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolvePhotoUrl(raw: any): string | null {
  if (raw.photo?.asset) {
    return urlFor(raw.photo).width(80).height(80).fit('crop').auto('format').url()
  }
  return null
}

export async function getReviews(): Promise<Review[]> {
  return withCache(
    'reviews',
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw: any[] = await sanityClient.fetch(REVIEWS_QUERY)
      return raw.map((r) => ({
        _id:      r._id,
        name:     r.name     ?? '',
        body:     r.body     ?? '',
        photoUrl: resolvePhotoUrl(r),
        link:     r.link     ?? null,
        order:    r.order    ?? 0,
      }))
    },
    Infinity,
  )
}
