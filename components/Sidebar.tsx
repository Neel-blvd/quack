'use client'

import { useState } from 'react'
import Preferences from './Preferences'

interface SidebarProps {
  activeChannel: string
  onChannelSelect: (channel: string) => void
  showDuckPond: boolean
  showDuckJoke: boolean
  showQuackBotDM: boolean
  dmViewed: boolean
}

const channels = [
  { id: 'home', name: 'home' },
  { id: 'experiences', name: 'experiences' },
  { id: 'projects', name: 'projects' },
  { id: 'skills', name: 'skills' },
  { id: 'achievements', name: 'achievements' },
  { id: 'contact', name: 'contact' },
]

export default function Sidebar({ activeChannel, onChannelSelect, showDuckPond, showDuckJoke, showQuackBotDM, dmViewed }: SidebarProps) {
  const [showPreferences, setShowPreferences] = useState(false)

  return (
    <div className="w-64 h-full flex flex-col" style={{ backgroundColor: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)' }}>
      <div className="p-4" style={{ borderBottom: '1px solid var(--border)' }}>
        <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Quack 🦆</h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Neel's Portfolio</p>
      </div>
      
      <div className="flex-1 p-2">
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 px-2" style={{ color: 'var(--text-secondary)' }}>Channels</h3>
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={`w-full text-left px-2 py-1 rounded text-sm flex items-center gap-2 mb-1 ${
                activeChannel === channel.id ? 'bg-blue-600 text-white' : ''
              }`}
              style={activeChannel !== channel.id ? { 
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent'
              } : {}}
              onMouseEnter={(e) => {
                if (activeChannel !== channel.id) {
                  e.currentTarget.style.backgroundColor = 'var(--hover)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeChannel !== channel.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <span className="text-xs">#</span>
              <span>{channel.name}</span>
            </button>
          ))}
          
          {showDuckPond && (
            <button
              onClick={() => onChannelSelect('duck-pond')}
              className={`w-full text-left px-2 py-1 rounded text-sm flex items-center gap-2 mb-1 ${
                activeChannel === 'duck-pond' ? 'bg-blue-600 text-white' : ''
              }`}
              style={activeChannel !== 'duck-pond' ? { 
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent'
              } : {}}
              onMouseEnter={(e) => {
                if (activeChannel !== 'duck-pond') {
                  e.currentTarget.style.backgroundColor = 'var(--hover)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeChannel !== 'duck-pond') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <span className="text-xs">#</span>
              <span>duck-pond</span>
              <span className="ml-auto">🦆</span>
            </button>
          )}
          
          {showDuckJoke && (
            <button
              onClick={() => onChannelSelect('duck-joke')}
              className={`w-full text-left px-2 py-1 rounded text-sm flex items-center gap-2 mb-1 ${
                activeChannel === 'duck-joke' ? 'bg-blue-600 text-white' : ''
              }`}
              style={activeChannel !== 'duck-joke' ? { 
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent'
              } : {}}
              onMouseEnter={(e) => {
                if (activeChannel !== 'duck-joke') {
                  e.currentTarget.style.backgroundColor = 'var(--hover)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeChannel !== 'duck-joke') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <span className="text-xs">#</span>
              <span>duck-joke</span>
              <span className="ml-auto">🎭</span>
            </button>
          )}
        </div>
        
        {showQuackBotDM && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2 px-2" style={{ color: 'var(--text-secondary)' }}>DMs</h3>
            <button
              onClick={() => onChannelSelect('quackbot-dm')}
              className={`w-full text-left px-2 py-1 rounded text-sm flex items-center gap-2 mb-1 ${
                activeChannel === 'quackbot-dm' ? 'bg-blue-600 text-white' : ''
              }`}
              style={activeChannel !== 'quackbot-dm' ? { 
                color: 'var(--text-secondary)',
                backgroundColor: 'transparent'
              } : {}}
              onMouseEnter={(e) => {
                if (activeChannel !== 'quackbot-dm') {
                  e.currentTarget.style.backgroundColor = 'var(--hover)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeChannel !== 'quackbot-dm') {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <span className="text-xs">🤖</span>
              <span>QuackBot</span>
              {!dmViewed && (
                <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-medium">
                  1
                </span>
              )}
            </button>
          </div>
        )}
      </div>
      
      <div className="p-3" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
              <img src="/myphoto.jpg" alt="Neel Phadke" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full" style={{ border: '2px solid var(--bg-sidebar)' }}></div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Neel Phadke</div>
            <div className="text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Active
            </div>
          </div>
          <button 
            onClick={() => setShowPreferences(true)}
            className="p-1 rounded"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)'
              e.currentTarget.style.color = 'var(--text-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
            title="Preferences"
          >
            ⚙️
          </button>
        </div>
      </div>
      
      <Preferences 
        isOpen={showPreferences} 
        onClose={() => setShowPreferences(false)} 
      />
    </div>
  )
}