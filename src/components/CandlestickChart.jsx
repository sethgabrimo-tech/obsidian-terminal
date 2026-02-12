import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { mockData } from '../data/mockData'

const CandlestickChart = ({ coin }) => {
  const [timeframe, setTimeframe] = useState('1H')
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const data = mockData.candlestickData[coin] || mockData.candlestickData.BTC
    setChartData(data)
  }, [coin])

  const timeframes = ['1M', '5M', '15M', '1H', '4H', '1D', '1W']
  const currentPrice = chartData[chartData.length - 1]?.close || 0
  const openPrice = chartData[0]?.open || 0
  const priceChange = currentPrice - openPrice
  const priceChangePercent = (priceChange / openPrice) * 100
  const isPositive = priceChange >= 0

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="font-clash text-3xl font-bold mb-1">
            {coin}/USDT
          </h2>
          <motion.div 
            className="flex items-baseline space-x-3"
            key={currentPrice}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="text-4xl font-bold font-clash number-transition">
              ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            <span className={`text-xl font-semibold ${isPositive ? 'text-jade' : 'text-ember'}`}>
              {isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%
            </span>
          </motion.div>
        </div>

        <div className="flex items-center space-x-1 bg-obsidian-light border border-glass-border p-1">
          {timeframes.map((tf) => (
            <motion.button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-jetbrains uppercase tracking-wider transition-all ${
                timeframe === tf 
                  ? 'bg-jade text-obsidian' 
                  : 'text-white/60 hover:text-white hover:bg-glass'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tf}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${coin}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#00FFA3' : '#FF3864'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isPositive ? '#00FFA3' : '#FF3864'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="rgba(255,255,255,0.05)" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={isPositive ? '#00FFA3' : '#FF3864'}
              strokeWidth={2}
              fill={`url(#gradient-${coin})`}
              animationDuration={500}
            />
          </AreaChart>
        </ResponsiveContainer>

        <motion.div 
          className="absolute bottom-4 left-4 flex items-center space-x-4 text-xs font-jetbrains bg-obsidian/90 border border-glass-border px-4 py-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col">
            <span className="text-white/40 uppercase text-[10px]">High</span>
            <span className="text-jade font-semibold">
              ${Math.max(...chartData.map(d => d.high)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-px h-6 bg-glass-border" />
          <div className="flex flex-col">
            <span className="text-white/40 uppercase text-[10px]">Low</span>
            <span className="text-ember font-semibold">
              ${Math.min(...chartData.map(d => d.low)).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="w-px h-6 bg-glass-border" />
          <div className="flex flex-col">
            <span className="text-white/40 uppercase text-[10px]">Volume</span>
            <span className="text-phosphor font-semibold">
              ${(chartData.reduce((sum, d) => sum + d.volume, 0) / 1e9).toFixed(2)}B
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CandlestickChart