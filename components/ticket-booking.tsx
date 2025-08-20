"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, CreditCard, MapPin, X } from "lucide-react"

interface Show {
  id: string
  date: string
  time: string
  availableSeats: number
  totalSeats: number
  price: number
  vipPrice: number
}

interface Seat {
  id: string
  row: number
  number: number
  type: "regular" | "vip"
  isAvailable: boolean
  price: number
}

interface CartItem {
  showId: string
  seatId: string
  seatInfo: string
  price: number
}

const mockShows: Show[] = [
  { id: "1", date: "2024-12-20", time: "19:00", availableSeats: 45, totalSeats: 200, price: 1500, vipPrice: 2500 },
  { id: "2", date: "2024-12-21", time: "16:00", availableSeats: 32, totalSeats: 200, price: 1500, vipPrice: 2500 },
  { id: "3", date: "2024-12-21", time: "19:00", availableSeats: 18, totalSeats: 200, price: 1500, vipPrice: 2500 },
  { id: "4", date: "2024-12-22", time: "15:00", availableSeats: 67, totalSeats: 200, price: 1500, vipPrice: 2500 },
  { id: "5", date: "2024-12-27", time: "19:00", availableSeats: 89, totalSeats: 200, price: 1800, vipPrice: 2800 },
  { id: "6", date: "2024-12-28", time: "16:00", availableSeats: 23, totalSeats: 200, price: 1800, vipPrice: 2800 },
  { id: "7", date: "2024-12-28", time: "19:00", availableSeats: 12, totalSeats: 200, price: 1800, vipPrice: 2800 },
]

const generateSeats = (showId: string): Seat[] => {
  const seats: Seat[] = []

  // VIP seats (first 3 rows)
  for (let row = 1; row <= 3; row++) {
    for (let number = 1; number <= 20; number++) {
      seats.push({
        id: `${showId}-${row}-${number}`,
        row,
        number,
        type: "vip",
        isAvailable: Math.random() > 0.3, // 70% available
        price: mockShows.find((s) => s.id === showId)?.vipPrice || 2500,
      })
    }
  }

  // Regular seats (rows 4-10)
  for (let row = 4; row <= 10; row++) {
    for (let number = 1; number <= 20; number++) {
      seats.push({
        id: `${showId}-${row}-${number}`,
        row,
        number,
        type: "regular",
        isAvailable: Math.random() > 0.2, // 80% available
        price: mockShows.find((s) => s.id === showId)?.price || 1500,
      })
    }
  }

  return seats
}

