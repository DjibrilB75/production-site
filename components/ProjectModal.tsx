'use client'

import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Project } from '@/lib/types'

interface ProjectModalProps {
  project: Project
  projects: Project[]
  onClose: () => void
  onNavigate: (project: Project) => void
}

export default function ProjectModal({
  project,
  projects,
  onClose,
  onNavigate,
}: ProjectModalProps) {
  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < projects.length - 1

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(projects[currentIndex - 1])
    }
  }, [currentIndex, hasPrev, onNavigate, projects])

  const handleNext = useCallback(() => {
    if (hasNext) {
      onNavigate(projects[currentIndex + 1])
    }
  }, [currentIndex, hasNext, onNavigate, projects])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose, handlePrev, handleNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-dark-900/95 backdrop-blur-xl"
      />

      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
        aria-label="Close modal"
      >
        <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
      </motion.button>

      {/* Navigation Arrows */}
      {hasPrev && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          onClick={(e) => {
            e.stopPropagation()
            handlePrev()
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
        </motion.button>
      )}

      {hasNext && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          onClick={(e) => {
            e.stopPropagation()
            handleNext()
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors group"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
        </motion.button>
      )}

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-40 w-[90vw] max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl"
      >
        {/* Image Container */}
        <div className="relative aspect-video md:aspect-[16/9]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="90vw"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              {/* Category & Year */}
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm text-holographic-from font-medium tracking-wider uppercase">
                  {project.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="text-sm text-white/50">{project.year}</span>
                {project.client && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-sm text-white/50">{project.client}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-white/60 text-sm md:text-base leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-white/70 bg-white/5 rounded-full border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Index */}
            <div className="hidden md:block font-accent text-6xl font-bold text-white/10">
              {String(currentIndex + 1).padStart(2, '0')}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
