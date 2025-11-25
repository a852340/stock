import { SymbolConfig } from '../types/quote'

export interface DataSourceConfig {
  crypto: {
    enabled: boolean
    useRealtime: boolean
    websocketUrl: string
  }
  stock: {
    enabled: boolean
    pollInterval: number
    dataSource: 'tencent' | 'sina'
    cacheTimeout: number
  }
}

export const defaultConfig: DataSourceConfig = {
  crypto: {
    enabled: true,
    useRealtime: true,
    websocketUrl: 'wss://stream.binance.com:9443/ws'
  },
  stock: {
    enabled: true,
    pollInterval: 5000,
    dataSource: 'tencent',
    cacheTimeout: 5000
  }
}

export const SUPPORTED_SYMBOLS: SymbolConfig[] = [
  // Cryptocurrencies
  { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', binanceSymbol: 'btcusdt' },
  { symbol: 'ETH', name: 'Ethereum', type: 'crypto', binanceSymbol: 'ethusdt' },

  // A-shares
  { symbol: '000001', name: '上证指数', type: 'stock' }
]

export function getSymbolConfig(symbol: string): SymbolConfig | undefined {
  return SUPPORTED_SYMBOLS.find(s => s.symbol === symbol)
}

export function getBinanceSymbol(symbol: string): string | undefined {
  const config = getSymbolConfig(symbol)
  return config?.binanceSymbol
}
