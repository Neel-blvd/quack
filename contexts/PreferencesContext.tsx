'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface PreferencesState {
  theme: 'dark' | 'light'
  sounds: boolean
  autoScroll: boolean
  timestamps: boolean
  compactView: boolean
  resumeFormat: 'pdf' | 'doc'
}

interface PreferencesContextType {
  preferences: PreferencesState
  updatePreferences: (updates: Partial<PreferencesState>) => void
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<PreferencesState>({
    theme: 'dark',
    sounds: true,
    autoScroll: true,
    timestamps: true,
    compactView: false,
    resumeFormat: 'pdf'
  })

  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [preferences.theme])

  const updatePreferences = (updates: Partial<PreferencesState>) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, ...updates }
      if (updates.theme) {
        if (updates.theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
      return newPrefs
    })
  }

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export function usePreferences() {
  const context = useContext(PreferencesContext)
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider')
  }
  return context
}