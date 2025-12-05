import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppProvider from "./AppContext.tsx";

interface CustomPaletteColor {
  accent: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    custom?: CustomPaletteColor;
  }

  interface PaletteOptions {
    custom?: CustomPaletteColor;
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "Autour One, sans-serif",
  },
  colorSchemes: {
    // light: lightThemeAvailable && {
    //   palette: {
    //     primary: {
    //       main: "#eaddbb",
    //     },
    //   },
    // },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <BrowserRouter>
        <AppProvider>
          <App />
        </AppProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
