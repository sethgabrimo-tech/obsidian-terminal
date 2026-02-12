import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'

const LiquidityHeatmap = ({ coin }) => {
  const [heatmapData, setHeatmapData] = useState([])

  useEffect(() => {
    const generateHeatmapData = () => {
      return Array.from({ length: 20 }, (_, i) => {
        const intensity = Math.random()
        const priceLevel = 50000 + (i - 10) * 500
        
        return {
          priceLevel: priceLevel.toFixed(0),
          liquidityBid: Math.random() * 1000 + 200,
          liquidityAsk: Math.random() * 1000 + 200,
          intensity: intensity,
          whaleCluster: intensity > 0.7
        }
      })
    }

    setHeatmapData(generateHeatmapData())
    const interval = setInterval(() => {
      setHeatmapData(generateHeatmapData())
    }, 4000)

    return () => clearInterval(interval)
  }, [coin])

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-clash text-sm font-semibold uppercase tracking-wider">
          Liquidity Heatmap
        </h3>
        <div className="flex items-center space-x-3 text-[10px] font-jetbrains">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-jade" />
            <span className="text-white/40">Bid Wall</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-ember" />
            <span className="text-white/40">Ask Wall</span>
          </div>
          <div className="flex items-center space-x-1">
            <motion.div 
              className="w-2 h-2 bg-phosphor"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-white/40">Whale Cluster</span>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={heatmapData} layout="horizontal">
            <XAxis 
              type="category" 
              dataKey="priceLevel"
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'JetBrains Mono' }}
              tickLine={false}
              interval={2}
            />
            <YAxis 
              type="number"
              stroke="rgba(255,255,255,0.2)"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9, fontFamily: 'JetBrains Mono' }}
              tickLine={false}
            />
            <Bar 
              dataKey="liquidityBid" 
              stackId="a"
              animationDuration={800}
            >
              {heatmapData.map((entry, index) => (
                <Cell 
                  key={`bid-${index}`}
                  fill={entry.whaleCluster ? '#00D4FF' : `rgba(0, 255, 163, ${0.3 + entry.intensity * 0.7})`}
                />
              ))}
            </Bar>
            <Bar 
              dataKey="liquidityAsk" 
              stackId="a"
              animationDuration={800}
            >
              {heatmapData.map((entry, index) => (
                <Cell 
                  key={`ask-${index}`}
                  fill={entry.whaleCluster ? '#00D4FF' : `rgba(255, 56, 100, ${0.3 + entry.intensity * 0.7})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <motion.div 
        className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-glass-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col space-y-1">
          <span className="text-white/40 text-[10px] uppercase font-jetbrains">Total Bid Liq.</span>
          <span className="text-jade font-semibold text-sm font-jetbrains">
            ${(heatmapData.reduce((sum, d) => sum + d.liquidityBid, 0) / 1000).toFixed(1)}M
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-white/40 text-[10px] uppercase font-jetbrains">Total Ask Liq.</span>
          <span className="text-ember font-semibold text-sm font-jetbrains">
            ${(heatmapData.reduce((sum, d) => sum + d.liquidityAsk, 0) / 1000).toFixed(1)}M
          </span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-white/40 text-[10px] uppercase font-jetbrains">Whale Zones</span>
          <span className="text-phosphor font-semibold text-sm font-jetbrains">
            {heatmapData.filter(d => d.whaleCluster).length}
          </span>
        </div>
      </motion.div>
    </div>
  )
}

export default LiquidityHeatmap