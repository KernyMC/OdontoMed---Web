/**
 * seed-reviews.ts
 * Inserta las 6 reseñas reales de Google en Sanity.
 *
 * Uso:
 *   npx tsx scripts/seed-reviews.ts
 *
 * Requiere SANITY_WRITE_TOKEN en .env.
 * Idempotente: usa createOrReplace con IDs estables.
 * Las fotos se agregan manualmente desde Sanity Studio.
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@sanity/client'

// ── 1. Cargar .env ──────────────────────────────────────────────────────────
try {
  const raw = readFileSync(join(process.cwd(), '.env'), 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const k = trimmed.slice(0, eqIdx).trim()
    const v = trimmed.slice(eqIdx + 1).trim()
    if (k && !(k in process.env)) process.env[k] = v
  }
} catch { /* confía en vars del entorno */ }

// ── 2. Cliente ──────────────────────────────────────────────────────────────
const token = process.env.SANITY_WRITE_TOKEN
if (!token || token === 'pega-aqui-tu-token-de-editor') {
  console.error('❌  Agrega SANITY_WRITE_TOKEN en .env antes de ejecutar este script.')
  process.exit(1)
}

const client = createClient({
  projectId:  process.env.PUBLIC_SANITY_PROJECT_ID ?? 'g6lpsvgv',
  dataset:    process.env.PUBLIC_SANITY_DATASET    ?? 'production',
  apiVersion: '2026-05-07',
  token,
  useCdn: false,
})

// ── 3. Reseñas ──────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id:    'review-camila-vela',
    name:  'Camila Vela',
    body:  'Excelente servicio, muy recomendado, el Dr. Daniel le hizo unos acompañamientos después de una cirugía a mi tía y realmente aprecio mucho la humanidad y preocupación genuina que muestran los profesionales.',
    order: 1,
  },
  {
    id:    'review-nathaly-galarza',
    name:  'Nathaly Galarza',
    body:  'Llevo más de 4 años siendo paciente de ODONTOMED y siempre ha sido una experiencia excelente. Cada vez que viajo a Quito aprovecho para venir aquí porque confío plenamente en su trabajo. Son profesionales muy amables, cuidadosos y siempre pendientes de sus pacientes.',
    order: 2,
  },
  {
    id:    'review-grace-kelly',
    name:  'Grace Kelly',
    body:  'El lugar es increíble, las instalaciones son de primera calidad. El manejo de pacientes es excelente, siempre me hacen sentir en casa. Hice mi ortodoncia y diseño aquí. Mi hijo recibe sus citas pediátricas, todo va de maravilla. ¡Recomendadísimo!',
    order: 3,
  },
  {
    id:    'review-daysi-vallejo',
    name:  'Daysi Vallejo',
    body:  'Excelente servicio, profesionales altamente capacitados y muy amables solventan todas tus inquietudes antes de iniciar cualquier tratamiento, dándote la seguridad que necesitas para ponerte en sus manos. Quedé encantada con mi tratamiento, mi diseño de sonrisa quedó muy natural. Recomendado al 100%.',
    order: 4,
  },
  {
    id:    'review-leo-duran',
    name:  'Leo Duran',
    body:  'I came from the US and found this place — they are very welcoming and attentive people. They did a great job informing me on what I had and explained the process very well. I highly recommend this place.',
    order: 5,
  },
  {
    id:    'review-luis-cabrera',
    name:  'Luis Cabrera',
    body:  'Excelente atención, excelentes profesionales, un servicio garantizado. Comencé el tratamiento con ellos desde la limpieza dental hasta ponerme tres implantes. Realmente la salud dental cambia la vida.',
    order: 6,
  },
] as const

// ── 4. Insertar ─────────────────────────────────────────────────────────────
async function seed() {
  console.log('Insertando reseñas (6 documentos)...')
  for (const r of REVIEWS) {
    await client.createOrReplace({
      _id:   r.id,
      _type: 'review',
      name:  r.name,
      body:  r.body,
      order: r.order,
    })
    console.log(`  ✓ ${r.name}`)
  }
  console.log('\n✅  seed-reviews completado. Agrega las fotos manualmente desde Sanity Studio.')
}

seed().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
