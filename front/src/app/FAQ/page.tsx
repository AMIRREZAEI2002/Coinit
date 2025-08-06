import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import { FData } from './data';

export default function FAQ() {
  const FaqData = FData.FAQdata;

  return (
    <Container component="main" maxWidth="md" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          Frequently Asked Questions
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          Everything you need to know about our platform
        </Typography>
      </Box>

      <Box sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
      }}>
        {FaqData.map((item, index) => (
          <Box key={index}>
            <Accordion disableGutters sx={{ backgroundColor: 'background.paper', boxShadow: 'none', mb: 1, '&:before': { display: 'none' } }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'text.secondary' }} />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
                sx={{
                  py: 2,
                  px: 3,
                  minHeight: 'auto',
                  '&.Mui-expanded': {
                    minHeight: 'auto',
                    borderBottom: `1px solid`,
                    borderColor: 'divider'
                  },
                  '& .MuiAccordionSummary-content': {
                    margin: '12px 0'
                  }
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} sx={{ color: 'text.primary', pr: 2 }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              
              <AccordionDetails sx={{ py: 0, px: 3, pb: 3, backgroundColor: 'background.default' }}>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
            {index < FaqData.length - 1 && <Divider sx={{ borderColor: 'divider' }} />}
          </Box>
        ))}
      </Box>

      <Box textAlign="center" mt={6}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
          Still have questions?
        </Typography>
        <Link href='/Support' prefetch={true} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'inline-block',
              bgcolor: 'primary.light',
              color: 'primary.dark',
              px: 3,
              py: 1.5,
              borderRadius: 1,
              fontWeight: 600,
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
}
