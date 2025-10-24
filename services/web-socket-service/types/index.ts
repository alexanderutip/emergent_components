export interface QuoteDetails {
  symbol: string;
  bid: string;
  ask: string;
  date: string;
  ExchangeName: string;
}

export interface WebSocketMessage {
  msgType: string;
  quoteDetails: QuoteDetails;
  msgResult: string;
}

export interface TickerRequest {
  requestType: string;
  symbols: string[];
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface MessagesMap {
  [symbol: string]: WebSocketMessage;
}
