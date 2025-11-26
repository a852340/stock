import { useEffect } from 'react'
import { useStockStore } from '../store/stockStore'
import { dataFetcher } from '../services/dataFetcher'

export function useIntradayData(symbol: string | null) {
  const { updateIntradayData, updateLatestBar } = useStockStore()

  useEffect(() => {
    if (!symbol) return

    console.log('[useIntradayData] Setting up intraday data for:', symbol)

    let isMounted = true

    const initializeAndSubscribe = async () => {
      try {
        console.log('[useIntradayData] Fetching initial intraday data for:', symbol)
        const intradayData = await dataFetcher.getIntradayData(symbol)
        
        if (isMounted) {
          console.log('[useIntradayData] Received initial data:', {
            symbol,
            barCount: intradayData.bars.length
          })
          updateIntradayData(symbol, intradayData.bars)
        }

        dataFetcher.subscribeIntraday(symbol, (bar) => {
          if (isMounted) {
            console.log('[useIntradayData] Received intraday update for', symbol, ':', {
              time: bar.time,
              close: bar.close,
              volume: bar.volume
            })
            updateLatestBar(symbol, bar)
          }
        })
      } catch (error) {
        console.error('[useIntradayData] Error initializing intraday data:', error)
      }
    }

    initializeAndSubscribe()

    return () => {
      isMounted = false
      console.log('[useIntradayData] Cleaning up intraday subscription for:', symbol)
      dataFetcher.unsubscribeIntraday(symbol)
    }
  }, [symbol, updateIntradayData, updateLatestBar])
}
