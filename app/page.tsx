"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import FloatingNav from "@/components/floating-nav"
import CosmicIntro from "@/components/cosmic-intro"
import { useSound } from "@/components/sound-provider"

import Spline from '@splinetool/react-spline'

export default function Home() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [hasBooted, setHasBooted] = useState(false)
  const introSectionRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { playSound } = useSound()

  console.log("🎬 HOME COMPONENT - showIntro:", showIntro)

  const handleIntroComplete = useCallback(() => {
    console.log("✅ Intro animation complete - hiding intro")
    setShowIntro(false)
  }, [])

  const enterSystem = () => {
    setHasBooted(true)
    playSound("click")
  }

  const menuItems = [
    { label: "START", action: () => enterSystem() },
    { label: "PROJECTS", action: () => router.push("/projects") },
    { label: "ABOUT ME", action: () => router.push("/about") },
    { label: "BLOGS", action: () => router.push("/writing") },
    { label: "MUSIC", action: () => router.push("/music") },
    { label: "CONTACT", action: () => router.push("/contact") },
  ]

  // Hide intro after animation completes or on any key press
  useEffect(() => {
    const handleSkipIntro = (e: KeyboardEvent | MouseEvent | TouchEvent) => {
      if (e instanceof KeyboardEvent && e.key === "Escape") {
         console.log("⏭️ ESC pressed - skipping intro")
         setShowIntro(false)
         playSound("click")
      } else if (e instanceof MouseEvent || e instanceof TouchEvent) {
         console.log("⏭️ Touch/Click - skipping intro")
         setShowIntro(false)
         playSound("click")
      }
    }

    window.addEventListener("keydown", handleSkipIntro)
    window.addEventListener("click", handleSkipIntro)
    window.addEventListener("touchstart", handleSkipIntro)

    return () => {
      window.removeEventListener("keydown", handleSkipIntro)
      window.removeEventListener("click", handleSkipIntro)
      window.removeEventListener("touchstart", handleSkipIntro)
    }
  }, [playSound])

  useEffect(() => {
    console.log("📺 showIntro state changed to:", showIntro)
  }, [showIntro])

  // Keyboard navigation
  useEffect(() => {
    if (showIntro || hasBooted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault()
          setSelectedMenuItem((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1))
          playSound("hover")
          break
        case "ArrowDown":
          e.preventDefault()
          setSelectedMenuItem((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0))
          playSound("hover")
          break
        case "Enter":
          e.preventDefault()
          playSound("click")
          menuItems[selectedMenuItem].action()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedMenuItem, playSound, showIntro, hasBooted])

  return (
    <>
      {showIntro && <CosmicIntro onComplete={handleIntroComplete} />}

      <div className="monitor-scroll-area" ref={scrollAreaRef}>
        {/* Boot Section (Menu) */}
        {!hasBooted && (
          <div className="boot-section">
              <h1 className="game-title blinking-cursor">SYSTEM BOOT INITIALIZED</h1>
              <p className="game-subtitle">Press ↑ or ↓ to navigate, ENTER to select</p>

              <div className="menu-container">
                {menuItems.map((item, index) => (
                  <button
                    key={item.label}
                    className={`menu-item ${index === selectedMenuItem ? "selected" : ""}`}
                    onClick={() => {
                      playSound("click")
                      item.action()
                    }}
                    onMouseEnter={() => {
                      setSelectedMenuItem(index)
                      playSound("hover")
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
          </div>
        )}
        
        {/* Personal Introduction Section */}
        {hasBooted && (
          <div className="intro-section fade-in" ref={introSectionRef}>
            <div className="w-full h-[500px]">
              <Spline scene="/digital_pass_scene.splinecode" />
            </div>

            <div className="intro-content">
              <h1 className="blinking-cursor">Hi, I'm Yongkang Zou</h1>

              <p className="terminal-prompt">
                AI Engineer based in Paris, <span className="artist">8x AI Hackathon winner</span>, specializing in LLMs, RAG systems, and Agentic AI.
              </p>

              <p className="terminal-prompt">
                Currently at <span className="company">Mozart AI</span>, previously at{" "}
                <span className="company">Société Générale</span>.
              </p>

              <p className="terminal-prompt">
                Recent graduate from Université Paris Dauphine (2024), with a focus on applied AI and Multimodal AI use cases.
              </p>

              <p className="terminal-prompt">
                Also an independent RnB artist, performing under the name <span className="artist">inhibitor</span>.
              </p>
            </div>
          </div>
        )}
      </div>
      
      <FloatingNav visible={hasBooted} />
    </>
  )
}
