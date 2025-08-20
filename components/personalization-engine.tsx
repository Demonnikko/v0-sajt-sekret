"use client"

import { useEffect, useState } from "react"

interface UserBehavior {
  visitCount: number
  lastVisit: string
  timeSpent: number
  sectionsVisited: string[]
  gameAttempts: number
  ticketInterest: boolean
  preferredShowTime: string
  deviceType: "mobile" | "desktop"
}

interface PersonalizationEngineProps {
  onPersonalizationUpdate?: (data: UserBehavior) => void
}

export default function PersonalizationEngine({ onPersonalizationUpdate }: PersonalizationEngineProps) {
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    visitCount: 1,
    lastVisit: new Date().toISOString(),
    timeSpent: 0,
    sectionsVisited: [],
    gameAttempts: 0,
    ticketInterest: false,
    preferredShowTime: "",
    deviceType: "desktop",
  })

  const [personalizedContent, setPersonalizedContent] = useState<{
    welcomeMessage: string
    recommendedAction: string
    specialOffer: string | null
  }>({
    welcomeMessage: "Добро пожаловать в мир магии!",
    recommendedAction: "Посмотрите трейлер",
    specialOffer: null,
  })

  // Load user behavior from localStorage
  useEffect(() => {
    const savedBehavior = localStorage.getItem("secret-show-behavior")
    if (savedBehavior) {
      const parsed = JSON.parse(savedBehavior)
      setUserBehavior({
        ...parsed,
        visitCount: parsed.visitCount + 1,
        lastVisit: new Date().toISOString(),
        deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
      })
    } else {
      setUserBehavior((prev) => ({
        ...prev,
        deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
      }))
    }
  }, [])

  // Save user behavior to localStorage
  useEffect(() => {
    localStorage.setItem("secret-show-behavior", JSON.stringify(userBehavior))
    onPersonalizationUpdate?.(userBehavior)
  }, [userBehavior, onPersonalizationUpdate])

  // Track time spent on site
  useEffect(() => {
    const startTime = Date.now()

    const updateTimeSpent = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000)
      setUserBehavior((prev) => ({ ...prev, timeSpent: prev.timeSpent + timeSpent }))
    }

    const interval = setInterval(updateTimeSpent, 30000) // Update every 30 seconds

    return () => {
      clearInterval(interval)
      updateTimeSpent()
    }
  }, [])

  // Track section visits
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "-100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setUserBehavior((prev) => ({
            ...prev,
            sectionsVisited: [...new Set([...prev.sectionsVisited, entry.target.id])],
          }))
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Track user interactions
  useEffect(() => {
    const trackInteractions = () => {
      // Track ticket booking interest
      document.querySelectorAll('[data-track="ticket-purchase"]').forEach((element) => {
        element.addEventListener("click", () => {
          setUserBehavior((prev) => ({ ...prev, ticketInterest: true }))
        })
      })

      // Track game attempts
      document.querySelectorAll('[data-track="treasure-game"]').forEach((element) => {
        element.addEventListener("click", () => {
          setUserBehavior((prev) => ({ ...prev, gameAttempts: prev.gameAttempts + 1 }))
        })
      })

      // Track preferred show times
      document.querySelectorAll("[data-show-time]").forEach((element) => {
        element.addEventListener("click", () => {
          const showTime = element.getAttribute("data-show-time")
          if (showTime) {
            setUserBehavior((prev) => ({ ...prev, preferredShowTime: showTime }))
          }
        })
      })
    }

    trackInteractions()
  }, [])

  // Generate personalized content
  useEffect(() => {
    const generatePersonalizedContent = () => {
      let welcomeMessage = "Добро пожаловать в мир магии!"
      let recommendedAction = "Посмотрите трейлер"
      let specialOffer: string | null = null

      // Returning visitor
      if (userBehavior.visitCount > 1) {
        welcomeMessage = `Рады видеть вас снова! Это ваш ${userBehavior.visitCount}-й визит.`
      }

      // Long-time visitor
      if (userBehavior.visitCount > 5) {
        welcomeMessage = "Добро пожаловать, постоянный гость! У нас есть особое предложение для вас."
        specialOffer = "Скидка 15% для постоянных посетителей сайта!"
      }

      // High engagement user
      if (userBehavior.timeSpent > 300) {
        // 5+ minutes
        recommendedAction = "Забронируйте билеты сейчас"
        if (!specialOffer) {
          specialOffer = "Специальная цена для заинтересованных зрителей - скидка 10%!"
        }
      }

      // Game enthusiast
      if (userBehavior.gameAttempts > 3) {
        recommendedAction = "Попробуйте еще раз в игре удачи"
        if (!specialOffer) {
          specialOffer = "Бонус за активность в игре - дополнительная попытка!"
        }
      }

      // Ticket interested user
      if (userBehavior.ticketInterest) {
        recommendedAction = "Завершите бронирование билетов"
        if (!specialOffer) {
          specialOffer = "Ограниченное предложение - билеты по специальной цене!"
        }
      }

      // Mobile user optimization
      if (userBehavior.deviceType === "mobile") {
        welcomeMessage += " Оптимизировано для мобильных устройств."
      }

      setPersonalizedContent({
        welcomeMessage,
        recommendedAction,
        specialOffer,
      })
    }

    generatePersonalizedContent()
  }, [userBehavior])

  // Apply personalized content to DOM
  useEffect(() => {
    // Update welcome messages
    const welcomeElements = document.querySelectorAll('[data-personalize="welcome"]')
    welcomeElements.forEach((element) => {
      element.textContent = personalizedContent.welcomeMessage
    })

    // Update recommended actions
    const actionElements = document.querySelectorAll('[data-personalize="action"]')
    actionElements.forEach((element) => {
      element.textContent = personalizedContent.recommendedAction
    })

    // Show special offers
    const offerElements = document.querySelectorAll('[data-personalize="offer"]')
    offerElements.forEach((element) => {
      if (personalizedContent.specialOffer) {
        element.textContent = personalizedContent.specialOffer
        element.classList.remove("hidden")
      } else {
        element.classList.add("hidden")
      }
    })
  }, [personalizedContent])

  return null
}
