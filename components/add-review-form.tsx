"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Send } from "lucide-react"

export default function AddReviewForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    city: "",
    text: "",
    rating: 5,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitted(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        age: "",
        city: "",
        text: "",
        rating: 5,
      })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const setRating = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-br from-green-900/50 to-black/50 border-green-500/30 p-8 backdrop-blur-sm text-center">
        <div className="text-green-400 text-xl font-bold mb-4">Спасибо за ваш отзыв!</div>
        <p className="text-gray-300">Ваш отзыв будет опубликован после модерации.</p>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gold-500/30 p-8 backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-gold-400 mb-6 text-center">Оставьте свой отзыв</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <Input
            name="name"
            placeholder="Ваше имя"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="bg-black/50 border-gold-500/30 text-white placeholder:text-gray-400"
          />
          <Input
            name="age"
            type="number"
            placeholder="Возраст"
            value={formData.age}
            onChange={handleInputChange}
            required
            className="bg-black/50 border-gold-500/30 text-white placeholder:text-gray-400"
          />
          <Input
            name="city"
            placeholder="Город"
            value={formData.city}
            onChange={handleInputChange}
            required
            className="bg-black/50 border-gold-500/30 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="text-center">
          <label className="block text-gold-400 mb-3">Ваша оценка</label>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="transition-all duration-200 hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${star <= formData.rating ? "text-gold-400 fill-current" : "text-gray-600"}`}
                />
              </button>
            ))}
          </div>
        </div>

        <Textarea
          name="text"
          placeholder="Расскажите о своих впечатлениях от шоу..."
          value={formData.text}
          onChange={handleInputChange}
          required
          rows={4}
          className="bg-black/50 border-gold-500/30 text-white placeholder:text-gray-400 resize-none"
        />

        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-gold-600 to-gold-700 hover:from-gold-700 hover:to-gold-800 text-black px-8 py-3 font-semibold"
          >
            {isSubmitting ? (
              "Отправляем..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Отправить отзыв
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  )
}
