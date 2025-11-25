import { useEffect, useMemo } from 'react'
import { useStockStore } from '../store/stockStore'
import { dataFetcher } from '../services/dataFetcher'

export function useDataFeed() {
  const { stocks, updateQuoteData } = useStockStore()
  
  const stockCodes = useMemo(() => stocks.map(s => s.code).join(','), [stocks])

  useEffect(() => {
    stocks.forEach(stock => {
      dataFetcher.subscribe(stock.code, (data) => {
        updateQuoteData(stock.code, data)
      })
    })

    return () => {
      stocks.forEach(stock => {
        dataFetcher.unsubscribe(stock.code)
      })
    }
  }, [stockCodes, stocks, updateQuoteData])

  return {
    isConnected: dataFetcher.isConnected()
  }
}
