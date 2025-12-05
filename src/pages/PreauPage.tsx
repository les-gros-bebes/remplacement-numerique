import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgPreau from "/assets/coursexterieur.png";

const PreauPage: React.FC = () => {
  return (
    <RoomLayout
      title="Préau – Moment détente"
      subtitle="Fait une pause dans ton initiation"
      backgroundImage={bgPreau}
    >
      {/* Contenu spécifique des bonnes actions */}
    </RoomLayout>
  );
};

export default PreauPage;
