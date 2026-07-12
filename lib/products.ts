import { Product } from './types'

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'oasis-cabas',
    name: 'Oasis',
    category: 'Sac structuré',
    price: 245,
    compareAtPrice: 290,
    shortDescription: 'Le sac signature Yurah, structuré et intemporel.',
    description:
      "Le sac Oasis est la pièce signature de Yurah. Silhouette structurée à fermoir tournant, poche plaquée au dos et quincaillerie couleur argent : une allure épurée, pensée pour traverser le quotidien comme les voyages dans le désert et au-delà.",
    details: [
      'Cuir façon vachette, grain fin et souple',
      'Fermoir tournant à quincaillerie couleur argent',
      'Anse portée main, attaches mousquetons',
      'Poche plaquée au dos, ouverture sur le dessus',
      'Intérieur doublé avec poche zippée',
    ],
    material: 'Cuir façon vachette',
    dimensions: '24 × 19 × 11 cm',
    images: [
      '/products/oasis-cabas/1.jpg',
      '/products/oasis-cabas/2.jpg',
      '/products/oasis-cabas/3.jpg',
      '/products/oasis-cabas/4.png',
    ],
    accentColor: '#D8D8DC',
    bodyColor: '#2b2926',
    strapColor: '#403c37',
    colorways: [{ id: 'noir', label: 'Noir', hex: '#161513' }],
    bagStyle: 'satchel',
    photoModel: {
      front: '/products/oasis-cabas/cutout-front.png',
      back: '/products/oasis-cabas/cutout-back.png',
      left: '/products/oasis-cabas/cutout-left.png',
      right: '/products/oasis-cabas/cutout-right.png',
    },
    inStock: true,
    isNew: true,
  },
  {
    id: 'p2',
    slug: 'mirage-bandouliere',
    name: 'Mirage',
    category: 'Bandoulière',
    price: 195,
    shortDescription: 'Le sac bandoulière compact, entre ombre et lumière.',
    description:
      "Mirage joue sur les contrastes chauds du crépuscule saharien. Compact et structuré, ce sac bandoulière en cuir terracotta se glisse dans le quotidien comme dans les escapades. Sa chaîne amovible en laiton permet de le porter en pochette pour le soir.",
    details: [
      'Cuir grainé teinté terracotta',
      'Chaîne amovible en laiton doré',
      'Rabat aimanté avec détail piqué sellier',
      'Poche intérieure zippée + poche téléphone',
      'Fabriqué à la main en petite série',
    ],
    material: 'Cuir grainé pleine fleur',
    dimensions: '22 × 16 × 8 cm',
    images: [
      '/products/mirage-bandouliere/1.svg',
      '/products/mirage-bandouliere/2.svg',
      '/products/mirage-bandouliere/3.svg',
      '/products/mirage-bandouliere/4.svg',
    ],
    accentColor: '#954E31',
    bodyColor: '#C2724B',
    strapColor: '#8C5C48',
    colorways: [
      { id: 'terracotta', label: 'Terracotta', hex: '#C2724B' },
      { id: 'sable', label: 'Sable', hex: '#E6D2AE' },
      { id: 'nuit', label: 'Nuit du désert', hex: '#6F4636' },
    ],
    bagStyle: 'crossbody',
    inStock: true,
  },
  {
    id: 'p3',
    slug: 'dune-seau',
    name: 'Dune',
    category: 'Sac seau',
    price: 220,
    shortDescription: "Le sac seau à l'argile chaude et au lien coulissant.",
    description:
      "Dune reprend la forme arrondie et douce des reliefs sculptés par le vent. Ce sac seau en cuir argile se ferme par un lien coulissant tressé et s'ouvre sur un intérieur spacieux, pensé pour l'essentiel du quotidien nomade.",
    details: [
      'Cuir nubuck argile brossé',
      'Lien de fermeture tressé en cuir',
      'Anse courte + bandoulière amovible longue',
      'Fond renforcé avec pieds métalliques',
      'Fabriqué à la main en petite série',
    ],
    material: 'Cuir nubuck brossé',
    dimensions: '26 × 28 × 16 cm',
    images: [
      '/products/dune-seau/1.svg',
      '/products/dune-seau/2.svg',
      '/products/dune-seau/3.svg',
      '/products/dune-seau/4.svg',
    ],
    accentColor: '#6F4636',
    bodyColor: '#A67560',
    strapColor: '#D9BC87',
    colorways: [
      { id: 'argile', label: 'Argile', hex: '#A67560' },
      { id: 'sable', label: 'Sable', hex: '#D9BC87' },
      { id: 'terracotta', label: 'Terracotta', hex: '#C2724B' },
    ],
    bagStyle: 'bucket',
    inStock: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/#boutique' },
]

export const companyInfo = {
  name: 'Yurah',
  email: 'bonjour@yurah.fr',
  phone: '+33 1 23 45 67 89',
  address: 'Marseille, France',
  tagline: "Maroquinerie inspirée par le désert",
}
