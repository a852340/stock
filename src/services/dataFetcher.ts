import { QuoteData } from '../types/quote'
import { getSymbolConfig } from '../config/dataSourceConfig'
import { stockDataFetcher } from './stockDataFetcher'

type DataCallback = (data: QuoteData) => void

class DataFetcher {
  async getQuoteData(symbol: string): Promise<QuoteData> {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      throw new Error(`Unsupported symbol: ${symbol}`)
    }

    return stockDataFetcher.fetchStockData(symbol)
  }

  async subscribe(symbol: string, callback: DataCallback): Promise<void> {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      throw new Error(`Unsupported symbol: ${symbol}`)
    }

    stockDataFetcher.subscribe(symbol, callback)
  }

  unsubscribe(symbol: string) {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      return
    }

    stockDataFetcher.unsubscribe(symbol)
  }

  updateStockPollingInterval(interval: number) {
    stockDataFetcher.updatePollingInterval(interval)
  }

  clearStockCache() {
    stockDataFetcher.clearCache()
  }

  disconnect() {
    stockDataFetcher.stopAll()
  }

  isConnected(): boolean {
    return true
  }

  getActiveSubscriptions(): { stock: string[] } {
    return {
      stock: stockDataFetcher.getPollingSymbols()
    }
  }
}

export const dataFetcher = new DataFetcher()
