'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import ChatWindow from '@/components/ChatWindow'
import DuckPond from '@/components/DuckPond'
import DuckJoke from '@/components/DuckJoke'
import { PreferencesProvider } from '@/contexts/PreferencesContext'

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

const channelData: Record<string, Message[]> = {
  'home': [
    {
      id: '1',
      avatar: '🤖',
      username: 'QuackBot',
      timestamp: 'Pinned',
      content: '<strong>📎 Resume Download</strong><br/><a href="https://drive.google.com/file/d/1WrMrV3qu9RsF29Zt7b9sk570pve0tzAw/view?usp=drivesdk" class="text-blue-400 hover:underline" target="_blank">View Neel_Phadke_Resume.pdf</a>',
      isPinned: true
    },
    {
      id: '2',
      avatar: '/myphoto.jpg',
      username: 'Neel Phadke',
      timestamp: 'Today at 9:00 AM',
      content: '👋 Hey there! I\'m <strong>Neel Phadke</strong>, a <strong>Full-Stack Software Developer</strong> based in Bangalore.<br/><br/>Currently pursuing my <strong>Bachelor Degree in Computer Science</strong> at <strong>Manipal Institute of Technology (2022–2026)</strong>.<br/><br/>💡 Interests: Competitive Programming, Capture The Flag.<br/>🌍 Languages: English (Fluent), German (Basic).<br/>🟢 Status: <em>Open to opportunities!</em>'
    }
  ],
  'projects': [
    {
      id: '1',
      avatar: '/myphoto.jpg',
      username: 'Neel Phadke',
      timestamp: 'Today at 10:30 AM',
      content: '📚 <strong>AcadBlvd</strong> – A remake of my college\'s library portal with quizzing functionality & user stats.',
      linkPreview: {
        url: 'https://acadblvd-2-0ddt.onrender.com/',
        title: 'AcadBlvd - Library Portal',
        description: 'Interactive library management with quizzing features',
        domain: 'acadblvd-2-0ddt.onrender.com'
      },
      reactions: [
        { emoji: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'React' },
        { emoji: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', label: 'Tailwind' },
        { emoji: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', label: 'MongoDB' }
      ]
    },
    {
      id: '2',
      avatar: '/myphoto.jpg',
      username: 'Neel Phadke',
      timestamp: 'Today at 10:35 AM',
      content: '⚖️ <strong>LawnCase</strong> – A web-based case management system with case tracking, document management, task management & client handling.',
      linkPreview: {
        url: 'https://cms-2-seven.vercel.app/',
        title: 'LawnCase - Case Management System',
        description: 'Complete legal case management with document handling',
        domain: 'cms-2-seven.vercel.app'
      },
      reactions: [
        { emoji: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'React' },
        { emoji: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', label: 'Node.js' },
        { emoji: '📦', label: 'System Design' }
      ]
    }
  ],
  'skills': [
    {
      id: '1',
      avatar: '/myphoto.jpg',
      username: 'Neel Phadke',
      timestamp: 'Today at 11:00 AM',
      content: '💻 <strong>Tech Stack</strong><br/><br/>• Next.js / React.js / TypeScript<br/>• Tailwind CSS<br/>• MongoDB / DynamoDB<br/>• Node.js / Java<br/>• System Design<br/>• DevOps',
      reactions: [
        { emoji: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'React' },
        { emoji: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', label: 'TypeScript' },
        { emoji: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg', label: 'Tailwind' },
        { emoji: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', label: 'MongoDB' },
        { emoji: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', label: 'Java' },
        { emoji: '🚀', label: 'DevOps' }
      ]
    }
  ],
  'experiences': [
    {
      id: '1',
      avatar: '/myphoto.jpg',
      username: 'Neel Phadke',
      timestamp: 'Today at 11:35 AM',
      content: '<img src="/cisco-logo.png" alt="Cisco" style="height: 32px; display: block; margin-bottom: 8px;"><strong>Cisco Networking Academy</strong> - Cyber Security Intern<br/><em>May 2024 – July 2024</em><br/><br/>🛡️ Conducted a <strong>security assessment</strong> of my college\'s simulated campus network.<br/>🌐 Designed a <strong>hybrid working network</strong> solution with a <strong>site-to-site VPN</strong> for secure faculty & student remote access.'
    },
    {
      id: '2',
      avatar: '/myphoto.jpg',
      username: 'Neel Phadke',
      timestamp: 'Today at 11:30 AM',
      content: '<img src="/amazon-logo2.jpg" alt="Amazon" style="height: 24px; display: block; margin-bottom: 8px;"><strong>Amazon</strong> - System Development Engineer Intern<br/><em>July 2025 – Dec 2025</em><br/><br/>🔧 Worked on <strong>Access Key Rotation</strong> for an AWS IAM user.<br/>☕ Migrated an internal service to the <strong>latest JDK LTS version</strong>.'
    }
  ],
  'achievements': [
    {
      id: '1',
      avatar: '/myphoto.jpg',
      username: 'Neel Phadke',
      timestamp: 'Today at 12:00 PM',
      content: '🏆 Scored <strong>96.45 percentile</strong> in JEE Main Exam (2022).<br/><br/>📜 Meta Front-End Developer Specialization (Coursera).<br/><br/>📜 Algorithmic Toolbox (UC San Diego, Coursera).'
    }
  ],
  'contact': [
    {
      id: '1',
      avatar: '/myphoto.jpg',
      username: 'Neel Phadke',
      timestamp: 'Today at 12:30 PM',
      content: '📧 Want to get in touch? Drop me a DM!<br/><br/>• Email: <strong>neelphadke13579@gmail.com</strong><br/>• LinkedIn: <a href="https://www.linkedin.com/in/neel-phadke-b83638201" class="text-blue-400 hover:underline" target="_blank">linkedin.com/in/neel-phadke-b83638201</a>'
    }
  ]
}

function HomeContent() {
  const [activeChannel, setActiveChannel] = useState('home')
  const [messages, setMessages] = useState<Message[]>([])
  const [showDuckPond, setShowDuckPond] = useState(false)
  const [showDuckJoke, setShowDuckJoke] = useState(false)
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [typingType, setTypingType] = useState<'bot' | 'user'>('bot')
  const [visitedChannels, setVisitedChannels] = useState(new Set(['home']))
  const [showQuackBotDM, setShowQuackBotDM] = useState(false)
  const [dmViewed, setDmViewed] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const { preferences } = require('@/contexts/PreferencesContext').usePreferences()
  const loadTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

  useState(() => {
    const updatedChannelData = Object.fromEntries(
      Object.entries(channelData).map(([key, messages]) => [
        key,
        messages.map(msg => ({
          ...msg,
          timestamp: msg.isPinned ? 'Pinned' : `Today at ${loadTime}`
        }))
      ])
    )
    setMessages(updatedChannelData['home'])
    
    // Show QuackBot DM after 10 seconds
    setTimeout(() => {
      setShowQuackBotDM(true)
      setShowNotification(true)
      // Hide notification after 10 more seconds
      setTimeout(() => {
        setShowNotification(false)
      }, 10000)
    }, 10000)
  })

  const handleChannelSelect = (channel: string) => {
    setActiveChannel(channel)
    
    if (channel === 'quackbot-dm') {
      setDmViewed(true)
      setShowNotification(false)
      const dmMessage: Message = {
        id: 'dm-1',
        avatar: '🤖',
        username: 'QuackBot',
        timestamp: `Today at ${loadTime}`,
        content: 'Hope you\'re enjoying my portfolio!'
      }
      setMessages([dmMessage])
      return
    }
    
    const isFirstVisit = !visitedChannels.has(channel)
    
    if (isFirstVisit) {
      setIsTyping(true)
      setTypingType('user')
      setMessages([])
      setVisitedChannels(prev => new Set(Array.from(prev).concat(channel)))
      
      setTimeout(() => {
        setIsTyping(false)
        const channelMessages = channelData[channel] || []
        const updatedMessages = channelMessages.map(msg => ({
          ...msg,
          timestamp: msg.isPinned ? 'Pinned' : `Today at ${loadTime}`
        }))
        setMessages(updatedMessages)
      }, 1000)
    } else {
      const channelMessages = channelData[channel] || []
      const updatedMessages = channelMessages.map(msg => ({
        ...msg,
        timestamp: msg.isPinned ? 'Pinned' : `Today at ${loadTime}`
      }))
      setMessages(updatedMessages)
    }
  }

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase()
    
    setIsTyping(true)
    setTypingType('bot')
    
    setTimeout(() => {
      setIsTyping(false)
      
      if (cmd === '!about') {
      setActiveChannel('home')
      const aboutMessages = channelData['home'].map(msg => ({
        ...msg,
        timestamp: msg.isPinned ? 'Pinned' : `Today at ${loadTime}`
      }))
      setMessages(aboutMessages)
    } else if (cmd === '!projects') {
      setActiveChannel('projects')
      const projectMessages = channelData['projects'].map(msg => ({
        ...msg,
        timestamp: msg.isPinned ? 'Pinned' : `Today at ${loadTime}`
      }))
      setMessages(projectMessages)
    } else if (cmd === '!resume') {
      const resumeMessage: Message = {
        id: Date.now().toString(),
        avatar: '🤖',
        username: 'QuackBot',
        timestamp: 'Just now',
        content: `📎 <strong>Resume Download</strong><br/><a href="https://drive.google.com/file/d/1WrMrV3qu9RsF29Zt7b9sk570pve0tzAw/view?usp=drivesdk" class="text-blue-400 hover:underline" target="_blank">View Neel_Phadke_Resume.pdf</a>`
      }
      setMessages(prev => [...prev, resumeMessage])
    } else if (cmd === '!quack') {
      setShowDuckPond(true)
      setActiveChannel('duck-pond')
      setMessages([])
    } else if (cmd === '!quackquack') {
      setShowDuckJoke(true)
      setActiveChannel('duck-joke')
      setMessages([])
    } else if (cmd === '!email') {
      navigator.clipboard.writeText('neelphadke13579@gmail.com')
      const emailMessage: Message = {
        id: Date.now().toString(),
        avatar: '🤖',
        username: 'QuackBot',
        timestamp: 'Just now',
        content: '✅ <strong>Email copied to clipboard!</strong><br/>neelphadke13579@gmail.com'
      }
      setMessages(prev => [...prev, emailMessage])
    } else {
      const errorMessage: Message = {
        id: Date.now().toString(),
        avatar: '🤖',
        username: 'QuackBot',
        timestamp: 'Just now',
        content: `❌ Unknown command: <code>${command}</code><br/>Try: !about, !projects, !resume, !email, !quack, or !quackquack`
      }
      setMessages(prev => [...prev, errorMessage])
      }
    }, 1000)
  }

  return (
    <div className="h-screen flex flex-col relative">
      {showQuackBotDM && !dmViewed && showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 text-sm flex items-center justify-between rounded shadow-lg z-50">
          <div className="flex items-center gap-2">
            <span>🤖</span>
            <span><strong>QuackBot</strong> sent you a message</span>
          </div>
          <button 
            onClick={() => handleChannelSelect('quackbot-dm')}
            className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-xs transition-colors ml-4"
          >
            View
          </button>
        </div>
      )}
      <Navbar 
        activeChannel={activeChannel} 
        onMenuClick={() => setShowMobileSidebar(true)}
      />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar 
            activeChannel={activeChannel} 
            onChannelSelect={handleChannelSelect}
            showDuckPond={showDuckPond}
            showDuckJoke={showDuckJoke}
            showQuackBotDM={showQuackBotDM}
            dmViewed={dmViewed}
          />
        </div>
        
        {/* Mobile Sidebar Overlay */}
        {showMobileSidebar && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="w-64">
              <Sidebar 
                activeChannel={activeChannel} 
                onChannelSelect={(channel) => {
                  handleChannelSelect(channel)
                  setShowMobileSidebar(false)
                }}
                showDuckPond={showDuckPond}
                showDuckJoke={showDuckJoke}
                showQuackBotDM={showQuackBotDM}
                dmViewed={dmViewed}
              />
            </div>
            <div 
              className="flex-1 bg-black bg-opacity-50"
              onClick={() => setShowMobileSidebar(false)}
            />
          </div>
        )}
        
        {activeChannel === 'duck-pond' ? (
          <DuckPond />
        ) : activeChannel === 'duck-joke' ? (
          <DuckJoke />
        ) : (
          <ChatWindow 
            activeChannel={activeChannel}
            messages={messages}
            onCommand={handleCommand}
            isTyping={isTyping}
            typingType={typingType}
          />
        )}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <PreferencesProvider>
      <HomeContent />
    </PreferencesProvider>
  )
}