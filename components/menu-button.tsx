"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface MenuButtonProps {
  onClick: () => void
}

export default function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed top-6 right-6 z-40 bg-black/80 backdrop-blur-sm border border-gold-500/30 text-gold-400 hover:text-gold-300 hover:bg-gold-500/10 rounded-full p-3 shadow-2xl hover-glow transition-all duration-300"
      size="sm"
    >
      <Menu className="w-6 h-6" />
    </Button>
  )
}
