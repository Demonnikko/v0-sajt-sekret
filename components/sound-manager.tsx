"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

interface SoundManagerProps {
  enabled?: boolean
}

export default function SoundManager({ enabled = true }: SoundManagerProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (!enabled) return

    const initAudio = () => {
      try {
        if (typeof window !== "undefined" && !audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
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

  const playSound = (frequency = 800, duration = 0.2) => {
    if (!isEnabled || !audioContextRef.current || isMuted) return

    try {
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume()
      }

      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = "sine"

      gainNode.gain.setValueAtTime(volume * 0.1, audioContextRef.current.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration)

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration)
    } catch (error) {
      // Silently handle audio errors
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const adjustVolume = (newVolume: number) => {
    setVolume(newVolume)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).playMagicSound = (type: string) => {
        switch (type) {
          case "magic":
            playSound(800, 0.3)
            break
          case "button":
            playSound(600, 0.1)
            break
          case "success":
            playSound(1000, 0.5)
            break
          default:
            playSound(500, 0.2)
        }
      }
    }
  }, [isEnabled, volume, isMuted])

  useEffect(() => {
    if (!isEnabled) return

    const addSoundToButtons = () => {
      document.querySelectorAll('button, [role="button"]').forEach((element) => {
        const handleHover = () => playSound(600, 0.1)
        const handleClick = () => playSound(800, 0.2)

        element.addEventListener("mouseenter", handleHover)
        element.addEventListener("click", handleClick)
      })
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", addSoundToButtons)
    } else {
      addSoundToButtons()
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", addSoundToButtons)
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-gold-500/30">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="text-gold-400 hover:text-gold-300 transition-colors"
            title={isMuted ? "Включить звук" : "Выключить звук"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => adjustVolume(Number.parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            title="Громкость"
          />
        </div>
      </div>
    </div>
  )
}
