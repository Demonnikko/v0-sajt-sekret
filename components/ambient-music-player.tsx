"use client"

import { useEffect, useRef, useState } from "react"
import { Music, Pause, Play } from "lucide-react"

export default function AmbientMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const ambientBufferRef = useRef<AudioBuffer | null>(null)

  useEffect(() => {
    const initAmbientMusic = async () => {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()

        // Create a longer, more complex ambient track
        const duration = 60 // 60 seconds loop
        const sampleRate = 44100
        const buffer = audioContextRef.current.createBuffer(2, duration * sampleRate, sampleRate)

        // Generate mystical ambient soundscape
        for (let channel = 0; channel < 2; channel++) {
          const data = buffer.getChannelData(channel)

          for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate

            // Layer multiple sine waves for rich ambient texture
            const bass = Math.sin(2 * Math.PI * 60 * t) * 0.1
            const mid = Math.sin(2 * Math.PI * 120 * t + Math.sin(t * 0.5) * 2) * 0.08
            const high = Math.sin(2 * Math.PI * 240 * t + Math.sin(t * 0.3) * 3) * 0.05
            const texture = Math.sin(2 * Math.PI * 480 * t + Math.sin(t * 0.1) * 5) * 0.03

            // Add some mystical modulation
            const modulation = Math.sin(t * 0.2) * 0.5 + 0.5
            const envelope = Math.sin((t * Math.PI) / duration) // Fade in/out over the loop

            data[i] = (bass + mid + high + texture) * modulation * envelope * 0.3

            // Add slight stereo separation
            if (channel === 1) {
              data[i] *= 0.8 // Right channel slightly quieter
            }
          }
        }

        ambientBufferRef.current = buffer
        setIsLoaded(true)
      } catch (error) {
        console.warn("Failed to initialize ambient music:", error)
      }
    }

    // Initialize on first user interaction
    const handleInteraction = () => {
      initAmbientMusic()
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }

    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
  }, [])

  const startMusic = () => {
    if (!audioContextRef.current || !ambientBufferRef.current || sourceRef.current) return

    try {
      const source = audioContextRef.current.createBufferSource()
      const gain = audioContextRef.current.createGain()

      source.buffer = ambientBufferRef.current
      source.loop = true
      gain.gain.value = 0.15

      source.connect(gain)
      gain.connect(audioContextRef.current.destination)

      sourceRef.current = source
      gainRef.current = gain

      source.start()
      setIsPlaying(true)
    } catch (error) {
      console.warn("Failed to start ambient music:", error)
    }
  }

  const stopMusic = () => {
    if (sourceRef.current) {
      sourceRef.current.stop()
      sourceRef.current = null
      gainRef.current = null
      setIsPlaying(false)
    }
  }

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic()
    } else {
      startMusic()
    }
  }

  if (!isLoaded) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={toggleMusic}
        className="bg-black/80 backdrop-blur-sm rounded-full p-3 border border-gold-500/30 text-gold-400 hover:text-gold-300 hover:border-gold-400/50 transition-all duration-300 group"
        title={isPlaying ? "Остановить музыку" : "Включить фоновую музыку"}
      >
        <div className="relative">
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <Music className={`w-3 h-3 absolute -top-1 -right-1 ${isPlaying ? "animate-pulse" : ""}`} />
        </div>
      </button>
    </div>
  )
}
