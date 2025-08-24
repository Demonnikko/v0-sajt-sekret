"use client"

import { useEffect, useState } from "react"

interface FogParticle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  direction: number
}

export default function MagicFog() {
  const [fogParticles, setFogParticles] = useState<FogParticle[]>([])

  useEffect(() => {
    const createFogParticle = (): FogParticle => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 200 + 100,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() * Math.PI * 2,
    })

    // Initialize fog particles
    const initialParticles = Array.from({ length: 8 }, createFogParticle)
    setFogParticles(initialParticles)

    const updateFog = () => {
      setFogParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + Math.cos(particle.direction) * particle.speed,
          y: particle.y + Math.sin(particle.direction) * particle.speed,
          direction: particle.direction + (Math.random() - 0.5) * 0.02,
          // Wrap around screen
          x: particle.x > window.innerWidth + 100 ? -100 : particle.x < -100 ? window.innerWidth + 100 : particle.x,
          y: particle.y > window.innerHeight + 100 ? -100 : particle.y < -100 ? window.innerHeight + 100 : particle.y,
        })),
      )
    }

    const interval = setInterval(updateFog, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {fogParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-radial from-white/10 via-white/5 to-transparent blur-xl"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            transform: `scale(${0.8 + Math.sin(Date.now() * 0.001 + particle.id) * 0.2})`,
          }}
        />
      ))}
    </div>
  )
}
