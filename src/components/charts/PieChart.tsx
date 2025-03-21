
import { useState, useEffect } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatToINR } from '@/utils/dataUtils';

interface PieChartProps {
  data: any[];
  nameKey: string;
  dataKey: string;
  title: string;
  refreshInterval?: number;
  colors?: string[];
}

const COLORS = [
  'hsl(var(--primary))', 
  'hsl(215, 90%, 60%)', 
  'hsl(240, 90%, 70%)', 
  'hsl(275, 80%, 60%)',
  'hsl(326, 80%, 60%)', 
  'hsl(344, 80%, 60%)'
];

const PieChart = ({ 
  data, 
  nameKey, 
  dataKey, 
  title, 
  refreshInterval = 5000,
  colors = COLORS
}: PieChartProps) => {
  const [chartData, setChartData] = useState(data);
  const [updating, setUpdating] = useState(false);

  // Update chart data when the input data changes
  useEffect(() => {
    setChartData(data);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdating(true);
      setTimeout(() => {
        setChartData(data.map(item => ({
          ...item,
          [dataKey]: item[dataKey] * (0.9 + Math.random() * 0.2) // Random fluctuation ±10%
        })));
        setUpdating(false);
      }, 300);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [data, dataKey, refreshInterval]);

  // If there's no data or empty array, display a message
  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">No data available for this category</p>
      </div>
    );
  }

  return (
    <div className={`chart-container h-full ${updating ? 'animate-data-update' : ''}`}>
      <h3 className="text-sm font-medium mb-2 text-muted-foreground">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              animationDuration={500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => formatToINR(value)}
              labelStyle={{ fontWeight: 500 }}
              contentStyle={{ 
                borderRadius: 'var(--radius)', 
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)' 
              }}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
