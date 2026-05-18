import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { type LucideIcon } from 'lucide-react';

interface SystemManagementCardProps {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  Icon: LucideIcon;
}

export function SystemManagementCard({ title, description, actionLabel, href, Icon }: SystemManagementCardProps) {
  return (
    <Card className="relative min-h-[289px] rounded-2xl border-border bg-card px-8 py-8 shadow-sm">
      <div className="absolute top-0 right-0 h-32 w-32 rounded-bl-xl bg-primary/5" />

      <div className="relative flex h-full flex-col">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-accent text-heading">
          <Icon className="h-6 w-6" />
        </div>

        <div className="space-y-3">
          <h2 className="text-heading text-lg/6 font-semibold">{title}</h2>
          <p className="text-sm/5 text-foreground/75">{description}</p>
        </div>

        <div className="mt-auto pt-6">
          <Separator />
          <div className="pt-[17px] text-right">
            <Button asChild variant="secondary" size="sm" className="h-10 rounded-md px-4 text-xs font-medium">
              <a href={href}>{actionLabel}</a>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
