"use client";

import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { ThemeModeContext } from "@/app/providers"; // Import the context

// Define the settings interface
interface Settings {
  theme: "light" | "dark";
  riseFall: string[];
  interfaceType: "standard" | "horizontal" | "vertical";
  orderBookDisplay: "cumulative" | "quantity";
  priceDisplay: string[];
  candlestickOpening: "first" | "last";
  valueFormat: "standard" | "compact";
  priceChangeTime: "24h" | "utc";
  timezone: string;
  currency: string;
}

// Default settings
const defaultSettings: Settings = {
  theme: "light",
  riseFall: [],
  interfaceType: "standard",
  orderBookDisplay: "cumulative",
  priceDisplay: [],
  candlestickOpening: "first",
  valueFormat: "standard",
  priceChangeTime: "24h",
  timezone: "UTC+8",
  currency: "USD",
};

const Settings1 = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { darkMode, toggleDarkMode } = useContext(ThemeModeContext);

  // Save settings to local storage on change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  // Handle theme change
 
const handleThemeChange = (theme: "light" | "dark") => {
    const newDarkMode = theme === "dark";
    if (darkMode !== newDarkMode) {
      toggleDarkMode(); // تغییر تم
    }
  
    setSettings((prev) => ({
      ...prev,
      theme,
    }));
  };

  // Reusable Section component with icon
  const Section = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: string;
    children: React.ReactNode;
  }) => (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{xs:12, md:6}}>
          <Box display="flex" alignItems="center">
            <Icon icon={icon} width={24} height={24} style={{ marginRight: 8 }} />
            <Typography fontWeight={600}>{title}</Typography>
          </Box>
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {children}
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
    </Box>
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        bgcolor: darkMode ? "#333" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Section title="Theme" icon="mdi:theme-light-dark">
        <RadioGroup
          row
          value={darkMode ? "dark" : "light"}
          onChange={(e) => handleThemeChange(e.target.value as "light" | "dark")}
        >
          <FormControlLabel value="light" control={<Radio />} label="Light / Day" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark / Night" />
        </RadioGroup>
      </Section>

      <Section title="Toggle Rise/Fall" icon="mdi:arrow-up-down">
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.riseFall.includes("green")}
              onChange={() => {
                const newRiseFall = settings.riseFall.includes("green")
                  ? settings.riseFall.filter((v) => v !== "green")
                  : [...settings.riseFall, "green"];
                setSettings({ ...settings, riseFall: newRiseFall });
              }}
            />
          }
          label="Green - Up"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.riseFall.includes("red")}
              onChange={() => {
                const newRiseFall = settings.riseFall.includes("red")
                  ? settings.riseFall.filter((v) => v !== "red")
                  : [...settings.riseFall, "red"];
                setSettings({ ...settings, riseFall: newRiseFall });
              }}
            />
          }
          label="Red - Up"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.riseFall.includes("blue")}
              onChange={() => {
                const newRiseFall = settings.riseFall.includes("blue")
                  ? settings.riseFall.filter((v) => v !== "blue")
                  : [...settings.riseFall, "blue"];
                setSettings({ ...settings, riseFall: newRiseFall });
              }}
            />
          }
          label="Blue - Down"
        />
      </Section>

      <Section title="Trading Interface" icon="mdi:view-dashboard">
        <RadioGroup
          row
          value={settings.interfaceType}
          onChange={(e) =>
            setSettings({
              ...settings,
              interfaceType: e.target.value as "standard" | "horizontal" | "vertical",
            })
          }
        >
          <FormControlLabel value="standard" control={<Radio />} label="Standard" />
          <FormControlLabel value="horizontal" control={<Radio />} label="Horizontal" />
          <FormControlLabel value="vertical" control={<Radio />} label="Vertical" />
        </RadioGroup>
      </Section>

      <Section title="Order Book Display" icon="mdi:book-open-variant">
        <RadioGroup
          row
          value={settings.orderBookDisplay}
          onChange={(e) =>
            setSettings({
              ...settings,
              orderBookDisplay: e.target.value as "cumulative" | "quantity",
            })
          }
        >
          <FormControlLabel
            value="cumulative"
            control={<Radio />}
            label="Cumulative Quantity/Amount"
          />
          <FormControlLabel value="quantity" control={<Radio />} label="Quantity/Amount" />
        </RadioGroup>
      </Section>

      <Section title="Additional Display Options" icon="mdi:chart-line">
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.priceDisplay.includes("price")}
              onChange={() => {
                const newPriceDisplay = settings.priceDisplay.includes("price")
                  ? settings.priceDisplay.filter((v) => v !== "price")
                  : [...settings.priceDisplay, "price"];
                setSettings({ ...settings, priceDisplay: newPriceDisplay });
              }}
            />
          }
          label="Price Change"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.priceDisplay.includes("volume")}
              onChange={() => {
                const newPriceDisplay = settings.priceDisplay.includes("volume")
                  ? settings.priceDisplay.filter((v) => v !== "volume")
                  : [...settings.priceDisplay, "volume"];
                setSettings({ ...settings, priceDisplay: newPriceDisplay });
              }}
            />
          }
          label="Volume"
        />
      </Section>

      <Section title="Candlestick Opening Price" icon="mdi:candle">
        <RadioGroup
          row
          value={settings.candlestickOpening}
          onChange={(e) =>
            setSettings({
              ...settings,
              candlestickOpening: e.target.value as "first" | "last",
            })
          }
        >
          <FormControlLabel value="first" control={<Radio />} label="First Trading Price" />
          <FormControlLabel value="last" control={<Radio />} label="Last Closing Price" />
        </RadioGroup>
      </Section>

      <Section title="Value Display Format" icon="mdi:format-list-numbered">
        <RadioGroup
          row
          value={settings.valueFormat}
          onChange={(e) =>
            setSettings({
              ...settings,
              valueFormat: e.target.value as "standard" | "compact",
            })
          }
        >
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label="Standard - Example: 1,20000012"
          />
          <FormControlLabel
            value="compact"
            control={<Radio />}
            label="Compact - Example: 1.2M"
          />
        </RadioGroup>
      </Section>

      <Section title="Price Change Start Time" icon="mdi:clock">
        <Box display="flex" alignItems="center" gap={2}>
          <RadioGroup
            row
            value={settings.priceChangeTime}
            onChange={(e) =>
              setSettings({
                ...settings,
                priceChangeTime: e.target.value as "24h" | "utc",
              })
            }
          >
            <FormControlLabel value="24h" control={<Radio />} label="24 H" />
            <FormControlLabel value="utc" control={<Radio />} label="UTC Time" />
          </RadioGroup>
          <Select
            value={settings.timezone}
            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="UTC+8">UTC+8</MenuItem>
            <MenuItem value="UTC+0">UTC+0</MenuItem>
            <MenuItem value="UTC-5">UTC-5</MenuItem>
          </Select>
        </Box>
      </Section>

      <Section title="Currency Display" icon="mdi:currency-usd">
        <Select
          value={settings.currency}
          onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="USD">$ USD</MenuItem>
          <MenuItem value="EUR">€ EUR</MenuItem>
          <MenuItem value="BTC">₿ BTC</MenuItem>
        </Select>
      </Section>
    </Paper>
  );
};

export default Settings1;