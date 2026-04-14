import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sophie Laroche | Photographe de Mariage',
  description: 'Photographe de mariage haut de gamme — L\'art de capturer l\'amour. Reportages de mariage luxueux en France et à l\'international.',
  keywords: ['photographe mariage', 'wedding photographer', 'photographie mariage luxe', 'reportage mariage', 'Paris', 'France'],
  authors: [{ name: 'Sophie Laroche' }],
  openGraph: {
    title: 'Sophie Laroche | Photographe de Mariage',
    description: 'L\'art de capturer l\'amour — Reportages de mariage luxueux en France et à l\'international.',
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
      <head>
        {/* Google Fonts – loaded via standard link for environment compatibility */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Cinzel:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-dark-900 text-white">
        {children}
      </body>
    </html>
  )
}
