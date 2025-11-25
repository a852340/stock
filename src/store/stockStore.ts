import { create } from 'zustand'

export interface Stock {
  code: string
  name: string
  price?: number
  change?: number
  changePercent?: number
}

interface StockStore {
  stocks: Stock[]
  selectedStock: Stock | null
  setSelectedStock: (stock: Stock | null) => void
  addStock: (stock: Stock) => void
  removeStock: (code: string) => void
}

export const useStockStore = create<StockStore>((set) => ({
  stocks: [
    { code: 'AAPL', name: 'Apple Inc.' },
    { code: 'GOOGL', name: 'Alphabet Inc.' },
    { code: 'MSFT', name: 'Microsoft Corporation' },
    { code: 'TSLA', name: 'Tesla, Inc.' },
    { code: 'AMZN', name: 'Amazon.com, Inc.' },
    { code: 'META', name: 'Meta Platforms, Inc.' },
    { code: 'NVDA', name: 'NVIDIA Corporation' },
    { code: 'JPM', name: 'JPMorgan Chase & Co.' },
  ],
  selectedStock: null,
  setSelectedStock: (stock) => set({ selectedStock: stock }),
  addStock: (stock) => set((state) => ({ 
    stocks: [...state.stocks, stock] 
  })),
  removeStock: (code) => set((state) => ({
    stocks: state.stocks.filter(stock => stock.code !== code),
    selectedStock: state.selectedStock?.code === code ? null : state.selectedStock
  })),
}))