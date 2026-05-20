import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/laravel/app-content';
import { AppHeader } from @/components/laravel/app-shellapp-header';
import { type BreadcrumbItem } from '@/types';

interface AppHeaderLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppHeaderLayout({ children, breadcrumbs }: AppHeaderLayoutProps) {
  return (
    <AppShell>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent>{children}</AppContent>
    </AppShell>
  );
}
