"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Smartphone } from "lucide-react"


interface TicTacToeDemoProps {
  isOpen: boolean
  onClose: () => void
}

export function TicTacToeDemo({ isOpen, onClose }: TicTacToeDemoProps) {
  const [boxes, setBoxes] = useState<string[]>(Array(9).fill(""))
  const [currentPlayer, setCurrentPlayer] = useState("X")
  const [gameEnded, setGameEnded] = useState(false)
  const [winner, setWinner] = useState<string | null>(null)
  const [isDraw, setIsDraw] = useState(false)
  const [tieTimer, setTieTimer] = useState<NodeJS.Timeout | null>(null)
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false)

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ]

  const checkWin = (currentBoxes: string[]) => {
    for (const [a, b, c] of winPatterns) {
      if (currentBoxes[a] && currentBoxes[a] === currentBoxes[b] && currentBoxes[a] === currentBoxes[c]) {
        return currentBoxes[a]
      }
    }
    return null
  }

  const checkTie = (currentBoxes: string[]) => {
    return currentBoxes.every(box => box !== "")
  }

  const makeMove = (index: number) => {
    if (boxes[index] || gameEnded) return

    const newBoxes = [...boxes]
    newBoxes[index] = currentPlayer
    setBoxes(newBoxes)

    // Clear any existing timer
    if (tieTimer) {
      clearTimeout(tieTimer)
      setTieTimer(null)
    }

    const gameWinner = checkWin(newBoxes)
    if (gameWinner) {
      setTimeout(() => {
        setWinner(gameWinner)
        setGameEnded(true)
      }, 100)
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")

      // Set a timer to check for tie
      const timer = setTimeout(() => {
        if (checkTie(newBoxes)) {
          setIsDraw(true)
          setGameEnded(true)
        }
      }, 1000)
      setTieTimer(timer)
    }
  }

  const resetGame = () => {
    setBoxes(Array(9).fill(""))
    setCurrentPlayer("X")
    setGameEnded(false)
    setWinner(null)
    setIsDraw(false)
    if (tieTimer) {
      clearTimeout(tieTimer)
      setTieTimer(null)
    }
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (tieTimer) {
        clearTimeout(tieTimer)
      }
    }
  }, [tieTimer])

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      // Check if screen is too small (less than 400px width or 500px height)
      setIsScreenTooSmall(window.innerWidth < 400 || window.innerHeight < 500)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Reset game when modal opens
  useEffect(() => {
    if (isOpen) {
      resetGame()
    }
  }, [isOpen])

  if (!isOpen) return null

  // Show error message if screen is too small
  if (isScreenTooSmall) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm p-6 animate-scale-in-bounce bg-[#1a1a1a] border-[#444444]">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Smartphone className="h-16 w-16 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Device Too Small
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Sorry! Your screen is too small to properly display the Tic Tac Toe game. Please try on a larger device or rotate your phone to landscape mode.
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-[#2d2d2d] text-white hover:bg-[#3d3d3d] border border-[#444444]"
            >
              Close
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 animate-scale-in-bounce bg-[#1a1a1a] border-[#444444]">

        <div className="text-center space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-4 text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>Tic Tac Toe</h1>

            {/* Game Status Display */}
            {winner ? (
              <div className="mb-4 p-3 bg-green-600/20 border border-green-500/50 rounded-lg">
                <p className="text-xl font-bold text-green-400 animate-pulse" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  🎉 {winner} wins!
                </p>
              </div>
            ) : isDraw ? (
              <div className="mb-4 p-3 bg-yellow-600/20 border border-yellow-500/50 rounded-lg">
                <p className="text-xl font-bold text-yellow-400" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  🤝 It's a tie!
                </p>
              </div>
            ) : (
              <p className="text-lg text-white mb-4" id="turn" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {currentPlayer}'s turn
              </p>
            )}
          </div>

          {/* Game Container - matching your original CSS */}
          <div className="mx-auto grid grid-cols-3 gap-[5px] w-[330px] h-[330px] rounded-[10px]">
            {boxes.map((box, index) => (
              <button
                key={index}
                className="text-[4em] text-center leading-none text-white h-[100px] w-[100px] rounded-[10px] border-2 border-[#444444] bg-[#2d2d2d] cursor-pointer transition-colors duration-200 hover:bg-[#3d3d3d]"
                onClick={() => makeMove(index)}
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  color: box === "X" ? "red" : box === "O" ? "blue" : "white"
                }}
              >
                {box}
              </button>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={resetGame}
              variant="outline"
              className="hover:scale-105 transition-transform bg-[#2d2d2d] border-[#444444] text-white hover:bg-[#3d3d3d]"
            >
              New Game
            </Button>
            <Button
              onClick={onClose}
              className="hover:scale-105 transition-transform bg-[#2d2d2d] text-white hover:bg-[#3d3d3d]"
            >
              Close
            </Button>
          </div>

          {!winner && !isDraw && (
            <div className="text-xs text-gray-400">
              Built with HTML, CSS & JavaScript
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}