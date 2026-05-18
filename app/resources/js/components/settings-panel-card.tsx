import { Card } from '@/components/ui/card';

interface SettingsPanelCardProps {
  title: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function SettingsPanelCard({ title, icon, children }: SettingsPanelCardProps) {
  return (
    <Card className="border-border bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 pb-4">
        <div className="text-accent-foreground bg-accent flex h-8 w-8 items-center justify-center rounded-md">
          {icon}
        </div>
        <h3 className="text-heading text-sm/6 font-semibold">{title}</h3>
      </div>

      <div className="pt-2">{children}</div>
    </Card>
  );
}

export default SettingsPanelCard;
