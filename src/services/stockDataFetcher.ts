import axios from 'axios'
import { QuoteData, BarData, IntradayData } from '../types/quote'
import { defaultConfig } from '../config/dataSourceConfig'

interface StockCache {
  data: QuoteData
  timestamp: number
}

interface IntradayCache {
  data: IntradayData
  timestamp: number
}

type TickerCallback = (data: QuoteData) => void
type IntradayCallback = (data: BarData) => void

class StockDataFetcher {
  private cache: Map<string, StockCache> = new Map()
  private intradayCache: Map<string, IntradayCache> = new Map()
  private pollIntervals: Map<string, NodeJS.Timeout> = new Map()
  private intradayIntervals: Map<string, NodeJS.Timeout> = new Map()
  private callbacks: Map<string, TickerCallback[]> = new Map()
  private intradayCallbacks: Map<string, IntradayCallback[]> = new Map()
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

  async getIntradayData(symbol: string): Promise<IntradayData> {
    const cached = this.intradayCache.get(symbol)
    const now = Date.now()

    if (cached && (now - cached.timestamp) < 60000) {
      return cached.data
    }

    try {
      const bars = await this.fetchIntradayBars(symbol)
      const data: IntradayData = {
        symbol,
        bars,
        lastUpdate: now
      }

      this.intradayCache.set(symbol, {
        data,
        timestamp: now
      })

      return data
    } catch (error) {
      console.error(`Failed to fetch intraday data for ${symbol}:`, error)

      if (cached) {
        return cached.data
      }

      throw error
    }
  }

  private async fetchIntradayBars(symbol: string): Promise<BarData[]> {
    if (this.config.dataSource === 'tencent') {
      return this.fetchIntradayFromTencent(symbol)
    } else {
      return this.fetchIntradayFromSina(symbol)
    }
  }

  private async fetchIntradayFromTencent(symbol: string): Promise<BarData[]> {
    const market = symbol === '000001' || symbol.startsWith('6') ? 'sh' : 'sz'
    const fullSymbol = `${market}${symbol}`
    
    const url = `https://ifzq.gtimg.cn/appstock/app/fqkline/get?param=${fullSymbol},day,1,`
    
    try {
      const response = await axios.get(url, {
        timeout: 5000,
        headers: {
          'Referer': 'https://stockapp.finance.qq.com'
        },
        responseType: 'json'
      })

      const data = response.data
      if (!data || data.code !== 0) {
        throw new Error('Invalid response from Tencent intraday API')
      }

      if (!data.data || !data.data[fullSymbol]) {
        throw new Error('No intraday data in Tencent response')
      }

      const stockData = data.data[fullSymbol]
      if (!stockData.day || stockData.day.length === 0) {
        return []
      }

      return stockData.day.map((bar: string[]) => {
        const time = bar[0]
        const open = parseFloat(bar[1])
        const close = parseFloat(bar[2])
        const high = parseFloat(bar[3])
        const low = parseFloat(bar[4])
        const volume = parseFloat(bar[5])

        return {
          time,
          open,
          high,
          low,
          close,
          volume
        }
      })
    } catch (error) {
      console.error('Tencent intraday fetch error:', error)
      return []
    }
  }

  private async fetchIntradayFromSina(symbol: string): Promise<BarData[]> {
    const market = symbol === '000001' || symbol.startsWith('6') ? 'sh' : 'sz'
    const fullSymbol = `${market}${symbol}`
    
    const url = `https://vip.stock.finance.sina.com.cn/q_gn/api/extral.php?symbol=${fullSymbol}&bdate=&edate=&param=&type=1&resolution=1&_s=pc`
    
    try {
      const response = await axios.get(url, {
        timeout: 5000,
        headers: {
          'Referer': 'https://finance.sina.com.cn'
        },
        responseType: 'json'
      })

      const data = response.data
      if (!data || !data.t || !data.o) {
        return []
      }

      const bars: BarData[] = []
      for (let i = 0; i < data.t.length; i++) {
        bars.push({
          time: data.t[i],
          open: data.o[i],
          high: data.h[i],
          low: data.l[i],
          close: data.c[i],
          volume: data.v?.[i]
        })
      }

      return bars
    } catch (error) {
      console.error('Sina intraday fetch error:', error)
      return []
    }
  }

  subscribeIntraday(symbol: string, callback: IntradayCallback) {
    if (!this.intradayCallbacks.has(symbol)) {
      this.intradayCallbacks.set(symbol, [])
    }
    this.intradayCallbacks.get(symbol)!.push(callback)

    if (!this.intradayIntervals.has(symbol)) {
      this.startIntradayPolling(symbol)
    }
  }

  private startIntradayPolling(symbol: string) {
    const poll = async () => {
      try {
        const data = await this.getIntradayData(symbol)
        if (data.bars.length > 0) {
          const lastBar = data.bars[data.bars.length - 1]
          this.notifyIntradayCallbacks(symbol, lastBar)
        }
      } catch (error) {
        console.error(`Intraday polling error for ${symbol}:`, error)
      }
    }

    poll()

    const interval = setInterval(poll, 60000)
    this.intradayIntervals.set(symbol, interval)
  }

  unsubscribeIntraday(symbol: string) {
    const interval = this.intradayIntervals.get(symbol)
    if (interval) {
      clearInterval(interval)
      this.intradayIntervals.delete(symbol)
    }

    this.intradayCallbacks.delete(symbol)
    this.intradayCache.delete(symbol)
  }

  private notifyIntradayCallbacks(symbol: string, data: BarData) {
    const callbacks = this.intradayCallbacks.get(symbol)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  clearCache() {
    this.cache.clear()
    this.intradayCache.clear()
  }

  stopAll() {
    this.pollIntervals.forEach(interval => clearInterval(interval))
    this.intradayIntervals.forEach(interval => clearInterval(interval))
    this.pollIntervals.clear()
    this.intradayIntervals.clear()
    this.callbacks.clear()
    this.intradayCallbacks.clear()
    this.cache.clear()
    this.intradayCache.clear()
  }

  getPollingSymbols(): string[] {
    return Array.from(this.pollIntervals.keys())
  }
}

export const stockDataFetcher = new StockDataFetcher()
