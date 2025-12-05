import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgCdi from "/assets/cdi.png";
import Dialog from "../components/Dialog";

const CdiPage: React.FC = () => {
  return (
    <RoomLayout
      title="CDI – Défis rétro"
      subtitle="Plonge dans l’histoire du numérique et ses enjeux"
      backgroundImage={bgCdi}
    >
      {/* Contenu spécifique pour les défis rétro */}*
      <Dialog locationNumber={4} conversationIndex={0} />
    </RoomLayout>
  );
};

export default CdiPage;
