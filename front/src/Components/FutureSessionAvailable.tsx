'use client'
import React from 'react';
import { Box, Typography, useTheme, styled, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Icon } from '@iconify/react';

interface FutureSessionAvailableProps {
  title: string;
  description: string;
  href: string;
  count: number;
}

const SessionCard = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  boxShadow: theme.shadows[1],
  transition: 'all 0.3s ease',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.action.hover,
  },
}));

const FutureSessionAvailable: React.FC<FutureSessionAvailableProps> = ({
  title,
  description,
  href = '#',
  count,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{ 
      width: '100%', 
      mb: 1,
      display: { xs: 'none', md: 'block' } 
    }}>
      <Link href={href} passHref style={{color: 'inherit', textDecoration: 'none'}}>
        <SessionCard
          whileTap={{ scale: 0.98 }}
          style={{ textDecoration: 'none', color: 'inherit' }}
          role="link"
          aria-label={`${title} session details`}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%' 
          }}>
            {/* Icon */}
            <Box sx={{ 
              width: 50, 
              height: 50, 
              position: 'relative',
              mr: 2,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}>
              <Icon 
                icon="mdi:calendar-star" 
                width={24} 
                height={24} 
                style={{
                  color: theme.palette.mode === 'dark' 
                    ? theme.palette.primary.contrastText 
                    : theme.palette.getContrastText(theme.palette.primary.light)
                }}
              />
            </Box>
            
            {/* Content */}
            <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <Typography
                variant="subtitle1"
                fontWeight="medium"
                sx={{ 
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  fontSize: '0.75rem',
                  color: theme.palette.text.secondary,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {description}
              </Typography>
            </Box>
            
            {/* Count */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                color: theme.palette.primary.main,
                minWidth: 60,
                ml: 1
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500, mr: 0.5 }}>
                +{count}
              </Typography>
              <ChevronRightIcon fontSize="small" />
            </Box>
          </Box>
        </SessionCard>
      </Link>
    </Box>
  );
};

export default FutureSessionAvailable;