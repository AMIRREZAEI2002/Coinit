import React from 'react';
import { Icon } from '@iconify/react';
import { 
  Grid, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Card, 
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';
const paymentCompony = [
  { icon: 'logos:paypal'},
  { icon: 'cib:cc-visa'},
  { icon: 'arcticons:skrill'},
];
const ThirdParty = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerChildren = {
    visible: { 
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };

  return (
    <Box sx={{ px: { xs: 0, md: 4 }, py: 8 }}>
      {/* Main Section */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        {/* Left Column */}
        <Grid size={{xs:12,md:6}} sx={{ order: { xs: 2, md: 1 } }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Connect with Trusted Partners
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Access a wide range of financial services through our verified third-party providers.
            </Typography>
            
            <Box sx={{ mt: 4 }}>
              <motion.div variants={staggerChildren}>
                <motion.div variants={fadeIn} className="mb-4">
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white', 
                        borderRadius: 100, 
                        p: 2,
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mr: 3
                      }}
                    >
                      <Icon icon="mdi:shield-check" width={24} height={24} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Secure Transactions
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        256-bit SSL encryption
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
                
                <motion.div variants={fadeIn}>
                  <Box display="flex" alignItems="center">
                    <Box 
                      sx={{ 
                        bgcolor: 'success.main', 
                        color: 'white', 
                        borderRadius: 100, 
                        p: 2,
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mr: 3
                      }}
                    >
                      <Icon icon="mdi:handshake" width={24} height={24} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        Verified Partners
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        100+ trusted providers
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Box>
          </motion.div>
        </Grid>
        
        {/* Right Column */}
        <Grid size={{xs:12,md:6}} sx={{ order: { xs: 1, md: 2 } }}>
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <Box component="form" display="flex" p={1}>
                <Button type="submit" sx={{ color: 'text.secondary' }}>
                  <Icon icon="mdi:magnify" width={20} height={20} />
                </Button>
                <TextField 
                  fullWidth
                  placeholder="Search services..."
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                  sx={{ 
                    '& .MuiInputBase-input': { 
                      py: 1,
                      '&::placeholder': { opacity: 0.7 }
                    } 
                  }}
                />
              </Box>
            </Card>
            
            <Box sx={{ '& > *': { mb: 3 } }}>
              {/* Bank Transfers Card */}
              <motion.div variants={fadeIn}>
                <Card sx={{ borderRadius: 2, position: 'relative' }}>
                  <Chip 
                    label="Low Fees" 
                    size="small" 
                    color="primary" 
                    sx={{ position: 'absolute', top: 5, right: 5 }} 
                  />
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                    <Icon icon="solar:round-transfer-vertical-broken" width={20} height={20} />
                      <Box mx={1}>
                        <Typography variant="h6" fontWeight={600}>
                          Bank Transfers
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          0.1% transaction fee
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Box display="flex" alignItems="center">
                          <Icon icon="mdi:clock-outline" width={20} height={20} />
                          <Typography variant="body2" ml={1}>
                            Processing Time
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          1-3 Business Days
                        </Typography>
                      </Box>
                      <Button 
                        variant="contained" 
                        color="primary"
                        sx={{ borderRadius: 2 }}
                      >
                        Connect
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Digital Wallets Card */}
              <motion.div variants={fadeIn}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                    <Icon icon="mdi:wallet" width="24" height="24" />
                      <Box mx={1}>
                        <Typography variant="h6" fontWeight={600}>
                          Digital Wallets
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Connect your e-wallet
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box display="flex" justifyContent='space-start' width="50%">
                      {paymentCompony.map((item) => (
                        <Box key={item.icon}>
                          <Icon icon={item.icon} width="24" height="24" style={{marginRight:20}} />
                        </Box>
                      ))}
                      </Box>
                      <Button 
                        variant="outlined" 
                        color="secondary"
                        sx={{ borderRadius: 2 }}
                      >
                        View All
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Advanced Services Card */}
              <motion.div variants={fadeIn}>
                <Card sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Icon icon="mdi:cube-outline" width={24} height={24} />
                      <Typography variant="h6" fontWeight={600} ml={1}>
                        Advanced Services
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid size={{xs:6}}>
                        <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                          <Icon icon="mdi:file-document-outline" width={32} height={32} />
                          <Typography variant="body2">Tax Services</Typography>
                        </Card>
                      </Grid>
                      <Grid size={{xs:6}}>
                        <Card variant="outlined" sx={{ textAlign: 'center', p: 2 }}>
                          <Icon icon="mdi:lock" width={32} height={32} />
                          <Typography variant="body2">Custody</Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
      
      {/* Security Section */}
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <Card 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'common.white', 
            borderRadius: 4,
            p: 5,
            mb: 8
          }}
        >
          <Grid container alignItems="center">
            <Grid size={{xs:12,md:6}}>
              <Typography variant="h4" fontWeight={700} mb={4}>
                Security First
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon sx={{ color: 'common.white', minWidth: 36 }}>
                    <Icon icon="mdi:fingerprint" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText primary="Two-factor authentication" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: 'common.white', minWidth: 36 }}>
                    <Icon icon="mdi:security" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText primary="PCI DSS compliant" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ color: 'common.white', minWidth: 36 }}>
                    <Icon icon="mdi:account-lock" width={24} height={24} />
                  </ListItemIcon>
                  <ListItemText primary="Identity verification" />
                </ListItem>
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <Icon icon='line-md:security' width={200} height={200}/>
                <Typography position='absolute' top="49%" left="50%" sx={{transform:"translate(-61% , -50%)", fontSize: 35, fontWeight:900, fontFamily:"Lavishly Yours !important"}}>Coinit</Typography>
            </Grid>
          </Grid>
        </Card>
      </motion.div>
      
      {/* How It Works Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={6}>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{xs:12,md:4}}>
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card sx={{ height: '100%', borderRadius: 4 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box color="primary.main" mb={3}>
                    <Icon icon="mdi:magnify" width={60} height={60} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    1. Find Service
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Browse our verified partners and select your preferred service
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid size={{xs:12,md:4}}>
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card sx={{ height: '100%', borderRadius: 4 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box color="primary.main" mb={3}>
                    <Icon icon="mdi:link" width={60} height={60} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    2. Connect
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Securely connect your account with our API-based integration
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          <Grid size={{xs:12,md:4}}>
            <motion.div 
              variants={fadeIn}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card sx={{ height: '100%', borderRadius: 4 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box color="primary.main" mb={3}>
                    <Icon icon="mdi:check-circle" width={60} height={60} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    3. Confirm
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Review and confirm transactions in real-time
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ThirdParty;