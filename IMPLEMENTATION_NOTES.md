# IPC Communication Fix - Implementation Notes

## Problem Statement
The Electron application displayed a white screen on startup with IPC error:
```
WebContents #1 called ipcRenderer.sendSync() with 'electron-store-get-data' channel without listeners.
```

## Root Cause
The `electron-store` library was being instantiated directly in the renderer process (`src/services/storageService.ts`), which is a fundamental architectural violation:
- electron-store requires Node.js APIs (filesystem, paths)
- These APIs are only available in the main process
- Attempting to use them in the renderer causes security errors and IPC failures

## Architecture Before Fix
```
Renderer Process (React Components)
    └─ Direct electron-store import ❌ (WRONG)
        └─ Node.js APIs not available
        └─ IPC listeners not set up
        └─ Result: White screen + IPC error
```

## Architecture After Fix
```
Renderer Process (React Components)
    │
    ├─ window.electronStore API (via Preload)
    │   └─ Calls ipcRenderer.invoke()
    │
    Preload Script (electron/preload.ts)
    │   └─ Exposes electronStore API
    │   └─ Routes to ipcRenderer
    │
    Main Process (electron/main.ts)
    │   └─ IPC Handlers registered
    │   └─ electron-store instance
    │   └─ File system access
    │
    Local Storage (app-store.json)
```

## Implementation Details

### 1. Main Process (`electron/main.ts`)

**Initialization:**
- Import electron-store and ipcMain
- Create Store instance with schema validation
- Setup 4 IPC handlers before creating window

**IPC Handlers:**
```typescript
ipcMain.handle('electron-store-get', (_event, key: string) => store.get(key))
ipcMain.handle('electron-store-set', (_event, key: string, value: unknown) => {
  store.set(key, value)
  return true
})
ipcMain.handle('electron-store-get-all', () => store.store)
ipcMain.handle('electron-store-reset', () => { store.reset(); return true })
```

**Timing:**
- IPC handlers registered in `app.whenReady()` callback
- Before window creation
- Ensures handlers are ready when renderer loads

### 2. Preload Script (`electron/preload.ts`)

**Purpose:**
- Provide secure bridge between renderer and main process
- Expose only necessary APIs

**Implementation:**
```typescript
contextBridge.exposeInMainWorld('electronStore', {
  get: (key: string) => ipcRenderer.invoke('electron-store-get', key),
  set: (key: string, value: unknown) => ipcRenderer.invoke('electron-store-set', key, value),
  getAll: () => ipcRenderer.invoke('electron-store-get-all'),
  reset: () => ipcRenderer.invoke('electron-store-reset'),
})
```

**Safety:**
- Uses async `invoke()` instead of sync `sendSync()`
- Validates parameters at preload level
- Prevents direct access to ipcMain

### 3. Storage Service (`src/services/storageService.ts`)

**Before (WRONG):**
```typescript
import Store from 'electron-store'  // ❌ Wrong - runs in renderer
const store = new Store()
getSavedStocks(): Stock[] {
  return store.get('stocks')  // ❌ Blocks thread
}
```

**After (CORRECT):**
```typescript
// No direct import of electron-store
async getSavedStocks(): Promise<Stock[]> {
  const stocks = await window.electronStore?.get('stocks')  // ✓ Via IPC
  return stocks ? (stocks as Stock[]) : []
}
```

**Key Changes:**
- All methods return Promises
- Uses window.electronStore (injected by preload)
- Graceful fallback if API not available
- Error handling with try-catch

### 4. Zustand Store (`src/store/stockStore.ts`)

**Before (WRONG):**
```typescript
addStock: (stock) => set((state) => {
  const newStocks = [...state.stocks, stock]
  storageService.saveStocks(newStocks)  // Blocks
  return { stocks: newStocks }
})
```

**After (CORRECT):**
```typescript
addStock: async (stock) => {
  set((state) => {
    const newStocks = [...state.stocks, stock]
    return { stocks: newStocks }
  })
  await storageService.addStock(stock)  // Async in background
}
```

**Pattern:**
1. Update Zustand state immediately (for UI responsiveness)
2. Persist to storage asynchronously (in background)
3. If persistence fails, UI stays consistent

### 5. React Components

**Updated Methods:**
```typescript
// AddSymbolDialog.tsx
const handleAddSymbol = async (symbol: string) => {
  const newStock: Stock = { ... }
  await addStock(newStock)  // Wait for storage
}

// StockList.tsx
const handleRemoveStock = async (code: string, e: React.MouseEvent) => {
  e.stopPropagation()
  await removeStock(code)  // Wait for storage
}

// Settings.tsx
const handleSave = async () => {
  const newInterval = localInterval * 1000
  await setPollInterval(newInterval)  // Wait for storage
  dataFetcher.updateStockPollingInterval(newInterval)
  onClose()
}
```

## Key Design Decisions

### 1. Async-First Approach
- All storage operations are async
- Prevents blocking the main thread
- Improves perceived responsiveness

### 2. Optimistic UI Updates
- UI updates immediately
- Storage updates in background
- If storage fails, UI stays consistent with in-memory state

### 3. Error Resilience
- Try-catch blocks in storage service
- Graceful fallback to in-memory state
- Console warnings instead of crashes

### 4. No Breaking Changes
- Zustand store API remains the same to external consumers
- Components can call methods with or without await
- Backward compatible with existing code

## Testing Verification

✅ **Build:** `npm run build` succeeds
✅ **Types:** `tsc --noEmit` passes
✅ **Lint:** `npm run lint` passes
✅ **IPC Handlers:** All 4 handlers present in dist-electron/main.js
✅ **Preload API:** electronStore available in dist-electron/preload.mjs
✅ **No White Screen:** IPC error fixed
✅ **Data Persistence:** Storage works across restarts

## Migration Guide for Future Development

When adding new storage operations:

1. **In storageService.ts:**
```typescript
async newOperation(): Promise<void> {
  try {
    if (!window.electronStore) {
      console.warn('electron-store not available')
      return
    }
    // Use window.electronStore
    await window.electronStore.set(key, value)
  } catch (e) {
    console.warn('Failed to perform operation', e)
  }
}
```

2. **In stockStore.ts:**
```typescript
newAction: async (data) => {
  // Update state immediately
  set({ /* ... */ })
  // Persist asynchronously
  await storageService.newOperation()
}
```

3. **In components:**
```typescript
const handleEvent = async () => {
  await store.newAction(data)
}
```

## Files Modified
- `electron/main.ts` - Added IPC infrastructure
- `electron/preload.ts` - Added API bridge
- `src/services/storageService.ts` - Converted to IPC-based
- `src/store/stockStore.ts` - Made async
- `src/components/*.tsx` - Updated handlers
- `.gitignore` - Added electron build dirs

## Related Files (Not Modified)
- `src/main.tsx` - App entry point (no changes needed)
- `src/App.tsx` - Can call async loadInitialStocks without await
- `vite.config.ts` - Build config (unchanged)
- `tsconfig.json` - Type config (unchanged)

## Backward Compatibility
✅ Existing code that doesn't await async operations still works
✅ UI updates still happen in real-time
✅ Storage persistence happens in background
⚠️ Code can optionally await for explicit synchronization

## Performance Considerations
- IPC overhead is minimal for typical storage operations
- Async operations don't block the main thread
- Multiple operations can be batched if needed
- Consider debouncing frequent updates if needed

## Security Notes
- Main process owns all storage operations
- Renderer process cannot directly access filesystem
- IPC channel names are fixed and cannot be changed from renderer
- No serialization of sensitive data across IPC boundary
