import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import Store from 'electron-store'
import WebSocket from 'ws'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null
let cryptoWs: WebSocket | null = null
const cryptoSubscriptions = new Map<string, Set<string>>()
let cryptoHeartbeatInterval: NodeJS.Timeout | null = null
let cryptoConnecting = false

interface StorageData {
  stocks: unknown[]
  pollInterval: number
}

const schema = {
  stocks: {
    type: 'array',
    default: []
  },
  pollInterval: {
    type: 'number',
    default: 5000
  }
}

const store = new Store<StorageData>({
  schema: schema as Store.Schema<StorageData>,
  name: 'app-store'
})

function connectCryptoWebSocket(): Promise<void> {
  if (cryptoWs?.readyState === WebSocket.OPEN || cryptoConnecting) {
    console.log('[OKX] Already connected or connecting')
    return Promise.resolve()
  }

  cryptoConnecting = true
  const wsUrl = 'wss://wspap.okx.com:8443/ws/v5/public'
  console.log('[OKX] 🔌 Connecting to:', wsUrl)

  return new Promise((resolve, reject) => {
    try {
      cryptoWs = new WebSocket(wsUrl)

      cryptoWs.on('open', () => {
        console.log('[OKX] ✅ WebSocket opened - connection established')
        cryptoConnecting = false
        startCryptoHeartbeat()
        resubscribeAllCrypto()
        resolve()
      })

      cryptoWs.on('message', (data: WebSocket.Data) => {
        console.log('[OKX] 📨 Message received, length:', data.toString().length)
        handleCryptoMessage(data.toString())
      })

      cryptoWs.on('error', (error: unknown) => {
        console.error('[OKX] ❌ WebSocket error:', error)
        const errorDetails = {
          message: error instanceof Error ? error.message : String(error),
          code: error instanceof Error && 'code' in error ? (error as Record<string, unknown>).code : 'unknown'
        }
        console.error('[OKX] Error details:', errorDetails)
        cryptoConnecting = false
        reject(error)
      })

      cryptoWs.on('close', (code, reason) => {
        console.log('[OKX] ❌ WebSocket closed')
        console.log('[OKX] Close details:', { code, reason: reason.toString() })
        cryptoConnecting = false
        stopCryptoHeartbeat()
      })
    } catch (error) {
      console.error('[OKX] ❌ Exception during WebSocket creation:', error)
      cryptoConnecting = false
      reject(error)
    }
  })
}

function startCryptoHeartbeat() {
  cryptoHeartbeatInterval = setInterval(() => {
    if (cryptoWs?.readyState === WebSocket.OPEN) {
      cryptoWs.ping()
      console.log('[Crypto] Heartbeat ping sent')
    }
  }, 30000)
}

function stopCryptoHeartbeat() {
  if (cryptoHeartbeatInterval) {
    clearInterval(cryptoHeartbeatInterval)
    cryptoHeartbeatInterval = null
  }
}

function resubscribeAllCrypto() {
  console.log('[Crypto] Resubscribing to all symbols...')
  cryptoSubscriptions.forEach((symbols) => {
    symbols.forEach(symbol => {
      const okxSymbol = getOkxSymbol(symbol)
      if (okxSymbol) {
        subscribeToCryptoSymbol(okxSymbol)
      }
    })
  })
}

function getOkxSymbol(symbol: string): string | undefined {
  const symbolMap: Record<string, string> = {
    'BTC': 'BTC-USDT',
    'ETH': 'ETH-USDT',
    'SOL': 'SOL-USDT',
    'XRP': 'XRP-USDT',
    'ADA': 'ADA-USDT'
  }
  return symbolMap[symbol]
}

function subscribeToCryptoSymbol(okxSymbol: string) {
  if (cryptoWs?.readyState === WebSocket.OPEN) {
    const subscribeMsg = {
      op: 'subscribe',
      args: [
        {
          channel: 'tickers',
          instId: okxSymbol
        }
      ]
    }
    console.log('[OKX] 📤 Sending subscribe message:')
    console.log('[OKX]', JSON.stringify(subscribeMsg, null, 2))
    cryptoWs.send(JSON.stringify(subscribeMsg))
    console.log(`[OKX] ✅ Subscribe sent for ${okxSymbol}`)
  } else {
    const readyState = cryptoWs?.readyState
    console.warn(`[OKX] ⚠️ Cannot subscribe to ${okxSymbol}`)
    console.warn(`[OKX] WebSocket state: ${readyState}`)
  }
}

