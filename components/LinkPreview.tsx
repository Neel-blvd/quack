'use client'

import { useState } from 'react'

interface LinkPreviewProps {
  href: string
  children: React.ReactNode
  title: string
  description: string
  domain: string
}

export default function LinkPreview({ href, children, title, description, domain }: LinkPreviewProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <span className="relative inline-block">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline"
        onMouseEnter={(e) => {
          e.stopPropagation()
          setShowPreview(true)
        }}
        onMouseLeave={(e) => {
          e.stopPropagation()
          setShowPreview(false)
        }}
      >
        {children}
      </a>
      {showPreview && (
        <div 
          className="absolute bottom-full left-0 mb-2 w-64 p-3 border rounded shadow-lg z-50 pointer-events-none"
          style={{ 
            borderColor: 'var(--border)', 
            backgroundColor: 'var(--bg-primary)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{domain}</div>
          <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{title}</div>
          <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{description}</div>
        </div>
      )}
    </span>
  )
}