'use client';
import React, { useState, useContext } from 'react';
import { 
  Box, 
  Grid,
  Paper,
  TextField, 
  Button, 
  Checkbox, 
  Typography, 
  Divider,
  IconButton,
  InputAdornment,
  styled,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Icon } from '@iconify/react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeModeContext } from '@/app/providers';

// Styled Components
const SignUpCard = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: theme.shadows[10],
  transition: 'transform 0.6s ease, box-shadow 0.6s ease',
  
  [theme.breakpoints.up('sm')]: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  
  [theme.breakpoints.up('lg')]: {
    maxWidth: 800,
    maxHeight: 700,
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 1000,
    maxHeight: 900,
  },
  
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[15],
  },
}));

const FormInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.grey[100],
    transition: 'all 0.3s ease',
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '0.875rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const ToggleButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  fontWeight: 'bold',
  py: 1,
  px: 2,
  fontSize: '0.8rem',
  color: theme.palette.text.secondary,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    fontSize: '0.9rem',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 3,
    background: 'transparent',
    transition: 'background 0.3s ease',
  },
  '&.active': {
    color: theme.palette.primary.main,
    '&::after': {
      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? theme.palette.grey[800] 
    : theme.palette.grey[200],
  width: 40,
  height: 40,
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    width: 44,
    height: 44,
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[700] 
      : theme.palette.grey[300],
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.primary.contrastText,
  borderRadius: 50,
  padding: theme.spacing(1),
  fontWeight: 'bold',
  boxShadow: theme.shadows[3],
  fontSize: '0.9rem',
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.5),
    fontSize: '1rem',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[6],
    background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));

