"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  from?: number
  to: number
  separator?: string
  direction?: "up" | "down"
  duration?: number
  className?: string
}

export default function CountUp({
  from = 0,
  to,
  separator = ",",
  direction = "up",
  duration = 1,
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(from)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const start = direction === "up" ? from : to
    const end = direction === "up" ? to : from
    const range = end - start
    const increment = range / (duration * 60)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (
        (direction === "up" && current >= end) ||
        (direction === "down" && current <= end)
      ) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [isVisible, from, to, direction, duration])

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  }

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
    </span>
  )
}