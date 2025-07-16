import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material'
import React from 'react'

const LoginHistory = () => {
  return (
    <Box>
    <Typography variant="h5" gutterBottom>Login History</Typography>
    <Typography variant="body1" sx={{ mb: 3 }}>
      Review your recent login activity for security purposes.
    </Typography>
    
    <List component={Paper}>
      <ListItem>
        <ListItemText 
          primary="New York, US" 
          secondary="Jan 15, 2023 11:30 - Chrome Browser" 
        />
        <Typography variant="body2" color="success.main">Successful</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText 
          primary="London, UK" 
          secondary="Jan 14, 2023 08:45 - Firefox Browser" 
        />
        <Typography variant="body2" color="success.main">Successful</Typography>
      </ListItem>
      <Divider />
      <ListItem>
        <ListItemText 
          primary="Tokyo, JP" 
          secondary="Jan 12, 2023 22:15 - Mobile App" 
        />
        <Typography variant="body2" color="success.main">Successful</Typography>
      </ListItem>
    </List>
  </Box>
  )
}

export default LoginHistory  