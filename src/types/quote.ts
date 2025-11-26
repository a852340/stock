export interface QuoteData {
  symbol: string
  name: string
  price: number
  change24h: number
  changeAmount?: number
  marketCap?: number
  volume?: number
  type: 'crypto' | 'stock'
  dataSource: 'okx' | 'tencent' | 'sina'
  isRealtime: boolean
  lastUpdate: number
}

export interface SymbolConfig {
  symbol: string
  name: string
  type: 'crypto' | 'stock'
  okxSymbol?: string
}

export interface BarData {
  time: number | string
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

export interface IntradayData {
  symbol: string
  bars: BarData[]
  lastUpdate: number
}
