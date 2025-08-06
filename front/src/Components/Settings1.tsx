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
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { ThemeModeContext } from "@/app/providers";

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

const Settings1: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const { darkMode, toggleDarkMode } = useContext(ThemeModeContext);
  const theme = useTheme();

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  // Save settings to local storage on change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const handleThemeChange = (themeMode: "light" | "dark") => {
    const newDarkMode = themeMode === "dark";
    if (darkMode !== newDarkMode) {
      toggleDarkMode();
    }
    setSettings((prev) => ({
      ...prev,
      theme: themeMode,
    }));
  };

  const Section: React.FC<{
    title: string;
    icon: string;
    children: React.ReactNode;
  }> = ({ title, icon, children }) => (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{xs:12,md:4}}>
          <Box display="flex" alignItems="center">
            <Icon icon={icon} width={24} height={24} style={{ marginRight: 8 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              {title}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{xs:12,md:8}}>
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
        p: { xs: 2, md: 4 },
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      {/* ✅ Theme Switch */}
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

      {/* ✅ Rise/Fall */}
      <Section title="Toggle Rise/Fall" icon="mdi:arrow-up-down">
        {["green", "red", "blue"].map((color) => (
          <FormControlLabel
            key={color}
            control={
              <Checkbox
                checked={settings.riseFall.includes(color)}
                onChange={() => {
                  const newRiseFall = settings.riseFall.includes(color)
                    ? settings.riseFall.filter((v) => v !== color)
                    : [...settings.riseFall, color];
                  setSettings({ ...settings, riseFall: newRiseFall });
                }}
              />
            }
            label={`${color.charAt(0).toUpperCase() + color.slice(1)}`}
          />
        ))}
      </Section>

      {/* ✅ Trading Interface */}
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

      {/* ✅ Order Book */}
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

      {/* ✅ Additional Display */}
      <Section title="Additional Display Options" icon="mdi:chart-line">
        {["price", "volume"].map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={settings.priceDisplay.includes(item)}
                onChange={() => {
                  const newPriceDisplay = settings.priceDisplay.includes(item)
                    ? settings.priceDisplay.filter((v) => v !== item)
                    : [...settings.priceDisplay, item];
                  setSettings({ ...settings, priceDisplay: newPriceDisplay });
                }}
              />
            }
            label={item === "price" ? "Price Change" : "Volume"}
          />
        ))}
      </Section>

      {/* ✅ Candlestick Opening */}
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

      {/* ✅ Value Display */}
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
            label="Standard - 1,20000012"
          />
          <FormControlLabel
            value="compact"
            control={<Radio />}
            label="Compact - 1.2M"
          />
        </RadioGroup>
      </Section>

      {/* ✅ Price Change Start Time */}
      <Section title="Price Change Start Time" icon="mdi:clock">
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
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

      {/* ✅ Currency */}
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
