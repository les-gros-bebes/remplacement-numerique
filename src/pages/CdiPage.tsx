import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgCdi from "/assets/cdi.png";
import Dialog from "../components/Dialog-ian";

const CdiPage: React.FC = () => {
  return (
    <RoomLayout
      title="CDI – Défis rétro"
      subtitle="Plonge dans l’histoire du numérique et ses enjeux"
      backgroundImage={bgCdi}
    >
      {/* Contenu spécifique pour les défis rétro */}
    </RoomLayout>
  );
};

export default CdiPage;
