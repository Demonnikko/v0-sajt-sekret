"use client"

import { useState, useEffect } from "react"
import { Sparkles, Crown } from "lucide-react"

interface MagicPreloaderProps {
  onComplete: () => void
}

export default function MagicPreloader({ onComplete }: MagicPreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState<"loading" | "revealing" | "curtains" | "complete">("loading")

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStage("revealing")
          setTimeout(() => {
            setStage("curtains")
            setTimeout(() => {
              setStage("complete")
              setTimeout(onComplete, 800)
            }, 1500)
          }, 1000)
          return 100
        }
        return prev + Math.random() * 40
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  if (stage === "complete") return null

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
      {stage === "curtains" && (
        <>
          {/* Левая кулиса */}
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-700 z-50 animate-slide-left">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-black/50 to-transparent" />
            {/* Декоративные элементы кулис */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-2 h-16 bg-gold-600/30 rounded-full" />
              ))}
            </div>
          </div>

          {/* Правая кулиса */}
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-burgundy-900 via-burgundy-800 to-burgundy-700 z-50 animate-slide-right">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
            <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-black/50 to-transparent" />
            {/* Декоративные элементы кулис */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-2 h-16 bg-gold-600/30 rounded-full" />
              ))}
            </div>
          </div>
        </>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-burgundy-900/30 to-black">
          {/* Floating magical particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold-400 rounded-full animate-pulse opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        {stage === "loading" && (
          <div className="space-y-8">
            {/* Logo */}
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-bold tracking-wider mb-4 relative">
                <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                  СЕКРЕТ
                </span>
                <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-transparent to-gold-500/20 blur-xl -z-10 animate-pulse" />
              </h1>
              <div className="flex items-center justify-center gap-2 text-burgundy-300 text-lg tracking-widest">
                <Crown className="w-5 h-5 animate-spin" />
                <span>ЗАГРУЖАЕТСЯ МАГИЯ</span>
                <Crown className="w-5 h-5 animate-spin" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-80 mx-auto">
              <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500 to-burgundy-600 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
              <div className="text-center mt-4 text-gold-400 font-semibold">{Math.round(progress)}%</div>
            </div>

            {/* Loading Text */}
            <div className="text-gray-300 animate-pulse">
              <Sparkles className="w-6 h-6 mx-auto mb-2 animate-spin" />
              <p>Подготавливаем волшебство...</p>
            </div>
          </div>
        )}

        {stage === "revealing" && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-6xl md:text-8xl font-bold tracking-wider">
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent drop-shadow-2xl">
                СЕКРЕТ
              </span>
            </div>
            <div className="text-2xl text-burgundy-300 animate-pulse">Добро пожаловать в мир магии</div>
            <div className="text-lg text-gold-400 animate-bounce mt-8">
              <Crown className="w-6 h-6 mx-auto mb-2" />
              Поднимаем занавес...
            </div>
          </div>
        )}

        {stage === "curtains" && (
          <div className="space-y-8 animate-scale-in">
            <div className="text-6xl md:text-8xl font-bold tracking-wider">
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                СЕКРЕТ
              </span>
            </div>
            <div className="text-3xl text-burgundy-300 animate-fade-in">Шоу начинается!</div>
          </div>
        )}
      </div>
    </div>
  )
}
