/**
 * seed-specialists.ts
 * Inserta los 5 especialistas de Odontomed en Sanity.
 *
 * Uso:
 *   npx tsx scripts/seed-specialists.ts
 *
 * Requiere SANITY_WRITE_TOKEN en .env.
 * Las fotos, especialidad y descripción se agregan desde Sanity Studio.
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@sanity/client'

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

const SPECIALISTS = [
  { id: 'specialist-mireya-vallejo',   name: 'Dra. Mireya Vallejo',   order: 1 },
  { id: 'specialist-daniel-cifuentes', name: 'Dr. Daniel Cifuentes',  order: 2 },
  { id: 'specialist-carlos-canizares', name: 'Dr. Carlos Cañizares',  order: 3 },
  { id: 'specialist-esteban-sotelo',   name: 'Dr. Esteban Sotelo',    order: 4 },
  { id: 'specialist-arturo-canizares', name: 'Dr. Arturo Cañizares',  order: 5 },
] as const

async function seed() {
  console.log('Insertando especialistas (5 documentos)...')
  for (const s of SPECIALISTS) {
    await client.createOrReplace({
      _id:       s.id,
      _type:     'specialist',
      name:      s.name,
      specialty: '',
    })
    console.log(`  ✓ ${s.name}`)
  }
  console.log('\n✅  seed-specialists completado.')
  console.log('    Agrega foto, especialidad y descripción desde Sanity Studio → Especialistas.')
}

seed().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
