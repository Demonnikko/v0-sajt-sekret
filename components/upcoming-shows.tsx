"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Star, Ticket } from "lucide-react"

const upcomingShows = [
  {
    id: 1,
    date: "2025-02-15",
    time: "19:00",
    venue: "Театр Магии",
    address: "ул. Чудесная, 42",
    availableSeats: 45,
    totalSeats: 200,
    price: "от 1500 ₽",
    special: "Премьера нового номера",
    rating: 4.9,
  },
  {
    id: 2,
    date: "2025-02-22",
    time: "20:00",
    venue: "Дворец Культуры",
    address: "пр. Волшебный, 15",
    availableSeats: 78,
    totalSeats: 300,
    price: "от 1200 ₽",
    special: null,
    rating: 4.8,
  },
  {
    id: 3,
    date: "2025-03-01",
    time: "18:30",
    venue: "Концертный зал 'Мистика'",
    address: "ул. Загадочная, 7",
    availableSeats: 12,
    totalSeats: 150,
    price: "от 2000 ₽",
    special: "Эксклюзивное камерное шоу",
    rating: 5.0,
  },
]

export default function UpcomingShows() {
  const [selectedShow, setSelectedShow] = useState<number | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      weekday: "long",
    })
  }

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100
    if (percentage > 50) return "text-green-400"
    if (percentage > 20) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <section className="py-16 md:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" data-reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Ближайшие шоу</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Не упустите возможность стать свидетелем невероятных иллюзий
          </p>
        </div>

        <div className="grid gap-6 md:gap-8" data-reveal>
          {upcomingShows.map((show, index) => (
            <Card
              key={show.id}
              className="bg-gradient-to-r from-gray-900/80 to-black/80 border-gold-500/30 p-6 md:p-8 hover-glow hover-scale cursor-pointer"
              onClick={() => setSelectedShow(show.id)}
              data-tilt
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid lg:grid-cols-3 gap-6 items-center">
                {/* Date & Time */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-gold-400" />
                    <span className="text-lg font-semibold text-gold-400">{formatDate(show.date)}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{show.time}</span>
                  </div>

                  {show.special && (
                    <div className="inline-block px-3 py-1 bg-burgundy-500/20 border border-burgundy-500/30 rounded-full text-sm text-burgundy-300 font-semibold">
                      {show.special}
                    </div>
                  )}
                </div>

                {/* Venue & Details */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-semibold text-white">{show.venue}</div>
                      <div className="text-sm text-gray-400">{show.address}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center lg:justify-start gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span
                        className={`text-sm font-semibold ${getAvailabilityColor(show.availableSeats, show.totalSeats)}`}
                      >
                        {show.availableSeats} из {show.totalSeats} мест
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold-400 fill-current" />
                      <span className="text-sm text-gold-400 font-semibold">{show.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Booking */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold-400 mb-4">{show.price}</div>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white font-semibold shadow-xl border border-gold-500/30 hover:border-gold-400/50 transition-all duration-300 group"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle booking logic
                    }}
                  >
                    <Ticket className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                    Забронировать
                  </Button>

                  <div className="text-xs text-gray-400 mt-2">Быстрое бронирование без комиссии</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12" data-reveal>
          <Card className="bg-gradient-to-r from-burgundy-900/30 via-black/50 to-burgundy-900/30 border-gold-500/20 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gold-400 mb-4">Не нашли подходящую дату?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Мы регулярно добавляем новые даты выступлений. Подпишитесь на уведомления, чтобы первыми узнавать о новых
              шоу.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400 bg-transparent"
            >
              Подписаться на уведомления
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
