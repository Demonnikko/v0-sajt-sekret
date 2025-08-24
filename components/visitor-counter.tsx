"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Users, Eye, Star, Calendar } from "lucide-react"

export default function VisitorCounter() {
  const [stats, setStats] = useState({
    totalVisitors: 2847,
    todayVisitors: 156,
    onlineNow: 23,
    showsThisMonth: 12,
  })

  const [animatedStats, setAnimatedStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    onlineNow: 0,
    showsThisMonth: 0,
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        onlineNow: Math.max(15, Math.min(45, prev.onlineNow + (Math.random() > 0.5 ? 1 : -1))),
        todayVisitors: prev.todayVisitors + (Math.random() > 0.7 ? 1 : 0),
      }))
    }, 5000)

    // Animate counters on mount
    const animateCounters = () => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const counterInterval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setAnimatedStats({
          totalVisitors: Math.floor(stats.totalVisitors * progress),
          todayVisitors: Math.floor(stats.todayVisitors * progress),
          onlineNow: Math.floor(stats.onlineNow * progress),
          showsThisMonth: Math.floor(stats.showsThisMonth * progress),
        })

        if (currentStep >= steps) {
          clearInterval(counterInterval)
          setAnimatedStats(stats)
        }
      }, stepDuration)
    }

    // Start animation after component mounts
    const timeout = setTimeout(animateCounters, 500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  const statItems = [
    {
      icon: Users,
      label: "Всего зрителей",
      value: animatedStats.totalVisitors.toLocaleString(),
      color: "text-gold-400",
      bgColor: "from-gold-500/20 to-gold-600/20",
    },
    {
      icon: Eye,
      label: "Сегодня на сайте",
      value: animatedStats.todayVisitors.toLocaleString(),
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: Star,
      label: "Онлайн сейчас",
      value: animatedStats.onlineNow.toString(),
      color: "text-green-400",
      bgColor: "from-green-500/20 to-green-600/20",
      pulse: true,
    },
    {
      icon: Calendar,
      label: "Шоу в этом месяце",
      value: animatedStats.showsThisMonth.toString(),
      color: "text-burgundy-400",
      bgColor: "from-burgundy-500/20 to-burgundy-600/20",
    },
  ]

  return (
    <section className="py-16 md:py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" data-reveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Живая статистика</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Присоединяйтесь к тысячам зрителей, которые уже открыли для себя мир магии
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" data-reveal>
          {statItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className={`bg-gradient-to-br ${item.bgColor} border-white/10 p-6 text-center backdrop-blur-sm hover-glow hover-scale ${item.pulse ? "animate-pulse" : ""}`}
                data-tilt
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${item.color} mb-4 flex items-center justify-center`}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>

                  <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${item.color} mb-2`}>{item.value}</div>

                  <div className="text-sm md:text-base text-gray-300 font-medium">{item.label}</div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Live Activity Feed */}
        <div className="mt-16" data-reveal>
          <Card className="bg-gradient-to-r from-gray-900/50 to-black/50 border-gold-500/30 p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gold-400 mb-4 text-center">Активность в реальном времени</h3>
            <div className="space-y-3 max-h-32 overflow-hidden">
              <div className="flex items-center gap-3 text-sm text-gray-300 animate-fade-in">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Новый зритель присоединился к просмотру трейлера</span>
                <span className="text-gray-500 ml-auto">только что</span>
              </div>
              <div
                className="flex items-center gap-3 text-sm text-gray-300 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Билет забронирован на шоу 15 февраля</span>
                <span className="text-gray-500 ml-auto">2 мин назад</span>
              </div>
              <div
                className="flex items-center gap-3 text-sm text-gray-300 animate-fade-in"
                style={{ animationDelay: "1s" }}
              >
                <div className="w-2 h-2 bg-gold-400 rounded-full animate-pulse"></div>
                <span>Оставлен новый отзыв с оценкой 5 звезд</span>
                <span className="text-gray-500 ml-auto">5 мин назад</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
