"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Sparkles, Crown, HelpCircle } from "lucide-react"
import VideoPlayer from "@/components/video-player"
import ReviewsSlider from "@/components/reviews-slider"
import EasterEggModal from "@/components/easter-egg-modal"
import MagicPreloader from "@/components/magic-preloader"
import ScrollMenu from "@/components/scroll-menu"
import AddReviewForm from "@/components/add-review-form"
import ShowSchedule from "@/components/show-schedule"

const FloatingQuestionMarks = () => {
  const [questionMarks, setQuestionMarks] = useState<
    Array<{
      id: number
      x: number
      y: number
      delay: number
      duration: number
    }>
  >([])

  useEffect(() => {
    const marks = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }))
    setQuestionMarks(marks)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {questionMarks.map((mark) => (
        <div
          key={mark.id}
          className="absolute text-red-500 opacity-20 animate-float"
          style={{
            left: `${mark.x}%`,
            top: `${mark.y}%`,
            animationDelay: `${mark.delay}s`,
            animationDuration: `${mark.duration}s`,
          }}
        >
          <HelpCircle className="w-4 h-4" />
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [curtainOpen, setCurtainOpen] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const [showSchedule, setShowSchedule] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCurtainOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)

    if (newCount === 5) {
      setShowEasterEgg(true)
      setLogoClickCount(0)
    }

    setTimeout(() => {
      setLogoClickCount(0)
    }, 3000)
  }

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
  }

  if (showPreloader) {
    return <MagicPreloader onComplete={handlePreloaderComplete} />
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        <FloatingQuestionMarks />

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-burgundy-900/20 to-black">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-burgundy-500/15 rounded-full blur-2xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gold-400/8 rounded-full blur-3xl animate-pulse delay-2000" />
          </div>
        </div>

        {/* Theater Curtains */}
        <div
          className={`fixed inset-0 z-50 transition-transform duration-2000 ease-in-out ${curtainOpen ? "-translate-x-full" : "translate-x-0"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-900 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/50 to-transparent" />
          </div>
        </div>

        <div
          className={`fixed inset-0 z-50 transition-transform duration-2000 ease-in-out ${curtainOpen ? "translate-x-full" : "translate-x-0"}`}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-burgundy-900 via-burgundy-800 to-burgundy-900 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/50 to-transparent" />
          </div>
        </div>

        {/* Main Content */}
        <div className={`relative z-10 transition-opacity duration-1000 ${curtainOpen ? "opacity-100" : "opacity-0"}`}>
          {/* Hero Section */}
          <section id="hero" className="min-h-screen flex items-center justify-center relative px-4 pt-16">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8 relative">
                <h1
                  className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-wider mb-4 relative cursor-pointer select-none transition-all duration-300 hover:scale-105"
                  onClick={handleLogoClick}
                >
                  <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent drop-shadow-2xl">
                    СЕКРЕТ
                  </span>
                  <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-transparent to-gold-500/20 blur-xl -z-10" />

                  {logoClickCount > 0 && (
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-burgundy-500 rounded-full flex items-center justify-center text-sm font-bold animate-bounce">
                      {logoClickCount}
                    </div>
                  )}
                </h1>
                <div className="flex items-center justify-center gap-2 text-burgundy-300 text-base md:text-lg tracking-widest">
                  <Crown className="w-4 h-4 md:w-5 md:h-5" />
                  <span>ИЛЛЮЗИОННОЕ ШОУ</span>
                  <Crown className="w-4 h-4 md:w-5 md:h-5" />
                </div>
              </div>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto px-4">
                Тайна, которую <span className="text-gold-400 font-semibold">осмелишься</span> увидеть
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-2xl border border-gold-500/30 hover:border-gold-400/50 transition-all duration-300 group hover-glow"
                  onClick={() => setShowSchedule(true)}
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-spin" />
                  Купить билет
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg backdrop-blur-sm transition-all duration-300 group bg-transparent hover-scale"
                  onClick={() => document.getElementById("video")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Смотреть трейлер
                </Button>

                <Button
                  size="lg"
                  className="w-full sm:w-auto glass-button text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-2xl transition-all duration-300 group"
                  onClick={() => window.open("https://v0-recreate-ui-screenshot-xi-azure.vercel.app", "_blank")}
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-spin" />
                  Получить скидку
                </Button>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section id="video" className="py-16 md:py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Окунитесь в атмосферу</h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Посмотрите эксклюзивный трейлер и почувствуйте магию, которая ждет вас на сцене
                </p>
              </div>

              <div className="relative">
                <VideoPlayer
                  src="/placeholder-video.mp4"
                  poster="/magic-show-trailer.png"
                  title="Трейлер шоу СЕКРЕТ"
                  lazy={true}
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-burgundy-500/20 to-gold-500/20 blur-xl -z-10 rounded-lg" />
              </div>
            </div>
          </section>

          {/* My Secret Section */}
          <section id="my-secret" className="py-16 md:py-20 px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Мой секрет</h2>
              <p className="text-lg md:text-xl text-gray-300 mb-12">Узнайте, как создается магия</p>

              <div className="relative">
                <VideoPlayer
                  src="/my-secret-video.mp4"
                  poster="/my-secret-poster.png"
                  title="Мой секрет - создание шоу"
                  lazy={true}
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-burgundy-500/20 to-gold-500/20 blur-xl -z-10 rounded-lg" />
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="py-16 md:py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Что говорят зрители</h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Каждый вечер мы создаем незабываемые эмоции. Вот что чувствуют люди, покидая наш театр
                </p>
              </div>

              <ReviewsSlider />

              <div className="mt-16">
                <AddReviewForm />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 md:py-16 px-4 relative border-t border-gold-500/20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-gold-400 mb-6">Контакты</h3>
                <div className="space-y-3 text-base text-gray-300">
                  <p>Телеграм: @Dmitrokkko</p>
                  <p>
                    Группа Секрет:{" "}
                    <a
                      href="https://t.me/+SEXWNgTBCUo4Nzhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-400 hover:text-gold-300"
                    >
                      https://t.me/+SEXWNgTBCUo4Nzhi
                    </a>
                  </p>
                  <p>Телефон: 89092763386</p>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400">ИП Костюк Дмитрий Павлович. 2025 год.</p>
              </div>
            </div>
          </footer>
        </div>

        <EasterEggModal isOpen={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
        <ScrollMenu />
        <ShowSchedule isOpen={showSchedule} onClose={() => setShowSchedule(false)} />
      </div>
    </>
  )
}
