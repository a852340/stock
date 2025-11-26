import { ipcRenderer, contextBridge } from 'electron'

console.log('[Preload] Starting preload script')

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },
})

contextBridge.exposeInMainWorld('electronStore', {
  get: (key: string) => ipcRenderer.invoke('electron-store-get', key),
  set: (key: string, value: unknown) => ipcRenderer.invoke('electron-store-set', key, value),
  getAll: () => ipcRenderer.invoke('electron-store-get-all'),
  reset: () => ipcRenderer.invoke('electron-store-reset'),
})

// Expose cryptoWS API for WebSocket communication
contextBridge.exposeInMainWorld('cryptoWS', {
  subscribe: (symbol: string) => {
    console.log('[Preload] Crypto subscribe request:', symbol)
    return ipcRenderer.invoke('crypto-subscribe', symbol)
  },
  unsubscribe: (symbol: string) => {
    console.log('[Preload] Crypto unsubscribe request:', symbol)
    return ipcRenderer.invoke('crypto-unsubscribe', symbol)
  },
  disconnect: () => {
    console.log('[Preload] Crypto disconnect request')
    return ipcRenderer.invoke('crypto-disconnect')
  },
  isConnected: () => {
    console.log('[Preload] Crypto is connected check')
    return ipcRenderer.invoke('crypto-is-connected')
  },
  on: (channel: string, listener: (...args: any[]) => void) => {
    console.log('[Preload] Registering listener for channel:', channel)
    return ipcRenderer.on(channel, (_event, ...args) => listener(...args))
  },
  off: (channel: string, listener: any) => {
    console.log('[Preload] Removing listener for channel:', channel)
    return ipcRenderer.off(channel, listener)
  }
})

console.log('[Preload] Preload script completed, APIs exposed:', {
  ipcRenderer: !!window.ipcRenderer,
  electronStore: !!window.electronStore,
  cryptoWS: !!window.cryptoWS
})
