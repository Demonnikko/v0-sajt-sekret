"use client"

import { useEffect, useState } from "react"

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Layer 1 - Slowest */}
      <div className="absolute inset-0 opacity-20" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-burgundy-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-gold-400/15 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Layer 2 - Medium speed */}
      <div className="absolute inset-0 opacity-30" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <div className="absolute top-60 right-10 w-20 h-20 bg-burgundy-400/25 rounded-full blur-xl animate-mystical-glow" />
        <div className="absolute bottom-60 right-1/4 w-28 h-28 bg-gold-300/20 rounded-full blur-2xl animate-mystical-glow delay-1500" />
      </div>

      {/* Layer 3 - Fastest */}
      <div className="absolute inset-0 opacity-40" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gold-500/30 rounded-full blur-lg animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-burgundy-500/25 rounded-full blur-md animate-float delay-500" />
      </div>

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-burgundy-900/5 to-transparent"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      />
    </div>
  )
}
