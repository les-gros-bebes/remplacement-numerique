import { useEffect, useState } from "react";
import { getChoicesFromLocation, getDialogFromLocation } from "../utils/jsonContentLoader";

type Message = {
  person: string;
  message: string;
  triggerChoice: number
};

type Conversation = {
  id: number;
  conversation: Message[];
};

type DialogProps = {
  locationNumber: number;
  conversationIndex: number;
};

export default function Dialog({ locationNumber, conversationIndex }: DialogProps) {
  const [dialog, setDialog] = useState<Conversation | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const data = getDialogFromLocation(locationNumber, conversationIndex) as Conversation | null;

    if (data) {
      setDialog(data);
      setMessageIndex(0);
    }
  }, []);

  if (!dialog) return <p>Chargement…</p>;

  const messages = dialog.conversation;
  const current = messages[messageIndex];

  const handleNext = () => {
    if (current.triggerChoice >= 0) {
      console.log(getChoicesFromLocation(locationNumber, current.triggerChoice))
    }
    else if (messageIndex < messages.length - 1) {
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