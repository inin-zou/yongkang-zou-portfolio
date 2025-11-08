"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import FloatingNav from "@/components/floating-nav"
import CyberpunkIntro from "@/components/cyberpunk-intro"
import { useSound } from "@/components/sound-provider"

export default function Home() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [imageError, setImageError] = useState(false)
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
    { label: "ABOUT", action: () => router.push("/about") },
    { label: "MUSIC", action: () => router.push("/music") },
    { label: "CONTACT", action: () => router.push("/contact") },
  ]

  // Hide intro after 5 seconds or on any key press
  useEffect(() => {
    const handleKeyPress = () => {
      setShowIntro(false)
      playSound("click")
    }

    const timer = setTimeout(() => setShowIntro(false), 5000)

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
        <div className="profile-frame">
          {!imageError ? (
            <Image
              src="/images/profile_black.jpg"
              alt="Yongkang Zou Profile"
              width={300}
              height={400}
              className="profile-image"
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div
              className="profile-placeholder"
              style={{
                width: "300px",
                height: "400px",
                background: "rgba(0, 255, 247, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid var(--modern-accent)",
              }}
            >
              <span style={{ color: "var(--modern-accent)", fontSize: "0.8rem", textAlign: "center" }}>
                PROFILE IMAGE
                <br />
                LOADING...
              </span>
            </div>
          )}
        </div>

        <div className="intro-content">
          <h1 className="blinking-cursor">Hi, I'm Yongkang Zou</h1>

          <p className="terminal-prompt">
            AI Engineer specializing in LLMs, RAG systems, and intelligent agent workflows.
          </p>

          <p className="terminal-prompt">
            Currently at <span className="company">Misogi Labs</span>, previously at{" "}
            <span className="company">Société Générale</span>.
          </p>

          <p className="terminal-prompt">
            Recent graduate from Université Paris Dauphine, with a focus on applied AI and scalable retrieval-augmented
            systems.
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
