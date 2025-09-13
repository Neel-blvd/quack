'use client'

import { useState } from 'react'

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
  "Why do Java developers wear glasses? Because they can't C# 👓",
  "What's a programmer's favorite hangout place? Foo Bar! 🍺",
  "Why did the developer go broke? Because he used up all his cache! 💸",
  "What do you call a programmer from Finland? Nerdic! 🇫🇮",
  "Why do programmers hate nature? It has too many bugs! 🌿",
  "How do you comfort a JavaScript bug? You console it! 🐞"
]

export default function DuckJoke() {
  const [currentJoke, setCurrentJoke] = useState(() => 
    Math.floor(Math.random() * jokes.length)
  )

  const getNewJoke = () => {
    setCurrentJoke(Math.floor(Math.random() * jokes.length))
  }

  return (
    <div className="flex-1 flex flex-col" style={{ backgroundColor: 'var(--bg-sidebar)' }}>
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="text-center max-w-3xl">
          <div className="text-6xl mb-6">🦆🎭</div>
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            Duck Joke Channel
          </h2>
          
          <div className="p-8 rounded-lg mb-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="text-2xl mb-4">🎭</div>
            <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Dev Joke of the Day
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {jokes[currentJoke]}
            </p>
          </div>

          <button
            onClick={getNewJoke}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6"
          >
            Get Another Joke! 😄
          </button>

          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Use !quackquack for random jokes in any channel!
          </p>
          
          <div className="mt-8 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <p>🎉 Easter egg unlocked! You used the !quackquack command.</p>
          </div>
        </div>
      </div>
    </div>
  )
}