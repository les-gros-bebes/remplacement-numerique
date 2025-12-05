import { useState } from "react";
import {
  getChoicesFromLocation,
  getDialogFromLocation,
} from "../utils/jsonContentLoader";
import { useNavigate } from "react-router";
import {nextDialogAudio, yesDialogAudio} from "../utils/soundPlayer.ts";
import { Button } from "@mui/material";

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

// 🔗 Transforme les URLs en <a>
function linkify(text: string): string {
  if (!text) return "";

  // Si jamais tu ajoutes toi-même du HTML, on ne double pas les liens
  if (text.includes("<a ")) return text;

  const urlRegex = /(https?:\/\/[^\s<]+)/g;

  return text.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

export default function Dialog({
  locationNumber,
  conversationIndex,
}: DialogProps) {
  const [dialogIndex, setDialogIndex] = useState(conversationIndex);
  const [dialog, setDialog] = useState<Conversation | null>(
    getDialogFromLocation(
      locationNumber,
      conversationIndex
    ) as Conversation | null
  );

  const [messageIndex, setMessageIndex] = useState(0);
  const [choices, setChoices] = useState<Choice[] | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const navigate = useNavigate();

  if (!dialog) {
    navigate("/");
    return null;
  }

  const messages = dialog.conversation;
  const current = messages[messageIndex];

  const handleNext = () => {
      nextDialogAudio.play();
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
    yesDialogAudio.play();
      setSelectedAnswer(choice.answer);
    setChoices(null);

    if (choice.isCorrect) {
      const score = parseInt(localStorage.getItem("score") || "0", 10);
      const newScore = score + 1;
      localStorage.setItem("score", String(newScore));
    }
  };

  const nextDialog = () => {
      console.log("Test");
      nextDialogAudio.play();
      const newIndex = dialogIndex + 1;
    const newDialog = getDialogFromLocation(
      locationNumber,
      newIndex
    ) as Conversation | null;
    setDialogIndex(newIndex);
    setDialog(newDialog);
    setMessageIndex(0);
    setChoices(null);
    setSelectedAnswer(null);
  };

  const currentHtml = linkify(current.message);
  const selectedHtml = selectedAnswer ? linkify(selectedAnswer) : "";

  return (
    <div style={{ padding: 20 }}>
      {/* Message principal avec HTML interprété */}
      <p>
        <strong>{current.person} :</strong>{" "}
        <span dangerouslySetInnerHTML={{ __html: currentHtml }} />
      </p>

      {/* Choix */}
      {choices && (
        <div style={{ marginTop: 10 }}>
          {choices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleChoiceClick(choice)}
              style={{ display: "block", margin: "5px 0" }}
            >
              {choice.label}
            </Button>
          ))}
        </div>
      )}

      {/* Réponse + next */}
      {selectedAnswer && (
        <div>
          <p style={{ marginTop: 10, fontStyle: "italic" }}>
            <strong>Mage : </strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: selectedHtml }} />
          </p>
          <Button onClick={nextDialog}>Suivant →</Button>
        </div>
      )}

      {/* Next sans choix */}
      {!choices && !selectedAnswer && (
        <Button onClick={handleNext}>Suivant →</Button>
      )}
    </div>
  );
}
