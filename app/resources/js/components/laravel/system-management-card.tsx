import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
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
    <Card className="border-border bg-card relative min-h-72.25 rounded-2xl px-8 py-8 shadow-sm">
      <div className="relative flex h-full flex-col">
        <div className="bg-accent text-heading mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
          <Icon className="h-6 w-6" />
        </div>

        <div className="space-y-3">
          <h2 className="text-heading text-lg/6 font-semibold">{title}</h2>
          <p className="text-foreground/75 text-sm/5">{description}</p>
        </div>

        <div className="mt-auto pt-6">
          <Separator />
          <div className="pt-4.25 text-right">
            <Button variant="secondary" size="sm" className="h-10 rounded-md px-4 text-xs font-medium">
              <Link href={href}>{actionLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
