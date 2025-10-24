import { makeAutoObservable, runInAction } from 'mobx';
import { QuoteDetails, WebSocketMessage, TickerRequest, ConnectionStatus, MessagesMap } from './types';

export { QuoteDetails, WebSocketMessage, TickerRequest, ConnectionStatus, MessagesMap };


const WS_URL = 'wss://dev-virt-point.utip.work/session';
const RECONNECT_DELAY = 3000;

class WebSocketService {
  messages: MessagesMap = {};
  connectionStatus: ConnectionStatus = 'disconnected';
  private ws: WebSocket | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private shouldReconnect = true;

  constructor() {
    makeAutoObservable(this);
  }

  connect = () => {
    if (this.ws?.readyState === WebSocket.OPEN || this.ws?.readyState === WebSocket.CONNECTING) {
      return;
    }

    this.setConnectionStatus('connecting');

    try {
      this.ws = new WebSocket(WS_URL);

      this.ws.onopen = () => {
        runInAction(() => {
          this.setConnectionStatus('connected');
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          if (message.msgType === 'quote' && message.quoteDetails) {
            runInAction(() => {
              this.messages[message.quoteDetails.symbol] = message;
            });
          }
        } catch (error) {}
      };

      this.ws.onerror = (error) => {
        runInAction(() => {
          this.setConnectionStatus('error');
        });
      };

      this.ws.onclose = () => {
        runInAction(() => {
          this.setConnectionStatus('disconnected');
        });

        if (this.shouldReconnect) {
          this.scheduleReconnect();
        }
      };
    } catch (error) {
      this.setConnectionStatus('error');
      this.scheduleReconnect();
    }
  };

  disconnect = () => {
    this.shouldReconnect = false;
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.setConnectionStatus('disconnected');
  };

  private scheduleReconnect = () => {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, RECONNECT_DELAY);
  };

  sendMessage = (symbols: string[]) => {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return false;
    }

    try {
      const message = {
        requestType: 'tickers',
        symbols: symbols,
      };
      this.ws.send(JSON.stringify(message));
      return true;
    } catch (error) {
      return false;
    }
  };

  private setConnectionStatus = (status: ConnectionStatus) => {
    this.connectionStatus = status;
  };

  clearMessages = () => {
    this.messages = {};
  };
}

export default WebSocketService;
