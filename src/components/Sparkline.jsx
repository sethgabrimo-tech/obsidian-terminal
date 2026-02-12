import React from 'react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

const Sparkline = ({ data, color, isPositive }) => {
  const chartData = data.map((value, index) => ({ value, index }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={1.5}
          dot={false}
          animationDuration={300}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Sparkline