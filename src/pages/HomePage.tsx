// src/pages/HomePage.tsx

import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import lyceeMap from "../assets/planecole.png";

const HOTSPOTS = [
  {
    id: "class-libreoffice",
    label: "Salle LibreOffice",
    route: "/classe-libreoffice",
    left: "11.2%",
    top: "28.9%",
    width: "24.4%",
    height: "35.7%",
  },
  {
    id: "class-accessibility",
    label: "Salle Accessibilité & CryptPad",
    route: "/classe-accessibilite",
    left: "37.1%",
    top: "23.8%",
    width: "25.9%",
    height: "40.9%",
  },
  {
    id: "cdi",
    label: "CDI – Défis rétro",
    route: "/cdi",
    left: "65.4%",
    top: "21.3%",
    width: "27.3%",
    height: "43.4%",
  },
  {
    id: "gym",
    label: "Gymnase – Défi Décathlon",
    route: "/gymnase",
    left: "31.7%",
    top: "55.3%",
    width: "26.9%",
    height: "33.2%",
  },
  {
    id: "yard",
    label: "Préau – Bonnes actions",
    route: "/preau",
    left: "64.0%",
    top: "63.0%",
    width: "25.4%",
    height: "33.2%",
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${lyceeMap})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* TEXTES SUPERPOSÉS */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
          px: 3,
          py: 2,
          borderRadius: 3,
          backdropFilter: "blur(4px)",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          color="white"
          sx={{ textShadow: "0px 0px 6px rgba(0,0,0,0.8)" }}
        >
          Lycée numérique responsable
        </Typography>

        <Typography
          variant="subtitle1"
          color="white"
          sx={{ mt: 1, textShadow: "0px 0px 4px rgba(0,0,0,0.7)" }}
        >
          Clique sur un bâtiment ou un espace pour lancer l’activité
        </Typography>
      </Box>

      {/* HOTSPOTS CLIQUABLES */}
      {HOTSPOTS.map((spot) => (
        <Box
          key={spot.id}
          onClick={() => navigate(spot.route)}
          sx={{
            position: "absolute",
            left: spot.left,
            top: spot.top,
            width: spot.width,
            height: spot.height,
            cursor: "pointer",
            transition: "0.2s ease",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.2)",
              boxShadow: "0 0 10px rgba(0,0,0,0.4)",
            },
          }}
        >
          {/* LABELS OPTIONNELS */}
          <Box
            sx={{
              position: "absolute",
              left: 6,
              bottom: 6,
              backgroundColor: "rgba(0,0,0,0.6)",
              px: 1,
              py: 0.3,
              borderRadius: 1,
            }}
          >
            <Typography variant="caption" color="white">
              {spot.label}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default HomePage;
