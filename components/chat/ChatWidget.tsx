'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import ChatButton from './ChatButton'
import ChatWindow from './ChatWindow'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <ChatButton onClick={() => setIsOpen(true)} hasNotification={false} />
        )}
      </AnimatePresence>
    </div>
  )
}
