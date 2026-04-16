/**
 * seed-posts.ts
 * Sube los 3 artículos de src/data/articles.ts a Sanity como borradores,
 * convirtiendo las secciones HTML al formato Portable Text del schema de post.
 *
 * Uso:
 *   npx tsx scripts/seed-posts.ts
 *
 * Requiere SANITY_WRITE_TOKEN en .env (token con permisos de Editor).
 * Es idempotente: ejecutar varias veces no duplica documentos.
 */

import { readFileSync } from 'fs'
import { join }         from 'path'
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
} catch {}

// ── 2. Cliente con token de escritura ───────────────────────────────────────
const token = process.env.SANITY_WRITE_TOKEN
if (!token || token === 'pega-aqui-tu-token-de-editor') {
  console.error('❌  Agrega SANITY_WRITE_TOKEN en .env antes de ejecutar este script.')
  process.exit(1)
}

const client = createClient({
  projectId:  process.env.PUBLIC_SANITY_PROJECT_ID ?? 'g6lpsvgv',
  dataset:    process.env.PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2026-04-14',
  token,
  useCdn: false,
})

// ── 3. Utilidades de conversión ──────────────────────────────────────────────

let _keyN = 0
const uid = (prefix = 'k') => `${prefix}${++_keyN}`

/** Elimina todas las etiquetas HTML y retorna texto plano. */
function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

/** Convierte un fragmento HTML simple a spans de Portable Text.
 *  Soporta <strong> y <em>; el resto se stripea. */
function htmlToSpans(html: string): PTSpan[] {
  const spans: PTSpan[] = []
  // Dividir en tokens: <strong>…</strong>, <em>…</em> o texto plano
  const tokenRe = /(<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|[^<]+)/gi
  let match: RegExpExecArray | null
  while ((match = tokenRe.exec(html)) !== null) {
    if (match[2] !== undefined) {
      // <strong>
      const text = stripTags(match[2])
      if (text) spans.push({ _type: 'span', _key: uid('s'), text, marks: ['strong'] })
    } else if (match[3] !== undefined) {
      // <em>
      const text = stripTags(match[3])
      if (text) spans.push({ _type: 'span', _key: uid('s'), text, marks: ['em'] })
    } else {
      // texto plano (puede tener otras etiquetas residuales)
      const text = stripTags(match[0])
      if (text) spans.push({ _type: 'span', _key: uid('s'), text, marks: [] })
    }
  }
  return spans.length ? spans : [{ _type: 'span', _key: uid('s'), text: stripTags(html), marks: [] }]
}

type PTSpan = { _type: 'span'; _key: string; text: string; marks: string[] }
type PTBlock = {
  _type: 'block'; _key: string; style: string
  children: PTSpan[]; markDefs: []; listItem?: string; level?: number
}

/** Convierte una cadena HTML de párrafos (<p>…</p>) a bloques PT. */
function htmlToPtBlocks(html: string, style = 'normal'): PTBlock[] {
  // Separar por </p> y limpiar la etiqueta <p> de apertura
  const paras = html
    .split(/<\/p>/i)
    .map(p => p.replace(/<p[^>]*>/i, '').trim())
    .filter(Boolean)

  return paras.map(p => ({
    _type:    'block',
    _key:     uid('b'),
    style,
    children: htmlToSpans(p),
    markDefs: [] as [],
  }))
}

/** Crea un bloque de título H2 con texto plano. */
function h2Block(text: string): PTBlock {
  return {
    _type:    'block',
    _key:     uid('h'),
    style:    'h2',
    children: [{ _type: 'span', _key: uid('s'), text, marks: [] }],
    markDefs: [],
  }
}

/** Crea un bloque de lista con viñetas. */
function bulletBlock(text: string): PTBlock {
  return {
    _type:     'block',
    _key:      uid('l'),
    style:     'normal',
    listItem:  'bullet',
    level:     1,
    children:  [{ _type: 'span', _key: uid('s'), text: stripTags(text), marks: [] }],
    markDefs:  [],
  }
}

/** Convierte la fecha "12 Mar 2026" → ISO string. */
const MONTHS: Record<string, number> = {
  Ene: 0, Feb: 1, Mar: 2, Abr: 3, May: 4, Jun: 5,
  Jul: 6, Ago: 7, Sep: 8, Oct: 9, Nov: 10, Dic: 11,
}
function parseDate(str: string): string {
  const [d, m, y] = str.split(' ')
  return new Date(parseInt(y), MONTHS[m] ?? 0, parseInt(d)).toISOString()
}

