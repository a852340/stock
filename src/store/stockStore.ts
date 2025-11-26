import { create } from 'zustand'
import { QuoteData, BarData } from '../types/quote'
import { SUPPORTED_SYMBOLS } from '../config/dataSourceConfig'
import { storageService } from '../services/storageService'

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
  intradayBars: Map<string, BarData[]>
  pollInterval: number
  setSelectedStock: (stock: Stock | null) => void
  addStock: (stock: Stock) => Promise<void>
  removeStock: (code: string) => Promise<void>
  updateQuoteData: (symbol: string, data: QuoteData) => void
  getQuoteData: (symbol: string) => QuoteData | undefined
  updateIntradayData: (symbol: string, bars: BarData[]) => void
  getIntradayData: (symbol: string) => BarData[] | undefined
  updateLatestBar: (symbol: string, bar: BarData) => void
  setPollInterval: (interval: number) => Promise<void>
  loadInitialStocks: () => Promise<void>
}

const getDefaultStocks = (): Stock[] => {
  return SUPPORTED_SYMBOLS.map(config => ({
    code: config.symbol,
    name: config.name,
    type: config.type
  }))
}

export const useStockStore = create<StockStore>((set, get) => ({
  stocks: getDefaultStocks(),
  selectedStock: null,
  quotesData: new Map(),
  intradayBars: new Map(),
  pollInterval: 5000,
  
  setSelectedStock: (stock) => set({ selectedStock: stock }),
  
  addStock: async (stock) => {
    set((state) => {
      const newStocks = [...state.stocks, stock]
      return { stocks: newStocks }
    })
    await storageService.addStock(stock)
  },
  
  removeStock: async (code) => {
    set((state) => {
      const newQuotesData = new Map(state.quotesData)
      newQuotesData.delete(code)
      
      const newStocks = state.stocks.filter(stock => stock.code !== code)
      
      return {
        stocks: newStocks,
        selectedStock: state.selectedStock?.code === code ? null : state.selectedStock,
        quotesData: newQuotesData
      }
    })
    await storageService.removeStock(code)
  },
  
  updateQuoteData: (symbol, data) => set((state) => {
    console.log('[stockStore] Updating quote data for', symbol, ':', {
      price: data.price,
      change24h: data.change24h,
      type: data.type
    })
    
    const newQuotesData = new Map(state.quotesData)
    newQuotesData.set(symbol, data)
    
    const updatedStocks = state.stocks.map(stock => {
      if (stock.code === symbol) {
        const updatedStock = {
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
        console.log('[stockStore] Updated stock:', symbol, updatedStock)
        return updatedStock
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

  updateIntradayData: (symbol, bars) => set((state) => {
    console.log('[stockStore] Updating intraday data for', symbol, 'bars:', bars.length)
    
    const newIntradayBars = new Map(state.intradayBars)
    newIntradayBars.set(symbol, bars)
    
    return {
      intradayBars: newIntradayBars
    }
  }),

  getIntradayData: (symbol) => {
    return get().intradayBars.get(symbol)
  },

  updateLatestBar: (symbol, bar) => set((state) => {
    console.log('[stockStore] Updating latest bar for', symbol, ':', {
      time: bar.time,
      close: bar.close,
      volume: bar.volume
    })
    
    const bars = state.intradayBars.get(symbol) || []
    const updated = [...bars]
    
    if (updated.length > 0 && updated[updated.length - 1].time === bar.time) {
      updated[updated.length - 1] = bar
    } else {
      updated.push(bar)
    }
    
    const newIntradayBars = new Map(state.intradayBars)
    newIntradayBars.set(symbol, updated)
    
    return {
      intradayBars: newIntradayBars
    }
  }),
  
  setPollInterval: async (interval) => {
    set({ pollInterval: interval })
    await storageService.setPollInterval(interval)
  },
  
  loadInitialStocks: async () => {
    try {
      const saved = await storageService.getSavedStocks()
      if (saved && saved.length > 0) {
        set({ stocks: saved })
      }
      
      const savedInterval = await storageService.getPollInterval()
      if (savedInterval) {
        set({ pollInterval: savedInterval })
      }
    } catch (e) {
      console.warn('Failed to load initial stocks from storage', e)
    }
  }
}))
