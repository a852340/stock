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
  { symbol: 'SOL', name: 'Solana', type: 'crypto', binanceSymbol: 'solusdt' },
  { symbol: 'XRP', name: 'Ripple', type: 'crypto', binanceSymbol: 'xrpusdt' },
  { symbol: 'ADA', name: 'Cardano', type: 'crypto', binanceSymbol: 'adausdt' },
  { symbol: 'DOGE', name: 'Dogecoin', type: 'crypto', binanceSymbol: 'dogeusdt' },
  { symbol: 'SHIB', name: 'Shiba Inu', type: 'crypto', binanceSymbol: 'shibusdt' },
  { symbol: 'PEPE', name: 'Pepe', type: 'crypto', binanceSymbol: 'pepeusdt' },
  { symbol: 'LINK', name: 'Chainlink', type: 'crypto', binanceSymbol: 'linkusdt' },
  { symbol: 'AVAX', name: 'Avalanche', type: 'crypto', binanceSymbol: 'avaxusdt' },
  { symbol: 'MATIC', name: 'Polygon', type: 'crypto', binanceSymbol: 'maticusdt' },
  { symbol: 'OP', name: 'Optimism', type: 'crypto', binanceSymbol: 'opusdt' },
  { symbol: 'ARB', name: 'Arbitrum', type: 'crypto', binanceSymbol: 'arbusdt' },
  { symbol: 'NEAR', name: 'NEAR Protocol', type: 'crypto', binanceSymbol: 'nearusdt' },
  { symbol: 'FTM', name: 'Fantom', type: 'crypto', binanceSymbol: 'ftmusdt' },
  { symbol: 'ATOM', name: 'Cosmos', type: 'crypto', binanceSymbol: 'atomusdt' },
  { symbol: 'ICP', name: 'Internet Computer', type: 'crypto', binanceSymbol: 'icpusdt' },
  { symbol: 'SAND', name: 'The Sandbox', type: 'crypto', binanceSymbol: 'sandusdt' },
  { symbol: 'MANA', name: 'Decentraland', type: 'crypto', binanceSymbol: 'manausdt' },
  { symbol: 'GALA', name: 'Gala', type: 'crypto', binanceSymbol: 'galausdt' },
  { symbol: 'APT', name: 'Aptos', type: 'crypto', binanceSymbol: 'aptusdt' },
  { symbol: 'BLUR', name: 'Blur', type: 'crypto', binanceSymbol: 'blurusdt' },
  { symbol: 'SEI', name: 'Sei', type: 'crypto', binanceSymbol: 'seiusdt' },
  { symbol: 'JUP', name: 'Jupiter', type: 'crypto', binanceSymbol: 'jupusdt' },
  
  // A-shares
  { symbol: '600000', name: '浦发银行', type: 'stock' },
  { symbol: '600519', name: '贵州茅台', type: 'stock' },
  { symbol: '000858', name: '五粮液', type: 'stock' },
  { symbol: '600036', name: '招商银行', type: 'stock' },
  { symbol: '601398', name: '工商银行', type: 'stock' },
  { symbol: '601988', name: '中国银行', type: 'stock' },
  { symbol: '603160', name: '汇顶科技', type: 'stock' },
  { symbol: '000651', name: '格力电器', type: 'stock' },
  { symbol: '000333', name: '美的集团', type: 'stock' },
  { symbol: '601766', name: '中国中车', type: 'stock' }
]

export function getSymbolConfig(symbol: string): SymbolConfig | undefined {
  return SUPPORTED_SYMBOLS.find(s => s.symbol === symbol)
}

export function getBinanceSymbol(symbol: string): string | undefined {
  const config = getSymbolConfig(symbol)
  return config?.binanceSymbol
}