export default function TicketBooking() {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null)
  const [seats, setSeats] = useState<Seat[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<"shows" | "seats" | "checkout">("shows")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (selectedShow) {
      setSeats(generateSeats(selectedShow.id))
    }
  }, [selectedShow])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("ru-RU", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShowSelect = (show: Show) => {
    setSelectedShow(show)
    setStep("seats")
  }

  const handleSeatSelect = (seat: Seat) => {
    if (!seat.isAvailable || !selectedShow) return

    const existingItem = cart.find((item) => item.seatId === seat.id)

    if (existingItem) {
      // Remove from cart
      setCart(cart.filter((item) => item.seatId !== seat.id))
    } else {
      // Add to cart
      const newItem: CartItem = {
        showId: selectedShow.id,
        seatId: seat.id,
        seatInfo: `Ряд ${seat.row}, Место ${seat.number} (${seat.type === "vip" ? "VIP" : "Обычное"})`,
        price: seat.price,
      }
      setCart([...cart, newItem])
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0)
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Here you would integrate with Stripe or another payment processor
    alert(`Заказ оформлен! Общая сумма: ${getTotalPrice()}₽\n\nВы получите билеты на email в течение 5 минут.`)

    setCart([])
    setStep("shows")
    setSelectedShow(null)
    setIsProcessing(false)
  }

  const isSeatSelected = (seatId: string) => {
    return cart.some((item) => item.seatId === seatId)
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gold-400">Забронировать билеты</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Выберите удобную дату и лучшие места для незабываемого вечера магии
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${step === "shows" ? "bg-gold-500 text-black" : "bg-gray-800 text-gray-400"}`}
          >
            <Calendar className="w-4 h-4" />
            <span>Выбор даты</span>
          </div>
          <div className="w-8 h-px bg-gray-600" />
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${step === "seats" ? "bg-gold-500 text-black" : "bg-gray-800 text-gray-400"}`}
          >
            <MapPin className="w-4 h-4" />
            <span>Выбор мест</span>
          </div>
          <div className="w-8 h-px bg-gray-600" />
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${step === "checkout" ? "bg-gold-500 text-black" : "bg-gray-800 text-gray-400"}`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Оплата</span>
          </div>
        </div>
      </div>

      {/* Shows Selection */}
      {step === "shows" && (
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gold-400 mb-6">Доступные показы</h3>

          <div className="grid gap-4">
            {mockShows.map((show) => (
              <Card
                key={show.id}
                className="bg-gradient-to-r from-gray-900/50 to-black/50 border-gold-500/30 p-6 cursor-pointer hover:border-gold-400/50 transition-all duration-300 group"
                onClick={() => handleShowSelect(show)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gold-400">{formatDate(show.date).split(",")[0]}</div>
                      <div className="text-sm text-gray-400">{formatDate(show.date).split(",")[1]}</div>
                    </div>

                    <div className="flex items-center gap-2 text-burgundy-300">
                      <Clock className="w-5 h-5" />
                      <span className="text-lg font-semibold">{show.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-5 h-5" />
                      <span>
                        {show.availableSeats} из {show.totalSeats} мест
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gold-400">от {show.price}₽</div>
                    <Badge
                      variant={
                        show.availableSeats > 50 ? "default" : show.availableSeats > 20 ? "secondary" : "destructive"
                      }
                      className="mt-2"
                    >
                      {show.availableSeats > 50
                        ? "Много мест"
                        : show.availableSeats > 20
                          ? "Мало мест"
                          : "Почти нет мест"}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Seat Selection */}
      {step === "seats" && selectedShow && (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gold-400">Выбор мест</h3>
              <p className="text-gray-300">
                {formatDate(selectedShow.date)} в {selectedShow.time}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setStep("shows")}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Назад к датам
            </Button>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded border-2 border-green-400"></div>
              <span className="text-sm text-gray-300">Доступно</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gold-500 rounded border-2 border-gold-400"></div>
              <span className="text-sm text-gray-300">Выбрано</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-600 rounded border-2 border-gray-500"></div>
              <span className="text-sm text-gray-300">Занято</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-burgundy-500 rounded border-2 border-burgundy-400"></div>
              <span className="text-sm text-gray-300">VIP</span>
            </div>
          </div>

          {/* Stage */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-gold-500 to-burgundy-600 text-white px-8 py-3 rounded-lg font-semibold">
              СЦЕНА
            </div>
          </div>

          {/* Seats Grid */}
          <div className="space-y-2 max-w-4xl mx-auto">
            {Array.from({ length: 10 }, (_, rowIndex) => {
              const row = rowIndex + 1
              const rowSeats = seats.filter((seat) => seat.row === row)

              return (
                <div key={row} className="flex items-center justify-center gap-1">
                  <div className="w-8 text-center text-sm text-gray-400 font-semibold">{row}</div>

                  <div className="flex gap-1">
                    {rowSeats.map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => handleSeatSelect(seat)}
                        disabled={!seat.isAvailable}
                        className={`w-6 h-6 rounded text-xs font-bold border-2 transition-all duration-200 ${
                          !seat.isAvailable
                            ? "bg-gray-600 border-gray-500 cursor-not-allowed"
                            : isSeatSelected(seat.id)
                              ? "bg-gold-500 border-gold-400 text-black"
                              : seat.type === "vip"
                                ? "bg-burgundy-500 border-burgundy-400 hover:bg-burgundy-400 text-white"
                                : "bg-green-500 border-green-400 hover:bg-green-400 text-white"
                        }`}
                        title={`Ряд ${seat.row}, Место ${seat.number} - ${seat.price}₽`}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <Card className="bg-gradient-to-r from-gray-900/50 to-black/50 border-gold-500/30 p-6">
              <h4 className="text-xl font-bold text-gold-400 mb-4">Выбранные места</h4>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.seatId} className="flex justify-between items-center">
                    <span className="text-gray-300">{item.seatInfo}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gold-400 font-semibold">{item.price}₽</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleSeatSelect(seats.find((s) => s.id === item.seatId)!)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-white">Итого: {getTotalPrice()}₽</span>
                <Button
                  onClick={() => setStep("checkout")}
                  className="bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800"
                >
                  Перейти к оплате
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Checkout */}
      {step === "checkout" && (
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gold-400">Оформление заказа</h3>
            <Button
              variant="outline"
              onClick={() => setStep("seats")}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Назад к местам
            </Button>
          </div>

          {/* Order Summary */}
          <Card className="bg-gradient-to-r from-gray-900/50 to-black/50 border-gold-500/30 p-6">
            <h4 className="text-xl font-bold text-gold-400 mb-4">Детали заказа</h4>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Дата и время:</span>
                <span className="text-white font-semibold">
                  {formatDate(selectedShow!.date)} в {selectedShow!.time}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-gray-300">Места:</span>
                {cart.map((item) => (
                  <div key={item.seatId} className="flex justify-between ml-4">
                    <span className="text-gray-300">{item.seatInfo}</span>
                    <span className="text-gold-400">{item.price}₽</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-3 flex justify-between text-xl font-bold">
                <span className="text-white">Итого:</span>
                <span className="text-gold-400">{getTotalPrice()}₽</span>
              </div>
            </div>
          </Card>

          {/* Payment Form */}
          <Card className="bg-gradient-to-r from-gray-900/50 to-black/50 border-gold-500/30 p-6">
            <h4 className="text-xl font-bold text-gold-400 mb-6">Контактная информация</h4>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Имя</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold-400 focus:outline-none"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Фамилия</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold-400 focus:outline-none"
                    placeholder="Ваша фамилия"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold-400 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Телефон</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gold-400 focus:outline-none"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>
          </Card>

          {/* Payment Button */}
          <Button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white py-4 text-lg font-semibold"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Обработка платежа...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Оплатить {getTotalPrice()}₽
              </div>
            )}
          </Button>

          <p className="text-sm text-gray-400 text-center">
            Нажимая "Оплатить", вы соглашаетесь с условиями продажи билетов. Билеты будут отправлены на указанный email
            в течение 5 минут после оплаты.
          </p>
        </div>
      )}
    </div>
  )
}
