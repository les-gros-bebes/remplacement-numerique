import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

type RoomLayoutProps = {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  children?: React.ReactNode;
};

const RoomLayout: React.FC<RoomLayoutProps> = ({
  title,
  subtitle,
  backgroundImage,
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "absolute",
        overflow: "hidden",
        inset: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay légère pour lisibilité */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
        }}
      />

      {/* Contenu principal */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              color="white"
              sx={{ textShadow: "0 0 6px rgba(0,0,0,0.8)" }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography
                variant="subtitle1"
                color="white"
                sx={{ mt: 1, textShadow: "0 0 4px rgba(0,0,0,0.7)" }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            Retour au plan
          </Button>
        </Box>

        {/* Zone centrale pour l’activité */}
        <Box
          sx={{
            overflow: "auto",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 3,
              p: 1,
              maxWidth: 800,
              width: "100%",
              height: "80vh",
              minHeight: "600px",
            }}
          >
            {children ?? (
              <Typography color="white">
                Ici tu pourras mettre le contenu de l’activité de cette salle.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RoomLayout;
