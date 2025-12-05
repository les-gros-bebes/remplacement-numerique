import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@mui/material";

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState("RIGHT");
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const boardSize = 20;

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = [...newSnake[newSnake.length - 1]];

    switch (direction) {
      case "UP":
        head[1] -= 1;
        break;
      case "DOWN":
        head[1] += 1;
        break;
      case "LEFT":
        head[0] -= 1;
        break;
      case "RIGHT":
        head[0] += 1;
        break;
    }

    newSnake.push(head);

    if (head[0] === food[0] && head[1] === food[1]) {
      setScore(score + 1);
      setFood([
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ]);
    } else {
      newSnake.shift();
    }

    if (!isJumping) {
      const hitWall =
        head[0] < 0 ||
        head[1] < 0 ||
        head[0] >= boardSize ||
        head[1] >= boardSize;
      const hitSelf = newSnake
        .slice(0, -1)
        .some((segment) => segment[0] === head[0] && segment[1] === head[1]);

      if (hitWall || hitSelf) {
        setGameOver(true);
        return;
      }
    }

    setSnake(newSnake);
  }, [snake, direction, food, isJumping, gameOver, score]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameOver && e.key === " ") {
        // Réinitialise le jeu
        setSnake([[5, 5]]);
        setFood([10, 10]);
        setDirection("RIGHT");
        setIsJumping(false);
        setScore(0);
        setGameOver(false);
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        case " ":
          if (!gameOver) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 2000);
          }
          break;
      }
    },
    [gameOver, direction]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          color: "#333",
          fontSize: "2rem",
          fontFamily: "Autour One, sans-serif",
        }}
      >
        Snake Game
      </h1>
      <p
        style={{
          fontSize: "1.0rem",
          color: "#999",
          fontFamily: "Autour One, sans-serif",
        }}
      >
        Score: {score}
      </p>
      {gameOver && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: "1.2rem",
            fontFamily: "Autour One, sans-serif",
          }}
        >
          Game Over! Appuyez sur espace pour recommencer.
        </p>
      )}
      <Box
        sx={{
          width: "90vw",
          height: "90vw",
          maxWidth: "500px",
          maxHeight: "500px", // Taille maximale pour correspondre à la largeur
          display: "grid",
          border: "5px solid #333",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`, // Colonnes flexibles
          gridTemplateRows: `repeat(${boardSize}, 1fr)`, // Lignes flexibles
        }}
      >
        {Array.from({ length: boardSize }).map((_, row) =>
          Array.from({ length: boardSize }).map((_, col) => {
            const isSnake = snake.some(
              (segment) => segment[0] === col && segment[1] === row
            );
            const isHead =
              snake[snake.length - 1][0] === col &&
              snake[snake.length - 1][1] === row;
            const isFood = food[0] === col && food[1] === row;

            return (
              <Box
                key={`${row}-${col}`}
                sx={{
                  width: "100%", // Chaque cellule occupe 100% de la largeur de sa colonne
                  height: "100%", // Chaque cellule occupe 100% de la hauteur de sa ligne
                  backgroundColor: isHead
                    ? "#2e7d32" // Couleur plus foncée pour la tête
                    : isSnake
                    ? "#4caf50" // Couleur normale pour le corps
                    : isFood
                    ? "#ff5722" // Couleur pour la nourriture
                    : "#e0e0e0", // Couleur pour les cellules vides
                  border: "1px solid #ddd",
                  borderRadius: isSnake ? "5px" : isFood ? "50%" : "0",
                  boxShadow: isSnake
                    ? "0 0 5px #4caf50"
                    : isFood
                    ? "0 0 5px #ff5722"
                    : "none",
                }}
              ></Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default SnakeGame;
