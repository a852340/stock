import axios from 'axios'
import { QuoteData } from '../types/quote'
import { defaultConfig } from '../config/dataSourceConfig'

interface StockCache {
  data: QuoteData
  timestamp: number
}

type TickerCallback = (data: QuoteData) => void

class StockDataFetcher {
  private cache: Map<string, StockCache> = new Map()
  private pollIntervals: Map<string, NodeJS.Timeout> = new Map()
  private callbacks: Map<string, TickerCallback[]> = new Map()
  private config = defaultConfig.stock

  updateConfig(config: Partial<typeof defaultConfig.stock>) {
    this.config = { ...this.config, ...config }
  }

  async fetchStockData(symbol: string): Promise<QuoteData> {
    const cached = this.cache.get(symbol)
    const now = Date.now()

    if (cached && (now - cached.timestamp) < this.config.cacheTimeout) {
      return cached.data
    }

    try {
      let data: QuoteData

      if (this.config.dataSource === 'tencent') {
        data = await this.fetchFromTencent(symbol)
      } else {
        data = await this.fetchFromSina(symbol)
      }

      this.cache.set(symbol, {
        data,
        timestamp: now
      })

      return data
    } catch (error) {
      console.error(`Failed to fetch stock data for ${symbol}:`, error)
      
      if (cached) {
        return cached.data
      }

      throw error
    }
  }

  private async fetchFromTencent(symbol: string): Promise<QuoteData> {
    // Shanghai Composite Index (000001) is a Shanghai market index
    // A-shares starting with 6 are Shanghai, others are Shenzhen
    const market = symbol === '000001' || symbol.startsWith('6') ? 'sh' : 'sz'
    const fullSymbol = `${market}${symbol}`
    
    const url = `https://qt.gtimg.cn/q=${fullSymbol}`
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'Referer': 'https://stockapp.finance.qq.com'
      }
    })

    const data = response.data
    const match = data.match(/="(.+)"/)
    
    if (!match) {
      throw new Error('Invalid response format from Tencent API')
    }

    const parts = match[1].split('~')
    
    if (parts.length < 50) {
      throw new Error('Insufficient data from Tencent API')
    }

    const name = parts[1]
    const price = parseFloat(parts[3])
    const yesterdayClose = parseFloat(parts[4])
    const changeAmount = price - yesterdayClose
    const changePercent = (changeAmount / yesterdayClose) * 100
    const volume = parseFloat(parts[6])
    const marketCap = parseFloat(parts[45])

    return {
      symbol,
      name,
      price,
      change24h: changePercent,
      changeAmount,
      volume,
      marketCap,
      type: 'stock',
      dataSource: 'tencent',
      isRealtime: false,
      lastUpdate: Date.now()
    }
  }

  private async fetchFromSina(symbol: string): Promise<QuoteData> {
    // Shanghai Composite Index (000001) is a Shanghai market index
    // A-shares starting with 6 are Shanghai, others are Shenzhen
    const market = symbol === '000001' || symbol.startsWith('6') ? 'sh' : 'sz'
    const fullSymbol = `${market}${symbol}`
    
    const url = `https://hq.sinajs.cn/list=${fullSymbol}`
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'Referer': 'https://finance.sina.com.cn'
      },
      responseType: 'text'
    })

    const data = response.data
    const match = data.match(/="(.+)"/)
    
    if (!match) {
      throw new Error('Invalid response format from Sina API')
    }

    const parts = match[1].split(',')
    
    if (parts.length < 32) {
      throw new Error('Insufficient data from Sina API')
    }

    const name = parts[0]
    const price = parseFloat(parts[3])
    const yesterdayClose = parseFloat(parts[2])
    const changeAmount = price - yesterdayClose
    const changePercent = (changeAmount / yesterdayClose) * 100
    const volume = parseFloat(parts[8])
    const marketCap = parseFloat(parts[9])

    return {
      symbol,
      name,
      price,
      change24h: changePercent,
      changeAmount,
      volume,
      marketCap,
      type: 'stock',
      dataSource: 'sina',
      isRealtime: false,
      lastUpdate: Date.now()
    }
  }

  subscribe(symbol: string, callback: TickerCallback) {
    if (!this.callbacks.has(symbol)) {
      this.callbacks.set(symbol, [])
    }
    this.callbacks.get(symbol)!.push(callback)

    if (!this.pollIntervals.has(symbol)) {
      this.startPolling(symbol)
    }
  }

  private startPolling(symbol: string) {
    const poll = async () => {
      try {
        const data = await this.fetchStockData(symbol)
        this.notifyCallbacks(symbol, data)
      } catch (error) {
        console.error(`Polling error for ${symbol}:`, error)
      }
    }

    poll()

    const interval = setInterval(poll, this.config.pollInterval)
    this.pollIntervals.set(symbol, interval)
  }

  unsubscribe(symbol: string) {
    const interval = this.pollIntervals.get(symbol)
    if (interval) {
      clearInterval(interval)
      this.pollIntervals.delete(symbol)
    }

    this.callbacks.delete(symbol)
    this.cache.delete(symbol)
  }

  private notifyCallbacks(symbol: string, data: QuoteData) {
    const callbacks = this.callbacks.get(symbol)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  updatePollingInterval(newInterval: number) {
    this.config.pollInterval = newInterval
    
    const symbols = Array.from(this.pollIntervals.keys())
    symbols.forEach(symbol => {
      this.unsubscribe(symbol)
      const callbacks = this.callbacks.get(symbol)
      if (callbacks && callbacks.length > 0) {
        this.startPolling(symbol)
      }
    })
  }

  clearCache() {
    this.cache.clear()
  }

  stopAll() {
    this.pollIntervals.forEach(interval => clearInterval(interval))
    this.pollIntervals.clear()
    this.callbacks.clear()
    this.cache.clear()
  }

  getPollingSymbols(): string[] {
    return Array.from(this.pollIntervals.keys())
  }
}

export const stockDataFetcher = new StockDataFetcher()
