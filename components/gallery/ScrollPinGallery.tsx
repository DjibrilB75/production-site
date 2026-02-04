'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/data'
import { Project } from '@/lib/types'
import GalleryProgress from './GalleryProgress'
import ProjectModal from '../ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollPinGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const trigger = triggerRef.current
    const gallery = galleryRef.current

    if (!section || !trigger || !gallery) return

    const slides = gsap.utils.toArray<HTMLElement>('.gallery-slide')
    const totalSlides = slides.length

    // Create the horizontal scroll animation
    const scrollTween = gsap.to(slides, {
      xPercent: -100 * (totalSlides - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: () => `+=${window.innerHeight * totalSlides * 0.5}`,
        pin: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          const newIndex = Math.round(self.progress * (totalSlides - 1))
          setCurrentIndex(newIndex)
        },
      },
    })

    // Add 3D effects to each slide
    slides.forEach((slide) => {
      const image = slide.querySelector('.slide-image')
      const content = slide.querySelector('.slide-content')

      // Parallax effect on images
      gsap.to(image, {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: slide,
          containerAnimation: scrollTween,
          start: 'left right',
          end: 'right left',
          scrub: true,
        },
      })

      // Content fade in
      gsap.fromTo(
        content,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: slide,
            containerAnimation: scrollTween,
            start: 'left center',
            end: 'center center',
            scrub: true,
          },
        }
      )
    })

    return () => {
      scrollTween.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="work"
        className="relative bg-dark-900"
      >
        {/* Section Header */}
        <div className="py-20 px-6 lg:px-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-holographic-from tracking-[0.3em] uppercase mb-4"
          >
            Selected Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold"
          >
            Our{' '}
            <span className="gradient-text">Portfolio</span>
          </motion.h2>
        </div>

        {/* Gallery Container */}
        <div ref={triggerRef} className="relative h-screen overflow-hidden">
          <div
            ref={galleryRef}
            className="flex h-full"
            style={{ width: `${projects.length * 100}vw` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="gallery-slide relative flex-shrink-0 w-screen h-full cursor-pointer group"
                onClick={() => handleProjectClick(project)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="slide-image absolute inset-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700"
                      sizes="100vw"
                      priority={index < 3}
                    />
                  </div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-900/30 via-transparent to-dark-900/30" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-holographic-from/0 group-hover:bg-holographic-from/10 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="slide-content absolute bottom-0 left-0 right-0 p-8 lg:p-16">
                  <div className="max-w-2xl">
                    {/* Category & Year */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm text-holographic-from font-medium tracking-wider uppercase">
                        {project.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="text-sm text-white/50">{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 group-hover:text-holographic-from transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed">
                      {project.description}
                    </p>

                    {/* View Project Link */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-holographic-from transition-colors"
                    >
                      <span>View Project</span>
                      <span className="w-8 h-px bg-current transform origin-left group-hover:scale-x-150 transition-transform" />
                    </motion.div>
                  </div>
                </div>

                {/* Slide Number */}
                <div className="absolute top-8 right-8 lg:top-16 lg:right-16">
                  <span className="font-accent text-6xl md:text-8xl font-bold text-white/10">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <GalleryProgress
            currentIndex={currentIndex}
            totalItems={projects.length}
          />
        </div>
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
