
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';

interface SalesOverviewProps {
  salesData: {
    daily: any[];
    monthly: any[];
  };
}

const SalesOverview = ({ salesData }: SalesOverviewProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Sales Overview</h3>
        <div className="text-xs text-muted-foreground">
          Data refreshes every 5 seconds
        </div>
      </div>
      <Separator className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart 
          data={salesData.daily} 
          xKey="date" 
          yKey="amount" 
          title="Daily Sales (Last 7 Days)" 
          color="hsl(215, 90%, 60%)"
        />
        <BarChart 
          data={salesData.monthly} 
          xKey="month" 
          yKey="amount" 
          title="Monthly Sales" 
        />
      </div>
    </Card>
  );
};

export default SalesOverview;
