
import { useState, useEffect } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatToINR } from '@/utils/dataUtils';

interface LineChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
  refreshInterval?: number;
  color?: string;
}

const LineChart = ({ 
  data, 
  xKey, 
  yKey, 
  title, 
  refreshInterval = 5000,
  color = "hsl(var(--primary))"
}: LineChartProps) => {
  const [chartData, setChartData] = useState(data);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdating(true);
      setTimeout(() => {
        setChartData(data.map(item => ({
          ...item,
          [yKey]: item[yKey] * (0.9 + Math.random() * 0.2) // Random fluctuation ±10%
        })));
        setUpdating(false);
      }, 300);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [data, yKey, refreshInterval]);

  return (
    <div className={`chart-container h-full ${updating ? 'animate-data-update' : ''}`}>
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => formatToINR(value).split('.')[0]} 
            />
            <Tooltip 
              formatter={(value: number) => formatToINR(value)}
              labelStyle={{ fontWeight: 500 }}
              contentStyle={{ 
                borderRadius: 'var(--radius)', 
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
              }}
            />
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={color} 
              activeDot={{ r: 6 }} 
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
              animationDuration={500}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
