'use client'

import { usePreferences } from '@/contexts/PreferencesContext'

interface PreferencesProps {
  isOpen: boolean
  onClose: () => void
}

export default function Preferences({ isOpen, onClose }: PreferencesProps) {
  const { preferences, updatePreferences } = usePreferences()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-96 max-h-[80vh] overflow-y-auto rounded-lg" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
        <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border)' }}>
          <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Preferences</h2>
          <button 
            onClick={onClose} 
            className="hover:opacity-75"
            style={{ color: 'var(--text-secondary)' }}
          >
            ✕
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          <div>
            <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Appearance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Theme</span>
                <select 
                  value={preferences.theme} 
                  onChange={(e) => updatePreferences({ theme: e.target.value as 'dark' | 'light' })}
                  className="border rounded px-2 py-1 text-sm"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border)', 
                    color: 'var(--text-primary)' 
                  }}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Compact message view</span>
                <input 
                  type="checkbox" 
                  checked={preferences.compactView}
                  onChange={(e) => updatePreferences({ compactView: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Show timestamps</span>
                <input 
                  type="checkbox" 
                  checked={preferences.timestamps}
                  onChange={(e) => updatePreferences({ timestamps: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Behavior</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Bot interaction sounds</span>
                <input 
                  type="checkbox" 
                  checked={preferences.sounds}
                  onChange={(e) => updatePreferences({ sounds: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Auto-scroll to new messages</span>
                <input 
                  type="checkbox" 
                  checked={preferences.autoScroll}
                  onChange={(e) => updatePreferences({ autoScroll: e.target.checked })}
                  className="w-4 h-4"
                />
              </div>
            </div>
          </div>

        </div>
        
        <div className="p-4 flex justify-end gap-2" style={{ borderTop: '1px solid var(--border)' }}>
          <button 
            onClick={onClose}
            className="px-4 py-2 transition-colors hover:opacity-75"
            style={{ color: 'var(--text-secondary)' }}
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}