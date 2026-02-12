import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mockData } from '../data/mockData'

const OrderBook = ({ coin }) => {
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] })

  useEffect(() => {
    const updateOrderBook = () => {
      const currentPrice = mockData.candlestickData[coin]?.[0]?.close || 50000
      
      const bids = Array.from({ length: 15 }, (_, i) => ({
        price: currentPrice - (i + 1) * (currentPrice * 0.0001),
        amount: Math.random() * 2 + 0.5,
        total: 0,
        id: `bid-${i}-${Date.now()}`
      }))

      const asks = Array.from({ length: 15 }, (_, i) => ({
        price: currentPrice + (i + 1) * (currentPrice * 0.0001),
        amount: Math.random() * 2 + 0.5,
        total: 0,
        id: `ask-${i}-${Date.now()}`
      }))

      let bidTotal = 0
      bids.forEach(bid => {
        bidTotal += bid.amount
        bid.total = bidTotal
      })

      let askTotal = 0
      asks.forEach(ask => {
        askTotal += ask.amount
        ask.total = askTotal
      })

      setOrderBook({ bids, asks })
    }

    updateOrderBook()
    const interval = setInterval(updateOrderBook, 2000)
    return () => clearInterval(interval)
  }, [coin])

  const maxBidTotal = Math.max(...orderBook.bids.map(b => b.total), 1)
  const maxAskTotal = Math.max(...orderBook.asks.map(a => a.total), 1)

  const spread = orderBook.asks[0]?.price - orderBook.bids[0]?.price || 0
  const spreadPercent = (spread / orderBook.bids[0]?.price) * 100 || 0

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-clash text-sm font-semibold uppercase tracking-wider">
          Order Book
        </h3>
        <div className="text-[10px] text-white/40 font-jetbrains">
          SPREAD: <span className="text-phosphor">{spreadPercent.toFixed(3)}%</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-2 overflow-hidden">
        {/* Asks */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-2 text-[10px] text-white/40 uppercase tracking-wider mb-2 font-jetbrains px-2">
            <div>Price</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Total</div>
          </div>
          
          <div className="space-y-0.5">
            {[...orderBook.asks].reverse().slice(0, 10).map((ask, index) => (
              <motion.div
                key={ask.id}
                className="relative grid grid-cols-3 gap-2 text-xs font-jetbrains px-2 py-1 group cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ backgroundColor: 'rgba(255, 56, 100, 0.05)' }}
              >
                <motion.div 
                  className="absolute right-0 top-0 bottom-0 bg-ember/10"
                  initial={{ width: 0 }}
                  animate={{ width: `${(ask.total / maxAskTotal) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
                <div className="text-ember font-semibold relative z-10">
                  ${ask.price.toFixed(2)}
                </div>
                <div className="text-right text-white/80 relative z-10">
                  {ask.amount.toFixed(4)}
                </div>
                <div className="text-right text-white/60 relative z-10">
                  {ask.total.toFixed(4)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Spread Indicator */}
        <motion.div 
          className="py-2 px-2 bg-obsidian-light border-y border-glass-border"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between text-xs font-jetbrains">
            <span className="text-white/40">SPREAD</span>
            <span className="text-phosphor font-bold">
              ${spread.toFixed(2)}
            </span>
          </div>
        </motion.div>

        {/* Bids */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-0.5">
            {orderBook.bids.slice(0, 10).map((bid, index) => (
              <motion.div
                key={bid.id}
                className="relative grid grid-cols-3 gap-2 text-xs font-jetbrains px-2 py-1 group cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                whileHover={{ backgroundColor: 'rgba(0, 255, 163, 0.05)' }}
              >
                <motion.div 
                  className="absolute right-0 top-0 bottom-0 bg-jade/10"
                  initial={{ width: 0 }}
                  animate={{ width: `${(bid.total / maxBidTotal) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
                <div className="text-jade font-semibold relative z-10">
                  ${bid.price.toFixed(2)}
                </div>
                <div className="text-right text-white/80 relative z-10">
                  {bid.amount.toFixed(4)}
                </div>
                <div className="text-right text-white/60 relative z-10">
                  {bid.total.toFixed(4)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderBook