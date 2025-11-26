# Intraday Chart Display Diagnostics Implementation

## Overview
This document describes the comprehensive diagnostic logging added to trace the complete intraday chart data flow from API fetch to on-screen rendering.

## Diagnostic Logging Checklist

### 1. Data Fetching Layer (stockDataFetcher.ts)

**getIntradayData() method:**
- ✅ Logs when fetching starts: `[stockDataFetcher] Fetching intraday data for: {symbol}`
- ✅ Logs when using cached data: `[stockDataFetcher] ✅ Using cached intraday data for: {symbol} - bars: {count}`
- ✅ Logs successful data receipt with bar count and sample bars
- ✅ Logs errors with details if fetch fails

**fetchIntradayFromTencent() method:**
- ✅ Logs API call: `[stockDataFetcher] Calling Tencent API for: {symbol} URL: {url}`
- ✅ Logs API response code
- ✅ Logs data validation errors with details
- ✅ Logs successful parse: `[stockDataFetcher] ✅ Tencent API returned {count} bars`
- ✅ Logs any parsing errors

**fetchIntradayFromSina() method:**
- ✅ Similar logging as Tencent API
- ✅ Logs data structure validation

**subscribeIntraday() & startIntradayPolling() methods:**
- ✅ Logs subscription setup: `[stockDataFetcher] Subscribing to intraday updates for: {symbol}`
- ✅ Logs when polling starts
- ✅ Logs each polling cycle: `[stockDataFetcher] Running intraday poll for: {symbol}`
- ✅ Logs broadcasting of updates to callbacks
- ✅ Logs polling interval (60000ms)

**unsubscribeIntraday() method:**
- ✅ Logs cleanup: `[stockDataFetcher] Unsubscribing from intraday updates for: {symbol}`

### 2. React Hook Layer (useIntradayData.ts)

**useIntradayData() hook:**
- ✅ Logs hook setup: `[useIntradayData] Setting up intraday data for: {symbol}`
- ✅ Logs when no symbol provided
- ✅ Logs initial fetch: `[useIntradayData] Fetching initial intraday data for: {symbol}`
- ✅ Logs successful return with bar count and lastUpdate time
- ✅ Logs component mount state before updating store
- ✅ Logs subscription callback registration
- ✅ Logs each real-time update received with bar details (time, open, close, volume)
- ✅ Logs cleanup on unmount

### 3. Store Updates (stockStore.ts - existing)

**updateIntradayData() action:**
- ✅ Already logs: `[stockStore] Updating intraday data for {symbol}`
- ✅ Logs bar count

**updateLatestBar() action:**
- ✅ Already logs: `[stockStore] Updating latest bar for {symbol}`
- ✅ Logs bar details (time, close, volume)

### 4. Component Rendering (MainContent.tsx)

**MainContent component:**
- ✅ Logs selected stock: `[MainContent] Selected stock: {code}`
- ✅ Logs chart data availability: `[MainContent] Chart data: {count} bars`
- ✅ Logs first and last bars when available
- ✅ Logs chart section rendering status
- ✅ Logs whether Chart component is rendered or loading message shown

### 5. Chart Component (Chart.tsx)

**Chart component useEffect:**
- ✅ Logs chart render start: `[Chart] Rendering chart for symbol: {symbol}`
- ✅ Logs data point count: `[Chart] Data points: {count}`
- ✅ Logs container validation errors
- ✅ Logs data validation warnings
- ✅ Logs container dimensions: `[Chart] Container dimensions: {width}x{height}`
- ✅ Logs dimension validation errors
- ✅ Logs chart creation start with bar count
- ✅ Logs previous chart instance cleanup
- ✅ Logs chart instance creation
- ✅ Logs candlestick series creation
- ✅ Logs bar conversion with sample first and last bars
- ✅ Logs data set on series
- ✅ Logs time scale fitting
- ✅ Logs successful chart render: `[Chart] ✅ Chart rendered successfully`
- ✅ Logs resize events with new dimensions
- ✅ Logs resize listener cleanup
- ✅ Logs any errors with full error objects

## How to Use Diagnostics

### Step 1: Enable Developer Console
Press `F12` in the Electron app to open developer tools.

### Step 2: Select a Stock
Click on a stock in the left sidebar to trigger the diagnostic flow.

### Step 3: Monitor Console Output

Follow the flow in the console:

1. **useIntradayData starts:**
```
[useIntradayData] Setting up intraday data for: 000001
[useIntradayData] Fetching initial intraday data for: 000001
```

2. **Data fetcher starts:**
```
[stockDataFetcher] Fetching intraday data for: 000001
[stockDataFetcher] Fetching fresh intraday bars for: 000001
[stockDataFetcher] Calling Tencent API for: sh000001 URL: https://...
```

3. **API response received:**
```
[stockDataFetcher] ✅ Tencent API response received, code: 0
[stockDataFetcher] ✅ Tencent API returned 240 bars
```

