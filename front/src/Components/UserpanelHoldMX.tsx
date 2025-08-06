import React, { useState } from 'react';
import { 
  Grid, Box, Typography, Button, Switch, FormControlLabel, 
  Paper, Tooltip, IconButton, useTheme
} from '@mui/material';
import {
  Info as InfoIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const UserpanelHoldMX = () => {
  const theme = useTheme();
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(false);

  return (
    <Grid container spacing={2} justifyContent="center" sx={{ p:{xs:1,md:3}}}>
        <Grid size={{xs:12}} sx={{ textAlign: 'center', mb: 1 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            Hold Coinit, Save Up to 50% on Fees
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Hold at least 500 Coinit in Spot account for 24 consecutive hours to qualify
            </Typography>
        </Grid>
        <Grid size={{xs:12,sm:6}}>
            <Paper 
            elevation={0} 
            sx={{ 
                p: 3, 
                backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.03)',
                borderRadius: 2
            }}
            >
            <Box sx={{ mb: 2 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                <Grid >
                    <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="medium">
                        Spot Trading Fee
                    </Typography>
                    <Tooltip title="Spot trading fee details">
                        <IconButton size="small" sx={{ ml: 1 }}>
                        <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    </Box>
                </Grid>
                <Grid>
                    <Typography variant="caption" color="text.secondary">
                    No Discount
                    </Typography>
                </Grid>
                </Grid>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{xs:12,sm:6}}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                    0.00000000%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                    Maker
                    </Typography>
                </Paper>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                    0.050%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                    Taker
                    </Typography>
                </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                <Grid >
                    <Box display="flex" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                        Deduct using Coinit
                    </Typography>
                    <Tooltip title="Deduct fees using Coinit tokens">
                        <IconButton size="small" sx={{ ml: 0.5 }}>
                        <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    </Box>
                </Grid>
                <Grid >
                    <Box display="flex" alignItems="center">
                    <Typography variant="caption" sx={{ mr: 1 }}>
                        {switch1 ? "On" : "Off"}
                    </Typography>
                    <FormControlLabel
                        control={
                        <Switch 
                            size="small" 
                            checked={switch1} 
                            onChange={(e) => setSwitch1(e.target.checked)} 
                        />
                        }
                        label=""
                    />
                    </Box>
                </Grid>
                </Grid>
            </Box>

            <Box>
                <Grid container alignItems="center" justifyContent="space-between">
                <Grid >
                    <Box display="flex" alignItems="center">
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                        Hold Coinit Requirement
                    </Typography>
                    <Button 
                        variant="outlined" 
                        size="small" 
                        disabled 
                        sx={{ 
                        borderRadius: 1, 
                        textTransform: 'none',
                        fontSize: '0.7rem',
                        py: 0.2,
                        color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.disabled'
                        }}
                    >
                        Not Met
                    </Button>
                    </Box>
                </Grid>
                <Grid >
                    <Button 
                    endIcon={<ChevronRightIcon />}
                    size="small"
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        color: theme.palette.primary.main
                    }}
                    >
                    Get 50% Off
                    </Button>
                </Grid>
                </Grid>
            </Box>
            </Paper>
        </Grid>

        {/* Second Fee Card */}
        <Grid size={{xs:12,sm:6}}>
            <Paper 
            elevation={0} 
            sx={{ 
                p: 3, 
                backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.03)',
                borderRadius: 2
            }}
            >
            <Box sx={{ mb: 2 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                <Grid >
                    <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="medium">
                        Futures Trading Fee
                    </Typography>
                    <Tooltip title="Futures trading fee details">
                        <IconButton size="small" sx={{ ml: 1 }}>
                        <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    </Box>
                </Grid>
                <Grid >
                    <Typography variant="caption" color="text.secondary">
                    No Discount
                    </Typography>
                </Grid>
                </Grid>
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{xs:12,sm:6}}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                    0.00010%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                    Maker
                    </Typography>
                </Paper>
                </Grid>
                <Grid size={{xs:12,sm:6}}>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" fontWeight="bold">
                    0.0030%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                    Taker
                    </Typography>
                </Paper>
                </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                <Grid>
                    <Box display="flex" alignItems="center">
                    <Typography variant="caption" color="text.secondary">
                        Deduct using Coinit
                    </Typography>
                    <Tooltip title="Deduct fees using Coinit tokens">
                        <IconButton size="small" sx={{ ml: 0.5 }}>
                        <InfoIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    </Box>
                </Grid>
                <Grid >
                    <Box display="flex" alignItems="center">
                    <Typography variant="caption" sx={{ mr: 1 }}>
                        {switch2 ? "On" : "Off"}
                    </Typography>
                    <FormControlLabel
                        control={
                        <Switch 
                            size="small" 
                            checked={switch2} 
                            onChange={(e) => setSwitch2(e.target.checked)} 
                        />
                        }
                        label=""
                    />
                    </Box>
                </Grid>
                </Grid>
            </Box>

            <Box>
                <Grid container alignItems="center" justifyContent="space-between">
                <Grid >
                    <Box display="flex" alignItems="center">
                    <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                        Hold Coinit Requirement
                    </Typography>
                    <Button 
                        variant="outlined" 
                        size="small" 
                        disabled 
                        sx={{ 
                        borderRadius: 1, 
                        textTransform: 'none',
                        fontSize: '0.7rem',
                        py: 0.2,
                        color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.disabled'
                        }}
                    >
                        Not Met
                    </Button>
                    </Box>
                </Grid>
                <Grid>
                    <Button 
                    endIcon={<ChevronRightIcon />}
                    size="small"
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        color: theme.palette.primary.main
                    }}
                    >
                    Get 50% Off
                    </Button>
                </Grid>
                </Grid>
            </Box>
            </Paper>
        </Grid>
    </Grid>
  );
};

export default UserpanelHoldMX;