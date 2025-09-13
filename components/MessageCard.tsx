'use client'

import { useState } from 'react'
import LinkPreview from './LinkPreview'

interface Reaction {
  emoji: string
  label: string
}

interface MessageCardProps {
  avatar?: string
  username: string
  timestamp: string
  content: string
  reactions?: Reaction[]
  isPinned?: boolean
  showTimestamp?: boolean
  compactView?: boolean
  linkPreview?: {
    url: string
    title: string
    description: string
    domain: string
  }
  activeChannel?: string
}

export default function MessageCard({ 
  avatar = '👤', 
  username, 
  timestamp, 
  content, 
  reactions = [],
  isPinned = false,
  showTimestamp = true,
  compactView = false,
  linkPreview,
  activeChannel
}: MessageCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('neelphadke13579@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const shouldShowCopyButton = activeChannel === 'contact' && content.includes('neelphadke13579@gmail.com')

  const renderContent = () => {
    if (shouldShowCopyButton) {
      const parts = content.split('neelphadke13579@gmail.com')
      return (
        <div dangerouslySetInnerHTML={{
          __html: parts[0] + '<strong>neelphadke13579@gmail.com</strong>' + 
            '<button onclick="navigator.clipboard.writeText(\'neelphadke13579@gmail.com\'); this.innerHTML=\'✓\'; this.style.background=\'#10b981\'; this.style.color=\'white\'; setTimeout(()=>{this.innerHTML=\'📋\'; this.style.background=\'\'; this.style.color=\'\';},2000)" ' +
            'style="margin-left:8px;padding:4px 8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:var(--text-secondary);border-radius:6px;cursor:pointer;font-size:11px;transition:all 0.2s ease;vertical-align:middle" ' +
            'onmouseover="this.style.background=\'rgba(255,255,255,0.1)\'; this.style.borderColor=\'rgba(255,255,255,0.2)\'" ' +
            'onmouseout="this.style.background=\'rgba(255,255,255,0.05)\'; this.style.borderColor=\'rgba(255,255,255,0.1)\'" ' +
            'title="Copy email">📋</button>' + parts[1]
        }} />
      )
    }
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  return (
    <div 
      className={`flex gap-2 md:gap-3 ${compactView ? 'p-2' : 'p-3 md:p-4'} group`}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--hover)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      <div className={`${compactView ? 'w-6 h-6 text-xs' : 'w-8 h-8 md:w-9 md:h-9'} bg-blue-600 rounded flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0`}>
        {avatar.startsWith('/') ? (
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          avatar
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className={`font-bold ${compactView ? 'text-sm' : 'text-sm md:text-base'}`} style={{ color: 'var(--text-primary)' }}>{username}</span>
          {showTimestamp && (
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{timestamp}</span>
          )}
          {isPinned && (
            <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded">📌 Pinned</span>
          )}
        </div>
        
        <div 
          className={`leading-relaxed ${compactView ? 'text-sm' : 'text-sm md:text-base'}`}
          style={{ color: 'var(--text-primary)' }}
        >
          {renderContent()}
        </div>
        
        {linkPreview && (
          <div className="mt-2">
            🔗 <LinkPreview
              href={linkPreview.url}
              title={linkPreview.title}
              description={linkPreview.description}
              domain={linkPreview.domain}
            >
              Live Demo
            </LinkPreview>
          </div>
        )}
        
        {reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {reactions.map((reaction, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm border cursor-pointer"
                style={{ 
                  backgroundColor: 'var(--hover)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)'
                }}
                title={reaction.label}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                {reaction.emoji.startsWith('http') ? (
                  <img src={reaction.emoji} alt={reaction.label} className="w-4 h-4" />
                ) : (
                  reaction.emoji
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}