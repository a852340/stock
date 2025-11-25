import { useState, useMemo } from 'react'
import { useStockStore, Stock } from '../store/stockStore'
import { SUPPORTED_SYMBOLS } from '../config/dataSourceConfig'

interface AddSymbolDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const AddSymbolDialog: React.FC<AddSymbolDialogProps> = ({ isOpen, onClose }) => {
  const { stocks, addStock } = useStockStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'crypto' | 'stock'>('all')

  const availableSymbols = useMemo(() => {
    const currentCodes = new Set(stocks.map(s => s.code))
    
    return SUPPORTED_SYMBOLS.filter(
      symbol => !currentCodes.has(symbol.symbol)
    ).filter(symbol => {
      const matchesSearch = 
        symbol.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        symbol.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesType = selectedType === 'all' || symbol.type === selectedType
      
      return matchesSearch && matchesType
    })
  }, [searchTerm, selectedType, stocks])

  if (!isOpen) return null

  const handleAddSymbol = (symbol: string) => {
    const config = SUPPORTED_SYMBOLS.find(s => s.symbol === symbol)
    if (config) {
      const newStock: Stock = {
        code: config.symbol,
        name: config.name,
        type: config.type
      }
      addStock(newStock)
    }
  }

  const handleClose = () => {
    setSearchTerm('')
    setSelectedType('all')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-primary border border-dark-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-dark-text mb-4">添加标的</h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              搜索标的
            </label>
            <input
              type="text"
              placeholder="输入代码或名称（如 BTC、ETH、600519...）"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-dark-text placeholder-dark-textSecondary focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark-text mb-2">
              类型筛选
            </label>
            <div className="flex gap-2">
              {(['all', 'crypto', 'stock'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded transition-colors text-sm ${
                    selectedType === type
                      ? 'bg-blue-500 text-white'
                      : 'bg-dark-bgLight text-dark-text hover:bg-dark-accent'
                  }`}
                >
                  {type === 'all' ? '全部' : type === 'crypto' ? '加密货币' : 'A股'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="text-sm font-medium text-dark-text">
            可用标的 ({availableSymbols.length})
          </div>
          
          {availableSymbols.length > 0 ? (
            <div className="max-h-80 overflow-y-auto border border-dark-border rounded p-3 space-y-1">
              {availableSymbols.map((symbol) => (
                <div
                  key={symbol.symbol}
                  className="flex items-center justify-between p-3 hover:bg-dark-bgLight rounded transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div>
                      <div className="font-medium text-dark-text">{symbol.symbol}</div>
                      <div className="text-xs text-dark-textSecondary">{symbol.name}</div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ml-auto ${
                      symbol.type === 'crypto' ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {symbol.type === 'crypto' ? '加密' : 'A股'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleAddSymbol(symbol.symbol)}
                    className="ml-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                  >
                    添加
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-dark-textSecondary">
              {stocks.length === SUPPORTED_SYMBOLS.length ? '所有标的已添加' : '未找到匹配的标的'}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-dark-bgLight text-dark-text rounded hover:bg-dark-accent transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
