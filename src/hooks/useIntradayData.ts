import { useEffect } from 'react'
import { useStockStore } from '../store/stockStore'
import { dataFetcher } from '../services/dataFetcher'

export function useIntradayData(symbol: string | null) {
  const { updateIntradayData, updateLatestBar } = useStockStore()

  useEffect(() => {
    if (!symbol) {
      console.log('[useIntradayData] No symbol provided, skipping')
      return
    }

    console.log('[useIntradayData] Setting up intraday data for:', symbol)

    let isMounted = true

    const initializeAndSubscribe = async () => {
      try {
        console.log('[useIntradayData] Fetching initial intraday data for:', symbol)
        const intradayData = await dataFetcher.getIntradayData(symbol)
        
        console.log('[useIntradayData] ✅ getIntradayData returned:', {
          symbol,
          barCount: intradayData.bars.length,
          lastUpdate: intradayData.lastUpdate
        })
        
        if (isMounted) {
          console.log('[useIntradayData] Component still mounted, updating store with', intradayData.bars.length, 'bars')
          updateIntradayData(symbol, intradayData.bars)
        } else {
          console.log('[useIntradayData] Component unmounted, discarding data')
        }

        console.log('[useIntradayData] Subscribing to intraday updates for:', symbol)
        dataFetcher.subscribeIntraday(symbol, (bar) => {
          if (isMounted) {
            console.log('[useIntradayData] ✅ Received intraday update for', symbol, ':', {
              time: bar.time,
              open: bar.open,
              close: bar.close,
              volume: bar.volume
            })
            updateLatestBar(symbol, bar)
          } else {
            console.log('[useIntradayData] Received update but component unmounted, ignoring')
          }
        })
      } catch (error) {
        console.error('[useIntradayData] ❌ Error initializing intraday data:', error)
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
