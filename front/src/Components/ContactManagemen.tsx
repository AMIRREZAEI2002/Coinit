"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import { Icon } from "@iconify/react";
import CloseIcon from "@mui/icons-material/Close";

interface Contact {
  id: number;
  name: string;
  email: string;
  walletAddress: string;
  notes?: string;
  verified: boolean;
}

const fakeContacts: Contact[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    walletAddress: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
    notes: "Main Ethereum wallet",
    verified: true,
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    walletAddress: "0xabcd1234efgh5678ijkl9012mnop3456qrst7890",
    notes: "",
    verified: false,
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    walletAddress: "0x5678efgh1234abcd9012mnop3456ijkl7890qrst",
    notes: "Important contact",
    verified: true,
  },
];

const ContactManagement = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Load from localStorage or use fake data if empty
  useEffect(() => {
    const saved = localStorage.getItem("contacts");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length === 0) setContacts(fakeContacts);
      else setContacts(parsed);
    } else {
      setContacts(fakeContacts);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleDialogOpen = (contact?: Contact) => {
    setCurrentContact(contact || null);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setCurrentContact(null);
    setOpenDialog(false);
  };

  const handleInputChange = (field: keyof Contact, value: string | boolean) => {
    setCurrentContact((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSaveContact = () => {
    if (currentContact) {
      if (currentContact.id && contacts.some((c) => c.id === currentContact.id)) {
        setContacts((prev) =>
          prev.map((c) => (c.id === currentContact.id ? currentContact : c))
        );
      } else {
        setContacts((prev) => [
          ...prev,
          { ...currentContact, id: Date.now() },
        ]);
      }
    }
    handleDialogClose();
  };

  const handleDeleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection:{xs:'column',md:'row'},
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Contact Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Icon icon="mdi:plus" />}
          sx={{fontSize:{xs:12,md:15}}}
          onClick={() =>
            handleDialogOpen({
              id: 0,
              name: "",
              email: "",
              walletAddress: "",
              notes: "",
              verified: false,
            })
          }
        >
          Add Contact
        </Button>
      </Box>

      {contacts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
          No contacts available. Please add new contacts.
        </Typography>
      ) : isMobile ? (
        <Stack spacing={2}>
          {contacts.map((contact) => (
            <Paper key={contact.id} sx={{ p: 1, borderRadius: 2 }}>
              <Typography  variant="subtitle1" fontWeight={600}>
                {contact.name}
              </Typography>
              <Typography  variant="body2" color="text.secondary">
                {contact.email}
              </Typography>
              <Typography
                component="div"
                variant="caption"
                sx={{
                  mt: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "block",
                  maxWidth: "200px",
                }}
              >
                Wallet: {contact.walletAddress}
              </Typography>
              {contact.notes && (
                <Typography  variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Notes: {contact.notes}
                </Typography>
              )}
              <Typography
                variant="body2"
                sx={{
                  color: contact.verified ? "success.main" : "error.main",
                  mt: 1,
                }}
              >
                {contact.verified ? "Verified" : "Not Verified"}
              </Typography>


              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                  mt: 1,
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleDialogOpen(contact)}
                >
                  <Icon icon="mdi:pencil" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  <Icon icon="mdi:delete" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Wallet Address</TableCell>
                <TableCell>Verified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.walletAddress}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: contact.verified ? "success.main" : "error.main",
                      }}
                    >
                      {contact.verified ? "Yes" : "No"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleDialogOpen(contact)}
                    >
                      <Icon icon="mdi:pencil" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      <Icon icon="mdi:delete" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: isMobile ? 0 : "16px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="inherit" fontWeight={700}>
            {currentContact?.id && currentContact.id !== 0
              ? "Edit Contact"
              : "New Contact"}
          </Typography>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Name"
              value={currentContact?.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Email"
              value={currentContact?.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              size="small"
            />
            <TextField
              fullWidth
              label="Wallet Address"
              value={currentContact?.walletAddress || ""}
              onChange={(e) =>
                handleInputChange("walletAddress", e.target.value)
              }
              size="small"
            />
            <TextField
              fullWidth
              label="Notes (Optional)"
              value={currentContact?.notes || ""}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              multiline
              rows={3}
              size="small"
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: theme.palette.action.hover,
                borderRadius: "12px",
                p: 2,
              }}
            >
              <Typography variant="body2" fontWeight={500}>
                Verified Contact
              </Typography>
              <Button
                variant={currentContact?.verified ? "contained" : "outlined"}
                color="success"
                onClick={() =>
                  handleInputChange("verified", !currentContact?.verified)
                }
              >
                {currentContact?.verified ? "Yes" : "No"}
              </Button>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          {currentContact?.id && currentContact.id !== 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleDeleteContact(currentContact.id);
                handleDialogClose();
              }}
              sx={{ mr: "auto" }}
            >
              Delete
            </Button>
          )}
          <Button variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveContact}>
            {currentContact?.id && currentContact.id !== 0
              ? "Save"
              : "Add Contact"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactManagement;
