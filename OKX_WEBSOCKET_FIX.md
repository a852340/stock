# OKX WebSocket 修复总结

## 问题

OKX WebSocket 连接无法正常工作，无法接收加密货币数据。

## 根本原因

**使用了错误的通道名称**：代码在订阅OKX WebSocket时使用了 `channel: 'ticker'`，但OKX API实际使用的是 `channel: 'tickers'`（复数）。

OKX 返回的错误消息：
```
{
  "event": "error",
  "code": "60018",
  "msg": "Wrong URL or channel:ticker,instId:BTC-USDT doesn't exist. Please use the correct URL, channel and parameters referring to API document."
}
```

## 修复方案

### 1. 更改通道名称

**文件**: `electron/main.ts`

**修改内容**:
- Line 150: Subscribe 消息中将 `channel: 'ticker'` 改为 `channel: 'tickers'`
- Line 293: Unsubscribe 消息中将 `channel: 'ticker'` 改为 `channel: 'tickers'`  
- Line 183: 消息解析中将 `arg?.channel === 'ticker'` 改为 `arg?.channel === 'tickers'`

### 2. 增强诊断日志

在主进程中添加详细的诊断日志，便于排查问题：

- 连接日志：`[OKX] 🔌 Connecting to: wss://wspap.okx.com:8443/ws/v5/public`
- 连接成功：`[OKX] ✅ WebSocket opened - connection established`
- 订阅消息：`[OKX] 📤 Sending subscribe message:` (with JSON payload)
- 收到数据：`[OKX] 📨 Message received, length: ...`
- 解析数据：`[OKX] ✅ Ticker data received for BTC-USDT`
- 发送给渲染进程：`[OKX] 📦 Sending to renderer: {...}`
- 错误信息：`[OKX] ❌ Error details: { message: ..., code: ... }`

### 3. 修复 package.json 配置

将已弃用的 `nodeModulesDir` 改为 `includeSubNodeModules`：
```json
{
  "build": {
    "includeSubNodeModules": true,
    "buildDependenciesFromSource": true,
    ...
  }
}
```

## 验证

修复后的验证结果：

✅ **WebSocket 连接**: 成功连接到 `wss://wspap.okx.com:8443/ws/v5/public`

✅ **订阅消息**: 正确的 OKX 格式
```json
{
  "op": "subscribe",
  "args": [{
    "channel": "tickers",
    "instId": "BTC-USDT"
  }]
}
```

✅ **接收数据**: 成功接收 BTC-USDT ticker 数据
```json
{
  "arg": {
    "channel": "tickers",
    "instId": "BTC-USDT"
  },
  "data": [{
    "instId": "BTC-USDT",
    "last": "87415.5",
    "open24h": "87256.4",
    "high24h": "88400.1",
    "low24h": "85382.7",
    "volCcy24h": "1548781575.389456774",
    "vol24h": "17795.34100776",
    "ts": "1764146921591"
  }]
}
```

✅ **数据处理**: 正确解析和转换数据

✅ **编译**: TypeScript 和 ESLint 通过

## 功能状态

| 功能 | 状态 |
|------|------|
| OKX WebSocket 连接 | ✅ 正常 |
| BTC/ETH 价格数据 | ✅ 正常 |
| 实时数据推送 | ✅ 正常 |
| IPC 通信 | ✅ 正常 |
| 诊断日志 | ✅ 增强 |
| 配置 | ✅ 修复 |

## 使用说明

启动应用后，加密货币功能现在完全可用：

1. 点击"+ 添加标的"
2. 选择 BTC 或 ETH
3. 查看左侧标的列表中的实时价格
4. 选中后在右侧查看详细信息
5. 打开浏览器开发工具 (F12) 查看 [OKX] 诊断日志
