import React from "react";
import RoomLayout from "../layout/RoomLayout";
import bgBureau from "/assets/bureau.png";
import SnakeGame from "../components/snake";

const DevPage: React.FC = () => {
  return (
    <RoomLayout
      title="Salle Accessibilité & CryptPad"
      subtitle="Collabore en ligne tout en respectant l’accessibilité et la vie privée"
      backgroundImage={bgBureau}
    >
      <SnakeGame />
      {/* Contenu spécifique de l’activité Accessibilité/CryptPad */}
    </RoomLayout>
  );
};

export default DevPage;
