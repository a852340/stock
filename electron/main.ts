import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import https from 'node:https'
import type { IncomingMessage } from 'node:http'
import Store from 'electron-store'

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

function parseIntradayDataSina(data: string): Array<{
  time: number | string
  open: number
  high: number
  low: number
  close: number
  volume?: number
}> {
  const bars: Array<{
    time: number | string
    open: number
    high: number
    low: number
    close: number
    volume?: number
  }> = []

  try {
    const parsedData = JSON.parse(data)
    
    if (!parsedData || !parsedData.t || !parsedData.o) {
      console.error('[Main] Invalid data structure from Sina API')
      return []
    }

    const { t, o, h, l, c, v } = parsedData
    
    for (let i = 0; i < t.length; i++) {
      bars.push({
        time: t[i],
        open: o[i],
        high: h[i],
        low: l[i],
        close: c[i],
        volume: v?.[i]
      })
    }
  } catch (error) {
    console.error('[Main] Parse error for Sina data:', error)
  }

  return bars
}

function parseIntradayDataTencent(data: string): Array<{
  time: number | string
  open: number
  high: number
  low: number
  close: number
  volume?: number
}> {
  const bars: Array<{
    time: number | string
    open: number
    high: number
    low: number
    close: number
    volume?: number
  }> = []

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedData = JSON.parse(data) as any
    
    if (!parsedData || parsedData.code !== 0) {
      console.error('[Main] Invalid response code from Tencent:', parsedData?.code)
      return []
    }

    if (!parsedData.data) {
      console.error('[Main] No data field in Tencent response')
      return []
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const symbolData = Object.values(parsedData.data)[0] as any
    
    if (!symbolData || !symbolData.day) {
      console.error('[Main] No day field in Tencent symbol data')
      return []
    }

    const dayBars = symbolData.day as string[][]
    
    for (const bar of dayBars) {
      if (bar.length >= 6) {
        bars.push({
          time: bar[0],
          open: parseFloat(bar[1]),
          high: parseFloat(bar[3]),
          low: parseFloat(bar[4]),
          close: parseFloat(bar[2]),
          volume: parseFloat(bar[5])
        })
      }
    }
  } catch (error) {
    console.error('[Main] Parse error for Tencent data:', error)
  }

  return bars
}

function fetchFromUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res: IncomingMessage) => {
      let data = ''
      
      res.on('data', (chunk: Buffer) => {
        data += chunk.toString()
      })
      
      res.on('end', () => {
        resolve(data)
      })
    }).on('error', (error: Error) => {
      reject(error)
    })
  })
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

  ipcMain.handle('stock-get-intraday', async (_event, symbol: string) => {
    try {
      console.log('[Main] Fetching intraday data for:', symbol)
      
      const market = symbol === '000001' || symbol.startsWith('6') ? 'sh' : 'sz'
      const fullSymbol = `${market}${symbol}`
      
      // Try Tencent first
      try {
        const tencentUrl = `https://ifzq.gtimg.cn/appstock/app/fqkline/get?param=${fullSymbol},day,1,`
        console.log('[Main] Trying Tencent API:', tencentUrl)
        
        const response = await fetchFromUrl(tencentUrl)
        const bars = parseIntradayDataTencent(response)
        
        if (bars.length > 0) {
          console.log('[Main] ✅ Got', bars.length, 'bars from Tencent')
          return bars
        }
      } catch (error) {
        console.error('[Main] ❌ Tencent API failed:', error)
      }
      
      // Try Sina as fallback
      try {
        const sinaUrl = `https://vip.stock.finance.sina.com.cn/q_gn/api/extral.php?symbol=${fullSymbol}&bdate=&edate=&param=&type=1&resolution=1&_s=pc`
        console.log('[Main] Trying Sina API:', sinaUrl)
        
        const response = await fetchFromUrl(sinaUrl)
        const bars = parseIntradayDataSina(response)
        
        if (bars.length > 0) {
          console.log('[Main] ✅ Got', bars.length, 'bars from Sina')
          return bars
        }
      } catch (error) {
        console.error('[Main] ❌ Sina API failed:', error)
      }
      
      console.warn('[Main] ⚠️ No data from any source for:', symbol)
      return []
    } catch (error) {
      console.error('[Main] Error in stock-get-intraday:', error)
      return []
    }
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