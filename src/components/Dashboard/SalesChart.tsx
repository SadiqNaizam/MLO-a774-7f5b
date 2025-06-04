import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

interface SalesDataPoint {
  goal: number;
  pending: number;
  revenue: number;
}

interface MonthlySalesData {
  [month: string]: SalesDataPoint;
}

const MOCK_SALES_DATA: MonthlySalesData = {
  "Nov 2021": { goal: 37000, pending: 12000, revenue: 18000 },
  "Oct 2021": { goal: 35000, pending: 10000, revenue: 23000 },
  "Sep 2021": { goal: 41000, pending: 11000, revenue: 15000 },
  "Aug 2021": { goal: 30000, pending: 13000, revenue: 21000 },
};

const SalesChart: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('Nov 2021');

  const chartData = [
    {
      name: selectedMonth,
      ...MOCK_SALES_DATA[selectedMonth],
    },
  ];

  const formatYAxis = (tickItem: number) => `$${tickItem / 1000}k`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Sales Forecast</CardTitle>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[160px] text-xs h-8">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(MOCK_SALES_DATA).map((month) => (
              <SelectItem key={month} value={month} className="text-xs">
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[350px] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
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
              cursor={{ fill: 'hsl(var(--muted))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelClassName="font-semibold"
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
            />
            <Bar dataKey="goal" name="Goal" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30}/>
            <Bar dataKey="pending" name="Pending Forecast" fill="hsl(var(--velzon-accentYellow))" radius={[4, 4, 0, 0]} barSize={30}/>
            <Bar dataKey="revenue" name="Revenue" fill="hsl(var(--velzon-accentBlue))" radius={[4, 4, 0, 0]} barSize={30}/>
          </RechartsBarChart>
        </ResponsiveContainer>
        <p className="text-center text-xs text-muted-foreground mt-2">Total Forecasted Value</p>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
