import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Stack,
  Tooltip,
  IconButton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import type { Answers } from "./FitCoach";
import type { WorkoutExercise } from "./WorkoutSession";
import DialogueBox from "./DialogueBox";
import decathlonProducts from "../../data/decathlon_products.json";

const productsList = decathlonProducts as Product[];

interface Product {
  id: string;
  name: string;
  description: string;
  price?: number;
  url: string;
}

interface Exercise {
  id: string;
  name: string;
  tags: string[];
  variations?: Record<string, Partial<Exercise> | undefined>;
  related_product_id?: string;
  media:
    | string
    | { default: string; variants?: { beginner?: string; advanced?: string } };
  instructions: { execution: string; breathing: string };
}

interface ProfileResultProps {
  answers: Answers;
  data: { exercises: Exercise[] };
  onReset: () => void;
  onStartWorkout: (plan: WorkoutExercise[]) => void;
}

const ProfileResult: React.FC<ProfileResultProps> = ({
  answers,
  data,
  onReset,
  onStartWorkout,
}) => {
  const [openProducts, setOpenProducts] = React.useState(false);
  const profile = useMemo(() => {
    const goal = answers[1]; // weight_loss, muscle_gain, etc.
    const level = answers[2]; // beginner, intermediate, advanced
    const duration = answers[3]; // short, medium, long
    const equipment = answers[5]; // none, basic, full

    // Simple logic for demo purposes
    let title = "Remise en forme";
    let desc = "Un programme équilibré pour commencer.";

    if (goal === "weight_loss") {
      title = "Perte de Poids";
      desc = "On va brûler du gras !";
    } else if (goal === "muscle_gain") {
      title = "Prise de Muscle";
      desc = "On va construire du solide.";
    } else if (goal === "endurance") {
      title = "Endurance";
      desc = "Pour un cœur en béton.";
    } else if (goal === "flexibility") {
      title = "Souplesse";
      desc = "Tout en douceur.";
    }

    if (level === "beginner") title += " - Débutant";
    else if (level === "intermediate") title += " - Intermédiaire";
    else if (level === "advanced") title += " - Avancé";

    return { title, desc, level, equipment, duration, goal };
  }, [answers]);

  const resolveExercise = React.useCallback(
    (exercise: Exercise) => {
      const { equipment } = profile;

      if (exercise.variations && equipment && equipment !== "none") {
        if (exercise.variations[equipment]) {
          return { ...exercise, ...exercise.variations[equipment] } as Exercise;
        }
        if (equipment === "full" && exercise.variations["basic"]) {
          return { ...exercise, ...exercise.variations["basic"] } as Exercise;
        }
      }
      return exercise;
    },
    [profile]
  );

  const uniqueProducts = useMemo(() => {
    const products = new Map<string, Product>();
    data.exercises.forEach((baseEx: Exercise) => {
      const ex = resolveExercise(baseEx);
      if (ex.related_product_id) {
        const p = productsList.find((dp) => dp.id === ex.related_product_id);
        if (p && !products.has(p.id)) {
          products.set(p.id, p);
        }
      }
    });
    return Array.from(products.values());
  }, [data.exercises, resolveExercise]);

  const getExerciseMedia = (exercise: Exercise) => {
    const level = profile.level; // beginner, intermediate, advanced

    // If media is just a string (from a variation), use it
    if (typeof exercise.media === "string") {
      return new URL(
        `../../assets/exercises/media/${exercise.media}`,
        import.meta.url
      ).href;
    }

    // Otherwise use the default/variant logic
    let mediaName = exercise.media.default;

    if (level === "beginner" && exercise.media.variants?.beginner) {
      mediaName = exercise.media.variants.beginner;
    } else if (level === "advanced" && exercise.media.variants?.advanced) {
      mediaName = exercise.media.variants.advanced;
    }

    // Use Vite's dynamic asset handling
    return new URL(`../../assets/exercises/media/${mediaName}`, import.meta.url)
      .href;
  };

  const handleStartSession = () => {
    // Calculate sets
    let sets = 3;
    if (profile.duration === "short") sets = 2;
    if (profile.duration === "long") sets = 4;

    // Calculate reps/duration
    let reps = "15 répétitions";
    if (profile.level === "beginner") reps = "10 répétitions";
    if (profile.level === "advanced") reps = "20 répétitions";

    // Adjust for goal
    if (profile.goal === "strength") {
      reps = profile.level === "beginner" ? "8 répétitions" : "12 répétitions";
    }

    const plan: WorkoutExercise[] = data.exercises.map((baseEx: Exercise) => {
      const ex = resolveExercise(baseEx);
      const mediaUrl = getExerciseMedia(ex);

      // Special case for static exercises like Plank
      let exerciseReps = reps;
      if (ex.tags.includes("static") || ex.id.includes("plank")) {
        exerciseReps =
          profile.level === "beginner"
            ? "20 secondes"
            : profile.level === "advanced"
            ? "60 secondes"
            : "45 secondes";
      }

      return {
        id: ex.id,
        name: ex.name,
        media: mediaUrl,
        instructions: ex.instructions,
        sets: sets,
        reps: exerciseReps,
        restTime: 60,
      };
    });

    onStartWorkout(plan);
  };

  const dialogueText = `Analyse terminée ! Pour ton objectif "${profile.title}", voici ce que je propose. ${profile.desc}`;

  return (
    <DialogueBox text={dialogueText}>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleStartSession}
          startIcon={<PlayArrowIcon />}
          fullWidth
        >
          LANCER LA SÉANCE
        </Button>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1 }}>
          Aperçu de la séance :
        </Typography>

        <Box sx={{ maxHeight: "25vh", overflowY: "auto", pr: 1 }}>
          <Stack spacing={1}>
            {data.exercises.map((baseEx, index: number) => {
              const ex = resolveExercise(baseEx);
              const product = ex.related_product_id
                ? productsList.find((p) => p.id === ex.related_product_id)
                : null;

              return (
                <Card
                  key={ex.id}
                  variant="outlined"
                  sx={{ display: "flex", p: 1, alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "grey.100",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                      fontWeight: "bold",
                      color: "primary.main",
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {ex.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {ex.tags.slice(0, 2).join(", ")}
                    </Typography>
                  </Box>

                  {product && (
                    <Tooltip
                      title={
                        <Box sx={{ textAlign: "center", p: 0.5 }}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {product.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            display="block"
                            sx={{ mb: 1 }}
                          >
                            {product.description}
                          </Typography>
                          <Link
                            href={product.url}
                            target="_blank"
                            rel="noopener"
                            color="secondary"
                            fontWeight="bold"
                            sx={{ fontSize: "0.75rem" }}
                          >
                            Voir sur Decathlon
                          </Link>
                        </Box>
                      }
                      arrow
                      placement="left"
                    >
                      <IconButton size="small" color="primary" sx={{ ml: 1 }}>
                        <ShoppingBagIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Card>
              );
            })}
          </Stack>
        </Box>

        {uniqueProducts.length > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenProducts(true)}
            startIcon={<ShoppingBagIcon />}
          >
            Voir les équipements recommandés ({uniqueProducts.length})
          </Button>
        )}

        <Button
          startIcon={<RestartAltIcon />}
          onClick={onReset}
          color="inherit"
          size="small"
        >
          Recommencer
        </Button>
      </Stack>

      <Dialog
        open={openProducts}
        onClose={() => setOpenProducts(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Équipements recommandés</DialogTitle>
        <DialogContent dividers>
          <List>
            {uniqueProducts.map((product) => (
              <ListItem key={product.id}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <ShoppingBagIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                        fontWeight="bold"
                      >
                        {product.price
                          ? `${product.price} €`
                          : "Prix non disponible"}
                      </Typography>
                      {" — " + product.description}
                    </React.Fragment>
                  }
                />
                <Button
                  variant="contained"
                  size="small"
                  href={product.url}
                  target="_blank"
                  color="secondary"
                  sx={{ ml: 1 }}
                >
                  Voir
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProducts(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </DialogueBox>
  );
};

export default ProfileResult;
