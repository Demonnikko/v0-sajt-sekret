"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface TextAnimationsProps {
  children: React.ReactNode
  type?: "typewriter" | "fade" | "slide" | "bounce" | "glow"
  delay?: number
  speed?: number
  className?: string
}

export default function TextAnimations({
  children,
  type = "fade",
  delay = 0,
  speed = 50,
  className = "",
}: TextAnimationsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const elementRef = useRef<HTMLDivElement>(null)
  const text = typeof children === "string" ? children : ""

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
            if (type === "typewriter") {
              startTypewriter()
            }
          }, delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, type])

  const startTypewriter = () => {
    let i = 0
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, speed)
  }

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0"

    switch (type) {
      case "fade":
        return "animate-fade-in"
      case "slide":
        return "animate-slide-up"
      case "bounce":
        return "animate-bounce-in"
      case "glow":
        return "animate-glow-in"
      default:
        return "animate-fade-in"
    }
  }

  return (
    <div ref={elementRef} className={`${getAnimationClass()} ${className}`}>
      {type === "typewriter" ? displayText : children}
      {type === "typewriter" && isVisible && displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  )
}
