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

console.log('[Preload] Preload script completed, APIs exposed:', {
  ipcRenderer: !!window.ipcRenderer,
  electronStore: !!window.electronStore
})
