"use client"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Ticket, X } from "lucide-react"

interface Show {
  id: number
  city: string
  venue: string
  date: string
  time: string
  price: string
  available: boolean
}

const shows: Show[] = [
  {
    id: 1,
    city: "Москва",
    venue: "Театр магии и иллюзий",
    date: "15 февраля 2025",
    time: "19:00",
    price: "от 2500₽",
    available: true,
  },
  {
    id: 2,
    city: "Санкт-Петербург",
    venue: "Дворец культуры",
    date: "22 февраля 2025",
    time: "18:30",
    price: "от 2200₽",
    available: true,
  },
  {
    id: 3,
    city: "Казань",
    venue: "Центр современного искусства",
    date: "1 марта 2025",
    time: "19:30",
    price: "от 1800₽",
    available: true,
  },
  {
    id: 4,
    city: "Екатеринбург",
    venue: "Театральный центр",
    date: "8 марта 2025",
    time: "19:00",
    price: "от 2000₽",
    available: true,
  },
  {
    id: 5,
    city: "Новосибирск",
    venue: 'Дом культуры "Современник"',
    date: "15 марта 2025",
    time: "18:00",
    price: "от 1900₽",
    available: false,
  },
  {
    id: 6,
    city: "Краснодар",
    venue: "Филармония",
    date: "22 марта 2025",
    time: "19:30",
    price: "от 2100₽",
    available: true,
  },
]

interface ShowScheduleProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShowSchedule({ isOpen, onClose }: ShowScheduleProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-burgundy-900 to-black border border-gold-500/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-burgundy-900 to-burgundy-800 p-6 border-b border-gold-500/20 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gold-400">Расписание шоу "СЕКРЕТ"</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gold-400 hover:text-gold-300 hover:bg-gold-500/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <p className="text-gray-300 mb-8 text-center text-lg">Выберите город и площадку для покупки билетов</p>

          <div className="grid gap-4 md:gap-6">
            {shows.map((show) => (
              <div
                key={show.id}
                className={`p-6 rounded-lg border transition-all duration-300 ${
                  show.available
                    ? "border-gold-500/30 bg-gradient-to-r from-burgundy-800/50 to-black/50 hover:border-gold-400/50 hover:shadow-lg hover:shadow-gold-500/10"
                    : "border-gray-600/30 bg-gray-800/30 opacity-60"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-gold-400" />
                      <h3 className="text-xl font-bold text-white">{show.city}</h3>
                    </div>
                    <p className="text-gray-300 mb-3">{show.venue}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{show.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{show.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ticket className="w-4 h-4" />
                        <span>{show.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {show.available ? (
                      <>
                        <Button
                          className="bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-black font-semibold px-6 py-2"
                          onClick={() => {
                            // Здесь можно добавить логику покупки билетов
                            alert(`Покупка билетов на шоу в ${show.city}`)
                          }}
                        >
                          Купить билет
                        </Button>
                        <span className="text-green-400 text-sm text-center">Билеты в продаже</span>
                      </>
                    ) : (
                      <>
                        <Button disabled className="bg-gray-600 text-gray-400 px-6 py-2">
                          Билеты распроданы
                        </Button>
                        <span className="text-red-400 text-sm text-center">Нет мест</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gold-500/10 border border-gold-500/30 rounded-lg">
            <p className="text-gold-400 text-center">
              <strong>Внимание:</strong> Расписание может изменяться. Следите за обновлениями в нашей группе Telegram.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
