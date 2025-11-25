import { useState, useEffect } from 'react'
import { StockList } from './components/StockList'
import { MainContent } from './components/MainContent'
import { Settings } from './components/Settings'
import { useDataFeed } from './hooks/useDataFeed'
import { dataFetcher } from './services/dataFetcher'
import { useStockStore } from './store/stockStore'
import './App.css'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { loadInitialStocks } = useStockStore()
  useDataFeed()

  useEffect(() => {
    loadInitialStocks()
  }, [loadInitialStocks])

  useEffect(() => {
    return () => {
      dataFetcher.disconnect()
    }
  }, [])

  return (
    <div className="flex h-screen bg-dark">
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between px-6 py-3 border-b border-dark-border bg-dark-primary">
          <h1 className="text-lg font-semibold text-dark-text">股票行情应用</h1>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="px-4 py-2 bg-dark-bgLight text-dark-text rounded hover:bg-dark-accent transition-colors text-sm"
          >
            ⚙️ 设置
          </button>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <StockList />
          <MainContent />
        </div>
      </div>
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  )
}

export default App