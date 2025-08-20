"use client"

import { useEffect, useState } from "react"

export default function MobileOptimizations() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTouch("ontouchstart" in window)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Add mobile-specific classes
    const root = document.documentElement

    if (isMobile) {
      root.classList.add("mobile-device")

      // Reduce animation intensity on mobile
      root.style.setProperty("--mobile-animation-scale", "0.5")

      // Optimize scroll performance
      root.style.setProperty("scroll-behavior", "smooth")
    }

    if (isTouch) {
      root.classList.add("touch-device")

      // Add touch-friendly hover states
      const style = document.createElement("style")
      style.textContent = `
        @media (hover: none) {
          .hover\\:scale-105:hover {
            transform: none;
          }
          .group:hover .group-hover\\:animate-spin {
            animation: none;
          }
        }
      `
      document.head.appendChild(style)
    }

    // Prevent zoom on input focus (iOS)
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport && isMobile) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no")
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      if (isMobile) {
        root.classList.remove("mobile-device")
        root.style.removeProperty("--mobile-animation-scale")
      }
      if (isTouch) {
        root.classList.remove("touch-device")
      }
    }
  }, [isMobile, isTouch])

  return null
}
