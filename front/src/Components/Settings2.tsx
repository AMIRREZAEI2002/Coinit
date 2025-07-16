"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  Paper,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";

// Define the notification settings interface
interface NotificationSettings {
  language: string;
  latestEvents: boolean;
  newFuturesTokenListings: boolean;
  newSpotTokenListings: boolean;
  importNotifications: boolean;
  telegramNotifications: boolean;
}

// Default settings
const defaultSettings: NotificationSettings = {
  language: "English",
  latestEvents: false,
  newFuturesTokenListings: false,
  newSpotTokenListings: false,
  importNotifications: false,
  telegramNotifications: false,
};

const Settings2 = () => {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

  // Load settings from local storage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("notificationSettings");
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error("Failed to parse notification settings from local storage", error);
      }
    }
  }, []);

  // Save settings to local storage on change
  useEffect(() => {
    localStorage.setItem("notificationSettings", JSON.stringify(settings));
  }, [settings]);

  // Reusable Section component with icon
  const Section = ({
    title,
    icon,
    children,
    subtitle,
  }: {
    title: string;
    icon: string;
    children: React.ReactNode;
    subtitle?: string;
  }) => (
    <Box mb={3}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{xs:12}}>
          <Box display="flex" alignItems="center">
            <Icon icon={icon} width={24} height={24} style={{ marginRight: 8 }} />
            <Typography fontWeight={600} fontSize={18}>
              {title}
            </Typography>
          </Box>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: "80%" }}>
              {subtitle}
            </Typography>
          )}
        </Grid>
        <Grid size={{xs:12}}>
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
      elevation={2}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 3,
        bgcolor: "Background.paper",
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={4}>
        <Icon icon="mdi:bell" width={28} height={28} style={{ marginRight: 8 }} />
        Notification
      </Typography>

      <Section
        title="Notification Language"
        icon="mdi:language"
        subtitle="Notification/SMS/Email/App Push notification language settings"
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="English">English</MenuItem>
            {/* <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="French">French</MenuItem> */}
          </Select>
        </Box>
      </Section>

      <Section title="Email Subscription" icon="mdi:email">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Typography fontWeight={600}>Latest Events</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.latestEvents}
                onChange={() =>
                  setSettings({ ...settings, latestEvents: !settings.latestEvents })
                }
              />
            }
            label=""
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={2}>
          <Box display="flex" flexDirection="column">
            <Typography fontWeight={600}>New Futures Token Listings</Typography>
            <Typography variant="caption" color="text.secondary">
              (Inc. Copy Trade)
            </Typography>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={settings.newFuturesTokenListings}
                onChange={() =>
                  setSettings({
                    ...settings,
                    newFuturesTokenListings: !settings.newFuturesTokenListings,
                  })
                }
              />
            }
            label=""
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={2}>
          <Typography fontWeight={600}>New Spot Token Listings</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.newSpotTokenListings}
                onChange={() =>
                  setSettings({
                    ...settings,
                    newSpotTokenListings: !settings.newSpotTokenListings,
                  })
                }
              />
            }
            label=""
          />
        </Box>
      </Section>

      <Section title="Notification" icon="mdi:notification-clear-all">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Box display="flex" flexDirection="column">
            <Typography fontWeight={600}>Import</Typography>
            <Typography variant="caption" color="text.secondary">
              (if ...)
            </Typography>
          </Box>
          <FormControlLabel
            control={
              <Switch
                checked={settings.importNotifications}
                onChange={() =>
                  setSettings({
                    ...settings,
                    importNotifications: !settings.importNotifications,
                  })
                }
              />
            }
            label=""
          />
        </Box>
      </Section>

      <Section title="Telegram Notifications" icon="mdi:telegram">
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <Typography fontWeight={600}>Enable Telegram Notifications</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={settings.telegramNotifications}
                onChange={() =>
                  setSettings({
                    ...settings,
                    telegramNotifications: !settings.telegramNotifications,
                  })
                }
              />
            }
            label=""
          />
        </Box>
      </Section>
    </Paper>
  );
};

export default Settings2;