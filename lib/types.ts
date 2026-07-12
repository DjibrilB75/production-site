export interface ProductColorway {
  id: string
  label: string
  hex: string
}

export interface PhotoModel {
  front: string
  back: string
  left: string
  right: string
  /** aspect ratio (width / height) of each cutout, used to size the 3D panels correctly */
  aspect: { front: number; back: number; left: number; right: number }
}

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  price: number
  compareAtPrice?: number
  shortDescription: string
  description: string
  details: string[]
  material: string
  dimensions: string
  images: string[]
  accentColor: string
  bodyColor: string
  strapColor: string
  colorways: ProductColorway[]
  bagStyle: 'tote' | 'crossbody' | 'bucket' | 'satchel'
  photoModel?: PhotoModel
  inStock: boolean
  isNew?: boolean
}

export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  image: string
  colorway: string
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
}

export interface ShippingInfo {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  shipping: ShippingInfo
  email: string
  createdAt: string
}

export interface NavLink {
  label: string
  href: string
}
