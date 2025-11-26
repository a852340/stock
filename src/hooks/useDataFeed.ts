import { useEffect, useMemo } from 'react'
import { useStockStore } from '../store/stockStore'
import { dataFetcher } from '../services/dataFetcher'

export function useDataFeed() {
  const { stocks, updateQuoteData } = useStockStore()
  
  const stockCodes = useMemo(() => stocks.map(s => s.code).join(','), [stocks])

  useEffect(() => {
    console.log('[useDataFeed] Setting up subscriptions for stocks:', stocks.map(s => s.code))
    
    stocks.forEach(stock => {
      console.log('[useDataFeed] Subscribing to:', stock.code, 'Type:', stock.type)
      
      dataFetcher.subscribe(stock.code, (data) => {
        console.log('[useDataFeed] Received data for', stock.code, ':', {
          price: data.price,
          change24h: data.change24h,
          type: data.type
        })
        updateQuoteData(stock.code, data)
      }).catch((error: Error) => {
        console.error('[useDataFeed] Subscribe error for', stock.code, ':', error)
      })
    })

    return () => {
      console.log('[useDataFeed] Cleaning up subscriptions')
      stocks.forEach(stock => {
        dataFetcher.unsubscribe(stock.code)
      })
    }
  }, [stockCodes, stocks, updateQuoteData])

  return {
    isConnected: dataFetcher.isConnected()
  }
}
