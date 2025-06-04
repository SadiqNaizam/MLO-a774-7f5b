import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import SalesChart from '../components/Dashboard/SalesChart';
import BalanceOverviewChart from '../components/Dashboard/BalanceOverviewChart';
import DealStatusTable from '../components/Dashboard/DealStatusTable';
import TaskList from '../components/Dashboard/TaskList';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { cn } from '@/lib/utils';

// Data for DealTypeChart
interface DealTypeDataPoint {
  period: string;
  pending: number;
  loss: number;
  won: number;
}

const dealTypeMonthlyData: DealTypeDataPoint[] = [
  { period: 'Jan', pending: 65, loss: 28, won: 82 },
  { period: 'Feb', pending: 72, loss: 35, won: 65 },
  { period: 'Mar', pending: 58, loss: 22, won: 93 },
  { period: 'Apr', pending: 78, loss: 45, won: 55 },
  { period: 'May', pending: 85, loss: 18, won: 75 },
  { period: 'Jun', pending: 60, loss: 30, won: 90 },
];

const dealTypeYearlyData: DealTypeDataPoint[] = [
  { period: '2018', pending: 50, loss: 20, won: 80 },
  { period: '2019', pending: 60, loss: 30, won: 70 },
  { period: '2020', pending: 70, loss: 25, won: 90 },
  { period: '2021', pending: 40, loss: 40, won: 50 },
  { period: '2022', pending: 80, loss: 15, won: 60 },
  { period: '2023', pending: 65, loss: 35, won: 85 },
];

// DealTypeChart Component (Radar Chart)
const DealTypeChart: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const chartData = timePeriod === 'monthly' ? dealTypeMonthlyData : dealTypeYearlyData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">Deal Type</CardTitle>
        <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value as 'monthly' | 'yearly')}>
          <SelectTrigger className="w-[160px] text-xs h-8">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly" className="text-xs">Monthly</SelectItem>
            <SelectItem value="yearly" className="text-xs">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[350px] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis 
              dataKey="period" 
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              className="text-xs"
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tickCount={6} // 0, 20, 40, 60, 80, 100
              tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
              className="text-xs"
            />
            <Radar 
              name="Pending" 
              dataKey="pending" 
              stroke="hsl(var(--velzon-accentYellow))" 
              fill="hsl(var(--velzon-accentYellow))" 
              fillOpacity={0.5}
              strokeWidth={1.5}
            />
            <Radar 
              name="Loss" 
              dataKey="loss" 
              stroke="hsl(var(--velzon-accentRed))" 
              fill="hsl(var(--velzon-accentRed))" 
              fillOpacity={0.5} 
              strokeWidth={1.5}
            />
            <Radar 
              name="Won" 
              dataKey="won" 
              stroke="hsl(var(--velzon-accentGreen))" 
              fill="hsl(var(--velzon-accentGreen))" 
              fillOpacity={0.5}
              strokeWidth={1.5}
            />
            <Legend 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              verticalAlign="bottom"
            />
            <RechartsTooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              }}
              labelClassName="font-semibold text-sm text-foreground"
              itemStyle={{ fontSize: '12px' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// PageHeader Component for title and breadcrumbs
interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>
      <nav aria-label="breadcrumb">
        <ol className="flex items-center space-x-1.5 text-sm text-muted-foreground mt-1 sm:mt-0">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-1 text-muted-foreground/70">/</span>}
              {crumb.href ? (
                <a href={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </a>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

// CRM Dashboard Page Component
const CRMDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <PageHeader 
        title="CRM"
        breadcrumbs={[
          { label: 'Dashboards', href: '#' }, // In a real app, use router Link or actual href
          { label: 'CRM' }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Row 1: StatsCardGrid spanning all columns */} 
        <div className="lg:col-span-3">
          <StatsCardGrid />
        </div>
        
        {/* Row 2: Three charts, each taking one column on lg screens */}
        <SalesChart />
        <DealTypeChart /> 
        <BalanceOverviewChart />

        {/* Row 3: Table (2/3 width) and Task List (1/3 width) on lg screens */}
        <div className="lg:col-span-2">
          <DealStatusTable />
        </div>
        
        <TaskList />
      </div>
    </AdminLayout>
  );
};

export default CRMDashboardPage;
