"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function CyberpunkIntro() {
  const [showIntro, setShowIntro] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const steps = [
      { delay: 500, step: 1 }, // Show background
      { delay: 1000, step: 2 }, // Show hacker image
      { delay: 1500, step: 3 }, // Show code
      { delay: 2000, step: 4 }, // Show figure
      { delay: 3000, step: 5 }, // Show complete scene
      { delay: 4000, step: 6 }, // Start fade out
    ]

    steps.forEach(({ delay, step }) => {
      setTimeout(() => setAnimationStep(step), delay)
    })

    // Hide intro after animation
    setTimeout(() => setShowIntro(false), 5000)
  }, [])

  if (!showIntro) return null

  return (
    <div className={`cyberpunk-intro ${animationStep >= 6 ? "fade-out" : ""}`}>
      <div className="intro-overlay">
        <div className={`intro-background ${animationStep >= 1 ? "visible" : ""}`}>
          <div className="city-skyline">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="building"
                style={{
                  height: `${Math.random() * 60 + 40}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className={`intro-scene ${animationStep >= 2 ? "visible" : ""}`}>
          <Image
            src="/images/cyberpunk-hacker.png"
            alt="Cyberpunk Hacker Scene"
            fill
            className="scene-image"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className={`intro-monitors ${animationStep >= 3 ? "visible" : ""}`}>
          <div className="monitor monitor-1">
            <div className="monitor-screen">
              <div className="code-lines">
                <div className="code-line">{">"} INITIALIZING SYSTEM...</div>
                <div className="code-line">{">"} LOADING NEURAL NETWORKS...</div>
                <div className="code-line">{">"} CONNECTING TO MAINFRAME...</div>
                <div className="code-line">{">"} ACCESS GRANTED</div>
              </div>
            </div>
          </div>
        </div>

        <div className={`intro-text ${animationStep >= 4 ? "visible" : ""}`}>
          <h1 className="intro-title">YONGKANG ZOU</h1>
          <p className="intro-subtitle">AI ENGINEER</p>
        </div>

        <div className={`intro-prompt ${animationStep >= 5 ? "visible" : ""}`}>
          <p className="boot-text">PRESS ANY KEY TO CONTINUE...</p>
        </div>
      </div>
    </div>
  )
}
