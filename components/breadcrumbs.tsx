"use client"

import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const scrollToSection = (href: string) => {
    const element = document.getElementById(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      <button
        onClick={() => scrollToSection("hero")}
        className="flex items-center hover:text-gold-400 transition-colors"
      >
        <Home className="w-4 h-4" />
      </button>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {item.href && !item.active ? (
            <button onClick={() => scrollToSection(item.href!)} className="hover:text-gold-400 transition-colors">
              {item.label}
            </button>
          ) : (
            <span className={item.active ? "text-gold-400 font-medium" : ""}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
