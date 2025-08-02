'use client';

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const LoadingSpinner = ({ children }: { children?: React.ReactNode }) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  const colors = mode === "dark"
    ? {
        background: "#0f172a",
        text: "#e0e7ff",
        primary: "#6366f1",
        secondary: "#8b5cf6",
        shadow: "rgba(99, 102, 241, 0.7)",
      }
    : {
        background: "#f5f7fa",
        text: "#1e293b",
        primary: "#3b82f6",
        secondary: "#2563eb",
        shadow: "rgba(59, 130, 246, 0.7)",
      };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1300,
          bgcolor: colors.background,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        {/* Spinning ring */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: `8px solid ${colors.primary}`,
            borderTopColor: colors.secondary,
            animation: "spin 1.5s linear infinite",
            boxShadow: `0 0 15px ${colors.shadow}`,
          }}
        />

        {/* Text below spinner */}
        <Typography
          sx={{
            mt: 3,
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: colors.text,
            textShadow:
              mode === "dark" ? "0 0 10px rgba(224, 231, 255, 0.6)" : "none",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Loading...
        </Typography>

        {/* Spin animation keyframes */}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Box>

      {/* Render children if provided */}
      {children}
    </>
  );
};

export default LoadingSpinner;
