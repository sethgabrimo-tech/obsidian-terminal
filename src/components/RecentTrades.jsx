import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mockData } from '../data/mockData'

const RecentTrades = ({ coin }) => {
  const [trades, setTrades] = useState([])

  useEffect(() => {
    const currentPrice = mockData.candlestickData[coin]?.[0]?.close || 50000

    const generateTrade = () => {
      const isBuy = Math.random() > 0.5
      return {
        id: Date.now() + Math.random(),
        price: currentPrice + (Math.random() - 0.5) * currentPrice * 0.001,
        amount: Math.random() * 1.5 + 0.1,
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: isBuy ? 'buy' : 'sell'
      }
    }

    const initialTrades = Array.from({ length: 20 }, generateTrade)
    setTrades(initialTrades)

    const interval = setInterval(() => {
      setTrades(prev => [generateTrade(), ...prev.slice(0, 19)])
    }, 1500)

    return () => clearInterval(interval)
  }, [coin])

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-clash text-sm font-semibold uppercase tracking-wider">
          Recent Trades
        </h3>
        <div className="text-[10px] text-white/40 font-jetbrains uppercase">
          Real-time
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] text-white/40 uppercase tracking-wider mb-2 font-jetbrains px-2">
        <div>Price</div>
        <div className="text-right">Amount</div>
        <div className="text-right">Time</div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-0.5">
        <AnimatePresence initial={false}>
          {trades.map((trade, index) => (
            <motion.div
              key={trade.id}
              className={`grid grid-cols-3 gap-2 text-xs font-jetbrains px-2 py-1.5 border-l-2 ${
                trade.type === 'buy' ? 'border-jade bg-jade/5' : 'border-ember bg-ember/5'
              }`}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              layout
            >
              <div className={`font-semibold ${trade.type === 'buy' ? 'text-jade' : 'text-ember'}`}>
                ${trade.price.toFixed(2)}
              </div>
              <div className="text-right text-white/80">
                {trade.amount.toFixed(4)}
              </div>
              <div className="text-right text-white/40 text-[10px]">
                {trade.time}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        className="mt-4 pt-4 border-t border-glass-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid grid-cols-2 gap-4 text-xs font-jetbrains">
          <div className="flex flex-col space-y-1">
            <span className="text-white/40 text-[10px] uppercase">Buy Volume</span>
            <span className="text-jade font-semibold">
              {trades.filter(t => t.type === 'buy').reduce((sum, t) => sum + t.amount, 0).toFixed(2)} {coin}
            </span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-white/40 text-[10px] uppercase">Sell Volume</span>
            <span className="text-ember font-semibold">
              {trades.filter(t => t.type === 'sell').reduce((sum, t) => sum + t.amount, 0).toFixed(2)} {coin}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default RecentTrades