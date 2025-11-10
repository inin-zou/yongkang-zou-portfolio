"use client"

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import './Carousel.css'

interface CarouselProps {
  children: ReactNode[]
  baseWidth?: number
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  round?: boolean
}

export default function Carousel({
  children,
  baseWidth = 300,
  autoplay = true,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  round = false,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const itemCount = React.Children.count(children)

  const goToNext = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev + 1) % itemCount)
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, itemCount - 1))
    }
  }

  const goToPrev = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (autoplay && !isPaused) {
      timerRef.current = setInterval(() => {
        goToNext()
      }, autoplayDelay)

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }
  }, [autoplay, isPaused, currentIndex, autoplayDelay])

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false)
    }
  }

  return (
    <div 
      className="carousel-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="carousel-wrapper">
        <button 
          className="carousel-button carousel-button-prev"
          onClick={goToPrev}
          disabled={!loop && currentIndex === 0}
        >
          ‹
        </button>

        <div className="carousel-viewport">
          <div 
            className="carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {React.Children.map(children, (child, index) => (
              <div 
                key={index}
                className="carousel-slide"
                style={{ minWidth: `${baseWidth}px` }}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-button carousel-button-next"
          onClick={goToNext}
          disabled={!loop && currentIndex === itemCount - 1}
        >
          ›
        </button>
      </div>

      <div className="carousel-indicators">
        {Array.from({ length: itemCount }).map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}