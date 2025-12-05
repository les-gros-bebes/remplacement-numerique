import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

export interface Instruction {
  execution: string;
  breathing: string;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  media: string;
  instructions: Instruction;
  sets: number;
  reps: string; // "10 reps" or "30s"
  restTime: number; // in seconds
}

interface WorkoutSessionProps {
  plan: WorkoutExercise[];
  onComplete: () => void;
  onExit: () => void;
}

const WorkoutSession: React.FC<WorkoutSessionProps> = ({
  plan,
  onComplete,
  onExit,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<"work" | "rest">("work");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const currentExercise = plan[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === plan.length - 1;
  const isLastSet = currentSet === currentExercise.sets;

  const handleTimerComplete = React.useCallback(() => {
    if (phase === "rest") {
      // End of rest -> Start next set or exercise
      setPhase("work");
      // If we were resting after the last set of previous exercise, we are already at the new exercise index/set logic
      // Actually, rest happens AFTER a set.
      // So if rest ends, we start the NEXT set.
    }
  }, [phase]);

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setTimeout(() => {
        handleTimerComplete();
      }, 0);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, handleTimerComplete]);

  const handleSetComplete = () => {
    if (isLastSet) {
      if (isLastExercise) {
        onComplete();
      } else {
        // Move to next exercise
        setCurrentExerciseIndex((prev) => prev + 1);
        setCurrentSet(1);
        startRest(currentExercise.restTime);
      }
    } else {
      // Move to next set
      setCurrentSet((prev) => prev + 1);
      startRest(currentExercise.restTime);
    }
  };

  const startRest = (duration: number) => {
    setPhase("rest");
    setTimeLeft(duration);
    setIsTimerRunning(true);
  };

  const skipRest = () => {
    setTimeLeft(0);
    setIsTimerRunning(false);
    setPhase("work");
  };

  const isVideo = (url: string) =>
    url.endsWith(".webm") || url.endsWith(".mp4");

  // Progress calculation
  const totalSets = plan.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSets =
    plan.slice(0, currentExerciseIndex).reduce((acc, ex) => acc + ex.sets, 0) +
    (currentSet - 1);
  const progress = (completedSets / totalSets) * 100;

  if (phase === "rest") {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "primary.main",
          color: "white",
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={onExit} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            REPOS
          </Typography>
          <Box sx={{ position: "relative", display: "inline-flex", mb: 4 }}>
            <CircularProgress
              variant="determinate"
              value={(timeLeft / currentExercise.restTime) * 100}
              size={120}
              sx={{ color: "white" }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h3" component="div" fontWeight="bold">
                {timeLeft}
              </Typography>
            </Box>
          </Box>

          <Typography variant="h6" sx={{ opacity: 0.8, mb: 1 }}>
            À suivre :
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {isLastSet && !isLastExercise
              ? plan[currentExerciseIndex + 1].name
              : currentExercise.name}
          </Typography>
          <Typography variant="body1">
            {isLastSet && !isLastExercise ? "Série 1" : `Série ${currentSet}`} /{" "}
            {isLastSet && !isLastExercise
              ? plan[currentExerciseIndex + 1].sets
              : currentExercise.sets}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          onClick={skipRest}
          startIcon={<SkipNextIcon />}
          sx={{ py: 2, borderRadius: 2, fontSize: "1.2rem" }}
        >
          PASSER LE REPOS
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "rgba(255,255,255,0.95)",
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, bgcolor: "transparent", boxShadow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Exercice {currentExerciseIndex + 1} / {plan.length}
          </Typography>
          <IconButton size="small" onClick={onExit}>
            <CloseIcon />
          </IconButton>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 8, borderRadius: 4 }}
        />
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
          {currentExercise.name}
        </Typography>
        <Typography variant="body2" color="primary" fontWeight="bold">
          Série {currentSet} / {currentExercise.sets} • {currentExercise.reps}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            mb: 2,
            borderRadius: 2,
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              bgcolor: "grey.100",
              flex: 1,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {isVideo(currentExercise.media) ? (
              <video
                src={currentExercise.media}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  position: "absolute",
                  inset: 0,
                }}
              />
            ) : (
              <img
                src={currentExercise.media}
                alt={currentExercise.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  position: "absolute",
                  inset: 0,
                }}
              />
            )}
          </Box>
        </Card>

        <CardContent>
          <Typography variant="body1" paragraph>
            <strong>Exécution:</strong> {currentExercise.instructions.execution}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Respiration:</strong>{" "}
            {currentExercise.instructions.breathing}
          </Typography>
        </CardContent>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 3,
          bgcolor: "white",
          borderTop: "1px solid",
          borderColor: "grey.200",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={handleSetComplete}
          startIcon={<CheckCircleIcon />}
          sx={{ py: 2, borderRadius: 2, fontSize: "1.2rem" }}
        >
          SÉRIE TERMINÉE
        </Button>
      </Box>
    </Box>
  );
};

export default WorkoutSession;
