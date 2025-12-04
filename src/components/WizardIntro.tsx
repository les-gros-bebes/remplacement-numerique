// src/components/WizardIntro.tsx

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import wizardImg from "/assets/magicien.png"; // adapte le chemin

type WizardIntroProps = {
  onFinish: () => void;
};

const MESSAGES: string[] = [""];

const WizardIntro: React.FC<WizardIntroProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullText = MESSAGES[step];
    setDisplayedText("");
    setIsTyping(true);

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [step]);

  const handleNext = () => {
    if (step < MESSAGES.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const isLastStep = step === MESSAGES.length - 1;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.35)", // léger voile
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 6 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          height: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Personnage à gauche, un peu coupé en bas */}
        {/* Personnage à gauche, très grand et tronqué */}
        <Box
          sx={{
            position: "absolute",
            left: "-6%", // 👈 pousse plus à gauche
            bottom: "-50px", // 👈 coupe encore plus le bas
            height: "80vh", // hauteur visible (fenêtre de découpe)
            width: { xs: "45%", md: "38%" }, // zone large pour que le perso occupe bien la gauche
            overflow: "hidden", // coupe proprement
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <Box
            component="img"
            src={wizardImg}
            alt="Magicien du numérique responsable"
            sx={{
              height: "150%", // 👈 plus grand (augmente si tu veux)
              width: "auto",
              transform: "translateY(12%) translateX(-8%)",
              // Y = pousse vers le bas → tranche plus
              // X = pousse légèrement vers la gauche pour compenser le centrage
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.6))",
            }}
          />
        </Box>

        {/* Bandereau / panneau à droite */}
        <Paper
          elevation={8}
          sx={{
            ml: { xs: 10, md: "30%" },
            width: { xs: "70%", md: "60%" },
            minHeight: { xs: 220, md: 280 },
            p: { xs: 2.5, md: 4 },
            backgroundColor: "#FDF5FF", // fond crème rosé
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#6B4AA5",
            }}
          >
            Remplacement numérique
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              mb: 2,
              color: "#7A5BB5",
            }}
          >
            Comment un établissement scolaire peut réduire ses dépendances
            numériques ?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              minHeight: 80,
              color: "#4A3B6D",
            }}
          >
            {displayedText}
            {isTyping && <span>|</span>}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isTyping}
              sx={{
                textTransform: "none",
                px: 3,
                backgroundColor: "#6B4AA5",
                "&:hover": {
                  backgroundColor: "#584092",
                },
              }}
            >
              {isLastStep ? "Sélectionner ton parcours" : "Suivant"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default WizardIntro;
