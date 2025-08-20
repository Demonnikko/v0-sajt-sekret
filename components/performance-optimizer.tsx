"use client"

import { useEffect, useState } from "react"

export default function PerformanceOptimizer() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [lowPerformance, setLowPerformance] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    // Detect low performance devices
    const detectPerformance = () => {
      // Check device memory (if available)
      const deviceMemory = (navigator as any).deviceMemory
      if (deviceMemory && deviceMemory < 4) {
        setLowPerformance(true)
        return
      }

      // Check hardware concurrency
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        setLowPerformance(true)
        return
      }

      // Performance timing check
      const start = performance.now()
      for (let i = 0; i < 100000; i++) {
        Math.random()
      }
      const end = performance.now()

      if (end - start > 10) {
        setLowPerformance(true)
      }
    }

    detectPerformance()

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  useEffect(() => {
    // Apply performance optimizations
    const root = document.documentElement

    if (reducedMotion) {
      root.style.setProperty("--animation-duration", "0.01ms")
      root.style.setProperty("--transition-duration", "0.01ms")
    }

    if (lowPerformance) {
      // Reduce particle count
      root.style.setProperty("--particle-count", "5")
      // Disable complex animations
      root.classList.add("low-performance")
    }

    return () => {
      if (reducedMotion) {
        root.style.removeProperty("--animation-duration")
        root.style.removeProperty("--transition-duration")
      }
      if (lowPerformance) {
        root.style.removeProperty("--particle-count")
        root.classList.remove("low-performance")
      }
    }
  }, [reducedMotion, lowPerformance])

  return null
}
