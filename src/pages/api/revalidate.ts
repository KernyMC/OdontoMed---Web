import type { APIRoute } from 'astro'
import { invalidateCache } from '../../lib/cache'

/**
 * POST /api/revalidate
 *
 * Endpoint llamado por el webhook de Sanity al publicar o actualizar contenido.
 * Invalida el cache in-process según el tipo de documento afectado.
 *
 * Seguridad: verifica el header Authorization: Bearer <SANITY_WEBHOOK_SECRET>
 */
export const POST: APIRoute = async ({ request }) => {
  // ── 1. Verificar token ───────────────────────────────────────────────────
  const secret = import.meta.env.SANITY_WEBHOOK_SECRET
  const authHeader = request.headers.get('authorization') ?? ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()

  if (!secret || token !== secret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // ── 2. Parsear body de Sanity ────────────────────────────────────────────
  let body: Record<string, any> = {}
  try {
    body = await request.json()
  } catch {
    // Body vacío o malformado — invalidamos todo como fallback
  }

  const docType: string = body._type ?? body.documentType ?? ''
  const slug: string   = body.slug?.current ?? body.slug ?? ''

  // ── 3. Invalidar cache según tipo ────────────────────────────────────────
  if (docType === 'post' || docType === '') {
    // Si llega un slug específico, solo borramos ese post + la lista
    if (slug) {
      invalidateCache(`posts:slug:${slug}`)
    }
    // Siempre refrescamos la lista para que aparezca el nuevo post
    invalidateCache('posts:list')
  }

  if (docType === 'service' || docType === '') {
    if (slug) {
      invalidateCache(`services:slug:${slug}`)
    }
    invalidateCache('services:list')
  }

  return new Response(
    JSON.stringify({ ok: true, invalidated: docType || 'all', slug: slug || null }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  )
}

// Rechazar cualquier método que no sea POST
export const GET: APIRoute  = () => new Response('Method Not Allowed', { status: 405 })
export const PUT: APIRoute  = () => new Response('Method Not Allowed', { status: 405 })
