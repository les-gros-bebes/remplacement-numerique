import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgClasse from "/assets/salledecours.png";
import Dialog from "../components/Dialog-ian";

const ClassePage: React.FC = () => {
  return (
    <RoomLayout
      title="Salle LibreOffice"
      subtitle="Découvre les usages responsables de la bureautique"
      backgroundImage={bgClasse}
    >
      {/* Contenu spécifique de l’activité LibreOffice ici */}
      <Dialog locationNumber={2} conversationIndex={0} />
    </RoomLayout>
  );
};

export default ClassePage;
