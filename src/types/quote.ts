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
