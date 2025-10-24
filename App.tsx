import React, { useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { WebSocketService } from './services';
import MainLayout from './components';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0099FF',
    },
    secondary: {
      main: '#9C27B0',
    },
    success: {
      main: '#2E865F',
    },
    error: {
      main: '#FF0000',
    },
    warning: {
      main: '#FFAB00',
    },
    background: {
      default: '#141619',
      paper: '#1E2024',
    },
    text: {
      primary: '#F5F5F5',
      secondary: '#A6A6A6',
    },
  },
  typography: {
    fontFamily: '"Inter", "Space Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h4: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: '"Space Grotesk", sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#404040 #141619',
        },
      },
    },
  },
});

const App: React.FC = observer(() => {
  const webSocketController = React.useMemo(() => new WebSocketService(), [])

  useEffect(() => {
    webSocketController.connect();

    return () => {
      webSocketController.disconnect();
    };
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <MainLayout webSocketController={webSocketController}  />
      </div>
    </ThemeProvider>
  );
});

export default App;
