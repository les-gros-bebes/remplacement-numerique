import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgClasse from "../assets/salledecours.png";

const ClassePage: React.FC = () => {
  return (
    <RoomLayout
      title="Salle LibreOffice"
      subtitle="Découvre les usages responsables de la bureautique"
      backgroundImage={bgClasse}
    >
      {/* Contenu spécifique de l’activité LibreOffice ici */}
    </RoomLayout>
  );
};

export default ClassePage;
