"use client"

import { useEffect, useState } from "react"

export default function ScrollEffects() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Floating Smoke Particles */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + ((scrollY * 0.1 + i * 50) % window.innerHeight)}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Flickering Lights */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 20}%`,
              top: `${10 + ((scrollY * 0.05 + i * 30) % 80)}%`,
              animationDelay: `${i * 0.8}s`,
              opacity: Math.sin(scrollY * 0.01 + i) * 0.3 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Mystical Orbs */}
      <div className="fixed inset-0 pointer-events-none z-15">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-burgundy-400 rounded-full blur-sm opacity-30"
            style={{
              left: `${80 - i * 25}%`,
              top: `${30 + Math.sin(scrollY * 0.005 + i * 2) * 20}%`,
              transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`,
            }}
          />
        ))}
      </div>
    </>
  )
}
