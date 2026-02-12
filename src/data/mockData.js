export const mockData = {
  coins: [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 67234.50,
      change24h: 3.45,
      volume: 28500000000,
      volatility: 'medium',
      sparklineData: [65000, 65500, 64800, 66200, 67000, 66500, 67234.50, 67100, 66900, 67234.50]
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3456.78,
      change24h: 5.23,
      volume: 15200000000,
      volatility: 'medium',
      sparklineData: [3200, 3300, 3250, 3400, 3450, 3420, 3456.78, 3440, 3460, 3456.78]
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 142.34,
      change24h: -2.15,
      volume: 3400000000,
      volatility: 'high',
      sparklineData: [145, 148, 143, 146, 144, 142, 140, 141, 143, 142.34]
    },
    {
      symbol: 'AVAX',
      name: 'Avalanche',
      price: 38.92,
      change24h: 7.89,
      volume: 890000000,
      volatility: 'high',
      sparklineData: [35, 36, 37, 38, 37.5, 38.5, 39, 38.8, 38.9, 38.92]
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.87,
      change24h: 1.23,
      volume: 420000000,
      volatility: 'low',
      sparklineData: [0.85, 0.86, 0.85, 0.87, 0.88, 0.86, 0.87, 0.87, 0.86, 0.87]
    }
  ],

  candlestickData: {
    BTC: Array.from({ length: 50 }, (_, i) => ({
      time: `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
      open: 67000 + Math.random() * 500,
      high: 67500 + Math.random() * 500,
      low: 66500 + Math.random() * 500,
      close: 67234 + Math.random() * 500,
      volume: Math.random() * 1000000000
    })),
    ETH: Array.from({ length: 50 }, (_, i) => ({
      time: `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
      open: 3400 + Math.random() * 100,
      high: 3500 + Math.random() * 100,
      low: 3300 + Math.random() * 100,
      close: 3456 + Math.random() * 100,
      volume: Math.random() * 500000000
    })),
    SOL: Array.from({ length: 50 }, (_, i) => ({
      time: `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`,
      open: 140 + Math.random() * 10,
      high: 145 + Math.random() * 10,
      low: 138 + Math.random() * 10,
      close: 142 + Math.random() * 10,
      volume: Math.random() * 100000000
    }))
  }
}