"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Sparkles, Crown, Eye, Clock, Users, Star, Heart, Wand2 } from "lucide-react"
import TreasureChestGame from "@/components/treasure-chest-game"
import VideoPlayer from "@/components/video-player"
import ReviewsSlider from "@/components/reviews-slider"
import ScrollEffects from "@/components/scroll-effects"
import EasterEggModal from "@/components/easter-egg-modal"
import TicketBooking from "@/components/ticket-booking"
import MagicPreloader from "@/components/magic-preloader"
import OptimizedImage from "@/components/optimized-image"
import PerformanceOptimizer from "@/components/performance-optimizer"
import Navigation from "@/components/navigation"
import Breadcrumbs from "@/components/breadcrumbs"
import MobileOptimizations from "@/components/mobile-optimizations"
import SEOHead from "@/components/seo-head"
import SoundManager from "@/components/sound-manager"
import PersonalizationEngine from "@/components/personalization-engine"
import MicroInteractions from "@/components/micro-interactions"
import InteractiveElements from "@/components/interactive-elements"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [curtainOpen, setCurtainOpen] = useState(false)
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showPreloader, setShowPreloader] = useState(true)
  const [personalizedMessage, setPersonalizedMessage] = useState("Добро пожаловать в мир магии!")

  useEffect(() => {
    setIsLoaded(true)
    const timer = setTimeout(() => setCurtainOpen(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)

    if (newCount === 5) {
      setShowEasterEgg(true)
      setLogoClickCount(0)
    }

    // Reset counter after 3 seconds of inactivity
    setTimeout(() => {
      setLogoClickCount(0)
    }, 3000)
  }

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
  }

  const handlePersonalizationUpdate = (behavior: any) => {
    // Update personalized content based on user behavior
    if (behavior.visitCount > 1) {
      setPersonalizedMessage(`Рады видеть вас снова! Это ваш ${behavior.visitCount}-й визит.`)
    }
  }

  if (showPreloader) {
    return <MagicPreloader onComplete={handlePreloaderComplete} />
  }

  return (
    <>
      <SEOHead />

      <div className="min-h-screen bg-black text-white overflow-hidden relative">
        <PerformanceOptimizer />
        <MobileOptimizations />
        <SoundManager enabled={true} />
        <PersonalizationEngine onPersonalizationUpdate={handlePersonalizationUpdate} />
        <MicroInteractions />
        <InteractiveElements />
        <Navigation />
        <ScrollEffects />

        <div
          className="fixed w-4 h-4 bg-gold-400/30 rounded-full blur-sm pointer-events-none z-30 transition-all duration-100 hidden md:block"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
          }}
        />

        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-burgundy-900/20 to-black" data-parallax="0.3">
          <div className="absolute inset-0 opacity-30">
            {/* Spotlight effects */}
            <div
              className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse"
              data-parallax="0.2"
            />
            <div
              className="absolute top-1/3 right-1/4 w-64 h-64 bg-burgundy-500/15 rounded-full blur-2xl animate-pulse delay-1000"
              data-parallax="0.4"
            />
            <div
              className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gold-400/8 rounded-full blur-3xl animate-pulse delay-2000"
              data-parallax="0.1"
            />
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
              {/* Logo/Title */}
              <div className="mb-8 relative" data-reveal data-tilt>
                <h1
                  className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-wider mb-4 relative cursor-pointer select-none transition-all duration-300 hover:scale-105 magnetic"
                  onClick={handleLogoClick}
                  data-sound="easter"
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
                  <Crown className="w-4 h-4 md:w-5 md:h-5" data-sound="magic" />
                  <span>ИЛЮЗИОННОЕ ШОУ</span>
                  <Crown className="w-4 h-4 md:w-5 md:h-5" data-sound="magic" />
                </div>
              </div>

              {/* Personalized Welcome Message */}
              <div className="mb-6" data-reveal>
                <p className="text-lg text-gold-400 font-semibold" data-personalize="welcome">
                  {personalizedMessage}
                </p>
              </div>

              {/* Tagline */}
              <p
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto px-4"
                data-reveal
                data-typing
                data-typing-speed="30"
              >
                Тайна, которую <span className="text-gold-400 font-semibold">осмелишься</span> увидеть
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4" data-reveal>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold shadow-2xl border border-gold-500/30 hover:border-gold-400/50 transition-all duration-300 group magnetic hover-glow"
                  onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                  data-track="ticket-purchase"
                  data-sound="success"
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:animate-spin" />
                  Купить билет
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-gold-500/50 text-gold-400 hover:bg-gold-500/10 hover:border-gold-400 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg backdrop-blur-sm transition-all duration-300 group bg-transparent hover-scale"
                  onClick={() => document.getElementById("video")?.scrollIntoView({ behavior: "smooth" })}
                  data-track="video-play"
                  data-sound="magic"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Смотреть трейлер
                </Button>
              </div>

              {/* Special Offer Banner */}
              <div className="hidden mb-8" data-personalize="offer">
                <div className="bg-gradient-to-r from-gold-500/20 to-burgundy-500/20 border border-gold-500/30 rounded-lg p-4 backdrop-blur-sm animate-pulse">
                  <p className="text-gold-400 font-semibold">Специальное предложение!</p>
                </div>
              </div>

              {/* Scroll Indicator - Hidden on mobile */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
                <div className="w-6 h-10 border-2 border-gold-500/50 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-gold-400 rounded-full mt-2 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Floating Elements - Reduced on mobile */}
            <div className="absolute top-1/4 left-4 md:left-8 animate-float" data-sound="magic">
              <div className="w-1 h-1 md:w-2 md:h-2 bg-gold-400 rounded-full opacity-60" />
            </div>
            <div className="absolute top-1/3 right-6 md:right-12 animate-float delay-1000" data-sound="magic">
              <div className="w-1 h-1 bg-burgundy-400 rounded-full opacity-40" />
            </div>
            <div className="absolute bottom-1/3 left-8 md:left-16 animate-float delay-2000" data-sound="magic">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-gold-300 rounded-full opacity-30" />
            </div>
          </section>

          {/* Treasure Chest Game Section */}
          <section id="game" className="py-16 md:py-20 px-4 relative">
            <div className="max-w-4xl mx-auto">
              <Breadcrumbs items={[{ label: "Игра удачи", active: true }]} />

              <div className="text-center mb-12" data-reveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gold-400">Испытайте удачу</h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Каждый день у вас есть 3 попытки открыть магический сундук и выиграть{" "}
                  <span className="text-burgundy-300 font-semibold">эксклюзивные призы</span>
                </p>
              </div>

              <div
                className="flex justify-center"
                data-track="treasure-game"
                data-sound="treasure"
                data-reveal
                data-tilt
              >
                <TreasureChestGame />
              </div>
            </div>
          </section>

          {/* Video Section */}
          <section id="video" className="py-16 md:py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <Breadcrumbs items={[{ label: "Трейлер", active: true }]} />

              <div className="text-center mb-12" data-reveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Окунитесь в атмосферу</h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Посмотрите эксклюзивный трейлер и почувствуйте магию, которая ждет вас на сцене
                </p>
              </div>

              <div className="relative" data-reveal data-tilt>
                <VideoPlayer
                  src="/placeholder-video.mp4"
                  poster="/magic-show-trailer.png"
                  title="Трейлер шоу СЕКРЕТ"
                  lazy={true}
                />

                {/* Video Frame Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-burgundy-500/20 to-gold-500/20 blur-xl -z-10 rounded-lg" />
              </div>
            </div>
          </section>

          {/* Show Details Section */}
          <section id="about" className="py-16 md:py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <Breadcrumbs items={[{ label: "О шоу", active: true }]} />

              <div className="text-center mb-16" data-reveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-gold-400">Что скрывает шоу?</h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                  Каждый номер — это загадка. Каждый момент — это вызов вашему восприятию реальности.
                  <span className="block mt-4 text-burgundy-300 font-semibold">
                    Но некоторые секреты лучше увидеть своими глазами...
                  </span>
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
                {/* Left: Mysterious Description */}
                <div className="space-y-6 md:space-y-8 order-2 lg:order-1" data-reveal>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 hover-scale">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center flex-shrink-0 hover-glow">
                        <Eye className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gold-400 mb-3">
                          Невозможное становится возможным
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          Предметы исчезают и появляются в самых неожиданных местах. Время замедляется, а пространство
                          подчиняется воле иллюзиониста.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 hover-scale">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-burgundy-600 to-gold-500 rounded-full flex items-center justify-center flex-shrink-0 hover-glow">
                        <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gold-400 mb-3">Вы — часть магии</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Это не просто представление. Зрители становятся соучастниками невероятных превращений,
                          свидетелями чудес, которые происходят прямо у них на глазах.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 hover-scale">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center flex-shrink-0 hover-glow">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gold-400 mb-3">90 минут вне времени</h3>
                        <p className="text-gray-300 leading-relaxed">
                          Полтора часа, которые изменят ваше представление о границах возможного. Каждая минута
                          наполнена тайной и восхищением.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Atmospheric Image */}
                <div className="relative order-1 lg:order-2" data-reveal data-tilt>
                  <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                    <OptimizedImage
                      src="/elegant-magician.png"
                      alt="Дмитрий Костюк на сцене"
                      className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-burgundy-500/30 via-gold-500/20 to-burgundy-500/30 blur-2xl -z-10 rounded-lg" />
                </div>
              </div>

              {/* Show Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16" data-reveal>
                <Card
                  className="bg-gradient-to-b from-gray-900/50 to-black/50 border-gold-500/30 p-4 md:p-6 text-center backdrop-blur-sm hover-glow hover-scale"
                  data-tilt
                >
                  <div className="text-2xl md:text-3xl font-bold text-gold-400 mb-2">15+</div>
                  <div className="text-sm md:text-base text-gray-300">Уникальных номеров</div>
                </Card>

                <Card
                  className="bg-gradient-to-b from-gray-900/50 to-black/50 border-burgundy-500/30 p-4 md:p-6 text-center backdrop-blur-sm hover-glow hover-scale"
                  data-tilt
                >
                  <div className="text-2xl md:text-3xl font-bold text-burgundy-300 mb-2">90</div>
                  <div className="text-sm md:text-base text-gray-300">Минут магии</div>
                </Card>

                <Card
                  className="bg-gradient-to-b from-gray-900/50 to-black/50 border-gold-500/30 p-4 md:p-6 text-center backdrop-blur-sm hover-glow hover-scale"
                  data-tilt
                >
                  <div className="text-2xl md:text-3xl font-bold text-gold-400 mb-2">200</div>
                  <div className="text-sm md:text-base text-gray-300">Мест в зале</div>
                </Card>

                <Card
                  className="bg-gradient-to-b from-gray-900/50 to-black/50 border-burgundy-500/30 p-4 md:p-6 text-center backdrop-blur-sm hover-glow hover-scale"
                  data-tilt
                >
                  <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl font-bold text-gold-400 mb-2">
                    <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                    <span>5.0</span>
                  </div>
                  <div className="text-sm md:text-base text-gray-300">Рейтинг зрителей</div>
                </Card>
              </div>

              {/* Mysterious Teasers */}
              <div
                className="bg-gradient-to-r from-burgundy-900/30 via-black/50 to-burgundy-900/30 rounded-2xl p-6 md:p-8 border border-gold-500/20 backdrop-blur-sm hover-glow"
                data-reveal
                data-tilt
              >
                <h3 className="text-2xl md:text-3xl font-bold text-center text-gold-400 mb-8">Что вас ждет?</h3>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                  <div className="text-center hover-scale">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow"
                      data-sound="magic"
                    >
                      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gold-400 mb-3">Левитация</h4>
                    <p className="text-sm md:text-base text-gray-300">
                      Предметы парят в воздухе, подчиняясь только воле мастера
                    </p>
                  </div>

                  <div className="text-center hover-scale">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-burgundy-600 to-gold-500 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow"
                      data-sound="magic"
                    >
                      <Eye className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-burgundy-300 mb-3">Телепатия</h4>
                    <p className="text-sm md:text-base text-gray-300">
                      Мысли читаются, а желания исполняются прежде, чем вы их озвучите
                    </p>
                  </div>

                  <div className="text-center hover-scale">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow"
                      data-sound="magic"
                    >
                      <Crown className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-gold-400 mb-3">Трансформация</h4>
                    <p className="text-sm md:text-base text-gray-300">
                      Реальность меняется на ваших глазах, создавая новые миры
                    </p>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <p className="text-base md:text-lg text-burgundy-300 font-semibold italic">
                    "Но это лишь малая часть того, что скрывает шоу..."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="py-16 md:py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <Breadcrumbs items={[{ label: "Отзывы", active: true }]} />

              <div className="text-center mb-16" data-reveal>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gold-400">Что говорят зрители</h2>
                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Каждый вечер мы создаем незабываемые эмоции. Вот что чувствуют люди, покидая наш театр
                </p>
              </div>

              <div data-reveal>
                <ReviewsSlider />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16" data-reveal>
                <div className="text-center hover-scale">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gold-400 mb-2">2,847</div>
                  <div className="text-sm md:text-base text-gray-400">Довольных зрителей</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-burgundy-300 mb-2">98%</div>
                  <div className="text-sm md:text-base text-gray-400">Рекомендуют друзьям</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gold-400 mb-2">156</div>
                  <div className="text-sm md:text-base text-gray-400">Проведенных шоу</div>
                </div>
                <div className="text-center hover-scale">
                  <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl lg:text-4xl font-bold text-gold-400 mb-2">
                    <Heart className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 fill-current" />
                    <span>4.9</span>
                  </div>
                  <div className="text-sm md:text-base text-gray-400">Средняя оценка</div>
                </div>
              </div>
            </div>
          </section>

          {/* Personal Story Section - "My Secret" */}
          <section className="py-16 md:py-20 px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                {/* Left: Photo */}
                <div className="relative order-2 lg:order-1" data-reveal data-tilt>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <OptimizedImage src="/dmitry-portrait.png" alt="Дмитрий Костюк" className="w-full h-full" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Floating Magic Elements - Reduced on mobile */}
                  <div
                    className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 bg-gold-400 rounded-full opacity-60 animate-float"
                    data-sound="magic"
                  />
                  <div
                    className="absolute top-1/3 -left-3 md:-left-6 w-3 h-3 md:w-4 md:h-4 bg-burgundy-400 rounded-full opacity-40 animate-float delay-1000"
                    data-sound="magic"
                  />
                  <div
                    className="absolute bottom-1/3 -right-4 md:-right-8 w-4 h-4 md:w-6 md:h-6 bg-gold-300 rounded-full opacity-50 animate-float delay-2000"
                    data-sound="magic"
                  />

                  {/* Glow Effect */}
                  <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-r from-burgundy-500/20 via-gold-500/20 to-burgundy-500/20 blur-3xl -z-10 rounded-2xl" />
                </div>

                {/* Right: Personal Story */}
                <div className="space-y-6 md:space-y-8 order-1 lg:order-2" data-reveal>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-gold-500 to-burgundy-600 rounded-full flex items-center justify-center hover-glow">
                        <Wand2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gold-400">Мой секрет</h2>
                    </div>

                    <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold text-burgundy-300 leading-relaxed italic mb-6 md:mb-8">
                      "У каждого есть свой секрет. Я покажу вам мой."
                    </blockquote>

                    <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
                      <p>
                        Меня зовут <span className="text-gold-400 font-semibold">Дмитрий Костюк</span>, и я не просто
                        показываю фокусы. Я создаю моменты, когда время останавливается, а невозможное становится
                        реальностью.
                      </p>

                      <p>
                        Мой путь начался в детстве, когда дедушка показал мне первый фокус с исчезающей монетой. Тогда я
                        понял:{" "}
                        <span className="text-burgundy-300 font-semibold">магия живет не в руках, а в сердце</span>.
                      </p>

                      <p>
                        15 лет изучения, тысячи часов практики, выступления в 12 странах мира — все это привело меня к
                        пониманию главного секрета: настоящая магия происходит не на сцене, а{" "}
                        <span className="text-gold-400 font-semibold">в душе зрителя</span>.
                      </p>

                      <p className="text-lg md:text-xl font-semibold text-burgundy-300 italic">
                        Каждое шоу — это не представление. Это путешествие в мир, где ваши мечты обретают форму, а
                        чудеса случаются по-настоящему.
                      </p>
                    </div>

                    {/* Personal Touch */}
                    <div className="bg-gradient-to-r from-burgundy-900/40 via-black/60 to-burgundy-900/40 rounded-xl p-4 md:p-6 border border-gold-500/20 backdrop-blur-sm hover-glow">
                      <p className="text-sm md:text-base text-gold-300 text-center italic">
                        "Приходите не просто посмотреть шоу. Приходите стать частью чуда, которое изменит ваш взгляд на
                        мир навсегда."
                      </p>
                      <div className="text-center mt-4">
                        <div className="text-burgundy-300 font-semibold">— Дмитрий Костюк</div>
                        <div className="text-xs md:text-sm text-gray-400">Иллюзионист международного уровня</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ticket Booking Section */}
          <section id="booking" className="py-16 md:py-20 px-4 relative">
            <Breadcrumbs items={[{ label: "Бронирование билетов", active: true }]} />
            <div data-reveal>
              <TicketBooking />
            </div>
          </section>

          <footer className="py-12 md:py-16 px-4 relative border-t border-gold-500/20">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12" data-reveal>
                {/* Contact Info */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gold-400 mb-4 md:mb-6">Контакты</h3>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-300">
                    <p>Театр "Волшебство"</p>
                    <p>г. Ярославль, ул. Театральная, 15</p>
                    <p>Тел: +7 (4852) 123-456</p>
                    <p>Email: info@secret-show.ru</p>
                  </div>
                </div>

                {/* Show Times */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gold-400 mb-4 md:mb-6">Расписание</h3>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-300">
                    <p>Пятница: 19:00</p>
                    <p>Суббота: 16:00, 19:00</p>
                    <p>Воскресенье: 15:00</p>
                    <p className="text-burgundy-300 font-semibold">Билеты от 1500₽</p>
                  </div>
                </div>

                {/* Social & Private Shows */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gold-400 mb-4 md:mb-6">Частные выступления</h3>
                  <div className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-300">
                    <p>Корпоративные мероприятия</p>
                    <p>Частные праздники</p>
                    <p>VIP-шоу</p>
                    <p className="text-burgundy-300">Заказ: +7 (999) 123-45-67</p>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 md:pt-8 border-t border-gray-800">
                <p className="text-xs md:text-sm text-gray-400">
                  © 2024 Шоу "Секрет". Все права защищены. | Создано с магией и любовью
                </p>
              </div>
            </div>
          </footer>
        </div>

        <EasterEggModal isOpen={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
      </div>
    </>
  )
}
