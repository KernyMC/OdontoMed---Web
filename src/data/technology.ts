export type TechGroup = 'radiografia' | 'tomografia' | 'digital' | 'laboratorio';

export interface TechItem {
  slug:              string;
  title:             string;
  group:             TechGroup;
  desc:              string;
  relevantServices?: string[];
}

export interface GroupMeta {
  label: string;
  desc:  string;
}

export const technologyGroups: Record<TechGroup, GroupMeta> = {
  radiografia: {
    label: 'Radiografías',
    desc:  'Imágenes diagnósticas de alta definición para evaluar dientes, hueso y estructuras craneofaciales con mínima exposición radiactiva.',
  },
  tomografia: {
    label: 'Tomografías',
    desc:  'Reconstrucción tridimensional de estructuras óseas y dentales para planificación quirúrgica e implantológica de precisión milimétrica.',
  },
  digital: {
    label: 'Tecnología Digital',
    desc:  'Escáneres y software CAD/CAM para diseño de sonrisa, impresiones sin moldes y fabricación de prótesis a medida con ajuste superior.',
  },
  laboratorio: {
    label: 'Laboratorio & Cardiología',
    desc:  'Diagnóstico médico integral: análisis clínicos completos y estudio de la actividad cardíaca sin salir de la clínica.',
  },
};

export const technology: TechItem[] = [

  // ── Radiografías ────────────────────────────────────────────────────
  {
    slug:             'rx-periapical',
    title:            'Radiografía Periapical',
    group:            'radiografia',
    desc:             'Muestra la totalidad del diente —corona, raíz y hueso circundante— para detectar infecciones, fracturas y lesiones periapicales.',
    relevantServices: ['endodoncia', 'implantes'],
  },
  {
    slug:             'rx-panoramica',
    title:            'Radiografía Panorámica',
    group:            'radiografia',
    desc:             'Imagen completa de mandíbula, maxilares, todos los dientes y la articulación temporomandibular en una sola toma.',
    relevantServices: ['ortodoncia', 'implantes'],
  },
  {
    slug:             'rx-lateral-craneo',
    title:            'Radiografía Lateral de Cráneo',
    group:            'radiografia',
    desc:             'Perfil óseo del cráneo para análisis cefalométrico en ortodoncia y planificación de cirugía maxilofacial.',
    relevantServices: ['ortodoncia'],
  },
  {
    slug:  'condilografia',
    title: 'Condilografía Boca Abierta / Cerrada',
    group: 'radiografia',
    desc:  'Estudio de la articulación temporomandibular en movimiento para diagnóstico preciso de disfunciones de la ATM.',
  },
  {
    slug:  'rx-senos',
    title: 'Radiografía de Senos Paranasales',
    group: 'radiografia',
    desc:  'Visualización de las cavidades sinusales para diagnóstico de infecciones, pólipos y alteraciones anatómicas de impacto dental.',
  },
  {
    slug:             'rx-carpal',
    title:            'Radiografía Carpal',
    group:            'radiografia',
    desc:             'Determina la edad ósea del paciente para planificar el momento óptimo del tratamiento de ortodoncia en niños y adolescentes.',
    relevantServices: ['ortodoncia', 'pediatria'],
  },
  {
    slug:             'cefalometria',
    title:            'Cefalometrías',
    group:            'radiografia',
    desc:             'Análisis digital de proporciones craneofaciales para planificación de ortodoncia, cirugía ortognática y diseño de sonrisa.',
    relevantServices: ['ortodoncia'],
  },

  // ── Tomografías ─────────────────────────────────────────────────────
  {
    slug:             'tomo-dental',
    title:            'Tomografía Dental',
    group:            'tomografia',
    desc:             'Imagen tridimensional de alta resolución de dientes y tejidos de soporte para planificación precisa de implantes y cirugías.',
    relevantServices: ['implantes', 'endodoncia'],
  },
  {
    slug:             'tomo-maxilares',
    title:            'Tomografía de Maxilares',
    group:            'tomografia',
    desc:             'Estudio volumétrico completo de ambos maxilares para evaluación ósea previa a implantología y cirugía ortognática.',
    relevantServices: ['implantes'],
  },
  {
    slug:  'tomo-macizo-facial',
    title: 'Tomografía de Macizo Facial',
    group: 'tomografia',
    desc:  'Análisis tridimensional de toda la región facial: senos, órbitas, ATM y estructuras óseas del tercio medio facial.',
  },

  // ── Tecnología Digital ───────────────────────────────────────────────
  {
    slug:             'scanner-facial',
    title:            'Scáner Facial',
    group:            'digital',
    desc:             'Captura tridimensional del rostro para planificación estética, diseño de sonrisa digital y fabricación de prótesis a medida.',
    relevantServices: ['carillas', 'implantes'],
  },
  {
    slug:             'scanner-intraoral',
    title:            'Scáner Intraoral',
    group:            'digital',
    desc:             'Digitalización de la arcada dental sin impresiones convencionales, para fabricar coronas, alineadores y prótesis con mayor precisión.',
    relevantServices: ['ortodoncia', 'carillas'],
  },
  {
    slug:             'protesis-digital',
    title:            'Diseño Digital para Prótesis',
    group:            'digital',
    desc:             'Diseño CAD/CAM y fresado de prótesis de alta precisión, con ajuste superior al método convencional y tiempos de entrega reducidos.',
    relevantServices: ['implantes'],
  },

  // ── Laboratorio & Cardiología ────────────────────────────────────────
  {
    slug:             'laboratorio',
    title:            'Laboratorio Clínico',
    group:            'laboratorio',
    desc:             'Análisis de sangre, orina y otros fluidos para diagnóstico, monitoreo de enfermedades crónicas y evaluación preoperatoria.',
    relevantServices: ['medicina-general', 'pediatria'],
  },
  {
    slug:             'ecg',
    title:            'Electrocardiógrafo (ECG)',
    group:            'laboratorio',
    desc:             'Registro de la actividad eléctrica del corazón para detección de arritmias, evaluación cardiovascular y certificado médico.',
    relevantServices: ['medicina-general'],
  },
];
