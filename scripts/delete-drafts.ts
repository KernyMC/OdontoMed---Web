/**
 * delete-drafts.ts
 * Borra todos los drafts de servicios y posts que se subieron.
 *
 * Uso:
 *   npx tsx scripts/delete-drafts.ts
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { createClient } from '@sanity/client'

// ── Cargar .env ──────────────────────────────────────────────────────────
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
} catch {
  // Si no encuentra .env, confía en las vars del entorno
}

// ── Cliente con token de escritura ───────────────────────────────────────
const token = process.env.SANITY_WRITE_TOKEN
if (!token || token === 'pega-aqui-tu-token-de-editor') {
  console.error('❌  Agrega SANITY_WRITE_TOKEN en .env antes de ejecutar este script.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? 'g6lpsvgv',
  dataset:   process.env.PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2026-04-14',
  token,
  useCdn: false,
})

// ── IDs a borrar ─────────────────────────────────────────────────────────
const serviceSlugs = [
  'odontologia-general',
  'ortodoncia',
  'endodoncia',
  'odontopediatria',
  'cirugia-maxilofacial-terceros-molares',
  'cirugia-implantes-dentales',
  'cirugia-ortognatica',
  'medicina-general',
  'nutricion-diabetologia',
  'fisioterapia',
  'psicologia',
  'laboratorio-clinico',
  'pediatria',
]

const postSlugs = [
  'futuro-carillas-porcelana',
  'mitos-blanqueamiento-dental',
  'importancia-revisiones-dentales',
]

// ── Borrar drafts ────────────────────────────────────────────────────────
async function run() {
  console.log(`Borrando drafts de servicios y posts…\n`)

  const tx = client.transaction()

  // Borrar servicios
  for (const slug of serviceSlugs) {
    const draftId = `drafts.service-${slug}`
    tx.delete(draftId)
    console.log(`  ✗  ${draftId}`)
  }

  // Borrar posts
  for (const slug of postSlugs) {
    const draftId = `drafts.post-${slug}`
    tx.delete(draftId)
    console.log(`  ✗  ${draftId}`)
  }

  await tx.commit()
  console.log(`\n¡${serviceSlugs.length + postSlugs.length} drafts eliminados!`)
}

run().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
