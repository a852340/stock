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

function parseIntradayDataEastMoney(data: string): Array<{
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
    
    if (!parsedData || !parsedData.data) {
      console.error('[Main] Invalid data structure from EastMoney trends2 API')
      return []
    }

    const responseData = parsedData.data
    
    // Handle trends2 API format: trends array with "time price volume totalAmount" format
    const trends = responseData.trends as string[]
    
    if (!trends || trends.length === 0) {
      console.warn('[Main] ⚠️ No trends data from EastMoney trends2 API')
      return []
    }
    
    for (const trendStr of trends) {
      try {
        // Format: "2025-11-25 09:30:00 3500.00 3505.00 3490.00 100000"
        // Or simpler format: "09:30 3500.00 100000"
        const parts = trendStr.trim().split(/\s+/)
        
        if (parts.length < 2) continue
        
        let timeStr = ''
        let priceIdx = 1
        let volumeIdx = 2
        
        // Check if first part contains a date
        if (parts[0].includes('-') && parts.length >= 3) {
          // Full format with date
          timeStr = `${parts[0]} ${parts[1]}`
          priceIdx = 2
          volumeIdx = 5
        } else {
          // Time only format
          timeStr = parts[0]
          priceIdx = 1
          volumeIdx = 2
        }
        
        const price = parseFloat(parts[priceIdx])
        const volume = parseInt(parts[volumeIdx]) || 0
        
        if (isNaN(price)) continue
        
        bars.push({
          time: timeStr,
          open: price,
          high: price,
          low: price,
          close: price,
          volume: volume
        })
      } catch (e) {
        continue
      }
    }
  } catch (error) {
    console.error('[Main] Parse error for EastMoney trends2 data:', error)
  }

  return bars
}

function parseSpotDataEastMoney(data: string): {
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
} | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedData = JSON.parse(data) as any
    
    if (!parsedData || parsedData.code !== 0 || !parsedData.data) {
      console.error('[Main] Invalid response from EastMoney spot API')
      return null
    }

    const spotData = parsedData.data
    
    return {
      name: spotData.f58 || 'N/A',
      price: spotData.f2 || 0,
      change: spotData.f3 || 0,
      changePercent: spotData.f4 || 0,
      volume: spotData.f47 || 0
    }
  } catch (error) {
    console.error('[Main] Parse error for EastMoney spot data:', error)
    return null
  }
}

