'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Bot, User } from 'lucide-react'
import { ChatMessage } from '@/lib/types'

interface ChatWindowProps {
  onClose: () => void
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    content: "Hi there! I'm here to help. How can I assist you with your project today?",
    sender: 'bot',
    timestamp: new Date(),
  },
]

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thanks for reaching out! One of our team members will get back to you shortly.",
        "That sounds like an exciting project! Could you tell me more about your timeline and budget?",
        "We'd love to help with that. Feel free to share more details or schedule a call with our team.",
        "Great question! Our typical project timeline is 4-8 weeks depending on scope.",
      ]

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 right-6 w-[90vw] max-w-[400px] h-[500px] md:h-[600px] bg-dark-800 rounded-2xl shadow-2xl shadow-black/50 border border-white/10 flex flex-col overflow-hidden z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-holographic-from/10 to-holographic-via1/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-holographic-from to-holographic-via1 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-white">Studio Support</h3>
            <p className="text-xs text-white/50">Usually replies instantly</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 text-white/60" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-2 ${
              message.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                message.sender === 'bot'
                  ? 'bg-gradient-to-r from-holographic-from to-holographic-via1'
                  : 'bg-white/10'
              }`}
            >
              {message.sender === 'bot' ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-4 h-4 text-white/60" />
              )}
            </div>

            {/* Message bubble */}
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-holographic-from to-holographic-via1 text-white rounded-tr-sm'
                  : 'bg-white/5 text-white/80 rounded-tl-sm'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.content}</p>
              <p className="text-[10px] mt-1 opacity-50">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-holographic-from to-holographic-via1 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 focus:border-holographic-from focus:outline-none transition-colors"
          />
          <motion.button
            onClick={handleSend}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!inputValue.trim()}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-holographic-from to-holographic-via1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
