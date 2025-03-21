import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { getSalesData, getExpensesData, calculateSummary } from '@/utils/dataUtils';

// Import modular dashboard components
import StatCards from '@/components/dashboard/StatCards';
import CategoryFilter from '@/components/dashboard/CategoryFilter';
import SalesOverview from '@/components/dashboard/SalesOverview';
import CategoryCharts from '@/components/dashboard/CategoryCharts';
import ExpensesOverview from '@/components/dashboard/ExpensesOverview';
import ComparisonCharts from '@/components/dashboard/ComparisonCharts';
import DashboardFooter from '@/components/dashboard/Footer';

const Dashboard = () => {
  const [salesData, setSalesData] = useState(getSalesData(false)); // Use static data
  const [expensesData, setExpensesData] = useState(getExpensesData(false)); // Use static data
  const [summary, setSummary] = useState(calculateSummary(false)); // Use static data
  const [isDynamicMode, setIsDynamicMode] = useState(false); // Set to false for static data
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData(getSalesData(isDynamicMode));
      setExpensesData(getExpensesData(isDynamicMode));
      setSummary(calculateSummary(isDynamicMode));
    }, 5000);

    return () => clearInterval(interval);
  }, [isDynamicMode]);

  // Filter data based on selected category
  const filteredSalesData = {
    ...salesData,
    categories: selectedCategory === "all" 
      ? salesData.categories 
      : salesData.categories.filter(item => item.category === selectedCategory)
  };

  // Check if we need to show a single category pie chart or the distribution
  const pieChartTitle = selectedCategory === "all" 
    ? "Revenue Distribution by Category" 
    : `Revenue: ${selectedCategory}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-2 mb-8 animate-fade-in">
          <div className="text-xs font-medium text-primary">OVERVIEW</div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <div className="grid gap-4 md:gap-6 mb-6">
          <StatCards summary={summary} />
        </div>

        {/* Product Category Filter */}
        <CategoryFilter 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={salesData.categories}
        />

        <div className="grid gap-4 md:gap-8 mb-8 ">
          <SalesOverview salesData={filteredSalesData} />
        </div>

        <CategoryCharts 
          filteredSalesData={filteredSalesData}
          salesData={salesData}
          pieChartTitle={pieChartTitle}
        />

        <div className="grid gap-4 md:gap-8 mb-8">
          <ExpensesOverview expensesData={expensesData} />
        </div>

        <ComparisonCharts 
          expensesData={expensesData}
          salesData={filteredSalesData}
          expensesMonthly={expensesData.monthly}
        />

        <DashboardFooter />
      </main>
    </div>
  );
};

export default Dashboard;