4. **Data formatted and returned:**
```
[stockDataFetcher] ✅ Intraday data received: {
  symbol: '000001',
  barCount: 240,
  firstBar: {...},
  lastBar: {...}
}
```

5. **Hook receives data:**
```
[useIntradayData] ✅ getIntradayData returned: {
  symbol: '000001',
  barCount: 240,
  lastUpdate: 1732600123456
}
```

6. **Store updated:**
```
[stockStore] Updating intraday data for 000001 bars: 240
```

7. **MainContent displays:**
```
[MainContent] Selected stock: 000001
[MainContent] Chart data: 240 bars
[MainContent] First bar: {"time":"2025-11-26 09:30:00",...}
[MainContent] Last bar: {"time":"2025-11-26 15:00:00",...}
```

8. **Chart renders:**
```
[Chart] Rendering chart for symbol: 000001
[Chart] Data points: 240
[Chart] Container dimensions: {width: 1200, height: 400}
[Chart] Creating chart with 240 bars
[Chart] Chart instance created
[Chart] Candlestick series created
[Chart] ✅ Converted 240 bars to chart format
[Chart] First bar: {"time":1732600400,"open":3500.5,...}
[Chart] Last bar: {"time":1732618800,"open":3502.3,...}
[Chart] Data set on series
[Chart] Time scale fitted to content
[Chart] ✅ Chart rendered successfully
```

## Diagnostic Messages Explained

### Success Messages (✅)
- `✅ Using cached intraday data` - Data from cache, API not called
- `✅ Intraday data received` - Successful fetch with bar count
- `✅ Tencent API returned X bars` - API response parse successful
- `✅ Converted X bars to chart format` - Data format conversion successful
- `✅ Chart rendered successfully` - Chart visible on screen

### Warning Messages (⚠️)
- `⚠️ No data to display` - Chart component received empty data array
- `⚠️ Tencent API returned no bars` - API returned valid response but no bars
- `⚠️ Sina API returned invalid data structure` - API data missing expected fields

### Error Messages (❌)
- `❌ Container ref is null` - Chart DOM element not available
- `❌ Container has invalid dimensions` - Chart container width/height is 0
- `❌ Invalid response code from Tencent API` - API returned error code
- `❌ No data for symbol in Tencent response` - Symbol data missing from API
- `❌ Tencent intraday fetch error` - API call failed
- `❌ Failed to fetch intraday data` - Complete fetch failure

## Possible Issues and Solutions

### Issue: "No data to display" warning in Chart
**Cause:** Empty data array passed to Chart component
**Solutions:**
1. Check if API is returning bars: Look for "✅ Tencent API returned X bars"
2. Check store update: Look for "[stockStore] Updating intraday data for {symbol} bars: {count}"
3. Verify MainContent receives data: Check "[MainContent] Chart data: {count} bars"

### Issue: "Container has invalid dimensions" error
**Cause:** Chart container not properly sized
**Solutions:**
1. Check CSS: Verify `.chart-panel` has width/height set
2. Check DOM: In DevTools Elements, verify container div exists
3. Check resize: Verify window resize events update dimensions

### Issue: "Container ref is null" error
**Cause:** Chart component's ref not attaching to DOM
**Solutions:**
1. Check React rendering: Verify Chart component is in DOM
2. Check ref attachment: Component should have `ref={containerRef}`

### Issue: API returns error code
**Cause:** Tencent/Sina API request failed
**Solutions:**
1. Check network: Are API URLs accessible?
2. Check URL parameters: Verify symbol is correctly formatted
3. Check data source: Try switching between Tencent and Sina APIs

### Issue: Bars showing but chart blank
**Cause:** Chart rendering failed silently
**Solutions:**
1. Look for errors in console: Search for "❌" messages
2. Check dimensions: Look for "Container dimensions: {width, height}"
3. Verify data format: Check first and last bars logged

## Real-Time Update Flow

When a new bar arrives:

```
[stockDataFetcher] Broadcasting intraday update for: 000001 bar time: 2025-11-26 14:00:00
[stockDataFetcher] Notifying 1 intraday callbacks for: 000001
[useIntradayData] ✅ Received intraday update for 000001: {
  time: 2025-11-26 14:00:00,
  open: 3502.5,
  close: 3503.2,
  volume: 5000000
}
[stockStore] Updating latest bar for 000001: {
  time: 2025-11-26 14:00:00,
  close: 3503.2,
  volume: 5000000
}
```

## Performance Notes

- **Data Fetch:** 60-second cache for intraday data
- **Polling Interval:** 60 seconds for real-time updates
- **Chart Re-render:** Occurs when data array changes
- **Resize Handling:** Debounced window resize events

## Implementation Details

All logging uses the format: `[ModuleName] Message`

This allows for easy filtering in DevTools Console:
- Filter all logs: `[`
- Filter Chart only: `[Chart]`
- Filter errors: `❌`
- Filter warnings: `⚠️`
- Filter success: `✅`
