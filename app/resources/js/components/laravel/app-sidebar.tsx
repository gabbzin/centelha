import { Link } from '@inertiajs/react'
import { BookOpen, Folder, LayoutGrid } from 'lucide-react'
import { NavFooter } from '@/components/laravel/nav-footer'
import { NavMain } from '@/components/laravel/nav-main'
import { NavUser } from '@/components/laravel/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import type { NavItem } from '@/types'
import AppLogo from '../app/app-logo'

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutGrid,
  },
]
const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    url: 'https://github.com/laravel/react-starter-kit',
    icon: Folder,
  },
  {
    title: 'Documentation',
    url: 'https://laravel.com/docs/starter-kits',
    icon: BookOpen,
  },
]
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter className="mt-auto" items={footerNavItems} />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
