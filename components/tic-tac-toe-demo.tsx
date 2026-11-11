"use client"

import { useState, useEffect } from "react"
import { Modal } from "@/components/modal"

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

  // Reset game when modal opens
  useEffect(() => {
    if (isOpen) {
      resetGame()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <Modal label="Tic Tac Toe" size="narrow" showClose={false} onClose={onClose}>
      <div className="ttt">
        <h2 className="ttt__title">Tic Tac Toe</h2>

        {/* Game Status Display */}
        {winner ? (
          <p className="ttt__status ttt__status--win" role="status">
            🎉 {winner} wins!
          </p>
        ) : isDraw ? (
          <p className="ttt__status ttt__status--draw" role="status">
            🤝 It's a tie!
          </p>
        ) : (
          <p className="ttt__status" id="turn" role="status">
            {currentPlayer}'s turn
          </p>
        )}

        {/* Board scales down with the screen, so it fits on small phones too */}
        <div className="ttt__board">
          {boxes.map((box, index) => (
            <button
              type="button"
              key={index}
              className="ttt__cell"
              data-mark={box || undefined}
              onClick={() => makeMove(index)}
              aria-label={box ? `Square ${index + 1}: ${box}` : `Square ${index + 1}: empty`}
            >
              {box}
            </button>
          ))}
        </div>

        <div className="ttt__actions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={resetGame}>
            New Game
          </button>
          <button type="button" className="btn btn--primary btn--sm" onClick={onClose}>
            Close
          </button>
        </div>

        {!winner && !isDraw && <p className="ttt__note">Built with HTML, CSS & JavaScript</p>}
      </div>
    </Modal>
  )
}
