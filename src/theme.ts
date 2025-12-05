import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#64B5A3", // Teal/Green from jacket/floor
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#5D4E7B", // Purple from walls
      contrastText: "#ffffff",
    },
    background: {
      default: "#2e2640", // Dark purple fallback
      paper: "#ffffff",
    },
    text: {
      primary: "#2D233B", // Dark purple text
      secondary: "#5D4E7B",
    },
    warning: {
      main: "#E8E08E", // Yellow from jacket
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: "none", // More conversational
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
        containedPrimary: {
          boxShadow: "0 4px 6px rgba(0, 130, 195, 0.3)",
          "&:hover": {
            boxShadow: "0 6px 8px rgba(0, 130, 195, 0.4)",
          },
        },
        containedSecondary: {
          boxShadow: "0 4px 6px rgba(255, 234, 40, 0.4)",
          "&:hover": {
            backgroundColor: "#ffed4d",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },
  },
});

export default theme;
