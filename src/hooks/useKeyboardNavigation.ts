import { useEffect } from 'react'
import { useStockStore } from '../store/stockStore'

export function useKeyboardNavigation() {
  const { stocks, selectedStock, setSelectedStock } = useStockStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault()

        if (stocks.length === 0) return

        let nextIndex = 0

        if (selectedStock) {
          const currentIndex = stocks.findIndex(s => s.code === selectedStock.code)
          if (event.key === 'ArrowUp') {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : stocks.length - 1
          } else {
            nextIndex = currentIndex < stocks.length - 1 ? currentIndex + 1 : 0
          }
        } else {
          nextIndex = event.key === 'ArrowDown' ? 0 : stocks.length - 1
        }

        setSelectedStock(stocks[nextIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [stocks, selectedStock, setSelectedStock])
}
