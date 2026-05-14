/**
 * seed-cosmetologia.ts
 * Inserta el servicio de Cosmetología en Sanity (grupo: medicina).
 *
 * Uso:
 *   npx tsx scripts/seed-cosmetologia.ts
 *
 * Requiere SANITY_WRITE_TOKEN en .env.
 * Agrega la foto del servicio desde Sanity Studio → Servicios → Cosmetología.
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
  apiVersion: '2026-05-08',
  token,
  useCdn: false,
})

function block(key: string, text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
  }
}

const SERVICE = {
  _id:      'service-cosmetologia',
  _type:    'service',
  title:    'Cosmetología',
  slug:     { _type: 'slug', current: 'cosmetologia' },
  category: 'Cosmetología',
  group:    'medicina',
  desc:     'Tratamientos estéticos faciales y corporales respaldados por profesionales de la salud. Recupera la vitalidad de tu piel con procedimientos seguros y resultados visibles.',
  order:    22,
  // imagen: agrégala desde Sanity Studio → Servicios → Cosmetología → campo "Foto"
  whyUs:    'Nuestros cosmetólogos trabajan en conjunto con el equipo médico de Odontomed, garantizando procedimientos estéticos con criterio clínico y los más altos estándares de seguridad.',
  body: [
    block('h1', '¿Qué es la cosmetología médica?', 'h2'),
    block('p1', 'La cosmetología médica combina conocimiento clínico con técnicas estéticas avanzadas para tratar y mejorar la apariencia de la piel. En Odontomed aplicamos tratamientos faciales y corporales supervisados por profesionales de la salud, lo que garantiza resultados seguros y duraderos.'),
    block('h2', 'Tratamientos disponibles', 'h2'),
    block('p2', 'Ofrecemos limpieza facial profunda, hidratación intensiva, tratamiento de manchas y acné, radiofrecuencia, mesoterapia facial y procedimientos de rejuvenecimiento. Cada protocolo se personaliza según el tipo de piel y los objetivos del paciente.'),
    block('h3', 'Un enfoque integral de la salud y la estética', 'h2'),
    block('p3', 'Creemos que el bienestar va de la mano con la confianza en uno mismo. Nuestro equipo evalúa tu piel, define un plan de tratamiento y hace seguimiento de los resultados para que cada sesión te acerque a la versión más saludable de ti.'),
  ],
  benefits: [
    { _key: 'b1', title: 'Supervisión médica',        description: 'Procedimientos estéticos con respaldo clínico certificado.' },
    { _key: 'b2', title: 'Tratamientos personalizados', description: 'Protocolo diseñado según tu tipo de piel y objetivos.' },
    { _key: 'b3', title: 'Tecnología de vanguardia',  description: 'Equipos modernos para resultados visibles y seguros.' },
    { _key: 'b4', title: 'Enfoque integral',           description: 'Salud y estética de la mano en un solo centro médico.' },
  ],
}

async function seed() {
  console.log('Insertando servicio: Cosmetología...')
  await client.createOrReplace(SERVICE)
  console.log('  ✓ Cosmetología')
  console.log('\n✅  seed-cosmetologia completado.')
  console.log('    Agrega la foto desde Sanity Studio → Servicios → Cosmetología → campo "Foto".')
}

seed().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
