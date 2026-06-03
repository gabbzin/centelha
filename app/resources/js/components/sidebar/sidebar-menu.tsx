import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import {
  BenefityIcon,
  DashboardIcon,
  DeliveryIcon,
  FamilyIcon,
  ManagementIcon,
} from './icons';
const LINKS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: DashboardIcon,
    href: '/dashboard',
  },
  {
    id: 'familia',
    label: 'Familia',
    icon: FamilyIcon,
    href: '/family',
  },
  {
    id: 'beneficios',
    label: 'Beneficios',
    icon: BenefityIcon,
    href: '/beneficios',
  },
  {
    id: 'entregas',
    label: 'Entregas',
    icon: DeliveryIcon,
    href: '/entregas',
  },
  {
    id: 'admin',
    label: 'Gestão',
    icon: ManagementIcon,
    href: '/admin',
  },
];
const activeColor = '#C5D9FF';
export function SidebarMenu() {
  const url = usePage().url;
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            className="border-foreground/40 text-foreground hover:bg-background h-9 w-10 rounded-lg bg-transparent"
            size="icon-sm"
            variant="outline"
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        }
      />
      <SheetContent side={'right'}>
        <SheetHeader className="mt-1 border-b border-[#C2C6D2]">
          <SheetTitle className={'text-lg font-semibold text-[#094785]'}>
            Menu de navegação
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-2 p-3">
          {LINKS.map(({ id, label, icon: Icon, href }) => (
            <Link
              key={id}
              className={cn(
                `flex w-full items-center justify-start gap-4 rounded-lg p-3 font-normal uppercase`,
                `${url.includes(href) ? 'bg-[#2E5F9E] text-[#C5D9FF]' : 'bg-transparent text-[#424750] hover:bg-[#2E5F9E]/80'}`,
              )}
              href={href}
              target={'_self'}
            >
              <Icon fill={url.includes(href) ? activeColor : '#424750'} />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <SheetFooter className="border-t border-[#C2C6D2] p-4">
          <div className="ml-2 flex items-center gap-4 rounded-lg p-1">
            <div className="rounded-lg bg-[#2E5F9E] p-2 text-base font-semibold text-white">
              PF
            </div>
            <div>
              <h4>Pedro Felipe</h4>
              <p className="text-muted-foreground text-xs">VER PERFIL</p>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
