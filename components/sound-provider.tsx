"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

type SoundType = "click" | "hover" | "success" | "error" | "notify"

interface SoundContextType {
  isMuted: boolean
  toggleMute: () => void
  playSound: (type: SoundType) => void
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playSound: () => {},
})

export function useSound() {
  return useContext(SoundContext)
}

export default function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const context = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(context)
    }
  }, [])

  const createBeepSound = useCallback(
    (frequency: number, duration: number, volume: number) => {
      if (!audioContext || isMuted) return

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.type = "square"
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    },
    [audioContext, isMuted],
  )

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const playSound = useCallback(
    (type: SoundType) => {
      if (isMuted || !audioContext) return

      switch (type) {
        case "click":
          createBeepSound(800, 0.1, 0.1)
          break
        case "hover":
          createBeepSound(600, 0.05, 0.05)
          break
        case "success":
          createBeepSound(1200, 0.15, 0.1)
          break
        case "error":
          createBeepSound(300, 0.2, 0.1)
          break
        case "notify":
          createBeepSound(900, 0.1, 0.1)
          break
      }
    },
    [isMuted, audioContext, createBeepSound],
  )

  return <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>{children}</SoundContext.Provider>
}
