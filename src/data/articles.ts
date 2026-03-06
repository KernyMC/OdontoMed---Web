export interface Article {
  slug:     string;
  title:    string;
  category: string;
  imgSrc:   string;
  date:     string;
  readTime: string;
  excerpt:  string;
  featured: boolean;
}

export const articles: Article[] = [
  {
    slug:     'futuro-carillas-porcelana',
    title:    'El futuro de las carillas de porcelana',
    category: 'Cosmética',
    imgSrc:   'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop',
    date:     '12 Mar 2026',
    readTime: '5 min',
    excerpt:  'Descubre cómo la tecnología 3D y los nuevos materiales están revolucionando el diseño de sonrisa, logrando resultados 100% naturales en tiempo récord.',
    featured: true,
  },
  {
    slug:     'mitos-blanqueamiento-dental',
    title:    'Mitos sobre el blanqueamiento dental',
    category: 'Salud Dental',
    imgSrc:   'https://images.unsplash.com/photo-1598256989800-fea5f6c82738?q=80&w=2070&auto=format&fit=crop',
    date:     '28 Feb 2026',
    readTime: '4 min',
    excerpt:  'Desmentimos las creencias más comunes sobre el blanqueamiento y te explicamos cómo lograr una sonrisa brillante de forma segura.',
    featured: false,
  },
  {
    slug:     'importancia-revisiones-dentales',
    title:    'Por qué las revisiones importan más que nunca',
    category: 'Prevención',
    imgSrc:   'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    date:     '15 Ene 2026',
    readTime: '6 min',
    excerpt:  'La odontología preventiva es la clave para evitar tratamientos costosos. Descubre qué evaluamos en tu control semestral.',
    featured: false,
  },
];
