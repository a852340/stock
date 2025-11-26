import { Stock } from '../store/stockStore'

class StorageService {
  async getSavedStocks(): Promise<Stock[]> {
    try {
      if (!window.electronStore) {
        console.warn('electron-store not available')
        return []
      }
      const stocks = await window.electronStore.get('stocks')
      return stocks ? (stocks as Stock[]) : []
    } catch (e) {
      console.warn('Failed to get saved stocks', e)
      return []
    }
  }

  async saveStocks(stocks: Stock[]): Promise<void> {
    try {
      if (!window.electronStore) {
        console.warn('electron-store not available')
        return
      }
      await window.electronStore.set('stocks', stocks)
    } catch (e) {
      console.warn('Failed to save stocks', e)
    }
  }

  async getPollInterval(): Promise<number> {
    try {
      if (!window.electronStore) {
        return 5000
      }
      const interval = await window.electronStore.get('pollInterval')
      return interval ? (interval as number) : 5000
    } catch (e) {
      console.warn('Failed to get poll interval', e)
      return 5000
    }
  }

  async setPollInterval(interval: number): Promise<void> {
    try {
      if (!window.electronStore) {
        console.warn('electron-store not available')
        return
      }
      await window.electronStore.set('pollInterval', interval)
    } catch (e) {
      console.warn('Failed to set poll interval', e)
    }
  }

  async addStock(stock: Stock): Promise<void> {
    try {
      const stocks = await this.getSavedStocks()
      const exists = stocks.some(s => s.code === stock.code)
      if (!exists) {
        stocks.push(stock)
        await this.saveStocks(stocks)
      }
    } catch (e) {
      console.warn('Failed to add stock', e)
    }
  }

  async removeStock(code: string): Promise<void> {
    try {
      const stocks = await this.getSavedStocks()
      const filtered = stocks.filter(s => s.code !== code)
      await this.saveStocks(filtered)
    } catch (e) {
      console.warn('Failed to remove stock', e)
    }
  }

  async clear(): Promise<void> {
    try {
      if (!window.electronStore) {
        console.warn('electron-store not available')
        return
      }
      await window.electronStore.reset()
    } catch (e) {
      console.warn('Failed to reset storage', e)
    }
  }
}

export const storageService = new StorageService()
