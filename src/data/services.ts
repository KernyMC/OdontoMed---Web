export interface Service {
  slug:     string;
  title:    string;
  category: string;
  imgSrc:   string;
  desc:     string;
  group:    'odontologia' | 'medicina';
  body?:    string; // future: rich text from CMS
}

export const services: Service[] = [
  // ── Odontología ─────────────────────────────────────────────
  {
    slug:     'ortodoncia',
    title:    'Ortodoncia',
    category: 'Odontología',
    imgSrc:   'https://images.unsplash.com/photo-1598256989800-fea5f6c82738?q=80&w=800',
    desc:     'Brackets metálicos, estéticos y alineadores invisibles de última tecnología.',
    group:    'odontologia',
  },
  {
    slug:     'carillas',
    title:    'Carillas',
    category: 'Odontología Estética',
    imgSrc:   'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800',
    desc:     'Diseño de sonrisa espectacular con porcelana o resina de alta estética.',
    group:    'odontologia',
  },
  {
    slug:     'endodoncia',
    title:    'Endodoncia',
    category: 'Odontología Restaurativa',
    imgSrc:   'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800',
    desc:     'Tratamiento de conductos sin dolor para salvar y restaurar tus piezas.',
    group:    'odontologia',
  },
  {
    slug:     'implantes',
    title:    'Implantes',
    category: 'Implantología',
    imgSrc:   'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800',
    desc:     'Solución permanente, estética y natural para el reemplazo de dientes ausentes.',
    group:    'odontologia',
  },

  // ── Medicina ─────────────────────────────────────────────────
  {
    slug:     'medicina-general',
    title:    'Medicina General',
    category: 'Medicina Integral',
    imgSrc:   'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=800',
    desc:     'Diagnóstico clínico primario, tratamiento y prevención integral.',
    group:    'medicina',
  },
  {
    slug:     'pediatria',
    title:    'Pediatría',
    category: 'Medicina Infantil',
    imgSrc:   'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=800',
    desc:     'Atención especializada, control de niño sano y esquema de vacunación.',
    group:    'medicina',
  },
  {
    slug:     'dermatologia',
    title:    'Dermatología',
    category: 'Cuidado de la Piel',
    imgSrc:   'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800',
    desc:     'Cuidado clínico y estético experto para mantener la salud de tu piel.',
    group:    'medicina',
  },
  {
    slug:     'nutricion',
    title:    'Nutrición',
    category: 'Bienestar',
    imgSrc:   'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800',
    desc:     'Asesoría dietética y planes de alimentación diseñados a tu medida.',
    group:    'medicina',
  },
];
