
import salesData from '../data/salesData.json';
import expensesData from '../data/expensesData.json';

// Format number to Indian Rupees
export const formatToINR = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

// Generate random data fluctuation (±10%)
export const generateRandomFluctuation = (value: number): number => {
  const fluctuation = value * (Math.random() * 0.2 - 0.1); // ±10%
  return Math.round(value + fluctuation);
};

// Generate dynamic data based on static data
export const generateDynamicData = (sourceData: any): any => {
  if (Array.isArray(sourceData)) {
    return sourceData.map(item => {
      if (typeof item.amount === 'number') {
        return {
          ...item,
          amount: generateRandomFluctuation(item.amount)
        };
      }
      return item;
    });
  }
  
  const dynamicData: any = {};
  
  for (const key in sourceData) {
    if (Array.isArray(sourceData[key])) {
      dynamicData[key] = sourceData[key].map((item: any) => ({
        ...item,
        amount: generateRandomFluctuation(item.amount)
      }));
    } else {
      dynamicData[key] = sourceData[key];
    }
  }
  
  return dynamicData;
};

// Get sales data (static or dynamic)
export const getSalesData = (dynamic: boolean = false) => {
  return dynamic ? generateDynamicData(salesData) : salesData;
};

// Get expenses data (static or dynamic)
export const getExpensesData = (dynamic: boolean = false) => {
  return dynamic ? generateDynamicData(expensesData) : expensesData;
};

// Calculate totals for summary
export const calculateSummary = (dynamic: boolean = false) => {
  const sales = getSalesData(dynamic);
  const expenses = getExpensesData(dynamic);
  
  const totalSales = sales.monthly.reduce((sum: number, item: any) => sum + item.amount, 0);
  const totalExpenses = expenses.monthly.reduce((sum: number, item: any) => sum + item.amount, 0);
  const profit = totalSales - totalExpenses;
  const profitMargin = (profit / totalSales) * 100;
  
  return {
    totalSales,
    totalExpenses,
    profit,
    profitMargin
  };
};

// Get user data from localStorage
export const getUserData = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    return JSON.parse(userData);
  }
  return {
    name: 'User',
    email: 'user@example.com'
  };
};

// Save user data to localStorage
export const saveUserData = (data: { name: string; email: string }) => {
  localStorage.setItem('user', JSON.stringify(data));
};
