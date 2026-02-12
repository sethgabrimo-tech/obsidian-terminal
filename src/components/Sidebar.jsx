import React from 'react'
import { motion } from 'framer-motion'
import Sparkline from './Sparkline'

const Sidebar = ({ selectedCoin, onCoinSelect, coins }) => {
  return (
    <aside className="w-80 glass-panel-deep border-r border-glass-border overflow-y-auto">
      <div className="p-4 border-b border-glass-border">
        <h2 className="font-clash text-sm font-semibold uppercase tracking-wider text-white/60">
          Watchlist
        </h2>
      </div>

      <div className="divide-y divide-glass-border">
        {coins.map((coin, index) => {
          const isSelected = selectedCoin === coin.symbol
          const isPositive = coin.change24h >= 0

          return (
            <motion.button
              key={coin.symbol}
              onClick={() => onCoinSelect(coin.symbol)}
              className={`w-full p-4 text-left transition-all relative group ${
                isSelected ? 'bg-glass' : 'hover:bg-glass/50'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              {isSelected && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1 bg-jade"
                  layoutId="activeCoin"
                />
              )}

              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 flex items-center justify-center border border-glass-border ${
                    isPositive ? 'bg-jade/10' : 'bg-ember/10'
                  }`}>
                    <span className="text-sm font-bold font-clash">{coin.symbol[0]}</span>
                  </div>
                  <div>
                    <div className="font-clash font-semibold text-sm">{coin.symbol}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">
                      {coin.name}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    ${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <motion.div 
                    className={`text-xs font-semibold ${isPositive ? 'text-jade' : 'text-ember'}`}
                    whileHover={{ scale: coin.volatility === 'high' ? 1.1 : 1 }}
                    animate={coin.volatility === 'high' ? { 
                      x: [0, -1, 1, -1, 0],
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {isPositive ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </motion.div>
                </div>
              </div>

              <div className="h-12 mt-2">
                <Sparkline 
                  data={coin.sparklineData} 
                  color={isPositive ? '#00FFA3' : '#FF3864'}
                  isPositive={isPositive}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
                <span>VOL: ${(coin.volume / 1e9).toFixed(2)}B</span>
                <span className={`uppercase tracking-wider ${
                  coin.volatility === 'high' ? 'text-ember' : 
                  coin.volatility === 'medium' ? 'text-phosphor' : 'text-jade'
                }`}>
                  {coin.volatility}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </aside>
  )
}

export default Sidebar