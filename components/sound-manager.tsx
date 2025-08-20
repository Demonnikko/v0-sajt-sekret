"use client"

import { useEffect, useRef, useState } from "react"

interface SoundManagerProps {
  enabled?: boolean
}

export default function SoundManager({ enabled = true }: SoundManagerProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const soundsRef = useRef<{ [key: string]: AudioBuffer }>({})

  // Sound URLs (in a real app, these would be actual audio files)
  const soundUrls = {
    magic: "/sounds/magic-sparkle.mp3",
    treasure: "/sounds/treasure-open.mp3",
    button: "/sounds/button-hover.mp3",
    success: "/sounds/success-chime.mp3",
    easter: "/sounds/easter-egg.mp3",
    ambient: "/sounds/ambient-magic.mp3",
  }

  useEffect(() => {
    if (!enabled) return

    // Initialize audio context on first user interaction
    const initAudio = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

        // Load all sounds
        const loadPromises = Object.entries(soundUrls).map(async ([key, url]) => {
          try {
            // For demo purposes, create a simple tone instead of loading actual files
            const buffer = audioContextRef.current!.createBuffer(1, 44100 * 0.1, 44100)
            const data = buffer.getChannelData(0)

            // Generate different tones for different sounds
            const frequency = key === "magic" ? 800 : key === "treasure" ? 400 : key === "success" ? 600 : 300
            for (let i = 0; i < data.length; i++) {
              data[i] = Math.sin((2 * Math.PI * frequency * i) / 44100) * 0.1 * Math.exp((-i / 44100) * 5)
            }

            soundsRef.current[key] = buffer
          } catch (error) {
            console.warn(`Failed to load sound: ${key}`)
          }
        })

        await Promise.all(loadPromises)
        setIsLoaded(true)
      } catch (error) {
        console.warn("Audio context initialization failed:", error)
      }
    }

    const handleFirstInteraction = () => {
      setIsEnabled(true)
      initAudio()
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }

    document.addEventListener("click", handleFirstInteraction)
    document.addEventListener("touchstart", handleFirstInteraction)

    return () => {
      document.removeEventListener("click", handleFirstInteraction)
      document.removeEventListener("touchstart", handleFirstInteraction)
    }
  }, [enabled])

  const playSound = (soundName: string, volume = 0.3) => {
    if (!isEnabled || !isLoaded || !audioContextRef.current || !soundsRef.current[soundName]) {
      return
    }

    try {
      const source = audioContextRef.current.createBufferSource()
      const gainNode = audioContextRef.current.createGain()

      source.buffer = soundsRef.current[soundName]
      gainNode.gain.value = volume

      source.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      source.start()
    } catch (error) {
      console.warn("Failed to play sound:", soundName, error)
    }
  }

  // Expose playSound function globally
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).playMagicSound = playSound
    }
  }, [isLoaded])

  // Add sound effects to existing elements
  useEffect(() => {
    if (!isLoaded) return

    const addSoundToElements = () => {
      // Magic sounds for sparkle elements
      document.querySelectorAll('[data-sound="magic"]').forEach((element) => {
        element.addEventListener("mouseenter", () => playSound("magic", 0.2))
      })

      // Button hover sounds
      document.querySelectorAll('button, [role="button"]').forEach((element) => {
        element.addEventListener("mouseenter", () => playSound("button", 0.1))
      })

      // Treasure game sounds
      document.querySelectorAll('[data-sound="treasure"]').forEach((element) => {
        element.addEventListener("click", () => playSound("treasure", 0.4))
      })

      // Success sounds
      document.querySelectorAll('[data-sound="success"]').forEach((element) => {
        element.addEventListener("click", () => playSound("success", 0.3))
      })

      // Easter egg sounds
      document.querySelectorAll('[data-sound="easter"]').forEach((element) => {
        element.addEventListener("click", () => playSound("easter", 0.5))
      })
    }

    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", addSoundToElements)
    } else {
      addSoundToElements()
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", addSoundToElements)
    }
  }, [isLoaded])

  return null
}
