// src/pages/BureauPage.tsx

import React from "react";
import { Box, Fade } from "@mui/material";
import RoomLayout from "../layout/RoomLayout";
import bgBureau from "/assets/bureau.png";
import Dialog from "../components/Dialog";

// 🔁 Adapte le chemin vers l'image du directeur / mentor bureau
const bureauMentor = new URL("/assets/directeur.png", import.meta.url).href;

const BureauPage: React.FC = () => {
  return (
    <RoomLayout
      title="Salle du Directeur"
      subtitle="Collabore en ligne tout en respectant l’accessibilité et la vie privée"
      backgroundImage={bgBureau}
    >
      {/* Container principal */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Personnage à droite qui dépasse un peu */}
        <Box
          sx={{
            position: "absolute",
            right: { xs: "-5%", md: "-2%" },
            bottom: "-5%",
            top: { xs: "auto", md: "-5%" },
            width: { xs: "45%", md: "40%" },
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <Fade in={true} timeout={800}>
            <img
              src={bureauMentor}
              alt="Directeur numérique"
              style={{
                height: "100%",
                width: "auto",
                objectFit: "contain",
                objectPosition: "bottom right",
                filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
              }}
            />
          </Fade>
        </Box>

        {/* Bandeau blanc en bas avec le dialogue */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: 8, md: "5%" },
            right: { xs: 8, md: "5%" },
            bottom: { xs: 8, md: 16 },
            zIndex: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.96)",
              borderRadius: 3,
              boxShadow: "0 6px 12px rgba(0,0,0,0.25)",
              p: { xs: 2, md: 3 },
              minHeight: { xs: 120, md: 150 },
            }}
          >
            <Box sx={{ color: "#6B4AA5" }}>
              {/* 🔁 Ajuste le locationNumber si besoin pour cette salle */}
              <Dialog locationNumber={5} conversationIndex={0} />
            </Box>
          </Box>
        </Box>
      </Box>
    </RoomLayout>
  );
};

export default BureauPage;
