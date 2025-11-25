# 公开数据源 API 集成文档

## 概述

本应用集成了免费公开行情数据源，支持加密货币实时数据（WebSocket）和 A股轮询数据（HTTP）。

## 数据源架构

### 1. 加密货币 - 实时 WebSocket

**数据源**: Binance WebSocket API
- 完全免费，无需 API 密钥
- 毫秒级延迟的实时推送
- 支持 24+ 种加密货币（BTC, ETH, SOL, XRP, ADA, DOGE 等）
- 自动重连机制
- 心跳检测保持连接

**技术实现**:
- WebSocket 长连接订阅 ticker 流
- 订阅格式: `<symbol>@ticker` (例如: `btcusdt@ticker`)
- 实时推送价格、24h涨跌幅、成交量等数据

### 2. A股 - HTTP 轮询

**数据源**: 腾讯财经 API
- 完全免费，无需 API 密钥
- 默认 5 秒轮询间隔（可配置：2s/5s/10s/30s）
- 支持 10+ 只 A股（浦发银行、贵州茅台、五粮液等）
- 智能缓存机制避免重复请求

**技术实现**:
- 使用 axios 定时 HTTP 请求
- 缓存机制：轮询间隔内返回缓存数据
- 错误处理和自动重试

## 支持的标的列表

### 加密货币（24种）
BTC, ETH, SOL, XRP, ADA, DOGE, SHIB, PEPE, LINK, AVAX, MATIC, OP, ARB, NEAR, FTM, ATOM, ICP, SAND, MANA, GALA, APT, BLUR, SEI, JUP

### A股（10只）
- 600000 浦发银行
- 600519 贵州茅台
- 000858 五粮液
- 600036 招商银行
- 601398 工商银行
- 601988 中国银行
- 603160 汇顶科技
- 000651 格力电器
- 000333 美的集团
- 601766 中国中车

## 目录结构

```
src/
├── config/
│   └── dataSourceConfig.ts      # 数据源配置和支持的标的列表
├── types/
│   └── quote.ts                 # 统一数据类型定义
├── services/
│   ├── cryptoDataFetcher.ts     # 加密货币 WebSocket 数据获取
│   ├── stockDataFetcher.ts      # A股 HTTP 轮询数据获取
│   └── dataFetcher.ts           # 统一数据获取接口
├── hooks/
│   └── useDataFeed.ts           # React Hook 集成数据订阅
├── components/
│   ├── StockList.tsx            # 股票列表（显示实时价格）
│   ├── MainContent.tsx          # 主内容区（详细数据）
│   └── Settings.tsx             # 设置面板（轮询间隔配置）
└── store/
    └── stockStore.ts            # Zustand 状态管理
```

## 核心功能

### 1. 统一数据接口

```typescript
interface QuoteData {
  symbol: string           // 标的代码
  name: string            // 标的名称
  price: number           // 当前价格
  change24h: number       // 24h涨跌幅 %
  changeAmount?: number   // 涨跌额
  marketCap?: number      // 市值/成交额
  volume?: number         // 成交量
  type: 'crypto' | 'stock'
  dataSource: 'binance' | 'tencent' | 'sina'
  isRealtime: boolean     // 是否实时数据
  lastUpdate: number      // 最后更新时间戳
}
```

### 2. 订阅管理

```typescript
// 订阅数据
dataFetcher.subscribe(symbol, (data) => {
  console.log(data)
})

// 取消订阅
dataFetcher.unsubscribe(symbol)

// 更新轮询间隔
dataFetcher.updateStockPollingInterval(10000) // 10秒

// 断开所有连接
dataFetcher.disconnect()
```

### 3. 配置系统

用户可以在设置面板中配置：
- A股轮询间隔（2秒/5秒/10秒/30秒）
- 数据源信息展示

配置保存在 Zustand store 中，重启应用后保持。

## 特性说明

### WebSocket 实时推送（加密货币）
- ✅ 毫秒级延迟
- ✅ 自动重连（5秒后重试）
- ✅ 心跳检测（30秒间隔）
- ✅ 订阅/取消订阅管理
- ✅ 多标的同时订阅
- ✅ 连接状态监控

