import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Box, Button, CssBaseline, Fade } from "@mui/material";
import theme from "../../theme";
import fitCoachData from "../../data/fit_coach_data.json";
import coachDialogues from "../../data/coach_dialogues.json";
import QCM from "./QCM";
import ProfileResult from "./ProfileResult";
import WorkoutSession from "./WorkoutSession";
import DialogueBox from "./DialogueBox";

// Assets
const gymBg = new URL("../../assets/fitcoach/gym_bg_rpg.png", import.meta.url)
  .href;
const mrSchutz = new URL("../../assets/fitcoach/mr_schutz.png", import.meta.url)
  .href;

export type Answers = Record<number, string>;

const FitCoach: React.FC = () => {
  const [step, setStep] = useState<
    "intro" | "qcm" | "result" | "workout" | "congrats"
  >("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [workoutPlan, setWorkoutPlan] = useState<any[]>([]);
  const [congratsMessage, setCongratsMessage] = useState("");

  const handleStart = () => {
    setStep("qcm");
  };

  const handleQcmComplete = (userAnswers: Answers) => {
    setAnswers(userAnswers);
    setStep("result");
  };

  const handleReset = () => {
    setAnswers({});
    setStep("intro");
  };

  const handleStartWorkout = (plan: any[]) => {
    setWorkoutPlan(plan);
    setStep("workout");
  };

  const handleWorkoutComplete = () => {
    const goal = answers[1] || "default";
    // @ts-ignore
    const messages =
      coachDialogues.congrats[goal as keyof typeof coachDialogues.congrats] ||
      coachDialogues.congrats.default;
    const msg = messages[Math.floor(Math.random() * messages.length)];
    setCongratsMessage(msg);
    setStep("congrats");
  };

  const handleExitGym = () => {
    window.location.href = "/home";
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        {step === "workout" ? (
          <WorkoutSession
            plan={workoutPlan}
            onComplete={handleWorkoutComplete}
            onExit={() => setStep("result")}
          />
        ) : (
          <>
            {/* Background Layer */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${gymBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: 2,
                overflow: "hidden",
                zIndex: 0,
              }}
            />

            {/* Character Display - Pops out of container */}
            <Box
              sx={{
                position: "absolute",
                right: { xs: "-10%", md: "-5%" },
                bottom: "-5%",
                top: "-5%",
                width: { xs: "30%", md: "50%" },
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              <Fade in={true} timeout={1000}>
                <img
                  src={mrSchutz}
                  alt="Mr. Schutz"
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                    objectPosition: "bottom right",
                    filter: "drop-shadow(0 0 10px rgba(0,0,0,0.5))",
                  }}
                />
              </Fade>
            </Box>

            {/* Content Area - Overlay */}
            <Container
              maxWidth="lg"
              sx={{
                position: "relative",
                zIndex: 2,
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                pb: 4,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: "auto", md: "50%" },
                }}
              >
                {step === "congrats" && (
                  <DialogueBox text={congratsMessage}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleExitGym}
                      fullWidth
                    >
                      Quitter le gymnase
                    </Button>
                  </DialogueBox>
                )}

                {step === "intro" && (
                  <DialogueBox text="Bonjour ! Je suis Mr. Schutz, ton nouveau coach. Je vais te préparer un programme aux petits oignons. Prêt à suer ?">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={handleStart}
                      fullWidth
                    >
                      C'est parti !
                    </Button>
                  </DialogueBox>
                )}

                {step === "qcm" && (
                  <QCM
                    questions={fitCoachData.qcm}
                    onComplete={handleQcmComplete}
                    onBack={() => setStep("intro")}
                  />
                )}

                {step === "result" && (
                  <ProfileResult
                    answers={answers}
                    data={fitCoachData}
                    onReset={handleReset}
                    onStartWorkout={handleStartWorkout}
                  />
                )}
              </Box>
            </Container>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default FitCoach;
