import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  List,
  ListItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';

export const metadata = {
  title: 'Support - Coinit',
  description: 'Get help and support from our team.To make you&quot;re problem solve.',
};

export default function SupportPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Support
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        If you have any questions or issues, please check our FAQ section first or contact our support team using the form below.
      </Typography>

      {/* FAQ Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How do I create an account?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              To create an account, go to the Sign Up page and fill out the registration form.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>How can I reset my password?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Visit the Login page and click on &quot;Forgot Password&quot; to start the recovery process.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Contact Form */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Contact Support
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField fullWidth label="Full Name" variant="outlined" margin="normal" />
          <TextField fullWidth label="Email" variant="outlined" margin="normal" type="email" />
          <TextField fullWidth label="Subject" variant="outlined" margin="normal" />
          <TextField
            fullWidth
            label="Your Message"
            multiline
            rows={5}
            variant="outlined"
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<SendIcon />}
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>

      {/* Contact Info */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6">Other ways to reach us:</Typography>
        <List>
          <ListItem>
            Email:
            <Link href="mailto:Coin@it.com" sx={{ ml: 1 }}>
              Coin@it.com
            </Link>
          </ListItem>
          <ListItem>
            Phone:
            <Typography component="span" sx={{ ml: 1 }}>
              +98 21 0000 0000
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
