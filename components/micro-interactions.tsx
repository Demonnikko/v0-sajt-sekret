"use client"

import { useEffect } from "react"

export default function MicroInteractions() {
  useEffect(() => {
    const enhanceButtons = () => {
      document.querySelectorAll("button, [role='button']").forEach((button) => {
        // Magical ripple effect on click
        button.addEventListener("click", (e) => {
          const rect = button.getBoundingClientRect()
          const ripple = document.createElement("span")
          const size = Math.max(rect.width, rect.height)
          const x = (e as MouseEvent).clientX - rect.left - size / 2
          const y = (e as MouseEvent).clientY - rect.top - size / 2

          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.6), rgba(139, 0, 0, 0.3), transparent);
            border-radius: 50%;
            transform: scale(0);
            animation: magicalRipple 0.8s ease-out;
            pointer-events: none;
            z-index: 1;
          `

          if (!button.querySelector(".ripple-container")) {
            const container = document.createElement("div")
            container.className = "ripple-container"
            container.style.cssText = "position: relative; overflow: hidden; border-radius: inherit;"
            button.appendChild(container)
          }

          const container = button.querySelector(".ripple-container")
          if (container) {
            container.appendChild(ripple)
            setTimeout(() => ripple.remove(), 800)
          }
        })

        // Enhanced magnetic effect with sparkles
        if (button.classList.contains("magnetic")) {
          button.addEventListener("mousemove", (e) => {
            const rect = button.getBoundingClientRect()
            const x = (e as MouseEvent).clientX - rect.left - rect.width / 2
            const y = (e as MouseEvent).clientY - rect.top - rect.height / 2

            button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`

            // Add sparkle trail
            if (Math.random() > 0.7) {
              createSparkle(e.clientX, e.clientY)
            }
          })

          button.addEventListener("mouseleave", () => {
            button.style.transform = "translate(0, 0) scale(1)"
          })
        }

        // Pulse effect for important buttons
        if (button.classList.contains("hover-glow")) {
          button.addEventListener("mouseenter", () => {
            button.style.animation = "magicalPulse 1.5s ease-in-out infinite"
          })

          button.addEventListener("mouseleave", () => {
            button.style.animation = ""
          })
        }
      })
    }

    const createSparkle = (x: number, y: number) => {
      const sparkle = document.createElement("div")
      sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #d4af37, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleFloat 1s ease-out forwards;
      `

      document.body.appendChild(sparkle)
      setTimeout(() => sparkle.remove(), 1000)
    }

    const addParallaxEffect = () => {
      const parallaxElements = document.querySelectorAll("[data-parallax]")

      const handleScroll = () => {
        const scrolled = window.pageYOffset
        const windowHeight = window.innerHeight

        parallaxElements.forEach((element) => {
          const speed = Number.parseFloat(element.getAttribute("data-parallax") || "0.5")
          const yPos = -(scrolled * speed)
          const opacity = Math.max(0, 1 - (scrolled / windowHeight) * 0.5)
          ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
          ;(element as HTMLElement).style.opacity = opacity.toString()
        })
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }

    const addTiltEffect = () => {
      document.querySelectorAll("[data-tilt]").forEach((element) => {
        element.addEventListener("mousemove", (e) => {
          const rect = element.getBoundingClientRect()
          const x = (e as MouseEvent).clientX - rect.left
          const y = (e as MouseEvent).clientY - rect.top

          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateX = ((y - centerY) / centerY) * -8
          const rotateY = ((x - centerX) / centerX) * 8
          ;(element as HTMLElement).style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
          ;(element as HTMLElement).style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(212, 175, 55, 0.2)`
        })

        element.addEventListener("mouseleave", () => {
          ;(element as HTMLElement).style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
          ;(element as HTMLElement).style.boxShadow = ""
        })
      })
    }

    const addRevealAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add("animate-reveal")
              }, index * 100) // Stagger animation
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      )

      document.querySelectorAll("[data-reveal]").forEach((element) => {
        observer.observe(element)
      })
    }

    const addTypingEffect = () => {
      document.querySelectorAll("[data-typing]").forEach((element) => {
        const text = element.textContent || ""
        const speed = Number.parseInt(element.getAttribute("data-typing-speed") || "50")

        element.textContent = ""
        element.style.borderRight = "2px solid #d4af37"
        element.style.animation = "blink 1s infinite"

        let i = 0

        const typeWriter = () => {
          if (i < text.length) {
            element.textContent += text.charAt(i)
            i++
            setTimeout(typeWriter, speed)
          } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
              element.style.borderRight = "none"
              element.style.animation = ""
            }, 1000)
          }
        }

        // Start typing when element comes into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => typeWriter(), 500) // Delay before starting
              observer.unobserve(entry.target)
            }
          })
        })

        observer.observe(element)
      })
    }

    const addScrollAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement

              // Add different animations based on element type
              if (element.tagName === "H1" || element.tagName === "H2") {
                element.style.animation = "slideInFromLeft 0.8s ease-out forwards"
              } else if (element.classList.contains("card")) {
                element.style.animation = "scaleIn 0.6s ease-out forwards"
              } else {
                element.style.animation = "fadeInUp 0.8s ease-out forwards"
              }

              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 },
      )

      // Observe all major elements
      document.querySelectorAll("h1, h2, h3, .card, p, img").forEach((element) => {
        if (!element.hasAttribute("data-reveal") && !element.hasAttribute("data-typing")) {
          observer.observe(element)
        }
      })
    }

    const addHoverSounds = () => {
      document.querySelectorAll(".hover-glow, .hover-scale, [data-tilt]").forEach((element) => {
        element.addEventListener("mouseenter", () => {
          if (typeof window !== "undefined" && (window as any).playMagicSound) {
            ;(window as any).playMagicSound("sparkle", 0.05)
          }
        })
      })
    }

    const addLoadingAnimations = () => {
      // Animate elements that are initially hidden
      document.querySelectorAll("[data-loading]").forEach((element) => {
        const delay = Number.parseInt(element.getAttribute("data-loading") || "0")

        setTimeout(() => {
          element.classList.add("animate-fadeIn")
        }, delay)
      })
    }

    // Initialize all effects
    enhanceButtons()
    const cleanupParallax = addParallaxEffect()
    addTiltEffect()
    addRevealAnimations()
    addTypingEffect()
    addScrollAnimations()
    addHoverSounds()
    addLoadingAnimations()

    const style = document.createElement("style")
    style.textContent = `
      @keyframes magicalRipple {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes sparkleFloat {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-20px) scale(0);
          opacity: 0;
        }
      }

      @keyframes magicalPulse {
        0%, 100% {
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }
        50% {
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.6), 0 0 60px rgba(139, 0, 0, 0.3);
        }
      }

      @keyframes reveal {
        from {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.8);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes blink {
        0%, 50% { border-color: #d4af37; }
        51%, 100% { border-color: transparent; }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .animate-reveal {
        animation: reveal 0.8s ease-out forwards;
      }

      .animate-fadeIn {
        animation: fadeIn 0.6s ease-out forwards;
      }

      [data-tilt] {
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                    box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      [data-reveal] {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
      }

      [data-loading] {
        opacity: 0;
      }

      .magnetic {
        transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      /* Enhanced hover effects with magical touches */
      .hover-glow {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      .hover-glow:hover {
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.5), 0 10px 40px rgba(0, 0, 0, 0.3);
        transform: translateY(-4px) scale(1.02);
      }

      .hover-scale {
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .hover-scale:hover {
        transform: scale(1.08);
      }

      .hover-rotate:hover {
        transform: rotate(3deg) scale(1.05);
      }

      /* Magical text effects */
      .text-shimmer {
        background: linear-gradient(90deg, #d4af37, #f4d03f, #d4af37);
        background-size: 200% 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 2s ease-in-out infinite;
      }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      /* Smooth transitions for all interactive elements */
      button, [role="button"], .card, .hover-glow, .hover-scale {
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }

      /* Loading skeleton animations */
      .skeleton {
        background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }

      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* Magical border animations */
      .magical-border {
        position: relative;
        overflow: hidden;
      }

      .magical-border::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
        animation: borderSweep 2s infinite;
      }

      @keyframes borderSweep {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `
    document.head.appendChild(style)

    return () => {
      cleanupParallax()
      document.head.removeChild(style)
    }
  }, [])

  return null
}
