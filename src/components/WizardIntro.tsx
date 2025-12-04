import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import wizardImg from "/assets/magicien.png";

type WizardIntroProps = {
  onFinish: () => void;
};

const MESSAGES: string[] = [
  "Bonjour, jeune apprenti du numérique responsable !",
  "Aujourd’hui, tu vas explorer le lycée et découvrir comment utiliser le numérique de manière plus éthique, écologique et sécurisée.",
  "Clique ensuite sur les différents bâtiments pour relever des défis et gagner en expérience.",
  "Quand tu es prêt, je te laisse commencer ton aventure !",
];

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
    }, 25); // vitesse de "chargement" du texte

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
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-end",
          maxWidth: 900,
          width: "100%",
        }}
      >
        {/* Magicien */}
        <Box
          sx={{
            width: { xs: 120, sm: 160, md: 200 },
            flexShrink: 0,
          }}
        >
          <Box
            component="img"
            src={wizardImg}
            alt="Magicien du numérique responsable"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 0 10px rgba(0,0,0,0.7))",
            }}
          />
        </Box>

        {/* Bulle de dialogue */}
        <Paper
          elevation={6}
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 3,
            backgroundColor: "rgba(255,255,255,0.95)",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 700, mb: 1, color: "#555" }}
          >
            Magicien du Lycée numérique
          </Typography>

          <Typography variant="body1" sx={{ minHeight: 80, color: "#555" }}>
            {displayedText}
            {isTyping && <span>|</span>}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={isTyping}
            >
              {isLastStep ? "Commencer l’aventure" : "Suivant"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default WizardIntro;
