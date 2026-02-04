'use client'

import { motion } from 'framer-motion'

interface GalleryProgressProps {
  currentIndex: number
  totalItems: number
}

export default function GalleryProgress({ currentIndex, totalItems }: GalleryProgressProps) {
  const progress = ((currentIndex + 1) / totalItems) * 100

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
      {/* Current / Total */}
      <div className="flex items-baseline gap-1 font-accent">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="text-3xl font-bold text-white"
        >
          {String(currentIndex + 1).padStart(2, '0')}
        </motion.span>
        <span className="text-white/30 mx-2">/</span>
        <span className="text-lg text-white/50">
          {String(totalItems).padStart(2, '0')}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-32 md:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-holographic-from to-holographic-via1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Dots */}
      <div className="hidden md:flex items-center gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-holographic-from scale-125'
                : index < currentIndex
                ? 'bg-white/40'
                : 'bg-white/10'
            }`}
            animate={{
              scale: index === currentIndex ? 1.25 : 1,
            }}
          />
        ))}
      </div>
    </div>
  )
}
