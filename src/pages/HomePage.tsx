// src/pages/HomePage.tsx

import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";
import lyceeMap from "/assets/planecole.png";
import WizardIntro from "../components/WizardIntro";

type Hotspot = {
  id: string;
  label: string;
  route: string;
  left: string;
  top: string;
  width: string;
  height: string;
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "class",
    label: "Salle LibreOffice",
    route: "/classe",
    left: "11.2%",
    top: "18.9%",
    width: "24.4%",
    height: "35.7%",
  },
  {
    id: "bureau",
    label: "Salle Accessibilité & CryptPad",
    route: "/bureau",
    left: "37.1%",
    top: "11.8%",
    width: "25.9%",
    height: "40.9%",
  },
  {
    id: "cdi",
    label: "CDI – Défis rétro",
    route: "/cdi",
    left: "65.4%",
    top: "5.3%",
    width: "20.3%",
    height: "40.4%",
  },
  {
    id: "gym",
    label: "Gymnase – Défi Décathlon",
    route: "/gymnase",
    left: "31.7%",
    top: "45.3%",
    width: "20.9%",
    height: "33.2%",
  },
  {
    id: "yard",
    label: "Préau – Bonnes actions",
    route: "/preau",
    left: "54.0%",
    top: "53.0%",
    width: "25.4%",
    height: "33.2%",
  },
  {
    id: "dev",
    label: "Dev – snake",
    route: "/dev",
    left: "5.0%",
    top: "5.0%",
    width: "15.0%",
    height: "15.0%",
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [introDone, setIntroDone] = useState(false);

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundImage: `url(${lyceeMap})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
          px: 3,
          py: 2,
          borderRadius: 3,
          backdropFilter: "blur(4px)",
          maxWidth: "90vw",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          color="white"
          sx={{ textShadow: "0px 0px 6px rgba(0,0,0,0.8)" }}
        >
          Lycée numérique responsable
        </Typography>

        <Typography
          variant="subtitle2"
          color="white"
          sx={{ mt: 1, textShadow: "0px 0px 4px rgba(0,0,0,0.7)" }}
        >
          Clique sur un bâtiment ou un espace pour lancer l’activité
        </Typography>
      </Box>

      {/* HOTSPOTS desktop – seulement après l’intro */}
      {introDone &&
        !isSmall &&
        HOTSPOTS.map((spot) => (
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

      {/* HOTSPOTS mobile – seulement après l’intro */}
      {introDone && isSmall && (
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            p: 2,
            pt: 3,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.0))",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
            }}
          >
            {HOTSPOTS.map((spot) => (
              <Box
                key={spot.id}
                onClick={() => navigate(spot.route)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 2,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  px: 1.5,
                  py: 1,
                  textAlign: "center",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.9)",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  color="white"
                  sx={{ fontWeight: 600 }}
                >
                  {spot.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* OVERLAY DU MAGICIEN – bloque tout tant que pas fini */}
      {!introDone && <WizardIntro onFinish={() => setIntroDone(true)} />}
    </Box>
  );
};

export default HomePage;
