import { ThemeOptions } from "@mui/material/styles";

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3",
      light: "#f5f5f5",
    },
    secondary: {
      main: "#00e5ff",
    },
    background: {
      default: "#000011",
      paper: "#000000",
    },
    text: {
      primary: "#c5c5c5",
      secondary: "#efefef",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: { textDecoration: "none" },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          gap: "0.1rem",
          cursor: "pointer",
          backgroundColor: "#0a0a0a",
          border: "1px solid #2a2a2a",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#101010",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #2a2a2a",
        },
      },
    },
  },
};

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#0071b6",
      dark: "#a2a2a2",
    },
    secondary: {
      main: "#ff8f00",
    },
    background: {
      default: "#f8f8f8",
      paper: "#f8f8f8",
    },
    text: {
      // primary: "#c5c5c5",
      secondary: "#324b4d",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#324b4d",
          textDecoration: "none",
          "&:active": { color: "inherit" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          gap: "0.1rem",
          cursor: "pointer",
          backgroundColor: "#fff",
          boxShadow: "none",
          border: "1px solid #f1f1f1",
          "&:hover": {
            boxShadow: "2px 2px 10px #ddd",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #0071b6",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#333",
        },
      },
    },
  },
};
