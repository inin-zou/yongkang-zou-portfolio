'use client'

import { useEffect, useRef } from 'react'

interface AudioVisualizerProps {
  isPlaying?: boolean
  barCount?: number
  height?: number
}

export function AudioVisualizer({ isPlaying = false, barCount = 64, height = 200 }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const barsRef = useRef<number[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize bars with random heights
    if (barsRef.current.length === 0) {
      barsRef.current = Array.from({ length: barCount }, () => Math.random() * 0.5 + 0.2)
    }

    const bars = barsRef.current
    let phase = 0

    const animate = (time: number) => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)

      const width = canvas.offsetWidth
      const canvasHeight = canvas.offsetHeight
      const barWidth = width / barCount

      ctx.clearRect(0, 0, width, canvasHeight)

      // Update and draw bars
      bars.forEach((bar, i) => {
        if (isPlaying) {
          // Simulate audio reactivity with sine waves
          const wave1 = Math.sin(phase + i * 0.1) * 0.3
          const wave2 = Math.sin(phase * 1.5 + i * 0.15) * 0.2
          const target = Math.abs(wave1 + wave2) + 0.2
          bars[i] += (target - bars[i]) * 0.1
        } else {
          // Gradually decrease to minimum height when not playing
          bars[i] += (0.2 - bars[i]) * 0.05
        }

        const barHeight = bars[i] * canvasHeight
        const x = i * barWidth
        const y = canvasHeight - barHeight

        // Create gradient for each bar
        const gradient = ctx.createLinearGradient(x, y, x, canvasHeight)
        gradient.addColorStop(0, '#00e5ff')
        gradient.addColorStop(1, '#0066ff')

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth - 2, barHeight)

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00e5ff'
        ctx.fillRect(x, y, barWidth - 2, barHeight)
        ctx.shadowBlur = 0
      })

      if (isPlaying) {
        phase += 0.05
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, barCount])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: `${height}px`,
        display: 'block',
      }}
    />
  )
}
