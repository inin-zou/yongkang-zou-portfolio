"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import FloatingNav from "@/components/floating-nav"
import CyberpunkIntro from "@/components/cyberpunk-intro"
import { useSound } from "@/components/sound-provider"

import Spline from '@splinetool/react-spline'

export default function Home() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const introSectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { playSound } = useSound()

  const scrollToIntro = () => {
    introSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const menuItems = [
    { label: "START", action: () => scrollToIntro() },
    { label: "PROJECTS", action: () => router.push("/projects") },
    { label: "ABOUT ME", action: () => router.push("/about") },
    { label: "BLOGS", action: () => router.push("/writing") },
    { label: "MUSIC", action: () => router.push("/music") },
    { label: "CONTACT", action: () => router.push("/contact") },
  ]

  // Hide intro after animation completes or on any key press
  useEffect(() => {
    const handleKeyPress = () => {
      setShowIntro(false)
      playSound("click")
    }

    const timer = setTimeout(() => setShowIntro(false), 13500)

    window.addEventListener("keydown", handleKeyPress)
    window.addEventListener("click", handleKeyPress)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("click", handleKeyPress)
    }
  }, [playSound])

  // Keyboard navigation
  useEffect(() => {
    if (showIntro) return

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
  }, [selectedMenuItem, playSound, showIntro])

  return (
    <>
      {showIntro && <CyberpunkIntro />}

      {/* Boot Screen */}
      <div className="boot-screen">
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

      {/* Personal Introduction Section */}
      <div className="intro-section" ref={introSectionRef}>
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

      <FloatingNav />
    </>
  )
}
