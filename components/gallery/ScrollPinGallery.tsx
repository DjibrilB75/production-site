'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/data'
import { Project } from '@/lib/types'
import ProjectModal from '../ProjectModal'
import { ArrowRight, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollPinGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Skip scroll pin animation on mobile
    if (isMobile) return

    const trigger = triggerRef.current
    const gallery = galleryRef.current

    if (!trigger || !gallery) return

    const slides = gsap.utils.toArray<HTMLElement>('.gallery-slide')
    const totalSlides = slides.length

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(slides, {
      xPercent: -100 * (totalSlides - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: () => `+=${window.innerHeight * totalSlides * 0.6}`,
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const newIndex = Math.round(self.progress * (totalSlides - 1))
          setCurrentIndex(newIndex)
        },
      },
    })

    return () => {
      scrollTween.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [isMobile])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const handleSkipGallery = () => {
    const nextSection = sectionRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const progress = ((currentIndex + 1) / projects.length) * 100

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative petrol-shiny-bg min-h-screen"
      >
        {/* Section Header */}
        <div className="py-16 md:py-20 px-4 md:px-6 lg:px-12 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs md:text-sm font-medium text-white/70 tracking-[0.3em] uppercase mb-4"
          >
            Selected Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-5xl lg:text-7xl font-bold text-white"
          >
            Our{' '}
            <span className="petrol-text">Portfolio</span>
          </motion.h2>
        </div>

        {/* Mobile Layout - Vertical Stack */}
        {isMobile ? (
          <div className="px-4 pb-20 space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.05 }}
                className="petrol-border cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] text-white/70 tracking-wider uppercase">
                        {project.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span className="text-[10px] text-white/50">{project.year}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-xs mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Number */}
                  <div className="absolute top-4 right-4">
                    <span className="font-accent text-3xl font-bold text-white/10">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Desktop Layout - Horizontal Scroll Pin */
          <div ref={triggerRef} className="relative h-screen overflow-hidden">
            <div
              ref={galleryRef}
              className="flex h-full items-center"
              style={{ width: `${projects.length * 100}vw` }}
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="gallery-slide relative flex-shrink-0 w-screen h-full flex items-center justify-center p-8"
                >
                  {/* Card with petrol border - 80% of viewport */}
                  <motion.div
                    className="petrol-border cursor-pointer group"
                    onClick={() => handleProjectClick(project)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '80vw', height: '80vh' }}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black shadow-2xl">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="80vw"
                        priority={index < 2}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
                        {/* Category & Year */}
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-xs md:text-sm text-white/80 font-medium tracking-wider uppercase">
                            {project.category}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span className="text-xs md:text-sm text-white/60">{project.year}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:via-pink-400 group-hover:to-orange-400 transition-all duration-500">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed">
                          {project.description}
                        </p>

                        {/* View Project Link */}
                        <div className="mt-6 inline-flex items-center gap-3 text-sm md:text-base font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                          <span>View Project</span>
                          <ArrowRight size={20} />
                        </div>
                      </div>

                      {/* Slide Number */}
                      <div className="absolute top-8 right-8 md:top-12 md:right-12">
                        <span className="font-accent text-6xl md:text-8xl lg:text-9xl font-bold text-white/10">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
              {/* Progress Indicator */}
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-full border border-white/20">
                {/* Current / Total */}
                <div className="flex items-baseline gap-1 font-accent">
                  <motion.span
                    key={currentIndex}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl font-bold text-white"
                  >
                    {String(currentIndex + 1).padStart(2, '0')}
                  </motion.span>
                  <span className="text-white/40 mx-1">/</span>
                  <span className="text-base text-white/50">
                    {String(projects.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-24 md:w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full petrol-gradient-bg"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>

                {/* Dots */}
                <div className="hidden lg:flex items-center gap-1.5">
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-white scale-125'
                          : index < currentIndex
                          ? 'bg-white/50'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Skip Gallery Button */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleSkipGallery}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/20 transition-all duration-300 group"
              >
                <span>Skip</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        )}
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            projects={projects}
            onClose={() => setSelectedProject(null)}
            onNavigate={setSelectedProject}
          />
        )}
      </AnimatePresence>
    </>
  )
}
