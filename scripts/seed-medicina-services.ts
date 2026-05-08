/**
 * seed-medicina-services.ts
 * Inserta los servicios de Sedación y Cardiología en Sanity.
 *
 * Uso:
 *   npx tsx scripts/seed-medicina-services.ts
 *
 * Requiere SANITY_WRITE_TOKEN en .env.
 * Agrega imagen, body, beneficios y especialistas desde Sanity Studio.
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

const SERVICES = [
  {
    _id:      'service-sedacion',
    _type:    'service',
    title:    'Sedación Consciente',
    slug:     { _type: 'slug', current: 'sedacion' },
    category: 'Sedación',
    group:    'medicina',
    desc:     'Tratamientos dentales sin ansiedad ni dolor. La sedación consciente te permite relajarte completamente mientras nuestros especialistas trabajan con total comodidad.',
    order:    20,
    whyUs:    'Contamos con médico anestesiólogo certificado y monitoreo continuo de signos vitales durante todo el procedimiento. Tu seguridad es nuestra prioridad.',
    body: [
      block('h1', '¿Qué es la sedación consciente?', 'h2'),
      block('p1', 'La sedación consciente es una técnica médica que utiliza medicamentos para reducir la ansiedad y el miedo al dentista, permitiéndote mantenerte despierto pero completamente relajado durante el tratamiento. Es ideal para pacientes con fobia dental, procedimientos largos o casos que requieren máxima concentración del especialista.'),
      block('h2', '¿Quiénes pueden beneficiarse?', 'h2'),
      block('p2', 'Es especialmente recomendada para pacientes con ansiedad dental severa, niños que requieren procedimientos complejos, adultos con reflejo de náuseas pronunciado o quienes necesitan realizar varios tratamientos en una sola sesión.'),
      block('h3', 'El procedimiento paso a paso', 'h2'),
      block('p3', 'Antes de comenzar, el médico anestesiólogo realiza una evaluación completa de tu estado de salud. Durante el tratamiento se monitorean continuamente la presión arterial, frecuencia cardíaca y saturación de oxígeno. Al terminar, permaneces en observación hasta estar completamente recuperado.'),
    ],
    benefits: [
      { _key: 'b1', title: 'Sin ansiedad ni miedo',     description: 'Tratamiento completamente relajado y sin estrés.' },
      { _key: 'b2', title: 'Médico especializado',      description: 'Anestesiólogo certificado presente en todo momento.' },
      { _key: 'b3', title: 'Monitoreo continuo',        description: 'Control de signos vitales durante todo el procedimiento.' },
      { _key: 'b4', title: 'Recuperación rápida',       description: 'Efecto temporal, retomas tu actividad el mismo día.' },
    ],
  },
  {
    _id:      'service-cardiologia',
    _type:    'service',
    title:    'Cardiología',
    slug:     { _type: 'slug', current: 'cardiologia' },
    category: 'Cardiología',
    group:    'medicina',
    desc:     'Evaluación cardiovascular completa antes de procedimientos odontológicos. Garantizamos que tu corazón esté en óptimas condiciones para cualquier tratamiento dental.',
    order:    21,
    whyUs:    'Nuestro cardiólogo trabaja en coordinación directa con los especialistas dentales, garantizando protocolos seguros para pacientes con condiciones cardiovasculares.',
    body: [
      block('h1', '¿Por qué necesitas una evaluación cardiológica?', 'h2'),
      block('p1', 'Muchos procedimientos odontológicos requieren anestesia local o sedación, lo que puede tener efectos sobre el sistema cardiovascular. Una evaluación previa por nuestro cardiólogo garantiza que el tratamiento dental sea completamente seguro para ti, especialmente si tienes historial de enfermedades del corazón, hipertensión o estás tomando anticoagulantes.'),
      block('h2', '¿Qué incluye la evaluación?', 'h2'),
      block('p2', 'La consulta cardiológica incluye electrocardiograma, toma de presión arterial, análisis de medicación actual y emisión de certificado de aptitud para procedimiento dental. En caso necesario se coordina con tu cardiólogo de cabecera para garantizar la continuidad de tu tratamiento.'),
      block('h3', 'Coordinación integral con tu tratamiento dental', 'h2'),
      block('p3', 'El valor diferencial de Odontomed es la comunicación directa entre el cardiólogo y el odontólogo. Esto permite ajustar protocolos de anestesia, medicación y tiempos de procedimiento según tu perfil cardiovascular, maximizando la seguridad y la eficacia del tratamiento.'),
    ],
    benefits: [
      { _key: 'b1', title: 'Certificado de aptitud',    description: 'Apto para procedimiento dental con respaldo médico.' },
      { _key: 'b2', title: 'Coordinación integral',     description: 'Cardiólogo y dentista trabajan juntos por tu seguridad.' },
      { _key: 'b3', title: 'Electrocardiograma',        description: 'Evaluación completa antes de cualquier intervención.' },
      { _key: 'b4', title: 'Pacientes de alto riesgo',  description: 'Experiencia en hipertensión, anticoagulantes y marcapasos.' },
    ],
  },
]

async function seed() {
  console.log('Insertando servicios de Medicina (2 documentos)...')
  for (const service of SERVICES) {
    await client.createOrReplace(service)
    console.log(`  ✓ ${service.title}`)
  }
  console.log('\n✅  seed-medicina-services completado.')
  console.log('    Agrega imagen y especialistas desde Sanity Studio → Servicios.')
}

seed().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
