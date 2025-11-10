"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import LetterGlitch from "./LetterGlitch"

export default function CyberpunkIntro() {
  const [showIntro, setShowIntro] = useState(true)
  const [animationStep, setAnimationStep] = useState<number>(0)
  const [buildingHeights, setBuildingHeights] = useState<number[]>([])

  // === 时间轴常量（只需要改这里）===
  const BG_SHOW_MS = 800
  const HACKER_SHOW_MS = 1600
  const CODE_SHOW_MS = 2400
  const CODE_FADE_START_MS = 3200
  const CODE_FADE_END_MS = 4000
  const INTRO_TEXT_START_MS = 4200

  // 让 intro-text 多停一会儿：把这个值改大即可
  const INTRO_TEXT_HOLD_MS = 7000  // intro-text 保持 7 秒
  const INTRO_PROMPT_MS = INTRO_TEXT_START_MS + 3000  // intro-text 显示 3 秒后显示 prompt

  const FADE_OUT_START_MS = INTRO_TEXT_START_MS + INTRO_TEXT_HOLD_MS + 300  // 给 300ms 缓冲
  const UNMOUNT_MS = FADE_OUT_START_MS + 2000 // 淡出 2s 后卸载

  useEffect(() => {
    setBuildingHeights(Array.from({ length: 8 }, () => Math.random() * 60 + 40))
  }, [])

  useEffect(() => {
    const timers: number[] = []
    const schedule = (delay: number, step: number) => {
      timers.push(window.setTimeout(() => setAnimationStep(step), delay))
    }

    schedule(BG_SHOW_MS, 1)
    schedule(HACKER_SHOW_MS, 2)
    schedule(CODE_SHOW_MS, 3)
    schedule(CODE_FADE_START_MS, 3.5)
    schedule(CODE_FADE_END_MS, 4)
    schedule(INTRO_TEXT_START_MS, 5)      // 显示 intro-text
    schedule(INTRO_PROMPT_MS, 6)           // 显示 "PRESS ANY KEY ..."
    schedule(FADE_OUT_START_MS, 7)         // 开始淡出

    // 卸载
    timers.push(window.setTimeout(() => setShowIntro(false), UNMOUNT_MS))

    // 可选：按任意键提前跳过
    const onKey = () => setShowIntro(false)
    window.addEventListener("keydown", onKey)

    return () => {
      timers.forEach(id => clearTimeout(id))
      window.removeEventListener("keydown", onKey)
    }
  }, []) // 只运行一次

  if (!showIntro) return null

  return (
    <div className={`cyberpunk-intro ${animationStep >= 7 ? "fade-out" : ""}`}>
      <div className="intro-overlay">
        <div className={`intro-background ${animationStep >= 1 ? "visible" : ""}`}>
          <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth />
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
              {animationStep < 5 && (
                <div className={`code-lines ${animationStep >= 3.5 ? "code-fade-out" : ""}`}>
                  <div className="code-line">{">"}  INITIALIZING SYSTEM...</div>
                  <div className="code-line">{">"}  LOADING NEURAL NETWORKS...</div>
                  <div className="code-line">{">"}  CONNECTING TO MAINFRAME...</div>
                  <div className="code-line">{">"}  ACCESS GRANTED</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`intro-text ${animationStep >= 5 ? "visible" : ""}`}>
          <h1 className="intro-title">YONGKANG ZOU</h1>
          <p className="intro-subtitle">AI ENGINEER</p>
        </div>

        <div className={`intro-prompt ${animationStep >= 6 ? "visible" : ""}`}>
          <p className="boot-text">PRESS ANY KEY TO CONTINUE...</p>
        </div>
      </div>
    </div>
  )
}
