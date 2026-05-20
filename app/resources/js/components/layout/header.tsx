import { BellIcon, MoonIcon } from 'lucide-react';
import { Logo } from '../logo';
import { SidebarMenu } from '../sidebar/sidebar-menu';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="border-border bg-muted border-b">
      <div className="max-w-lm mx-auto flex items-center justify-between px-8 py-2">
        <a href="#" className="flex items-center gap-3.5">
          <Logo width={42} height={46} />
          <span className="text-heading text-[22px] font-bold tracking-[0.01em]">Centelha</span>
        </a>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            className="border-foreground/40 text-foreground hover:bg-background h-9 w-10 rounded-lg bg-transparent"
          >
            <MoonIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            className="border-foreground/40 text-foreground hover:bg-background h-9 w-10 rounded-lg bg-transparent"
          >
            <BellIcon className="h-4 w-4" />
          </Button>
          <SidebarMenu />
        </div>
      </div>
    </header>
  );
}
