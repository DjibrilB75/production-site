import type { Metadata } from 'next'
import { Sora, Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Production Studio | Crafting Visual Stories',
  description: 'Premium production agency specializing in commercial videography, cinematography, and visual storytelling. Creating immersive visual experiences for brands worldwide.',
  keywords: ['production', 'videography', 'cinematography', 'commercial', 'brand film', 'visual storytelling'],
  authors: [{ name: 'Production Studio' }],
  openGraph: {
    title: 'Production Studio | Crafting Visual Stories',
    description: 'Premium production agency specializing in commercial videography and visual storytelling.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sora.variable} ${inter.variable} ${playfair.variable} antialiased bg-dark-900 text-white`}
      >
        {children}
      </body>
    </html>
  )
}
