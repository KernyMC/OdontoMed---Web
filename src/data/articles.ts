export interface ArticleTocItem {
  href:  string;
  label: string;
}

export interface ArticleSection {
  id:     string;
  heading: string;
  body:   string;    // HTML paragraph(s) rendered via set:html
  list?:  string[];  // optional bullet-point items
}

export interface Article {
  slug:     string;
  title:    string;
  category: string;
  imgSrc:   string;
  date:     string;
  readTime: string;
  excerpt:  string;
  featured: boolean;
  intro:    string;
  quote:    string;
  toc:      ArticleTocItem[];
  sections: ArticleSection[];
}

export const articles: Article[] = [
  // ── Artículo 1 ─────────────────────────────────────────────────
  {
    slug:     'futuro-carillas-porcelana',
    title:    'El futuro de las carillas de porcelana',
    category: 'Cosmética',
    imgSrc:   'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop',
    date:     '12 Mar 2026',
    readTime: '5 min',
    excerpt:  'Descubre cómo la tecnología 3D y los nuevos materiales están revolucionando el diseño de sonrisa, logrando resultados 100% naturales en tiempo récord.',
    featured: true,
    intro: 'El mundo de la odontología estética ha avanzado a pasos agigantados en la última década. Lo que antes requería procedimientos invasivos y largas semanas de espera, hoy se puede lograr con una precisión milimétrica, materiales ultrarresistentes y un enfoque mínimamente invasivo.',
    quote: 'El verdadero arte de la odontología cosmética es crear una sonrisa que nadie sepa que fue diseñada en un consultorio.',
    toc: [
      { href: '#seccion-1', label: '1. La evolución de la estética' },
      { href: '#seccion-2', label: '2. ¿Para quién son ideales?' },
      { href: '#seccion-3', label: '3. El proceso paso a paso' },
      { href: '#seccion-4', label: '4. Cuidados y mantenimiento' },
    ],
    sections: [
      {
        id:      'seccion-1',
        heading: '1. La evolución de la estética dental',
        body: `<p>La tecnología digital ha revolucionado nuestra forma de trabajar. Ahora, mediante escáneres intraorales 3D, podemos predecir el resultado final antes de tocar un solo diente. Esto se conoce como Diseño de Sonrisa Digital (DSD), una herramienta que nos permite tomar decisiones conjuntas sobre la forma, tamaño y color ideal.</p>
<p>En nuestra clínica en el Valle de los Chillos, hemos notado un incremento masivo en pacientes que buscan resultados naturales. Hoy, la tendencia es la armonía facial: dientes que reflejen la luz como el esmalte natural, con microtexturas y transparencias en los bordes incisales.</p>`,
      },
      {
        id:      'seccion-2',
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
        id:      'seccion-3',
        heading: '3. El proceso paso a paso',
        body: `<p>El procedimiento moderno requiere un tallado mínimo del diente natural — en muchos casos inferior a 0.5 mm. En solo dos o tres citas, pasamos del escaneo inicial a la cementación definitiva. Utilizamos resinas de alta estética o disilicato de litio (porcelana de última generación) para una durabilidad insuperable que no pierde su brillo con los años.</p>
<p>La primera cita es diagnóstica: tomamos fotografías, escaneamos la boca y diseñamos digitalmente el resultado. La segunda cita es la preparación y toma de impresión para el laboratorio. En la tercera, cementamos definitivamente y ajustamos la oclusión.</p>`,
      },
      {
        id:      'seccion-4',
        heading: '4. Cuidados y mantenimiento',
        body: `<p>El mantenimiento es tan sencillo como cuidar tus dientes naturales: cepillado suave con pasta no abrasiva, hilo dental diario y control semestral en clínica. Recomendamos evitar morder objetos duros (hielo, lapiceros) y usar una férula nocturna si hay bruxismo.</p>
<p>Siguiendo estas indicaciones, tu inversión durará más de una década con el mismo aspecto del primer día. En Odontomed realizamos el seguimiento de por vida de todos nuestros trabajos estéticos.</p>`,
      },
    ],
  },

  // ── Artículo 2 ─────────────────────────────────────────────────
  {
    slug:     'mitos-blanqueamiento-dental',
    title:    'Mitos sobre el blanqueamiento dental',
    category: 'Salud Dental',
    imgSrc:   'https://images.unsplash.com/photo-1598256989800-fea5f6c82738?q=80&w=2070&auto=format&fit=crop',
    date:     '28 Feb 2026',
    readTime: '4 min',
    excerpt:  'Desmentimos las creencias más comunes sobre el blanqueamiento y te explicamos cómo lograr una sonrisa brillante de forma segura.',
    featured: false,
    intro: 'El blanqueamiento dental es uno de los tratamientos más solicitados en odontología estética, y también uno de los más rodeados de mitos. Desde que "destruye el esmalte" hasta que "los resultados son permanentes", las creencias erróneas generan dudas y pueden llevar a decisiones equivocadas. Los aclaramos con evidencia clínica.',
    quote: 'Un diente blanco saludable es aquel cuyo tono armoniza con la piel y la esclerótica del ojo. El objetivo no es la blancura extrema, sino la naturalidad.',
    toc: [
      { href: '#seccion-1', label: '1. Los mitos más extendidos' },
      { href: '#seccion-2', label: '2. ¿Daña el esmalte?' },
      { href: '#seccion-3', label: '3. Tipos de blanqueamiento' },
      { href: '#seccion-4', label: '4. Cómo mantener los resultados' },
    ],
    sections: [
      {
        id:      'seccion-1',
        heading: '1. Los mitos más extendidos',
        body: `<p><strong>Mito #1: "El blanqueamiento destruye el esmalte".</strong> Falso. Los geles de peróxido de hidrógeno o peróxido de carbamida, usados en concentraciones correctas y bajo supervisión profesional, no erosionan el esmalte. Lo que pueden generar de forma temporal es sensibilidad, que desaparece en 48-72 horas.</p>
<p><strong>Mito #2: "El bicarbonato blanquea igual que un tratamiento profesional".</strong> Falso. El bicarbonato es un abrasivo suave que elimina pigmentos superficiales, pero no penetra en el esmalte para modificar el color intrínseco del diente. Su uso excesivo sí puede erosionarlo.</p>
<p><strong>Mito #3: "Los resultados duran para siempre".</strong> Falso. Los resultados duran entre 1 y 3 años según hábitos alimenticios. Café, té, vino tinto y tabaco son los principales agentes de re-pigmentación.</p>`,
      },
      {
        id:      'seccion-2',
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
        id:      'seccion-3',
        heading: '3. Tipos de blanqueamiento disponibles',
        body: `<p><strong>Blanqueamiento en clínica:</strong> Usa concentraciones de peróxido de hidrógeno del 25-40%, activadas con luz LED de alta potencia. Los resultados son visibles en una sola sesión de 60-90 minutos: entre 4 y 8 tonos más claro. Es la opción más rápida.</p>
<p><strong>Blanqueamiento domiciliario supervisado:</strong> Usa cubetas personalizadas fabricadas en clínica y geles de menor concentración (10-16% peróxido de carbamida) que se aplican durante 2-4 semanas por las noches. Los resultados son similares pero más graduales, con menor riesgo de sensibilidad. Ideal para personas con dientes sensibles.</p>
<p>En muchos casos recomendamos combinar ambos: comenzar en clínica y consolidar con el kit domiciliario.</p>`,
      },
      {
        id:      'seccion-4',
        heading: '4. Cómo mantener los resultados',
        body: `<p>Para prolongar al máximo los resultados del blanqueamiento: cepillarse con pasta blanqueadora de mantenimiento (sin abrasivos agresivos), reducir el consumo de alimentos pigmentantes y enjuagarse la boca con agua después de tomar café o té.</p>
<p>Recomendamos una sesión de mantenimiento en clínica una vez al año. El blanqueamiento domiciliario supervisado es ideal para esto: económico, cómodo y sin riesgos cuando se realizan con los materiales que indicamos en la clínica.</p>`,
      },
    ],
  },

  // ── Artículo 3 ─────────────────────────────────────────────────
  {
    slug:     'importancia-revisiones-dentales',
    title:    'Por qué las revisiones dentales importan más que nunca',
    category: 'Prevención',
    imgSrc:   'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    date:     '15 Ene 2026',
    readTime: '6 min',
    excerpt:  'La odontología preventiva es la clave para evitar tratamientos costosos. Descubre qué evaluamos en tu control semestral.',
    featured: false,
    intro: 'La odontología preventiva es, por definición, la más rentable. Un control semestral puede evitar endodoncias, implantes y cirugías. Sin embargo, muchos pacientes adultos visitan al dentista solo cuando sienten dolor. Eso, en casi todos los casos, ya es demasiado tarde.',
    quote: 'El dolor dental no es el inicio de un problema: es la señal de que el problema ya lleva meses, o años, desarrollándose en silencio.',
    toc: [
      { href: '#seccion-1', label: '1. Prevención como inversión' },
      { href: '#seccion-2', label: '2. ¿Qué evaluamos?' },
      { href: '#seccion-3', label: '3. Señales de alerta' },
      { href: '#seccion-4', label: '4. Frecuencia ideal de controles' },
    ],
    sections: [
      {
        id:      'seccion-1',
        heading: '1. La prevención como inversión real',
        body: `<p>Los estudios en salud oral son consistentes: cada dólar invertido en prevención ahorra entre 8 y 50 dólares en tratamientos restaurativos. Una caries detectada en estadio inicial se resuelve con una obturación simple. Si se descubre al llegar a la pulpa, requiere una endodoncia. Si ya afectó el hueso, puede necesitar extracción e implante.</p>
<p>La diferencia entre estas dos realidades es, frecuentemente, una revisión semestral que se postergó un año de más. En Odontomed, desde 1976, hemos visto esta diferencia en miles de pacientes del Valle de los Chillos. La inversión en prevención no es un gasto: es la decisión financiera y de salud más inteligente que puedes tomar para tu boca.</p>`,
      },
      {
        id:      'seccion-2',
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
        id:      'seccion-3',
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
        id:      'seccion-4',
        heading: '4. La frecuencia ideal de tus controles',
        body: `<p>La recomendación estándar es una revisión cada 6 meses para adultos y niños. Algunos perfiles requieren mayor frecuencia: pacientes con enfermedad periodontal activa cada 3-4 meses; pacientes con diabetes (directamente relacionada con la salud periodontal); y niños en etapa de dentición mixta, cuando conviven dientes de leche y permanentes.</p>
<p>Si no recuerdas cuándo fue tu última revisión, esa ya es la señal. En Odontomed ofrecemos una evaluación inicial sin costo para que conozcas el estado real de tu salud oral sin ningún compromiso.</p>`,
      },
    ],
  },
];
