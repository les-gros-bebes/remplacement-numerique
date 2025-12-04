import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgBureau from "../assets/bureau.png";

const BureauPage: React.FC = () => {
  return (
    <RoomLayout
      title="Salle Accessibilité & CryptPad"
      subtitle="Collabore en ligne tout en respectant l’accessibilité et la vie privée"
      backgroundImage={bgBureau}
    >
      {/* Contenu spécifique de l’activité Accessibilité/CryptPad */}
    </RoomLayout>
  );
};

export default BureauPage;
