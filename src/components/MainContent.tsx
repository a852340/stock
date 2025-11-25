import { useStockStore } from '../store/stockStore'

export const MainContent: React.FC = () => {
  const { selectedStock } = useStockStore()

  return (
    <div className="stock-main">
      <div className="border-b border-dark-border p-6">
        <h1 className="text-2xl font-bold text-dark-text">
          {selectedStock ? selectedStock.name : '股票行情应用'}
        </h1>
        {selectedStock && (
          <p className="text-dark-textSecondary mt-2">
            {selectedStock.code} - 实时行情数据
          </p>
        )}
      </div>
      
      <div className="flex-1 p-6">
        {selectedStock ? (
          <div className="space-y-6">
            <div className="bg-dark-primary rounded-lg p-6 border border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text mb-4">
                {selectedStock.code} - {selectedStock.name}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">当前价格</div>
                  <div className="text-2xl font-bold text-dark-text">--</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">涨跌幅</div>
                  <div className="text-2xl font-bold text-dark-text">--</div>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-primary rounded-lg p-6 border border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text mb-4">图表区域</h3>
              <div className="h-64 bg-dark-accent rounded flex items-center justify-center">
                <p className="text-dark-textSecondary">K线图/走势图将在此显示</p>
              </div>
            </div>
            
            <div className="bg-dark-primary rounded-lg p-6 border border-dark-border">
              <h3 className="text-lg font-semibold text-dark-text mb-4">详细数据</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">开盘价</div>
                  <div className="font-mono text-dark-text">--</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">最高价</div>
                  <div className="font-mono text-dark-text">--</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">最低价</div>
                  <div className="font-mono text-dark-text">--</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">成交量</div>
                  <div className="font-mono text-dark-text">--</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">市值</div>
                  <div className="font-mono text-dark-text">--</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-dark-textSecondary">市盈率</div>
                  <div className="font-mono text-dark-text">--</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-dark-primary rounded-lg p-8 border border-dark-border max-w-md">
              <h3 className="text-xl font-semibold text-dark-text mb-4">
                欢迎使用股票行情应用
              </h3>
              <p className="text-dark-textSecondary mb-6">
                请从左侧列表选择一个股票标的开始查看行情数据
              </p>
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-dark-textSecondary">实时行情数据展示</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-dark-textSecondary">专业图表分析工具</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-dark-textSecondary">多股票监控管理</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}