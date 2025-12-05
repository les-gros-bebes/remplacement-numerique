import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgCdi from "/assets/cdi.png";
import { Box } from "@mui/material";
import Dialog from "../components/Dialog";

const CdiPage: React.FC = () => {
  return (
    <RoomLayout
      title="CDI – Défis rétro"
      subtitle="Plonge dans l’histoire du numérique et ses enjeux"
      backgroundImage={bgCdi}
    >
      {/* Contenu spécifique pour les défis rétro */}
      <Box sx={{ color: "#6B4AA5" }}>
        <Dialog locationNumber={2} conversationIndex={0} />
      </Box>
    </RoomLayout>
  );
};

export default CdiPage;
