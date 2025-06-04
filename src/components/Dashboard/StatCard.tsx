import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, CheckCircle2, AlertCircle, type LucideProps } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  indicatorIcon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  indicatorColor?: 'green' | 'red' | 'blue' | 'yellow';
  percentageChange?: string;
  changeType?: 'positive' | 'negative';
  footerText?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: MainIcon,
  indicatorIcon: IndicatorIcon,
  indicatorColor = 'green',
  percentageChange,
  changeType,
  footerText,
  className,
}) => {
  const indicatorColors = {
    green: 'bg-velzon-accentGreen/20 text-velzon-accentGreen',
    red: 'bg-velzon-accentRed/20 text-velzon-accentRed',
    blue: 'bg-velzon-accentBlue/20 text-velzon-accentBlue',
    yellow: 'bg-velzon-accentYellow/20 text-velzon-accentYellow',
  };

  const changeColors = {
    positive: 'text-velzon-accentGreen',
    negative: 'text-velzon-accentRed',
  };

  return (
    <Card className={cn('shadow-sm', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </CardTitle>
          {IndicatorIcon && (
            <span className={cn('p-1.5 rounded-full', indicatorColors[indicatorColor])}>
              <IndicatorIcon className="h-4 w-4" />
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-1">
          <MainIcon className="h-6 w-6 text-muted-foreground mr-3" />
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
        {(percentageChange || footerText) && (
          <div className="text-xs text-muted-foreground flex items-center">
            {percentageChange && changeType && (
              <span className={cn('mr-1 flex items-center', changeColors[changeType])}>
                {changeType === 'positive' ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                {percentageChange}
              </span>
            )}
            {footerText && <span>{footerText}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
