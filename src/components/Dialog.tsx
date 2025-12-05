import { useState } from "react";
import {
  getChoicesFromLocation,
  getDialogFromLocation,
} from "../utils/jsonContentLoader";
import { useNavigate } from "react-router";

type Message = {
  person: string;
  message: string;
  triggerChoice: number;
};

type Conversation = {
  id: number;
  conversation: Message[];
};

type Choice = {
  label: string;
  answer: string;
  isCorrect: boolean;
};

type DialogProps = {
  locationNumber: number;
  conversationIndex: number;
};

export default function Dialog({ locationNumber, conversationIndex }: DialogProps) {
  const [dialogIndex, setDialogIndex] = useState(conversationIndex);
  const [dialog, setDialog] = useState<Conversation | null>(
    getDialogFromLocation(locationNumber, conversationIndex) as Conversation | null
  );

  const [messageIndex, setMessageIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[] | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const navigate = useNavigate();

  if (!dialog) {navigate("/"); return}

  const messages = dialog.conversation;
  const current = messages[messageIndex];

  const handleNext = () => {
    if (current.triggerChoice >= 0) {
      const choiceData = getChoicesFromLocation(
        locationNumber,
        current.triggerChoice
      ).choice;

      if (choiceData) {
        setChoices(choiceData);
        setSelectedAnswer(null);
      }
    } else if (messageIndex < messages.length - 1) {
      setMessageIndex((prev) => prev + 1);
      setChoices(null);
      setSelectedAnswer(null);
    } else {
      navigate("/");
    }
  };

  const handleChoiceClick = (choice: Choice) => {
    setSelectedAnswer(choice.answer);
    setChoices(null);
  };

  const nextDialog = () => {
    const newIndex = dialogIndex + 1;
    const newDialog = getDialogFromLocation(locationNumber, newIndex) as Conversation | null;

    setDialogIndex(newIndex);
    setDialog(newDialog);   // 🔥 ceci force le re-render et met à jour le dialogue
    setMessageIndex(0);
    setChoices(null);
    setSelectedAnswer(null);
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
        <div>
          <p style={{ marginTop: 10, fontStyle: "italic" }}>
            <strong>Mage : </strong> {selectedAnswer}
          </p>
          <button onClick={nextDialog}>Suivant →</button>
        </div>
      )}

      {!choices && !selectedAnswer && (
        <button onClick={handleNext}>Suivant →</button>
      )}
    </div>
  );
}