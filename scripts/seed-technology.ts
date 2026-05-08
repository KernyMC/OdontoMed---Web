/**
 * seed-technology.ts
 * Inserta los 4 techGroup y 15 techItem de src/data/technology.ts en Sanity.
 *
 * Uso:
 *   npx tsx scripts/seed-technology.ts
 *
 * Requiere SANITY_WRITE_TOKEN en .env (token con permisos de Editor).
 * Es idempotente: ejecutar varias veces no duplica documentos.
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
} catch {
  // Si no hay .env, confía en las vars del entorno
}

// ── 2. Cliente Sanity con token de escritura ────────────────────────────────
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

// ── 3. Datos de grupos ──────────────────────────────────────────────────────
const GROUPS = [
  {
    key:      'radiografia',
    label:    'Radiografías',
    desc:     'Imágenes diagnósticas de alta definición para evaluar dientes, hueso y estructuras craneofaciales con mínima exposición radiactiva.',
    ctaLabel: 'Ver estudios',
    anchor:   'tech-rx',
    order:    1,
  },
  {
    key:      'tomografia',
    label:    'Tomografías',
    desc:     'Reconstrucción tridimensional de estructuras óseas y dentales para planificación quirúrgica e implantológica de precisión milimétrica.',
    ctaLabel: 'Ver estudios',
    anchor:   'tech-tomo',
    order:    2,
  },
  {
    key:      'digital',
    label:    'Tecnología Digital',
    desc:     'Escáneres y software CAD/CAM para diseño de sonrisa, impresiones sin moldes y fabricación de prótesis a medida con ajuste superior.',
    ctaLabel: 'Ver equipos',
    anchor:   'tech-digital',
    order:    3,
  },
  {
    key:      'laboratorio',
    label:    'Laboratorio & Cardiología',
    desc:     'Diagnóstico médico integral: análisis clínicos completos y estudio de la actividad cardíaca sin salir de la clínica.',
    ctaLabel: 'Ver servicios',
    anchor:   'tech-lab',
    order:    4,
  },
] as const

// ── 4. Datos de ítems ───────────────────────────────────────────────────────
const ITEMS = [
  // Radiografías
  {
    slug: 'rx-periapical',
    title: 'Radiografía Periapical',
    group: 'radiografia',
    desc: 'Muestra la totalidad del diente —corona, raíz y hueso circundante— para detectar infecciones, fracturas y lesiones periapicales.',
    order: 1,
  },
  {
    slug: 'rx-panoramica',
    title: 'Radiografía Panorámica',
    group: 'radiografia',
    desc: 'Imagen completa de mandíbula, maxilares, todos los dientes y la articulación temporomandibular en una sola toma.',
    order: 2,
  },
  {
    slug: 'rx-lateral-craneo',
    title: 'Radiografía Lateral de Cráneo',
    group: 'radiografia',
    desc: 'Perfil óseo del cráneo para análisis cefalométrico en ortodoncia y planificación de cirugía maxilofacial.',
    order: 3,
  },
  {
    slug: 'condilografia',
    title: 'Condilografía Boca Abierta / Cerrada',
    group: 'radiografia',
    desc: 'Estudio de la articulación temporomandibular en movimiento para diagnóstico preciso de disfunciones de la ATM.',
    order: 4,
  },
  {
    slug: 'rx-senos',
    title: 'Radiografía de Senos Paranasales',
    group: 'radiografia',
    desc: 'Visualización de las cavidades sinusales para diagnóstico de infecciones, pólipos y alteraciones anatómicas de impacto dental.',
    order: 5,
  },
  {
    slug: 'rx-carpal',
    title: 'Radiografía Carpal',
    group: 'radiografia',
    desc: 'Determina la edad ósea del paciente para planificar el momento óptimo del tratamiento de ortodoncia en niños y adolescentes.',
    order: 6,
  },
  {
    slug: 'cefalometria',
    title: 'Cefalometrías',
    group: 'radiografia',
    desc: 'Análisis digital de proporciones craneofaciales para planificación de ortodoncia, cirugía ortognática y diseño de sonrisa.',
    order: 7,
  },

  // Tomografías
  {
    slug: 'tomo-dental',
    title: 'Tomografía Dental',
    group: 'tomografia',
    desc: 'Imagen tridimensional de alta resolución de dientes y tejidos de soporte para planificación precisa de implantes y cirugías.',
    order: 1,
  },
  {
    slug: 'tomo-maxilares',
    title: 'Tomografía de Maxilares',
    group: 'tomografia',
    desc: 'Estudio volumétrico completo de ambos maxilares para evaluación ósea previa a implantología y cirugía ortognática.',
    order: 2,
  },
  {
    slug: 'tomo-macizo-facial',
    title: 'Tomografía de Macizo Facial',
    group: 'tomografia',
    desc: 'Análisis tridimensional de toda la región facial: senos, órbitas, ATM y estructuras óseas del tercio medio facial.',
    order: 3,
  },

  // Tecnología Digital
  {
    slug: 'scanner-facial',
    title: 'Scáner Facial',
    group: 'digital',
    desc: 'Captura tridimensional del rostro para planificación estética, diseño de sonrisa digital y fabricación de prótesis a medida.',
    order: 1,
  },
  {
    slug: 'scanner-intraoral',
    title: 'Scáner Intraoral',
    group: 'digital',
    desc: 'Digitalización de la arcada dental sin impresiones convencionales, para fabricar coronas, alineadores y prótesis con mayor precisión.',
    order: 2,
  },
  {
    slug: 'protesis-digital',
    title: 'Diseño Digital para Prótesis',
    group: 'digital',
    desc: 'Diseño CAD/CAM y fresado de prótesis de alta precisión, con ajuste superior al método convencional y tiempos de entrega reducidos.',
    order: 3,
  },

  // Laboratorio & Cardiología
  {
    slug: 'laboratorio',
    title: 'Laboratorio Clínico',
    group: 'laboratorio',
    desc: 'Análisis de sangre, orina y otros fluidos para diagnóstico, monitoreo de enfermedades crónicas y evaluación preoperatoria.',
    order: 1,
  },
  {
    slug: 'ecg',
    title: 'Electrocardiógrafo (ECG)',
    group: 'laboratorio',
    desc: 'Registro de la actividad eléctrica del corazón para detección de arritmias, evaluación cardiovascular y certificado médico.',
    order: 2,
  },
] as const

// ── 5. Insertar ─────────────────────────────────────────────────────────────
async function seed() {
  console.log('Insertando techGroup (4 documentos)...')
  for (const g of GROUPS) {
    const doc = {
      _id:      `techGroup-${g.key}`,
      _type:    'techGroup',
      key:      g.key,
      label:    g.label,
      desc:     g.desc,
      ctaLabel: g.ctaLabel,
      anchor:   g.anchor,
      order:    g.order,
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ techGroup: ${g.label}`)
  }

  console.log('\nInsertando techItem (15 documentos)...')
  for (const item of ITEMS) {
    const doc = {
      _id:   `techItem-${item.slug}`,
      _type: 'techItem',
      title: item.title,
      slug:  { _type: 'slug', current: item.slug },
      group: item.group,
      desc:  item.desc,
      order: item.order,
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ techItem: ${item.title}`)
  }

  console.log('\n✅  seed-technology completado. Publica los borradores desde Sanity Studio.')
}

seed().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
