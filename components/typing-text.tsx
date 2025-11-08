"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  lines: string[]
  onComplete?: () => void
  speed?: number
  lineDelay?: number
}

export default function TypingText({ lines, onComplete, speed = 50, lineDelay = 500 }: TypingTextProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true)
      onComplete?.()
      return
    }

    const currentLine = lines[currentLineIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setCurrentText(currentLine.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1)
          setCurrentText("")
        }, lineDelay)
      }
    }, speed)

    return () => clearInterval(typeInterval)
  }, [currentLineIndex, lines, speed, lineDelay, onComplete])

  return (
    <div className="typing-container">
      {lines.slice(0, currentLineIndex).map((line, index) => (
        <div key={index} className="typed-line completed">
          {line}
        </div>
      ))}
      {currentLineIndex < lines.length && (
        <div className="typed-line current">
          {currentText}
          <span className="typing-cursor">_</span>
        </div>
      )}
    </div>
  )
}
