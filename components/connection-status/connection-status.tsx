import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Chip } from '@mui/material';
import {
  CheckCircle,
  Error,
  HourglassEmpty,
  SignalCellularAlt,
} from '@mui/icons-material';
import './connection-status.css';
import { ConnectionStatus } from '../../services';

const ConnectionStatus = observer(({ connectionStatus }: { connectionStatus: ConnectionStatus }) => {

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: <CheckCircle />,
          label: 'Connected',
          color: 'success' as const,
          className: 'status-connected',
        };
      case 'connecting':
        return {
          icon: <HourglassEmpty />,
          label: 'Connecting...',
          color: 'warning' as const,
          className: 'status-connecting',
        };
      case 'error':
        return {
          icon: <Error />,
          label: 'Connection Error',
          color: 'error' as const,
          className: 'status-error',
        };
      default:
        return {
          icon: <SignalCellularAlt />,
          label: 'Disconnected',
          color: 'default' as const,
          className: 'status-disconnected',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Box className="connection-status">
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        size="small"
        className={`status-chip ${config.className}`}
      />
    </Box>
  );
});

export { ConnectionStatus };
