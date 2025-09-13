'use client'

import { useEffect, useRef } from 'react'
import MessageCard from './MessageCard'
import BotInput from './BotInput'
import { usePreferences } from '@/contexts/PreferencesContext'

interface Message {
  id: string
  avatar?: string
  username: string
  timestamp: string
  content: string
  reactions?: Array<{ emoji: string; label: string }>
  isPinned?: boolean
  linkPreview?: {
    url: string
    title: string
    description: string
    domain: string
  }
}

interface ChatWindowProps {
  activeChannel: string
  messages: Message[]
  onCommand: (command: string) => void
  isTyping?: boolean
  typingType?: 'bot' | 'user'
}

export default function ChatWindow({ activeChannel, messages, onCommand, isTyping = false, typingType = 'bot' }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { preferences } = usePreferences()

  useEffect(() => {
    if (preferences.autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, preferences.autoScroll])

  return (
    <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
      <div className="flex-1 overflow-y-auto">
        {!messages || messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <p style={{ color: 'var(--text-primary)' }}>No messages in #{activeChannel} yet</p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>Try using bot commands below!</p>
            </div>
          </div>
        ) : (
          <div>
            {messages.map((message, index) => (
              <div key={message.id}>
                <MessageCard
                  avatar={message.avatar}
                  username={message.username}
                  timestamp={message.timestamp}
                  content={message.content}
                  reactions={message.reactions}
                  isPinned={message.isPinned}
                  showTimestamp={preferences.timestamps}
                  compactView={preferences.compactView}
                  linkPreview={message.linkPreview}
                  activeChannel={activeChannel}
                />
                {index < messages.length - 1 && (
                  <div style={{ height: '1px', backgroundColor: 'var(--border)', opacity: 0.3 }} />
                )}
              </div>
            ))}
          </div>
        )}
        
        {isTyping && (
          <div className="flex gap-2 md:gap-3 p-3 md:p-4">
            <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 rounded flex items-center justify-center text-white font-bold overflow-hidden">
              {typingType === 'user' ? (
                <img src="/myphoto.jpg" alt="Neel Phadke" className="w-full h-full object-cover" />
              ) : (
                '🤖'
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm md:text-base" style={{ color: 'var(--text-primary)' }}>
                  {typingType === 'user' ? 'Neel Phadke' : 'QuackBot'}
                </span>
              </div>
              <div className="flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                <span className="text-sm">is typing</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <BotInput onCommand={onCommand} />
    </div>
  )
}