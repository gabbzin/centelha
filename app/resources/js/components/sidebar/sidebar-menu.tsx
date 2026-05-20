import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { BenefityIcon, DashboardIcon, DeliveryIcon, FamilyIcon, ManagementIcon } from './icons';

const LINKS = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, href: 'dashboard' },
  { id: 'familia', label: 'Familia', icon: FamilyIcon, href: 'familia' },
  { id: 'beneficios', label: 'Beneficios', icon: BenefityIcon, href: 'beneficios' },
  { id: 'entregas', label: 'Entregas', icon: DeliveryIcon, href: 'entregas' },
  { id: 'admin', label: 'Gestão', icon: ManagementIcon, href: 'admin' },
];

const activeColor = '#C5D9FF';

export function SidebarMenu() {
  const url = usePage().url;

  return (
    <Sheet open={true}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon-sm"
            className="border-foreground/40 text-foreground hover:bg-background h-9 w-10 rounded-lg bg-transparent"
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        }
      />
      <SheetContent side="left">
        <SheetHeader className="mt-3 py-2">
          <SheetTitle className={'font-primary text-lg font-semibold'}>Menu de navegação</SheetTitle>
        </SheetHeader>
        <Separator />
        <div className="space-y-2 p-3">
          {LINKS.map(({ id, label, icon: Icon, href }) => (
            <Link
              key={id}
              href={href}
              className={cn(
                `flex w-full items-center justify-start gap-4 rounded-lg p-3 font-normal uppercase`,
                `${url.includes(href) ? 'bg-[#2E5F9E] text-[#C5D9FF]' : 'bg-transparent text-[#424750] hover:bg-[#2E5F9E]/80'}`,
              )}
            >
              <Icon fill={url.includes(href) ? activeColor : '#424750'} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
