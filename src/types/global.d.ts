declare global {
  interface Window {
    cryptoWS: {
      subscribe: (symbol: string) => Promise<boolean>
      unsubscribe: (symbol: string) => Promise<boolean>
      disconnect: () => Promise<boolean>
      isConnected: () => Promise<boolean>
      on: (channel: string, listener: (...args: any[]) => void) => void
      off: (channel: string, listener: any) => void
    }
    ipcRenderer: {
      send: (channel: string, ...args: any[]) => void
      on: (channel: string, listener: (event: any, ...args: any[]) => void) => void
      off: (channel: string, listener: any) => void
      invoke: (channel: string, ...args: any[]) => Promise<any>
    }
    electronStore: {
      get: (key: string) => Promise<any>
      set: (key: string, value: unknown) => Promise<void>
      getAll: () => Promise<Record<string, any>>
      reset: () => Promise<void>
    }
  }
}

export {}
