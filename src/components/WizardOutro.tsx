// src/components/WizardOutro.tsx

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import wizardImg from "/assets/magicien.png";
import {playMageVoice} from "../utils/soundPlayer.ts"; // tu peux changer si tu as une autre illustration de fin

type WizardOutroProps = {
  onFinish: () => void;
};

const MESSAGES: string[] = [
  "Bravo, tu as tant appris ! Tu sais maintenant reconnaître les outils qui respectent leurs utilisateurs, sécuriser tes données, choisir des technologies libres, et reprendre le contrôle de ta vie numérique. Mon heure est venue, à présent, c’est à toi de tracer ton propre chemin dans ce monde connecté…",
  "Mais tu ne seras jamais vraiment seul.. Tu pourras compter sur les sages de Framasoft et Framalibre, pionniers du numérique émancipateur, et au Comptoir du Libre, un véritable marché du savoir où tu trouveras des alternatives libres pour presque tous les usages. Enfin, n’oublie jamais les érudits du NIRD, dont l’objectif est de bâtir un numérique inclusif, responsable et durable. Ils t’aideront à poursuivre ta quête et à guider d’autres esprits vers un usage plus libre et conscient de la technologie.",
];

const WizardOutro: React.FC<WizardOutroProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullText = MESSAGES[step];
    setDisplayedText("");
    setIsTyping(true);

    let index = 0;
    const interval = setInterval(() => {
        playMageVoice();
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
      {/* Bouton Skip / Fermer en haut à droite */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 8, sm: 16 },
          right: { xs: 8, sm: 16 },
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button
          onClick={onFinish}
          size="small"
          sx={{
            textTransform: "none",
            fontSize: { xs: "0.75rem", sm: "0.85rem" },
            color: "#ffffff",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.6)",
            },
            borderRadius: 999,
            px: 2,
          }}
        >
          Passer la conclusion
        </Button>

        <IconButton
          onClick={onFinish}
          size="small"
          sx={{
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
            color: "#ffffff",
          }}
          aria-label="Fermer la conclusion"
        >
          {/* Tu peux mettre une icône Close ici si tu veux */}
        </IconButton>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          minHeight: { xs: "auto", md: "70vh" },
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
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
              flexGrow: 1,
            }}
            dangerouslySetInnerHTML={{
              __html: displayedText + (isTyping ? "<span>|</span>" : ""),
            }}
          />

          {/* Zone bouton */}
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
              {isLastStep ? "Retour au lycée" : "Suivant"}
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

export default WizardOutro;
