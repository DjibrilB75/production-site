import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import VideoHero from '@/components/VideoHero'
import ScrollPinGallery from '@/components/gallery/ScrollPinGallery'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Dynamic imports for heavy components
const BackgroundScene = dynamic(
  () => import('@/components/3d/BackgroundScene'),
  { ssr: false }
)

const ChatWidget = dynamic(
  () => import('@/components/chat/ChatWidget'),
  { ssr: false }
)

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-900 overflow-x-hidden">
      {/* 3D Background Scene - Desktop only */}
      <BackgroundScene />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <VideoHero />

      {/* Work / Gallery Section */}
      <ScrollPinGallery />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Chat Widget */}
      <ChatWidget />
    </main>
  )
}
