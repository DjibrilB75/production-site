'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

interface ChatButtonProps {
  onClick: () => void
  hasNotification?: boolean
}

export default function ChatButton({ onClick, hasNotification = false }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-14 rounded-full bg-gradient-to-r from-holographic-from to-holographic-via1 shadow-lg shadow-holographic-from/30 flex items-center justify-center group"
      aria-label="Open chat"
    >
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-holographic-from animate-ping opacity-30" />

      {/* Icon */}
      <MessageCircle className="w-6 h-6 text-white relative z-10" />

      {/* Notification badge */}
      {hasNotification && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-pink rounded-full flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">1</span>
        </span>
      )}
    </motion.button>
  )
}
