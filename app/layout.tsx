import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Néra | Sacs à main d\'inspiration désertique',
  description: 'Néra crée des sacs à main en cuir, inspirés par les couleurs et la lumière du désert. Pièces artisanales, façonnées pour durer.',
  keywords: ['sac à main', 'maroquinerie', 'cuir', 'désert', 'artisanal', 'boutique en ligne'],
  authors: [{ name: 'Néra' }],
  openGraph: {
    title: 'Néra | Sacs à main d\'inspiration désertique',
    description: 'Maroquinerie artisanale inspirée par le désert.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${jost.variable} antialiased bg-dune-50 text-night-900`}
      >
        {children}
      </body>
    </html>
  )
}
