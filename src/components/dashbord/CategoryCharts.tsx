
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import PieChart from '@/components/charts/PieChart';

interface CategoryChartsProps {
  filteredSalesData: {
    categories: any[];
  };
  salesData: {
    channels: any[];
  };
  pieChartTitle: string;
}

const CategoryCharts = ({ filteredSalesData, salesData, pieChartTitle }: CategoryChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8"
    style={{ height: `550px`, width: "100%" }}>
      <Card className="p-8 flex flex-col justify-center" style={{ height: `500px`, width: "100%" }}>
        <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
        <Separator className="mb-6" />
        <PieChart 
          data={filteredSalesData.categories} 
          nameKey="category" 
          dataKey="amount" 
          title={pieChartTitle}
        />
      </Card>
      <Card className="p-8 flex flex-col justify-center "style={{ height: `500px`, width: "100%" }}>
        <h3 className="text-lg font-semibold mb-4">Sales by Channel</h3>
        <Separator className="mb-6" />
        <PieChart 
          data={salesData.channels} 
          nameKey="channel" 
          dataKey="amount" 
          title="Revenue Distribution by Channel"
          colors={['hsl(215, 90%, 60%)', 'hsl(275, 80%, 60%)', 'hsl(326, 80%, 60%)']}
        />
      </Card>
    </div>
  );
};



export default CategoryCharts;
