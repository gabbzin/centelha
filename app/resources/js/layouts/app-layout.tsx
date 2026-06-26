import { FlashListener } from '@/components/toasters/flash-listener'
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout'
import type { BreadcrumbItem } from '@/types'

interface AppLayoutProps {
  children: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
}
export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
    <FlashListener />
    {children}
  </AppLayoutTemplate>
)
