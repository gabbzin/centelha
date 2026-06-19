import { BellIcon } from 'lucide-react'
import AppLogo from '../app/app-logo'
import { SidebarMenu } from '../sidebar/sidebar-menu'
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler'
import { Button } from '../ui/button'
export function Header() {
  return (
    <header className="border-border bg-muted border-b px-4 sticky top-0 z-50">
      <div className="max-w-lm mx-auto flex items-center justify-between py-2 px-4">
        <AppLogo />

        <div className="flex items-center gap-2">
          <AnimatedThemeToggler />
          {/* <Button
            className="border-foreground/40 text-foreground hover:bg-background h-9 w-10 rounded-lg bg-transparent"
            size="icon-sm"
            variant="outline"
           >
            <BellIcon className="h-4 w-4" />
           </Button> */}
          <SidebarMenu />
        </div>
      </div>
    </header>
  )
}
