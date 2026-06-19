import { AppContent } from '@/components/laravel/app-content';
import { AppHeader } from '@/components/laravel/app-header';
import { AppShell } from '@/components/laravel/app-shell';
import { type BreadcrumbItem } from '@/types';
interface AppHeaderLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}
export default function AppHeaderLayout({
  children,
  breadcrumbs,
}: AppHeaderLayoutProps) {
  return (
    <AppShell>
      <AppHeader breadcrumbs={breadcrumbs} />
      <AppContent>{children}</AppContent>
    </AppShell>
  );
}
