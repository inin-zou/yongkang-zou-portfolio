"use client"

import React, { useState, useEffect } from "react"

export default function CyberLoader() {
  const [progress, setProgress] = useState(0)
  const [currentLog, setCurrentLog] = useState("INITIALIZING CONNECTION...")
  const [hexDump, setHexDump] = useState("")

  const logs = [
    "ESTABLISHING SECURE LINK...",
    "BYPASSING FIREWALL...",
    "INJECTING PAYLOAD...",
    "ACCESSING MAINFRAME...",
    "DECRYPTING ARCHIVES...",
    "DOWNLOADING ASSETS...",
    "COMPILING NEURAL NET...",
    "RENDERING HOLOGRAMS...",
    "SYSTEM READY."
  ]

  // Progress and Log Simulation
  useEffect(() => {
    const totalTime = 2000 // 2 seconds total roughly
    const intervalTime = 50
    const steps = totalTime / intervalTime
    
    let currentStep = 0
    
    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min(100, Math.floor((currentStep / steps) * 100))
      setProgress(newProgress)

      // Change log every 10% roughly
      const logIndex = Math.min(logs.length - 1, Math.floor((newProgress / 100) * logs.length))
      setCurrentLog(logs[logIndex])

      if (currentStep >= steps) {
        clearInterval(timer)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  // Matrix/Hex Dump Effect
  useEffect(() => {
    const chars = "0123456789ABCDEF"
    const generateHex = () => {
      let str = ""
      for (let i = 0; i < 8; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
        if (i % 2 === 1 && i < 7) str += " "
      }
      return str
    }

    const hexTimer = setInterval(() => {
      setHexDump(generateHex() + " " + generateHex())
    }, 50)

    return () => clearInterval(hexTimer)
  }, [])

  return (
    <div className="cyber-loader">
      <div className="loader-content">
        <div className="scanner-line"></div>
        
        <div className="hex-background">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="hex-row" style={{ opacity: (10 - i) / 10 }}>
              {Array.from({ length: 4 }).map((_, j) => (
                <span key={j}>{Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0')} </span>
              ))}
            </div>
          ))}
        </div>

        <div className="loader-main">
          <div className="warning-box">
            <span className="blink-text">⚠ SYSTEM BREACH DETECTED</span>
          </div>
          
          <div className="glitch-text-container">
            <h2 className="loader-title" data-text="LOADING DATABASE">LOADING DATABASE</h2>
          </div>

          <div className="status-display">
            <div className="hex-stream">{hexDump}</div>
            <div className="current-log">{`> ${currentLog}`}</div>
          </div>

          <div className="cyber-progress-container">
            <div 
              className="cyber-progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="progress-text">{progress}% COMPLETE</div>
        </div>
      </div>
    </div>
  )
}
