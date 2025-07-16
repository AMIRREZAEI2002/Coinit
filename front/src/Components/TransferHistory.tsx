import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material'
import React from 'react'

const TransferHistory = () => {
  return (
    <Box>
    <Typography variant="h5" gutterBottom>Transfer History</Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      View your complete transfer history between accounts and wallets.
    </Typography>
    
    <List component={Paper}>
      <ListItem>
        <ListItemText 
          primary="Bitcoin Transfer" 
          secondary="Jan 12, 2023 14:30" 
        />
        <Typography variant="body1" color="error.main">-0.5 BTC</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText 
          primary="Ethereum Deposit" 
          secondary="Jan 10, 2023 09:15" 
        />
        <Typography variant="body1" color="success.main">+5.0 ETH</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText 
          primary="USDT Withdrawal" 
          secondary="Jan 8, 2023 16:45" 
        />
        <Typography variant="body1" color="error.main">-1,000 USDT</Typography>
      </ListItem>
    </List>
  </Box>
  )
}

export default TransferHistory  