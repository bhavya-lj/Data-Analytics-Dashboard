
import StatCard from '@/components/ui/StatCard';
import { TrendingUp, BarChart3, LineChart, PieChart } from 'lucide-react';

interface StatCardsProps {
  summary: {
    totalSales: number;
    totalExpenses: number;
    profit: number;
    profitMargin: number;
  };
}

const StatCards = ({ summary }: StatCardsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard 
        title="Total Sales" 
        value={summary.totalSales} 
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard 
        title="Total Expenses" 
        value={summary.totalExpenses}
        icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />} 
      />
      <StatCard 
        title="Profit" 
        value={summary.profit}
        icon={<LineChart className="h-4 w-4 text-muted-foreground" />} 
      />
      <StatCard 
        title="Profit Margin" 
        value={summary.profitMargin} 
        formatFn={(value) => `${value.toFixed(2)}%`}
        icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default StatCards;
