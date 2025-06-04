import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Deal {
  id: string;
  name: string;
  lastContacted: string;
  salesRepresentative: {
    name: string;
    avatarUrl?: string;
    initials: string;
  };
  status: 'Deal Won' | 'Intro Call' | 'Stuck' | 'Negotiation';
  dealValue: string;
}

const dealsData: Deal[] = [
  {
    id: '1',
    name: 'Absternet LLC',
    lastContacted: 'Sep 20, 2021',
    salesRepresentative: { name: 'Donald Risher', avatarUrl: 'https://i.pravatar.cc/40?u=donald', initials: 'DR' },
    status: 'Deal Won' as const,
    dealValue: '$100.1K',
  },
  {
    id: '2',
    name: 'Raitech Soft',
    lastContacted: 'Sep 23, 2021',
    salesRepresentative: { name: 'Sofia Cunha', avatarUrl: 'https://i.pravatar.cc/40?u=sofia', initials: 'SC' },
    status: 'Intro Call' as const,
    dealValue: '$150K',
  },
  {
    id: '3',
    name: 'William PVT',
    lastContacted: 'Sep 27, 2021',
    salesRepresentative: { name: 'Luis Rocha', avatarUrl: 'https://i.pravatar.cc/40?u=luis', initials: 'LR' },
    status: 'Stuck' as const,
    dealValue: '$78.18K',
  },
  {
    id: '4',
    name: 'Loiusee LLP',
    lastContacted: 'Sep 30, 2021',
    salesRepresentative: { name: 'Vitoria Rodrigues', avatarUrl: 'https://i.pravatar.cc/40?u=vitoria', initials: 'VR' },
    status: 'Deal Won' as const,
    dealValue: '$180K',
  },
  {
    id: '5',
    name: 'Tech Solutions Inc.',
    lastContacted: 'Oct 02, 2021',
    salesRepresentative: { name: 'Pedro Alves', avatarUrl: 'https://i.pravatar.cc/40?u=pedro', initials: 'PA' },
    status: 'Negotiation' as const,
    dealValue: '$220K',
  },
];

const getStatusBadgeClass = (status: Deal['status']): string => {
  switch (status) {
    case 'Deal Won':
      return 'bg-velzon-accentGreen/20 text-velzon-accentGreen border-velzon-accentGreen/30 hover:bg-velzon-accentGreen/30';
    case 'Intro Call':
      return 'bg-velzon-accentYellow/20 text-velzon-accentYellow border-velzon-accentYellow/30 hover:bg-velzon-accentYellow/30';
    case 'Stuck':
      return 'bg-velzon-accentRed/20 text-velzon-accentRed border-velzon-accentRed/30 hover:bg-velzon-accentRed/30';
    case 'Negotiation':
      return 'bg-velzon-accentBlue/20 text-velzon-accentBlue border-velzon-accentBlue/30 hover:bg-velzon-accentBlue/30';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const DealStatusTable: React.FC = () => {
  const [dateRange, setDateRange] = useState<string>('current_month');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-medium">Deals Status</CardTitle>
        <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[220px] text-xs h-8">
              <SelectValue placeholder="Select Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month" className="text-xs">02 Nov 2021 to 31 Dec 2021</SelectItem>
              <SelectItem value="last_month" className="text-xs">Last Month</SelectItem>
              <SelectItem value="last_quarter" className="text-xs">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary/90">
              <TableHead className="text-secondary-foreground">Name</TableHead>
              <TableHead className="text-secondary-foreground">Last Contacted</TableHead>
              <TableHead className="text-secondary-foreground">Sales Representative</TableHead>
              <TableHead className="text-secondary-foreground">Status</TableHead>
              <TableHead className="text-right text-secondary-foreground">Deal Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dealsData.map((deal) => (
              <TableRow key={deal.id}>
                <TableCell className="font-medium">{deal.name}</TableCell>
                <TableCell className="text-muted-foreground">{deal.lastContacted}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={deal.salesRepresentative.avatarUrl} alt={deal.salesRepresentative.name} />
                      <AvatarFallback>{deal.salesRepresentative.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{deal.salesRepresentative.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('font-normal py-1 px-2 text-xs', getStatusBadgeClass(deal.status))}>
                    {deal.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{deal.dealValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DealStatusTable;
