"use client"
import { Button } from "@/components/ui/button"
import { X, Home, Eye, ShoppingBag, Sparkles } from "lucide-react"

interface PopupMenuProps {
  isOpen: boolean
  onClose: () => void
  currentSection: string
  onSectionChange: (section: string) => void
}

export default function PopupMenu({ isOpen, onClose, currentSection, onSectionChange }: PopupMenuProps) {
  const handleSectionClick = (section: string) => {
    if (section === "order-show") {
      window.open("https://demonnikko.github.io/Site76/", "_blank")
    } else {
      onSectionChange(section)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 animate-fade-in" onClick={onClose} />

      {/* Menu Panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-b from-burgundy-900/95 via-black/95 to-burgundy-900/95 backdrop-blur-md rounded-2xl border border-gold-500/30 p-8 max-w-md w-full animate-scale-in shadow-2xl">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gold-400 hover:text-gold-300 hover:bg-gold-500/10 rounded-full p-2"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Menu Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              СЕКРЕТ
            </h2>
            <p className="text-burgundy-300 text-sm mt-2">Навигация по сайту</p>
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <Button
              onClick={() => handleSectionClick("hero")}
              className={`w-full justify-start text-left p-4 h-auto transition-all duration-300 ${
                currentSection === "hero"
                  ? "bg-gold-500 text-black hover:bg-gold-400"
                  : "bg-transparent text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 border border-gold-500/30"
              }`}
            >
              <Home className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Главная</div>
                <div className="text-xs opacity-70">Основная страница шоу</div>
              </div>
            </Button>

            <Button
              onClick={() => handleSectionClick("my-secret")}
              className={`w-full justify-start text-left p-4 h-auto transition-all duration-300 ${
                currentSection === "my-secret"
                  ? "bg-gold-500 text-black hover:bg-gold-400"
                  : "bg-transparent text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 border border-gold-500/30"
              }`}
            >
              <Eye className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Мой секрет</div>
                <div className="text-xs opacity-70">О создании шоу</div>
              </div>
            </Button>

            <Button
              onClick={() => handleSectionClick("order-show")}
              className="w-full justify-start text-left p-4 h-auto bg-transparent text-gold-400 hover:bg-gold-500/10 hover:text-gold-300 border border-gold-500/30 transition-all duration-300"
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              <div>
                <div className="font-semibold">Заказать шоу</div>
                <div className="text-xs opacity-70">Перейти на сайт заказов</div>
              </div>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-8 pt-6 border-t border-gold-500/20">
            <div className="flex items-center justify-center gap-2 text-burgundy-300 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Добро пожаловать в мир магии</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
