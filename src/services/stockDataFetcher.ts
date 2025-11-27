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

      // Try EastMoney first (akshare approach)
      try {
        data = await this.fetchFromEastMoney(symbol)
        this.cache.set(symbol, {
          data,
          timestamp: now
        })
        return data
      } catch (error) {
        console.warn(`Failed to fetch from EastMoney: ${error}`)
      }

      // Fallback to configured source
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
      timeout: 5000
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

  private async fetchFromEastMoney(symbol: string): Promise<QuoteData> {
    console.log(`[stockDataFetcher] Fetching from EastMoney (akshare stock_zh_a_spot_em): ${symbol}`)
    
    try {
      const spotData = await window.stockApi.getSpotData(symbol)
      
      if (spotData) {
        return spotData as QuoteData
      }
      
      throw new Error('No spot data returned from EastMoney')
    } catch (error) {
      console.error(`[stockDataFetcher] Failed to fetch from EastMoney: ${error}`)
      throw error
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
    console.log(`[stockDataFetcher] 从主进程获取分时数据: ${symbol}`)
    
    try {
      const bars = await window.stockApi.getIntradayData(symbol)
      
      if (bars && bars.length > 0) {
        console.log(`[stockDataFetcher] ✅ 主进程返回 ${bars.length} 根K线: ${symbol}`)
        return bars as BarData[]
      }
      
      console.warn(`[stockDataFetcher] ⚠️ 主进程无法获取分时数据: ${symbol}`)
      return []
    } catch (error) {
      console.error(`[stockDataFetcher] ❌ 获取分时数据失败 (${symbol}):`, error)
      return []
    }
  }

  subscribeIntraday(symbol: string, callback: IntradayCallback) {
    console.log('[stockDataFetcher] Subscribing to intraday updates for:', symbol)
    
    if (!this.intradayCallbacks.has(symbol)) {
      this.intradayCallbacks.set(symbol, [])
    }
    this.intradayCallbacks.get(symbol)!.push(callback)

    if (!this.intradayIntervals.has(symbol)) {
      console.log('[stockDataFetcher] Starting intraday polling for:', symbol)
      this.startIntradayPolling(symbol)
    }
  }

  private startIntradayPolling(symbol: string) {
    const poll = async () => {
      try {
        console.log('[stockDataFetcher] Running intraday poll for:', symbol)
        const data = await this.getIntradayData(symbol)
        if (data.bars.length > 0) {
          const lastBar = data.bars[data.bars.length - 1]
          console.log('[stockDataFetcher] Broadcasting intraday update for:', symbol, 'bar time:', lastBar.time)
          this.notifyIntradayCallbacks(symbol, lastBar)
        } else {
          console.warn('[stockDataFetcher] ⚠️ No bars available in intraday poll for:', symbol)
        }
      } catch (error) {
        console.error('[stockDataFetcher] ❌ Intraday polling error for', symbol, ':', error)
      }
    }

    poll()

    const interval = setInterval(poll, 60000)
    this.intradayIntervals.set(symbol, interval)
    console.log('[stockDataFetcher] Intraday polling started for:', symbol, '- interval: 60000ms')
  }

  unsubscribeIntraday(symbol: string) {
    console.log('[stockDataFetcher] Unsubscribing from intraday updates for:', symbol)
    
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
      console.log('[stockDataFetcher] Notifying', callbacks.length, 'intraday callbacks for:', symbol)
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
