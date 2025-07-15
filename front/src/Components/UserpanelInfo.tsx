'use client';
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  useTheme,
  Paper,
  TextField,
} from '@mui/material';
import { Icon } from '@iconify/react';

const UserpanelInfo = () => {
  const theme = useTheme();
  const [showEmail, setShowEmail] = useState(false);
  const [showUID, setShowUID] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("Samoor");
  const email = "main@gmail.com";
  const uid = "46754632";

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 3,
        backgroundColor: 'background.paper',
        p: 3,
        width: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 1 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ p: 3, [theme.breakpoints.down('md')]: { p: 1 } }}>
            <Icon icon="mdi:user" style={{ fontSize: '2.5rem', color: theme.palette.primary.main }} />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 11 }}>
          <Grid container alignItems="center" spacing={1}>
            <Grid size="auto">
              {isEditingName ? (
                <TextField
                  size="small"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                />
              ) : (
                <Typography variant="h5" fontWeight="bold">{name}</Typography>
              )}
            </Grid>
            <Grid size="auto">
              <IconButton size="small" onClick={() => setIsEditingName(true)} sx={{ ml: 1 }}>
                <Icon icon="mdi:pencil" style={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Grid>
            <Grid size="auto">
              <Button
                variant="contained"
                size="small"
                color="warning"
                sx={{
                  ml: 1,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  textTransform: 'none',
                  fontWeight: 'normal',
                  backgroundColor: '#fff8e1',
                  color: theme.palette.getContrastText('#fff8e1'),
                  '&:hover': {
                    backgroundColor: '#ffecb3',
                  }
                }}
              >
                <Box display="flex" alignItems="center">
                  <Icon icon="mdi:alert-circle-outline" style={{ fontSize: '1rem', marginRight: theme.spacing(0.5) }} />
                  <Typography variant="body2">Not Verified</Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 6, md: 3 }}>
              <Box mb={0.5}>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">Account</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="body2">{showEmail ? email : '••••••••••'}</Typography>
                <IconButton size="small" onClick={() => setShowEmail(!showEmail)} sx={{ ml: 0.5 }}>
                  <Icon icon={showEmail ? "mdi:eye-outline" : "mdi:eye-off-outline"} style={{ fontSize: '0.8rem' }} />
                </IconButton>
              </Box>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Box mb={0.5}>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">UID</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography variant="body2">{showUID ? uid : '********'}</Typography>
                <IconButton size="small" onClick={() => setShowUID(!showUID)} sx={{ ml: 0.5 }}>
                  <Icon icon={showUID ? "mdi:eye-outline" : "mdi:eye-off-outline"} style={{ fontSize: '0.8rem' }} />
                </IconButton>
              </Box>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Box mb={0.5}>
                <Typography variant="body2" color="textSecondary" fontWeight="bold">Sign-up Time</Typography>
              </Box>
              <Typography variant="body2">2023-05-10 19:29:32</Typography>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Box mb={0.5} display="flex" alignItems="center">
                <Typography variant="body2" color="textSecondary" fontWeight="bold" sx={{ mr: 0.5 }}>
                  Last Login
                </Typography>
                <Icon icon="mdi:chevron-right" style={{ fontSize: '0.8rem' }} />
              </Box>
              <Typography variant="body2">2023-05-10 19:29:32</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserpanelInfo;
