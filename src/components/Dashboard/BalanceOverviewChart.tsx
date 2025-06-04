import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BalanceDataPoint {
  month: string;
  revenue: number;
  expenses: number;
}

const yearlyData: BalanceDataPoint[] = [
  { month: 'Jan', revenue: 18000, expenses: 12000 },
  { month: 'Feb', revenue: 22000, expenses: 15000 },
  { month: 'Mar', revenue: 25000, expenses: 17000 },
  { month: 'Apr', revenue: 20000, expenses: 18000 },
  { month: 'May', revenue: 28000, expenses: 20000 },
  { month: 'Jun', revenue: 35000, expenses: 22000 },
  { month: 'Jul', revenue: 32000, expenses: 25000 },
  { month: 'Aug', revenue: 40000, expenses: 28000 },
  { month: 'Sep', revenue: 45000, expenses: 30000 },
  { month: 'Oct', revenue: 42000, expenses: 33000 },
  { month: 'Nov', revenue: 50000, expenses: 35000 },
  { month: 'Dec', revenue: 58000, expenses: 40000 },
];

const totalRevenue = yearlyData.reduce((sum, item) => sum + item.revenue, 0);
const totalExpenses = yearlyData.reduce((sum, item) => sum + item.expenses, 0);
const profitRatio = totalExpenses > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 100;

const BalanceOverviewChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('Current Year');

  const formatYAxis = (tickItem: number) => `$${tickItem / 1000}k`;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-base font-medium">Balance Overview</CardTitle>
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <span className="text-velzon-accentBlue font-semibold">
              ${(totalRevenue / 1000).toFixed(0)}k <span className="text-muted-foreground font-normal">Revenue</span>
            </span>
            <span className="text-velzon-accentRed font-semibold">
              ${(totalExpenses / 1000).toFixed(0)}k <span className="text-muted-foreground font-normal">Expenses</span>
            </span>
            <span className="text-velzon-accentGreen font-semibold">
              {profitRatio.toFixed(1)}% <span className="text-muted-foreground font-normal">Profit Ratio</span>
            </span>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[160px] text-xs h-8 mt-2 sm:mt-0">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Current Year" className="text-xs">Current Year</SelectItem>
              <SelectItem value="Last 6 Months" className="text-xs">Last 6 Months</SelectItem>
              <SelectItem value="Last Year" className="text-xs">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={yearlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false} 
              tickMargin={10}
              className="text-xs text-muted-foreground"
            />
            <YAxis 
              tickFormatter={formatYAxis} 
              tickLine={false} 
              axisLine={false} 
              tickMargin={5}
              className="text-xs text-muted-foreground"
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelClassName="font-semibold"
            />
            <Legend 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(var(--velzon-accentGreen))" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="expenses" name="Expenses" stroke="hsl(var(--velzon-accentRed))" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BalanceOverviewChart;
