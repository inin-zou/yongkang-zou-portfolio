"use client"

import { useRef, useEffect, ReactNode } from "react"
import { gsap } from "gsap"
import { Draggable } from "gsap/Draggable"

gsap.registerPlugin(Draggable)

interface DraggableCardProps {
  children: ReactNode
  id: string
  initialPosition?: { x: number; y: number }
  initialRotation?: number
  className?: string
}

export default function DraggableCard({
  children,
  id,
  initialPosition = { x: 0, y: 0 },
  initialRotation = 0,
  className = "",
}: DraggableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const draggableInstance = useRef<Draggable[] | null>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Set initial position and rotation
    gsap.set(cardRef.current, {
      x: initialPosition.x,
      y: initialPosition.y,
      rotation: initialRotation,
    })

    // Create draggable instance
    draggableInstance.current = Draggable.create(cardRef.current, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: "body",
      inertia: true,
      allowEventDefault: true,
      onClick: function() {
        // Bring to front on click
        gsap.set(cardRef.current, { zIndex: 100 })
        gsap.to(cardRef.current, {
          duration: 0.3,
          scale: 1.05,
          boxShadow: "0 20px 60px rgba(0, 255, 255, 0.4)",
          ease: "power2.out",
        })
      },
      onDragStart: function() {
        gsap.to(cardRef.current, {
          duration: 0.2,
          scale: 1.1,
          rotation: `+=${Math.random() * 10 - 5}`,
          boxShadow: "0 25px 80px rgba(0, 255, 255, 0.5)",
          ease: "power2.out",
        })
      },
      onDragEnd: function() {
        gsap.to(cardRef.current, {
          duration: 0.3,
          scale: 1,
          boxShadow: "0 10px 40px rgba(0, 255, 255, 0.3)",
          ease: "elastic.out(1, 0.3)",
        })
        // Reset z-index after a delay
        gsap.to(cardRef.current, { zIndex: 1, delay: 0.5 })
      },
    })

    return () => {
      if (draggableInstance.current) {
        draggableInstance.current[0].kill()
      }
    }
  }, [initialPosition, initialRotation])

  return (
    <div
      ref={cardRef}
      className={`draggable-card ${className}`}
      style={{
        cursor: "grab",
        touchAction: "none",
        userSelect: "none",
        position: "relative",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}