import React, { KeyboardEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import { Send, TrendingUp } from '@mui/icons-material';
import './symbol-input.css';
import { ConnectionStatus } from '../../services';

const SymbolInput = observer(({ value, onChange, onSend, connectionStatus }: {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  connectionStatus: ConnectionStatus;
}) => {
  const isDisabled = connectionStatus !== 'connected';

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !isDisabled) {
      onSend();
    }
  };

  return (
    <Box className="ticker-input-container">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter symbols (e.g., EURUSD, USDRUB, GBPUSD)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isDisabled}
        className="ticker-input"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TrendingUp className="input-icon" />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={isDisabled || !value.trim()}
        onClick={onSend}
        className="send-button"
        endIcon={<Send />}
      >
        Send
      </Button>
    </Box>
  );
});

export { SymbolInput };