const SignUp = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeModeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isEmail, setIsEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box 
      sx={{
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: isMobile ? 1 : 2,
        position: 'relative',
        background: theme.palette.mode === 'dark'
          ? 'radial-gradient(circle at top, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
          : 'radial-gradient(circle at top, #e4edf5 0%, #d6e4f0 50%, #f5f7fa 100%)',
      }}
    >
      {/* Dark Mode Toggle */}
      <IconButton 
        onClick={toggleDarkMode} 
        color="inherit"
        sx={{
          position: 'absolute',
          top: theme.spacing(2),
          right: theme.spacing(2),
          zIndex: 1000,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[3],
        }}
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      
      <SignUpCard>
        <Grid container>
          {/* Left Form Section */}
          <Grid size={{xs:12, md:6}} sx={{ bgcolor: 'background.paper', p: isMobile ? 2 : 4 }}>
            <Box sx={{ maxWidth: 500, mx: 'auto' }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                fontWeight="bold" 
                textAlign="center" 
                mb={3}
                sx={{
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Create Your Account
              </Typography>

              {/* Email/Mobile Toggle */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                borderBottom: 1,
                borderColor: 'divider',
                mb: 2
              }}>
                <Box>
                  <ToggleButton 
                    onClick={() => setIsEmail(true)}
                    className={isEmail ? 'active' : ''}
                  >
                    Email
                  </ToggleButton>
                  <ToggleButton 
                    onClick={() => setIsEmail(false)}
                    className={!isEmail ? 'active' : ''}
                  >
                    Mobile
                  </ToggleButton>
                </Box>
              </Box>

              {/* Form */}
              <Box component="form">
                {/* Email/Mobile Field */}
                <FormInput
                  fullWidth
                  placeholder={isEmail ? "Email/Sub-Account" : "Mobile/Sub-Account"}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon 
                          icon={isEmail ? "mdi:email-outline" : "mdi:phone"} 
                          fontSize={isMobile ? 18 : 20} 
                          color={theme.palette.text.secondary} 
                        />
                      </InputAdornment>
                    ),
                    sx: { py: 1, pl: 1, height: 46 }
                  }}
                />

                {/* Password Field */}
                <FormInput
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon 
                          icon="mdi:lock-outline" 
                          fontSize={isMobile ? 18 : 20} 
                          color={theme.palette.text.secondary} 
                        />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          onClick={togglePasswordVisibility} 
                          edge="end"
                          size="small"
                          sx={{ color: theme.palette.text.secondary }}
                        >
                          <Icon 
                            icon={showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"} 
                            fontSize={isMobile ? 18 : 20} 
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { py: 1, pl: 1, height: 46 }
                  }}
                />

                {/* Checkboxes */}
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Checkbox 
                    size="small" 
                    sx={{ color: theme.palette.primary.main }} 
                  />
                  <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.875rem"} color="text.secondary">
                    Enter Referral Code (Optional)
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'flex-start' }}>
                  <Checkbox 
                    size="small" 
                    required 
                    sx={{ color: theme.palette.primary.main }} 
                  />
                  <Typography variant="body2" fontSize={isMobile ? "0.8rem" : "0.875rem"} color="text.secondary">
                    By Proceeding, you agree to the{' '}
                    <Typography 
                      component="span" 
                      color="primary"
                      fontSize="inherit"
                      sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    >
                      Coinit User Agreement
                    </Typography>
                    ,{' '}
                    <Typography 
                      component="span" 
                      color="primary"
                      fontSize="inherit"
                      sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    >
                      DEX+ User Agreement
                    </Typography>
                    , and{' '}
                    <Typography 
                      component="span" 
                      color="primary"
                      fontSize="inherit"
                      sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                    >
                      Privacy Policy
                    </Typography>
                    .
                  </Typography>
                </Box>
                
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ display: 'block', ml: 4, mt: 1, fontSize: isMobile ? "0.7rem" : "0.75rem" }}
                >
                  Your Coinit Exchange account & DEX+ account will be activated
                </Typography>

                {/* Sign Up Button */}
                <PrimaryButton
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                >
                  <Icon icon="mdi:gift-outline" style={{ marginRight: 8 }} />
                  Sign up to claim $20
                </PrimaryButton>
              </Box>

              {/* Login Link */}
              <Typography 
                textAlign="center" 
                mt={2} 
                variant="body2"
                color="text.secondary"
                fontSize={isMobile ? "0.8rem" : "0.875rem"}
              >
                Already have an account?{' '}
                <Typography 
                  component="a" 
                  href="/Login" 
                  color="primary" 
                  fontWeight="bold"
                  fontSize="inherit"
                  sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Log in now!
                </Typography>
              </Typography>

              {/* Divider with Text */}
              <Box sx={{ position: 'relative', mt: 3, mb: 2 }}>
                <Divider />
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  fontSize={isMobile ? "0.7rem" : "0.75rem"}
                  sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    bgcolor: 'background.paper', 
                    px: 2 
                  }}
                >
                  or log in with
                </Typography>
              </Box>

              {/* Social Login Icons */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 1, 
                mt: 2,
                mb: 1
              }}>
                {[
                  { icon: 'logos:google-icon', label: 'Google' },
                  { icon: 'cib:apple', label: 'Apple' },
                  { icon: 'logos:metamask-icon', label: 'MetaMask' },
                  { icon: 'cib:telegram-plane', label: 'Telegram' }
                ].map((item, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <SocialButton>
                      <Icon icon={item.icon} width={isMobile ? 20 : 24} />
                    </SocialButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right Promo Section */}
          <Grid size={{xs:12,md: 6}}
            sx={{
              position: 'relative',
              color: 'white',
              p: isMobile ? 2 : 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              minHeight: isMobile ? 300 : 'auto',
            }}
          >
            {/* Content */}
            <Box sx={{ 
              position: 'relative', 
              zIndex: 1, 
              textAlign: 'center',
              backdropFilter: 'blur(2px)',
              p: isMobile ? 2 : 3,
              borderRadius: 2,
              bgcolor: 'rgba(0,0,0,0.15)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                justifyContent: 'center', 
                mb: 2,
                flexWrap: 'wrap'
              }}>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.3)',
                    borderRadius: 50,
                    px: 1.5,
                    fontSize: isMobile ? "0.7rem" : "0.75rem",
                    fontWeight: 'bold',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Launchpool
                </Button>
                <Button 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.3)',
                    borderRadius: 50,
                    px: 1.5,
                    fontSize: isMobile ? "0.7rem" : "0.75rem",
                    fontWeight: 'bold',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Airdrop+
                </Button>
              </Box>
              
              <Typography variant={isMobile ? "subtitle1" : "h6"} fontWeight="bold" gutterBottom>
                Shardeume (SHM)
              </Typography>
              
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="bold" 
                gutterBottom
                sx={{ 
                  mt: 1,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  fontSize: isMobile ? "1.5rem" : null
                }}
              >
                Share 72,000 SHM
              </Typography>
              
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                fontWeight="bold"
                sx={{ 
                  mb: 2,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  fontSize: isMobile ? "1.5rem" : null
                }}
              >
                & 150,000 USDT!
              </Typography>
              
              <Button
                variant="contained"
                size="small"
                sx={{
                  color: theme.palette.primary.dark,
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  borderRadius: 50,
                  px: 2,
                  py: 0.5,
                  fontSize: isMobile ? "0.8rem" : "0.9rem",
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Join Now
              </Button>
            </Box>
            
            {/* Floating crypto icons - Only show on larger screens */}
            {!isMobile && (
              <>
                <Box sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                  }
                }}>
                  <Icon icon="cryptocurrency:btc" width={80} color="rgba(255,255,255,0.2)" />
                </Box>
                <Box sx={{
                  position: 'absolute',
                  bottom: 40,
                  left: 30,
                  animation: 'float 7s ease-in-out infinite 1s',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                  }
                }}>
                  <Icon icon="cryptocurrency:eth" width={56} color="rgba(255,255,255,0.2)" />
                </Box>
                <Box sx={{
                  position: 'absolute',
                  top: '40%',
                  left: 20,
                  animation: 'float 5s ease-in-out infinite 0.5s',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' },
                  }
                }}>
                  <Icon icon="cryptocurrency:ltc" width={39} color="rgba(255,255,255,0.15)" />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </SignUpCard>
    </Box>
  );
};

export default SignUp;