import { useStockStore } from '../store/stockStore'
import { useIntradayData } from '../hooks/useIntradayData'
import { Chart } from './Chart'

export const MainContent: React.FC = () => {
  const { selectedStock, getIntradayData } = useStockStore()
  
  console.log('[MainContent] Selected stock:', selectedStock?.code)
  
  useIntradayData(selectedStock?.code || null)
  
  const chartData = selectedStock ? getIntradayData(selectedStock.code) : undefined
  
  console.log('[MainContent] Chart data:', chartData?.length, 'bars')
  if (chartData && chartData.length > 0) {
    console.log('[MainContent] First bar:', JSON.stringify(chartData[0]))
    console.log('[MainContent] Last bar:', JSON.stringify(chartData[chartData.length - 1]))
  }

  const formatPrice = (price?: number) => {
    if (price === undefined) return '--'
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    })
  }

  const formatPercent = (percent?: number) => {
    if (percent === undefined) return '--'
    const sign = percent >= 0 ? '+' : ''
    return `${sign}${percent.toFixed(2)}%`
  }

  const formatVolume = (volume?: number) => {
    if (volume === undefined) return '--'
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(2)}B`
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(2)}M`
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(2)}K`
    return volume.toFixed(2)
  }

  const formatMarketCap = (marketCap?: number) => {
    if (marketCap === undefined) return '--'
    if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(2)}M`
    return marketCap.toFixed(2)
  }

  const getChangeColor = (percent?: number) => {
    if (percent === undefined) return 'text-dark-text'
    return percent >= 0 ? 'text-green-500' : 'text-red-500'
  }

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return '--'
    const date = new Date(timestamp)
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <div className="stock-main">
      <div className="border-b border-dark-border p-6">
         <h1 className="text-2xl font-bold text-dark-text">
           {selectedStock ? selectedStock.name : 'A股行情应用'}
         </h1>
         {selectedStock && (
           <div className="flex items-center gap-4 mt-2">
             <p className="text-dark-textSecondary">
               {selectedStock.code} - A股
             </p>
             {selectedStock.dataSource && (
               <span className="text-xs px-2 py-1 rounded bg-dark-bgLight text-dark-textSecondary">
                 数据源: {selectedStock.dataSource}
               </span>
             )}
             {selectedStock.lastUpdate && (
               <span className="text-xs text-dark-textSecondary">
                 更新时间: {formatTime(selectedStock.lastUpdate)}
               </span>
             )}
           </div>
         )}
       </div>
      
      <div className="flex-1 p-6">
        {selectedStock ? (
          <div className="space-y-6">
            <div className="bg-dark-primary rounded-lg p-6 border border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text mb-4 flex items-center gap-2">
                {selectedStock.code} - {selectedStock.name}
                {selectedStock.isRealtime && (
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" title="实时数据"></span>
                )}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">当前价格</div>
                  <div className="text-3xl font-bold text-dark-text">
                    {formatPrice(selectedStock.price)}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">涨跌幅</div>
                  <div className={`text-3xl font-bold ${getChangeColor(selectedStock.changePercent)}`}>
                    {formatPercent(selectedStock.changePercent)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-primary rounded-lg p-6 border border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text mb-4">当日分时图</h3>
              {(() => {
                console.log('[MainContent] Rendering chart section - chartData:', chartData?.length)
                if (chartData && chartData.length > 0) {
                  console.log('[MainContent] Rendering Chart component with', chartData.length, 'bars')
                  return <Chart symbol={selectedStock.code} data={chartData} />
                } else {
                  console.log('[MainContent] No chart data, showing loading message')
                  return (
                    <div className="h-96 bg-dark-accent rounded flex items-center justify-center">
                      <p className="text-dark-textSecondary">加载分时图表数据中...</p>
                    </div>
                  )
                }
              })()}
            </div>
            
            <div className="bg-dark-primary rounded-lg p-6 border border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text mb-4">详细数据</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">涨跌额</div>
                  <div className={`font-mono ${getChangeColor(selectedStock.changePercent)}`}>
                    {selectedStock.change !== undefined ? formatPrice(selectedStock.change) : '--'}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">成交量</div>
                  <div className="font-mono text-dark-text">{formatVolume(selectedStock.volume)}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">市值</div>
                  <div className="font-mono text-dark-text">{formatMarketCap(selectedStock.marketCap)}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">标的类型</div>
                  <div className="font-mono text-dark-text">A股</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">数据模式</div>
                  <div className="font-mono text-dark-text">HTTP 轮询</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">数据源</div>
                  <div className="font-mono text-dark-text uppercase">
                    {selectedStock.dataSource || '--'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-dark-primary rounded-lg p-8 border border-dark-border max-w-md">
              <h3 className="text-xl font-semibold text-dark-text mb-4">
                欢迎使用A股行情应用
              </h3>
              <p className="text-dark-textSecondary mb-6">
                请从左侧列表选择一个A股标的开始查看行情数据
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-dark-textSecondary">实时A股行情数据展示</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-dark-textSecondary">专业图表分析工具</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-dark-textSecondary">A股监控管理</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}