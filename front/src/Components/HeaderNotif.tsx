'use client';

import React, { useState, useContext } from 'react';
import { Box, Typography, Menu, MenuItem, Tabs, Tab, IconButton, Badge, Divider } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import { motion } from 'framer-motion';
import { ThemeModeContext } from '../app/providers';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  category: 'All' | 'New Listings' | 'Futures Events';
}

const HeaderNotif = () => {
  const { darkMode } = useContext(ThemeModeContext);
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New Listing', message: 'JAGER/USDT trading is live! Trade Now', isRead: false, category: 'All' },
    { id: '2', title: 'New Listing', message: 'JAGER/USDT trading is live! Trade Now', isRead: false, category: 'All' },
    { id: '3', title: 'New Listing', message: 'JAGER/USDT trading is live! Trade Now', isRead: true, category: 'All' },
    { id: '4', title: 'New Listing', message: 'ZKLink/USDT Listed Now!!', isRead: false, category: 'New Listings' },
    { id: '5', title: 'New Listing', message: 'ZKLink/USDT Listed Now!!', isRead: false, category: 'New Listings' },
    { id: '6', title: 'New Event', message: 'New Airdrop listed. Trade Now!', isRead: false, category: 'Futures Events' },
    { id: '7', title: 'New Event', message: 'New Airdrop listed. Trade Now!', isRead: true, category: 'Futures Events' },
    { id: '8', title: 'New Event', message: 'New Airdrop listed. Trade Now!', isRead: false, category: 'Futures Events' },
  ]);

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  const handleOpenNotifMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleCloseNotifMenu = () => {
    setAnchorElNotif(null);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const filteredNotifications = activeTab === 'All'
    ? notifications
    : notifications.filter((notif) => notif.category === activeTab);

  return (
    <>
      <IconButton
        sx={{ p: 0, mx: 1 }}
        onClick={handleOpenNotifMenu}
        color="inherit"
      >
        <Badge
          badgeContent={unreadCount}
          color="primary"
          overlap="circular"
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon
              icon="mdi:bell"
              color={darkMode ? '#fff' : '#000'}
              fontSize={28}
            />
          </motion.div>
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorElNotif}
        open={Boolean(anchorElNotif)}
        onClose={handleCloseNotifMenu}
        sx={{
          mt: '45px',
          '& .MuiPaper-root': {
            background: darkMode ? '#1e1e1e' : 'background.paper',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            minWidth: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            animation: 'fadeIn 0.8s ease-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: darkMode ? '#1e1e1e' : 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {/* Dropdown Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1,
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            <span>{notifications.length}</span> New Notifications
            <Link
              href="#"
              onClick={handleMarkAllAsRead}
              style={{
                color: 'primary.main',
                textDecoration: 'none',
                marginLeft: 8,
                fontSize: 11,
              }}
            >
              All Read
            </Link>
          </Typography>
          <Link
            href="#"
            style={{
              color: darkMode ? '#fff' : '#000',
              textDecoration: 'none',
              fontSize: 12,
            }}
          >
            View All
            <Icon icon="mdi:chevron-right" fontSize={12} style={{ marginLeft: 4 }} />
          </Link>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            px: 2,
            '& .MuiTabs-indicator': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          <Tab
            label="All Notifications"
            value="All"
            sx={{
              fontSize: 12,
              textTransform: 'none',
              color: darkMode ? 'text.secondary' : 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          />
          <Tab
            label="New Listings"
            value="New Listings"
            sx={{
              fontSize: 12,
              textTransform: 'none',
              color: darkMode ? 'text.secondary' : 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          />
          <Tab
            label="Futures Events"
            value="Futures Events"
            sx={{
              fontSize: 12,
              textTransform: 'none',
              color: darkMode ? 'text.secondary' : 'text.secondary',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          />
        </Tabs>
        <Divider sx={{ my: 0.5 }} />

        {/* Notification List */}
        {filteredNotifications.length === 0 ? (
          <MenuItem>
            <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>
              No notifications
            </Typography>
          </MenuItem>
        ) : (
          filteredNotifications.map((notif) => (
            <MenuItem
              key={notif.id}
              onClick={() => handleMarkAsRead(notif.id)}
              onMouseEnter={() => !notif.isRead && handleMarkAsRead(notif.id)} // Mark as read on hover if not already read
              sx={{
                py: 1.5,
                transition: 'all 0.3s ease',
                backgroundColor: notif.isRead ? 'transparent' : darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f8f9fa',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <Icon
                  icon="mdi:circle"
                  width={12}
                  height={12}
                  style={{
                    color: notif.isRead ? 'text.secondary' : 'primary.main',
                    marginRight: 12,
                    marginTop: 4,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: notif.isRead ? 400 : 600,
                      color: notif.isRead ? 'text.secondary' : 'text.primary',
                    }}
                  >
                    {notif.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'text.secondary',
                    }}
                  >
                    {notif.message} <Icon icon="mdi:emoticon-happy-outline" fontSize={12} />
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default HeaderNotif;