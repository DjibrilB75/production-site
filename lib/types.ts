export interface Project {
  id: number
  title: string
  category: string
  image: string
  video?: string
  description?: string
  client?: string
  year: number
  tags?: string[]
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  budget?: string
  projectType?: string[]
}

export type AnimationVariant = 'fadeIn' | 'slideUp' | 'scale' | 'liquid'

export interface NavLink {
  label: string
  href: string
}

export interface Service {
  icon: string
  label: string
  description?: string
}

export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}
