'use client'

interface NavbarProps {
  activeChannel: string
  onMenuClick?: () => void
}

export default function Navbar({ activeChannel, onMenuClick }: NavbarProps) {
  return (
    <div className="h-12 flex items-center px-4" style={{ backgroundColor: 'var(--bg-sidebar)', borderBottom: '1px solid var(--border)' }}>
      <button 
        className="md:hidden mr-3 p-1 rounded"
        onClick={onMenuClick}
        style={{ color: 'var(--text-primary)' }}
      >
        ☰
      </button>
      <div className="flex items-center gap-2">
        <span className="text-lg">🦆</span>
        <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Quack</span>
      </div>
      

      

    </div>
  )
}