function handleCryptoMessage(data: string) {
  try {
    const message = JSON.parse(data) as Record<string, unknown>
    console.log('[OKX] 📨 Parsed message structure:')
    console.log('[OKX]', JSON.stringify(message, null, 2))
    
    const arg = message.arg as Record<string, unknown> | undefined
    const messageData = message.data as unknown[] | undefined
    
    console.log('[OKX] Message analysis:', {
      hasArg: !!arg,
      argChannel: arg?.channel,
      hasData: !!messageData,
      isDataArray: Array.isArray(messageData),
      isTickers: arg?.channel === 'tickers'
    })
    
    if (arg?.channel === 'tickers' && messageData && Array.isArray(messageData)) {
      const tickerData = messageData[0] as Record<string, unknown>
      const instId = String(tickerData.instId)
      
      console.log(`[OKX] ✅ Ticker data received for ${instId}`)
      console.log('[OKX] Ticker fields:', {
        instId,
        last: tickerData.last,
        open24h: tickerData.open24h,
        high24h: tickerData.high24h,
        low24h: tickerData.low24h,
        volCcy24h: tickerData.volCcy24h,
        ts: tickerData.ts
      })
      
      const symbolName = instId.split('-')[0]
      const currentPrice = parseFloat(String(tickerData.last))
      const open24h = parseFloat(String(tickerData.open24h))
      const change24h = ((currentPrice - open24h) / open24h) * 100
      
      const quoteData = {
        symbol: symbolName,
        name: symbolName,
        price: currentPrice,
        change24h: change24h,
        changeAmount: currentPrice - open24h,
        volume: parseFloat(String(tickerData.volCcy24h) || '0'),
        marketCap: undefined,
        type: 'crypto' as const,
        dataSource: 'okx' as const,
        isRealtime: true,
        lastUpdate: parseInt(String(tickerData.ts))
      }
      
      console.log('[OKX] 📦 Sending to renderer:', quoteData)
      
      if (win) {
        win.webContents.send('crypto-ticker-update', quoteData)
        console.log('[OKX] ✅ Data sent to renderer for symbol:', symbolName)
      } else {
        console.warn('[OKX] ⚠️ Window not available, cannot send data')
      }
    } else {
      console.log('[OKX] ℹ️ Non-ticker message, ignoring')
    }
  } catch (error) {
    console.error('[OKX] ❌ Failed to parse WebSocket message:', error)
    console.error('[OKX] Raw data sample:', data.substring(0, 200))
  }
}

function setupIpcHandlers() {
  ipcMain.handle('electron-store-get', (_event, key: string) => {
    return store.get(key)
  })

  ipcMain.handle('electron-store-set', (_event, key: string, value: unknown) => {
    store.set(key, value)
    return true
  })

  ipcMain.handle('electron-store-get-all', () => {
    return store.store
  })

  ipcMain.handle('electron-store-reset', () => {
    store.reset()
    return true
  })

  // Crypto WebSocket handlers
  ipcMain.handle('crypto-subscribe', async (_event, symbol: string) => {
    console.log(`[OKX] 📥 IPC Subscribe request for ${symbol}`)
    if (!cryptoSubscriptions.has('main')) {
      cryptoSubscriptions.set('main', new Set())
    }
    cryptoSubscriptions.get('main')!.add(symbol)
    
    console.log(`[OKX] Connecting WebSocket...`)
    try {
      await connectCryptoWebSocket()
      console.log(`[OKX] ✅ WebSocket connected`)
    } catch (error) {
      console.error(`[OKX] ❌ Failed to connect WebSocket:`, error)
      throw error
    }
    
    const okxSymbol = getOkxSymbol(symbol)
    if (okxSymbol) {
      console.log(`[OKX] Mapping ${symbol} -> ${okxSymbol}`)
      subscribeToCryptoSymbol(okxSymbol)
    } else {
      console.warn(`[OKX] ⚠️ No OKX symbol mapping for ${symbol}`)
    }
    return true
  })

  ipcMain.handle('crypto-unsubscribe', (_event, symbol: string) => {
    console.log(`[OKX] 📥 IPC Unsubscribe request for ${symbol}`)
    if (cryptoSubscriptions.has('main')) {
      cryptoSubscriptions.get('main')!.delete(symbol)
    }
    
    if (cryptoWs?.readyState === WebSocket.OPEN) {
      const okxSymbol = getOkxSymbol(symbol)
      if (okxSymbol) {
        const unsubscribeMsg = {
          op: 'unsubscribe',
          args: [
            {
              channel: 'tickers',
              instId: okxSymbol
            }
          ]
        }
        console.log('[OKX] 📤 Sending unsubscribe message:', JSON.stringify(unsubscribeMsg))
        cryptoWs.send(JSON.stringify(unsubscribeMsg))
        console.log(`[OKX] ✅ Unsubscribe sent for ${okxSymbol}`)
      }
    }
    return true
  })

  ipcMain.handle('crypto-disconnect', () => {
    console.log('[Crypto IPC] Disconnect request')
    stopCryptoHeartbeat()

    if (cryptoWs) {
      cryptoWs.close()
      cryptoWs = null
    }

    cryptoSubscriptions.clear()
    return true
  })

  ipcMain.handle('crypto-is-connected', () => {
    const isConnected = cryptoWs?.readyState === WebSocket.OPEN
    console.log(`[Crypto IPC] Connection status: ${isConnected}`)
    return isConnected
  })
}

function createWindow() {
  win = new BrowserWindow({
    title: "Electron Stock App",
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    console.log('[Main] Window loaded, sending test message')
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    console.log('[Main] Loading dev server:', VITE_DEV_SERVER_URL)
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    console.log('[Main] Loading production HTML')
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(() => {
  setupIpcHandlers()
  createWindow()
})