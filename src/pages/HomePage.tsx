// src/pages/HomePage.tsx

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import lyceeMap from "../assets/planecole.png"; // <- adapte le chemin

type HotspotId =
  | "class-libreoffice"
  | "class-accessibility"
  | "gym"
  | "yard"
  | "cdi";

interface Hotspot {
  id: HotspotId;
  label: string;
  route: string;
  // valeurs en pourcentage (par rapport à l'image 2048x1175)
  left: string;
  top: string;
  width: string;
  height: string;
}

// Coords calculées à partir de ton image (approx)
const HOTSPOTS: Hotspot[] = [
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
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Lycée numérique responsable
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Clique sur un espace du lycée pour découvrir un atelier ou un défi
            autour du numérique responsable.
          </Typography>
        </Box>

        {/* Conteneur de la carte */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 1200,
            mx: "auto",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 4,
            backgroundImage: `url(${lyceeMap})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // garde les proportions de l'image d'origine (2048x1175)
            aspectRatio: "2048 / 1175",
          }}
        >
          {/* Overlays cliquables */}
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
                // Overlay semi-transparent pour debug / UX
                bgcolor: "rgba(0, 0, 0, 0.0)",
                "&:hover": {
                  bgcolor: "rgba(0, 0, 0, 0.18)",
                  boxShadow: 6,
                },
                transition: "background-color 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              {/* Petit label dans le coin en bas à gauche */}
              <Box
                sx={{
                  position: "absolute",
                  left: 8,
                  bottom: 8,
                  px: 1,
                  py: 0.5,
                  borderRadius: 999,
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                }}
              >
                <Typography variant="caption" color="common.white">
                  {spot.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            Les zones sombres au survol sont temporaires pour visualiser les
            zones cliquables – tu pourras les rendre totalement invisibles une
            fois le design final validé.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
