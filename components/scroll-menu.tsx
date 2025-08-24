"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export default function ScrollMenu() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isVisible ? "animate-fade-in" : ""
        }`}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-purple-900 via-black to-purple-900 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-purple-300 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Menu Title */}
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-8 mt-8">
            СЕКРЕТ
          </h2>

          {/* Menu Items */}
          <nav className="space-y-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left text-white hover:text-purple-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection("trailer")}
              className="block w-full text-left text-white hover:text-purple-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Трейлер
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-white hover:text-purple-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              О шоу
            </button>
            <button
              onClick={() => scrollToSection("reviews")}
              className="block w-full text-left text-white hover:text-purple-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Отзывы
            </button>
            <button
              onClick={() => scrollToSection("my-secret")}
              className="block w-full text-left text-white hover:text-purple-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Мой секрет
            </button>
            <button
              onClick={() => scrollToSection("contacts")}
              className="block w-full text-left text-white hover:text-purple-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Контакты
            </button>
            <a
              href="https://demonnikko.github.io/Site76/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left text-white hover:text-purple-300 transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
            >
              Заказать шоу
            </a>
          </nav>
        </div>
      </div>
    </>
  )
}
