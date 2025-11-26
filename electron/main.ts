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
let cryptoSubscriptions = new Map<string, Set<string>>()
let cryptoReconnectTimeout: NodeJS.Timeout | null = null
let cryptoHeartbeatInterval: NodeJS.Timeout | null = null
let cryptoConnecting = false
let shouldReconnectCrypto = true

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
    console.log('[Crypto] Already connected or connecting')
    return Promise.resolve()
  }

  cryptoConnecting = true
  const wsUrl = 'wss://stream.binance.com:9443/ws'
  console.log('[Crypto] WebSocket connecting to:', wsUrl)

  return new Promise((resolve, reject) => {
    try {
      cryptoWs = new WebSocket(wsUrl)

      cryptoWs.on('open', () => {
        console.log('✅ [Crypto] WebSocket connected to Binance')
        cryptoConnecting = false
        startCryptoHeartbeat()
        resubscribeAllCrypto()
        resolve()
      })

      cryptoWs.on('message', (data: WebSocket.Data) => {
        handleCryptoMessage(data.toString())
      })

      cryptoWs.on('error', (error) => {
        console.error('❌ [Crypto] WebSocket error:', error)
        cryptoConnecting = false
        reject(error)
      })

      cryptoWs.on('close', () => {
        console.log('❌ [Crypto] WebSocket closed')
        cryptoConnecting = false
        stopCryptoHeartbeat()
        if (shouldReconnectCrypto) {
          scheduleCryptoReconnect()
        }
      })
    } catch (error) {
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

function scheduleCryptoReconnect() {
  if (cryptoReconnectTimeout) {
    clearTimeout(cryptoReconnectTimeout)
  }
  
  cryptoReconnectTimeout = setTimeout(() => {
    console.log('[Crypto] Attempting to reconnect...')
    connectCryptoWebSocket().catch(err => {
      console.error('[Crypto] Reconnect failed:', err)
    })
  }, 5000)
}

function resubscribeAllCrypto() {
  console.log('[Crypto] Resubscribing to all symbols...')
  cryptoSubscriptions.forEach((symbols, _channel) => {
    symbols.forEach(symbol => {
      const binanceSymbol = symbol.toLowerCase() + 'usdt'
      subscribeToCryptoSymbol(binanceSymbol)
    })
  })
}

function subscribeToCryptoSymbol(binanceSymbol: string) {
  if (cryptoWs?.readyState === WebSocket.OPEN) {
    const subscribeMsg = {
      method: 'SUBSCRIBE',
      params: [`${binanceSymbol}@ticker`],
      id: Date.now()
    }
    cryptoWs.send(JSON.stringify(subscribeMsg))
    console.log(`✅ [Crypto] Subscribed to ${binanceSymbol}@ticker`)
  } else {
    console.warn(`⚠️ [Crypto] Cannot subscribe to ${binanceSymbol}: WebSocket not connected`)
  }
}

function handleCryptoMessage(data: string) {
  try {
    const message = JSON.parse(data) as any
    
    if (message.e === '24hrTicker') {
      console.log(`📨 [Crypto] Received ticker data for ${message.s}`)
      console.log('[Crypto] Raw data:', {
        symbol: message.s,
        price: message.c,
        changePercent: message.P,
        changeAmount: message.p
      })
      
      const quoteData = {
        symbol: message.s.replace('USDT', '').toUpperCase(),
        name: message.s.replace('USDT', '').toUpperCase(),
        price: parseFloat(message.c),
        change24h: parseFloat(message.P),
        changeAmount: parseFloat(message.p),
        volume: parseFloat(message.v),
        marketCap: parseFloat(message.q),
        type: 'crypto',
        dataSource: 'binance',
        isRealtime: true,
        lastUpdate: message.E
      }
      
      if (win) {
        win.webContents.send('crypto-ticker-update', quoteData)
        console.log('[Crypto] Sent to renderer:', quoteData.symbol)
      }
    }
  } catch (error) {
    console.error('❌ [Crypto] Failed to parse WebSocket message:', error)
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
    console.log(`[Crypto IPC] Subscribe request for ${symbol}`)
    if (!cryptoSubscriptions.has('main')) {
      cryptoSubscriptions.set('main', new Set())
    }
    cryptoSubscriptions.get('main')!.add(symbol)
    
    await connectCryptoWebSocket()
    const binanceSymbol = symbol.toLowerCase() + 'usdt'
    subscribeToCryptoSymbol(binanceSymbol)
    return true
  })

  ipcMain.handle('crypto-unsubscribe', (_event, symbol: string) => {
    console.log(`[Crypto IPC] Unsubscribe request for ${symbol}`)
    if (cryptoSubscriptions.has('main')) {
      cryptoSubscriptions.get('main')!.delete(symbol)
    }
    
    if (cryptoWs?.readyState === WebSocket.OPEN) {
      const binanceSymbol = symbol.toLowerCase() + 'usdt'
      const unsubscribeMsg = {
        method: 'UNSUBSCRIBE',
        params: [`${binanceSymbol}@ticker`],
        id: Date.now()
      }
      cryptoWs.send(JSON.stringify(unsubscribeMsg))
      console.log(`✅ [Crypto] Unsubscribed from ${binanceSymbol}`)
    }
    return true
  })

  ipcMain.handle('crypto-disconnect', () => {
    console.log('[Crypto IPC] Disconnect request')
    shouldReconnectCrypto = false
    stopCryptoHeartbeat()
    
    if (cryptoReconnectTimeout) {
      clearTimeout(cryptoReconnectTimeout)
      cryptoReconnectTimeout = null
    }

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
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // Open dev tools in development
  if (VITE_DEV_SERVER_URL) {
    console.log('[Main] Opening dev tools for development')
    win.webContents.openDevTools()
  }

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