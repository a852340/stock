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
    enabled: false,
    useRealtime: false,
    websocketUrl: 'wss://wspap.okx.com:8443/ws/v5/public'
  },
  stock: {
    enabled: true,
    pollInterval: 5000,
    dataSource: 'tencent',
    cacheTimeout: 5000
  }
}

export const SUPPORTED_SYMBOLS: SymbolConfig[] = [
  // A-shares only
  { symbol: '000001', name: '上证指数', type: 'stock' }
]

export function getSymbolConfig(symbol: string): SymbolConfig | undefined {
  return SUPPORTED_SYMBOLS.find(s => s.symbol === symbol)
}

export function getOkxSymbol(symbol: string): string | undefined {
  const config = getSymbolConfig(symbol)
  return config?.okxSymbol
}
