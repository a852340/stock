import { useStockStore, Stock } from '../store/stockStore'

export const StockList: React.FC = () => {
  const { stocks, selectedStock, setSelectedStock } = useStockStore()

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock)
  }

  const formatPrice = (price?: number) => {
    if (price === undefined) return '-'
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    })
  }

  const formatPercent = (percent?: number) => {
    if (percent === undefined) return '-'
    const sign = percent >= 0 ? '+' : ''
    return `${sign}${percent.toFixed(2)}%`
  }

  const getChangeColor = (percent?: number) => {
    if (percent === undefined) return 'text-dark-textSecondary'
    return percent >= 0 ? 'text-green-500' : 'text-red-500'
  }

  return (
    <div className="stock-sidebar w-80">
      <div className="p-4 border-b border-dark-border">
        <h2 className="text-lg font-semibold text-dark-text">标的列表</h2>
        <p className="text-xs text-dark-textSecondary mt-1">点击选择要查看的股票</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {stocks.map((stock) => (
          <div
            key={stock.code}
            className={`p-3 border-b border-dark-border cursor-pointer transition-colors hover:bg-dark-bgLight ${
              selectedStock?.code === stock.code ? 'bg-dark-bgLight' : ''
            }`}
            onClick={() => handleStockClick(stock)}
          >
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="text-sm font-semibold text-dark-text flex items-center gap-2">
                  {stock.code}
                  {stock.isRealtime && (
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" title="实时数据"></span>
                  )}
                </div>
                <div className="text-xs text-dark-textSecondary">{stock.name}</div>
              </div>
              {stock.type && (
                <span className={`text-xs px-2 py-0.5 rounded ${
                  stock.type === 'crypto' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {stock.type === 'crypto' ? '加密' : 'A股'}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium text-dark-text">
                {formatPrice(stock.price)}
              </div>
              <div className={`text-xs font-medium ${getChangeColor(stock.changePercent)}`}>
                {formatPercent(stock.changePercent)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-dark-border">
        <div className="text-xs text-dark-textSecondary">
          共 {stocks.length} 个标的
        </div>
      </div>
    </div>
  )
}