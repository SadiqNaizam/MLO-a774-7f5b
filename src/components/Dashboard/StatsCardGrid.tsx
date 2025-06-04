import React from 'react';
import StatCard, { StatCardProps } from './StatCard';
import { Bell, CircleDollarSign, Users, ShoppingBag, TrendingUp as LeadIcon, CheckCircle2, AlertCircle } from 'lucide-react';

const statsData: StatCardProps[] = [
  {
    title: 'Campaign Sent',
    value: '197',
    icon: Bell,
    indicatorIcon: CheckCircle2,
    indicatorColor: 'green',
    percentageChange: '5.2%',
    changeType: 'positive' as const,
    footerText: 'vs. previous month',
  },
  {
    title: 'Annual Profit',
    value: '$489.4k',
    icon: CircleDollarSign,
    indicatorIcon: CheckCircle2,
    indicatorColor: 'green',
    percentageChange: '12.8%',
    changeType: 'positive' as const,
    footerText: 'vs. previous year',
  },
  {
    title: 'Lead Conversation',
    value: '32.89%',
    icon: LeadIcon,
    indicatorIcon: AlertCircle,
    indicatorColor: 'red',
    percentageChange: '2.5%',
    changeType: 'negative' as const,
    footerText: 'vs. target',
  },
  {
    title: 'Daily Average Income',
    value: '$1,596.5',
    icon: ShoppingBag, // Using ShoppingBag as an alternative to Wallet/BadgeDollarSign
    indicatorIcon: CheckCircle2,
    indicatorColor: 'green',
    percentageChange: '7.1%',
    changeType: 'positive' as const,
    footerText: 'today',
  },
];

const StatsCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {statsData.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          indicatorIcon={stat.indicatorIcon}
          indicatorColor={stat.indicatorColor}
          percentageChange={stat.percentageChange}
          changeType={stat.changeType}
          footerText={stat.footerText}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
