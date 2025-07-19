'use client';

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  styled,
  Grid,
  LinearProgress,
  SvgIcon,
} from '@mui/material';
import { motion } from 'framer-motion';

// Sample data
const userPoints = 120;
const challengeProgress = 60; // درصد پیشرفت چالش
const leaderboardData = [
  { rank: 1, points: 500 },
  { rank: 2, points: 450 },
  { rank: 3, points: 400 },
  { rank: 'You', points: userPoints },
];
const rewards = [
  { name: 'Dark Theme', cost: 100 },
  { name: 'Fee Discount', cost: 200 },
];

// Styled Components
const SectionCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
  marginTop: theme.spacing(3),
}));

const GamifiedCard = styled(motion(Box))(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.action.hover})`,
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.1)',
  },
}));

// Coin Icon SVG
const CoinIcon = () => (
  <SvgIcon viewBox="0 0 24 24" style={{ width: 40, height: 40 }}>
    <circle cx="12" cy="12" r="10" fill="#FFD700" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#000">$</text>
  </SvgIcon>
);

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
};

const WalletFundingSectionOthers: React.FC = () => {
  return (
    <SectionCard>
      <Typography variant="h6" fontWeight={700} mb={3}>
        Finance Fun Hub
      </Typography>
      <Grid container spacing={2}>
        {/* Points Card */}
        <Grid size={{xs:12, md:4}}>
          <GamifiedCard variants={cardVariants} initial="hidden" animate="visible">
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <CoinIcon />
              <Typography variant="body1" fontWeight={500}>
                Your Points
              </Typography>
            </Box>
            <Typography variant="h4" color="primary" fontWeight={700}>
              {userPoints}
            </Typography>
            <Typography variant="caption" color="text.secondary" mt={1}>
              Earn more by depositing or transferring!
            </Typography>
          </GamifiedCard>
        </Grid>

        {/* Challenge Card */}
        <Grid size={{xs:12, md:4}}>
          <GamifiedCard variants={cardVariants} initial="hidden" animate="visible">
            <Typography variant="body1" fontWeight={500} mb={1}>
              Weekly Challenge
            </Typography>
            <Typography variant="body2" mb={1}>
              Complete 5 transactions (+50 points)
            </Typography>
            <Box width="100%">
              <LinearProgress
                variant="determinate"
                value={challengeProgress}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="caption" color="text.secondary" mt={1}>
                {challengeProgress}% Complete
              </Typography>
            </Box>
          </GamifiedCard>
        </Grid>

        {/* Rewards Card */}
        <Grid size={{xs:12, md:4}}>
          <GamifiedCard variants={cardVariants} initial="hidden" animate="visible">
            <Typography variant="body1" fontWeight={500} mb={1}>
              Redeem Rewards
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              {rewards.map((reward, index) => (
                <Box key={index} display="flex" justifyContent="space-between" width="100%">
                  <Typography variant="body2">{reward.name}</Typography>
                  <Typography variant="body2" color="primary">
                    {reward.cost} pts
                  </Typography>
                </Box>
              ))}
            </Box>
          </GamifiedCard>
        </Grid>

        {/* Leaderboard Card */}
        <Grid size={{xs:12, md:12}}>
          <GamifiedCard variants={cardVariants} initial="hidden" animate="visible">
            <Typography variant="body1" fontWeight={500} mb={1}>
              Leaderboard
            </Typography>
            <Box display="flex" flexDirection="column" gap={1} width="100%">
              {leaderboardData.map((entry, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  bgcolor={entry.rank === 'You' ? 'action.hover' : 'transparent'}
                  p={1}
                  borderRadius={1}
                >
                  <Typography variant="body2">
                    {entry.rank === 'You' ? 'You' : `Rank ${entry.rank}`}
                  </Typography>
                  <Typography variant="body2">{entry.points} pts</Typography>
                </Box>
              ))}
            </Box>
          </GamifiedCard>
        </Grid>
      </Grid>
    </SectionCard>
  );
};

export default WalletFundingSectionOthers;