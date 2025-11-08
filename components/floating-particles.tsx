"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  duration: number
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Create initial particles
    const colors = ["#29ADFF", "#FF007F", "#00FFF7", "#FFF700", "#FF004D", "#00FF00"]
    const initialParticles: Particle[] = []

    for (let i = 0; i < 50; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 1,
        duration: Math.random() * 10 + 10,
      })
    }

    setParticles(initialParticles)
  }, [])

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            bottom: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animation: `float ${particle.duration}s linear infinite`,
            animationDelay: `-${Math.random() * particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
