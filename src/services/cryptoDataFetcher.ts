import { QuoteData } from '../types/quote'
import { defaultConfig, getBinanceSymbol } from '../config/dataSourceConfig'

type TickerCallback = (data: QuoteData) => void

declare global {
  interface Window {
    cryptoWS?: {
      subscribe: (symbol: string) => Promise<boolean>
      unsubscribe: (symbol: string) => Promise<boolean>
      disconnect: () => Promise<boolean>
      isConnected: () => Promise<boolean>
      on: (channel: string, listener: (data: any) => void) => void
      off: (channel: string, listener: any) => void
    }
  }
}

class CryptoDataFetcher {
  private subscribedSymbols: Set<string> = new Set()
  private callbacks: Map<string, TickerCallback[]> = new Map()
  private messageHandler: ((data: any) => void) | null = null
  private initialized = false

  constructor(_config = defaultConfig.crypto) {}

  private async initialize(): Promise<void> {
    if (this.initialized) {
      return
    }

    if (!window.cryptoWS) {
      console.error('[CryptoDataFetcher] cryptoWS API not available')
      return
    }

    console.log('[CryptoDataFetcher] Initializing message listener')
    this.messageHandler = (data: any) => {
      console.log('[CryptoDataFetcher] Received crypto ticker:', data.symbol)
      const originalSymbol = Array.from(this.callbacks.keys()).find(
        sym => getBinanceSymbol(sym)?.toLowerCase() === data.symbol.toLowerCase()
      )
      
      if (originalSymbol) {
        const quoteData: QuoteData = {
          symbol: data.symbol,
          name: data.name,
          price: data.price,
          change24h: data.change24h,
          changeAmount: data.changeAmount,
          volume: data.volume,
          marketCap: data.marketCap,
          type: data.type,
          dataSource: data.dataSource,
          isRealtime: data.isRealtime,
          lastUpdate: data.lastUpdate
        }
        console.log('[CryptoDataFetcher] Notifying callbacks for', originalSymbol)
        this.notifyCallbacks(originalSymbol, quoteData)
      }
    }

    window.cryptoWS.on('crypto-ticker-update', this.messageHandler)
    this.initialized = true
  }

  async subscribe(symbol: string, callback: TickerCallback): Promise<void> {
    const binanceSymbol = getBinanceSymbol(symbol)
    if (!binanceSymbol) {
      throw new Error(`Unsupported symbol: ${symbol}`)
    }

    console.log('[CryptoDataFetcher] Subscribe request for:', symbol)

    if (!this.callbacks.has(symbol)) {
      this.callbacks.set(symbol, [])
    }
    this.callbacks.get(symbol)!.push(callback)

    if (this.subscribedSymbols.has(symbol)) {
      console.log('[CryptoDataFetcher] Already subscribed to:', symbol)
      return
    }

    await this.initialize()

    if (!window.cryptoWS) {
      throw new Error('cryptoWS API not available')
    }

    console.log('[CryptoDataFetcher] Sending subscribe to main process:', symbol)
    await window.cryptoWS.subscribe(symbol)
    this.subscribedSymbols.add(symbol)
  }

  unsubscribe(symbol: string) {
    const binanceSymbol = getBinanceSymbol(symbol)
    if (!binanceSymbol || !this.subscribedSymbols.has(symbol)) {
      return
    }

    console.log('[CryptoDataFetcher] Unsubscribe request for:', symbol)

    if (!window.cryptoWS) {
      return
    }

    window.cryptoWS.unsubscribe(symbol).catch(err => {
      console.error('[CryptoDataFetcher] Unsubscribe error:', err)
    })

    this.subscribedSymbols.delete(symbol)
    this.callbacks.delete(symbol)
  }

  private notifyCallbacks(symbol: string, data: QuoteData) {
    const callbacks = this.callbacks.get(symbol)
    if (callbacks) {
      console.log('[CryptoDataFetcher] Calling', callbacks.length, 'callbacks for', symbol)
      callbacks.forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error('[CryptoDataFetcher] Callback error:', error)
        }
      })
    }
  }

  disconnect() {
    console.log('[CryptoDataFetcher] Disconnect')
    if (this.messageHandler && window.cryptoWS) {
      window.cryptoWS.off('crypto-ticker-update', this.messageHandler)
      this.messageHandler = null
    }

    if (window.cryptoWS) {
      window.cryptoWS.disconnect().catch(err => {
        console.error('[CryptoDataFetcher] Disconnect error:', err)
      })
    }

    this.subscribedSymbols.clear()
    this.callbacks.clear()
    this.initialized = false
  }

  getSubscribedSymbols(): string[] {
    return Array.from(this.subscribedSymbols)
  }

  async isConnected(): Promise<boolean> {
    if (!window.cryptoWS) {
      return false
    }
    return window.cryptoWS.isConnected()
  }
}

export const cryptoDataFetcher = new CryptoDataFetcher()
