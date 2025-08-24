"use client"

import { useEffect, useState } from "react"
import { Sparkles, Star, Crown } from "lucide-react"

interface LoadingAnimationsProps {
  type?: "dots" | "sparkles" | "magical" | "skeleton"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function LoadingAnimations({ type = "magical", size = "md", className = "" }: LoadingAnimationsProps) {
  const [currentIcon, setCurrentIcon] = useState(0)
  const icons = [Sparkles, Star, Crown]

  useEffect(() => {
    if (type === "magical") {
      const interval = setInterval(() => {
        setCurrentIcon((prev) => (prev + 1) % icons.length)
      }, 500)
      return () => clearInterval(interval)
    }
  }, [type])

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4"
      case "md":
        return "w-6 h-6"
      case "lg":
        return "w-8 h-8"
      default:
        return "w-6 h-6"
    }
  }

  if (type === "dots") {
    return (
      <div className={`flex space-x-1 ${className}`}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${getSizeClass()} bg-gold-400 rounded-full animate-bounce`}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    )
  }

  if (type === "sparkles") {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Sparkles
            key={i}
            className={`${getSizeClass()} text-gold-400 animate-pulse`}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    )
  }

  if (type === "magical") {
    const CurrentIcon = icons[currentIcon]
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <CurrentIcon className={`${getSizeClass()} text-gold-400 animate-spin`} />
      </div>
    )
  }

  if (type === "skeleton") {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="h-4 bg-gray-700 rounded skeleton"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4 skeleton"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2 skeleton"></div>
      </div>
    )
  }

  return null
}
