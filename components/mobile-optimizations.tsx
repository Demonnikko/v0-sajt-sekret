"use client"

import { useEffect, useState } from "react"

export default function MobileOptimizations() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait")

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setIsMobile(width < 768)
      setIsTouch("ontouchstart" in window)
      setOrientation(width > height ? "landscape" : "portrait")
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", checkMobile)

    const root = document.documentElement

    if (isMobile) {
      root.classList.add("mobile-device")

      root.style.setProperty("--mobile-animation-scale", "0.7")
      root.style.setProperty("--mobile-particle-count", "15")
      root.style.setProperty("--mobile-blur-intensity", "8px")

      // Optimize scroll performance
      root.style.setProperty("scroll-behavior", "smooth")
      root.style.setProperty("-webkit-overflow-scrolling", "touch")

      // Reduce motion for better performance
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.style.setProperty("--animation-duration", "0.1s")
      }
    }

    if (isTouch) {
      root.classList.add("touch-device")

      const style = document.createElement("style")
      style.textContent = `
        @media (hover: none) and (pointer: coarse) {
          .hover\\:scale-105:hover { transform: none; }
          .group:hover .group-hover\\:animate-spin { animation: none; }
          
          /* Touch-friendly button sizes */
          button, .cursor-pointer { min-height: 44px; min-width: 44px; }
          
          /* Improved touch targets */
          .touch-target { 
            padding: 12px; 
            margin: 4px;
            border-radius: 8px;
          }
          
          /* Disable hover effects on mobile */
          .magic-glow:hover { box-shadow: none; }
          .hover-scale:hover { transform: none; }
        }
        
        /* Mobile-specific animations */
        @media (max-width: 768px) {
          .animate-float { 
            animation-duration: 4s;
            animation-timing-function: ease-in-out;
          }
          
          .magic-particles { 
            opacity: 0.6;
            transform: scale(0.8);
          }
          
          /* Optimize text rendering */
          body { 
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
          
          /* Mobile typography adjustments */
          h1 { font-size: clamp(2rem, 8vw, 4rem); }
          h2 { font-size: clamp(1.5rem, 6vw, 2.5rem); }
          p { font-size: clamp(0.9rem, 4vw, 1.1rem); line-height: 1.6; }
          
          /* Mobile spacing */
          .mobile-spacing { padding: 1rem; margin: 0.5rem 0; }
          .mobile-container { max-width: 100%; padding: 0 1rem; }
        }
        
        /* Landscape mobile optimizations */
        @media (max-width: 768px) and (orientation: landscape) {
          .mobile-landscape-hide { display: none; }
          .hero-section { min-height: 70vh; }
          .mobile-landscape-compact { padding: 0.5rem; }
        }
      `
      document.head.appendChild(style)
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    if (isIOS && isMobile) {
      const viewport = document.querySelector('meta[name="viewport"]')
      if (viewport) {
        viewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
        )
      }

      // Prevent iOS bounce scroll
      document.body.style.overscrollBehavior = "none"

      // Fix iOS 100vh issue
      const setVH = () => {
        const vh = window.innerHeight * 0.01
        root.style.setProperty("--vh", `${vh}px`)
      }
      setVH()
      window.addEventListener("resize", setVH)
    }

    if (isMobile && "connection" in navigator) {
      const connection = (navigator as any).connection
      if (connection && connection.effectiveType === "slow-2g") {
        root.classList.add("slow-connection")
        root.style.setProperty("--animation-duration", "0.2s")
        root.style.setProperty("--mobile-particle-count", "5")
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
      if (isMobile) {
        root.classList.remove("mobile-device")
        root.style.removeProperty("--mobile-animation-scale")
        root.style.removeProperty("--mobile-particle-count")
        root.style.removeProperty("--mobile-blur-intensity")
      }
      if (isTouch) {
        root.classList.remove("touch-device")
      }
    }
  }, [isMobile, isTouch, orientation])

  return null
}
