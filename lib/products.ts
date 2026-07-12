import { Product } from './types'

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'oasis-cabas',
    name: 'Oasis',
    category: 'Cabas',
    price: 245,
    compareAtPrice: 290,
    shortDescription: 'Le cabas spacieux aux teintes de sable chaud.',
    description:
      "Inspiré par les dunes au lever du jour, l'Oasis est notre cabas signature. Sa silhouette généreuse et structurée en cuir pleine fleur sable se patine avec le temps, révélant un caractère unique à chaque porté. Doublure en coton brut, fermoir en laiton brossé.",
    details: [
      'Cuir de vachette pleine fleur, tannage végétal',
      'Doublure intérieure en coton brut avec poche zippée',
      'Anses portées main et épaule, longueur ajustable',
      'Fermeture zippée avec tirette en laiton brossé',
      'Fabriqué à la main en petite série',
    ],
    material: 'Cuir pleine fleur tannage végétal',
    dimensions: '38 × 30 × 14 cm',
    images: [
      '/products/oasis-cabas/1.svg',
      '/products/oasis-cabas/2.svg',
      '/products/oasis-cabas/3.svg',
      '/products/oasis-cabas/4.svg',
    ],
    accentColor: '#B0603D',
    bodyColor: '#E6D2AE',
    strapColor: '#C2724B',
    colorways: [
      { id: 'sable', label: 'Sable', hex: '#E6D2AE' },
      { id: 'terracotta', label: 'Terracotta', hex: '#C2724B' },
      { id: 'argile', label: 'Argile', hex: '#A67560' },
    ],
    bagStyle: 'tote',
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
  name: 'Néra',
  email: 'bonjour@nera-maroquinerie.fr',
  phone: '+33 1 23 45 67 89',
  address: 'Marseille, France',
  tagline: "Maroquinerie inspirée par le désert",
}
