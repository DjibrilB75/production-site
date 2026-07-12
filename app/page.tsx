import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import ProductGrid from '@/components/product/ProductGrid'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dune-50 overflow-x-hidden">
      <Navigation />
      <Hero />
      <ProductGrid />
      <About />
      <Footer />
    </main>
  )
}
