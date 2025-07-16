"use client";

import { useState, useMemo, useEffect, createContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeModeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("darkMode");
      const isDark = stored === "true";
      setDarkMode(isDark);
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("darkMode", String(darkMode));
      const raw = localStorage.getItem("settings");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          parsed.theme = darkMode ? "dark" : "light";
          localStorage.setItem("settings", JSON.stringify(parsed));
        } catch (e) {
          console.error("Invalid settings JSON", e);
        }
      }
    }
  }, [darkMode, isLoaded]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);
  const contextValue = useMemo(() => ({ darkMode, toggleDarkMode }), [darkMode]);

  if (!isLoaded) return null; // ⬅️ هیچی رندر نکن تا darkMode لود بشه

  return (
    <ThemeModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
