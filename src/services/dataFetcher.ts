import { QuoteData } from '../types/quote'
import { getSymbolConfig } from '../config/dataSourceConfig'
import { cryptoDataFetcher } from './cryptoDataFetcher'
import { stockDataFetcher } from './stockDataFetcher'

type DataCallback = (data: QuoteData) => void

class DataFetcher {
  async getQuoteData(symbol: string): Promise<QuoteData> {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      throw new Error(`Unsupported symbol: ${symbol}`)
    }

    if (config.type === 'crypto') {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Timeout waiting for crypto data'))
        }, 10000)

        cryptoDataFetcher.subscribe(symbol, (data) => {
          clearTimeout(timeout)
          resolve(data)
        }).catch(reject)
      })
    } else {
      return stockDataFetcher.fetchStockData(symbol)
    }
  }

  async subscribe(symbol: string, callback: DataCallback): Promise<void> {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      throw new Error(`Unsupported symbol: ${symbol}`)
    }

    if (config.type === 'crypto') {
      await cryptoDataFetcher.subscribe(symbol, callback)
    } else {
      stockDataFetcher.subscribe(symbol, callback)
    }
  }

  unsubscribe(symbol: string) {
    const config = getSymbolConfig(symbol)
    
    if (!config) {
      return
    }

    if (config.type === 'crypto') {
      cryptoDataFetcher.unsubscribe(symbol)
    } else {
      stockDataFetcher.unsubscribe(symbol)
    }
  }

  updateStockPollingInterval(interval: number) {
    stockDataFetcher.updatePollingInterval(interval)
  }

  clearStockCache() {
    stockDataFetcher.clearCache()
  }

  disconnect() {
    cryptoDataFetcher.disconnect()
    stockDataFetcher.stopAll()
  }

  isConnected(): boolean {
    // Note: This is now async in cryptoDataFetcher, but keeping sync for backwards compatibility
    // The actual connection check happens via IPC in the background
    return true
  }

  getActiveSubscriptions(): { crypto: string[], stock: string[] } {
    return {
      crypto: cryptoDataFetcher.getSubscribedSymbols(),
      stock: stockDataFetcher.getPollingSymbols()
    }
  }
}

export const dataFetcher = new DataFetcher()
