// src/components/WizardIntro.tsx

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import wizardImg from "/assets/magicien.png"; // adapte le chemin

type WizardIntroProps = {
  onFinish: () => void;
};

const MESSAGES: string[] = [
  "Salutations, jeunes esprits du lycée Michael Gutnic…",
  "Je viens d’un monde où chaque humain contrôle son destin numérique. <br />Un monde idéal… où nul ne vend ses données à Marc Sucrenberg. Où aucune fuite ne met en péril la vie d’un élève. <br> Où vos gestes ne nourrissent pas d’immenses machines à profiler. <br> Où le doom-scroll n’existe pas. <br> Ce monde… vous en rêvez, n’est-ce pas ?",
  "Ce monde est <b>possible</b>.",
  "Et vous allez m’aider à le façonner ici même, dans votre établissement. Ce <s>Grand Remplacement Numérique</s>. Euh non, pardons je m’égare.<br /> Allons ! Explorons ce lycée… et ouvrons ensemble la voie du NIRD : Numérique Inclusif, Responsable et Durable.",
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

      const safe = safeHtmlTyping(fullText, index);
      setDisplayedText(safe);

      if (index >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [step]);

  const handleNext = () => {
    if (step < MESSAGES.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  function safeHtmlTyping(fullText: string, index: number): string {
    let sliced = fullText.slice(0, index);

    const lastOpen = sliced.lastIndexOf("<");
    const lastClose = sliced.lastIndexOf(">");

    if (lastOpen > lastClose) {
      sliced = sliced.slice(0, lastOpen);
    }

    return sliced;
  }

  const isLastStep = step === MESSAGES.length - 1;

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 1.5, sm: 2, md: 6 },
        py: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          minHeight: { xs: "auto", md: "70vh" },
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" }, // mobile : texte au-dessus
          alignItems: "center",
          justifyContent: "space-between",
          gap: { xs: 2, md: 4 },
        }}
      >
        {/* Panneau texte */}
        <Paper
          elevation={8}
          sx={{
            flex: { xs: "1 1 auto", md: "0 0 55%" },
            width: "100%",
            minHeight: { xs: 260, md: 320 },
            p: { xs: 2.5, md: 4 },
            backgroundColor: "#FDF5FF",

            // 🔥 Pour caler le bouton en bas :
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Zone texte */}
          <Typography
            variant="body1"
            sx={{
              color: "#7A5BB5",
              fontSize: { xs: "0.95rem", md: "1.05rem" },
              flexGrow: 1, // ← pousse le bouton vers le bas
            }}
            dangerouslySetInnerHTML={{
              __html: displayedText + (isTyping ? "<span>|</span>" : ""),
            }}
          />

          {/* Zone bouton (reste collée en bas) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
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
                fontSize: { xs: "0.85rem", md: "0.95rem" },
              }}
            >
              {isLastStep ? "Commencer ton aventure" : "Suivant"}
            </Button>
          </Box>
        </Paper>

        {/* Magicien */}
        <Box
          sx={{
            flex: { xs: "0 0 auto", md: "0 0 40%" },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "flex-end",
            mb: { xs: 1, md: 0 },
          }}
        >
          <Box
            component="img"
            src={wizardImg}
            alt="Magicien du numérique responsable"
            sx={{
              maxHeight: { xs: "35vh", sm: "45vh", md: "70vh" },
              width: "auto",
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.6))",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WizardIntro;
