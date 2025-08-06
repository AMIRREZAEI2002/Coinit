"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Switch,
  Select,
  MenuItem,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import { Icon } from "@iconify/react";

interface NotificationSettings {
  language: string;
  latestEvents: boolean;
  newFuturesTokenListings: boolean;
  newSpotTokenListings: boolean;
  importNotifications: boolean;
  telegramNotifications: boolean;
}

const defaultSettings: NotificationSettings = {
  language: "English",
  latestEvents: false,
  newFuturesTokenListings: false,
  newSpotTokenListings: false,
  importNotifications: false,
  telegramNotifications: false,
};

const Settings2: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const theme = useTheme();

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

  useEffect(() => {
    localStorage.setItem("notificationSettings", JSON.stringify(settings));
  }, [settings]);

  const Section: React.FC<{
    title: string;
    icon: string;
    children: React.ReactNode;
    subtitle?: string;
  }> = ({ title, icon, children, subtitle }) => (
    <Box mb={3}>
      <Grid container spacing={2}>
        <Grid size={{xs:12}}>
          <Box display="flex" alignItems="center" mb={subtitle ? 1 : 0}>
            <Icon icon={icon} width={24} height={24} style={{ marginRight: 8 }} />
            <Typography variant="subtitle1" fontWeight={600}>
              {title}
            </Typography>
          </Box>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {subtitle}
            </Typography>
          )}
        </Grid>
        <Grid size={{xs:12}}>
          <Box display="flex" flexDirection="column" gap={2}>
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
        p: { xs: 2, md: 4 },
        mt: 4,
        borderRadius: 3,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box display="flex" alignItems="center" mb={4}>
        <Icon icon="mdi:bell" width={28} height={28} style={{ marginRight: 8 }} />
        <Typography variant="h5" fontWeight={700}>
          Notification Settings
        </Typography>
      </Box>

      {/* ✅ Language Section */}
      <Section
        title="Notification Language"
        icon="mdi:language"
        subtitle="Set the language for Notification, SMS, Email, and App Push notifications."
      >
        <Select
          value={settings.language}
          onChange={(e) => setSettings({ ...settings, language: e.target.value })}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="English">English</MenuItem>
          {/* Add more languages if needed */}
        </Select>
      </Section>

      {/* ✅ Email Subscription */}
      <Section
        title="Email Subscription"
        icon="mdi:email"
        subtitle="Manage which email notifications you receive."
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600}>Latest Events</Typography>
          <Switch
            checked={settings.latestEvents}
            onChange={() => setSettings({ ...settings, latestEvents: !settings.latestEvents })}
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography fontWeight={600}>New Futures Token Listings</Typography>
            <Typography variant="caption" color="text.secondary">
              (Including Copy Trade)
            </Typography>
          </Box>
          <Switch
            checked={settings.newFuturesTokenListings}
            onChange={() =>
              setSettings({
                ...settings,
                newFuturesTokenListings: !settings.newFuturesTokenListings,
              })
            }
          />
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600}>New Spot Token Listings</Typography>
          <Switch
            checked={settings.newSpotTokenListings}
            onChange={() =>
              setSettings({
                ...settings,
                newSpotTokenListings: !settings.newSpotTokenListings,
              })
            }
          />
        </Box>
      </Section>

      {/* ✅ Import Notifications */}
      <Section title="Notification" icon="mdi:notification-clear-all">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography fontWeight={600}>Import</Typography>
            <Typography variant="caption" color="text.secondary">
              (If enabled, you will receive import alerts)
            </Typography>
          </Box>
          <Switch
            checked={settings.importNotifications}
            onChange={() =>
              setSettings({
                ...settings,
                importNotifications: !settings.importNotifications,
              })
            }
          />
        </Box>
      </Section>

      {/* ✅ Telegram Notifications */}
      <Section title="Telegram Notifications" icon="mdi:telegram">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600}>Enable Telegram Notifications</Typography>
          <Switch
            checked={settings.telegramNotifications}
            onChange={() =>
              setSettings({
                ...settings,
                telegramNotifications: !settings.telegramNotifications,
              })
            }
          />
        </Box>
      </Section>
    </Paper>
  );
};

export default Settings2;
