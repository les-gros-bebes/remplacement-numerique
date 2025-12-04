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

    // Si on est au milieu d'une balise => on n'affiche pas la balise tant qu'elle n'est pas complète
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
          width: "140%",
          maxWidth: 1100,
          height: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Personnage à gauche, grand, sans box qui le coupe */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: "-18%", md: "-16%" }, // plus ou moins à gauche
            bottom: -180, // ancré en bas du viewport
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
              height: { xs: "80vh", md: "95vh" }, // le magicien contrôle la hauteur
              width: "auto",
              // si tu veux qu'il soit un peu coupé en bas :
              // tu peux soit augmenter sa hauteur, soit descendre un peu:
              // transform: "translateY(5%)",
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
            variant="body1"
            sx={{ minHeight: 80, color: "#7A5BB5" }}
            dangerouslySetInnerHTML={{
              __html: displayedText + (isTyping ? "<span>|</span>" : ""),
            }}
          />

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
              {isLastStep ? "Commencer ton aventure" : "Suivant"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default WizardIntro;
