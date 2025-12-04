import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgGym from "../assets/salledesport.png";

const GymnasePage: React.FC = () => {
  return (
    <RoomLayout
      title="Gymnase – Défi Décathlon"
      subtitle="Bouge, calcule et compare l’impact du numérique"
      backgroundImage={bgGym}
    >
      {/* Contenu spécifique du défi Décathlon */}
    </RoomLayout>
  );
};

export default GymnasePage;
