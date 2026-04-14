import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import WeddingHero from '@/components/WeddingHero'
import ScrollPinGallery from '@/components/gallery/ScrollPinGallery'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Dynamic imports for heavy / client-only components
const ChatWidget = dynamic(
  () => import('@/components/chat/ChatWidget'),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-900 overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero – 3D Wedding Ring + scroll storytelling */}
      <WeddingHero />

      {/* Portfolio Gallery */}
      <ScrollPinGallery />

      {/* About / Photographer story */}
      <About />

      {/* Contact / Booking */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Chat Widget */}
      <ChatWidget />
    </main>
  )
}
