import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  useTheme,
  TextField,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  FormControlLabel,
  Switch,
  FormGroup
} from '@mui/material';
import { 
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
  CheckCircle as VerifiedIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Notifications as NotifyIcon
} from '@mui/icons-material';

interface Contact {
  id: number;
  name: string;
  email: string;
  walletAddress: string;
  verified: boolean;
  notes?: string;
}

const ContactManagement = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentActionId, setCurrentActionId] = useState<number | null>(null);
  const [notificationSubscribed, setNotificationSubscribed] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Initial contacts data
  const initialContacts: Contact[] = [
    { id: 1, name: 'Mahyar Baher', email: 'mahyar.baher@gmail.com', walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', verified: true },
    { id: 2, name: 'Amir Rezaii', email: 'amirrezaii2002@gmail.com', walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', verified: true },
    { id: 3, name: 'Seyed Mehdie Mosavian', email: 'robert@example.com', walletAddress: 'rP4PY2VeZfr9W1hjab4wC4i8UK97QeZbzW', verified: true },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', walletAddress: 'TQ5N7VY1XrBkLSUdY1sVg2s3Gk3PZgq5oJ', verified: false },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', walletAddress: 'A13ASDASDGASDASDASDASDASDASDASDASD', verified: false },
  ];

  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle menu open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setCurrentActionId(id);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentActionId(null);
  };

  // Handle dialog open
  const handleDialogOpen = (contact: Contact | null) => {
    setCurrentContact(contact);
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentContact(null);
  };

  // Handle delete contact
  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    handleMenuClose();
  };

  // Handle toggle verification
  const handleToggleVerification = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, verified: !contact.verified } : contact
    ));
  };

  // Handle save contact
  const handleSaveContact = () => {
    if (currentContact) {
      if (currentContact.id) {
        // Update existing contact
        setContacts(contacts.map(contact => 
          contact.id === currentContact.id ? currentContact : contact
        ));
      } else {
        // Add new contact
        const newContact = {
          ...currentContact,
          id: Math.max(0, ...contacts.map(c => c.id)) + 1
        };
        setContacts([...contacts, newContact]);
      }
    }
    handleDialogClose();
  };

  // Handle input change
  const handleInputChange = (field: keyof Contact, value: string | boolean) => {
    if (currentContact) {
      setCurrentContact({
        ...currentContact,
        [field]: value
      });
    }
  };

  // Handle notification signup
  const handleNotificationSignup = () => {
    if (!notificationEmail || !/\S+@\S+\.\S+/.test(notificationEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setNotificationSubscribed(true);
    setEmailError('');
    // In a real app, you would send this to your backend
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      p: 3
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h5" fontWeight="bold">
          Contact Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ borderRadius: '50px' }}
          onClick={() => handleDialogOpen({
            id: 0,
            name: '',
            email: '',
            walletAddress: '',
            verified: false
          })}
        >
          Add Contact
        </Button>
      </Box>
      
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: theme.palette.action.active, mr: 1 }} />
          ),
          sx: {
            borderRadius: '50px',
            mb: 3
          }
        }}
        variant="outlined"
      />
      
      {/* Contact List */}
      <List sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: 1,
        mb: 3
      }}>
        {filteredContacts.map((contact) => (
          <React.Fragment key={contact.id}>
            <ListItem 
              secondaryAction={
                <>
                  <IconButton 
                    edge="end"
                    onClick={(e) => handleMenuOpen(e, contact.id)}
                  >
                    <MoreIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && currentActionId === contact.id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => {
                      handleDialogOpen(contact);
                      handleMenuClose();
                    }}>
                      <EditIcon sx={{ mr: 1 }} /> Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteContact(contact.id)}>
                      <DeleteIcon sx={{ mr: 1, color: theme.palette.error.main }} /> 
                      <Typography color="error">Delete</Typography>
                    </MenuItem>
                  </Menu>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box fontWeight="medium">{contact.name}</Box>
                    {contact.verified && (
                      <VerifiedIcon 
                        fontSize="small" 
                        color="success" 
                        sx={{ ml: 1 }} 
                      />
                    )}
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2">{contact.email}</Typography>
                    <Typography variant="caption" sx={{ 
                      display: 'block',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {contact.walletAddress}
                    </Typography>
                  </>
                }
              />
              <FormControlLabel
                control={
                  <Switch 
                    checked={contact.verified} 
                    onChange={() => handleToggleVerification(contact.id)}
                    color="success"
                  />
                }
                label=""
                labelPlacement="start"
                sx={{ ml: 2 }}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
        
        {filteredContacts.length === 0 && (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: 200,
            textAlign: 'center',
            p: 3
          }}>
            <PersonIcon sx={{ fontSize: 48, color: theme.palette.text.disabled, mb: 2 }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No contacts found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your search or add a new contact
            </Typography>
          </Box>
        )}
      </List>
      
      {/* Feature Notification */}
      <Box sx={{ 
        backgroundColor: "Background.paper", 
        borderRadius: 2,
        p: 3,
        textAlign: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <NotifyIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Stay Updated!</Typography>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          Get notified when new contact management features are released
        </Typography>
        
        {!notificationSubscribed ? (
          <Box sx={{ display: 'flex',justifyContent: 'space-between',alignItems: 'center', flexDirection:{xs: 'column',md: 'row'} , gap: 1 }}>
            <TextField
              placeholder="Your email address"
              value={notificationEmail}
              onChange={(e) => {
                setNotificationEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              error={!!emailError}
              helperText={emailError}
              sx={{ flexGrow: 1, width:{xs:'100%'} }}
            />
            <Button 
              variant="contained" 
              onClick={handleNotificationSignup}
              sx={{width: {xs:"100%",md: 'fit-content'} ,borderRadius: '50px', color:'inherit', p:3, py: 1, textWrap:'nowrap'}}
            >
              Notify Me
            </Button>
          </Box>
        ) : (
          <Typography color="success.main" sx={{ fontWeight: 'medium' }}>
            You&apos;re subscribed to notifications!
          </Typography>
        )}
      </Box>

      {/* Add/Edit Contact Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {currentContact?.id ? 'Edit Contact' : 'Add New Contact'}
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Name"
                value={currentContact?.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Email"
                value={currentContact?.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Wallet Address"
                value={currentContact?.walletAddress || ''}
                onChange={(e) => handleInputChange('walletAddress', e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <TextField
                fullWidth
                label="Notes (Optional)"
                value={currentContact?.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                multiline
                rows={3}
              />
            </Grid>
            <Grid size={{xs:12}}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={currentContact?.verified || false} 
                      onChange={(e) => handleInputChange('verified', e.target.checked)}
                      color="success"
                    />
                  }
                  label="Verified Contact"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveContact}>
            {currentContact?.id ? 'Save Changes' : 'Add Contact'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactManagement;