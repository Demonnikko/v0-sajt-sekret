"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Eye, Sparkles, Crown, Wand2, Star, Zap } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"

const magicTricks = [
  {
    id: 1,
    title: "Исчезновение монеты",
    description: "Классический фокус с современным исполнением",
    difficulty: "Начинающий",
    duration: "2 мин",
    icon: Sparkles,
    image: "/trick-coin.png",
    video: "/tricks/coin-disappear.mp4",
  },
  {
    id: 2,
    title: "Левитация карты",
    description: "Карта парит в воздухе без видимой поддержки",
    difficulty: "Продвинутый",
    duration: "5 мин",
    icon: Crown,
    image: "/trick-card.png",
    video: "/tricks/card-levitation.mp4",
  },
  {
    id: 3,
    title: "Телепортация предмета",
    description: "Мгновенное перемещение объекта через пространство",
    difficulty: "Мастер",
    duration: "8 мин",
    icon: Zap,
    image: "/trick-teleport.png",
    video: "/tricks/object-teleport.mp4",
  },
  {
    id: 4,
    title: "Чтение мыслей",
    description: "Угадывание задуманного зрителем числа или предмета",
    difficulty: "Продвинутый",
    duration: "6 мин",
    icon: Eye,
    image: "/trick-mindread.png",
    video: "/tricks/mind-reading.mp4",
  },
  {
    id: 5,
    title: "Превращение воды в вино",
    description: "Алхимическое превращение на глазах у зрителей",
    difficulty: "Мастер",
    duration: "4 мин",
    icon: Wand2,
    image: "/trick-alchemy.png",
    video: "/tricks/water-wine.mp4",
  },
  {
    id: 6,
    title: "Звездная пыль",
    description: "Создание магических искр из ничего",
    difficulty: "Начинающий",
    duration: "3 мин",
    icon: Star,
    image: "/trick-stardust.png",
    video: "/tricks/stardust.mp4",
  },
]

export default function MagicGallery() {
  const [selectedTrick, setSelectedTrick] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const filteredTricks = magicTricks.filter((trick) => filter === "all" || trick.difficulty.toLowerCase() === filter)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Начинающий":
        return "text-green-400 border-green-400/30"
      case "Продвинутый":
        return "text-yellow-400 border-yellow-400/30"
      case "Мастер":
        return "text-red-400 border-red-400/30"
      default:
        return "text-gray-400 border-gray-400/30"
    }
  }

  return (
    <section className="py-16 md:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" data-reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Галерея фокусов</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Откройте для себя некоторые из самых захватывающих иллюзий из нашего репертуара
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" data-reveal>
          {["all", "начинающий", "продвинутый", "мастер"].map((level) => (
            <Button
              key={level}
              variant={filter === level ? "default" : "outline"}
              onClick={() => setFilter(level)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                filter === level
                  ? "bg-gold-500 text-black hover:bg-gold-400"
                  : "border-gold-500/50 text-gold-400 hover:bg-gold-500/10"
              }`}
            >
              {level === "all" ? "Все фокусы" : level.charAt(0).toUpperCase() + level.slice(1)}
            </Button>
          ))}
        </div>

        {/* Tricks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" data-reveal>
          {filteredTricks.map((trick, index) => {
            const Icon = trick.icon
            return (
              <Card
                key={trick.id}
                className="bg-gradient-to-b from-gray-900/80 to-black/80 border-gold-500/30 overflow-hidden hover-glow hover-scale cursor-pointer group"
                onClick={() => setSelectedTrick(trick.id)}
                data-tilt
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <OptimizedImage
                    src={trick.image}
                    alt={trick.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-gold-500/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-6 h-6 text-black ml-1" />
                    </div>
                  </div>

                  {/* Difficulty Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getDifficultyColor(trick.difficulty)}`}
                  >
                    {trick.difficulty}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gold-400">{trick.title}</h3>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">{trick.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Длительность: {trick.duration}</span>
                    <div className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      <span>Смотреть</span>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Video Modal would go here in a real implementation */}
        {selectedTrick && (
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTrick(null)}
          >
            <div
              className="max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Видео будет доступно в полной версии</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
