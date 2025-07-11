'use client';
import React, { useState } from 'react';
import { 
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  List,
  ListItem,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create custom theme
const supportTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2ef',
    },
    secondary: {
      main: '#4caf50ee',
    },
    background: {
      default: '#eeeff2',
      paper: '#fff0eeee',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 20px',
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          marginBottom: '8px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          '&:before': {
            display: 'none',
          },
        },
      },
    },
  },
});

const Support = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const faqItems = [
    {
      question: "How can I recover my account?",
      answer: "To recover your account, go to the login page and click “Forgot Password.” Enter your registered email, and you’ll receive a reset link shortly."
    },
    {
      question: "How do I check my order status?",
      answer: "After logging in, navigate to “My Orders.” Select the order you want to review, and all details will be displayed there."
    },
    {
      question: "What should I do if I encounter a technical issue?",
      answer: "You can submit a new ticket with “Technical Issue” as the subject, or use the live chat widget at the bottom of the page for immediate assistance."
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = (fieldName: string, value: string) => {
    let error = '';
    
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 3) {
          error = 'Name must be at least 3 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      case 'subject':
        if (!value.trim()) {
          error = 'Subject is required';
        } else if (value.trim().length < 5) {
          error = 'Subject must be at least 5 characters';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    (Object.keys(formData) as Array<keyof typeof formData>).forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send the form data to your backend here
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <ThemeProvider theme={supportTheme}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h1" 
            gutterBottom
            sx={{
              color: 'primary.main',
              mb: 2,
              [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
              }
            }}
          >
            Coinit Support
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1.25rem',
              maxWidth: 600,
              mx: 'auto',
              [theme.breakpoints.down('sm')]: {
                fontSize: '1.1rem',
              }
            }}
          >
            If you have any questions or issues, you&apos;ll find your answers here — or feel free to get in touch with us directly.
          </Typography>
        </Box>

        {/* Support Ticket Form */}
        <Paper elevation={0} sx={{ 
          mb: 6, 
          borderRadius: 3,
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            bgcolor: 'primary.main', 
            color: 'white', 
            py: 2, 
            px: 3 
          }}>
            <Typography variant="h2" component="h2">
              Submit a Support Ticket
            </Typography>
          </Box>
          
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.name && touched.name}
                helperText={touched.name && errors.name}
                placeholder="e.g., Arthur Morgan"
                margin="normal"
                variant="outlined"
                autoComplete="name"
              />
              
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email && touched.email}
                helperText={touched.email && errors.email}
                placeholder="e.g., Arthur_Morgan@coinit.com"
                margin="normal"
                variant="outlined"
                autoComplete="email"
              />
              
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.subject && touched.subject}
                helperText={touched.subject && errors.subject}
                placeholder="Enter ticket subject"
                margin="normal"
                variant="outlined"
              />
              
              <TextField
                fullWidth
                label="Details / Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.message && touched.message}
                helperText={touched.message && errors.message}
                placeholder="Type your message here..."
                margin="normal"
                variant="outlined"
                multiline
                rows={5}
                sx={{ mt: 3 }}
              />
              
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SendIcon />}
                sx={{ mt: 3 }}
              >
                Send Ticket
              </Button>
              
              {isSubmitted && (
                <Alert 
                  severity="success" 
                  sx={{ mt: 3 }}
                  onClose={() => setIsSubmitted(false)}
                >
                  Your message has been sent successfully. We will get back to you shortly.
                </Alert>
              )}
            </form>
          </Box>
        </Paper>

        {/* FAQ Section */}
        <Box mb={6}>
          <Typography variant="h2" component="h2" mb={3}>
            Frequently Asked Questions
          </Typography>
          
          <Box>
            {faqItems.map((item, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`faq-content-${index}`}
                  id={`faq-header-${index}`}
                  sx={{
                    bgcolor: 'primary',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={600}>
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: 'background.default' }}>
                  <Typography variant="body1" color="text.secondary">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        {/* Helpful Resources */}
        <Box>
          <Typography variant="h2" component="h2" mb={3}>
            Helpful Resources
          </Typography>
          
          <List sx={{ listStyleType: 'none', pl: 0 }}>
            <ListItem sx={{ pl: 0, mb: 1 }}>
              <Link 
                href="/getting-started" 
                color="primary"
                sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Getting Started Guide
              </Link>
            </ListItem>
            <ListItem sx={{ pl: 0 }}>
              <Link 
                href="/FAQ" 
                color="primary"
                sx={{ 
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                All FAQs
              </Link>
            </ListItem>
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Support;