"use client"

import { useEffect } from "react"

export default function MicroInteractions() {
  useEffect(() => {
    // Enhanced button interactions
    const enhanceButtons = () => {
      document.querySelectorAll("button, [role='button']").forEach((button) => {
        // Ripple effect on click
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
            background: rgba(212, 175, 55, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
          `

          if (!button.querySelector(".ripple-container")) {
            const container = document.createElement("div")
            container.className = "ripple-container"
            container.style.cssText = "position: relative; overflow: hidden;"
            button.appendChild(container)
          }

          const container = button.querySelector(".ripple-container")
          if (container) {
            container.appendChild(ripple)
            setTimeout(() => ripple.remove(), 600)
          }
        })

        // Magnetic effect for large buttons
        if (button.classList.contains("magnetic")) {
          button.addEventListener("mousemove", (e) => {
            const rect = button.getBoundingClientRect()
            const x = (e as MouseEvent).clientX - rect.left - rect.width / 2
            const y = (e as MouseEvent).clientY - rect.top - rect.height / 2

            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`
          })

          button.addEventListener("mouseleave", () => {
            button.style.transform = "translate(0, 0)"
          })
        }
      })
    }

    // Parallax scrolling for background elements
    const addParallaxEffect = () => {
      const parallaxElements = document.querySelectorAll("[data-parallax]")

      const handleScroll = () => {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5

        parallaxElements.forEach((element) => {
          const speed = Number.parseFloat(element.getAttribute("data-parallax") || "0.5")
          const yPos = -(scrolled * speed)
          ;(element as HTMLElement).style.transform = `translateY(${yPos}px)`
        })
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }

    // Tilt effect for cards
    const addTiltEffect = () => {
      document.querySelectorAll("[data-tilt]").forEach((element) => {
        element.addEventListener("mousemove", (e) => {
          const rect = element.getBoundingClientRect()
          const x = (e as MouseEvent).clientX - rect.left
          const y = (e as MouseEvent).clientY - rect.top

          const centerX = rect.width / 2
          const centerY = rect.height / 2

          const rotateX = ((y - centerY) / centerY) * -10
          const rotateY = ((x - centerX) / centerX) * 10
          ;(element as HTMLElement).style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
        })

        element.addEventListener("mouseleave", () => {
          ;(element as HTMLElement).style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
        })
      })
    }

    // Smooth reveal animations
    const addRevealAnimations = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-reveal")
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

    // Text typing effect
    const addTypingEffect = () => {
      document.querySelectorAll("[data-typing]").forEach((element) => {
        const text = element.textContent || ""
        const speed = Number.parseInt(element.getAttribute("data-typing-speed") || "50")

        element.textContent = ""
        let i = 0

        const typeWriter = () => {
          if (i < text.length) {
            element.textContent += text.charAt(i)
            i++
            setTimeout(typeWriter, speed)
          }
        }

        // Start typing when element comes into view
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              typeWriter()
              observer.unobserve(entry.target)
            }
          })
        })

        observer.observe(element)
      })
    }

    // Initialize all effects
    enhanceButtons()
    const cleanupParallax = addParallaxEffect()
    addTiltEffect()
    addRevealAnimations()
    addTypingEffect()

    // Add CSS animations
    const style = document.createElement("style")
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes reveal {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-reveal {
        animation: reveal 0.8s ease-out forwards;
      }

      [data-tilt] {
        transition: transform 0.3s ease-out;
      }

      [data-reveal] {
        opacity: 0;
        transform: translateY(30px);
      }

      .magnetic {
        transition: transform 0.3s ease-out;
      }

      /* Enhanced hover effects */
      .hover-glow:hover {
        box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
        transform: translateY(-2px);
      }

      .hover-scale:hover {
        transform: scale(1.05);
      }

      .hover-rotate:hover {
        transform: rotate(5deg);
      }

      /* Smooth transitions */
      * {
        transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease;
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
