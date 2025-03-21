
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PieChart from '@/components/charts/PieChart';
import LineChart from '@/components/charts/LineChart';

interface ComparisonChartsProps {
  expensesData: {
    departmental: any[];
  };
  salesData: {
    monthly: any[];
  };
  expensesMonthly: any[];
}

const ComparisonCharts = ({ expensesData, salesData, expensesMonthly }: ComparisonChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
      <Card className="p-8 flex flex-col justify-center "style={{ height: `500px`, width: "100%" }}>
        <h3 className="text-lg font-semibold mb-4">Departmental Expenses</h3>
        <Separator className="mb-6" />
        <PieChart 
          data={expensesData.departmental} 
          nameKey="department" 
          dataKey="amount" 
          title="Expenses Distribution by Department"
          colors={['hsl(344, 80%, 60%)', 'hsl(326, 80%, 60%)', 'hsl(275, 80%, 60%)', 'hsl(240, 90%, 70%)', 'hsl(215, 90%, 60%)']}
        />
      </Card>
      <Card className="p-8 flex flex-col justify-center "style={{ height: `500px`, width: "100%" }}>
        <h3 className="text-lg font-semibold mb-4">Sales vs Expenses</h3>
        <Separator className="mb-6" />
        <div className="h-[400px]">
          <LineChart 
            data={salesData.monthly.map((item, index) => ({
              month: item.month,
              sales: item.amount,
              expenses: expensesMonthly[index]?.amount || 0
            }))} 
            xKey="month" 
            yKey="sales" 
            title="Monthly Comparison" 
            color="hsl(215, 90%, 60%)"
          />
        </div>
      </Card>
    </div>
  );
};

export default ComparisonCharts;
