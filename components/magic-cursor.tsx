"use client"

import { useState, useEffect } from "react"
import { Sparkles, Wand2 } from "lucide-react"

export default function MagicCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [sparkles, setSparkles] = useState<
    Array<{
      id: number
      x: number
      y: number
      opacity: number
    }>
  >([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Add sparkle trail
      if (Math.random() > 0.8) {
        const newSparkle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          opacity: 1,
        }

        setSparkles((prev) => [...prev.slice(-10), newSparkle])

        // Remove sparkle after animation
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id))
        }, 1000)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Magic Wand Cursor */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-100 hidden md:block"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${isClicking ? 1.2 : 1}) rotate(${isClicking ? 15 : 0}deg)`,
        }}
      >
        <div className="relative">
          <Wand2 className="w-6 h-6 text-gold-400 drop-shadow-lg" />
          <div className="absolute -top-1 -right-1">
            <Sparkles className={`w-3 h-3 text-gold-300 ${isClicking ? "animate-spin" : "animate-pulse"}`} />
          </div>
        </div>
      </div>

      {/* Sparkle Trail */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none z-40 animate-ping"
          style={{
            left: sparkle.x - 2,
            top: sparkle.y - 2,
            opacity: sparkle.opacity,
          }}
        >
          <div className="w-1 h-1 bg-gold-400 rounded-full" />
        </div>
      ))}
    </>
  )
}
