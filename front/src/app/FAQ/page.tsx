'use client'
import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  useTheme,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { FData } from './data';
import Link from 'next/link';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  marginBottom: theme.spacing(1),
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
    marginBottom: theme.spacing(1),
  },
}));

const FAQ = () => {
  const theme = useTheme();
  const FaqData = FData.FAQdata;
  
  return (
    <Container component="main" maxWidth="md" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: 'text.primary',
            mb: 1
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          Everything you need to know about our platform
        </Typography>
      </Box>

      <Box sx={{
        border: '1px solid',
        borderColor: theme.palette.divider,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
      }}>
        {FaqData.map((item, index) => (
          <React.Fragment key={index}>
            <StyledAccordion
              disableGutters
              sx={{
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ 
                    color: 'text.secondary' 
                  }} />
                }
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
                sx={{
                  py: 2,
                  px: 3,
                  minHeight: 'auto',
                  '&.Mui-expanded': {
                    minHeight: 'auto',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: '12px 0'
                  }
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600}
                  sx={{ 
                    color: 'text.primary',
                    pr: 2
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              
              <AccordionDetails 
                sx={{ 
                  py: 0,
                  px: 3,
                  pb: 3,
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.7
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
            
            {index < FaqData.length - 1 && (
              <Divider sx={{ borderColor: theme.palette.divider }} />
            )}
          </React.Fragment>
        ))}
      </Box>
      
      <Box textAlign="center" mt={6}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            mb: 1
          }}
        >
          Still have questions?
        </Typography>
          <Link href='/Support' style={{color: 'text.primary', textDecoration: 'none'}} passHref>
            <Box
              sx={{
                display: 'inline-block',
                bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
                color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark',
                px: 3,
                py: 1.5,
                borderRadius: 1,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white'
                }
              }}
            >
            Contact Support
            </Box>
          </Link>
      </Box>
    </Container>
  );
};

export default FAQ;