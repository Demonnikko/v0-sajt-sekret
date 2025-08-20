"use client"

import { useState, useEffect } from "react"
import { Sparkles, Star, Crown } from "lucide-react"

export default function InteractiveElements() {
  const [magicParticles, setMagicParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  // Create magic particles on mouse movement
  useEffect(() => {
    let particleId = 0

    const createParticle = (x: number, y: number) => {
      const newParticle = { id: particleId++, x, y }
      setMagicParticles((prev) => [...prev.slice(-10), newParticle]) // Keep only last 10 particles

      // Remove particle after animation
      setTimeout(() => {
        setMagicParticles((prev) => prev.filter((p) => p.id !== newParticle.id))
      }, 2000)
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Only create particles occasionally to avoid performance issues
      if (Math.random() < 0.1) {
        createParticle(e.clientX, e.clientY)
      }
    }

    // Add magic trail effect
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Magic Particles */}
      {magicParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-50 animate-ping"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            animation: "magicParticle 2s ease-out forwards",
          }}
        >
          <Sparkles className="w-2 h-2 text-gold-400 opacity-60" />
        </div>
      ))}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Magic Wand Button */}
        <button
          className="w-12 h-12 bg-gradient-to-r from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          onClick={() => {
            // Create burst of particles
            for (let i = 0; i < 10; i++) {
              setTimeout(() => {
                const angle = (i / 10) * Math.PI * 2
                const x = window.innerWidth - 100 + Math.cos(angle) * 50
                const y = window.innerHeight - 100 + Math.sin(angle) * 50
                setMagicParticles((prev) => [...prev, { id: Date.now() + i, x, y }])
              }, i * 50)
            }

            // Play sound if available
            if ((window as any).playMagicSound) {
              ;(window as any).playMagicSound("magic", 0.3)
            }
          }}
          data-sound="magic"
          title="Создать магию"
        >
          <Sparkles className="w-6 h-6 text-white group-hover:animate-spin" />
        </button>

        {/* Quick Booking Button */}
        <button
          className="w-12 h-12 bg-gradient-to-r from-burgundy-600 to-burgundy-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          onClick={() => {
            document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
            if ((window as any).playMagicSound) {
              ;(window as any).playMagicSound("success", 0.2)
            }
          }}
          data-sound="success"
          title="Быстрое бронирование"
        >
          <Crown className="w-6 h-6 text-white group-hover:animate-bounce" />
        </button>
      </div>

      {/* Interactive Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Star className="w-1 h-1 text-gold-400 fill-current" />
          </div>
        ))}

        {/* Magic Orbs */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute w-2 h-2 bg-gold-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes magicParticle {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) translateY(-20px);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
