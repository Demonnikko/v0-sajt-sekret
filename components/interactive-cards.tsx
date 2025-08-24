"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Eye, Crown, Sparkles, Wand2, Star, Zap } from "lucide-react"

const magicFacts = [
  {
    icon: Eye,
    title: "Иллюзия восприятия",
    front: "Знаете ли вы?",
    back: "Человеческий мозг обрабатывает визуальную информацию за 13 миллисекунд, но иллюзионист может обмануть его за 3 секунды",
  },
  {
    icon: Crown,
    title: "История магии",
    front: "Древняя тайна",
    back: "Первые упоминания о фокусах найдены в египетских папирусах 4000 лет назад. Фараоны верили, что магия дает власть над временем",
  },
  {
    icon: Sparkles,
    title: "Секрет мастерства",
    front: "Правило 10000 часов",
    back: "Чтобы стать мастером иллюзий, нужно 10000 часов практики. Но настоящая магия начинается после 20000 часов",
  },
  {
    icon: Wand2,
    title: "Психология чуда",
    front: "Момент удивления",
    back: "Когда человек видит невозможное, его мозг выделяет дофамин - гормон счастья. Поэтому магия вызывает привыкание",
  },
  {
    icon: Star,
    title: "Великие иллюзионисты",
    front: "Легенды сцены",
    back: "Гудини мог задерживать дыхание на 3 минуты под водой. Копперфилд заставил исчезнуть статую Свободы на глазах у миллионов",
  },
  {
    icon: Zap,
    title: "Наука и магия",
    front: "Квантовая иллюзия",
    back: "Современные фокусы используют принципы квантовой физики. То, что кажется магией, часто основано на реальных научных законах",
  },
]

export default function InteractiveCards() {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())

  const handleCardClick = (index: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <section className="py-16 md:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" data-reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Магические факты</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Нажмите на карточки, чтобы узнать удивительные секреты мира иллюзий
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {magicFacts.map((fact, index) => {
            const Icon = fact.icon
            const isFlipped = flippedCards.has(index)

            return (
              <div
                key={index}
                className="relative h-48 md:h-56 cursor-pointer group perspective-1000"
                onClick={() => handleCardClick(index)}
                data-reveal
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of card */}
                  <Card className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/80 border-gold-500/30 p-6 flex flex-col items-center justify-center text-center backface-hidden hover-glow group-hover:border-gold-400/50 transition-all duration-300">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gold-400 mb-2">{fact.title}</h3>
                    <p className="text-sm md:text-base text-gray-300">{fact.front}</p>
                    <div className="absolute bottom-4 text-xs text-gray-500">Нажмите для раскрытия</div>
                  </Card>

                  {/* Back of card */}
                  <Card className="absolute inset-0 bg-gradient-to-br from-burgundy-900/80 to-black/80 border-burgundy-500/30 p-6 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 hover-glow">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-burgundy-600 to-gold-500 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-burgundy-300 mb-4">{fact.title}</h3>
                    <p className="text-sm md:text-base text-gray-300 leading-relaxed">{fact.back}</p>
                  </Card>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
