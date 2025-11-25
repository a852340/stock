import Store from 'electron-store'
import { Stock } from '../store/stockStore'

interface StorageData {
  stocks: Stock[]
  pollInterval: number
}

const schema = {
  stocks: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        code: { type: 'string' },
        name: { type: 'string' },
        type: { type: 'string', enum: ['crypto', 'stock'] }
      },
      required: ['code', 'name', 'type']
    },
    default: []
  },
  pollInterval: {
    type: 'number',
    default: 5000
  }
}

class StorageService {
  private store: Store<StorageData>

  constructor() {
    this.store = new Store({
      schema: schema as Store.Schema<StorageData>,
      name: 'app-store'
    })
  }

  getSavedStocks(): Stock[] {
    const stocks = this.store.get('stocks', [])
    return stocks as Stock[]
  }

  saveStocks(stocks: Stock[]): void {
    this.store.set('stocks', stocks)
  }

  getPollInterval(): number {
    return this.store.get('pollInterval', 5000)
  }

  setPollInterval(interval: number): void {
    this.store.set('pollInterval', interval)
  }

  addStock(stock: Stock): void {
    const stocks = this.getSavedStocks()
    const exists = stocks.some(s => s.code === stock.code)
    if (!exists) {
      stocks.push(stock)
      this.saveStocks(stocks)
    }
  }

  removeStock(code: string): void {
    const stocks = this.getSavedStocks()
    const filtered = stocks.filter(s => s.code !== code)
    this.saveStocks(filtered)
  }

  clear(): void {
    this.store.reset()
  }
}

export const storageService = new StorageService()
