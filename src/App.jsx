import React, { useState, useEffect } from 'react'

// Mock data
const mockCoins = [
  { symbol: 'BTC', name: 'Bitcoin', price: 43287.92, change: 2.47, sparkline: [42100, 42300, 42800, 43100, 42900, 43200, 43287] },
  { symbol: 'ETH', name: 'Ethereum', price: 2247.56, change: -1.23, sparkline: [2280, 2260, 2250, 2240, 2230, 2245, 2247] },
  { symbol: 'SOL', name: 'Solana', price: 98.34, change: 8.92, sparkline: [90, 92, 94, 96, 95, 97, 98] },
  { symbol: 'BNB', name: 'Binance Coin', price: 312.45, change: 1.56, sparkline: [308, 309, 310, 311, 310, 312, 312] },
  { symbol: 'ADA', name: 'Cardano', price: 0.52, change: -2.34, sparkline: [0.53, 0.53, 0.52, 0.52, 0.52, 0.52, 0.52] },
]

const Sparkline = ({ data, isPositive }) => {
  const width = 60
  const height = 24
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={isPositive ? '#00FF87' : '#FF4500'}
        strokeWidth="1.5"
        opacity="0.8"
      />
    </svg>
  )
}

const WatchlistItem = ({ coin, isSelected, onClick }) => {
  const isPositive = coin.change > 0
  const isVolatile = Math.abs(coin.change) > 5
  
  return (
    <div
      onClick={onClick}
      className={`p-3 glass-border cursor-pointer hover-lift ${isSelected ? 'gradient-jade' : ''} ${isVolatile ? 'volatile-indicator' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="clash-display font-bold text-sm">{coin.symbol}</div>
          <div className="text-xs text-gray-500">{coin.name}</div>
        </div>
        <Sparkline data={coin.sparkline} isPositive={isPositive} />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">${coin.price.toLocaleString()}</div>
        <div className={`text-xs ${isPositive ? 'electric-jade' : 'molten-ember'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(coin.change).toFixed(2)}%
        </div>
      </div>
    </div>
  )
}

const OrderBookRow = ({ price, amount, total, isBid }) => {
  const percentage = (total / 100) * 100
  
  return (
    <div className="relative py-1 px-2 text-xs data-row">
      <div
        className="absolute top-0 right-0 h-full opacity-10"
        style={{
          width: `${percentage}%`,
          background: isBid ? '#00FF87' : '#FF4500'
        }}
      />
      <div className="relative flex justify-between items-center">
        <span className={isBid ? 'electric-jade' : 'molten-ember'}>{price.toFixed(2)}</span>
        <span className="text-gray-400">{amount.toFixed(4)}</span>
        <span className="text-gray-500">{total.toFixed(2)}</span>
      </div>
    </div>
  )
}

function App() {
  const [selectedCoin, setSelectedCoin] = useState('BTC')
  const [portfolio, setPortfolio] = useState({
    totalValue: 284592.47,
    change24h: 12847.23,
    changePercent: 4.72
  })
  
  const [orderBookAsks] = useState(() => 
    Array.from({ length: 10 }, (_, i) => ({
      price: 43300 - i * 2,
      amount: Math.random() * 2,
      total: Math.random() * 50
    }))
  )
  
  const [orderBookBids] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      price: 43287 - i * 2,
      amount: Math.random() * 2,
      total: Math.random() * 50
    }))
  )
  
  const [recentTrades] = useState(() =>
    Array.from({ length: 12 }, (_, i) => {
      const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT']
      const types = ['BUY', 'SELL']
      const isBuy = Math.random() > 0.5
      
      return {
        time: new Date(Date.now() - i * 30000).toLocaleTimeString(),
        pair: pairs[Math.floor(Math.random() * pairs.length)],
        price: 43287 + (Math.random() - 0.5) * 100,
        amount: Math.random() * 0.5,
        total: Math.random() * 20000,
        type: isBuy ? 'BUY' : 'SELL',
        isBuy
      }
    })
  )

  return (
    <div className="relative z-10">
      {/* Top Navigation */}
      <nav className="glass-border border-b px-8 py-4 backdrop-blur-sm sticky top-0 z-50" style={{ background: 'rgba(8, 8, 10, 0.95)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="clash-display text-2xl font-bold tracking-tight">
              OBSIDIAN<span className="electric-jade">_TERMINAL</span>
            </h1>
            <div className="flex items-center gap-1 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-500 heartbeat"></div>
              <span className="text-gray-400">LIVE</span>
            </div>
          </div>
          
          <div className="flex items-center gap-12">
            <div className="text-right">
              <div className="text-xs text-gray-500 tracking-wider">PORTFOLIO VALUE</div>
              <div className="clash-display text-2xl font-bold">${portfolio.totalValue.toLocaleString()}</div>
              <div className="text-xs electric-jade flex items-center justify-end gap-1 mt-1">
                <span>▲</span>
                <span>+{portfolio.change24h.toLocaleString()} ({portfolio.changePercent.toFixed(2)}%)</span>
                <span className="text-gray-500">24H</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="glass-border px-4 py-2 hover-lift text-xs tracking-wider">DEPOSIT</button>
              <button className="glass-border px-4 py-2 hover-lift text-xs tracking-wider bg-white text-black">TRADE</button>
              <div className="w-8 h-8 glass-border flex items-center justify-center hover-lift cursor-pointer">
                <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="flex" style={{ height: 'calc(100vh - 73px)' }}>
        {/* Left Sidebar */}
        <aside className="w-80 glass-border border-r overflow-y-auto custom-scroll" style={{ background: 'rgba(12, 12, 14, 0.6)' }}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="clash-display text-lg font-semibold tracking-tight">WATCHLIST</h2>
              <button className="text-xs text-gray-500 hover:text-white transition-colors">+ ADD</button>
            </div>
            
            <div className="space-y-3">
              {mockCoins.map((coin) => (
                <WatchlistItem
                  key={coin.symbol}
                  coin={coin}
                  isSelected={selectedCoin === coin.symbol}
                  onClick={() => setSelectedCoin(coin.symbol)}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto custom-scroll">
          <div className="p-8">
            <div className="grid grid-cols-12 gap-6">
              
              {/* Glass Canvas Chart */}
              <div className="col-span-8 row-span-2 glass-border-thick floating-panel snap-animate" style={{ background: 'rgba(12, 12, 14, 0.8)', height: '600px' }}>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <h2 className="clash-display text-2xl font-bold">{selectedCoin}/USDT</h2>
                      <div className="flex gap-2 text-xs">
                        <button className="px-3 py-1 glass-border hover-lift">1H</button>
                        <button className="px-3 py-1 glass-border hover-lift bg-white text-black">4H</button>
                        <button className="px-3 py-1 glass-border hover-lift">1D</button>
                        <button className="px-3 py-1 glass-border hover-lift">1W</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="clash-display text-3xl font-bold glitch-hover">
                        ${mockCoins.find(c => c.symbol === selectedCoin)?.price.toLocaleString()}
                      </div>
                      <div className="text-sm electric-jade">+2.47%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center" style={{ height: '480px' }}>
                    <div className="text-gray-600 clash-display text-sm">CANDLESTICK CHART AREA</div>
                  </div>
                </div>
              </div>

              {/* Order Book */}
              <div className="col-span-4 glass-border-thick floating-panel snap-animate" style={{ background: 'rgba(12, 12, 14, 0.8)', height: '600px', animationDelay: '0.1s' }}>
                <div className="p-6 h-full flex flex-col">
                  <h3 className="clash-display text-sm font-semibold mb-4 tracking-wider">ORDER BOOK</h3>
                  
                  <div className="flex-1 overflow-y-auto custom-scroll">
                    {orderBookAsks.map((order, i) => (
                      <OrderBookRow key={`ask-${i}`} {...order} isBid={false} />
                    ))}
                  </div>
                  
                  <div className="py-3 my-3 glass-border border-y text-center">
                    <div className="text-xs text-gray-500">SPREAD</div>
                    <div className="clash-display text-lg font-bold phosphor-blue">$0.50</div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto custom-scroll">
                    {orderBookBids.map((order, i) => (
                      <OrderBookRow key={`bid-${i}`} {...order} isBid={true} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Shadow Order Entry */}
              <div className="col-span-5 glass-border-thick floating-panel snap-animate" style={{ background: 'rgba(12, 12, 14, 0.8)', animationDelay: '0.2s' }}>
                <div className="p-6">
                  <h3 className="clash-display text-sm font-semibold mb-6 tracking-wider">TACTICAL EXECUTION MODULE</h3>
                  
                  <div className="flex gap-2 mb-6">
                    <button className="flex-1 glass-border py-2 text-xs tracking-wider gradient-jade">BUY</button>
                    <button className="flex-1 glass-border py-2 text-xs tracking-wider">SELL</button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 tracking-wider mb-2 block">AMOUNT ({selectedCoin})</label>
                      <input type="text" className="w-full glass-border bg-transparent px-4 py-3 text-right clash-display text-xl" placeholder="0.00000000" />
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-500 tracking-wider mb-2 block">PRICE (USDT)</label>
                      <input type="text" className="w-full glass-border bg-transparent px-4 py-3 text-right clash-display text-xl" value="43,287.92" readOnly />
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-500 tracking-wider mb-2 flex items-center justify-between">
                        <span>SLIPPAGE PROTECTION</span>
                        <span className="electric-jade">0.5%</span>
                      </label>
                      <div className="relative h-1 bg-gray-800 glass-border">
                        <div className="absolute left-0 top-0 h-full w-1/2" style={{ background: 'linear-gradient(90deg, #00FF87 0%, rgba(0, 255, 135, 0.3) 100%)' }}></div>
                        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-white bg-black cursor-pointer"></div>
                      </div>
                    </div>
                    
                    <div className="glass-border p-4 gradient-jade">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-400">NETWORK GAS FEE</span>
                        <span className="w-2 h-2 rounded-full volatile-indicator" style={{ background: '#FF4500' }}></span>
                      </div>
                      <div className="clash-display text-lg font-bold">~$24.50 <span className="text-xs text-gray-400">HIGH</span></div>
                    </div>
                    
                    <button className="w-full glass-border py-4 bg-white text-black clash-display text-sm font-bold tracking-wider hover-lift">
                      EXECUTE ORDER
                    </button>
                  </div>
                </div>
              </div>

              {/* Liquidity Heatmap */}
              <div className="col-span-7 glass-border-thick floating-panel snap-animate" style={{ background: 'rgba(12, 12, 14, 0.8)', animationDelay: '0.25s' }}>
                <div className="p-6">
                  <h3 className="clash-display text-sm font-semibold mb-4 tracking-wider">LIQUIDITY HEATMAP</h3>
                  <div className="flex items-center justify-center" style={{ height: '200px' }}>
                    <div className="text-gray-600 clash-display text-sm">HEATMAP VISUALIZATION AREA</div>
                  </div>
                  <div className="flex items-center justify-between mt-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3" style={{ background: '#00D4FF' }}></div>
                      <span className="text-gray-500">WHALE ORDERS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3" style={{ background: '#FF4500' }}></div>
                      <span className="text-gray-500">RETAIL CLUSTERS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Trades */}
              <div className="col-span-12 glass-border-thick floating-panel snap-animate" style={{ background: 'rgba(12, 12, 14, 0.8)', animationDelay: '0.3s' }}>
                <div className="p-6">
                  <h3 className="clash-display text-sm font-semibold mb-4 tracking-wider">RECENT TRADES</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-500 border-b hairline">
                          <th className="text-left py-3 font-normal tracking-wider">TIME</th>
                          <th className="text-left py-3 font-normal tracking-wider">PAIR</th>
                          <th className="text-right py-3 font-normal tracking-wider">PRICE</th>
                          <th className="text-right py-3 font-normal tracking-wider">AMOUNT</th>
                          <th className="text-right py-3 font-normal tracking-wider">TOTAL</th>
                          <th className="text-right py-3 font-normal tracking-wider">TYPE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTrades.map((trade, i) => (
                          <tr key={i} className="data-row">
                            <td className="py-2 text-gray-400">{trade.time}</td>
                            <td className="py-2">{trade.pair}</td>
                            <td className="py-2 text-right">${trade.price.toFixed(2)}</td>
                            <td className="py-2 text-right">{trade.amount.toFixed(4)}</td>
                            <td className="py-2 text-right">${trade.total.toFixed(2)}</td>
                            <td className={`py-2 text-right ${trade.isBuy ? 'electric-jade' : 'molten-ember'}`}>
                              {trade.type}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App