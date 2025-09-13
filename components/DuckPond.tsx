'use client'

import { useState, useEffect, useRef, useCallback } from 'react'



export default function DuckPond() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameRunning, setGameRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  
  const gameStateRef = useRef({
    duck: { x: 50, y: 140, width: 40, height: 40, velocityY: 0, jumping: false },
    obstacles: [] as Array<{ x: number; y: number; width: number; height: number }>,
    gameSpeed: 3,
    score: 0
  })

  useEffect(() => {
    const saved = localStorage.getItem('duckGameHighScore')
    if (saved) setHighScore(parseInt(saved))
  }, [])

  const saveHighScore = useCallback((newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore)
      localStorage.setItem('duckGameHighScore', newScore.toString())
    }
  }, [highScore])

  const resetGame = useCallback(() => {
    gameStateRef.current = {
      duck: { x: 50, y: 140, width: 40, height: 40, velocityY: 0, jumping: false },
      obstacles: [],
      gameSpeed: 3,
      score: 0
    }
    setScore(0)
    setGameOver(false)
  }, [])

  const startGame = useCallback(() => {
    resetGame()
    setGameRunning(true)
  }, [resetGame])

  const stopGame = useCallback(() => {
    setGameRunning(false)
    saveHighScore(gameStateRef.current.score)
  }, [saveHighScore])

  const jump = useCallback(() => {
    if (!gameStateRef.current.duck.jumping) {
      gameStateRef.current.duck.velocityY = -12
      gameStateRef.current.duck.jumping = true
    }
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (!gameRunning && !gameOver) {
          startGame()
        } else if (gameRunning) {
          jump()
        } else if (gameOver) {
          startGame()
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameRunning, gameOver, startGame, jump])

  useEffect(() => {
    if (!gameRunning) return

    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gameLoop = () => {
      const game = gameStateRef.current
      
      // Clear canvas
      ctx.fillStyle = '#87CEEB'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update duck physics
      game.duck.velocityY += 0.8 // gravity
      game.duck.y += game.duck.velocityY
      
      // Ground collision
      if (game.duck.y >= 140) {
        game.duck.y = 140
        game.duck.velocityY = 0
        game.duck.jumping = false
      }
      
      // Draw duck emoji
      ctx.font = '40px Arial'
      ctx.fillText('🦆', game.duck.x, game.duck.y + 35)
      
      // Update obstacles
      game.obstacles = game.obstacles.filter(obstacle => {
        obstacle.x -= game.gameSpeed
        return obstacle.x > -obstacle.width
      })
      
      // Add new obstacles
      if (Math.random() < 0.01) {
        game.obstacles.push({
          x: canvas.width,
          y: 160,
          width: 20,
          height: 40
        })
      }
      
      // Draw obstacles
      ctx.fillStyle = '#228B22'
      game.obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      })
      
      // Collision detection
      game.obstacles.forEach(obstacle => {
        if (game.duck.x < obstacle.x + obstacle.width &&
            game.duck.x + game.duck.width > obstacle.x &&
            game.duck.y < obstacle.y + obstacle.height &&
            game.duck.y + game.duck.height > obstacle.y) {
          setGameRunning(false)
          setGameOver(true)
          saveHighScore(game.score)
        }
      })
      
      // Update score
      game.score += 1
      setScore(game.score)
      
      // Increase speed
      if (game.score % 500 === 0) {
        game.gameSpeed += 0.5
      }
      
      // Draw ground
      ctx.fillStyle = '#8B4513'
      ctx.fillRect(0, 180, canvas.width, 40)
    }

    const interval = setInterval(gameLoop, 16)
    return () => clearInterval(interval)
  }, [gameRunning, saveHighScore])



  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-900 to-blue-800 p-4 overflow-hidden">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">🦆 Duck Pond Game! 🦆</h2>
        <p className="text-blue-200 text-sm">Press SPACE to jump and avoid obstacles!</p>
      </div>

      <div className="bg-blue-700/50 rounded-lg p-4 flex-1 flex flex-col min-h-0">
        <div className="flex justify-between mb-3 text-white text-sm">
          <span>Score: {score}</span>
          <span>High Score: {highScore}</span>
          {gameRunning && (
            <button 
              onClick={stopGame}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
            >
              Stop Game
            </button>
          )}
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={650}
            height={220}
            className="w-full max-h-full border-2 border-blue-600 rounded bg-sky-200"
            onClick={() => {
              if (!gameRunning && !gameOver) {
                startGame()
              } else if (gameRunning) {
                jump()
              } else if (gameOver) {
                startGame()
              }
            }}
          />
        </div>
        
        <div className="text-center mt-3 text-white text-sm">
          {!gameRunning && !gameOver && <p>Press SPACE or click to start!</p>}
          {gameOver && <p>Game Over! Press SPACE or click to restart</p>}
          {gameRunning && <p>Press SPACE or click to jump!</p>}
        </div>
      </div>

      <div className="mt-4 text-center text-blue-200 text-xs">
        <p>🎉 Easter egg unlocked! You used the !quack command.</p>
      </div>
    </div>
  )
}