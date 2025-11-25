import { create } from 'zustand'
import { QuoteData } from '../types/quote'
import { SUPPORTED_SYMBOLS } from '../config/dataSourceConfig'

export interface Stock {
  code: string
  name: string
  price?: number
  change?: number
  changePercent?: number
  type?: 'crypto' | 'stock'
  dataSource?: string
  isRealtime?: boolean
  lastUpdate?: number
  volume?: number
  marketCap?: number
}

interface StockStore {
  stocks: Stock[]
  selectedStock: Stock | null
  quotesData: Map<string, QuoteData>
  pollInterval: number
  setSelectedStock: (stock: Stock | null) => void
  addStock: (stock: Stock) => void
  removeStock: (code: string) => void
  updateQuoteData: (symbol: string, data: QuoteData) => void
  getQuoteData: (symbol: string) => QuoteData | undefined
  setPollInterval: (interval: number) => void
}

const initialStocks: Stock[] = SUPPORTED_SYMBOLS.slice(0, 15).map(config => ({
  code: config.symbol,
  name: config.name,
  type: config.type
}))

export const useStockStore = create<StockStore>((set, get) => ({
  stocks: initialStocks,
  selectedStock: null,
  quotesData: new Map(),
  pollInterval: 5000,
  
  setSelectedStock: (stock) => set({ selectedStock: stock }),
  
  addStock: (stock) => set((state) => ({ 
    stocks: [...state.stocks, stock] 
  })),
  
  removeStock: (code) => set((state) => {
    const newQuotesData = new Map(state.quotesData)
    newQuotesData.delete(code)
    
    return {
      stocks: state.stocks.filter(stock => stock.code !== code),
      selectedStock: state.selectedStock?.code === code ? null : state.selectedStock,
      quotesData: newQuotesData
    }
  }),
  
  updateQuoteData: (symbol, data) => set((state) => {
    const newQuotesData = new Map(state.quotesData)
    newQuotesData.set(symbol, data)
    
    const updatedStocks = state.stocks.map(stock => {
      if (stock.code === symbol) {
        return {
          ...stock,
          name: data.name,
          price: data.price,
          change: data.changeAmount,
          changePercent: data.change24h,
          type: data.type,
          dataSource: data.dataSource,
          isRealtime: data.isRealtime,
          lastUpdate: data.lastUpdate,
          volume: data.volume,
          marketCap: data.marketCap
        }
      }
      return stock
    })
    
    const updatedSelectedStock = state.selectedStock?.code === symbol
      ? updatedStocks.find(s => s.code === symbol) || state.selectedStock
      : state.selectedStock
    
    return {
      quotesData: newQuotesData,
      stocks: updatedStocks,
      selectedStock: updatedSelectedStock
    }
  }),
  
  getQuoteData: (symbol) => {
    return get().quotesData.get(symbol)
  },
  
  setPollInterval: (interval) => set({ pollInterval: interval })
}))