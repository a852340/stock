import { dataFetcher } from '../services/dataFetcher'
import { SUPPORTED_SYMBOLS } from '../config/dataSourceConfig'

async function testDataFetcher() {
  console.log('===== 数据源集成测试 =====\n')

  console.log('支持的标的列表:')
  console.log(`- 加密货币: ${SUPPORTED_SYMBOLS.filter(s => s.type === 'crypto').length} 个`)
  console.log(`- A股: ${SUPPORTED_SYMBOLS.filter(s => s.type === 'stock').length} 个`)
  console.log()

  const cryptoSymbol = 'BTC'
  const stockSymbol = '000001'

  console.log(`测试加密货币 (${cryptoSymbol}) - WebSocket 实时数据:`)
  try {
    dataFetcher.subscribe(cryptoSymbol, (data) => {
      console.log(`✓ 收到 ${data.symbol} 实时数据:`)
      console.log(`  价格: $${data.price.toFixed(2)}`)
      console.log(`  24h涨跌: ${data.change24h.toFixed(2)}%`)
      console.log(`  数据源: ${data.dataSource}`)
      console.log(`  实时: ${data.isRealtime ? '是' : '否'}`)
      console.log(`  延迟: ${Date.now() - data.lastUpdate}ms`)
      console.log()
    })
    console.log(`✓ 订阅成功\n`)
  } catch (error) {
    console.error(`✗ 订阅失败:`, error)
  }

  await new Promise(resolve => setTimeout(resolve, 3000))

  console.log(`测试A股 (${stockSymbol}) - HTTP 轮询数据:`)
  try {
    dataFetcher.subscribe(stockSymbol, (data) => {
      console.log(`✓ 收到 ${data.symbol} 轮询数据:`)
      console.log(`  名称: ${data.name}`)
      console.log(`  价格: ¥${data.price.toFixed(2)}`)
      console.log(`  涨跌: ${data.change24h.toFixed(2)}%`)
      console.log(`  数据源: ${data.dataSource}`)
      console.log(`  实时: ${data.isRealtime ? '是' : '否'}`)
      console.log()
    })
    console.log(`✓ 订阅成功\n`)
  } catch (error) {
    console.error(`✗ 订阅失败:`, error)
  }

  await new Promise(resolve => setTimeout(resolve, 10000))

  console.log('活跃订阅:')
  const subscriptions = dataFetcher.getActiveSubscriptions()
  console.log(`  加密货币: ${subscriptions.crypto.join(', ')}`)
  console.log(`  A股: ${subscriptions.stock.join(', ')}`)
  console.log()

  console.log('测试完成，正在断开连接...')
  dataFetcher.disconnect()
  console.log('✓ 已断开所有连接')

  process.exit(0)
}

testDataFetcher().catch(console.error)
