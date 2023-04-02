import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ff784e",
      main: "#ff5722",
      dark: "#b23c17",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
    },
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
