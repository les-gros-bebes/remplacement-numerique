import React, { useState } from "react";
import RoomLayout from "../layout/RoomLayout";
import bgPreau from "/assets/coursexterieur.png";
import SnakeGame from "../components/snake";
import snakeImage from "/assets/snake.png";
import { Box, Modal } from "@mui/material";

const PreauPage: React.FC = () => {
  const getRandomCornerPosition = () => {
    const corners = [
      { top: "10%", left: "10%" },
      { top: "10%", left: "90%" },
      { top: "90%", left: "10%" },
      { top: "90%", left: "90%" },
    ];
    return corners[Math.floor(Math.random() * corners.length)];
  };

  const [isSnakeGameOpen, setIsSnakeGameOpen] = useState(false);
  const [snakePosition, setSnakePosition] = useState(getRandomCornerPosition());
  const [moveCount, setMoveCount] = useState(0);

  const moveSnake = () => {
    if (moveCount >= 3) return;

    const randomTop = Math.random() * 80 + 10;
    const randomLeft = Math.random() * 80 + 10;
    setSnakePosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    setMoveCount((prev) => prev + 1);
  };

  const handleSnakeClick = () => {
    setIsSnakeGameOpen(true);
  };

  const handleCloseSnakeGame = () => {
    setIsSnakeGameOpen(false);
  };

  return (
    <RoomLayout
      title="Préau – Bonnes actions"
      subtitle="Liste et mets en pratique les bons réflexes numériques"
      backgroundImage={bgPreau}
    >
      {/* Conteneur principal */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          border: "5px solid #333",
          borderRadius: "10px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      ></Box>

      {/* Image du serpent qui bouge */}
      <Box
        component="img"
        src={snakeImage}
        alt="Snake"
        sx={{
          position: "absolute",
          top: snakePosition.top,
          left: snakePosition.left,
          width: "50px",
          height: "50px",
          cursor: "pointer",
          transition: "top 0.5s, left 0.5s",
        }}
        onClick={handleSnakeClick}
        onMouseEnter={moveSnake}
      />

      {/* Modal pour afficher le jeu Snake */}
      <Modal
        open={isSnakeGameOpen}
        onClose={handleCloseSnakeGame}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90vw",
            height: "90vh",
            maxWidth: "600px",
            maxHeight: "800px",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: 24,
            p: 2,
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SnakeGame />
          </Box>
        </Box>
      </Modal>
    </RoomLayout>
  );
};

export default PreauPage;
