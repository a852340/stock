/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment */
import { QuoteData } from '../types/quote'
import { defaultConfig, getOkxSymbol } from '../config/dataSourceConfig'

type TickerCallback = (data: QuoteData) => void

class CryptoDataFetcher {
  private subscribedSymbols: Set<string> = new Set()
  private callbacks: Map<string, TickerCallback[]> = new Map()
  private messageHandler: ((data: any) => void) | null = null
  private initialized = false

  constructor(_config = defaultConfig.crypto) {}

  private checkApiAvailable(): boolean {
    if (typeof window === 'undefined') {
      console.error('[CryptoDataFetcher] window is not available')
      return false
    }
    // @ts-ignore
    if (!window.cryptoWS) {
      console.error('[CryptoDataFetcher] cryptoWS API not available')
      return false
    }
    return true
  }

  private async initialize(): Promise<void> {
    if (this.initialized) {
      return
    }

    if (!this.checkApiAvailable()) {
      throw new Error('cryptoWS API not available')
    }

    console.log('[CryptoDataFetcher] Initializing message listener for OKX')
    this.messageHandler = (data: any) => {
      console.log('[CryptoDataFetcher] Received crypto ticker:', data.symbol)
      const originalSymbol = Array.from(this.callbacks.keys()).find(
        sym => getOkxSymbol(sym)?.toUpperCase() === data.symbol.toUpperCase()
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

    // @ts-ignore
    window.cryptoWS.on('crypto-ticker-update', this.messageHandler)
    this.initialized = true
  }

  async subscribe(symbol: string, callback: TickerCallback): Promise<void> {
    const okxSymbol = getOkxSymbol(symbol)
    if (!okxSymbol) {
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

    if (!this.checkApiAvailable()) {
      throw new Error('cryptoWS API not available')
    }

    console.log('[CryptoDataFetcher] Sending subscribe to main process:', symbol)
    try {
      // @ts-ignore
      await window.cryptoWS.subscribe(symbol)
      this.subscribedSymbols.add(symbol)
      console.log('[CryptoDataFetcher] Successfully subscribed to:', symbol)
    } catch (error) {
      console.error('[CryptoDataFetcher] Subscribe failed for', symbol, ':', error)
      throw error
    }
  }

  unsubscribe(symbol: string) {
    const okxSymbol = getOkxSymbol(symbol)
    if (!okxSymbol || !this.subscribedSymbols.has(symbol)) {
      return
    }

    console.log('[CryptoDataFetcher] Unsubscribe request for:', symbol)

    // @ts-ignore
    if (!window.cryptoWS) {
      return
    }

    // @ts-ignore
    window.cryptoWS.unsubscribe(symbol).catch((err: any) => {
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
    // @ts-ignore
    if (this.messageHandler && window.cryptoWS) {
      // @ts-ignore
      window.cryptoWS.off('crypto-ticker-update', this.messageHandler)
      this.messageHandler = null
    }

    // @ts-ignore
    if (window.cryptoWS) {
      // @ts-ignore
      window.cryptoWS.disconnect().catch((err: any) => {
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
    if (!this.checkApiAvailable()) {
      return false
    }
    try {
      // @ts-ignore
      return await window.cryptoWS.isConnected()
    } catch (error) {
      console.error('[CryptoDataFetcher] isConnected check failed:', error)
      return false
    }
  }
}

export const cryptoDataFetcher = new CryptoDataFetcher()
