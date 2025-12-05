import React, { useState } from "react";
import { Button, Fade, Stack, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { Answers } from "./FitCoach";
import DialogueBox from "./DialogueBox";

interface Question {
  id: number;
  question: string;
  options: { text: string; value: string }[];
}

interface QCMProps {
  questions: Question[];
  onComplete: (answers: Answers) => void;
  onBack: () => void;
}

const QCM: React.FC<QCMProps> = ({ questions, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onBack();
    }
  };

  return (
    <Fade in={true} key={currentQuestion.id} timeout={500}>
      <Box sx={{ height: "100%" }}>
        {" "}
        {/* Wrapper needed for Fade? Actually DialogueBox is a component. */}
        <DialogueBox text={currentQuestion.question}>
          <Stack spacing={1} sx={{ mt: 1 }}>
            {currentQuestion.options.map((option) => (
              <Button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  py: 1.5,
                  px: 3,
                  borderColor: "primary.main",
                  borderWidth: 2,
                  color: "text.primary",
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "primary.light",
                    borderColor: "primary.dark",
                    color: "white",
                  },
                }}
              >
                {option.text}
              </Button>
            ))}
          </Stack>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ mt: 2, color: "text.secondary" }}
            size="small"
          >
            Retour
          </Button>
        </DialogueBox>
      </Box>
    </Fade>
  );
};

export default QCM;
