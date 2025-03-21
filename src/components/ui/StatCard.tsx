
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatToINR } from '@/utils/dataUtils';

interface StatCardProps {
  title: string;
  value: number;
  description?: string;
  refreshInterval?: number;
  formatFn?: (value: number) => string;
  icon?: React.ReactNode;
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  refreshInterval = 5000,
  formatFn = formatToINR,
  icon
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdating(true);
      setTimeout(() => {
        // Random fluctuation between ±5%
        const newValue = value * (0.95 + Math.random() * 0.1);
        setDisplayValue(newValue);
        setUpdating(false);
      }, 300);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [value, refreshInterval]);

  return (
    <Card className={`${updating ? 'animate-data-update' : 'transition-all duration-300 hover:shadow-md'}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatFn(displayValue)}</div>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
