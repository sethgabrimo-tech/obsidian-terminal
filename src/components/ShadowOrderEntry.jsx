import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const ShadowOrderEntry = ({ coin }) => {
  const [orderType, setOrderType] = useState('market')
  const [side, setSide] = useState('buy')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [gasFee, setGasFee] = useState(12)
  const [networkCongestion, setNetworkCongestion] = useState('medium')

  useEffect(() => {
    const interval = setInterval(() => {
      setGasFee(prev => Math.max(5, Math.min(50, prev + (Math.random() - 0.5) * 5)))
      const congestionValues = ['low', 'medium', 'high']
      setNetworkCongestion(congestionValues[Math.floor(Math.random() * congestionValues.length)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const congestionColor = {
    low: 'text-jade',
    medium: 'text-phosphor',
    high: 'text-ember'
  }

  return (
    <div className="h-full flex flex-col p-4">
      <h3 className="font-clash text-sm font-semibold uppercase tracking-wider mb-4">
        Shadow Order Entry
      </h3>

      {/* Order Type Toggle */}
      <div className="flex items-center space-x-2 mb-4 bg-obsidian-light border border-glass-border p-1">
        {['market', 'limit', 'stop'].map((type) => (
          <motion.button
            key={type}
            onClick={() => setOrderType(type)}
            className={`flex-1 px-3 py-2 text-xs font-jetbrains uppercase tracking-wider transition-all ${
              orderType === type 
                ? 'bg-jade text-obsidian' 
                : 'text-white/60 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {type}
          </motion.button>
        ))}
      </div>

      {/* Buy/Sell Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <motion.button
          onClick={() => setSide('buy')}
          className={`py-3 text-sm font-jetbrains uppercase tracking-wider border transition-all ${
            side === 'buy'
              ? 'bg-jade/20 border-jade text-jade'
              : 'border-glass-border text-white/60 hover:border-jade/50'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Buy {coin}
        </motion.button>
        <motion.button
          onClick={() => setSide('sell')}
          className={`py-3 text-sm font-jetbrains uppercase tracking-wider border transition-all ${
            side === 'sell'
              ? 'bg-ember/20 border-ember text-ember'
              : 'border-glass-border text-white/60 hover:border-ember/50'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Sell {coin}
        </motion.button>
      </div>

      {/* Amount Input */}
      <div className="mb-4">
        <label className="text-[10px] text-white/40 uppercase tracking-wider font-jetbrains mb-2 block">
          Amount ({coin})
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full bg-obsidian-light border border-glass-border px-4 py-3 text-sm font-jetbrains focus:outline-none focus:border-jade transition-colors"
        />
      </div>

      {/* Price Input (for limit orders) */}
      {orderType === 'limit' && (
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="text-[10px] text-white/40 uppercase tracking-wider font-jetbrains mb-2 block">
            Price (USDT)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full bg-obsidian-light border border-glass-border px-4 py-3 text-sm font-jetbrains focus:outline-none focus:border-jade transition-colors"
          />
        </motion.div>
      )}

      {/* Slippage Protection Slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] text-white/40 uppercase tracking-wider font-jetbrains">
            Slippage Protection
          </label>
          <span className="text-xs font-jetbrains text-jade font-semibold">
            {slippage.toFixed(2)}%
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value))}
            className="w-full h-1 bg-obsidian-light appearance-none cursor-pointer accent-jade"
            style={{
              background: `linear-gradient(to right, #00FFA3 0%, #00FFA3 ${(slippage / 5) * 100}%, rgba(255,255,255,0.1) ${(slippage / 5) * 100}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
        </div>
      </div>

      {/* Gas Fee Estimator */}
      <motion.div 
        className="mb-4 p-3 bg-obsidian-light border border-glass-border"
        animate={{
          borderColor: networkCongestion === 'high' ? 'rgba(255, 56, 100, 0.3)' : 
                       networkCongestion === 'medium' ? 'rgba(0, 212, 255, 0.3)' : 
                       'rgba(0, 255, 163, 0.3)'
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <label className="text-[10px] text-white/40 uppercase tracking-wider font-jetbrains">
            Gas Fee Estimator
          </label>
          <motion.span 
            className={`text-xs font-jetbrains font-semibold ${congestionColor[networkCongestion]}`}
            key={gasFee}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          >
            ${gasFee.toFixed(2)}
          </motion.span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.div 
            className={`w-2 h-2 ${
              networkCongestion === 'high' ? 'bg-ember' : 
              networkCongestion === 'medium' ? 'bg-phosphor' : 'bg-jade'
            }`}
            animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <span className={`text-[10px] font-jetbrains uppercase tracking-wider ${congestionColor[networkCongestion]}`}>
            Network: {networkCongestion}
          </span>
        </div>
      </motion.div>

      {/* Execute Button */}
      <motion.button
        className={`w-full py-4 text-sm font-jetbrains uppercase tracking-wider font-bold border-2 transition-all ${
          side === 'buy'
            ? 'bg-jade/10 border-jade text-jade hover:bg-jade hover:text-obsidian shadow-glow-jade'
            : 'bg-ember/10 border-ember text-ember hover:bg-ember hover:text-white shadow-glow-ember'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Execute {side} Order
      </motion.button>

      {/* Order Summary */}
      <motion.div 
        className="mt-4 pt-4 border-t border-glass-border space-y-2 text-xs font-jetbrains"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between">
          <span className="text-white/40">Est. Total</span>
          <span className="text-white font-semibold">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/40">Max Slippage</span>
          <span className="text-phosphor">{slippage.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/40">Network Fee</span>
          <span className={congestionColor[networkCongestion]}>${gasFee.toFixed(2)}</span>
        </div>
      </motion.div>
    </div>
  )
}

export default ShadowOrderEntry