'use client';

import React from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button, LinearProgress, styled, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// Mock data for upcoming events
const upcomingEvents = [
    { id: 1, name: 'Blockchain Conference 2025', date: '2025-08-15', location: 'Virtual', image: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg' },
    { id: 2, name: 'Wallet User Meetup', date: '2025-09-01', location: 'New York', image: 'https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg' },
  ];
// Mock data for history
const history = [
  { id: 1, event: 'Crypto Expo 2024', date: '2024-06-20', rewards: 50 },
  { id: 2, event: 'Fintech Webinar', date: '2024-07-10', rewards: 30 },
];

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  hover: { scale: 1.05, boxShadow: '0px 8px 20px rgba(0,0,0,0.15)', transition: { duration: 0.3 } },
};

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
  borderRadius: 16,
  overflow: 'hidden',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    background: `linear-gradient(90deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  },
  transition: 'all 0.3s ease',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: theme.palette.action.hover,
  '& .MuiLinearProgress-bar': {
    background: `linear-gradient(90deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
    transition: 'width 0.5s ease-in-out',
  },
}));

const EventRewardsPage = () => {
  const theme = useTheme();
  const points = 250;
  const nextTier = 500;
  const progress = nextTier > 0 ? Math.min((points / nextTier) * 100, 100) : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: theme.palette.text.primary,
          textAlign: 'center',
          mb: 4,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Event Rewards
      </Typography>
      <Grid container spacing={3}>
        {/* Upcoming Events Section */}
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}
          >
            Upcoming Events
          </Typography>
          <Grid container spacing={3}>
            {upcomingEvents.map((event) => (
              <Grid size={{ xs: 12, sm: 6 }} key={event.id}>
                <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
                  <StyledCard>
                    <CardMedia
                      component="img"
                      height="160"
                      image={event.image}
                      alt={event.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        {event.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                        Date: {event.date}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                        Location: {event.location}
                      </Typography>
                      <StyledButton variant="contained">Register</StyledButton>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Rewards Status Section */}
        <Grid size={{ xs: 12, md: 12 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}
          >
            Rewards Status
          </Typography>
          <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
            <StyledCard>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1 }}
                >
                  Current Points: {points}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                  Next Tier: {nextTier} points for $10 voucher ({nextTier - points} points to go)
                </Typography>
                <StyledLinearProgress variant="determinate" value={progress} />
              </CardContent>
            </StyledCard>
          </motion.div>
        </Grid>

        {/* History Section */}
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}
          >
            History
          </Typography>
          <Grid container spacing={2}>
            {history.map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 6 }} key={item.id}>
                <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
                  <StyledCard>
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 1 }}
                      >
                        {item.event}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                        Date: {item.date}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Rewards: {item.rewards} points
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

// Required dependencies:
// - @mui/material
// - framer-motion
// Install with: npm install @mui/material framer-motion

export default EventRewardsPage;