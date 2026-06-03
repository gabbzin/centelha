import { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  percentageChange: number;
}
export function StatsCard({
  title,
  value,
  icon,
  percentageChange,
}: StatsCardProps) {
  // Constantes
  const badgeVariant =
    percentageChange > 0 ? 'success_basic' : 'destructive_basic';
  const trendIcon =
    percentageChange > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />;

  // Render
  return (
    <Card className="relative space-y-3" variant={'basic'}>
      <CardHeader>
        <CardTitle className="text-[#424750] uppercase text-xs tracking-wide">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-heading font-extrabold text-4xl">{value}</p>
        <div className="absolute top-2 right-2 opacity-15">{icon}</div>
      </CardContent>
      <CardFooter className="flex items-center gap-1">
        <Badge className="space-x-1 rounded-md" variant={badgeVariant}>
          {trendIcon}
          <span>{percentageChange}%</span>
        </Badge>
        <p className="lowercase text-xs text-[#737781]">
          a {percentageChange >= 0 ? 'mais' : 'menos'} que o mês anterior
        </p>
      </CardFooter>
    </Card>
  );
}