### HTTP 轮询（A股）
- ✅ 可配置轮询间隔
- ✅ 智能缓存机制
- ✅ 避免重复请求
- ✅ 错误处理和重试
- ✅ 轮询状态监控
- ✅ 支持腾讯/新浪财经 API

### UI 功能
- ✅ 实时数据指示器（绿色闪烁点）
- ✅ 标的类型标签（加密/A股）
- ✅ 数据源显示
- ✅ 更新时间显示
- ✅ 涨跌颜色标识（绿涨红跌）
- ✅ 设置面板配置轮询间隔

## 使用方法

### 1. 启动应用

```bash
npm run dev
```

### 2. 运行数据获取测试

```bash
npm run test:datafetcher
```

测试脚本会：
- 订阅 BTC（WebSocket 实时）
- 订阅 600000（HTTP 轮询）
- 显示接收到的数据
- 显示活跃订阅列表
- 10秒后自动断开

### 3. 配置轮询间隔

1. 点击右上角"⚙️ 设置"按钮
2. 选择 A股轮询间隔（2s/5s/10s/30s）
3. 点击"保存设置"
4. 数据会立即使用新的轮询间隔更新

## 错误处理

### WebSocket 错误
- 连接失败：自动重连（5秒后）
- 消息解析错误：记录日志，继续运行
- 网络断开：自动重连机制

### HTTP 轮询错误
- 请求超时：使用缓存数据（如果有）
- API 限流：降低请求频率
- 解析错误：记录日志，跳过该次更新

## 性能优化

1. **缓存机制**: A股数据在轮询间隔内使用缓存，避免重复请求
2. **按需订阅**: 只订阅用户添加到列表的标的
3. **资源清理**: 组件卸载时自动取消订阅，释放资源
4. **连接复用**: WebSocket 连接复用，多个标的共享同一连接

## 验收标准

✅ 加密货币支持 WebSocket 实时推送（毫秒级延迟）  
✅ A股支持可配置轮询间隔（默认 5 秒）  
✅ 两种数据源返回统一数据格式  
✅ 缓存机制正常工作  
✅ 网络异常自动处理和重连  
✅ 用户可在 UI 中配置轮询间隔  
✅ 至少 20 种加密货币和 10 只 A股支持  

## 扩展性

### 添加新的加密货币

在 `dataSourceConfig.ts` 中添加：

```typescript
{ 
  symbol: 'NEW', 
  name: 'New Coin', 
  type: 'crypto', 
  binanceSymbol: 'newusdt' 
}
```

### 添加新的 A股

在 `dataSourceConfig.ts` 中添加：

```typescript
{ 
  symbol: '000001', 
  name: '平安银行', 
  type: 'stock' 
}
```

### 切换数据源

修改 `defaultConfig` 中的 `stock.dataSource` 为 `'sina'` 或 `'tencent'`

## 技术栈

- **WebSocket 客户端**: ws (v8.x)
- **HTTP 客户端**: axios (v1.x)
- **状态管理**: Zustand (v5.x)
- **React Hooks**: 自定义 useDataFeed hook
- **TypeScript**: 完整类型支持

## 注意事项

1. **网络环境**: 需要能访问 Binance 和腾讯财经 API
2. **轮询频率**: 建议不要设置过短的轮询间隔（<2秒）
3. **数据延迟**: A股数据有 2-5 秒延迟，非真正实时数据
4. **API 限制**: 免费 API 可能有访问频率限制

## 故障排查

### WebSocket 连接失败
- 检查网络连接
- 确认能访问 wss://stream.binance.com:9443
- 查看浏览器控制台错误信息

### A股数据不更新
- 检查轮询间隔设置
- 确认能访问腾讯财经 API (qt.gtimg.cn)
- 查看网络请求是否成功

### 数据显示异常
- 检查标的代码是否正确
- 确认标的在支持列表中
- 查看控制台日志
