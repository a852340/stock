/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
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
    stockApi: {
      getIntradayData: (symbol: string) => Promise<any[]>
    }
  }
}

export {}
