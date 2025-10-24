import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { ShowChart } from '@mui/icons-material';
import { WebSocketMessage } from '../../services';
import './message.css';


const Message = observer(({ message }: { message: WebSocketMessage }) => {
  const formatDate = (timestamp: string): string => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const {bid, ask} = message.quoteDetails;
  const spread = (parseFloat(ask) - parseFloat(bid)).toFixed(5);

  return (
    <Paper elevation={3} className="message-item">
      <Box className="message-header">
        <Box className="message-symbol-container">
          <ShowChart className="message-icon" />
          <Typography
            variant="h6"
            className="message-symbol"
          >
            {message.quoteDetails.symbol}
          </Typography>
        </Box>
        <Chip
          label={message.msgResult}
          size="small"
          color={message.msgResult === 'Success' ? 'success' : 'error'}
          className="message-status-chip"
        />
      </Box>
      
      <Box className="message-details">
        <Box className="message-detail-item bid-item">
          <Typography
            variant="caption"
            className="detail-label"
          >
            Bid
          </Typography>
          <Typography
            variant="h6"
            className="detail-value bid-value"
          >
            {message.quoteDetails.bid}
          </Typography>
        </Box>

        <Box className="message-detail-divider" />

        <Box className="message-detail-item ask-item">
          <Typography
            variant="caption"
            className="detail-label"
          >
            Ask
          </Typography>
          <Typography
            variant="h6"
            className="detail-value ask-value"
          >
            {message.quoteDetails.ask}
          </Typography>
        </Box>

        <Box className="message-detail-divider" />

        <Box className="message-detail-item spread-item">
          <Typography
            variant="caption"
            className="detail-label"
          >
            Spread
          </Typography>
          <Typography
            variant="body2"
            className="detail-value spread-value"
          >
            {spread}
          </Typography>
        </Box>
      </Box>

      <Box className="message-footer">
        <Typography
          variant="caption"
          className="footer-text"
        >
          {formatDate(message.quoteDetails.date)}
        </Typography>
        <Box className="footer-divider" />
        <Typography
          variant="caption"
          className="footer-text footer-exchange"
        >
          {message.quoteDetails.ExchangeName}
        </Typography>
      </Box>
    </Paper>
  );
});

export { Message };
