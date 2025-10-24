import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Typography } from '@mui/material';
import { TrendingUp } from '@mui/icons-material';
import { MessagesMap } from '../../services';
import { Message } from '../';
import './message-list.css';

const MessageList = observer(({ messages }: { messages: MessagesMap }) => {
  if (Object.keys(messages).length === 0) {
    return (
      <Box className="message-list-empty">
        <TrendingUp className="empty-icon" />
        <Typography variant="h6" className="empty-title">
          No Data Yet
        </Typography>
        <Typography variant="body2" className="empty-subtitle">
          Enter symbols and send a request to see live market data
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="message-list-container">
      {Object.values(messages).map((message) => (
        <Message
          message={message}
          key={message.quoteDetails.symbol}
        />
      ))}
    </Box>
  );
});

export { MessageList };
