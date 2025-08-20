"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Calendar, Play, Users, Star, Crown } from "lucide-react"

interface NavigationProps {
  currentSection?: string
}

const navigationItems = [
  { id: "hero", label: "Главная", icon: Home },
  { id: "game", label: "Игра", icon: Crown },
  { id: "video", label: "Трейлер", icon: Play },
  { id: "about", label: "О шоу", icon: Star },
  { id: "reviews", label: "Отзывы", icon: Users },
  { id: "booking", label: "Билеты", icon: Calendar },
]

export default function Navigation({ currentSection }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Update active section based on scroll position
      const sections = navigationItems.map((item) => item.id)
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-black/90 backdrop-blur-md border-b border-gold-500/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection("hero")}>
              <span className="bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">СЕКРЕТ</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-gold-400 bg-gold-500/10"
                      : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gold-400 hover:bg-gold-500/10"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-gray-900 to-black border-l border-gold-500/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gold-400">Навигация</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gold-400 hover:bg-gold-500/10"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? "text-gold-400 bg-gold-500/20 border border-gold-500/30"
                        : "text-gray-300 hover:text-gold-400 hover:bg-gold-500/10"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-8 border-t border-gray-700">
                <Button
                  onClick={() => scrollToSection("booking")}
                  className="w-full bg-gradient-to-r from-burgundy-600 to-burgundy-700 hover:from-burgundy-700 hover:to-burgundy-800 text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Купить билет
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
