/**
 * seed-services.ts
 * Sube los 8 servicios de src/data/services.ts a Sanity como borradores.
 *
 * Uso:
 *   npx tsx scripts/seed-services.ts
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
  // Si no encuentra .env, confía en las vars del entorno
}

// ── 2. Cliente con token de escritura ───────────────────────────────────────
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

// ── 3. Datos de servicios ───────────────────────────────────────────────────
const services = [
  // ── ODONTOLOGÍA ──────────────────────────────────────────────────────────
  {
    slug: 'odontologia-general',
    title: 'Odontología General, Rehabilitación Oral y Estética Dental',
    category: 'Odontología Integral',
    group: 'odontologia', order: 1,
    desc: 'Tratamientos generales, rehabilitación completa y diseño estético de sonrisa con tecnología digital avanzada.',
    externalImageUrl: 'https://images.unsplash.com/photo-1598256989800-fea5f6c82738?q=80&w=800',
    whyUs: 'Contamos con profesionales altamente capacitados en odontología general integral que combinan técnicas tradicionales con tecnología digital de punta. Nuestro enfoque holístico garantiza resultados duraderos y sonrisas que transforman.',
    benefits: [
      { title: 'Diagnóstico digital avanzado', description: 'Radiografías 3D y planificación computarizada para máxima precisión' },
      { title: 'Restauraciones estéticas duraderas', description: 'Materiales de última generación que se adaptan perfectamente al color natural' },
      { title: 'Rehabilitación completa', description: 'Soluciones integrales para recuperar función y estética dental completa' },
      { title: 'Comodidad del paciente', description: 'Entorno moderno con anestesia avanzada y técnicas indoloras' },
    ]
  },

  {
    slug: 'ortodoncia',
    title: 'Ortodoncia',
    category: 'Odontología Correctiva',
    group: 'odontologia', order: 2,
    desc: 'Alineación de dientes con brackets tradicionales, estéticos, de porcelana y alineadores invisibles.',
    externalImageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800',
    whyUs: 'Somos especialistas en ortodoncia con años de experiencia en casos complejos. Ofrecemos múltiples opciones de tratamiento para adaptarse a tu estilo de vida y presupuesto.',
    benefits: [
      { title: 'Opciones personalizadas', description: 'Brackets metálicos, cerámicos, de zafiro o alineadores invisibles' },
      { title: 'Tratamientos más rápidos', description: 'Técnicas aceleradas que reducen el tiempo total del tratamiento' },
      { title: 'Estética durante el tratamiento', description: 'Opciones prácticamente invisibles si lo prefieres' },
      { title: 'Seguimiento digital', description: 'App de monitoreo para garantizar progreso óptimo' },
    ]
  },

  {
    slug: 'endodoncia',
    title: 'Endodoncia',
    category: 'Odontología Restaurativa',
    group: 'odontologia', order: 3,
    desc: 'Tratamiento de conductos radiculares con microscopio operatorio y técnicas de última generación.',
    externalImageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800',
    whyUs: 'Nuestros endodoncistas utilizan microscopios quirúrgicos de alta ampliación que garantizan la mayor precisión en el tratamiento de conductos. Salvamos dientes que otros podrían extraer.',
    benefits: [
      { title: 'Microscopio operatorio', description: 'Visión de hasta 25x aumentos para máxima precisión' },
      { title: 'Tasa de éxito superior', description: 'Más del 95% de éxito en tratamientos realizados' },
      { title: 'Una sola cita en casos simples', description: 'Tratamiento completo en algunos casos sin necesidad de múltiples visitas' },
      { title: 'Alivio inmediato del dolor', description: 'Técnicas que calman rápidamente la inflamación y el dolor' },
    ]
  },

  {
    slug: 'odontopediatria',
    title: 'Odontopediatría',
    category: 'Odontología Infantil',
    group: 'odontologia', order: 4,
    desc: 'Cuidado dental especializado para niños desde los primeros dientes hasta la adolescencia.',
    externalImageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800',
    whyUs: 'Pediatras dentales entrenados en el manejo del comportamiento infantil. Creamos experiencias positivas que establecen hábitos de salud oral de por vida.',
    benefits: [
      { title: 'Ambiente amigable y lúdico', description: 'Consultorio diseñado especialmente para que los niños se sientan cómodos' },
      { title: 'Control del miedo dental', description: 'Técnicas especializadas para niños ansiosos o con experiencias negativas previas' },
      { title: 'Educación en higiene oral', description: 'Enseñanza práctica de hábitos de cepillado y cuidado dental' },
      { title: 'Seguimiento del desarrollo', description: 'Monitoreo de erupción dental y desarrollo de la oclusión' },
    ]
  },

  {
    slug: 'cirugia-maxilofacial-terceros-molares',
    title: 'Cirugía de Terceros Molares',
    category: 'Cirugía Maxilofacial',
    group: 'odontologia', order: 5,
    desc: 'Extracción quirúrgica de muelas del juicio, tanto simples como impactadas, con manejo integral del paciente.',
    externalImageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800',
    whyUs: 'Cirujanos maxilofaciales con especialidad quirúrgica. Manejamos casos simples y complejos con técnicas que minimizan inflamación y dolor postoperatorio.',
    benefits: [
      { title: 'Anestesia avanzada', description: 'Sedación consciente disponible para mayor comodidad' },
      { title: 'Técnica atraumática', description: 'Minimización de traumatismo tisular para cicatrización rápida' },
      { title: 'Protocolo de recuperación', description: 'Cuidados postoperatorios estructurados para óptima cicatrización' },
      { title: 'Control radiográfico tridimensional', description: 'Planificación 3D para extracciones precisas y seguras' },
    ]
  },

  {
    slug: 'cirugia-implantes-dentales',
    title: 'Colocación de Implantes Dentales',
    category: 'Implantología Quirúrgica',
    group: 'odontologia', order: 6,
    desc: 'Cirugía de implantes dentales con planificación 3D, regeneración ósea y carga inmediata cuando es posible.',
    externalImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=800',
    whyUs: 'Implantólogos certificados internacionalmente con miles de casos exitosos. Utilizamos implantes de marcas líderes mundiales y tecnología CAD/CAM para resultados predecibles.',
    benefits: [
      { title: 'Planificación 3D exacta', description: 'Tomografía cone-beam y software de planificación de precisión milimétrica' },
      { title: 'Regeneración ósea cuando es necesaria', description: 'Técnicas avanzadas para restaurar volumen óseo insuficiente' },
      { title: 'Carga inmediata en casos seleccionados', description: 'Puede significar diente en 24 horas en situaciones óptimas' },
      { title: 'Prótesis personalizada', description: 'Corona sobre implante diseñada específicamente para ti' },
    ]
  },

  {
    slug: 'cirugia-ortognatica',
    title: 'Cirugía Ortognática Avanzada',
    category: 'Cirugía Maxilofacial',
    group: 'odontologia', order: 7,
    desc: 'Corrección quirúrgica de deformidades dentoesqueléticas para mejorar función y estética facial.',
    externalImageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=800',
    whyUs: 'Especialistas en cirugía ortognática con formación internacional. Transformamos no solo la función masticatoria sino también el equilibrio y armonía facial.',
    benefits: [
      { title: 'Planificación virtual', description: 'Simulación 3D del resultado final antes de la cirugía' },
      { title: 'Mejora de función masticatoria', description: 'Corrección de maloclusions severas para masticación eficiente' },
      { title: 'Armonía facial restaurada', description: 'Mejora significativa en proporciones y simetría facial' },
      { title: 'Resolución de problemas respiratorios', description: 'Corrección de apnea del sueño en muchos casos' },
    ]
  },

  // ── MEDICINA ─────────────────────────────────────────────────────────────
  {
    slug: 'medicina-general',
    title: 'Medicina General',
    category: 'Medicina Integral',
    group: 'medicina', order: 8,
    desc: 'Diagnóstico clínico, tratamiento de enfermedades agudas y crónicas, prevención integral.',
    externalImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=800',
    whyUs: 'Médicos generales con experiencia en medicina integradora que escuchan y entienden al paciente. Tu médico de confianza para todas tus necesidades de salud.',
    benefits: [
      { title: 'Diagnóstico integral', description: 'Evaluación completa considerando historial médico y estilo de vida' },
      { title: 'Prevención y promoción', description: 'Enfoque en mantener salud y prevenir enfermedades' },
      { title: 'Coordinación especializada', description: 'Referencia oportuna a especialistas cuando sea necesario' },
      { title: 'Disponibilidad y continuidad', description: 'Seguimiento consistente de tu estado de salud' },
    ]
  },

  {
    slug: 'nutricion-diabetologia',
    title: 'Nutrición y Diabetología',
    category: 'Medicina Preventiva',
    group: 'medicina', order: 9,
    desc: 'Asesoría nutricional personalizada y manejo integral de diabetes con educación del paciente.',
    externalImageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800',
    whyUs: 'Nutricionistas y diabetólogos certificados que crean planes personalizados basados en tus gustos y necesidades. Control glucémico óptimo sin sacrificar calidad de vida.',
    benefits: [
      { title: 'Planes nutricionales personalizados', description: 'Diseñados según tus preferencias, cultura y presupuesto' },
      { title: 'Manejo avanzado de diabetes', description: 'Tecnología de monitoreo continuo y terapia insulínica optimizada' },
      { title: 'Educación del paciente', description: 'Talleres y sesiones sobre nutrición, ejercicio y autocuidado' },
      { title: 'Monitoreo periódico', description: 'Seguimiento de HbA1c y complicaciones microvasculares' },
    ]
  },

  {
    slug: 'fisioterapia',
    title: 'Fisioterapia',
    category: 'Rehabilitación',
    group: 'medicina', order: 10,
    desc: 'Tratamientos de rehabilitación, ejercicios terapéuticos y manejo del dolor con técnicas modernas.',
    externalImageUrl: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=800',
    whyUs: 'Fisioterapeutas especializados en rehabilitación musculoesquelética que utilizan técnicas manuales avanzadas y ejercicio terapéutico basado en evidencia.',
    benefits: [
      { title: 'Evaluación cinesiológica completa', description: 'Análisis detallado del movimiento y función corporal' },
      { title: 'Múltiples técnicas de tratamiento', description: 'Masaje, movilización, ejercicio terapéutico y tecnología física' },
      { title: 'Recuperación más rápida', description: 'Protocolos modernos que aceleran la cicatrización y función' },
      { title: 'Prevención de recaídas', description: 'Programa de ejercicios en casa y reeducación postural' },
    ]
  },

  {
    slug: 'psicologia',
    title: 'Psicología',
    category: 'Salud Mental',
    group: 'medicina', order: 11,
    desc: 'Atención psicológica, counseling y apoyo emocional para optimizar tu bienestar integral.',
    externalImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a5?q=80&w=800',
    whyUs: 'Psicólogos clínicos formados en terapias evidenciadas que crean un espacio seguro y confidencial para tu bienestar emocional.',
    benefits: [
      { title: 'Terapia individual especializada', description: 'CBT, terapia psicodinámica y mindfulness según tu necesidad' },
      { title: 'Manejo del estrés y ansiedad', description: 'Técnicas prácticas para mejorar tu salud mental' },
      { title: 'Confidencialidad garantizada', description: 'Espacio seguro y privado para expresar tus preocupaciones' },
      { title: 'Apoyo en transiciones vitales', description: 'Acompañamiento en cambios significativos de la vida' },
    ]
  },

  {
    slug: 'laboratorio-clinico',
    title: 'Laboratorio Clínico',
    category: 'Diagnóstico',
    group: 'medicina', order: 12,
    desc: 'Análisis clínicos y bioquímicos con equipamiento de última generación para diagnóstico preciso.',
    externalImageUrl: 'https://images.unsplash.com/photo-1579154204601-01d430751fb9?q=80&w=800',
    whyUs: 'Laboratorio certificado con equipos de tecnología de punta y profesionales altamente capacitados. Resultados precisos y oportunos para tu tranquilidad.',
    benefits: [
      { title: 'Equipamiento de última generación', description: 'Analizadores automatizados para resultados precisos y rápidos' },
      { title: 'Amplio rango de análisis', description: 'Desde análisis básicos hasta pruebas moleculares especializadas' },
      { title: 'Control de calidad riguroso', description: 'Certificaciones internacionales y monitoreo continuo' },
      { title: 'Resultados digitales', description: 'Acceso en línea a tus resultados de forma segura' },
    ]
  },

  {
    slug: 'pediatria',
    title: 'Pediatría',
    category: 'Medicina Infantil',
    group: 'medicina', order: 13,
    desc: 'Atención médica integral para niños, control de crecimiento y esquema de inmunizaciones.',
    externalImageUrl: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800',
    whyUs: 'Pediatras dedicados al cuidado integral de la salud infantil. Establecemos relaciones de confianza con familias para acompañar el desarrollo desde recién nacido.',
    benefits: [
      { title: 'Control periódico de salud', description: 'Seguimiento de crecimiento y desarrollo según edad' },
      { title: 'Esquema de vacunación completo', description: 'Inmunizaciones según calendario oficial actualizado' },
      { title: 'Nutrición pediátrica especializada', description: 'Asesoría en lactancia, destete y nutrición infantil' },
      { title: 'Atención de enfermedades comunes', description: 'Tratamiento de infecciones respiratorias, gastrointestinales y dermatológicas' },
    ]
  },
]

// ── 4. Subir como borradores ─────────────────────────────────────────────────
async function run() {
  console.log(`Subiendo ${services.length} servicios a Sanity como borradores…\n`)

  const tx = client.transaction()

  for (const s of services) {
    // _id con prefijo "drafts." = borrador en Sanity
    // ID determinístico → idempotente (ejecutar 2 veces no duplica)
    const draftId = `drafts.service-${s.slug}`

    tx.createOrReplace({
      _id:   draftId,
      _type: 'service',
      title:            s.title,
      slug:             { _type: 'slug', current: s.slug },
      category:         s.category,
      group:            s.group,
      desc:             s.desc,
      externalImageUrl: s.externalImageUrl,
      order:            s.order,
      whyUs:            s.whyUs,
      benefits:         s.benefits.map((b) => ({
        _type: 'object',
        _key:  `${s.slug}-${b.title.toLowerCase().replace(/\s+/g, '-')}`,
        title: b.title,
        description: b.description,
      })),
    })

    console.log(`  ✓  ${s.title}  →  ${draftId}`)
  }

  await tx.commit()
  console.log('\n¡Servicios subidos! Ábrelos en Sanity Studio, agrega imágenes y publica.')
}

run().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
