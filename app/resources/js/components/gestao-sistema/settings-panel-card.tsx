import { Card } from '@/components/ui/card';
import { Separator } from '../ui/separator';

interface SettingsPanelCardProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function SettingsPanelCard({ title, icon, children }: SettingsPanelCardProps) {
  return (
    <Card variant={'basic'} className="border-border bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 pb-2">
        <div className="text-primary flex items-center justify-center rounded-md">{icon}</div>
        <h3 className="text-heading text-lg font-semibold">{title}</h3>
      </div>

      <Separator />

      <div className="pt-2">{children}</div>
    </Card>
  );
}

export default SettingsPanelCard;
