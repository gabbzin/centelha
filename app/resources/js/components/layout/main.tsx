import { Header } from './header';
export function Main({ children, hideHeader = false }: { children: React.ReactNode; hideHeader?: boolean }) {
  return (
    <div className="bg-surface dark:bg-surface min-h-screen">
      {!hideHeader && <Header />}
      <div className="max-w-lm container mx-auto px-4 py-8 space-y-4">
        {children}
      </div>
    </div>
  )
}
