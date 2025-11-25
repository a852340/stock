import WebSocket from 'ws'
import { QuoteData } from '../types/quote'
import { defaultConfig, getBinanceSymbol } from '../config/dataSourceConfig'

interface BinanceTickerData {
  e: string
  E: number
  s: string
  p: string
  P: string
  c: string
  Q: string
  o: string
  h: string
  l: string
  v: string
  q: string
}

type TickerCallback = (data: QuoteData) => void

class CryptoDataFetcher {
  private ws: WebSocket | null = null
  private subscribedSymbols: Set<string> = new Set()
  private callbacks: Map<string, TickerCallback[]> = new Map()
  private reconnectTimeout: NodeJS.Timeout | null = null
  private heartbeatInterval: NodeJS.Timeout | null = null
  private isConnecting = false
  private shouldReconnect = true

  constructor(private config = defaultConfig.crypto) {}

  connect(): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return Promise.resolve()
    }

    this.isConnecting = true
    
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.config.websocketUrl)

        this.ws.on('open', () => {
          console.log('Binance WebSocket connected')
          this.isConnecting = false
          this.startHeartbeat()
          this.resubscribeAll()
          resolve()
        })

        this.ws.on('message', (data: WebSocket.Data) => {
          this.handleMessage(data.toString())
        })

        this.ws.on('error', (error) => {
          console.error('Binance WebSocket error:', error)
          this.isConnecting = false
          reject(error)
        })

        this.ws.on('close', () => {
          console.log('Binance WebSocket closed')
          this.isConnecting = false
          this.stopHeartbeat()
          if (this.shouldReconnect) {
            this.scheduleReconnect()
          }
        })
      } catch (error) {
        this.isConnecting = false
        reject(error)
      }
    })
  }

  private startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.ping()
      }
    }, 30000)
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }
    
    this.reconnectTimeout = setTimeout(() => {
      console.log('Attempting to reconnect...')
      this.connect().catch(err => {
        console.error('Reconnect failed:', err)
      })
    }, 5000)
  }

  private resubscribeAll() {
    const symbols = Array.from(this.subscribedSymbols)
    this.subscribedSymbols.clear()
    symbols.forEach(symbol => {
      const binanceSymbol = getBinanceSymbol(symbol)
      if (binanceSymbol) {
        this.subscribeInternal(binanceSymbol)
      }
    })
  }

  private handleMessage(data: string) {
    try {
      const message = JSON.parse(data) as BinanceTickerData
      
      if (message.e === '24hrTicker') {
        const quoteData = this.parseTickerData(message)
        this.notifyCallbacks(quoteData.symbol, quoteData)
      }
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error)
    }
  }

  private parseTickerData(ticker: BinanceTickerData): QuoteData {
    const price = parseFloat(ticker.c)
    const priceChangePercent = parseFloat(ticker.P)
    const priceChange = parseFloat(ticker.p)
    const volume = parseFloat(ticker.v)
    const quoteVolume = parseFloat(ticker.q)

    const symbol = ticker.s.replace('USDT', '').toUpperCase()

    return {
      symbol,
      name: symbol,
      price,
      change24h: priceChangePercent,
      changeAmount: priceChange,
      volume,
      marketCap: quoteVolume,
      type: 'crypto',
      dataSource: 'binance',
      isRealtime: true,
      lastUpdate: ticker.E
    }
  }

  async subscribe(symbol: string, callback: TickerCallback): Promise<void> {
    const binanceSymbol = getBinanceSymbol(symbol)
    if (!binanceSymbol) {
      throw new Error(`Unsupported symbol: ${symbol}`)
    }

    if (!this.callbacks.has(symbol)) {
      this.callbacks.set(symbol, [])
    }
    this.callbacks.get(symbol)!.push(callback)

    if (this.subscribedSymbols.has(symbol)) {
      return
    }

    await this.connect()
    this.subscribeInternal(binanceSymbol)
    this.subscribedSymbols.add(symbol)
  }

  private subscribeInternal(binanceSymbol: string) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const subscribeMsg = {
        method: 'SUBSCRIBE',
        params: [`${binanceSymbol}@ticker`],
        id: Date.now()
      }
      this.ws.send(JSON.stringify(subscribeMsg))
      console.log(`Subscribed to ${binanceSymbol}`)
    }
  }

  unsubscribe(symbol: string) {
    const binanceSymbol = getBinanceSymbol(symbol)
    if (!binanceSymbol || !this.subscribedSymbols.has(symbol)) {
      return
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      const unsubscribeMsg = {
        method: 'UNSUBSCRIBE',
        params: [`${binanceSymbol}@ticker`],
        id: Date.now()
      }
      this.ws.send(JSON.stringify(unsubscribeMsg))
    }

    this.subscribedSymbols.delete(symbol)
    this.callbacks.delete(symbol)
    console.log(`Unsubscribed from ${binanceSymbol}`)
  }

  private notifyCallbacks(symbol: string, data: QuoteData) {
    const callbacks = this.callbacks.get(symbol)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  disconnect() {
    this.shouldReconnect = false
    this.stopHeartbeat()
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }

    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.subscribedSymbols.clear()
    this.callbacks.clear()
  }

  getSubscribedSymbols(): string[] {
    return Array.from(this.subscribedSymbols)
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }
}

export const cryptoDataFetcher = new CryptoDataFetcher()
