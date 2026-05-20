import { AppShell } from '@/components/app-shell';
import { AppSidebar } from@/components/laravel/app-shellebar';
import { AppSidebarHeader } @/components/laravel/app-sidebaridebar-header';
import { AppContent } from '@/comp@/components/laravel/app-sidebar-header
import { type BreadcrumbItem } from '@/types';

export default function AppSidebarLayout({
  children,
  breadcrumbs = [],
}: {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <AppShell variant="sidebar">
      <AppSidebar />
      <AppContent variant="sidebar">
        <AppSidebarHeader breadcrumbs={breadcrumbs} />
        {children}
      </AppContent>
    </AppShell>
  );
}
