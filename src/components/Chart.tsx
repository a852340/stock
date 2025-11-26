import React, { useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import type { IChartApi } from 'lightweight-charts'
import { BarData } from '../types/quote'

interface ChartProps {
  symbol: string
  data: BarData[]
}

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<unknown>(null)

  useEffect(() => {
    if (!containerRef.current || !data || data.length === 0) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    if (width <= 0 || height <= 0) return

    try {
      if (chartRef.current) {
        chartRef.current.remove()
      }

      const chart = createChart(container, {
        layout: {
          background: { color: '#0f172a' },
          textColor: '#94a3b8'
        },
        width,
        height,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          fixLeftEdge: true
        },
        rightPriceScale: {
          scaleMargins: {
            top: 0.1,
            bottom: 0.1
          }
        }
      })

      const series = (chart as unknown as { addCandlestickSeries: (options: unknown) => unknown }).addCandlestickSeries({
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderUpColor: '#22c55e',
        borderDownColor: '#ef4444',
        wickUpColor: '#22c55e',
        wickDownColor: '#ef4444'
      })

      interface ChartBar {
        time: number
        open: number
        high: number
        low: number
        close: number
      }

      const chartBars: ChartBar[] = data.map(bar => ({
        time: typeof bar.time === 'string' 
          ? Math.floor(new Date(bar.time).getTime() / 1000)
          : typeof bar.time === 'number' && bar.time > 100000000
          ? Math.floor(bar.time / 1000)
          : bar.time,
        open: bar.open,
        high: bar.high,
        low: bar.low,
        close: bar.close
      }))

      const setDataFn = (series as unknown as { setData: (data: unknown) => void }).setData
      setDataFn(chartBars)
      chart.timeScale().fitContent()

      chartRef.current = chart
      seriesRef.current = series as unknown

      const handleResize = () => {
        if (containerRef.current && chartRef.current) {
          const newWidth = containerRef.current.clientWidth
          const newHeight = containerRef.current.clientHeight
          if (newWidth > 0 && newHeight > 0) {
            chartRef.current.applyOptions({
              width: newWidth,
              height: newHeight
            })
          }
        }
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    } catch (error) {
      console.error('[Chart] Error creating chart:', error)
    }
  }, [data])

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '400px',
        position: 'relative'
      }}
      className="bg-dark-accent rounded"
    />
  )
}
