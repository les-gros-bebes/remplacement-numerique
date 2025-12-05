import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgCdi from "/assets/cdi-retro.jpg";

import AS400Terminal from "../components/CDI/AS400Terminal";

const CdiPage: React.FC = () => {
  return (
    <RoomLayout
      title="CDI – Défis rétro"
      subtitle="Plonge dans l’histoire du numérique et ses enjeux"
      backgroundImage={bgCdi}
    >
      {/* Contenu spécifique pour les défis rétro */}
      <AS400Terminal />
    </RoomLayout>
  );
};

export default CdiPage;
