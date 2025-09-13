'use client'

import { useState } from 'react'

interface BotInputProps {
  onCommand: (command: string) => void
}

export default function BotInput({ onCommand }: BotInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input.trim())
      setInput('')
    }
  }

  return (
    <div className="p-4" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--bg-sidebar)' }}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        {/* Mobile textarea */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try !about, !projects, !resume, !email, !quack, or !quackquack..."
          className="md:hidden flex-1 border rounded px-3 py-2 focus:outline-none text-sm resize-none"
          rows={2}
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderColor: 'var(--border)', 
            color: 'var(--text-primary)'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        />
        {/* Desktop input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Try !about, !projects, !resume, !email, !quack, or !quackquack..."
          className="hidden md:block flex-1 border rounded px-3 py-2 focus:outline-none text-sm md:text-base"
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderColor: 'var(--border)', 
            color: 'var(--text-primary)'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        />
        <button
          type="submit"
          className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          Send
        </button>
      </form>
      
      <div className="mt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        <div className="md:hidden">
          Commands: !about, !projects, !resume, !email
        </div>
        <div className="hidden md:block">
        Bot commands: <code className="px-1 rounded" style={{ backgroundColor: 'var(--hover)' }}>!about</code>{' '}
        <code className="px-1 rounded" style={{ backgroundColor: 'var(--hover)' }}>!projects</code>{' '}
        <code className="px-1 rounded" style={{ backgroundColor: 'var(--hover)' }}>!resume</code>{' '}
        <code className="px-1 rounded" style={{ backgroundColor: 'var(--hover)' }}>!email</code>{' '}
        <code className="px-1 rounded" style={{ backgroundColor: 'var(--hover)' }}>!quack</code>{' '}
        <code className="px-1 rounded" style={{ backgroundColor: 'var(--hover)' }}>!quackquack</code>
        </div>
      </div>
    </div>
  )
}