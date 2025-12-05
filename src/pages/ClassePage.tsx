import React from "react";
import { Box, Fade } from "@mui/material";
import RoomLayout from "../layout/RoomLayout";
import bgClasse from "/assets/salledecours.png";
import Dialog from "../components/Dialog";

// 🔁 Adapte le chemin vers l'image de la femme
const classeMentor = new URL("/assets/femmecdi.png", import.meta.url).href;

const ClassePage: React.FC = () => {
  return (
    <RoomLayout
      title="Salle de classe"
      subtitle="Découvre les usages responsables de la bureautique"
      backgroundImage={bgClasse}
    >
      {/* Container principal pour reproduire le style du gym */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Personnage femme à droite, qui dépasse un peu */}
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
              src={classeMentor}
              alt="Mentore numérique"
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

        {/* Bandeau blanc en bas comme le gym */}
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
            {/* Ton système de dialogue existant à l’intérieur du bandeau */}
            <Box sx={{ color: "#6B4AA5" }}>
              <Dialog locationNumber={2} conversationIndex={0} />
            </Box>
          </Box>
        </Box>
      </Box>
    </RoomLayout>
  );
};

export default ClassePage;
