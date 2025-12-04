import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgPreau from "../assets/coursexterieur.png";

const PreauPage: React.FC = () => {
  return (
    <RoomLayout
      title="Préau – Bonnes actions"
      subtitle="Liste et mets en pratique les bons réflexes numériques"
      backgroundImage={bgPreau}
    >
      {/* Contenu spécifique des bonnes actions */}
    </RoomLayout>
  );
};

export default PreauPage;
