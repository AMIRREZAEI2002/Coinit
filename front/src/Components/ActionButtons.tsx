// ActionButtons.tsx
import React from 'react';
import { Box, Button } from '@mui/material';

const ActionButtons = () => (
  <Box display="flex" flexWrap="wrap" gap={1}>
    <Button variant="contained" size="small">Earn</Button>
    <Button variant="contained" size="small">Deposit</Button>
    <Button variant="contained" size="small">Convert</Button>
    <Button variant="outlined" size="small">Trade</Button>
  </Box>
);

export default ActionButtons;