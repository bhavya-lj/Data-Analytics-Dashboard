
import { useState, useEffect } from 'react';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatToINR } from '@/utils/dataUtils';

interface AreaChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  title: string;
  refreshInterval?: number;
  color?: string;
}

const AreaChart = ({ 
  data, 
  xKey, 
  yKey, 
  title, 
  refreshInterval = 5000,
  color = "hsl(var(--primary))"
}: AreaChartProps) => {
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
          <RechartsAreaChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id={`color${yKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
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
            <Area 
              type="monotone" 
              dataKey={yKey} 
              stroke={color}
              fillOpacity={1}
              fill={`url(#color${yKey})`}
              animationDuration={500}
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChart;
