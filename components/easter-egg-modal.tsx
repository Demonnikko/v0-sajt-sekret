"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Sparkles, Crown, Gift, Star } from "lucide-react"
import confetti from "canvas-confetti"

interface EasterEggModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function EasterEggModal({ isOpen, onClose }: EasterEggModalProps) {
  const [stage, setStage] = useState(0)
  const [revealedText, setRevealedText] = useState("")

  const secretMessage =
    "Истинная магия начинается тогда, когда вы перестаете искать объяснения и начинаете верить в невозможное. Добро пожаловать в мир, где чудеса - это не исключение, а правило."

  useEffect(() => {
    if (!isOpen) {
      setStage(0)
      setRevealedText("")
      return
    }

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.4 },
      colors: ["#FFD700", "#8B0000", "#000000", "#800020"],
    })

    // Reveal text gradually
    const timer = setTimeout(() => {
      setStage(1)
      let currentIndex = 0
      const revealInterval = setInterval(() => {
        if (currentIndex <= secretMessage.length) {
          setRevealedText(secretMessage.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(revealInterval)
          setStage(2)
        }
      }, 50)

      return () => clearInterval(revealInterval)
    }, 1000)

    return () => clearTimeout(timer)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <Card className="bg-gradient-to-br from-burgundy-900/90 to-black/90 border-gold-500/50 p-8 max-w-2xl w-full relative overflow-hidden">
        {/* Magical Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-500/20 via-transparent to-burgundy-500/20" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="relative z-10 text-center">
          {stage === 0 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gold-400">Вы нашли секрет!</h2>
              <p className="text-gray-300">Готовьтесь к откровению...</p>
            </div>
          )}

          {stage >= 1 && (
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Crown className="w-8 h-8 text-gold-400" />
                <h2 className="text-3xl font-bold text-gold-400">Тайное послание</h2>
                <Crown className="w-8 h-8 text-gold-400" />
              </div>

              <div className="bg-gradient-to-r from-black/60 via-burgundy-900/40 to-black/60 rounded-xl p-6 border border-gold-500/30">
                <p className="text-lg text-gray-200 leading-relaxed italic min-h-[120px]">
                  {revealedText}
                  {stage === 1 && <span className="animate-pulse">|</span>}
                </p>
              </div>

              {stage === 2 && (
                <div className="space-y-6">
                  <div className="flex justify-center gap-4">
                    <Star className="w-6 h-6 text-gold-400 fill-current animate-pulse" />
                    <Star className="w-6 h-6 text-gold-400 fill-current animate-pulse delay-200" />
                    <Star className="w-6 h-6 text-gold-400 fill-current animate-pulse delay-400" />
                  </div>

                  <div className="bg-gradient-to-r from-burgundy-900/50 to-gold-900/50 rounded-lg p-4 border border-gold-400/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Gift className="w-5 h-5 text-gold-400" />
                      <span className="text-gold-400 font-semibold">Бонус за любопытство</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Промокод: <span className="font-bold text-burgundy-300">СЕКРЕТ2024</span> - скидка 15% на билет!
                    </p>
                  </div>

                  <Button
                    onClick={onClose}
                    className="bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white px-8 py-3"
                  >
                    Сохранить тайну
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
