"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Key, Gift, Sparkles, Trophy, X } from "lucide-react"
import confetti from "canvas-confetti"

interface GameState {
  isOpen: boolean
  selectedKey: number | null
  gamePhase: "selecting" | "opening" | "result" | "closed"
  hasWon: boolean
  prize: string | null
  attemptsLeft: number
  lastPlayDate: string | null
}

const PRIZES = [
  { text: "Скидка 20% на билет", type: "discount", rarity: "common" },
  { text: "Бесплатный билет", type: "free", rarity: "rare" },
  { text: "VIP место", type: "vip", rarity: "epic" },
  { text: "Встреча с иллюзионистом", type: "meet", rarity: "legendary" },
]

const KEYS = [
  { id: 1, name: "Золотой ключ", color: "gold" },
  { id: 2, name: "Серебряный ключ", color: "silver" },
  { id: 3, name: "Бронзовый ключ", color: "bronze" },
  { id: 4, name: "Магический ключ", color: "magic" },
]

export default function TreasureChestGame() {
  const [gameState, setGameState] = useState<GameState>({
    isOpen: false,
    selectedKey: null,
    gamePhase: "closed",
    hasWon: false,
    prize: null,
    attemptsLeft: 3,
    lastPlayDate: null,
  })

  const [chestAnimation, setChestAnimation] = useState("")
  const [showPrize, setShowPrize] = useState(false)

  useEffect(() => {
    // Load game state from localStorage
    const saved = localStorage.getItem("treasureGameState")
    if (saved) {
      const parsedState = JSON.parse(saved)
      const today = new Date().toDateString()

      // Reset attempts if it's a new day
      if (parsedState.lastPlayDate !== today) {
        setGameState((prev) => ({
          ...parsedState,
          attemptsLeft: 3,
          lastPlayDate: today,
        }))
      } else {
        setGameState(parsedState)
      }
    }
  }, [])

  const saveGameState = (newState: GameState) => {
    localStorage.setItem("treasureGameState", JSON.stringify(newState))
    setGameState(newState)
  }

  const openGame = () => {
    if (gameState.attemptsLeft <= 0) return

    setGameState((prev) => ({
      ...prev,
      isOpen: true,
      gamePhase: "selecting",
      selectedKey: null,
      hasWon: false,
      prize: null,
    }))
  }

  const selectKey = (keyId: number) => {
    setGameState((prev) => ({
      ...prev,
      selectedKey: keyId,
    }))
  }

  const tryOpenChest = () => {
    if (!gameState.selectedKey) return

    setGameState((prev) => ({
      ...prev,
      gamePhase: "opening",
    }))

    setChestAnimation("animate-bounce")

    setTimeout(() => {
      const winChance = Math.random()
      const hasWon = winChance < 0.3 // 30% chance to win

      let prize = null
      if (hasWon) {
        const rarityRoll = Math.random()
        if (rarityRoll < 0.05) {
          prize = PRIZES.find((p) => p.rarity === "legendary")?.text || PRIZES[0].text
        } else if (rarityRoll < 0.15) {
          prize = PRIZES.find((p) => p.rarity === "epic")?.text || PRIZES[0].text
        } else if (rarityRoll < 0.4) {
          prize = PRIZES.find((p) => p.rarity === "rare")?.text || PRIZES[0].text
        } else {
          prize = PRIZES.find((p) => p.rarity === "common")?.text || PRIZES[0].text
        }

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#8B0000", "#000000"],
        })
      }

      const newState = {
        ...gameState,
        gamePhase: "result" as const,
        hasWon,
        prize,
        attemptsLeft: gameState.attemptsLeft - 1,
        lastPlayDate: new Date().toDateString(),
      }

      saveGameState(newState)
      setChestAnimation("")
      setShowPrize(true)
    }, 2000)
  }

  const closeGame = () => {
    setGameState((prev) => ({
      ...prev,
      isOpen: false,
      gamePhase: "closed",
      selectedKey: null,
    }))
    setShowPrize(false)
  }

  const resetForNewAttempt = () => {
    setGameState((prev) => ({
      ...prev,
      gamePhase: "selecting",
      selectedKey: null,
      hasWon: false,
      prize: null,
    }))
    setShowPrize(false)
  }

  return (
    <div className="relative">
      {/* Game Trigger */}
      {!gameState.isOpen && (
        <div className="text-center">
          <div className="relative inline-block">
            <div
              className={`w-32 h-24 bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg shadow-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                gameState.attemptsLeft <= 0 ? "opacity-50 cursor-not-allowed" : "hover:shadow-gold-500/50"
              }`}
              onClick={openGame}
            >
              <div className="absolute inset-2 bg-gradient-to-b from-amber-500 to-amber-700 rounded border-2 border-gold-400">
                <div className="flex items-center justify-center h-full">
                  <Gift className="w-8 h-8 text-gold-200" />
                </div>
              </div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-amber-800 rounded-t-lg border-2 border-gold-400" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 via-transparent to-gold-500/20 blur-xl -z-10 animate-pulse" />
          </div>

          <h3 className="text-2xl font-bold text-gold-400 mt-4 mb-2">Сундук удачи</h3>
          <p className="text-gray-300 mb-4">Выберите ключ и попытайтесь открыть сундук с призами!</p>
          <p className="text-sm text-burgundy-300">
            Попыток осталось: <span className="font-bold text-gold-400">{gameState.attemptsLeft}</span>
          </p>

          {gameState.attemptsLeft <= 0 && <p className="text-sm text-red-400 mt-2">Попробуйте завтра!</p>}
        </div>
      )}

      {/* Game Modal */}
      {gameState.isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-gradient-to-b from-gray-900 to-black border-gold-500/30 p-8 max-w-md w-full relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={closeGame}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gold-400 mb-6">Сундук удачи</h2>

              {/* Chest */}
              <div className="mb-8">
                <div
                  className={`w-40 h-32 mx-auto bg-gradient-to-b from-amber-600 to-amber-800 rounded-lg shadow-2xl relative ${chestAnimation}`}
                >
                  <div className="absolute inset-3 bg-gradient-to-b from-amber-500 to-amber-700 rounded border-2 border-gold-400">
                    {gameState.gamePhase === "result" && gameState.hasWon && (
                      <div className="flex items-center justify-center h-full">
                        <Sparkles className="w-12 h-12 text-gold-200 animate-spin" />
                      </div>
                    )}
                    {gameState.gamePhase === "result" && !gameState.hasWon && (
                      <div className="flex items-center justify-center h-full">
                        <X className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-amber-800 rounded-t-lg border-2 border-gold-400" />

                  {/* Lock */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-8 bg-gold-600 rounded border border-gold-400" />
                </div>
              </div>

              {/* Game Phases */}
              {gameState.gamePhase === "selecting" && (
                <div>
                  <p className="text-gray-300 mb-6">Выберите ключ для открытия сундука:</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {KEYS.map((key) => (
                      <Button
                        key={key.id}
                        variant={gameState.selectedKey === key.id ? "default" : "outline"}
                        onClick={() => selectKey(key.id)}
                        className={`p-4 h-auto flex flex-col items-center gap-2 ${
                          gameState.selectedKey === key.id
                            ? "bg-gold-600 hover:bg-gold-700 border-gold-400"
                            : "border-gold-500/30 hover:border-gold-400 hover:bg-gold-500/10"
                        }`}
                      >
                        <Key
                          className={`w-6 h-6 ${
                            key.color === "gold"
                              ? "text-gold-400"
                              : key.color === "silver"
                                ? "text-gray-300"
                                : key.color === "bronze"
                                  ? "text-amber-600"
                                  : "text-purple-400"
                          }`}
                        />
                        <span className="text-sm">{key.name}</span>
                      </Button>
                    ))}
                  </div>

                  <Button
                    onClick={tryOpenChest}
                    disabled={!gameState.selectedKey}
                    className="bg-burgundy-600 hover:bg-burgundy-700 text-white px-8 py-3 text-lg font-semibold"
                  >
                    <Gift className="w-5 h-5 mr-2" />
                    Открыть сундук
                  </Button>
                </div>
              )}

              {gameState.gamePhase === "opening" && (
                <div>
                  <p className="text-gold-400 text-xl mb-4">Открываем сундук...</p>
                  <div className="flex justify-center">
                    <Sparkles className="w-8 h-8 text-gold-400 animate-spin" />
                  </div>
                </div>
              )}

              {gameState.gamePhase === "result" && (
                <div>
                  {gameState.hasWon ? (
                    <div className="text-center">
                      <Trophy className="w-16 h-16 text-gold-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gold-400 mb-2">Поздравляем!</h3>
                      <p className="text-xl text-white mb-4">Вы выиграли:</p>
                      <div className="bg-gradient-to-r from-burgundy-600 to-burgundy-700 p-4 rounded-lg border border-gold-400 mb-6">
                        <p className="text-gold-300 font-bold text-lg">{gameState.prize}</p>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">Скриншот этого экрана - ваш купон!</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <X className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl text-gray-300 mb-4">Не повезло...</h3>
                      <p className="text-gray-400 mb-4">Попробуйте еще раз!</p>
                    </div>
                  )}

                  <div className="flex gap-4 justify-center">
                    {gameState.attemptsLeft > 0 && (
                      <Button
                        onClick={resetForNewAttempt}
                        variant="outline"
                        className="border-gold-500/50 text-gold-400 hover:bg-gold-500/10 bg-transparent"
                      >
                        Еще попытка ({gameState.attemptsLeft})
                      </Button>
                    )}
                    <Button onClick={closeGame} className="bg-burgundy-600 hover:bg-burgundy-700">
                      Закрыть
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
