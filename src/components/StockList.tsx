import { useStockStore, Stock } from '../store/stockStore'

export const StockList: React.FC = () => {
  const { stocks, selectedStock, setSelectedStock } = useStockStore()

  const handleStockClick = (stock: Stock) => {
    setSelectedStock(stock)
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
            className={`stock-item ${
              selectedStock?.code === stock.code ? 'active' : ''
            }`}
            onClick={() => handleStockClick(stock)}
          >
            <div className="stock-code">{stock.code}</div>
            <div className="stock-name">{stock.name}</div>
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