"use client"

import { useState, useEffect } from "react"
import { Sparkles, Star, Zap } from "lucide-react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  type: "sparkle" | "star" | "zap"
  size: number
}

export default function MagicParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const createParticle = (): Particle => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      life: 0,
      maxLife: Math.random() * 100 + 50,
      type: ["sparkle", "star", "zap"][Math.floor(Math.random() * 3)] as "sparkle" | "star" | "zap",
      size: Math.random() * 8 + 4,
    })

    const updateParticles = () => {
      setParticles((prev) => {
        const updated = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life + 1,
            vy: particle.vy + 0.02, // gravity
          }))
          .filter(
            (particle) =>
              particle.life < particle.maxLife &&
              particle.y > -50 &&
              particle.x > -50 &&
              particle.x < window.innerWidth + 50,
          )

        // Add new particles occasionally
        if (Math.random() > 0.95 && updated.length < 20) {
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
      default:
        return Sparkles
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => {
        const Icon = getIcon(particle.type)
        const opacity = 1 - particle.life / particle.maxLife

        return (
          <div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: opacity * 0.6,
              transform: `scale(${opacity}) rotate(${particle.life * 2}deg)`,
            }}
          >
            <Icon className="text-gold-400" style={{ width: particle.size, height: particle.size }} />
          </div>
        )
      })}
    </div>
  )
}
