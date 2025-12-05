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

type Choice = {
  label: string,
  answer: string,
  isCorrect: boolean
}

type DialogProps = {
  locationNumber: number;
  conversationIndex: number;
};

export default function Dialog({
  locationNumber,
  conversationIndex,
}: DialogProps) {
  const [dialog] = useState<Conversation | null>(
    () =>
      getDialogFromLocation(
        locationNumber,
        conversationIndex
      ) as Conversation | null
  );
  const [messageIndex, setMessageIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[] | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const data = getDialogFromLocation(locationNumber, conversationIndex) as Conversation | null;

    if (data) {
      setDialog(data);
      setMessageIndex(0);
      setChoices(null);
      setSelectedAnswer(null);
    }
  }, [locationNumber, conversationIndex]);

  if (!dialog) return <p>Chargement…</p>;

  const messages = dialog.conversation;
  const current = messages[messageIndex];

  const handleNext = () => {
    if (current.triggerChoice >= 0) {
      const choiceData = getChoicesFromLocation(locationNumber, current.triggerChoice).choice;
      if (choiceData) {
        setChoices(choiceData);
        setSelectedAnswer(null);
      }
    } else if (messageIndex < messages.length - 1) {
      setMessageIndex(messageIndex + 1);
      setChoices(null);
      setSelectedAnswer(null);
    } else {
      alert("Fin de la conversation !");
    }
  };

  const handleChoiceClick = (choice: Choice) => {
    setSelectedAnswer(choice.answer);
    setChoices(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <p>
        <strong>{current.person} :</strong> {current.message}
      </p>

      {choices && (
        <div style={{ marginTop: 10 }}>
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoiceClick(choice)}
              style={{ display: "block", margin: "5px 0" }}
            >
              {choice.label}
            </button>
          ))}
        </div>
      )}

      {selectedAnswer && (
        <p style={{ marginTop: 10, fontStyle: "italic" }}><strong>Mage : </strong> {selectedAnswer}</p>
      )}

      {!choices && !selectedAnswer && (
        <button onClick={handleNext}>Suivant →</button>
      )}
    </div>
  );
}
