import React from 'react';
import { Box, Typography } from '@mui/material';
import { Timeline } from '@mui/icons-material';
import './header.css';

const Header = () => (
  <Box className="header">
    <Box className="header-content">
      <Box className="header-logo">
        <Timeline className="header-icon" />
        <Typography variant="h6" className="header-title">
          MarketStream
        </Typography>
      </Box>
      <Typography variant="body2" className="header-subtitle">
        Real-time Market Data
      </Typography>
    </Box>
  </Box>
);

export { Header };
