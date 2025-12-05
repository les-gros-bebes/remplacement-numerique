import { useState } from "react";
import { getDialogFromLocation } from "../utils/jsonContentLoader";

type Message = {
  person: string;
  message: string;
};

type Conversation = {
  id: number;
  conversation: Message[];
};

export default function DialogTester() {
  const [dialog] = useState<Conversation | null>(
    () => getDialogFromLocation(2, 0) as Conversation | null
  );
  const [messageIndex, setMessageIndex] = useState(0);

  if (!dialog) return <p>Chargement…</p>;

  const messages = dialog.conversation;
  const current = messages[messageIndex];

  const handleNext = () => {
    if (messageIndex < messages.length - 1) {
      setMessageIndex(messageIndex + 1);
    } else {
      alert("Fin de la conversation !");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <p>
        <strong>{current.person} :</strong> {current.message}
      </p>
      <button onClick={handleNext}>Suivant →</button>
    </div>
  );
}
