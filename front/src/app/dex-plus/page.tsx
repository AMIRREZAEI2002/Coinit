'use client';

import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// استایل‌های لودینگ
const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: theme.palette.mode === 'dark'
    ? 'radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    : 'radial-gradient(circle at center, #e4edf5 0%, #d6e4f0 50%, #f5f7fa 100%)',
}));

const Spinner = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  border: `4px solid ${theme.palette.primary.main}`,
  borderTopColor: theme.palette.secondary.main,
  animation: 'spin 1.2s linear infinite, gradient 4s linear infinite',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 5,
    left: 5,
    right: 5,
    bottom: 5,
    borderRadius: '50%',
    background: 'transparent',
    border: `2px solid ${theme.palette.secondary.main}`,
    borderTopColor: theme.palette.primary.main,
    animation: 'spin 0.8s linear infinite reverse',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes gradient': {
    '0%': { borderColor: theme.palette.primary.main, borderTopColor: theme.palette.secondary.main },
    '50%': { borderColor: theme.palette.secondary.main, borderTopColor: theme.palette.primary.main },
    '100%': { borderColor: theme.palette.primary.main, borderTopColor: theme.palette.secondary.main },
  },
}));
const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  fontWeight: 'bold',
  fontSize: '1.2rem',
  color: theme.palette.text.primary,
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': { opacity: 1, transform: 'scale(1)' },
    '50%': { opacity: 0.7, transform: 'scale(1.05)' },
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
}));
const LoadingComponent = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading DEX+...</LoadingText>
    </LoadingContainer>
  );
};
const DexPlusPage = dynamic(() => import('@/Components/DexPlusPage'), {
  loading: () => <LoadingComponent />,
  ssr: false,
});

export default function DexPlus() {
  return <DexPlusPage />;
}