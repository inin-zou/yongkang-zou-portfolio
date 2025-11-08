"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [audioAvailable, setAudioAvailable] = useState(false)

  useEffect(() => {
    // Create audio context for web audio API instead of loading a file
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Create a simple beep sound using Web Audio API
      const createBeepSound = () => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.type = "square"

        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.1)
      }

      // Store the beep function instead of audio element
      setAudio({ play: createBeepSound } as any)
      setAudioAvailable(true)
    } catch (error) {
      console.log("Audio not available:", error)
      setAudioAvailable(false)
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  const toggleSound = () => {
    if (!audio || !audioAvailable) return

    if (isMuted) {
      // Play a simple beep sound when unmuting
      try {
        audio.play()
      } catch (error) {
        console.error("Audio playback failed:", error)
      }
    }

    setIsMuted(!isMuted)
  }

  // Don't render if audio is not available
  if (!audioAvailable) {
    return null
  }

  return (
    <button
      onClick={toggleSound}
      className="pixel-button p-1 flex items-center gap-1"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? (
        <>
          <VolumeX size={14} />
          <span className="text-xs hidden sm:inline">SOUND OFF</span>
        </>
      ) : (
        <>
          <Volume2 size={14} />
          <span className="text-xs hidden sm:inline">SOUND ON</span>
        </>
      )}
    </button>
  )
}
