"use client"

import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  isPlaying?: boolean
  barCount?: number
  height?: number
}

export default function AudioVisualizer({ isPlaying = true, barCount = 64, height = 200 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const audioDataRef = useRef<number[]>(new Array(barCount).fill(0))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()

    const barWidth = canvas.offsetWidth / barCount
    const colors = [
      "#00ff00", // Terminal green
      "#29adff", // Electric blue
      "#00fff7", // Neon cyan
      "#ff007f", // Hot magenta
      "#fff700", // Bright yellow
      "#ff004d", // Bright red
    ]

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, height)

      // Generate random audio data if playing
      if (isPlaying) {
        audioDataRef.current = audioDataRef.current.map((_, i) => {
          const baseFreq = Math.sin(Date.now() * 0.001 + i * 0.1) * 0.5 + 0.5
          const randomVariation = Math.random() * 0.3
          return Math.min(1, baseFreq + randomVariation)
        })
      }

      // Draw bars
      audioDataRef.current.forEach((value, i) => {
        const barHeight = value * height * 0.8
        const x = i * barWidth
        const y = height - barHeight

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(0, y, 0, height)
        const colorIndex = Math.floor((i / barCount) * colors.length)
        const color = colors[colorIndex]

        gradient.addColorStop(0, color)
        gradient.addColorStop(1, color + "40") // Add transparency

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth - 1, barHeight)

        // Add glow effect
        ctx.shadowColor = color
        ctx.shadowBlur = 10
        ctx.fillRect(x, y, barWidth - 1, barHeight)
        ctx.shadowBlur = 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [isPlaying, barCount, height]) // Removed audioData from dependencies

  return (
    <div className="audio-visualizer-container">
      <canvas ref={canvasRef} className="audio-visualizer-canvas" style={{ height: `${height}px` }} />
      <div className="visualizer-overlay">
        <div className="frequency-labels">
          <span>LOW</span>
          <span>MID</span>
          <span>HIGH</span>
        </div>
      </div>
    </div>
  )
}