function fetchFromUrl(url: string, redirects = 0): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res: IncomingMessage) => {
      const maxRedirects = 5
      
      // Handle 302/301 redirects
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) && res.headers.location) {
        if (redirects < maxRedirects) {
          const redirectUrl = res.headers.location as string
          const finalUrl = redirectUrl.startsWith('http') ? redirectUrl : `https:${redirectUrl}`
          
          console.log(`[Main] Redirect (${res.statusCode}) to: ${finalUrl}`)
          
          // Consume response data to free up socket
          res.resume()
          
          fetchFromUrl(finalUrl, redirects + 1)
            .then(resolve)
            .catch(reject)
        } else {
          reject(new Error('Too many redirects'))
        }
        return
      }
      
      if (res.statusCode !== 200) {
        console.warn(`[Main] HTTP ${res.statusCode} from ${url}`)
        res.resume()
        resolve('')
        return
      }
      
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

  ipcMain.handle('stock-get-spot', async (_event, symbol: string) => {
    try {
      console.log('[Main] 获取实时行情数据 (从 akshare stock_zh_a_spot_em):', symbol)
      
      const secid = symbol.startsWith('6') ? `1.${symbol}` : `0.${symbol}`
      
      const params = new URLSearchParams({
        ut: 'v65c4e5a28de59',
        fields: 'f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14,f15,f16,f17,f18',
        secid: secid,
        fltt: '2',
        invt: '2',
        fid: 'f3',
        fs: 'b',
        pz: '500',
        po: '1',
        _t: String(Date.now())
      })
      
      const url = `https://19.push2.eastmoney.com/api/qt/stock/get?${params.toString()}`
      console.log('[Main] 东方财富实时行情 API 调用:', url)
      
      const response = await fetchFromUrl(url)
      const spotData = parseSpotDataEastMoney(response)
      
      if (spotData) {
        console.log('[Main] ✅ 东方财富实时行情 API 成功，获取:', spotData)
        return {
          symbol,
          name: spotData.name,
          price: spotData.price,
          change24h: spotData.changePercent,
          changeAmount: spotData.change,
          volume: spotData.volume,
          type: 'stock',
          dataSource: 'eastmoney',
          isRealtime: true,
          lastUpdate: Date.now()
        }
      } else {
        console.warn('[Main] ⚠️ 无法解析东方财富实时行情数据')
        return null
      }
    } catch (error) {
      console.error('[Main] ❌ 获取实时行情失败:', error)
      return null
    }
  })

  ipcMain.handle('stock-get-intraday', async (_event, symbol: string) => {
    try {
      console.log('[Main] 获取分时数据 (从 akshare stock_zh_a_hist_min_em):', symbol)
      
      const secid = symbol.startsWith('6') ? `1.${symbol}` : `0.${symbol}`
      
      // Try primary EastMoney trends2 API (akshare stock_zh_a_hist_min_em approach)
      try {
        const params = new URLSearchParams({
          ut: 'v65c4e5a28de59',
          fields1: 'f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13,f14',
          fields2: 'f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61',
          mpi: '600',
          invt: '2',
          secid: secid,
          _t: String(Date.now())
        })
        
        const eastmoneyUrl = `https://push2his.eastmoney.com/api/qt/stock/trends2?${params.toString()}`
        console.log('[Main] 尝试东方财富 trends2 API (akshare 方式):', eastmoneyUrl)
        
        const response = await fetchFromUrl(eastmoneyUrl)
        const bars = parseIntradayDataEastMoney(response)
        
        if (bars.length > 0) {
          console.log('[Main] ✅ 东方财富 trends2 API 成功，获取', bars.length, '根K线')
          return bars
        } else {
          console.warn('[Main] ⚠️ 东方财富 trends2 API 返回空数据')
        }
      } catch (error) {
        console.error('[Main] ❌ 东方财富 trends2 API 失败:', error)
      }
      
      // Fallback: Try Tencent
      try {
        const market = symbol === '000001' || symbol.startsWith('6') ? 'sh' : 'sz'
        const fullSymbol = `${market}${symbol}`
        const tencentUrl = `https://ifzq.gtimg.cn/appstock/app/fqkline/get?param=${fullSymbol},day,1,&_t=${Date.now()}`
        console.log('[Main] 尝试腾讯 API:', tencentUrl)
        
        const response = await fetchFromUrl(tencentUrl)
        const bars = parseIntradayDataTencent(response)
        
        if (bars.length > 0) {
          console.log('[Main] ✅ 腾讯 API 成功，获取', bars.length, '根K线')
          return bars
        } else {
          console.warn('[Main] ⚠️ 腾讯 API 返回空数据')
        }
      } catch (error) {
        console.error('[Main] ❌ 腾讯 API 失败:', error)
      }
      
      // Fallback: Try Sina
      try {
        const market = symbol === '000001' || symbol.startsWith('6') ? 'sh' : 'sz'
        const fullSymbol = `${market}${symbol}`
        const sinaUrl = `https://vip.stock.finance.sina.com.cn/q_gn/api/extral.php?symbol=${fullSymbol}&bdate=&edate=&param=&type=1&resolution=1&_s=pc`
        console.log('[Main] 尝试新浪 API:', sinaUrl)
        
        const response = await fetchFromUrl(sinaUrl)
        const bars = parseIntradayDataSina(response)
        
        if (bars.length > 0) {
          console.log('[Main] ✅ 新浪 API 成功，获取', bars.length, '根K线')
          return bars
        } else {
          console.warn('[Main] ⚠️ 新浪 API 返回空数据')
        }
      } catch (error) {
        console.error('[Main] ❌ 新浪 API 失败:', error)
      }
      
      console.warn('[Main] ⚠️ 无法从任何数据源获取分时数据:', symbol)
      return []
    } catch (error) {
      console.error('[Main] stock-get-intraday 错误:', error)
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