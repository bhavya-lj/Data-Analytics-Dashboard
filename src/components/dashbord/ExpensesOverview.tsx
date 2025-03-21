
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AreaChart from '@/components/charts/AreaChart';
import BarChart from '@/components/charts/BarChart';

interface ExpensesOverviewProps {
  expensesData: {
    monthly: any[];
    categories: any[];
  };
}

const ExpensesOverview = ({ expensesData }: ExpensesOverviewProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Expenses Overview</h3>
        <div className="text-xs text-muted-foreground">
          Data refreshes every 5 seconds
        </div>
      </div>
      <Separator className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AreaChart 
          data={expensesData.monthly} 
          xKey="month" 
          yKey="amount" 
          title="Monthly Expenses" 
          color="hsl(344, 80%, 60%)"
        />
        <BarChart 
          data={expensesData.categories} 
          xKey="category" 
          yKey="amount" 
          title="Expenses by Category" 
          color="hsl(344, 80%, 60%)"
        />
      </div>
    </Card>
  );
};

export default ExpensesOverview;
