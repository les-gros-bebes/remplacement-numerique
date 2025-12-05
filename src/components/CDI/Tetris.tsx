import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";

// Tetris Constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const TICK_RATE = 500; // ms

// Tetromino definitions
const TETROMINOS = {
  I: { shape: [[1, 1, 1, 1]], color: "#00FFFF" },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#0000FF",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#FFA500",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#FFFF00",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#00FF00",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#800080",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#FF0000",
  },
};

const RANDOM_TETROMINO = () => {
  const keys = Object.keys(TETROMINOS);
  const randKey = keys[
    Math.floor(Math.random() * keys.length)
  ] as keyof typeof TETROMINOS;
  return TETROMINOS[randKey];
};

const Tetris: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [board, setBoard] = useState(
    Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    color: string;
    x: number;
    y: number;
  } | null>(null);
  const [score, setScore] = useState(0);
  // Removed unused state: gameOver, isPaused
  const gameOver = false;
  const isPaused = false;

  const spawnPiece = useCallback(() => {
    const piece = RANDOM_TETROMINO();
    setCurrentPiece({
      shape: piece.shape,
      color: piece.color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2),
      y: 0,
    });
  }, []);

  // Initialize game
  useEffect(() => {
    spawnPiece();
  }, [spawnPiece]);

  const checkCollision = useCallback(
    (
      piece: { shape: number[][]; x: number; y: number },
      moveX: number,
      moveY: number
    ) => {
      for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
          if (piece.shape[y][x] !== 0) {
            const newX = piece.x + x + moveX;
            const newY = piece.y + y + moveY;

            if (
              newX < 0 ||
              newX >= BOARD_WIDTH ||
              newY >= BOARD_HEIGHT ||
              (newY >= 0 && board[newY][newX] !== 0)
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [board]
  );

  const mergePiece = useCallback(() => {
    if (!currentPiece) return;
    const newBoard = [...board];
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x] !== 0) {
          if (currentPiece.y + y >= 0) {
            newBoard[currentPiece.y + y][currentPiece.x + x] =
              currentPiece.color;
          }
        }
      }
    }
    setBoard(newBoard);
    clearLines(newBoard);
    spawnPiece();

    // Check for immediate collision after spawn (Game Over)
    // Simplified: if spawn collision, game over logic would go here
  }, [currentPiece, board, spawnPiece]);

  //eslint-disable-next-line
  const clearLines = (currentBoard: any[]) => {
    let linesCleared = 0;
    const newBoard = currentBoard.filter((row) => {
      //eslint-disable-next-line
      if (row.every((cell: any) => cell !== 0)) {
        linesCleared++;
        return false;
      }
      return true;
    });

    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }

    if (linesCleared > 0) {
      setScore((prev) => prev + linesCleared * 100);
      setBoard(newBoard);
    }
  };

  const move = useCallback(
    (dirX: number, dirY: number) => {
      if (!currentPiece || gameOver || isPaused) return;

      if (!checkCollision(currentPiece, dirX, dirY)) {
        setCurrentPiece((prev) =>
          prev ? { ...prev, x: prev.x + dirX, y: prev.y + dirY } : null
        );
      } else if (dirY > 0) {
        // Hit bottom or another piece
        mergePiece();
      }
    },
    [currentPiece, gameOver, isPaused, checkCollision, mergePiece]
  );

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    const rotatedShape = currentPiece.shape[0].map((_, index) =>
      currentPiece.shape.map((row) => row[index]).reverse()
    );

    const rotatedPiece = { ...currentPiece, shape: rotatedShape };
    if (!checkCollision(rotatedPiece, 0, 0)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, gameOver, isPaused, checkCollision]);

  // Game Loop
  useEffect(() => {
    if (gameOver || isPaused) return;
    const interval = setInterval(() => {
      move(0, 1);
    }, TICK_RATE);
    return () => clearInterval(interval);
  }, [move, gameOver, isPaused]);

  // Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      switch (e.key) {
        case "ArrowLeft":
          move(-1, 0);
          break;
        case "ArrowRight":
          move(1, 0);
          break;
        case "ArrowDown":
          move(0, 1);
          break;
        case "ArrowUp":
          rotate();
          break;
        case "Escape":
          onClose();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move, rotate, gameOver, onClose]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0,0,0,0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        color: "#00FF00",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, textShadow: "0 0 5px #00FF00" }}>
        TETRIS
      </Typography>

      <Box sx={{ display: "flex", gap: 4 }}>
        <Box
          sx={{
            border: "2px solid #00FF00",
            bgcolor: "black",
            display: "grid",
            gridTemplateRows: `repeat(${BOARD_HEIGHT}, 20px)`,
            gridTemplateColumns: `repeat(${BOARD_WIDTH}, 20px)`,
          }}
        >
          {board.map((row, y) =>
            row.map((cell, x) => {
              let cellColor = cell;
              // Render current piece
              if (
                currentPiece &&
                x >= currentPiece.x &&
                x < currentPiece.x + currentPiece.shape[0].length &&
                y >= currentPiece.y &&
                y < currentPiece.y + currentPiece.shape.length &&
                currentPiece.shape[y - currentPiece.y][x - currentPiece.x] !== 0
              ) {
                cellColor = currentPiece.color;
              }

              return (
                <Box
                  key={`${x}-${y}`}
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: cellColor || "transparent",
                    border: cellColor
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "none",
                    boxSizing: "border-box",
                  }}
                />
              );
            })
          )}
        </Box>

        <Box>
          <Typography>Score: {score}</Typography>
          <Typography sx={{ mt: 2 }}>Controls:</Typography>
          <Typography variant="caption">Arrows to move/rotate</Typography>
          <Typography variant="caption" display="block">
            ESC to Exit
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 4, color: "#00FF00", borderColor: "#00FF00" }}
            onClick={onClose}
          >
            EXIT
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Tetris;
