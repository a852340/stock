import { QuoteData, BarData, IntradayData } from '../types/quote'
import { getSymbolConfig } from '../config/dataSourceConfig'
import { stockDataFetcher } from './stockDataFetcher'

type DataCallback = (data: QuoteData) => void
type IntradayCallback = (data: BarData) => void

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

  async getIntradayData(symbol: string): Promise<IntradayData> {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      throw new Error(`Unsupported symbol: ${symbol}`)
    }

    return stockDataFetcher.getIntradayData(symbol)
  }

  subscribeIntraday(symbol: string, callback: IntradayCallback): void {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      throw new Error(`Unsupported symbol: ${symbol}`)
    }

    stockDataFetcher.subscribeIntraday(symbol, callback)
  }

  unsubscribeIntraday(symbol: string): void {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      return
    }

    stockDataFetcher.unsubscribeIntraday(symbol)
  }
}

export const dataFetcher = new DataFetcher()
