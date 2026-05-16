import { Card, CardContent } from '@/components/ui/card';
import { type LucideIcon } from 'lucide-react';

type FeatureCardProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

export function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (
    <Card variant={'basic'} className="py-6">
      <CardContent className="space-y-4 px-6">
        <div className="bg-foreground/10 text-primary flex size-14 items-center justify-center rounded-xl">
          <Icon className="size-5" />
        </div>
        <h3 className="text-foreground text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
