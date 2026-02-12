import React from 'react'
import { motion } from 'framer-motion'

const TopNav = ({ portfolio }) => {
  const isPositive = portfolio.changePercent >= 0

  return (
    <nav className="h-16 glass-panel-deep flex items-center justify-between px-6 border-b border-glass-border">
      <div className="flex items-center space-x-8">
        <motion.h1 
          className="font-clash text-2xl font-bold tracking-tighter"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          OBSIDIAN<span className="text-jade">.</span>TERMINAL
        </motion.h1>
        
        <div className="h-8 w-px bg-glass-border" />
        
        <div className="flex items-center space-x-6 text-xs font-jetbrains">
          <motion.div 
            className="flex flex-col"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white/40 uppercase tracking-wider text-[10px]">Portfolio Value</span>
            <motion.span 
              className="text-lg font-semibold number-transition"
              key={portfolio.totalValue}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              ${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="flex flex-col"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white/40 uppercase tracking-wider text-[10px]">24h Change</span>
            <motion.span 
              className={`text-lg font-semibold number-transition ${isPositive ? 'text-jade' : 'text-ember'}`}
              key={portfolio.change24h}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {isPositive ? '+' : ''}{portfolio.changePercent.toFixed(2)}%
              <span className="text-sm ml-2 text-white/60">
                ({isPositive ? '+' : ''}${portfolio.change24h.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </span>
            </motion.span>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <motion.button
          className="px-4 py-2 text-xs font-jetbrains uppercase tracking-wider border border-glass-border hover:border-jade/50 hover:text-jade transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Markets
        </motion.button>
        <motion.button
          className="px-4 py-2 text-xs font-jetbrains uppercase tracking-wider border border-glass-border hover:border-phosphor/50 hover:text-phosphor transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Portfolio
        </motion.button>
        <motion.button
          className="px-4 py-2 text-xs font-jetbrains uppercase tracking-wider bg-jade text-obsidian hover:bg-jade-dark transition-all shadow-glow-jade"
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 163, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          Connect Wallet
        </motion.button>
      </div>
    </nav>
  )
}

export default TopNav