// ── 4. Datos de artículos ────────────────────────────────────────────────────

const articles = [
  {
    slug:     'futuro-carillas-porcelana',
    title:    'El futuro de las carillas de porcelana',
    category: 'Cosmética',
    date:     '12 Mar 2026',
    readTime: '5 min',
    featured: true,
    excerpt:  'Descubre cómo la tecnología 3D y los nuevos materiales están revolucionando el diseño de sonrisa, logrando resultados 100% naturales en tiempo récord.',
    intro:    'El mundo de la odontología estética ha avanzado a pasos agigantados en la última década. Lo que antes requería procedimientos invasivos y largas semanas de espera, hoy se puede lograr con una precisión milimétrica, materiales ultrarresistentes y un enfoque mínimamente invasivo.',
    quote:    'El verdadero arte de la odontología cosmética es crear una sonrisa que nadie sepa que fue diseñada en un consultorio.',
    sections: [
      {
        heading: '1. La evolución de la estética dental',
        body: `<p>La tecnología digital ha revolucionado nuestra forma de trabajar. Ahora, mediante escáneres intraorales 3D, podemos predecir el resultado final antes de tocar un solo diente. Esto se conoce como Diseño de Sonrisa Digital (DSD), una herramienta que nos permite tomar decisiones conjuntas sobre la forma, tamaño y color ideal.</p>
<p>En nuestra clínica en el Valle de los Chillos, hemos notado un incremento masivo en pacientes que buscan resultados naturales. Hoy, la tendencia es la armonía facial: dientes que reflejen la luz como el esmalte natural, con microtexturas y transparencias en los bordes incisales.</p>`,
      },
      {
        heading: '2. ¿Para quién son ideales?',
        body: '<p>Las carillas son extremadamente versátiles. Se recomiendan especialmente para pacientes con:</p>',
        list: [
          'Manchas severas que no responden al blanqueamiento convencional.',
          'Ligeros apiñamientos o diastemas (espacios) entre los dientes.',
          'Desgaste del esmalte por bruxismo o envejecimiento natural.',
          'Fracturas o astillamientos menores sin compromiso pulpar.',
        ],
      },
      {
        heading: '3. El proceso paso a paso',
        body: `<p>El procedimiento moderno requiere un tallado mínimo del diente natural — en muchos casos inferior a 0.5 mm. En solo dos o tres citas, pasamos del escaneo inicial a la cementación definitiva. Utilizamos resinas de alta estética o disilicato de litio (porcelana de última generación) para una durabilidad insuperable que no pierde su brillo con los años.</p>
<p>La primera cita es diagnóstica: tomamos fotografías, escaneamos la boca y diseñamos digitalmente el resultado. La segunda cita es la preparación y toma de impresión para el laboratorio. En la tercera, cementamos definitivamente y ajustamos la oclusión.</p>`,
      },
      {
        heading: '4. Cuidados y mantenimiento',
        body: `<p>El mantenimiento es tan sencillo como cuidar tus dientes naturales: cepillado suave con pasta no abrasiva, hilo dental diario y control semestral en clínica. Recomendamos evitar morder objetos duros (hielo, lapiceros) y usar una férula nocturna si hay bruxismo.</p>
<p>Siguiendo estas indicaciones, tu inversión durará más de una década con el mismo aspecto del primer día. En Odontomed realizamos el seguimiento de por vida de todos nuestros trabajos estéticos.</p>`,
      },
    ],
  },

  {
    slug:     'mitos-blanqueamiento-dental',
    title:    'Mitos sobre el blanqueamiento dental',
    category: 'Salud Dental',
    date:     '28 Feb 2026',
    readTime: '4 min',
    featured: false,
    excerpt:  'Desmentimos las creencias más comunes sobre el blanqueamiento y te explicamos cómo lograr una sonrisa brillante de forma segura.',
    intro:    'El blanqueamiento dental es uno de los tratamientos más solicitados en odontología estética, y también uno de los más rodeados de mitos. Desde que "destruye el esmalte" hasta que "los resultados son permanentes", las creencias erróneas generan dudas y pueden llevar a decisiones equivocadas. Los aclaramos con evidencia clínica.',
    quote:    'Un diente blanco saludable es aquel cuyo tono armoniza con la piel y la esclerótica del ojo. El objetivo no es la blancura extrema, sino la naturalidad.',
    sections: [
      {
        heading: '1. Los mitos más extendidos',
        body: `<p><strong>Mito #1: "El blanqueamiento destruye el esmalte".</strong> Falso. Los geles de peróxido de hidrógeno o peróxido de carbamida, usados en concentraciones correctas y bajo supervisión profesional, no erosionan el esmalte. Lo que pueden generar de forma temporal es sensibilidad, que desaparece en 48-72 horas.</p>
<p><strong>Mito #2: "El bicarbonato blanquea igual que un tratamiento profesional".</strong> Falso. El bicarbonato es un abrasivo suave que elimina pigmentos superficiales, pero no penetra en el esmalte para modificar el color intrínseco del diente. Su uso excesivo sí puede erosionarlo.</p>
<p><strong>Mito #3: "Los resultados duran para siempre".</strong> Falso. Los resultados duran entre 1 y 3 años según hábitos alimenticios. Café, té, vino tinto y tabaco son los principales agentes de re-pigmentación.</p>`,
      },
      {
        heading: '2. ¿El blanqueamiento daña el esmalte?',
        body: `<p>La respuesta es no, cuando se realiza de forma profesional y supervisada. Los estudios clínicos confirman que los tratamientos de blanqueamiento controlados por un odontólogo son seguros para el esmalte dental. La clave está en la concentración del agente blanqueante y el tiempo de aplicación.</p>
<p>En Odontomed aplicamos geles desensibilizantes después de cada sesión y espaciamos los tratamientos adecuadamente. Los únicos riesgos reales son:</p>`,
        list: [
          'Sensibilidad temporal (2-3 días): normal y esperable, no indica daño.',
          'Blanqueamiento desigual en restauraciones: resinas y coronas no cambian de color.',
          'Sobreuso casero sin supervisión: el único escenario donde puede haber daño real.',
        ],
      },
      {
        heading: '3. Tipos de blanqueamiento disponibles',
        body: `<p><strong>Blanqueamiento en clínica:</strong> Usa concentraciones de peróxido de hidrógeno del 25-40%, activadas con luz LED de alta potencia. Los resultados son visibles en una sola sesión de 60-90 minutos: entre 4 y 8 tonos más claro. Es la opción más rápida.</p>
<p><strong>Blanqueamiento domiciliario supervisado:</strong> Usa cubetas personalizadas fabricadas en clínica y geles de menor concentración (10-16% peróxido de carbamida) que se aplican durante 2-4 semanas por las noches. Los resultados son similares pero más graduales, con menor riesgo de sensibilidad. Ideal para personas con dientes sensibles.</p>
<p>En muchos casos recomendamos combinar ambos: comenzar en clínica y consolidar con el kit domiciliario.</p>`,
      },
      {
        heading: '4. Cómo mantener los resultados',
        body: `<p>Para prolongar al máximo los resultados del blanqueamiento: cepillarse con pasta blanqueadora de mantenimiento (sin abrasivos agresivos), reducir el consumo de alimentos pigmentantes y enjuagarse la boca con agua después de tomar café o té.</p>
<p>Recomendamos una sesión de mantenimiento en clínica una vez al año. El blanqueamiento domiciliario supervisado es ideal para esto: económico, cómodo y sin riesgos cuando se realizan con los materiales que indicamos en la clínica.</p>`,
      },
    ],
  },

  {
    slug:     'importancia-revisiones-dentales',
    title:    'Por qué las revisiones dentales importan más que nunca',
    category: 'Prevención',
    date:     '15 Ene 2026',
    readTime: '6 min',
    featured: false,
    excerpt:  'La odontología preventiva es la clave para evitar tratamientos costosos. Descubre qué evaluamos en tu control semestral.',
    intro:    'La odontología preventiva es, por definición, la más rentable. Un control semestral puede evitar endodoncias, implantes y cirugías. Sin embargo, muchos pacientes adultos visitan al dentista solo cuando sienten dolor. Eso, en casi todos los casos, ya es demasiado tarde.',
    quote:    'El dolor dental no es el inicio de un problema: es la señal de que el problema ya lleva meses, o años, desarrollándose en silencio.',
    sections: [
      {
        heading: '1. La prevención como inversión real',
        body: `<p>Los estudios en salud oral son consistentes: cada dólar invertido en prevención ahorra entre 8 y 50 dólares en tratamientos restaurativos. Una caries detectada en estadio inicial se resuelve con una obturación simple. Si se descubre al llegar a la pulpa, requiere una endodoncia. Si ya afectó el hueso, puede necesitar extracción e implante.</p>
<p>La diferencia entre estas dos realidades es, frecuentemente, una revisión semestral que se postergó un año de más. En Odontomed, desde 1976, hemos visto esta diferencia en miles de pacientes del Valle de los Chillos. La inversión en prevención no es un gasto: es la decisión financiera y de salud más inteligente que puedes tomar para tu boca.</p>`,
      },
      {
        heading: '2. ¿Qué evaluamos en tu control semestral?',
        body: '<p>Una revisión completa en Odontomed no es solo comprobar si hay caries. Incluye una evaluación sistemática de múltiples aspectos de tu salud oral:</p>',
        list: [
          'Tejidos blandos: encías, lengua, paladar y mucosas para detectar signos de enfermedad periodontal o lesiones premalignas.',
          'Evaluación oclusal: cómo muerdes y si hay signos de bruxismo (apretamiento nocturno de dientes).',
          'Registro fotográfico y radiografías periapicales selectivas cuando son necesarias.',
          'Profilaxis profesional: limpieza para eliminar el sarro que el cepillo no alcanza.',
          'Estado de restauraciones previas y seguimiento de aparatos ortodónticos.',
        ],
      },
      {
        heading: '3. Señales de alerta que no debes ignorar',
        body: '<p>Aunque los controles regulares son la mejor herramienta preventiva, existen síntomas que no deben esperar a la próxima cita programada. Consulta de urgencia si presentas:</p>',
        list: [
          'Sensibilidad al frío o calor que dura más de 10 segundos después de retirar el estímulo.',
          'Sangrado de encías al cepillarte, aunque sea ocasional.',
          'Movilidad de algún diente sin haber sufrido un golpe.',
          'Manchas blancas, rojas o úlceras en la boca que no sanan en 2 semanas.',
          'Dolor al morder o masticar localizado en un lado específico.',
        ],
      },
      {
        heading: '4. La frecuencia ideal de tus controles',
        body: `<p>La recomendación estándar es una revisión cada 6 meses para adultos y niños. Algunos perfiles requieren mayor frecuencia: pacientes con enfermedad periodontal activa cada 3-4 meses; pacientes con diabetes (directamente relacionada con la salud periodontal); y niños en etapa de dentición mixta, cuando conviven dientes de leche y permanentes.</p>
<p>Si no recuerdas cuándo fue tu última revisión, esa ya es la señal. En Odontomed ofrecemos una evaluación inicial sin costo para que conozcas el estado real de tu salud oral sin ningún compromiso.</p>`,
      },
    ],
  },
]

