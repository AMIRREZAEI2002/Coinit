'use client';

import { Box, Stack, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { key: 'QuickBuySell', label: 'Buy and Sell' },
  { key: 'P2P', label: 'P2P' },
  { key: 'ThirdParty', label: 'Third Party' },
  { key: 'Transfer', label: 'Transfer' },
];

export default function BQPTLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const pathname = usePathname();
  const activeTab = pathname.split('/').pop();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        px: { xs: 2, sm: 3 },
        py: 4,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Tab Navigation */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 1,
          mb: 4,
        }}
      >
        {tabs.map((tabItem) => (
          <Box
            key={tabItem.key}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              pb: 0,
              transition: 'all 0.3s ease',
            }}
          >
            <Link href={`/BQPT/${tabItem.key}`} style={{ textDecoration: 'none' }}>
              <Typography
                className="tab-label"
                variant="body1"
                sx={{
                  fontWeight: activeTab === tabItem.key ? 700 : 500,
                  color:
                    activeTab === tabItem.key
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.3px',
                }}
              >
                {tabItem.label}
              </Typography>
            </Link>

            {activeTab === tabItem.key && (
              <motion.div
                className="tab-indicator"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: -9,
                  left: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  borderRadius: 2,
                }}
              />
            )}
          </Box>
        ))}
      </Stack>

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Box>
  );
}
