import React, { useState } from "react";
import RoomLayout from "../layout/RoomLayout";
import bgPreau from "/assets/coursexterieur.png";
import SnakeGame from "../components/snake";
import snakeImage from "/assets/snake.png";
import { Box, Modal } from "@mui/material";

const PreauPage: React.FC = () => {
  // Fonction pour générer une position aléatoire dans un des coins
  const getRandomCornerPosition = () => {
    const corners = [
      { top: "10%", left: "10%" }, // Coin supérieur gauche
      { top: "10%", left: "90%" }, // Coin supérieur droit
      { top: "90%", left: "10%" }, // Coin inférieur gauche
      { top: "90%", left: "90%" }, // Coin inférieur droit
    ];
    return corners[Math.floor(Math.random() * corners.length)];
  };

  const [isSnakeGameOpen, setIsSnakeGameOpen] = useState(false);
  const [snakePosition, setSnakePosition] = useState(getRandomCornerPosition); // Initialisation directe avec une position aléatoire
  const [moveCount, setMoveCount] = useState(0); // Compteur de mouvements

  // Fonction pour déplacer le serpent aléatoirement
  const moveSnake = () => {
    if (moveCount >= 3) return;

    const randomTop = Math.random() * 80 + 10; // Entre 10% et 90% de la hauteur
    const randomLeft = Math.random() * 80 + 10; // Entre 10% et 90% de la largeur
    setSnakePosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
    setMoveCount((prev) => prev + 1); // Incrémente le compteur
  };

  // Ouvre le jeu Snake
  const handleSnakeClick = () => {
    setIsSnakeGameOpen(true);
  };

  // Ferme le jeu Snake
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
      >
        {/* Image du serpent qui bouge */}
        {snakePosition && ( // Affiche le serpent uniquement après avoir défini sa position
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
              transition: "top 0.5s, left 0.5s", // Animation fluide
            }}
            onClick={handleSnakeClick}
            onMouseEnter={moveSnake} // Déplace le serpent lorsqu'on passe la souris dessus
          />
        )}

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
      </Box>
    </RoomLayout>
  );
};

export default PreauPage;
