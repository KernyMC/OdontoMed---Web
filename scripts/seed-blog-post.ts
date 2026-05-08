/**
 * seed-blog-post.ts
 * Inserta un artículo de prueba en Sanity (sin imágenes).
 *
 * Uso:
 *   npx tsx scripts/seed-blog-post.ts
 *
 * Requiere SANITY_WRITE_TOKEN en .env.
 * Publica el borrador desde Sanity Studio cuando esté listo.
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

function block(key: string, text: string, style = 'normal') {
  return {
    _type: 'block',
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${key}s`, text, marks: [] }],
  }
}

const post = {
  _id:   'post-prueba-higiene-dental',
  _type: 'post',
  title: '5 hábitos de higiene dental que deberías adoptar hoy',
  slug:  { _type: 'slug', current: '5-habitos-higiene-dental' },
  featured: false,
  category: 'Prevención',
  publishedAt: new Date('2026-05-01').toISOString(),
  readTime: '4 min',
  excerpt: 'Una buena rutina de higiene dental previene caries, enfermedad periodontal y hasta problemas cardíacos. Descubre los cinco hábitos que más impacto tienen en tu salud oral.',
  intro: 'La mayoría de los problemas dentales que tratamos en consulta tienen algo en común: son completamente prevenibles. Un cepillado correcto, el uso de hilo dental y visitas regulares pueden cambiar radicalmente la salud de tu boca y, con ella, tu calidad de vida.',
  quote: '"La boca es la puerta de entrada al organismo. Cuidarla es cuidar tu salud integral."',
  body: [
    block('h1', '1. Cepíllate con técnica, no solo con frecuencia', 'h2'),
    block('p1', 'Cepillarse dos o tres veces al día no es suficiente si la técnica es incorrecta. La técnica de Bass modificada —movimientos circulares pequeños en un ángulo de 45° hacia la encía— remueve la placa bacteriana de forma más efectiva que el cepillado horizontal que la mayoría aplica por inercia.'),
    block('p2', 'Usa un cepillo de cerdas suaves o medianas. Los cepillos duros erosionan el esmalte y lesionan las encías con el tiempo. Cambia tu cepillo cada tres meses o después de cualquier enfermedad respiratoria.'),

    block('h2', '2. El hilo dental no es opcional', 'h2'),
    block('p3', 'Entre el 35% y el 40% de la superficie dental no es accesible para el cepillo. El hilo dental —o el irrigador oral si tienes ortodoncia o implantes— es la única herramienta que limpia los espacios interdentales donde comienzan la mayoría de las caries y la enfermedad periodontal.'),
    block('p4', 'Úsalo una vez al día, preferiblemente antes de dormir. Si sangras al usar el hilo con regularidad, es señal de inflamación: visita a tu periodoncista, no dejes de usarlo.'),

    block('h3', '3. Cuida tu dieta más allá del azúcar', 'h2'),
    block('p5', 'El azúcar es el principal combustible de las bacterias cariogénicas, pero no es el único factor. Los alimentos ácidos —jugos cítricos, refrescos, vinagre— erosionan el esmalte directamente. Espera al menos 30 minutos después de consumirlos para cepillarte, de lo contrario arrastras el esmalte debilitado.'),
    block('p6', 'Aumenta el consumo de alimentos ricos en calcio y fósforo: lácteos, nueces, sardinas. Estimulan la remineralización natural del esmalte.'),

    block('h4', '4. No subestimes el enjuague bucal', 'h2'),
    block('p7', 'Un enjuague con flúor o clorhexidina (según lo indique tu dentista) llega a áreas que el cepillo y el hilo no alcanzan: la parte posterior de la lengua, las amígdalas, el paladar blando. Úsalo después del cepillado, nunca en su lugar.'),

    block('h5', '5. Agenda tu revisión cada seis meses', 'h2'),
    block('p8', 'Las revisiones periódicas permiten detectar caries incipientes, acumulación de sarro, signos tempranos de periodontitis y lesiones que el paciente no puede ver ni sentir. Un problema detectado a tiempo se resuelve con un sellador o una pequeña obturación; ignorado, puede requerir endodoncia o extracción.'),
    block('p9', 'En Odontomed realizamos diagnóstico digital completo —radiografías periapicales, panorámica si es necesaria— y una limpieza profesional en cada revisión. Agenda la tuya y mantén tu sonrisa saludable.'),
  ],
}

async function seed() {
  console.log('Insertando post de prueba...')
  await client.createOrReplace(post)
  console.log('  ✓ "5 hábitos de higiene dental que deberías adoptar hoy"')
  console.log('\n✅  seed-blog-post completado.')
  console.log('    Publica el borrador desde Sanity Studio y agrega imagen de portada si quieres.')
}

seed().catch((err) => {
  console.error('❌  Error:', err.message)
  process.exit(1)
})
