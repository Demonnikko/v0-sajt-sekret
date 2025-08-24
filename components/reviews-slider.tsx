"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Review {
  id: number
  name: string
  age: number
  city: string
  text: string
  rating: number
  avatar: string
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Анна Петрова",
    age: 28,
    city: "Москва",
    text: "Я не верила в магию до этого вечера. Дмитрий заставил меня усомниться в реальности. Мурашки до сих пор!",
    rating: 5,
    avatar: "/reviewer-1.png",
  },
  {
    id: 2,
    name: "Михаил Соколов",
    age: 35,
    city: "Санкт-Петербург",
    text: "Привел скептически настроенную жену. Теперь она первая говорит о чудесах. Невероятное шоу!",
    rating: 5,
    avatar: "/reviewer-2.png",
  },
  {
    id: 3,
    name: "Елена Васильева",
    age: 42,
    city: "Ярославль",
    text: "Мой сын-подросток оторвался от телефона и смотрел с открытым ртом. Это дорогого стоит!",
    rating: 5,
    avatar: "/reviewer-3.png",
  },
  {
    id: 4,
    name: "Дмитрий Кузнецов",
    age: 31,
    city: "Нижний Новгород",
    text: "Работаю в IT, привык к логике. Но то, что я видел на сцене, не поддается объяснению. Гениально!",
    rating: 5,
    avatar: "/reviewer-4.png",
  },
  {
    id: 5,
    name: "Ольга Морозова",
    age: 25,
    city: "Казань",
    text: "Была на дне рождения подруги. Лучший подарок - эти эмоции! Плакала от восторга.",
    rating: 5,
    avatar: "/reviewer-5.png",
  },
  {
    id: 6,
    name: "Александр Волков",
    age: 45,
    city: "Екатеринбург",
    text: "Видел много фокусников, но Дмитрий - это другой уровень. Искусство в чистом виде!",
    rating: 5,
    avatar: "/reviewer-6.png",
  },
  {
    id: 7,
    name: "Мария Козлова",
    age: 33,
    city: "Воронеж",
    text: "Потрясающее шоу! Каждый номер - это маленькое чудо. Обязательно приду еще раз!",
    rating: 5,
    avatar: "/reviewer-7.png",
  },
  {
    id: 8,
    name: "Сергей Иванов",
    age: 29,
    city: "Тула",
    text: "Невероятная атмосфера! Дмитрий умеет создать настоящую магию. Рекомендую всем!",
    rating: 5,
    avatar: "/reviewer-8.png",
  },
  {
    id: 9,
    name: "Татьяна Смирнова",
    age: 38,
    city: "Рязань",
    text: "Шоу превзошло все ожидания! Такого уровня иллюзий я еще не видела. Браво!",
    rating: 5,
    avatar: "/reviewer-9.png",
  },
  {
    id: 10,
    name: "Андрей Петров",
    age: 41,
    city: "Тверь",
    text: "Профессионализм на высшем уровне! Каждая минута шоу держит в напряжении.",
    rating: 5,
    avatar: "/reviewer-10.png",
  },
]

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
    }, 4000) // Faster carousel

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToReview = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const currentReview = REVIEWS[currentIndex]

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Review Card */}
      <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-gold-500/30 p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4">
            <Quote className="w-24 h-24 text-gold-400" />
          </div>
          <div className="absolute bottom-4 right-4 rotate-180">
            <Quote className="w-24 h-24 text-burgundy-400" />
          </div>
        </div>

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex justify-center mb-6">
            {[...Array(currentReview.rating)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-gold-400 fill-current" />
            ))}
          </div>

          {/* Review Text */}
          <blockquote className="text-xl md:text-2xl text-center text-gray-100 leading-relaxed mb-8 font-medium">
            "{currentReview.text}"
          </blockquote>

          {/* Reviewer Info */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold-400/50">
              <img
                src={currentReview.avatar || "/placeholder.svg"}
                alt={currentReview.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gold-400">{currentReview.name}</div>
              <div className="text-sm text-gray-400">
                {currentReview.age} лет, {currentReview.city}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={prevReview}
          className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex gap-2 overflow-x-auto max-w-xs">
          {REVIEWS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
                index === currentIndex ? "bg-gold-400 scale-125" : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextReview}
          className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 bg-transparent"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="text-center mt-4">
          <div className="text-xs text-gray-500">Автопрокрутка включена</div>
        </div>
      )}
    </div>
  )
}
