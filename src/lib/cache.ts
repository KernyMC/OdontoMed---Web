/**
 * In-memory TTL cache para queries de Sanity en SSR (Node adapter).
 *
 * El Map persiste mientras el proceso Node esté corriendo, por lo que
 * sirve de cache entre requests sin necesidad de un servicio externo.
 *
 * Sanity CDN (useCdn:true) ya cachea en el edge ~60 s.
 * Esta capa adicional evita roundtrips de red para contenido "caliente".
 */

type Entry<T> = { value: T; expiresAt: number }

const store = new Map<string, Entry<unknown>>()

/**
 * Retorna el valor cacheado si está vigente; de lo contrario ejecuta
 * `fetcher`, guarda el resultado y lo retorna.
 *
 * @param key     Clave única del recurso (incluye query + params).
 * @param fetcher Función async que obtiene el dato real.
 * @param ttlMs   Tiempo de vida en ms. Por defecto 5 minutos.
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = 5 * 60 * 1000,
): Promise<T> {
  const now = Date.now()
  const hit = store.get(key)

  if (hit && hit.expiresAt > now) {
    return hit.value as T
  }

  const value = await fetcher()
  store.set(key, { value, expiresAt: now + ttlMs })
  return value
}

/**
 * Invalida entradas del cache.
 * Sin argumento limpia todo; con prefijo elimina entradas que empiecen por él.
 */
export function invalidateCache(keyPrefix?: string): void {
  if (!keyPrefix) { store.clear(); return }
  for (const k of store.keys()) {
    if (k.startsWith(keyPrefix)) store.delete(k)
  }
}
