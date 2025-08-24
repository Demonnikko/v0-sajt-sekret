"use client"

import { useState, useEffect } from "react"
import { Sparkles, Star, Zap, Crown, Eye, Wand2 } from "lucide-react"

interface EnhancedParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  type: "sparkle" | "star" | "zap" | "crown" | "eye" | "wand"
  size: number
  rotation: number
  rotationSpeed: number
  color: string
}

export default function EnhancedParticles() {
  const [particles, setParticles] = useState<EnhancedParticle[]>([])

  useEffect(() => {
    const colors = ["text-gold-400", "text-gold-300", "text-burgundy-400", "text-burgundy-300", "text-white"]
    const types: EnhancedParticle["type"][] = ["sparkle", "star", "zap", "crown", "eye", "wand"]

    const createParticle = (): EnhancedParticle => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      vx: (Math.random() - 0.5) * 3,
      vy: -Math.random() * 4 - 2,
      life: 0,
      maxLife: Math.random() * 150 + 100,
      type: types[Math.floor(Math.random() * types.length)],
      size: Math.random() * 12 + 8,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    })

    const updateParticles = () => {
      setParticles((prev) => {
        const updated = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life + 1,
            vy: particle.vy + 0.03, // gravity
            vx: particle.vx * 0.999, // air resistance
            rotation: particle.rotation + particle.rotationSpeed,
          }))
          .filter(
            (particle) =>
              particle.life < particle.maxLife &&
              particle.y > -100 &&
              particle.x > -100 &&
              particle.x < window.innerWidth + 100,
          )

        // Add new particles occasionally
        if (Math.random() > 0.92 && updated.length < 30) {
          updated.push(createParticle())
        }

        return updated
      })
    }

    const interval = setInterval(updateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "sparkle":
        return Sparkles
      case "star":
        return Star
      case "zap":
        return Zap
      case "crown":
        return Crown
      case "eye":
        return Eye
      case "wand":
        return Wand2
      default:
        return Sparkles
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-15">
      {particles.map((particle) => {
        const Icon = getIcon(particle.type)
        const opacity = Math.max(0, 1 - particle.life / particle.maxLife)
        const scale = opacity * (0.5 + Math.sin(particle.life * 0.1) * 0.2)

        return (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: opacity * 0.8,
              transform: `scale(${scale}) rotate(${particle.rotation}deg)`,
              filter: `blur(${(1 - opacity) * 2}px)`,
            }}
          >
            <Icon
              className={`${particle.color} drop-shadow-lg`}
              style={{ width: particle.size, height: particle.size }}
            />
          </div>
        )
      })}
    </div>
  )
}
