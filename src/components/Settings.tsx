import { useState } from 'react'
import { useStockStore } from '../store/stockStore'
import { dataFetcher } from '../services/dataFetcher'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

export const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const { pollInterval, setPollInterval } = useStockStore()
  const [localInterval, setLocalInterval] = useState(pollInterval / 1000)

  if (!isOpen) return null

  const handleSave = async () => {
    const newInterval = localInterval * 1000
    await setPollInterval(newInterval)
    dataFetcher.updateStockPollingInterval(newInterval)
    dataFetcher.clearStockCache()
    onClose()
  }

  const handleCancel = () => {
    setLocalInterval(pollInterval / 1000)
    onClose()
  }

  const intervals = [2, 5, 10, 30]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-primary border border-dark-border rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-dark-text mb-4">数据源设置</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-dark-text mb-3">
              A股轮询间隔
            </label>
            <div className="grid grid-cols-4 gap-2">
              {intervals.map(interval => (
                <button
                  key={interval}
                  onClick={() => setLocalInterval(interval)}
                  className={`px-4 py-2 rounded transition-colors ${
                    localInterval === interval
                      ? 'bg-blue-500 text-white'
                      : 'bg-dark-bgLight text-dark-text hover:bg-dark-accent'
                  }`}
                >
                  {interval}秒
                </button>
              ))}
            </div>
            <p className="text-xs text-dark-textSecondary mt-2">
              较短的间隔可获得更及时的数据，但会增加网络请求频率
            </p>
          </div>

          <div className="border-t border-dark-border pt-4">
            <h3 className="text-sm font-medium text-dark-text mb-2">数据源说明</h3>
            <div className="space-y-2 text-xs text-dark-textSecondary">
              <div className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1"></span>
                <span>加密货币：使用 Binance WebSocket 实时推送（毫秒级延迟）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1"></span>
                <span>A股：使用腾讯财经 API 轮询（2-5秒延迟）</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCancel}
            className="flex-1 px-4 py-2 bg-dark-bgLight text-dark-text rounded hover:bg-dark-accent transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            保存设置
          </button>
        </div>
      </div>
    </div>
  )
}