// ── 5. Convertir secciones → Portable Text body ──────────────────────────────
function sectionsToBody(sections: typeof articles[0]['sections']): PTBlock[] {
  const blocks: PTBlock[] = []
  for (const section of sections) {
    // H2 con el título de la sección
    blocks.push(h2Block(section.heading))
    // Párrafos del cuerpo
    blocks.push(...htmlToPtBlocks(section.body))
    // Lista con viñetas (si existe)
    if (section.list) {
      for (const item of section.list) {
        blocks.push(bulletBlock(item))
      }
    }
  }
  return blocks
}

// ── 6. Subir como borradores ─────────────────────────────────────────────────
async function run() {
  console.log(`Subiendo ${articles.length} artículos a Sanity como borradores…\n`)

  const tx = client.transaction()

  for (const a of articles) {
    const draftId = `drafts.post-${a.slug}`
    const body    = sectionsToBody(a.sections)

    tx.createOrReplace({
      _id:   draftId,
      _type: 'post',
      title:       a.title,
      slug:        { _type: 'slug', current: a.slug },
      category:    a.category,
      featured:    a.featured,
      readTime:    a.readTime,
      excerpt:     a.excerpt,
      intro:       a.intro,
      quote:       a.quote,
      publishedAt: parseDate(a.date),
      body,
      // image: null — agregar manualmente en Studio
    })

    console.log(`  ✓  ${a.title}  →  ${draftId}`)
  }

  await tx.commit()
  console.log('\n¡Posts subidos! Ábrelos en Sanity Studio, agrega imágenes de portada y publica.')
}

run().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
