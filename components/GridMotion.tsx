"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { ReactElement } from "react"

interface GridMotionProps {
  items: (string | ReactElement)[]
}

export default function GridMotion({ items }: GridMotionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderItem = (item: string | ReactElement, index: number) => {
    if (typeof item === "string") {
      // Check if it's an image URL
      if (item.startsWith("http") || item.startsWith("/")) {
        return (
          <div key={index} className="grid-motion-item image-item">
            <Image
              src={item}
              alt={`Grid item ${index}`}
              width={400}
              height={300}
              className="grid-motion-image"
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
            />
          </div>
        )
      }
      // Otherwise render as text
      return (
        <div key={index} className="grid-motion-item text-item">
          <p>{item}</p>
        </div>
      )
    }
    // Render JSX element
    return (
      <div key={index} className="grid-motion-item jsx-item">
        {item}
      </div>
    )
  }

  if (!mounted) return null

  return (
    <div className="grid-motion-container">
      {items.map((item, index) => renderItem(item, index))}
    </div>
  )
}