import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Container } from '@mui/material';
import { WebSocketService } from '../../services';
import { Header, SymbolInput, MessageList, ConnectionStatus } from '../';
import './main-layout.css';

const MainLayout = observer(({ webSocketController }: { webSocketController: WebSocketService}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) {
      return;
    }

    const symbols = inputValue
      .split(',')
      .map((symbol) => symbol.trim())
      .filter((symbol) => symbol.length > 0);

    if (symbols.length > 0) {
      const success = webSocketController.sendMessage(symbols);
      if (success) {
        setInputValue('');
      }
    }
  };

  return (
    <Box className="main-layout">
      <Header />
      <Container maxWidth="md" className="main-container">
        <ConnectionStatus connectionStatus={connectionStatus} />
        <SymbolInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
        />
        <MessageList />
      </Container>
    </Box>
  );
});

export { MainLayout };
